import Rete from "rete";
import BotSchemeEditorBaseComponent from './botschemeeditorbasecomponent';
import BotSchemeEditorCompoundControl from "../retecontrols/botschemeeditorcompoundcontrol";

/**
 * @class BotSchemeEditorCompoundComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorCompoundComponent extends BotSchemeEditorBaseComponent {
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} VueI18n translator
	 * @param {String} socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R можно изменять позицию коннекторов (см. константы BotSchemeEditorBaseComponent.SOCKET_POSITION_* )
	*/
	constructor(sComponentId, oSocket, translator, socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R) {
		super(sComponentId, oSocket, translator, socketPosition);
		
		/** @property {String} sLabelOfType Текст "Условие" или "Действие", определяется в Child */
		this.sLabelOfType = '';
		/** @property {String} sTypeInfo например текст "По всем" или "Достаточно одного", определяется в Child */
		this.sTypeInfo = '';
		/** @property {String} sDefaultDescriptionText например текст "Краткое описание условия" или "Краткое описание действия", определяется в Child */
		this.sDefaultDescriptionText = '';
	}
	/**
	 * @description Вызывается при создании узла (При вызове editor.fromJSON)
	 * @param {Rete.node} node Узел, по сути "экземпляр" данного компонента
	 * В этом методе происходит кастомизирование узла (Количество входов и выходов, 
	 * возможность соединять несколько узлов на каждый из них)
	*/
	builder(node) {
        let outputYes = new Rete.Output('yes', this.$t('app.Yes'), this.socket, false),
            outputNo = new Rete.Output('no', this.$t('app.No'), this.socket, false),
            outputParralels = new Rete.Output('parallelExecuting', this.$t('app.parallelExecuting'), this.socket, false),
			input = new Rete.Input('input', this.$t('app.Enter'), this.socket, true),
			ctrl = new BotSchemeEditorCompoundControl(this.editor, this.$t,
														this.sLabelOfType, this.sTypeInfo, node);
			console.log('BotSchemeEditorCompoundComponent::builder: bef call setDefaultNodeDescription');
			ctrl.setDefaultNodeDescription(this.sDefaultDescriptionText);
		
		node.addControl(ctrl);
		node.addOutput(outputYes);
		node.addOutput(outputNo);
		node.addOutput(outputParralels);
		node.addInput(input);
    }
}
export default BotSchemeEditorCompoundComponent;