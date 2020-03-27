import Rete from 'rete';

class BotSchemeEditorTimerControl extends Rete.Control {

    /**
     * 
     * @param {Rete.Editor} emitter 
     * @param {Number} interval 
     * @param {VueI18n} $t 
     */
    constructor(emitter, interval, $t) {
        super('BotSchemeEditorTimerControl');
        this.emitter = emitter;
        this.template = `<img class="timer-icon" src="/images/bot-scheme-toolbar/clock32.png">
        <input @input="change($event)" type="number" :value="value"> ${$t('app.sec')}`;
        this.scope = {
            value: 0,
            change: this.change.bind(this)
        };
    }

    change(e) {
        this.scope.value = +e.target.value;
        this.update();
    }

    update() {
        //putData Устанавливает в данных узла редактора node.data.interval
        this.putData('interval', this.scope.value);
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData('interval') || 1;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this.update();
    }
}
export default BotSchemeEditorTimerControl;