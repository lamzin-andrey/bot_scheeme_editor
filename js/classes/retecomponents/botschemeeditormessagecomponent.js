import Rete from 'rete';
import BotSchemeEditorMessageControl from '../retecontrols/botschemeeditormessagecontrol';

class BotSchemeEditorMessageComponent extends Rete.Component{
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
		let outputMessageAnswer = new Rete.Output('messageAnswer', this.$t('app.answerOnMessage'), this.socket, false),
			outputParallelExecuting = new Rete.Output('parallelExecuting', this.$t('app.parallelExecuting'), this.socket, false),
			input = new Rete.Input('messageIn', this.$t('app.Enter'), this.socket, true),
			ctrl = new BotSchemeEditorMessageControl(this.editor, node.data.msg);
		node.addOutput(outputMessageAnswer);
		node.addOutput(outputParallelExecuting);
		node.addInput(input);
		node.addControl(ctrl);
	}
	/**
	 * @description вызывается всякий раз при перерисовке узла
	*/
	worker(node, inputs, outputs) {
		return {key: outputs};
	}
	/**
	 * @description Конфигурация контекстного меню компонента.
	 * @see Документацию по конфигурации ContextMenuPlugin (rete-context-menu-plugin  version ^0.5.2), поле nodeItems
	 * Проверка на равенство node.name имени компонента производится в botSchemeEditorArea.configureContextMenu
	 * @param {Object} applicationContext Должен обеспечивать методы removeBlockById и emitEditBlockEvent
	 * @param {Rete.node} node Узел (блок) схемы
	*/
	contextMenu(applicationContext, node) {
		return {
			'Удалить'() {
				applicationContext.removeBlockById(node.id);
			},
			'Редактировать'() {
				applicationContext.emitEditBlockEvent(node.id);
			},
			//"Глушим" стандартный пункт контекстного меню, чтобы была возможность его локализовать
			'Delete': false,
			//"Глушим" стандартный пункт контекстного меню, потому что он не нужен
			'Clone': false,
		};
	}
}
export default BotSchemeEditorMessageComponent;