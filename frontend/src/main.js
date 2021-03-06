import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/styles.scss'
Vue.use(ElementUI);
Vue.config.productionTip = false
export const eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
