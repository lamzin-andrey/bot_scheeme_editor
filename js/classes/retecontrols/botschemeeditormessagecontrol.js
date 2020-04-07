import Rete from 'rete';

import VueMessageReteControlView from '../../views/botSchemeEditor/botSchemeReteControlsViews/vueMessageReteControlsView.vue';

class BotSchemeEditorMessageControl extends Rete.Control {

    constructor(emitter, msg) {
        super('BotSchemeEditorMessageControl');
        this.props = {emitter, msg};
        this.component = VueMessageReteControlView;
    }

    setValue(val) {
        this.value = val;
        this.update();
    }
}
export default BotSchemeEditorMessageControl;