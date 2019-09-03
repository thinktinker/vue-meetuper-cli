import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import meetups from './modules/meetups'
import threads from './modules/threads'
Vue.use(Vuex)

export default  new Vuex.Store({
    modules:{
        categories,
        meetups,
        threads
    },
    mutations:{
        //create a generic mutation function to handle all the actions
        setItems(state, {resource, items}){
            state[resource].items = items
        },
        setItem(state, {resource, item}){
            state[resource].item = item
        }
    }
})