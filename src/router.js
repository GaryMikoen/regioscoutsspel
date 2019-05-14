import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './stores/user'

import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import AccountPage from './components/account/account.vue'
import SuccessPage from './components/success/success.vue'
import AddTeamsPage from './components/add-teams/add-teams.vue'
import TeamsPage from './components/teams/teams.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: DashboardPage
    },
    {
        path: '/teams',
        component: TeamsPage
    },
    {
        path: '/add-teams',
        component: AddTeamsPage
    },
    {
        path: '/mijn-rekening', component: AccountPage,
        beforeEnter(to, from, next) {
            setTimeout(() => {
                if (store.state.idToken) {
                    next()
                } else {
                    next('/login')
                }
            },0);
        }
    },
    {path: '/registreer', component: SignupPage},
    {path: '/login', component: SigninPage},
    {path: '/success', component: SuccessPage}
]

export default new VueRouter({mode: 'history', routes})