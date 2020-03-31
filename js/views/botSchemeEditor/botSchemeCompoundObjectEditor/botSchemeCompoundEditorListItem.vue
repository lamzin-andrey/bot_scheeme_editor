<template>
	<div class="bot-scheme-editor-list-block">
		<bot-scheme-compound-editor-list-item-button @click="onClickDeleteItem" :title="delete_label" icon_image="/images/bot-scheme-toolbar/delete32.png"></bot-scheme-compound-editor-list-item-button>
		<bot-scheme-compound-editor-list-item-button @click="onClickEditItem" :title="edit_label" icon_image="/images/bot-scheme-toolbar/edit32.png"></bot-scheme-compound-editor-list-item-button>
		{{ content }}
		<div class="clearfix"></div>
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
			/** @property {String} delete_label Текст по умолчанию */
			initial_content: {
				type: String,
				default: ''
			},
			/** @property {Number} delete_label Идентификатор */
			id: {
				type: Number,
				default: -1
			}
		},

		components: {
			'bot-scheme-compound-editor-list-item-button': require('./botSchemeCompoundEditorListItemButton').default
		},

		computed: {
			/**
			 * @description Вывод контента элемента списка
			 * @return String
			*/
			content() {
				return this.actual_content ? this.actual_content : this.initial_content;
			}
		},

		//вызывается раньше чем mounted
		data: function(){return {
			/** @property {String} content текст элемента списка (после редактирования и он же используется для передачи в Rete.node) */
			actual_content : ''
		}; },

		//
		methods:{
			/**
			 * @description Изменить контент свойства
			 * @param {String} sContent
			*/
			setContent(sContent) {
				this.actual_content = sContent;
			},
			/**
			 * @description
			*/
			onClickEditItem() {
				this.$emit('edititemofcompoundobject', {id: this.id, content: this.actual_content});
			},
			/**
			 * @description
			*/
			onClickDeleteItem() {
				this.$emit('deleteitemofcompoundobject', {id: this.id});
			}
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
			this.actual_content = this.initial_content;
		}
	}
</script>