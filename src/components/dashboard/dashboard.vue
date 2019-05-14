<template>
    <div id="dashboard">
        <h1>De stand</h1>
        <div class="col-12">
            <div v-for="(team, $index) in teams" class="row" :class="{'even': $index % 2 === 0, 'odd': $index % 2 !== 0 }">
                <dt class="col-6 col-sm-3 text-right"> {{$index + 1}}</dt>
                <dt class="col-6 col-sm-3 text-left"> {{team.teamName | removeEmailAdress}}</dt>
                <dt class="col-6 col-sm-3 text-right"> euros</dt>
                <dt class="col-6 col-sm-3 text-left"> {{team.amount}}</dt>
            </div>
        </div>
    </div>
</template>

<script>
    import rpfa from '../../removePostsFromArray'

    export default {
        computed: {
            teams() {
                // stack them in order of amount
                function compare(a, b) {
                    if (a.amount < b.amount)
                        return 1;
                    if (a.amount > b.amount)
                        return -1;
                    return 0;
                }

                return rpfa.removePostsFromArray(this.$store.getters.teams.sort(compare));
            }
        },
        created() {
            this.$store.dispatch('fetchTeams')
        }
    }
</script>

<style scoped>
    h1, p {
        text-align: center;
    }

    p {
        color: red;
    }

    .even {
        background-color: #31a529;
        color: white;
    }

    .progress div {
        font-size: 50px;
    }

    .progress {
        height: 20%;
        margin-top: 5%;
        margin-bottom: 20px;
    }
</style>