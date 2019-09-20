import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick"
import "./assets/reset.css"
import "./assets/iconfont.css"

FastClick.attach(document.body);
Vue.config.productionTip = false;
router.afterEach(() => {
  window.scrollTo(0, 0);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')