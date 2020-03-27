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
		name: 'botSchemeMessageEditor',

		//Аргументы (html атрибуты) извне
		props:{

		},

		components:{
			
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
				this.$emit('editorpropertyevent', {type:'saveMessage', id: this.editNodeId, message: this.content});
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