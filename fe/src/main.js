import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

// // 전역변수 등록
// Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
// Vue.prototype.$gb = 333

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
