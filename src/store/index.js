import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default  new Vuex.Store({
    state:{
        meetups: [],
        categories: [],
        threads: [],
        meetup: {}
    },
    getters:{
    },
    actions:{
        fetchMeetups({state, commit}){
            commit('setItems', {resource: 'meetups', items:[]})
            axios.get('/api/v1/meetups').then(res=>{
                const meetups = res.data
                commit('setItems', {resource: 'meetups', items:meetups})
                return state.meetups
            })
        },
        fetchCategories({state, commit}){
            axios.get('/api/v1/categories').then(res=>{
                const categories = res.data
                commit('setItems', {resource: 'categories', items:categories})
                return state.categories
            })
        },
        fetchMeetup({state, commit}, meetupId){
            commit('setItem', {resource: 'meetup', items:{} })
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{
                const meetup = res.data
                commit('setItems', {resource: 'meetup', items:meetup})
                return state.meetup
            })
        },
        fetchThreads({state, commit}, meetupId){
            commit('setItems', {resource: 'threads', items:[]})
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
            .then(res=>{
                const threads = res.data
                commit('setItems', {resource: 'threads', items: threads})
                return state.threads
            })
        }
    },
    mutations:{
        //create a generic mutation function to handle all the actions
        setItems(state, {resource, items}){
            state[resource] = items
        },
        setItem(state, {resource, item}){
            state[resource] = item
        }
    }
})