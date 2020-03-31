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
				@deletenodeevent="onNodeDeleted"
			></bot-scheme-editor-area>
		</div>
		<div class="clearfix"></div>
		<!-- Редактор блока Message -->
		<div class="property-editor-wrapper" :style="{'display':cssMessageEditorVisible}">
			<bot-scheme-message-editor ref="messageEditor"  @editorpropertyevent="onPropertyEditorEvent"></bot-scheme-message-editor>
		</div>
		<!-- Редактор блока условий -->
		<div class="property-editor-wrapper" :style="{'display':cssConditionEditorVisible}">
			<bot-scheme-compound-object-editor ref="conditionEditor"
											   @editorpropertyevent="onPropertyEditorEvent"
											   :editor_title="$t('app.EditConditionDialogTitle')"
											   :str_value_label="$t('app.ConditionType')"
											   :default_description="$t('app.ShortCondDesc')"
											   :append_label="$t('app.AppendCondition')"
											   :edit_label="$t('app.EditCondition')"
											   :delete_label="$t('app.DeleteCondition')"
											   :items_label="$t('app.Conditions')"
											   ></bot-scheme-compound-object-editor>
		</div>
		<!-- Редактор блока действий -->
		<div class="property-editor-wrapper" :style="{'display':cssActionEditorVisible}">
			<bot-scheme-compound-object-editor ref="actionEditor"
											   @editorpropertyevent="onPropertyEditorEvent"
											   :editor_title="$t('app.EditActionDialogTitle')"
											   :str_value_label="$t('app.ActionType')"
											   :default_description="$t('app.ShortActDesc')"
											   :append_label="$t('app.AppendAction')"
											   :edit_label="$t('app.EditAction')"
											   :delete_label="$t('app.DeleteAction')"
											   :items_label="$t('app.Actions')"
											   ></bot-scheme-compound-object-editor>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'botSchemeEditor',
		
		components:{
			'bot-scheme-message-editor': require('./botSchemeEditor/botSchemeMessageEditor.vue').default,
			'bot-scheme-toolbar': require('./botSchemeEditor/botSchemeToolbar.vue').default,
			'bot-scheme-editor-area': require('./botSchemeEditor/botSchemeEditorArea.vue').default,
			'bot-scheme-compound-object-editor': require('./botSchemeEditor/botSchemeCompoundObjectEditor.vue').default
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
			/** @property {String} cssConditionEditorVisible отвечает за отображение редактора блока Условий */
			cssConditionEditorVisible : 'none',
			/** @property {String} cssActionEditorVisible отвечает за отображение редактора блока Действий */
			cssActionEditorVisible : 'none',
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

					case 'addTimerBlockButtonClicked':
						this.onClickAddTimerButton();
						break;

					case 'addConditionBlockButtonClicked':
						this.onClickAddConditionButton();
						break;

					case 'addActionBlockButtonClicked':
						this.onClickAddActionButton();
						break;
				}
			},
			/**
			 * @description Обработка кликов на кнопке Добавить действие
			*/
			onClickAddActionButton(){
				if (!this.isSchemeLoaded) {
					this.loadNewScheme();
				}
				this.$refs.editorArea.addNewActionBlock();
			},
			/**
			 * @description Обработка кликов на кнопке Добавить условие
			*/
			onClickAddConditionButton(){
				if (!this.isSchemeLoaded) {
					this.loadNewScheme();
				}
				this.$refs.editorArea.addNewConditionBlock();
			},
			/**
			 * @description Обработка кликов на кнопке Добавить таймер
			*/
			onClickAddTimerButton(){
				if (!this.isSchemeLoaded) {
					this.loadNewScheme();
				}
				this.$refs.editorArea.addNewTimerBlock();
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
				this.alert(`Вы должны были увидеть интерфейс для экспорта в JSON или даже должна была
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
				if (event.type == 'MessageComponent') {
					this.hideAllEditors();
					this.$refs.messageEditor.setBlockId(event.id);
					this.$refs.messageEditor.setMessageText('');
					this.cssMessageEditorVisible = 'block';
				}
				if (event.type == 'ConditionComponent') {
					this.hideAllEditors();
					this.$refs.conditionEditor.setBlockId(event.id);
					//this.$refs.conditionEditor.setMessageText('');
					this.cssConditionEditorVisible = 'block';
				}
				if (event.type == 'ActionComponent') {
					this.hideAllEditors();
					this.$refs.actionEditor.setBlockId(event.id);
					//this.$refs.conditionEditor.setMessageText('');
					this.cssActionEditorVisible = 'block';
				}
			},
			/**
			 * @description Скрыть все редакторы узлов
			 * @param {Object} event {id:Number}
			*/
			hideAllEditors(){
				this.cssMessageEditorVisible = 'none';
				this.cssConditionEditorVisible = 'none';
				this.cssActionEditorVisible = 'none';
			},
			/**
			 * @description Событие, когда на схеме не найден узел с тем или иным идентификатором
			 * @param {Object} event {id:Number}
			*/
			onNodeNotFound(event) {
				this.alert(event.msg);
			},
			/**
			 * @description Событие, когда со схемы удалён узел
			 * @param {Object} event {id:Number}
			*/
			onNodeDeleted(event) {
				if (this.$refs.messageEditor.getBlockId() == event.id) {
					this.cssMessageEditorVisible = 'none';
				}
				if (this.$refs.actionEditor.getBlockId() == event.id) {
					this.cssActionEditorVisible = 'none';
				}
				if (this.$refs.conditionEditor.getBlockId() == event.id) {
					this.cssConditionEditorVisible = 'none';
				}
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
						this.hideAllEditors();
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
		width: calc(100% - 70px);
		height: 99.5vh;
	}
	.clearfix {
		clear:both;
	}
	.property-editor-wrapper{
		position:absolute;
		right:0px;
		top:0px;
		z-index:1;
	}
</style>