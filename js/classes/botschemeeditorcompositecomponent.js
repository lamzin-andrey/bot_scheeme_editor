import Rete from "rete";

/**
 * @class BotSchemeEditorCompositeComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorCompositeComponent extends Rete.Component{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {VueI18n} translator 
	*/
	constructor(sComponentId, oSocket) {
		super(sComponentId);
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
			input = new Rete.Input('input', this.$t('app.Enter'), this.socket, false);
		node.addOutput(outputYes);
		node.addOutput(outputNo);
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
}
export default BotSchemeEditorCompositeComponent;