import axios from 'axios'

export default{
    namespaced: true,
    state:{
        user: {}
    },
    actions:{
        registerUser({state, commit}, formData){
            return axios.post('/api/v1/users/register', formData)
        },
        loginUser({state, commit}, formData){
            return axios.post('/api/v1/users/login', formData)
            .then((res) =>{
                const user = res.data
                commit('setAuthUser', user)
            })
        }
    },
    mutations:{
        setAuthUser(state, user){
            return state.user = user
        }
    }

}