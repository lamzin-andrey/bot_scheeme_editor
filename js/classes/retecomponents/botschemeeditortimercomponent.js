import Rete from 'rete';
import BotSchemeEditorTimerControl from '../retecontrols/botschemeeditortimercontrol';

class BotSchemeEditorTimerComponent extends Rete.Component{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {VueI18n} translator 
	*/
	constructor(sComponentId, oSocket, translator) {
		super(sComponentId);
		this.sComponentId = sComponentId;
		this.socket = oSocket;
		this.$t = translator;
	}
	/**
	 * @description вызывается при создании узла (При вызове editor.fromJSON)
	 * @param {Rete.node} node Узел, по сути "экземпляр" данного компонента
	 * В этом методе происходит кастомизирование узла (Количество входов и выходов, 
	 * возможность соединять несколько узлов на каждый из них)
	*/
	builder(node) {
		let outputTimer = new Rete.Output('timerOutput', 'Timer', this.socket, false),
			input = new Rete.Input('messageIn', this.$t('app.Enter'), this.socket, true),
			ctrl = new BotSchemeEditorTimerControl(this.editor, node.data.interval, this.$t);
		node.addOutput(outputTimer);
		node.addInput(input);
		node.addControl(ctrl);
	}
	/**
	 * @description вызывается всякий раз при перерисовке узла
	*/
	worker(node, inputs, outputs) {
		//outputs['message'] = node.data.num;
		return {key: outputs};
	}
}
export default BotSchemeEditorTimerComponent;