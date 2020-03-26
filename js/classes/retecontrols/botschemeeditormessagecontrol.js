import Rete from 'rete';

class BotSchemeEditorMessageControl extends Rete.Control {

    constructor(emitter, msg) {
        super('BotSchemeEditorMessageControl');
        this.emitter = emitter;
        this.template = '<div class="bot-scheme-editor-msg-view">{{ msg }}</div>';
        this.scope = {
            msg: msg
        };
    }

    update() {
        this.putData('msg', this.scope.value);
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData('msg') || '';
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this.update();
    }
}
export default BotSchemeEditorMessageControl;