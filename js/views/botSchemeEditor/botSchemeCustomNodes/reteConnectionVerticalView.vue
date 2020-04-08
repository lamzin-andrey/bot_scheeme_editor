<template>
	<div class="node" :class="[selected(), node.name] | kebab">
		<!--- hide title <div class="title">{{node.name}}</div> -->
		<!-- Это заготовка для коннекторов на горизонтальных гранях, почти ок, 
			но соединительная линия неверно соединяет-->
		<!-- Outputs-->
		<div class="verticalSocketsContainer verticalSocketsContainerTop">
			<div class="output " v-for="output in outputs()" :key="output.key">
			  <div class="socket-block">
			  	<Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
			  </div>
			  <div class="output-title" :title="output.name" >o</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- Controls-->
		<div class="control" v-for="control in controls()" v-control="control"></div>
		
		<!-- Inputs-->
		<div class="verticalSocketsContainer verticalSocketsContainerBottom">
			<div class="input" v-for="input in inputs()" :key="input.key">
				<div class="input-title" v-show="!input.showControl()" :title="input.name">i</div>
				<div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
				<div class="socket-block">
					<Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>
<script>

import VueRenderPlugin from 'rete-vue-render-plugin';

export default {
	
	name: 'ReteConnectionVerticalView',

	mixins: [VueRenderPlugin.mixin],

	components: {
		Socket: VueRenderPlugin.Socket
	},
}
</script>

<style scoped>

	.verticalSocketsContainer div.output,  .verticalSocketsContainer div.input {
		float: left;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 2px;
	}

	.verticalSocketsContainerTop div.output {
		margin-top: -6px;
	}

	.clearfix {
		clear: both;
	}

	.verticalSocketsContainer .output-title, .verticalSocketsContainer .input-title {
		width: 15px !important;
		max-height: 24px !important;
		overflow: hidden;
		background-color: white;
		color: #6a6ad7;
		border: #7190ee solid 2px;
		text-align: center;
		font-size: 20px;
		line-height: 20px;
		vertical-align: middle;
		font-weight: bold;
		font-style: italic;
	}

	/*.verticalSocketsContainerTop .socket-block {
		display:block;
	}

	.verticalSocketsContainerBottom div.input {
		position:relative;
	}

	.verticalSocketsContainerBottom .socket-block {
		position: absolute;
		top:24px;
	}*/

</style>