window.jQuery = window.$ = window.jquery = require('jquery');
window.Vue = require('vue');

//Конфигурация каталога с изображениями, которые использует приложение
Vue.prototype.$imageCatalog = '/portfolio/web-razrabotka/bot_scheme_editor/images/bot-scheme-toolbar';

Vue.component('bot-scheme-editor', require('./views/botSchemeEditor.vue').default);


//Интернациализация
import VueI18n  from 'vue-i18n';
import locales  from './vue-i18n-locales';

const i18n = new VueI18n({
	locale: 'ru', // set locale from window.locale if needs
	messages:locales, // set locale messages
});
//end Интернациализация


window.app = new Vue({
	i18n : i18n,
	el: '#app',

   // router,
   /**
	* @property Данные приложения
   */
   data: {
	 
   },
	/*components:{
		'bse': require('./views/botSchemeEditor.vue').default
	},*/
   /**
	* @description Событие, наступающее после связывания el с этой логикой
   */
   mounted() {
		
   },
   computed:{
		
   },
   /**
	* @property methods эти методы можно указывать непосредственно в @ - атрибутах
   */
   methods:{
	
	
	/**
	 * @description Click on button "Edit article" TODO Пример
	 * @param {Event} evt
	*/
   onClick(evt) {
		
	},
	
   }//end methods

}).$mount('#app');
