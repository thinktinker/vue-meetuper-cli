import axios from 'axios'

export default{
    namespaced: true,
    state:{
        user: null
    },
    getters:{
        authUser(state){
            return state.user || null
        },
        isAuthenticated(state){
            return !!state.user
        }
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
        },
        getAuthUser({state, commit}){
            return axios.get('/api/v1/users/me')
            .then(res=>{
                const user = res.data
                commit('setAuthUser', user)
                return user
            }).catch(e=>{
                console.log("user not identified")
            })
        }
    },
    mutations:{
        setAuthUser(state, user){
            return state.user = user
        }
    }

}