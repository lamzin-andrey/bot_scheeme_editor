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
