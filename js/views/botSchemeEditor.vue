<!-- 
 Компонент является медиатором  (паттерн проектирования Mediator).
 Осуществляет взаимосвязь элементов управления на тулбаре
 и непосредственно области построения схемы.
 (В дальнейшем - редактора свойств компонентов и т. п.)
-->
<template>
	<div>
		<div class="toolbar-wrapper">
			<bot-scheme-toolbar @toolbarevent="onToolbarEvent"></bot-scheme-toolbar>
		</div>
		<div class="editorarea-wrapper">
			<bot-scheme-editor-area ref="editorArea"></bot-scheme-editor-area>
		</div>
		<div class="clearfix"></div>
	</div>
</template>
<script>
	export default {
		name: 'botSchemeEditor',
		
		components:{
			'bot-scheme-toolbar': require('./botSchemeEditor/botSchemeToolbar.vue').default,
			'bot-scheme-editor-area': require('./botSchemeEditor/botSchemeEditorArea.vue').default
		},

		//Аргументы (html атрибуты) извне
		props:{

		},
		//вызывается раньше чем mounted
		data: function(){return {
			/** @property {Boolean} isCurrentSchemeModify принимает true когда схема в редакторе изменена, но не сохранена*/
			isCurrentSchemeModify: false,
			/** @property {Boolean} isSchemeLoaded принимает true когда в редактор загружена схема */
			isSchemeLoaded: false,
		}; },
		//
		methods:{
			/**
			 * @description Обработка кликов кнопок на тулбаре
			*/
			onToolbarEvent(event) {
				switch (event.name) {
					case 'newSchemeButtonClicked':
						this.onClickNewSchemeButton();
						break;

					case 'addComponentButtonClicked':
						this.onClickAddComponentButton();
						break;
				}
			},
			/**
			 * @description Обработка кликов на кнопке Создать новую схему
			*/
			onClickAddComponentButton(){
				if (!this.isSchemeLoaded) {
					this.loadNewScheme();
				}
				this.$refs.editorArea.addNewComponent();
				
			},
			/**
			 * @description Обработка кликов на кнопке Создать новую схему
			*/
			onClickNewSchemeButton(){
				if (this.isCurrentSchemeModify) {
					if (this.confirm($t('app.currentSchemeIsChangedDoSaveCurrentScheme'))) {
						/** @property {Boolean} needCreateNewScheme принимает true когда необходимо создать новую схему после сохранения текущей */
						this.needCreateNewScheme = true;
						this.showExportSchemeDialog();

						return;
					}
				}
				this.loadNewScheme();
			},
			/**
			 * @description Показывает диалог экспорта схемы в json
			*/
			showExportSchemeDialog() {
				//TODO
			},
			/**
			 * @description Загружает в редактор шаблон новой схемы по умолчанию (на данный момент это схема с одним блоком "Начало")
			*/
			loadNewScheme() {
				//TODO
				this.isSchemeLoaded = true;
			},
			/**
			 * @description Показать диалог с вопросом о подтверждении действия
			 * @param {String} s
			 * @return Boolean
			*/
			confirm(s) {
				return confirm(s);
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
		}
	}
</script>
<style scoped>
	.toolbar-wrapper {
		border: solid 1px #ece9d8;
		border-right-color: #3E97C4;
		float: left;
		min-width: 63px;
		width: 64px;
		height: 99.5vh;
		background-color: #ece9d8;
		text-align: center;
	}
	.editorarea-wrapper {
		/*border: solid 1px #AAFF00;*/
		float:left;
		min-width: calc(100% - 70px);
		height: 99.5vh;
	}
	.clearfix {
		clear:both;
	}
</style>