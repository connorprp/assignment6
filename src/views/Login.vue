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
    <div class="app-view">
        <Nav :showHomeLink="isLoggedIn === '' || isLoggedIn === null" :showLoginLogoutLink="false" />
        <div class="login-view">
            <div class="login-content">
                <div class="login-form">
                    <h1>Let's Go!</h1>
                    <h3>Enter your credentials</h3> <!--add v-if for other text if logged in-->
                    <div>
                        <div class="form-item">
                            <label for="username">Username</label>
                            <input v-model="user.username" class="input" aria-label="username" id="username">
                        </div>
                        <div class="form-item">
                            <label for="passwordInpout">Password</label>
                            <label class="switch align-right">
                                <input type="checkbox">
                                <span class="slider">
                                </span>
                            </label>
                            <input v-model="user.password" class="input" aria-label="password" id="passwordInput">
                        </div>
                    </div>
                    <button @click="login">Log in</button>
                </div>
                <div class="error-messages">
                    <div>
                        <span>Username</span>
                        <ul>
                            <li><span>Must have at least 5 characters</span></li>
                            <li><span>Must begin with a letter</span></li>
                            <li><span>Can only contain letters and numbers</span></li>
                        </ul>
                    </div>
                    <div>
                        <span>Password</span>
                        <ul>
                            <li><span>Must have at least 8 characters</span></li>
                            <li><span>Must have 1 uppercase character</span></li>
                            <li><span>Must have 1 lowercase character</span></li>
                            <li><span>Must have 1 number</span></li>
                            <li><span>Must have 1 special character</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.app-view {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-image: url(/starfish.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: grayscale(100%);
    z-index: -1;
}

.login-view {
    flex: 1;
    background-color: #efeded;
    opacity: 97%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-content {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.login-form {
    font-size: small;
    padding: 20px;
    background-color: #f8f8f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 200px;
}

.login-form h1 {
    margin: 0;
}

.login-form h3 {
    text-align: center;
}

.form-item {
    box-sizing: border-box;
    width: 160px;
    margin-bottom: 5px;
}

.form-item>label {
    display: inline-block;
    margin-bottom: 5px;
}

.form-item>input {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
}

.login-form>button {
    font-size: medium;
    color: #f8f8f8;
    background-color: #000;
    border-radius: 999px;
    padding: 5px 10px;
    border: 0;
}

.align-right {
    float: right;
}

.slider::before {
    position: absolute;
    content: "";
    height: 13px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: #fff;
    transition: .4s;
    border-radius: 50%;
}

.slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 17px;
}

input:checked+.slider {
    background-color: #2196f3;
}

input:checked+.slider:before {
    transform: translate(13px);
}

.switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
}

.error-messages {
    align-self: center;
    color: #c70d0d;
    font-size: 12px;
    width: 200px;
    transition: width 1s linear;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.error-messages span {
    display: inline-block;
    min-width: max-content;
    white-space: nowrap;
}

ul {
    padding-left: 15px;
    margin: 3px 0 10px;
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
