<template>
	<div>
		<bot-scheme-toolbar-button 
			@click="onClickNewScheme"
			@touchstart="onTouchStartNewScheme"
			:title="$t('app.newSchemeCreate')"
			icon_image="new32.png"></bot-scheme-toolbar-button>
		
		<bot-scheme-toolbar-file-input-button
			@select="onSelectFileForImportFromJSON"
			:title="$t('app.importJSONHint')"
			accept=".jss"
			id="import"
			icon_image="import32.png"></bot-scheme-toolbar-file-input-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddMessageBlock"
			@touchstart="onTouchStartAddMessageBlock"
			:title="$t('app.addMessageBlockHint')"
			icon_image="addMessage32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddTimerBlock"
			@touchstart="onTouchStartAddTimerBlock"
			:title="$t('app.addTimerBlockHint')"
			icon_image="clock32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddConditionBlock"
			@touchstart="onTouchStartAddConditionBlock"
			:title="$t('app.addConditionBlockHint')"
			icon_image="if32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddActionBlock"
			@touchstart="onTouchStartAddActionBlock"
			:title="$t('app.addActionBlockHint')"
			icon_image="act32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickExportToJSON"
			@touchstart="onTouchStartExportToJSON"
			:title="$t('app.exportJSONHint')"
			icon_image="export32.png"></bot-scheme-toolbar-button>
		
			
	</div>
</template>
<script>
	export default {
		name: 'botSchemeToolbar',

		//Аргументы (html атрибуты) извне
		props:{

		},

		components:{
			'bot-scheme-toolbar-button': require('./botSchemeToolbar/botSchemeToolbarButton.vue').default,
			'bot-scheme-toolbar-file-input-button': require('./botSchemeToolbar/botSchemeToolbarFileInputButton.vue').default
		},

		//вызывается раньше чем mounted
		data: function(){return {
			
		}; },
		//
		methods:{
			/**
			 * @description Обработка события выбора файла
			*/
			onSelectFileForImportFromJSON(event) {
				event.preventDefault();
				this._emitToolbarEvent('importFromJSONButtonSelected', event.target.files[0]);
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartExportToJSON(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('exportToJSONButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickExportToJSON(event) {
				event.preventDefault();
				this._emitToolbarEvent('exportToJSONButtonClicked');
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartAddActionBlock(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('addActionBlockButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddActionBlock(event) {
				event.preventDefault();
				this._emitToolbarEvent('addActionBlockButtonClicked');
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartAddConditionBlock(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('addConditionBlockButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddConditionBlock(event) {
				event.preventDefault();
				this._emitToolbarEvent('addConditionBlockButtonClicked');
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartAddTimerBlock(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('addTimerBlockButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddTimerBlock(event) {
				event.preventDefault();
				this._emitToolbarEvent('addTimerBlockButtonClicked');
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartAddMessageBlock(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('addMessageBlockButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddMessageBlock(event) {
				event.preventDefault();
				this._emitToolbarEvent('addMessageBlockButtonClicked');
			},
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartNewScheme(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatePropagation();
				this._emitToolbarEvent('newSchemeButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickNewScheme(event) {
				event.preventDefault();
				this._emitToolbarEvent('newSchemeButtonClicked');
			},
			/**
			 * @description Оповещает систему о том, какая кнопка на тулбаре была нажата
			 * @param {String} eventName
			 * @param {File} file = null
			*/
			_emitToolbarEvent(eventName, file = null) {
				if (!file) {
					this.$emit('toolbarevent', {name: eventName});
				} else {
					this.$emit('toolbarevent', {name: eventName, file: file});
				}
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>
