<template>
	<div>
		<bot-scheme-toolbar-button 
			@click="onClickNewScheme"
			@touchstart="onTouchStartNewScheme"
			:title="$t('app.newSchemeCreate')"
			icon_image="/images/bot-scheme-toolbar/new32.png"></bot-scheme-toolbar-button>

		<bot-scheme-toolbar-button 
			@click="onClickAddComponent"
			@touchstart="onTouchStartAddComponent"
			:title="$t('app.addComponentHint')"
			icon_image="/images/bot-scheme-toolbar/add32.png"></bot-scheme-toolbar-button>
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
			onTouchStartAddComponent(event) {
				//Чтобы не вызвался ещё и onclick
				event.preventDefault();
				event.stopImmediatelePropaganation();
				this._emitToolbarEvent('addComponentButtonClicked');
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddComponent(event) {
				event.preventDefault();
				this._emitToolbarEvent('addComponentButtonClicked');
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
