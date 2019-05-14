import Vue from 'vue'
import Vuex from 'vuex'

import users from './stores/user';
import teams from './stores/teams';
import groups from './stores/groups';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users,
        teams,
        groups
    }
});