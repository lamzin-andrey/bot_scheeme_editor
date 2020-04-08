<template>
	<div class="node" :class="[selected(), node.name] | kebab">
		<!--- hide title <div class="title">{{node.name}}</div> -->
		<!-- Inputs-->
		<div class="verticalSocketsContainer verticalSocketsContainerTop">
			<div class="input" v-for="input in inputs()" :key="input.key">
				<div class="socket-block" :title="input.name">
					<Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
				</div>
				<div class="input-title" v-show="!input.showControl()" :title="input.name">i</div>
				<div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
			</div>
			<div class="clearfix"></div>
		</div>

		<!-- Controls-->
		<div class="control" v-for="control in controls()" v-control="control"></div>
		
		<!-- Outputs-->
		<div class="verticalSocketsContainer verticalSocketsContainerBottom">
			<div class="output " v-for="output in outputs()" :key="output.key">
			  <div class="output-title" :title="output.name" >o</div>
			  <div class="socket-block" :title="output.name">
			  	<Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
			  </div>
			</div>
			<div class="clearfix"></div>
		</div>
		
	</div>
</template>
<script>

import VueRenderPlugin from 'rete-vue-render-plugin';

export default {
	
	name: 'ReteConnectionVerticalB2TView',

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
		margin-left: 2px;
	}

	.verticalSocketsContainerTop div.input {
		margin-top: -6px;
		margin-bottom: 5px;
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
		margin-left: 4px;
	}

	.verticalSocketsContainerTop .socket-block {
		display:block;
	}


	.verticalSocketsContainerBottom div.output {
		margin-top: 17px;
	}
	.verticalSocketsContainerBottom .socket-block {
		margin-top: -12px;
	}

	.verticalSocketsContainerBottom {
		max-height: 54px;
	}

	

	.node {
		background: rgba(110, 136, 255, 0.8);
		border: 2px solid #4e58bf;
		border-radius: 10px;
		cursor: pointer;
		min-width: 180px;
		height: auto;
		padding-bottom: 6px;
		box-sizing: content-box;
		position: relative;
		user-select: none;
	}

	.node .control {
	    padding: 6px 18px;
	}

</style>