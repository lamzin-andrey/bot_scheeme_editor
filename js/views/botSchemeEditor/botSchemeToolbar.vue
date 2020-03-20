<template>
	<div>
		<bot-scheme-toolbar-button icon-image="/images/bot-scheme-toolbar/add32.png"></bot-scheme-toolbar-button>
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
			 * @description
			*/
			on() {
				this.params.onOk.f.call(this.params.onOk.context);
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>
