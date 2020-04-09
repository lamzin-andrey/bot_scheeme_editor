import Rete from "rete";
import BotSchemeEditorBaseComponent from './botschemeeditorbasecomponent';

class BotSchemeEditorBeginComponent extends BotSchemeEditorBaseComponent {
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} VueI18n translator 
	 * @param {Object} config Конфигурация, см. app.example.js
	*/
	constructor(sComponentId, oSocket, translator, config) {
		super(sComponentId, oSocket, translator);
		this.setSocketsPosition( this.getSocketPositionFromConfig(config) );
	}
	/**
	 * @description вызывается при создании узла (При вызове editor.fromJSON)
	 * @param {Rete.node} node Узел, по сути "экземпляр" данного компонента
	 * В этом методе происходит кастомизирование узла (Количество входов и выходов, 
	 * возможность соединять несколько узлов на каждый из них)
	*/
	builder(node) {
		let outputStart = new Rete.Output('begin', this.$t('app.Begin'), this.socket, false);
		node.addOutput(outputStart);
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
			//"Глушим" стандартные пункты контекстного меню, потому что они не нужны
			'Delete': false,
			'Clone': false,
		};
	}
}
export default BotSchemeEditorBeginComponent;