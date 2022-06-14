import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Admin from '../components/admin/Admin'
import Interpretes from '../components/interpretes/Interpretes'
import Colaboradores from '../components/colaboradores/Colaboradores'
import Surdos from '../components/surdos/Surdos'
import Regionais from '../components/regionais/Regionais'
import Auth from '../components/auth/Auth'

import { userKey } from '@/global'

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
},{
    name: 'colaboradores',
    path: '/colaboradores',
    component: Colaboradores
},{
    name: 'surdos',
    path: '/surdos',
    component: Surdos
},
{
    name: 'regionais',
    path: '/regionais',
    component: Regionais
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
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


