import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import store from './config/store'
import './config/bootstrap'
import router from './config/router'
import './config/msgs'
import './config/axios'
import {LoadingService} from "@/service/LoadingService";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhcHAuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1MDU4ODQ1MSwiZXhwIjoxNjUwNjc0ODUxfQ.Vr5LCJt8cjEybmGtxW6imSaltBm7_B2906OV7bSr2UU'
// //Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Vue.prototype.$loadingService = new LoadingService();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
