<template>
	<div class="bot-scheme-toolbar-button" @click="$emit('click', $event)"  @touchstart="$emit('touchstart', $event)">
		<img :src="icon_image" class="bot-scheme-toolbar-button-icon">
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
			},
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
		cursor: pointer;
		border: 2px solid #D0DADF;
		border-radius: 10px;
		border-right-color: #bdc8ca;
		border-bottom-color: #bdc8ca;
		background-color: #FFF;
		margin: 4px auto;
		width: 46px;
		vertical-align: middle;
		line-height: 46px;
		height: 46px;
		display: inline-block;
	}
	.bot-scheme-toolbar-button-icon {
		vertical-align: middle;;
	}
</style>
