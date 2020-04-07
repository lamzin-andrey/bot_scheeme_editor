<template>
	<div class="bot-scheme-editor-msg-view">{{ msg }}</div>
</template>
<script>



export default {
	
	name: 'VueMessageReteControlView',

	props: ['emitter', 'getData', 'putData', 'msg'],
	
	data() {
		return {
			value: 0,
		}
	},

	methods: {
		update() {
			this.putData('msg', this.value);
			this.emitter.trigger('process');
		}
	},

	mounted() {
		this.value = this.getData('msg') || '';
	}
}
</script>
