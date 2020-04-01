<template>
	<div>
		<bot-scheme-toolbar-button 
			@click="onClickNewScheme"
			@touchstart="onTouchStartNewScheme"
			:title="$t('app.newSchemeCreate')"
			icon_image="/images/bot-scheme-toolbar/new32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddMessageBlock"
			@touchstart="onTouchStartAddMessageBlock"
			:title="$t('app.addMessageBlockHint')"
			icon_image="/images/bot-scheme-toolbar/addMessage32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddTimerBlock"
			@touchstart="onTouchStartAddTimerBlock"
			:title="$t('app.addTimerBlockHint')"
			icon_image="/images/bot-scheme-toolbar/clock32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddConditionBlock"
			@touchstart="onTouchStartAddConditionBlock"
			:title="$t('app.addConditionBlockHint')"
			icon_image="/images/bot-scheme-toolbar/if32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddActionBlock"
			@touchstart="onTouchStartAddActionBlock"
			:title="$t('app.addActionBlockHint')"
			icon_image="/images/bot-scheme-toolbar/act32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickExportToJSON"
			@touchstart="onTouchStartExportToJSON"
			:title="$t('app.exportJSONHint')"
			icon_image="/images/bot-scheme-toolbar/export32.png"></bot-scheme-toolbar-button>
			
	</div>
</template>
<script>
	export default {
		name: 'botSchemeToolbar',

		//Аргументы (html атрибуты) извне
		props:{

		},

		components:{
			'bot-scheme-toolbar-button': require('./botSchemeToolbar/botSchemeToolbarButton.vue').default
		},

		//вызывается раньше чем mounted
		data: function(){return {
			
		}; },
		//
		methods:{
			/**
			 * @description Обработка события touchstart для планшетных устройств
			*/
			onTouchStartExportToJSON(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatelePropaganation();
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
				event.stopImmediatelePropaganation();
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
				event.stopImmediatelePropaganation();
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
				event.stopImmediatelePropaganation();
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
				event.stopImmediatelePropaganation();
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
				event.stopImmediatelePropaganation();
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
			*/
			_emitToolbarEvent(eventName) {
				this.$emit('toolbarevent', {name: eventName});
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>
