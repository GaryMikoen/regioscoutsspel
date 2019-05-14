<template>
    <div id="dashboard">
        <div class="row">
            <h1 class="col-12 text-center">Mijn rekening</h1>
            <p class="col-6 text-right">team</p>
            <p class="col-6 text-left">{{teamEmail | removeEmailAdress}}</p>
            <p class="col-6 text-right">Euros</p>
            <p class="col-6 text-left">{{team.amount}}</p>
            <h2 class="col-12 text-center">Geld overmaken</h2>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div class="input" :class="{invalid: $v.form.transferTeamName.$error}">
                    <label class="col-6 offset-3 text-center" for="transferTeamName">Overmaken naar:</label>
                    <select
                            @blur="$v.form.transferTeamName.$touch()"
                            id="transferTeamName"
                            class="form-control col-6 offset-3"
                            :class="{invalid: $v.form.transferTeamName.$error}"
                            v-model="form.transferTeamName">
                        <option v-for="team in teams" v-if="team.name !== teamEmail">{{team.teamName | removeEmailAdress}}</option>
                    </select>
                    <p class="text-center errormessage" v-if="$v.form.transferTeamName.$error">Je moet een team selecteren!</p>
                </div>
            </div>
            <div class="form-group">
                <div class="input" :class="{invalid: $v.form.amount.$error}">
                    <label class="col-6 offset-3 text-center" for="amount">Euros</label>
                    <input
                            id="amount"
                            type="number"
                            class="form-control col-6 offset-3"
                            @blur="$v.form.amount.$touch()"
                            v-model.number="form.amount"/>
                    <p class="text-center errormessage" v-if="$v.form.amount.$error && !$v.form.amount.required">
                        Je moet een hoeveelheid invullen!
                    </p>
                    <p class="text-center errormessage" v-if="!$v.form.amount.minVal">
                        Je moet een hoeveelheid groter dan nul invullen!
                    </p>
                    <p class="text-center errormessage" v-if="!$v.form.amount.maxVal">
                        Je moet een hoeveelheid kleiner dan {{team.amount}} invullen!
                    </p>
                </div>
            </div>
            <div class="col-6 offset-3 text-center">
                <button class="col-sm-5 btn btn-info">overmaken</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, numeric, minValue, maxValue} from 'vuelidate/lib/validators'
    import rpfa from '../../removePostsFromArray'

    export default {
        data() {
            return {
                form: {
                    transferTeamName: '',
                    amount: ''
                }
            }
        },
        validations() {
            return {
                form: {
                    transferTeamName: {
                        required,
                    },
                    amount: {
                        required,
                        numeric,
                        minVal: minValue(1),
                        maxVal: maxValue(this.team.amount)
                    }
                }
            }
        },
        computed: {
            teamEmail() {
                return this.$store.getters.user
            },
            teams() {
                if(this.$store.getters.userType === 'post'){
                    return rpfa.removePostsFromArray(this.$store.getters.teams)
                } else {
                    return rpfa.removeTeamsFromArray(this.$store.getters.teams)
                }
            },
            team() {
                let teams = this.$store.getters.teams;
                let teamEmail = this.teamEmail;
                let team;
                for(let i = 0; i < teams.length; i++){
                    if(teams[i].teamName === teamEmail){
                        team = teams[i]
                    }
                }
                if(teams.length === 0){
                    team = { amount : 0 } ;
                }
                console.log('team', team)
                return team
            }
        },
        methods: {
          onSubmit() {
              this.$v.form.$touch();
              if (this.$v.form.$pending || this.$v.form.$error) return;
              this.$store.dispatch('editTeams', {transferTeam: this.form.transferTeamName, amount: this.form.amount})
          }
        },
        created() {
            this.$store.dispatch('fetchTeams')
        }
    }
</script>

<style scoped>
    .errormessage {
        color: red;
    }
    .input.invalid label {
        color: red;
    }
    .input.invalid input,
    .input.invalid select {
        border: 1px solid red;
        background-color: #ffc9aa;
    }
    .even {
        background-color: #31a529;
        color: white;
    }
</style>