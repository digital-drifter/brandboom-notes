import '@babel/polyfill'
import Vue, { CreateElement } from 'vue'
import '@/assets/main.styl'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import store from '@/store'
import wysiwyg from 'vue-wysiwyg'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(wysiwyg, {})

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false

new Vue({
  store,
  render: (h: CreateElement) => h(App)
}).$mount('#app')
