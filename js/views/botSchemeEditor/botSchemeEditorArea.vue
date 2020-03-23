<template>
	<div>Initalization...</div>
</template>
<script>
	export default {
		name: 'botSchemeEditorArea',

		//Аргументы (html атрибуты) извне
		props:{

		},
		

		//вызывается раньше чем mounted
		data: function(){return {
			
		}; },
		//
		methods:{
			/**
			 * @description Добавление компонента
			*/
			addNewComponent() {
				console.log('Will added component');
			},
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
