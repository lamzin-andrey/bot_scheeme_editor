import Rete from 'rete';

import ReteConnectionVerticalB2TView from '../../views/botSchemeEditor/botSchemeCustomNodes/reteConnectionVerticalB2TView.vue';
import ReteConnectionVerticalT2BView from '../../views/botSchemeEditor/botSchemeCustomNodes/reteConnectionVerticalT2BView.vue';

class BotSchemeEditorBaseComponent extends Rete.Component {

	/** @property static SOCKET_POSITION_V_T2B = 'SOCKET_POSITION_V_T2B' Размещает коннекторы на горизонтальной грани блока input сверху, output снизу */
	/** @property static SOCKET_POSITION_V_B2T = 'SOCKET_POSITION_V_B2T' Размещает коннекторы на горизонтальной грани блока input снизу, output сверху */
	/** @property static SOCKET_POSITION_H_L2R = 'SOCKET_POSITION_V_L2R' Размещает коннекторы на вертикальной грани блока input слева, output справа */

	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} VueI18n translator 
	 * @param {String} socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R можно изменять позицию коннекторов (см. константы BotSchemeEditorBaseComponent.SOCKET_POSITION_* )
	*/
	constructor(sComponentId, oSocket, translator, socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R) {
		super(sComponentId);

		this.sComponentId = sComponentId;
		this.socket = oSocket;
		this.$t = translator;

		this.setSocketsPosition(socketPosition);
		this.defaultDataComponent = this.data.component;
		
	}

	/**
	 * @description Устанавливает позицию входных и выходных коннекторов (сторону блока, на которой они находятся)
	 * @param {String} socketPosition одна из констант BotSchemeEditorBaseComponent.SOCKET_POSITION_*
	 */
	setSocketsPosition(socketPosition) {
		this.socketPosition = socketPosition;
		switch (socketPosition) {

			case BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R:
				this.data.component = this.defaultDataComponent;
				break;

			case BotSchemeEditorBaseComponent.SOCKET_POSITION_V_B2T:
				this.data.component = ReteConnectionVerticalB2TView;
				break;

			case BotSchemeEditorBaseComponent.SOCKET_POSITION_V_T2B:
				this.data.component = ReteConnectionVerticalT2BView;
				break;
		}

		/* Для понимания принципа работы. 
		
		Будет изменяться для всех нод этого компонента, но только при перерисовке схемы
		 (например при удалении или добавлении ноды)
		 
		this.initView = 'T2B';
		setInterval( () => {
			if (this.initView == 'T2B') {
				this.data.component = ReteConnectionVerticalB2TView;
				this.initView = 'B2T';
			} else {
				this.data.component = ReteConnectionVerticalT2BView;
				this.initView = 'T2B';
			}
		}, 5000 );
		*/
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
BotSchemeEditorBaseComponent.SOCKET_POSITION_V_T2B = 'SOCKET_POSITION_V_T2B';
BotSchemeEditorBaseComponent.SOCKET_POSITION_V_B2T = 'SOCKET_POSITION_V_B2T';
BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R = 'SOCKET_POSITION_V_L2R';

export default BotSchemeEditorBaseComponent;