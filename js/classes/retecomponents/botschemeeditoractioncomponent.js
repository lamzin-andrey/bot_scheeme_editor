import BotSchemeEditorCompoundComponent from "./botschemeeditorcompoundcomponent";

/**
 * @class BotSchemeEditorActionComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorActionComponent extends BotSchemeEditorCompoundComponent{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {VueI18n} translator 
	*/
	constructor(sComponentId, oSocket, translator) {
        super(sComponentId, oSocket, translator);
        //Установить метку, условие это или действие
        this.sLabelOfType = translator('app.Action');
        this.sTypeInfo = translator('app.ActionType');
        this.sDefaultDescriptionText = translator('app.ShortActDesc');
	}
    /**
	 * @description Добавляет элемент  в список действий или условий
	 * @param {String} sItemLabel - отображаемая на блоке метка действия или условия
	*/
    addItemInList(sItemLabel) {
        //TODO or override in child.. if need 
    }
    /**
	 * @description Указывает узлу тип (например, установить значение переменной или считать по всем условиями или по любому из условия)
	 * @param {String} sItemLabel - отображаемая на блоке метка действия или условия
	*/
    setType(sType) {
        //TODO or override in child.. if need 
    }
}
export default BotSchemeEditorActionComponent;