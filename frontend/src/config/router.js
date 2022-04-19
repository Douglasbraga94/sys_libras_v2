import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Admin from '../components/admin/Admin'
import Interpretes from '../components/interpretes/Interpretes'

// import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'admin',
    path: '/admin',
    component: Admin
},{
    name: 'interpretes',
    path: '/interpretes',
    component: Interpretes
}]

export default new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)

//     if(to.matched.some(record => record.meta.requiresAdmin)) {
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({ path: '/' })
//     } else {
//         next()
//     }
// })


