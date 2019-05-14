<template>
    <div id="signin">
        <div class="signin-form">
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <div class="input col-sm-6 offset-sm-3">
                        <label for="email">Mail</label>
                        <input
                                type="email"
                                id="email"
                                v-model="email"
                                class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input col-sm-6 offset-sm-3">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                v-model="password"
                                class="form-control">
                    </div>
                </div>
                <div class="submit col-sm-6 offset-sm-3">
                    <button type="submit" class="col-sm-5 btn btn-info">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmit() {
                const formData = {
                    email: this.email,
                    password: this.password,
                }
                this.$store.dispatch('login', {email: formData.email, password: formData.password})
            }
        }
    }
</script>

<style scoped>
</style>