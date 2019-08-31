import Vue from 'vue'
import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

Vue.filter('capitalize', (value)=>{
  if(value && typeof value === 'string')
    return value.charAt(0).toUpperCase() + value.slice(1)
  
  return ''
})

Vue.filter('formatDate', (value, formatVal = 'LL')=>{
  if(!value)
    return ''

  return moment(value).format(formatVal)
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
