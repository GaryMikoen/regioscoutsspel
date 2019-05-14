import globalAxios from "axios";
import User from './user';
import router from "../router";
const state = {
    teams: [],
    transferTeam: '',
    amountTransfered: 0
}

const mutations = {
    storeTeams(state, teams) {
        state.teams = teams
    },
    storeResults(state, result) {
        state.teams = result.teams
        state.transferTeam = result.transferTeam;
        state.amountTransfered = result.transferAmount;
    }
}
const actions = {
    fetchTeams ({commit, state}) {
        globalAxios.get('/teams.json')
            .then(res => {
                const data = res.data
                const teams = []
                for (let key in data) {
                    const team = data[key]
                    team.id = key
                    teams.push(team)
                }
                commit('storeTeams', teams)
            })
            .catch(error => console.log(error))
    },
    editTeams ({commit, dispatch, state}, edit) {
        for(let i = 0; i < state.teams.length; i++){
            if(state.teams[i].teamName === edit.transferTeam + "@regio-uh.nl"){
                state.teams[i].amount = parseInt(state.teams[i].amount) + parseInt(edit.amount)
            }
            if(state.teams[i].teamName === User.state.user){
                state.teams[i].amount = parseInt(state.teams[i].amount) - parseInt(edit.amount)
            }
        }
        dispatch('fetchTeams').then(()=>{
            globalAxios.put('/teams.json?auth=' + User.state.idToken, state.teams)
                .then(res => {
                    let result = {
                        teams: res.data,
                        transferTeam: edit.transferTeam,
                        transferAmount: edit.amount
                    }
                    commit('storeResults', result)
                    router.replace('/success')
                })
                .catch(error => console.log(error))

        })
    },
    storeTeams({commit, state}, teams) {
        globalAxios.put('/teams.json?auth=' + User.state.idToken, teams)
            .then(res => {
                commit('storeTeams', res.data)
                // router.replace('/teams')
            })
            .catch(error => console.log(error))
    }
}
const getters = {
    teams (state) {
        return state.teams
    },
    amountTransfered (state) {
        return state.amountTransfered
    },
    teamTransfered (state) {
        return state.transferTeam
    }
}

export default {
    getters,
    mutations,
    actions,
    state
}