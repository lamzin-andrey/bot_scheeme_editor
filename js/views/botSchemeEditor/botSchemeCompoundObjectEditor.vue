<template>
	<div class="bot-scheme-editor-property-editor-block">
		<div class="bot-scheme-editor-property-editor-title-wrapper">
			<div class="bot-scheme-editor-property-editor-title">
				{{ editor_title }}
			</div>
			<div @click="$emit('editorpropertyrevent', {type:'close'})" class="bot-scheme-editor-property-editor-title-close">&times;</div>
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
										 ></bot-scheme-compound-editor-list-item>
		</div>
		<hr>
			<div>
				<label class="bot-scheme-editor-property-add-item-label">{{ append_label }}</label>
				<bot-scheme-compound-editor-list-item-button :title="append_label" icon_image="/images/bot-scheme-toolbar/add32.png"></bot-scheme-compound-editor-list-item-button>
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
			<button @click="onClickSave" class="bot-scheme-editor-property-editor-button">{{ $t('app.Save') }}</button>
			<button @click="$emit('editorpropertyrevent', {type:'close'})" class="bot-scheme-editor-property-editor-button">{{ $t('app.Close') }}</button>
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
			description() {
				return this.userDescription ? this.userDescription : this.default_description;
			}
		},

		components: {
			'bot-scheme-compound-editor-list-item': require('./botSchemeCompoundObjectEditor/botSchemeCompoundEditorListItem').default,
			'bot-scheme-compound-editor-list-item-button': require('./botSchemeCompoundObjectEditor/botSchemeCompoundEditorListItemButton').default
		},

		//вызывается раньше чем mounted
		data: function(){return {
			/** @property {String} content текст сообщения, который может быть отредактирован */
			content : '',

			/** @property {String} stringValue Строковое значение для редактирования. Например в ConditionControl это Тип условия  */
			stringValue: '',

			/** @property {String} userDescription Заданное пользователем краткое описание блока.  */
			userDescription : '',

			/** @property {String} items массив свойств  */
			items: [{id: 1}, {id: 2}, {id: 3} , {id: 4}],

			/** @property {String} cssContentEditorVisible отвечает за видимость блока сохранения содержимого однго условия */
			cssContentEditorVisible: 'none'
		}; },
		//
		methods:{
			/**
			 * @description Обработка клика на кнопке "Сохранить"
			*/
			onClickSave(event) {
				this.$emit('editorpropertyrevent', {type:'saveMessage', id: this.editNodeId, message: this.content});
			},
			/**
			 * @description Обработка клика на кнопке "Сохранить" для текста одного условия или действия
			*/
			onClickSaveItemContent(event) {
				//TODO
			},
			/**
			 * @description Установка id узла редактируемого сообщепния
			 * @property {Number} id
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
			 * @description Установить текст сообщения
			 * @property  {String} text
			*/
			setMessageText(text) {
				this.content = text;
			},
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>