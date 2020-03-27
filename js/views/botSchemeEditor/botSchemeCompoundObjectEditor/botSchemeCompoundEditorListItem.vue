<template>
	<div class="bot-scheme-editor-list-block">
		<bot-scheme-compound-editor-list-item-button :title="delete_label" icon_image="/images/bot-scheme-toolbar/delete32.png"></bot-scheme-compound-editor-list-item-button>
		<bot-scheme-compound-editor-list-item-button :title="edit_label" icon_image="/images/bot-scheme-toolbar/edit32.png"></bot-scheme-compound-editor-list-item-button>
		{{ content }}
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
			}
		},

		components: {
			'bot-scheme-compound-editor-list-item-button': require('./botSchemeCompoundEditorListItemButton').default
		},



		//вызывается раньше чем mounted
		data: function(){return {
			/** @property {String} content текст элемента списка */
			content : `Только благодаря нашему языку вы можете получить всё, что вам только вздумается, Подпись - Блендер.
						И не думайте, что зал закончится слезами, сколько же в голове может быть мусора, вы просто не понимаете, зачем это всё.
						Я хотел бы написать тебе тетрис
						Но сегодня это вряд ли возможно`,

			
		}; },
		//
		methods:{
			/**
			 * @description Обработка клика на кнопке "Сохранить"
			*/
			on(event) {
				
			},
			
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>