<template>
    <div id="dashboard">
        <h1>Teams</h1>
        <div v-for="(team, $index) in groups.teams" class="row team"
             :class="{'even': $index % 2 === 0, 'odd': $index % 2 !== 0 }">
            <h2 class="text-center col-12">{{team.teamName}}</h2>
            <div v-for="(member, $index) in team.members" class="text-center col-12">
                <div class="row">
                    <p class="col-sm-6 text-right">{{member.memberName}}</p>
                    <p class="col-sm-6 text-left">{{member.groupName}}</p>
                </div>
            </div>
        </div>
        <h1>Loose members</h1>
        <div v-for="(member, $index) in groups.looseMembers" class="row team"
             :class="{'even': $index % 2 === 0, 'odd': $index % 2 !== 0 }">
            <div class="text-center col-12"> {{$index + 1}} {{member.memberName}} - {{member.groupName}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            groups() {
                return this.$store.getters.groups
            }
        },
        created() {
            this.$store.dispatch('fetchGroups')
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