import Vue from 'vue'
import vueRouter from 'vue-router'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'

Vue.use(vueRouter)

const router = new vueRouter({
    routes:[
        {
            path: '/',
            name: 'PageHome',
            component: PageHome
        },
        {
            path: '/meetups/:id',
            name: 'PageMeetupDetail',
            component: PageMeetupDetail
        },
        {
            path: '/login',
            name: 'PageLogin',
            component: PageLogin
        },
        {
            path: '/register',
            name: 'PageRegister',
            component: PageRegister
        }
        // to follow up on the PageFind
        // and PageNotFound (*)
    ],
    mode: 'history'
})

export default router