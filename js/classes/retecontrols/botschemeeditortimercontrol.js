import Rete from 'rete';
import VueTimerReteControlView from '../../views/botSchemeEditor/botSchemeReteControlsViews/vueTimerReteControlsView.vue';

class BotSchemeEditorTimerControl extends Rete.Control {

    /**
     * TODO replace spaces on \t
     * @param {Rete.Editor} emitter 
     * @param {Number} interval 
     * @param {VueI18n} $t
     * @param {String}  sImageCatalog путь к папке с изображениями
     */
    constructor(emitter, interval, $t, sImageCatalog) {
        super('BotSchemeEditorTimerControl');
        this.props = {emitter, interval, $t, sImageCatalog};
        this.component = VueTimerReteControlView;

        this.scope = {
            value: 0,
            //просто в метод должно перейти? change: this.change.bind(this)
        };
    }


    setValue(val) {
        this.value = val;
        this.update();
    }
}
export default BotSchemeEditorTimerControl;