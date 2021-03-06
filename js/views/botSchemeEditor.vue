<!-- 
 Компонент является медиатором  (паттерн проектирования Mediator).
 Осуществляет взаимосвязь элементов управления на тулбаре
 и непосредственно области построения схемы.
 (В дальнейшем - редактора свойств компонентов и т. п.)
-->
<template>
	<div class="d-flex">
		<div class="toolbar-wrapper">&nbsp;</div><!-- Чтобы схема не залезала под тулбар -->
		<div class="toolbar-wrapper toolbar-fixed"><!-- Собственно, тулбар -->
			<bot-scheme-toolbar @toolbarevent="onToolbarEvent"></bot-scheme-toolbar>
		</div>
		<div class="editorarea-wrapper">
			<bot-scheme-editor-area ref="editorArea" 
				@nodeisaddedevent="onAddedNode"
				@nodenotfoundevent="onNodeNotFound"
				@editnodeevent="onStartEditNodeContent"
				@compounddesscriptionliveedit="onLiveEditNodeContent"
				@deletenodeevent="onNodeDeleted"
				@positionchanged="onPositionChanged"
			></bot-scheme-editor-area>
		</div>
		<!-- Редактор блока Message -->
		<div class="property-editor-wrapper" :style="{'display':cssMessageEditorVisible}">
			<bot-scheme-message-editor ref="messageEditor"  @editorpropertyevent="onPropertyEditorEvent"></bot-scheme-message-editor>
		</div>
		<!-- Редактор блока условий -->
		<div class="property-editor-wrapper" :style="{'display':cssConditionEditorVisible}">
			<bot-scheme-compound-object-editor ref="conditionEditor"
											   id="conditionEditor"
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
											   id="actionEditor"
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
	window.FileSaver = require('file-saver');

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
				if (this[event.methodName] instanceof Function) {
					this[event.methodName](event.file);
				} else {
					/*
					switch (event.name) {
						case 'newSchemeButtonClicked':
							this.onClickNewSchemeButton();
							break;
					}
					*/
				}
			},
			/**
			 * @param {File} file
			*/
			onClickImportFromJSONButton(file){
				let fr = new FileReader(), success;
				fr.onloadend = (result) => {
					//Сохранили текущую схему.
					this.confirmSaveCurrentScheme();


					//здесь normalize JSON если понадобится, мне rete формат кажется вполне логичным
					//например так:
					//let oJSONConverter = new JSONConverter();//JSONConverter - класс, который конвертирует JSON  rete в желаемый JSON
					//let JSONData = oJSONConverter.toReteFormat(fr.result);

					let JSONData = fr.result;
					//Установили данные из файла
					success = this.$refs.editorArea.setJSON(JSONData);
					if (success) {
						this.hideAllEditors();
						this.isSchemeLoaded = true;
						this.isCurrentSchemeModify = false;
					} else {
						this.alert(this.$t('app.IncorrectJSONFormat'));
					}
				};
				fr.readAsText(file);
			},
			/**
			 * @description Обработка кликов на кнопке Экспорт в JSON
			*/
			onClickExportToJSONButton(){
				if (!this.isSchemeLoaded) {
					this.alert(this.$t('app.needCreateScheme'));
					return;
				}
				
				let jsonData = this.$refs.editorArea.getJSON();
				//здесь normalize JSON если понадобится, мне rete формат кажется вполне логичным
				//например так:
				//let oJSONConverter = new JSONConverter();//JSONConverter - класс, который конвертирует JSON  rete в желаемый JSON
				//let jsonData = oJSONConverter.fromReteFormat(this.$refs.editorArea.getJSON() );

				let blob = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
				FileSaver.saveAs(blob, "scheme.jss");
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
				if (this.confirmSaveCurrentScheme()) {
					return;
				}
				this.loadNewScheme();
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
					this.$refs.conditionEditor.setData({
						sType: this.$t('app.ByOR'),
						short_description: this.$t('app.ShortCondDesc'),
						aItems: []
					});
					this.cssConditionEditorVisible = 'block';
				}
				if (event.type == 'ActionComponent') {
					this.hideAllEditors();
					this.$refs.actionEditor.setBlockId(event.id);
					this.$refs.actionEditor.setData({
						sType: this.$t('app.ActionType'),
						short_description: this.$t('app.ShortActDesc'),
						aItems: []
					});
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
						this.hideAllEditors();
						this.cssMessageEditorVisible = 'block';
						break;
					case 'ConditionComponent':
						this._loadDataToCompoundEditor(this.$refs.conditionEditor, 'cssConditionEditorVisible', event.id, event.nodeData);
						break;
					case 'ActionComponent':
						this._loadDataToCompoundEditor(this.$refs.actionEditor, 'cssActionEditorVisible', event.id, event.nodeData);
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

					case 'saveCompoundObject':
						this.$refs.editorArea.updateBlockCompoundData(event.nId, event.sTypeLabel, event.sDescription, event.aItems);
						break;

					case 'close':
						this.hideAllEditors();
						break;

					case 'beforeDeleteItem':
						this.confirmRemoveItemOfCompoundObject(event);
				}
			},
			/**
			 * @description Загрузить данные в редактор Условия или Действия
			 * @param {botSchemeCompoundObjectEditor} compoundObjectEditor
			 * @param {String} sCssFieldName
			 * @param {Number} nId
			 * @param {Object} oNodeData
			*/
			_loadDataToCompoundEditor(compoundObjectEditor, sCssFieldName, nId, oNodeData) {
				compoundObjectEditor.setBlockId(nId);
				compoundObjectEditor.setData(oNodeData);
				this.hideAllEditors();
				this[sCssFieldName] = 'block';
			},
			/**
			 * @description Задаёт вопрос о необходимости сохранить данные текущей схемы
			 * @return Boolean true если пользователь выбрал сохранение текущих данных
			*/
			confirmSaveCurrentScheme() {
				if (this.isCurrentSchemeModify) {
					if (this.confirm(this.$t('app.currentSchemeIsChangedWantSaveCurrentScheme'))) {
						this.onClickExportToJSONButton();
						return true;
					}
				}
				return false;
			},
			/**
			 * @description Обработка редактирования краткого описания в блоке (для связи с редактором свойств)
			 * @param {Object} event {nodeId, nodeData, nodeType}
			*/
			onLiveEditNodeContent(event) {
				if (event.nodeId == this.$refs.actionEditor.getBlockId()) {
					this.$refs.actionEditor.setUserDescription(event.nodeData.short_description);
				}
				if (event.nodeId == this.$refs.conditionEditor.getBlockId()) {
					this.$refs.conditionEditor.setUserDescription(event.nodeData.short_description);
				}
			},
			/**
			 * Событие изменения позиции блока, позиции схемы
			*/
			onPositionChanged(){
				this.isCurrentSchemeModify = true;
			},
			/**
			 * @description Подтвердить удаление элемента списка
			 * @param {Object} event
			*/
			confirmRemoveItemOfCompoundObject(event) {
				let sConfirmMessage = event.sEditorId == 'actionEditor' ? 'app.AreYouSureDeleteSubaction' : 'app.AreYouSureDeleteSubcondition';
				if (this.confirm(this.$t(sConfirmMessage ))) {
					event.oContext.removeItem(event.nItemId);
				}
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
		}
	}
</script>