import Vue from 'vue'
import vueRouter from 'vue-router'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'

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
        }
    ],
    mode: 'history'
})

export default router