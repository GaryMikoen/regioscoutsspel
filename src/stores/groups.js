import globalAxios from "axios";
const state = {
    groups: []
}

const mutations = {
    storeGroups(state, groups) {
        state.groups = groups
    },
}
const actions = {
    fetchGroups ({commit, dispatch, state}) {
        globalAxios.get('/groups.json')
            .then(res => {
                const groups = res.data
                dispatch('teamsGenerator', groups)
            })
            .catch(error => console.log(error))
    },
    teamsGenerator({commit, dispatch, state}, groupsData) {
        let teams = [];
        let groups = groupsData;
        // calculate amount of people
        let members = 0;
        for(let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].members.length; j++) {
                members++;
            }
        }
        console.log('members',members)

        //calculate amount of teams
        let amountOfTeams = Math.ceil(members / 8);

        let teamnames = ['alfa@regio-uh.nl', 'bravo@regio-uh.nl', 'charlie@regio-uh.nl', 'delta@regio-uh.nl', 'echo@regio-uh.nl', 'foxtrot@regio-uh.nl', 'golf@regio-uh.nl', 'hotel@regio-uh.nl', 'india@regio-uh.nl', 'juliett@regio-uh.nl', 'kilo@regio-uh.nl', 'lima@regio-uh.nl', 'mike@regio-uh.nl', 'november@regio-uh.nl', 'oscar@regio-uh.nl', 'papa@regio-uh.nl', 'quebec@regio-uh.nl', 'romeo@regio-uh.nl', 'sierra@regio-uh.nl', 'tango@regio-uh.nl', 'uniform@regio-uh.nl', 'victor@regio-uh.nl', 'whiskey@regio-uh.nl', 'x-ray@regio-uh.nl', 'yankee@regio-uh.nl', 'zulu@regio-uh.nl']
        let membersProcessed = 0;
        let looseMembers = [];
        let tempState = 0;

        // loop throught the amount of teams we plan to make
        for(let k = 0; k < amountOfTeams; k++) {
            // create a base team setup and assign it a name
            let team = {
                teamName: teamnames[k],
                members: [],
                amount: 10000
            }
            // while this team has less than 8 members keep adding members
            while (team.members.length < 8){
                // loop through the teams to find the members to add
                for(let l = 0; l < groups.length; l++) {
                    // set it to the latest team pointer so that we iterate through all the teams one by one
                    l = tempState;

                    // check if there is only one member left in the group
                    // if there is add them to a separate group to be manually added later on
                    if(groups[l].members.length === 1){
                        looseMembers.push({
                            memberName: groups[l].members[0],
                            groupName: groups[l].groupName
                        })
                        // make sure to remove the member after adding it to a team
                        groups[l].members.splice(0,1);
                        // up the amount of people processed to keep track
                        membersProcessed++
                    } else {
                        // make sure that if we have 8 members in this team we start the loop over
                        // we do this part twice and not in a for loop so we can break out of it when we need
                        if(team.members.length === 8){
                            break;
                        }
                        if(groups[l].members[0]) {
                            team.members.push({
                                memberName: groups[l].members[0],
                                groupName: groups[l].groupName
                            })
                            groups[l].members.splice(0,1);
                            membersProcessed++
                        }
                        if(team.members.length === 8){
                            break;
                        }
                        if(groups[l].members[0]){
                            team.members.push({
                                memberName: groups[l].members[0],
                                groupName: groups[l].groupName
                            })
                            groups[l].members.splice(0,1);
                            membersProcessed++
                        }
                    }
                    // keep track of the current group we are iterating through
                    tempState++;
                    // if all groups have been iterated start at the first again
                    if(tempState === groups.length){
                        tempState = 0;
                    }
                }
                // if there are no more members to process break out of the while loop
                if(membersProcessed === members){
                    break;
                }
            }
            // add the team to the array of teams
            if(team.members.length > 5){
                teams.push(team);
            } else {
                for (let m = 0; m < team.members.length; m++){
                    looseMembers.push(team.members[m])
                }
            }
        }
        // show the results on the screen
        for (let n = 1; n < 36; n++){
            let team = {
                teamName: 'post' + n + '@regio-uh.nl',
                amount: 100000
            }
            teams.push(team);
        }
        let result = {
            teams: teams,
            looseMembers: looseMembers
        }
        commit('storeGroups', result)
        dispatch('storeTeams', result.teams)
    }
}
const getters = {
    groups (state) {
        return state.groups
    }
}

export default {
    getters,
    mutations,
    actions,
    state
}