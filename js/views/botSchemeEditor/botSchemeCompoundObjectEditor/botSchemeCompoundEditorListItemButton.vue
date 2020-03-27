<template>
	<div class="list-item-button" @click="$emit('click', $event)"  @touchstart="$emit('touchstart', $event)">
		<img class="list-item-button-icon" :src="icon_image" >
	</div>
</template>
<script>
	export default {
		name: 'botSchemeCompoundEditorButton',

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
.list-item-button {
	cursor: pointer;
	border: 1px solid #D0DADF;
	border-radius: 4px;
	border-right-color: #8b9597;
	border-bottom-color: #8b9597;
	background-color: #FFF;
	margin: 4px auto;
	width: 30px;
	vertical-align: middle;
	text-align: center;
	line-height: 30px;
	height: 30px;
	display: inline-block;
	float:right;
}
.list-item-button-icon {
	vertical-align: middle;
	width: 24px;
	height: 24px;
}
</style>
