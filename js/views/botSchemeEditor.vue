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
			<bot-scheme-editor-area ref="editorArea" 
				@nodeisaddedevent="onAddedNode"
				@nodenotfoundevent="onNodeNotFound"
				@editnodeevent="onStartEditNodeContent"
			></bot-scheme-editor-area>
		</div>
		<div class="clearfix"></div>
		<div class="message-text-editor-wrapper" :style="{'display':cssMessageEditorVisible}">
			<bot-scheme-message-editor ref="messageEditor"  @editorpropertyrevent="onPropertyEditorEvent"></bot-scheme-message-editor>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'botSchemeEditor',
		
		components:{
			'bot-scheme-message-editor': require('./botSchemeEditor/botSchemeMessageEditor.vue').default,
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
			/** @property {String} cssMessageEditorVisible отвечает за отображение редактора текста сообщения */
			cssMessageEditorVisible : 'none',
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

					case 'addMessageBlockButtonClicked':
						this.onClickAddMessageButton();
						break;
				}
			},
			/**
			 * @description Обработка кликов на кнопке Создать новую схему
			*/
			onClickAddMessageButton(){
				if (!this.isSchemeLoaded) {
					this.loadNewScheme();
				}
				this.$refs.editorArea.addNewMessageBlock();
			},
			/**
			 * @description Обработка кликов на кнопке Создать новую схему
			*/
			onClickNewSchemeButton(){
				if (this.isCurrentSchemeModify) {
					if (this.confirm(this.$t('app.currentSchemeIsChangedWantSaveCurrentScheme'))) {
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
				alert(`Вы должны были увидеть интерфейс для экспорта в JSON или даже должна была
				начаться загрузка JSON файла, но это пока не готово.`);
			},
			/**
			 * @description Загружает в редактор шаблон новой схемы по умолчанию (на данный момент это схема с одним блоком "Начало")
			*/
			loadNewScheme() {
				this.$refs.editorArea.clear();
				this.$refs.editorArea.addBeginBlock();
				this.isSchemeLoaded = true;
			},
			/**
			 * @description Показать диалог с вопросом о подтверждении действия
			 * @param {String} s
			 * @return Boolean
			*/
			confirm(s) {
				return confirm(s);
			},
			/**
			 * @description Показать сообщение
			 * @param {String} s
			*/
			alert(s) {
				alert(s);
			},
			/**
			 * @description Событие, когда на схему добавлен новый узел
			*/
			onAddedNode(event) {
				this.isCurrentSchemeModify = true;
				this.$refs.messageEditor.setBlockId(event.id);
				this.$refs.messageEditor.setMessageText('');
				this.cssMessageEditorVisible = 'block';
			},
			/**
			 * @description Событие, когда на схеме не найден узел с тем или иным идентификатором
			 * @param {Object} event {id:Number}
			*/
			onNodeNotFound(event) {
				this.alert(event.msg);
			},
			/**
			 * @description Событие, когда надо начать редактирование свойств узла
			 * @param {Object} event {id:Number, nodeType:String, nodeData: Object}
			*/
			onStartEditNodeContent(event) {
				switch (event.nodeType) {
					case 'MessageComponent':
						this.$refs.messageEditor.setBlockId(event.id);
						this.$refs.messageEditor.setMessageText(event.nodeData.msg);
						this.cssMessageEditorVisible = 'block';
						break;
				}
			},
			/**
			 * @description Событие, когда произошли какие-то действия в редакторе свойств блока
			*/
			onPropertyEditorEvent(event) {
				switch (event.type) {
					case 'saveMessage':
						this.$refs.editorArea.updateBlockMessageText(event.id, event.message);
						break;
					case 'close':
						this.cssMessageEditorVisible = 'none';//TODO
						break;
				}
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
	.message-text-editor-wrapper{
		position:absolute;
		right:0px;
		top:0px;
		z-index:1;
	}
</style>