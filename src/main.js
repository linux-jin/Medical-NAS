import Vue from 'vue'
import App from './App.vue'

import Router from './router'
import Store from './store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'lib-flexible/flexible.js'

import moment from 'vue-moment'
import _ from 'lodash'
import api from './utils/http'
import wx from 'weixin-jsapi'
import './plugins/vant'
import './components/special/MedSvg'
import components from './plugins/components'
import storage from 'store'

import './assets/styles/index.less'
import './assets/iconfonts/iconfont.css'

Vue.prototype._ = _
Vue.prototype._storage = storage
Vue.prototype._wx = wx

Vue.use(moment)
Vue.use(components)
Vue.use(api)
Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
