<template>
	<div id="wrongway"></div>
</template>
<script>
	
	//Rete
	import Rete from "rete";
	import ConnectionPlugin from 'rete-connection-plugin';
	import ContextMenuPlugin from 'rete-context-menu-plugin';
	import AlightRenderPlugin from 'rete-alight-render-plugin';
	import VueRenderPlugin from 'rete-vue-render-plugin';
	import BotSchemeEditorMessageComponent from '../../classes/retecomponents/botschemeeditormessagecomponent';
	import BotSchemeEditorBeginComponent from '../../classes/retecomponents/botschemeeditorbegincomponent';
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
				oSchemeData = oSchemeData ? oSchemeData : this.editor.toJSON();
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
					inputs: {},
					outputs: {},
					position: [0, 0],
					name: sBlockType
				};
				oSchemeData.nodes[this.blockCounter.toString(10)] = o;
				this.blockCounter++;
				this.refresh(oSchemeData);
			},
			/**
			 * @description Удаляет с поля элемент по id
			 * @param {Number} nId
			*/
			removeBlockById(nId) {
				let oSchemeData = this.editor.toJSON();
				delete oSchemeData.nodes[nId];
				this.refresh(oSchemeData);
			},
			/**
			 * @description Это функция, которая вызывается в объекте конфигурации ContextMenuPlugin 
			 * для nodeItems
			*/
			configureContextMenu(node) {
				let that = this;
				if (node.name === 'MessageComponent') {
					return {
						'Удалить'() {
							that.removeBlockById(node.id);
						},
						'Редактировать'() {
							console.log('Wil edit');
						},
						'Delete': false,
						'Clone': false,
					};
				}
				if (node.name === 'BeginComponent') {
					return {
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

			this.editor.use(AlightRenderPlugin);
			this.editor.use(ConnectionPlugin);
			//this.editor.use(VueRenderPlugin);
			
			this.editor.use(ContextMenuPlugin, {
				searchBar: false, // true by default
				searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
				delay: 100,
				allocate(component) {
					//return ['Submenu'];
				},
				rename(component) {
					return component.name;
				},
				items: {
					//'Click me'(){ console.log('Works!') }
				},

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