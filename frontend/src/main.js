import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import store from './config/store'
import './config/bootstrap'
import router from './config/router'
import './config/msgs'

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhcHAuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1MDI4MjczMiwiZXhwIjoxNjUwMzY5MTMyfQ.71WGFu8BBLbum1n7McX4Bj5JmSBun6AbSvpYy0m-OdQ'
//Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')