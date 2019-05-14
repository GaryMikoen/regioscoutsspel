<template>
    <header id="header">
        <nav class="navbar navbar-expand-sm navbar-light nav-color">
            <div class="navbar-brand logo">
                <router-link to="/">Regio Scouts Spel</router-link>
            </div>
            <button class="custom-toggler navbar-toggler" @click="toggle" type="button" data-toggle="collapse"
                    data-target="@navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="collapsed" class="navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <router-link to="/" class="nav-item" tag="li"><a @click="toggle" class="nav-link">Overzicht</a>
                    </router-link>
                    <router-link @click="toggle" to="/teams" class="nav-item" tag="li"><a
                            class="nav-link">teams</a></router-link>
                    <router-link @click="toggle" to="/login" v-if="!auth" class="nav-item" tag="li"><a class="nav-link">Log
                        in</a></router-link>
                    <router-link @click="toggle" to="/mijn-rekening" v-if="auth" class="nav-item" tag="li"><a
                            class="nav-link">Mijn rekening</a></router-link>
                    <router-link @click="toggle" to="/registreer" v-if="admin" class="nav-item" tag="li"><a
                            class="nav-link">registreer</a></router-link>
                    <router-link @click="toggle" to="/add-teams" v-if="admin" class="nav-item" tag="li"><a
                            class="nav-link">voeg teams to</a></router-link>
                    <li v-if="auth" class="nav-item">
                        <button @click="onLogout" class="nav-link logout">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                collapse: 'collapse'
            }
        },
        computed: {
            auth() {
                return this.$store.getters.isAuthenticated
            },
            admin() {
                return this.$store.getters.isAdmin
            },
            collapsed(){
                return this.collapse;
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout')
                this.toggle()
            },
            toggle() {
                if (this.collapse === 'collapse') {
                    this.collapse = 'in'
                } else {
                    this.collapse = 'collapse'
                }
            }
        }
    }
</script>

<style scoped>
    #header {
        background-color: #ff0000;
        margin-bottom: 20px
    }

    .logo {
        font-weight: bold;
        color: white;
    }

    .logo a {
        text-decoration: none;
        color: white;
    }

    .logout {
        background-color: transparent;
        border: none;
        font: inherit;
        color: white;
        cursor: pointer;
    }

    .navbar-light .navbar-nav .nav-link {
        color: white;
    }

    .navbar-light .navbar-nav .nav-link:hover {
        color: aquamarine;
    }

    .custom-toggler .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
    }

    .custom-toggler.navbar-toggler {
        border-color: rgb(255, 255, 255);
    }
</style>