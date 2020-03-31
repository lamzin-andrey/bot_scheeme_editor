import Rete from "rete";
import BotSchemeEditorCompoundControl from "../retecontrols/botschemeeditorcompoundcontrol";

/**
 * @class BotSchemeEditorCompoundComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorCompoundComponent extends Rete.Component{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {VueI18n} translator
	*/
	constructor(sComponentId, oSocket, translator) {
		super(sComponentId);
		/** @property {String} sLabelOfType Текст "Условие" или "Действие", определяется в Child */
		this.sLabelOfType = '';
		/** @property {String} sTypeInfo например текст "По всем" или "Достаточно одного", определяется в Child */
		this.sTypeInfo = '';
		/** @property {String} sDefaultDescriptionText например текст "Краткое описание условия" или "Краткое описание действия", определяется в Child */
		this.sDefaultDescriptionText = '';

		this.sComponentId = sComponentId;
		this.socket = oSocket;
		this.$t = translator;
		

		/* Возможно, что-то подобное понадобится
		this.task = {
			outputs: {act: 'option', key: 'output'},
			init(task){
			 	eventHandlers.remove();
				eventHandlers.add('keydown', function (e) {
					task.run(e.keyCode);
					task.reset();
				});
			}
		}*/
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
														this.sLabelOfType, this.sTypeInfo);
			ctrl.setDefaultDescription(this.sDefaultDescriptionText);
		
		node.addControl(ctrl);
		node.addOutput(outputYes);
		node.addOutput(outputNo);
		node.addOutput(outputParralels);
		node.addInput(input);
    }
    /**
	 * @description Добавляет элемент  в список действий или условий
	 * @param {String} sItemLabel - отображаемая на блоке метка действия или условия
	*/
    addItemInList(sItemLabel) {
        //TODO or override in child
    }
    /**
	 * @description Указывает узлу тип (например, установить значение переменной или считать по всем условиями или по любому из условия)
	 * @param {String} sItemLabel - отображаемая на блоке метка действия или условия
	*/
    setType(sType) {
        //TODO or override in child
    }
	/**
	 * @description вызывается всякий раз при перерисовке узла
	*/
	worker(node, inputs, outputs) {
		outputs['num'] = node.data.num;
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
export default BotSchemeEditorCompoundComponent;