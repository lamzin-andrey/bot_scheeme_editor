<template>
	<div id="wrongway"></div>
</template>
<script>
	
	//Rete
	import Rete from "rete";
	import ConnectionPlugin from 'rete-connection-plugin';
	import ContextMenuPlugin from 'rete-context-menu-plugin';
	import VueRenderPlugin from 'rete-vue-render-plugin';
	import BotSchemeEditorMessageComponent from '../../classes/botschemeeditormessagecomponent';
	import BotSchemeEditorBeginComponent from '../../classes/botschemeeditorbegincomponent';
	// /Rete


	export default {
		name: 'botSchemeEditorArea',

		//Аргументы (html атрибуты) извне
		props:{

		},
		

		//вызывается раньше чем mounted
		data: function(){return {

			/** @property {Number} счётчик добавленых блоков, для предотвращения создания компонента с одинаковым именеи (иначе rete ругается). Вероятно, не нужно */
			blockCounter : 0,

		}; },
		//
		methods:{
			/**
			 * @description Добавление начального блока
			*/
			addBeginBlock() {
				this.addBlock('BeginComponent');
			},
			/**
			 * @description Добавление блока сообщения
			*/
			addNewMessageBlock() {
				this.addBlock('MessageComponent');
				this.$emit('nodeisaddedevent');
			},
			/**
			 * @description Удаляет всё со схемы
			*/
			clear() {
				let oSchemeData = this.editor.toJSON();
				oSchemeData.nodes = {};
				this.blockCounter = 0;
				this.refresh(oSchemeData);
			},
			/**
			 * @description Ресайзит и перерисовывает содержимое редактора
			 * @param {Object} oSchemeData Данные схемы
			*/
			refresh(oSchemeData) {
				this.editor.fromJSON(oSchemeData).then(() => {
					this.editor.view.resize();
					this.compile();
				});
			},
			/**
			 * @description Добавляет на поле элемент
			 * @param {String} sBlockType
			*/
			addBlock(sBlockType) {
				let oSchemeData = this.editor.toJSON();
				//Добавим данные для создания блока
				let o = {
					id: this.blockCounter.toString(10),
					data: {},
					group: null,
					inputs: {},  //Это надо делать, невозможно подцепить связь
					outputs: {}, //Это генерится автоматически
					position: [0, 0],
					name: sBlockType
				};
				oSchemeData.nodes[this.blockCounter.toString(10)] = o;
				this.blockCounter++;
				this.refresh(oSchemeData);
			},
			/**
			 * @description Это функция, которая вызывается в объекте конфигурации ContextMenuPlugin 
			 * для nodeItems
			*/
			configureContextMenu(node) {
				if (node.name === 'MessageComponent') {
					return {
						'Удалить'() {
							this.removeBlockById(node.id);//TODO
							console.log('Works for add node!');
						},
						'Delete': false,
						'Clone': false,
					};
				}
				return { 
					'Click me'(){ console.log('Works for node!') }
				}
			},
			/**
			 * 
			*/
			async compile() {
			    await this.engine.abort();
			    await this.engine.process(this.editor.toJSON());
			}
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
			/** @property botSchemeEditorSocket - Объект для коммуникации между узлами */
			this.botSchemeEditorSocket = new Rete.Socket('Number value');

			this.container = document.querySelector('#wrongway');
			console.log(this.container);
			this.editor = new Rete.NodeEditor('demo@0.1.0', this.container);

			this.editor.use(ConnectionPlugin);
			this.editor.use(VueRenderPlugin);
			this.editor.use(ContextMenuPlugin, {
				nodeItems: node => { 
					return this.configureContextMenu(node);
				}
			});
			

			this.engine = new Rete.Engine('demo@0.1.0');

			let aComponents = [new BotSchemeEditorMessageComponent('MessageComponent', this.botSchemeEditorSocket, this.$t),
							   new BotSchemeEditorBeginComponent('BeginComponent', this.botSchemeEditorSocket, this.$t) ],
							   i;
			//TODO forEach
			for (let i = 0; i < aComponents.length; i++) {
				this.editor.register(aComponents[i]);
				this.engine.register(aComponents[i]);
			}
			
			this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
			    await this.engine.abort();
			    await this.engine.process(this.editor.toJSON());
			});
		}
	}
</script>