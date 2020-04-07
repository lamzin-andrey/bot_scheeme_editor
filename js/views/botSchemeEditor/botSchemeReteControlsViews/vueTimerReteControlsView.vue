<template>
	<div>
		<img class="timer-icon" :src="sImageCatalog + '/clock32.png'">
		<input @input="change($event)" type="number" :value="value"> {{ $t('app.sec') }}
	</div>
</template>
<script>



export default {
	
	name: 'VueTimerReteControlView',

	props: ['emitter', 'getData', 'putData', 'interval', 'sImageCatalog', '$t'],
	
	data() {
		return {
			value: 0,
		}
	},

	methods: {
		update() {
			//putData Устанавливает в данных узла редактора node.data.interval
	        this.putData('interval', this.value);
	        this.emitter.trigger('process');
		},

		change(e) {
	        this.value = +e.target.value;
	        this.update();
	    }
	},

	mounted() {
		this.value = this.getData('interval') || 1;
	}
}
</script>
