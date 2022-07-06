import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.config.js'

Vue.use(Router)
const isProd = ['prod', 'production'].includes(process.env.NODE_ENV)

export default () => {
  return new Router({
    mode: isProd ? 'hash' : 'history',
    routes
  })
}
