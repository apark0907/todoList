import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vmodal from 'vue-js-modal'
    

Vue.use(vmodal)

new Vue({
  el: '#app',
  vuetify,
  render: h => h(App)
})
