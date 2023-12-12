import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Admin from '../components/admin/Admin'
import Pessoas from '../components/pessoas/Pessoas'
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
},
// {
//     name: 'regionais',
//     path: '/regionais',
//     component: Regionais
// },
{
    name: 'pessoas',
    path: '/pessoas',
    component: Pessoas
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


