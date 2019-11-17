import Vue from 'vue'
import vueRouter from 'vue-router'
// import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageSecret from '@/pages/PageSecret'

Vue.use(vueRouter)

const router = new vueRouter({
    routes:[
        {
            path: '/',
            name: 'PageHome',
            component: PageHome
        },
        {
            path: '/meetups/secret',
            name: 'PageSecret',
            component: PageSecret,
            meta: {onlyAuthuser: true} //meta data to set user as onlyAuthUser
        },
        {
            path: '/meetups/:id',
            name: 'PageMeetupDetail',
            component: PageMeetupDetail
        },
        {
            path: '/login',
            name: 'PageLogin',
            component: PageLogin,
            // meta: {onlyGuestUser: true} //meta data to set user as onlyAuthUser
        },
        {
            path: '/register',
            name: 'PageRegister',
            component: PageRegister,
            // meta: {onlyGuestUser: true} //meta data to set user as onlyAuthUser
        }
        // to follow up on the PageFind
        // and PageNotFound (*)
        // and PageNotAuthenticated
    ],
    mode: 'history'
})

// router.beforeEach((to, from, next)=>{
//     //to apply code that distinguishes 'onlyAuthUser' or 'onlyGuestUser'
//     next()
// })

export default router