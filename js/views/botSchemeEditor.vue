<template>
	<div>
		<bot-scheme-toolbar></bot-scheme-toolbar>
		<bot-scheme-editor-area></bot-scheme-editor-area>
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
			
		}; },
		//
		methods:{
			/**
			 * @description
			*/
			on() {
				
			}
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
		}
	}
</script>
