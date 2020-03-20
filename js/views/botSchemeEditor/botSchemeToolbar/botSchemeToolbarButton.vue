<template>
	<div class="bot-scheme-toolbar-button">
		<img :src="icon_image">
	</div>
</template>
<script>
	export default {
		name: 'botSchemeToolbarButton',

		//Аргументы (html атрибуты) извне
		props:{
			'icon_image': {
				type:String,
				default: '/images/bot-scheme-toolbar/add32.png'
			}
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
<style>
	.bot-scheme-toolbar-button {
		cursor:pointer;
	}
</style>
