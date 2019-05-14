import axios from "../axios-auth";
import router from "../router";
import globalAxios from "axios";

const state = {
    idToken: null,
    userId: null,
    user: null
}
const mutations = {
    authUser (state, userData) {
        state.idToken = userData.token
        state.userId = userData.userId
    },
    storeUser (state, user) {
        state.user = user
    },
    clearAuthData (state) {
        state.idToken = null
        state.userId = null
        state.user = null
    }
}
const actions = {
    setLogoutTimer ({commit, dispatch}, expirationTime) {
        setTimeout(() => {
            dispatch('logout')
        }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
        axios.post('/signupNewUser?key=AIzaSyB-H_SYyVkRbKV9X_bt2ebhgFu-ipoT0pg\n', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch('storeTeam', authData)
                dispatch('setLogoutTimer', res.data.expiresIn)
            })
            .catch(error => {
                alert('email adres al in gebruik')
            })
    },
    login ({commit, dispatch}, authData) {
        axios.post('/verifyPassword?key=AIzaSyB-H_SYyVkRbKV9X_bt2ebhgFu-ipoT0pg\n', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('user', authData.email)
                localStorage.setItem('expirationDate', expirationDate)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                commit('storeUser', authData.email)
                dispatch('setLogoutTimer', res.data.expiresIn)
                router.replace('/mijn-rekening')
            })
            .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {

        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        const userId = localStorage.getItem('userId')
        const user = localStorage.getItem('user')
        commit('authUser', {
            token: token,
            userId: userId,
        })
        commit('storeUser', user)
    },
    logout ({commit}) {
        commit('clearAuthData')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/login')
    },
    storeTeam ({commit, state}, userData) {
        if (!state.idToken) {
            return
        }
        let team = {
            name: userData.email,
            amount: 10000,
        }
        globalAxios.post('/teams.json' + '?auth=' + state.idToken, team)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }
}
const getters = {
    user (state) {
        return state.user
    },
    isAuthenticated (state) {
        return state.idToken !== null
    },
    isAdmin (state) {
        if (state.idToken !== null && state.user === "ryan.kool@capgemini.com") {
            return true
        } else {
            return false
        }
    },
    userType (state) {
        if(state.user){
            if(state.idToken !== null && state.user.includes("post")){
                return "post"
            } else {
                return "team"
            }
        } else {
            return "team"
        }
    }
}

export default {
    getters,
    mutations,
    actions,
    state
}