<template>
    <div id="dashboard">
        <h1 class="text-center">Goed gedaan!</h1>
        <p class="text-center">Je hebt succesvol {{euros}} euro naar {{ team }} overgemaakt</p>
        <button @click="goToHome" class="col-6 offset-3 btn btn-info">ga naar het overzicht</button>
    </div>
</template>

<script>
    import router from "../../router";
    export default {
        computed: {
            euros(){
                return this.$store.getters.amountTransfered;
            },
            team() {
                return this.$store.getters.teamTransfered;
            }
        },
        methods: {
            goToHome() {
                router.replace('/')
            }
        },
    }
</script>

<style scoped>
</style>