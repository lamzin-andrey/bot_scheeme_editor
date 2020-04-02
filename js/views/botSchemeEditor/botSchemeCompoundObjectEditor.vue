<template>
	<div class="bot-scheme-editor-property-editor-block">
		<div class="bot-scheme-editor-property-editor-title-wrapper">
			<div class="bot-scheme-editor-property-editor-title">
				{{ editor_title }}
			</div>
			<div @click="$emit('editorpropertyevent', {type:'close'})" class="bot-scheme-editor-property-editor-title-close">&times;</div>
			<div class="clearfix"></div>
		</div>

		<label>{{ str_value_label }}</label>
		<textarea v-model="stringValue" class="bot-scheme-editor-property-editor-textarea" rows=""></textarea>
		
		<label>{{ default_description }}</label>
		<textarea v-model="description" class="bot-scheme-editor-property-editor-textarea" rows=""></textarea>
		
		<label>{{ items_label }}</label>
		<hr>
		<div class="overflow-y">
			<bot-scheme-compound-editor-list-item v-for="item in items" :key="item.id"
										 :append_label="append_label"
										 :edit_label="edit_label"
										 :delete_label="delete_label"
										 :initial_content="item.content"
										 :ref="`item${item.id}`"
										 :id="item.id"
										 @edititemofcompoundobject="onClickEditItem"
										 @deleteitemofcompoundobject="onClickDeleteItem"
										 ></bot-scheme-compound-editor-list-item>
		</div>
		<hr>
			<div>
				<label class="bot-scheme-editor-property-add-item-label">{{ append_label }}</label>
				<bot-scheme-compound-editor-list-item-button @click="onClickAddItemButton" :title="append_label" icon_image="/images/bot-scheme-toolbar/add32.png"></bot-scheme-compound-editor-list-item-button>
				<div class="clearfix"></div>
			</div>
		<hr>

		<div :style="{'display':cssContentEditorVisible}">
			<textarea v-model="content" class="bot-scheme-editor-property-editor-textarea" rows="8" ></textarea>
			<div class="text-right mt-3">
				<button @click="onClickSaveItemContent" class="bot-scheme-editor-property-editor-button">{{ $t('app.Save') }}</button>
			</div>
		</div>
		<hr>
		<div class="text-right mt-3">
			<button @click="onClickSave" class="bot-scheme-editor-property-editor-button">{{ $t('app.SaveData') }}</button>
			<button @click="$emit('editorpropertyevent', {type:'close'})" class="bot-scheme-editor-property-editor-button">{{ $t('app.Close') }}</button>
		</div>
	</div>
