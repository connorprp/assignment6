<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/data/userStore';
import User from '@/models/User';
import router from '@/router';
import Footer from '../components/Footer.vue';
import Nav from '../components/Nav.vue';
const userStore = useUsersStore();
const user = ref(new User())

const isLoggedIn = localStorage.getItem('username');

function login() {
    if (!user.value.username || !user.value.password) return
    localStorage.setItem("username", user.value.username)
    userStore.add({ ...user.value });
    user.value = new User();
    router.push("/home");
}
</script>

<template>
    <main>
        <Nav :showHomeLink="isLoggedIn === '' || isLoggedIn === null" :showLoginLogoutLink="false" />
        <div class="login-wrapper">
            <div class="login-card">
                <h1>Let's Go!</h1>
                <h3>Enter your credentials</h3> <!--add v-if for other text if logged in-->
                <label for="username">Username</label>
                <input v-model="user.username" class="input" aria-label="username" id="username">
                <label for="password">Password</label>
                <input v-model="user.password" class="input" aria-label="password" id="password">
                <button class="button" @click="login">
                    Log in
                </button>
            </div>
            <div class="requirements">
                <span>Username</span>
                <ul>
                    <li>Must have at least 5 characters</li>
                    <li>Must begin with a letter</li>
                    <li>Can only contain letters and numbers</li>
                </ul>
                <span>Password</span>
                <ul>
                    <li>Must have at least 8 characters</li>
                    <li>Must have 1 uppercase character</li>
                    <li>Must have 1 lowercase character</li>
                    <li>Must have 1 number</li>
                    <li>Must have 1 special character</li>
                </ul>
            </div>
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

.login-wrapper {
    flex: 1;
    background-color: #efeded;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 20px;
}

.login-card {
    font-size: small;
    padding: 20px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.requirements {
    align-self: center;
    color: #c70d0d;
    font-size: 12px;
    width: 200px;
    transition: width 1s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.requirements li {
    align-self: center;
    display: flex;
    flex-direction: column;
}

.button {
    font-size: medium;
    color: #f8f8f8;
    background-color: #000;
    border-radius: 999px;
    padding: 5px 10px;
    border: 0;
}

.button:active {
    transform: scale(97%)
}

.login-card label {
    align-self: flex-start;
    margin-bottom: -5px;
}

.link {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    color: #000;
}
</style>
