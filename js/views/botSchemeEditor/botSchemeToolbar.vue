<template>
	<div>
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
				this._onClickAddComponent();
			},
			/**
			 * @description Обработка события click для desktop устройств
			*/
			onClickAddComponent(event) {
				event.preventDefault();
				this._onClickAddComponent();
			},
			_onClickAddComponent() {
				this.$emit('toolbarevent', {name: 'addComponentButtonClicked'});
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>
