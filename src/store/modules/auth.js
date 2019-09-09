export default{
    namespaced: true,
    state:{

    },
    actions:{
        registerUser({state, commit}, formData){
            console.log("registerUser" + JSON.stringify(formData))
        },
        loginUser({state, commit}, formData){
            console.log("loginUser" + JSON.stringify(formData))
        }
    }

}