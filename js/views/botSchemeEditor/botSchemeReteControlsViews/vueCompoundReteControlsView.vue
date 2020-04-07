<template>
	<div>
		<div>{{ sLabel }}</div>
			<div><input @input="change($event)" class="conditionName" type="text" :value="value"></div>
		<div>{{ sType }}</div>
	</div>
</template>
<script>

export default {
	
	name: 'VueCompoundReteControlView',

	props: [
		/** @property {Rete.Editor} emitter ссылка на rete.editor */
		'emitter',
		/** @property {Function} VueI18n $t функция трансляции, по не совсем понятным причинам не доступная в этом компоненте Vue "из коробки" (Это отдельный экземпляр Vue?) */
		'$t',
		/** @property {String} sLabel метка "Условие" или "Действие" */
		'sLabel',
		/** @property {String} sLabel тип для наглядности, например тип для условий, по всем или по одному  */
		'sType',
		/** @property {Rete.Node} oReteNode ссылка на связанный узел */
		'oReteNode',
		/** @property {Function} putData метод записи, через него осуществляется связь с данными наследника Rete.Control */
		'putData', 
		/** @property {Function} как putData только для получения */
		'getData',
		/** @property {String} редактируемое описание узла по умолчанию */
		'defaultDescription'
	],
	
	data() {
		return {
			//Это по примеру https://codepen.io/lamzin-andrey/pen/poJMZag но по моему, это не работает
			value: '',
		}
	},

	methods: {
		/**
		 * @param {String} type = '' Может содержать onchange
		*/
		update(type = '') {
			this.putData('msg', this.value);
			this.emitter.trigger('process');

			//putData Устанавливает в данных узла редактора node.data.short_description
			this.putData('short_description', this.value);
			this.putData('sType', this.sType);
			this.putData('aItems', this.aItems);
			let eventType = type ? type : 'process';
			this.emitter.trigger('process', {eventType: eventType, node: this.oReteNode});	
		},
		/**
		 * @description Установить текст в контроле краткого описания по умолчанию
		 * @param {String} s 
		*/
		change(e) {
	        this.value = e.target.value;
	        this.update('onchange');
	    }
	},

	mounted() {
		this.value = this.getData('short_description') || this.defaultDescription;
		//TODO вот это совсем не очевидно было (сохранение из редактора)! Надо что-то придумать как минимум написать в документации
		this.sType = this.getData('sType') || this.sType;
		this.aItems = this.getData('aItems') || this.aItems;
		this.update();
	}
}
</script>
