import Rete from 'rete';
import VueCompoundReteControlView from '../../views/botSchemeEditor/botSchemeReteControlsViews/vueCompoundReteControlsView.vue';

class BotSchemeEditorCompoundControl extends Rete.Control {

    /**
     * 
     * @param {Rete.Editor} emitter 
     * @param {VueI18n} $t
     * @param {String} sLabel метка "Условие" или "Действие"
     * @param {String} sType тип, например "OR" или "AND" для условий. Будет отображаться на блоке схемы
     * @param {Rete.node} oReteNode ссылка на связанный узел
    */
    constructor(emitter, $t, sLabel, sType, oReteNode) {
		super('BotSchemeEditorCompoundControl');
		
		this.component = VueCompoundReteControlView;
		this.props = {emitter, $t, sLabel, sType, oReteNode, defaultDescription: ''};
    }

	/**
	 * @description Установить текст в контроле краткого описания по умолчанию
	 * @param {String} s 
	*/
	setDefaultNodeDescription(s) {
		this.props.defaultDescription = s;
	}

    setValue(val) {
		this.vueContext.value = val; //это из примера (https://codepen.io/Ni55aN/pen/EGZOdK), не уверен, что это работает.
		//Пример установки из примера this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);		
		
		//если остро понадобится,
		//this.props.value = val; - можно как-то так... Правда здесь и сейчас это работать не будет, потому что сейчас value должно быть в data... (судя по примеру)
    }
}

export default BotSchemeEditorCompoundControl;