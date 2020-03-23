<template>
	<div id="wrongway"></div>
</template>
<script>
	
	//Rete
	import Rete from "rete";
	import ConnectionPlugin from 'rete-connection-plugin';
	import VueRenderPlugin from 'rete-vue-render-plugin';
	import BotSchemeEditorComponentBase from '../../classes/botschemeeditorcomponentbase';
	// /Rete


	export default {
		name: 'botSchemeEditorArea',

		//Аргументы (html атрибуты) извне
		props:{

		},
		

		//вызывается раньше чем mounted
		data: function(){return {

			/** @property {Number} счётчик компонентов, для предотвращения создания компонента с одинаковым именеи (иначе rete ругается) */
			componentCounter : 0,

			/** @property {Array} aComponents массив с созданными компонентами */
			aComponents : []
		}; },
		//
		methods:{
			/**
			 * @description Добавление компонента
			*/
			addNewComponent() {
				console.log('Will added component');
				let oComponent = new BotSchemeEditorComponentBase('BaseComponent#' + this.componentCounter, this.componentCounter, this.numSocket);
				this.componentCounter++;
				this.editor.register(oComponent);
				this.engine.register(oComponent);

				this.aComponents.push( oComponent );

				console.log('Was added component');
			}
			
		},//end methods
		//вызывается после data, поля из data видны "напрямую" как this.fieldName
		mounted() {
			/** @property numSocket - Объект для коммуникации между узлами */
			this.numSocket = new Rete.Socket('Number value');

			this.container = document.querySelector('#wrongway');
			console.log(this.container);
			this.editor = new Rete.NodeEditor('demo@0.1.0', this.container);

			this.editor.use(ConnectionPlugin);
			this.editor.use(VueRenderPlugin);

			this.engine = new Rete.Engine('demo@0.1.0');
			

			this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
			    await this.engine.abort();
			    await this.engine.process(this.editor.toJSON());
			});
		}
	}
</script>
