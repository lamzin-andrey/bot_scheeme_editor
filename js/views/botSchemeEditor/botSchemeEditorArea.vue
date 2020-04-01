<template>
	<div id="rete"></div>
</template>
<script>
	
	//Rete
	import Rete from "rete";
	import ConnectionPlugin from 'rete-connection-plugin';
	import ContextMenuPlugin from 'rete-context-menu-plugin';
	import AlightRenderPlugin from 'rete-alight-render-plugin';
	//import VueRenderPlugin from 'rete-vue-render-plugin';
	// /Rete
	import BotSchemeEditorMessageComponent from '../../classes/retecomponents/botschemeeditormessagecomponent';
	import BotSchemeEditorBeginComponent from '../../classes/retecomponents/botschemeeditorbegincomponent';
	import BotSchemeEditorTimerComponent from '../../classes/retecomponents/botschemeeditortimercomponent';
	import BotSchemeEditorConditionComponent from '../../classes/retecomponents/botschemeeditorconditioncomponent';
	import BotSchemeEditorActionComponent from '../../classes/retecomponents/botschemeeditoractioncomponent';


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
				let type = 'MessageComponent', id = this.addBlock(type);
				this.$emit('nodeisaddedevent', {id, type});
			},
			/**
			 * @description Добавление блока действия
			*/
			addNewActionBlock() {
				let type = 'ActionComponent',
					id = this.addBlock(type);
				this.$emit('nodeisaddedevent', {id, type});
			},
			/**
			 * @description Добавление блока условия
			*/
			addNewConditionBlock() {
				let type = 'ConditionComponent', id = this.addBlock(type);
				this.$emit('nodeisaddedevent', {id, type});
			},
			/**
			 * @description Добавление блока таймера
			*/
			addNewTimerBlock() {
				let type = 'TimerComponent', id = this.addBlock(type);
				this.$emit('nodeisaddedevent', {id, type});
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
				this.editor.fromJSON(oSchemeData).then((arg) => {
					this.editor.view.resize();
					this.compile();

					//Вместо этого должно было быть onFailSetJSONtoEditor()  в catch, но rete не совершенен
					let newData = this.editor.toJSON(), nLength = 0, i;
					if (newData.nodes) {
						for (i in newData.nodes) {
							nLength++;
							break;
						}
					}
					if (!newData.nodes || !nLength) {
						this.onFailSetJSONtoEditor();
					}
				})
				.catch(() => {
					//Хотелось бы, но ему хоть composer.json от Symfony подсовывай - всё равно then(true) вызывается
					//this.onFailSetJSONtoEditor();
				});
			},
			/**
			 * @description Добавляет на поле элемент
			 * @param {String} sBlockType
			 * @return {Number} id созданного узла
			*/
			addBlock(sBlockType) {
				let oSchemeData = this.editor.toJSON(),
					//Добавим данные для создания блока
					o = {
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
				return o.id;
			},
			/**
			 * @description Удаляет с поля элемент по id
			 * @param {Number} nId
			*/
			removeBlockById(nId) {
				let oSchemeData = this.editor.toJSON();
				delete oSchemeData.nodes[nId];
				this.refresh(oSchemeData);
				this.$emit('deletenodeevent', {id: nId});
			},
			/**
			 * @description Ищет данные блока и отправляет их посреднику,
			 * 				чтобы тот загрузил их в соответсвующий редактор свойств
			 * @param {Number} nId
			*/
			emitEditBlockEvent(nId) {
				let oSchemeData = this.editor.toJSON(),
					eventData = {id: nId};
				if (!oSchemeData.nodes[nId]) {
					this.$emit('nodenotfoundevent', {msg: 'Unable find node with id ' + nId, noSavedData: null});
					return;
				}
				eventData.nodeType =  oSchemeData.nodes[nId].name;
				eventData.nodeData = oSchemeData.nodes[nId].data;
				this.$emit('editnodeevent', eventData);
			},
			/**
			 * @description Сохранить данные сообщения на схеме
			 * @property {Number} nId
			 * @property {String} sMessage
			*/
			updateBlockMessageText(nId, sMessage) {
				let oSchemeData = this.editor.toJSON();
				if (oSchemeData.nodes[nId]) {
					oSchemeData.nodes[nId].data.msg = sMessage;
					this.refresh(oSchemeData);
				} else {
					this.$emit('nodenotfoundevent', {msg: 'Unable find node with id ' + nId, noSavedData: sMessage});
				}
			},
			/**
			 * @description Сохранить данные составного объекта (Условия или Действия)  на схеме
			 * @property {Number} nId
			 * @property {String} sTypeLabel для Действий - тип действия, для Условий - тип условия
			 * @property {String} sDescription краткое описание, какое это действие или условие
			 * @property {Array} of {id, content} aItems массив поддействий или подусловий из которых состоит Действие или Условие
			*/
			updateBlockCompoundData(nId, sTypeLabel, sDescription, aItems) {
				let oSchemeData = this.editor.toJSON();
				if (oSchemeData.nodes[nId]) {
					oSchemeData.nodes[nId].data.aItems = aItems;
					oSchemeData.nodes[nId].data.short_description = sDescription;
					oSchemeData.nodes[nId].data.sType = sTypeLabel;
					this.refresh(oSchemeData);
				} else {
					this.$emit('nodenotfoundevent', {msg: 'Unable find node with id ' + nId, noSavedData: {nId, sTypeLabel, sDescription, aItems}});
				}
			},

			/**
			 * @description Конфигурация контекстного меню компонентов
			 * Это функция, которая вызывается в объекте конфигурации ContextMenuPlugin 
			 * для поля nodeItems
			 * 
			 * Конфигурацию контекстного меню для новых компонентов надо в методе 
			 *  contextMenu() классов этих компонентов
			*/
			configureContextMenu(node) {
				let i;
				for (i = 0; i < this.aComponents.length; i++) {
					if (node.name == this.aComponents[i].name) {
						return this.aComponents[i].contextMenu(this, node);
					}
				}
				return {};
			},
			/**
			 * Обновить данные в движке схем
			*/
			async compile() {
			    await this.engine.abort();
			    await this.engine.process(this.editor.toJSON());
			},
			/**
			 * @description Получить данные в JSON формате
			 * @return String
			*/
			getJSON() {
				return JSON.stringify(this.editor.toJSON());
			},
			/**
			 * @description Установить данные схемы в rete
			 * @param {String} sJSON  данные в формате rete
			 * @return Boolean
			*/
			setJSON(sJSON) {
				let oSchemeData = this.editor.toJSON(), i, oImportData;
				try {
					oImportData = JSON.parse(sJSON);
					this.blockCounter = 0;
					for (i in oImportData.nodes) {
						this.blockCounter++;
					}
					oSchemeData.nodes = {...oImportData.nodes};
					/** @property {Boolean} isProcessingJSONFromFile принимает true когда в editor пытаемся установить данные из файла */
					this.isProcessingJSONFromFile = true;
					this.refresh(oSchemeData);
					return true;
				} catch (e) {
					;//TODO onfailparsejson invalid json
				}
				return false;
				
			},
			/**
			 * @description Сбой установки JSON формата в редактор
			*/
			onFailSetJSONtoEditor(){
				if ( this.isProcessingJSONFromFile) {
					this.isProcessingJSONFromFile = false;
					this.$emit('onfailparsejson', {fromFile: true, forRete: true}); //TODO invalid JSON for rete
				}
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
			/** @property botSchemeEditorSocket - Объект для коммуникации между узлами */
			this.botSchemeEditorSocket = new Rete.Socket('Number value');//TODO зачем тут Number value ?

			this.container = document.querySelector('#rete');
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

			/** @property {Array} aComponents  массив экземпляров объектов компонентов, наследников Rete.Component */
			let aComponents = this.aComponents = [new BotSchemeEditorMessageComponent('MessageComponent', this.botSchemeEditorSocket, this.$t),
								new BotSchemeEditorBeginComponent('BeginComponent', this.botSchemeEditorSocket, this.$t),
								new BotSchemeEditorTimerComponent('TimerComponent', this.botSchemeEditorSocket, this.$t),
								new BotSchemeEditorConditionComponent('ConditionComponent', this.botSchemeEditorSocket, this.$t),
							 	new BotSchemeEditorActionComponent('ActionComponent', this.botSchemeEditorSocket, this.$t)
							],
							i;
			aComponents.forEach((item, i, arr) => {
				this.editor.register(item);
			});
			
			this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
				this.compile();
			});
		}
	}
</script>onfailparsejson