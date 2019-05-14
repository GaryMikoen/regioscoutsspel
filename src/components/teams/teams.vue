<template>
    <div id="dashboard">
        <h1>Teams</h1>
        <div v-for="(team, $index) in teams" class="row team"
             :class="{'even': $index % 2 === 0, 'odd': $index % 2 !== 0 }">
            <h2 class="text-center col-12">{{team.teamName}}</h2>
            <div v-for="(member, $index) in team.members" class="text-center col-12">
                <div class="row">
                    <p class="col-6 text-right">{{member.memberName}}</p>
                    <p class="col-6 text-left">{{member.groupName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import rpfa from '../../removePostsFromArray'

    export default {
        computed: {
            teams() {
                return rpfa.removePostsFromArray(this.$store.getters.teams)
            }
        },
        created() {
            this.$store.dispatch('fetchTeams')
        }
    }
</script>

<style scoped>
    hr {
        border-color: white;
        margin-left: 50px;
        margin-right: 50px;
    }
    .team {
        padding: 20px;
    }

    h1, p {
        text-align: center;
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