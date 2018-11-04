// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import router from './router/index'
import element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from '@/plugins/http'
Vue.use(element)
Vue.use(axios)
import '@/assets/css/index.css'
Vue.config.productionTip = false
// 时间过滤器
Vue.filter('fmtDate',(value,fmtString) => {
//  return moment(value).formant(fmtDate)
 return moment(value).format(fmtString)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
