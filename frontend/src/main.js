import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import store from './config/store'
import './config/bootstrap'
import router from './config/router'
import './config/msgs'

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhcHAuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1MDQ5OTY4NywiZXhwIjoxNjUwNTg2MDg3fQ.zR6GkR-FHjtw39TJIsjXHlCFtjqIW4AnzdAmiWnIMPM'
//Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')