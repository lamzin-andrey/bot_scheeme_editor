import Rete from 'rete';

class BotSchemeEditorCompoundControl extends Rete.Control {

    /**
     * 
     * @param {Rete.Editor} emitter 
     * @param {Number} interval //??
     * @param {VueI18n} $t
     * @param {String} sLabel метка "Условие" или "Действие"
     * @param {String} sType тип, например "OR" или "AND" для условий. Будет отображаться на блоке схемы
     */
    constructor(emitter, interval, $t, sLabel, sType) {
        super('BotSchemeEditorCompoundControl');
        this.emitter = emitter;
        this.template = `<div>{{ sLabel }}</div>
                        <div><input @input="change($event)" class="conditionName" type="text" :value="value"></div>
                        <div>{{ sType }}</div>`;
        this.$t = $t;
        this.scope = {
            /** @property {String} value пользователь сможет вводить краткое описание условия для наглядности  */
            value: '',
            /** @property {String} sType тип для наглядности, например тип для условий, по всем или по одному  */
            sType: sType,
            /** @property {String} sLabel метка "Условие" или "Действие" */
            sLabel: sLabel,
            change: this.change.bind(this)
        };
    }

    change(e) {
        this.scope.value = e.target.value;
        this.update();
    }

    update() {
        //putData Устанавливает в данных узла редактора node.data.interval
        this.putData('short_description', this.scope.value);
        this.emitter.trigger('process');
        this._alight.scan();
    }
    /**
     * @description Установить текст в контроде краткого описания по умолчанию
     * @param {String} s 
     */
    setDefaultDescription(s) {
        this.defaultDescription = s;
    }

    mounted() {
        this.scope.value = this.getData('short_description') || this.defaultDescription;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this.update();
    }
}
export default BotSchemeEditorCompoundControl;