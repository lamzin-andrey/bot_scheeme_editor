import BotSchemeEditorCompoundComponent from "./botschemeeditorcompoundcomponent";

/**
 * @class BotSchemeEditorConditionComponent базовый для компонентов условий и действий
*/
class BotSchemeEditorConditionComponent extends BotSchemeEditorCompoundComponent{
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} translator VueI18n
	 * @param {Object} config Конфигурация, см. app.example.js
	*/
	constructor(sComponentId, oSocket, translator, config) {
		super(sComponentId, oSocket, translator);
		this.setSocketsPosition( this.getSocketPositionFromConfig(config) );
        //Установить метку, условие это или действие
        this.sLabelOfType = translator('app.Condition');
		this.sTypeInfo = translator('app.ByOR');
		this.sDefaultDescriptionText = translator('app.ShortCondDesc');
	}
}
export default BotSchemeEditorConditionComponent;