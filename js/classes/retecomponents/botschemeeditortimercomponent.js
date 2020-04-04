import Rete from 'rete';
import BotSchemeEditorTimerControl from '../retecontrols/botschemeeditortimercontrol';

class BotSchemeEditorTimerComponent extends Rete.Component{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {VueI18n} translator 
	 * @param {String} sImageCatalog путь к папке с изображениями
	*/
	constructor(sComponentId, oSocket, translator, sImageCatalog) {
		super(sComponentId);
		this.sComponentId = sComponentId;
		this.socket = oSocket;
		this.$t = translator;
		this.sImageCatalog = sImageCatalog;
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
			ctrl = new BotSchemeEditorTimerControl(this.editor, node.data.interval, this.$t, this.sImageCatalog);
		node.addOutput(outputTimer);
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
			//"Глушим" стандартный пункт контекстного меню, чтобы была возможность его локализовать
			'Delete': false,
			//"Глушим" стандартный пункт контекстного меню, потому что он не нужен
			'Clone': false,
		};
	}
}
export default BotSchemeEditorTimerComponent;