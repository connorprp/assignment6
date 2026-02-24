<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/data/userStore';
import User from '@/models/User';
import Footer from '../components/Footer.vue';
import Nav from '../components/Nav.vue';
import router from '@/router';
const userStore = useUsersStore();
const user = ref(new User());

const loggedInUser = ref({
    username: localStorage.getItem('username') || ''
})

onMounted(() => {
    if (loggedInUser.value.username === '') {
        router.push("/login")
    }
    console.log(loggedInUser.value)
})


function handleLogout() {
    localStorage.setItem("username", '');
    console.log("Logged out")
}
</script>

<template>
    <main>
        <Nav @emitLogout="handleLogout" :showHomeLink="true" :showLoginLogoutLink="true" :loginLogoutText="'Log out'" />
        <div class="home-view">
            <h1>Welcome {{ loggedInUser.username }}!</h1>
        </div>
        <Footer />
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

nav {
    background-color: #dcdcdc;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.home-view {
    box-sizing: border-box;
    padding: 20px;
    background-color: #efeded;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.link {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    color: #000;
}

.router-link-active {
    background-color: gray;
    color: #fff;
    transition: background-color .25s ease, color .25s ease;
}
</style>
