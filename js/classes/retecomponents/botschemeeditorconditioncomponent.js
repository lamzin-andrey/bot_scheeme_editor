import BotSchemeEditorCompoundComponent from "./botschemeeditorcompoundcomponent";

/**
 * @class BotSchemeEditorConditionComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorConditionComponent extends BotSchemeEditorCompoundComponent{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} VueI18n translator 
	*/
	constructor(sComponentId, oSocket, translator) {
        super(sComponentId, oSocket, translator);
        //Установить метку, условие это или действие
        this.sLabelOfType = translator('app.Condition');
		this.sTypeInfo = translator('app.ByOR');
		this.sDefaultDescriptionText = translator('app.ShortCondDesc');
	}
}
export default BotSchemeEditorConditionComponent;