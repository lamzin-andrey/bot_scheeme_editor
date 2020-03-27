<template>
	<div class="bot-scheme-editor-property-editor-block">
		<div class="bot-scheme-editor-property-editor-title-wrapper">
			<div class="bot-scheme-editor-property-editor-title">
				{{ $t('app.EditMessageText') }}
			</div>
			<div @click="$emit('editorpropertyrevent', {type:'close'})" class="bot-scheme-editor-property-editor-title-close">&times;</div>
			<div class="clearfix"></div>
		</div>
		<textarea v-model="content" class="bot-scheme-editor-property-editor-textarea" rows="15"></textarea>
		<div class="text-right mt-3">
			<button @click="onClickSave" class="bot-scheme-editor-property-editor-button">{{ $t('app.Save') }}</button>
			<button @click="$emit('editorpropertyrevent', {type:'close'})" class="bot-scheme-editor-property-editor-button">{{ $t('app.Close') }}</button>
		</div>
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
			/** @property {String} content текст сообщения, который может быть отредактирован */
			content : ''
		}; },
		//
		methods:{
			/**
			 * @description Обработка клика на кнопке "Сохранить"
			*/
			onClickSave(event) {
				this.$emit('editorpropertyrevent', {type:'saveMessage', id: this.editNodeId, message: this.content});
			},
			/**
			 * @description Установка id узла редактируемого сообщепния
			 * @property {Number} id
			*/
			setBlockId(id) {
				this.editNodeId = id;
			},
			/**
			 * @description Получить идентификатор узла, данные которого загружены в редактор
			 * @return Number
			*/
			getBlockId() {
				return this.editNodeId;
			},
			/**
			 * @description Установить текст сообщения
			 * @property  {String} text
			*/
			setMessageText(text) {
				this.content = text;
			},
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {

		}
	}
</script>
<style scoped>
	.bot-scheme-editor-property-editor-block {
		height: 100vh;
		width: 320px;
		background-color: #ece9d8;
	}
	.clearfix {
		clear:both;
	}
	.bot-scheme-editor-property-editor-title-wrapper {
		border: 2px solid rgb(100, 89, 89);
	}
	.bot-scheme-editor-property-editor-title {
		padding:4px 0px 4px 10px;
		font-weight: bold;
		color:rgb(100, 89, 89);
		float:left;
		font-size: 12px;
	}
	.bot-scheme-editor-property-editor-title-close {
		float:right;
		border:rgb(100, 89, 89) 1px solid;
		cursor: pointer;
		padding: 0 3px;
		height: 22px;
	}
	.bot-scheme-editor-property-editor-title-close:hover {
		background-color: rgb(180, 179, 173);
	}
	.bot-scheme-editor-property-editor-textarea {
		resize: vertical;
		width:98%;
	}
	.bot-scheme-editor-property-editor-button {
		border:rgb(100, 89, 89) 2px solid;
		color: rgb(100, 89, 89);
		background-color: #ece9d8;
		cursor:pointer;
	}
	.text-right {
		text-align: right;
	}
	.mb-3 {
		margin-bottom: 1rem;
	}
	.mt-3 {
		margin-top: 1rem;
	}
</style>