</template>
<script>	
    /**
     * Этот комонент может быть сконфигурирован как для редактора блока условий, так и для редактора блока действий
    */
	export default {
		name: 'botSchemeCompoundEditor',

		//Аргументы (html атрибуты) извне
		props:{
            /** @property {String} editor_title Текст в заголовке "окна" редактирования свойств*/
            editor_title: {
                type: String,
                default: 'Title'
            },
            /** @property {String} str_value_label Метка перед первым редактируемым значением */
			str_value_label: {
				type: String,
				default: 'Action type'
			},
			/** @property {String} default_description Значение по умолчанию краткого описания блока Условия или Действия*/
			default_description: {
				type: String,
				default: 'Short description of action'
			},
			/** @property {String} append_label Метка для действия Добавить */
			append_label: {
				type: String,
				default: 'Append'
			},
			/** @property {String} edit_label Метка для действия Редактировать */
			edit_label: {
				type: String,
				default: 'Edit'
			},
			/** @property {String} delete_label Метка для действия Удалить */
			delete_label: {
				type: String,
				default: 'Delete'
			},
			/** @property {String} delete_label Метка для списка элементов */
			items_label: {
				type: String,
				default: 'Items'
			}
		},

		computed: {
			description :  {
				get() {
					return this.userDescription ? this.userDescription : this.default_description;
				},
				set(s) {
					this.userDescription = s;
				}
			}
		},

		components: {
			'bot-scheme-compound-editor-list-item': require('./botSchemeCompoundObjectEditor/botSchemeCompoundEditorListItem').default,
			'bot-scheme-compound-editor-list-item-button': require('./botSchemeCompoundObjectEditor/botSchemeCompoundEditorListItemButton').default
		},

		//вызывается раньше чем mounted
		data: function(){return {
			/** @property {String} content текст одного из списка свойств */
			content : '',

			/** @property {String} stringValue Строковое значение для редактирования. Например в ConditionControl это Тип условия  */
			stringValue: '',

			/** @property {String} userDescription Заданное пользователем краткое описание блока.  */
			userDescription : '',

			/** @property {String} items массив свойств  */
			items: [],

			/** @property {Number} nEditItemId индекс в массиве items того элемента, который редактируется */
			nEditItemId : -1,

			/** @property {String} cssContentEditorVisible отвечает за видимость блока сохранения содержимого однго условия */
			cssContentEditorVisible: 'none'
		}; },
		//
		methods : {
			/**
			 * @description Обработка клика на кнопке "Добавить" - показывается поле ввода списка
			*/
			onClickAddItemButton() {
				this.nEditItemId = -1;
				this.content = '';
				this.cssContentEditorVisible = 'block';
			},
			/**
			 * @description Обработка клика на кнопке "Сохранить"
			*/
			onClickSave(event) {
				this.$emit('editorpropertyevent', {
					type: 'saveCompoundObject',
					nId: this.editNodeId, 
					sTypeLabel: this.stringValue,
					sDescription: this.userDescription,
					aItems: this.items
				});
			},
			/**
			 * TODO при редактировании задаём nextId максимальный id из всех item of items
			 * @description Обработка клика на кнопке "Сохранить" для текста одного условия или действия
			 * @param {Event} event {id - идентификатор элемента в списке составных условий}
			*/
			onClickSaveItemContent(event) {
				/** @property {Number} nextId используется для вычисления нового идентификатора свойства составного условия или действия */
				this.nextId = this.nextId ? this.nextId : 0;

				if (this.nEditItemId == -1) {
					this.items.push( {id : this.nextId, content: this.content} );
					this.nEditItemId = this.nextId;
					this.nextId++;
				} else {
					let oItem = this.$refs['item' + this.nEditItemId][0];
					if (oItem) {
						oItem.setContent(this.content);
					}
					//установить данные в массиве, который будет сохранён
					this.items = this.items.map((item, index, arr) => {
						if (item.id == this.nEditItemId) {
							item.content = this.content;
						}
						return item;
					});
				}
			},
			/**
			 * @description Установка id узла редактируемого сообщепния
			 * @param {Number} id
			*/
			setBlockId(id) {
				this.editNodeId = id;
			},
			/**
			 * @description Получить идентификатор узла, данные которого загружены в редактор
			 * @return Number
			*/
			getBlockId() {
				return this.editNodeId;
			},
			/**
			 * @description Установить данные блока для редактирования
			 * @param  {Object} nodeData
			*/
			setData(nodeData) {
				this.stringValue = nodeData.sType;
				this.userDescription = nodeData.short_description;
				this.items = [];
				Vue.nextTick(() => {
					this.items = nodeData.aItems ? nodeData.aItems : [];
				});
				this.nEditItemId = -1;
				this.content = '';
				this.cssContentEditorVisible = 'none';
				//getMaxId
				this.nextId = this.items.reduce((prevResult, currentItem) => {
					if (currentItem.id > prevResult) {
						return currentItem.id;
					}
				}, -1);
				this.nextId++;
			},
			/**
			 * @description Установка краткого описания (используется при редактировани его непосредственно в блоке)
			 * @param {String} s
			*/
			setUserDescription(s) {
				this.userDescription = s;
			},
			/**
			 * @description Обработка на клике кнопки Править списка условий или действий 
			 * @param  {Event} event {id, content}
			*/
			onClickEditItem(event) {
				this.nEditItemId = event.id;
				this.content = event.content;
				this.cssContentEditorVisible = 'block';
			},
			/**
			 * @description Обработка на клике кнопки Удалить списка условий или действий 
			 * @param  {Event} event {id}
			*/
			onClickDeleteItem(event) {
				this.content = '';
				this.cssContentEditorVisible = 'none';
				this.items = this.items.filter((item, index, arr) => {
					return item.id != event.id;
				});
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
			this.userDescription = this.default_description;
		}
	}
</script>