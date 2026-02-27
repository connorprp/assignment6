<script setup>
import { ref, watch, useTemplateRef, onMounted } from 'vue'
import { useUsersStore } from '@/data/userStore';
import User from '@/models/User';
import router from '@/router';
import Footer from '../components/Footer.vue';
import Nav from '../components/Nav.vue';
const userStore = useUsersStore();
const user = ref(new User())
const isValidated = ref();

const checked = ref();
const passwordInput = useTemplateRef('passwordInput')

watch(checked, (isChecked) => {
    passwordInput.value.type = isChecked ? '' : 'password';
})
const isLoggedIn = localStorage.getItem('username');

function login() {
    if (!isValidated.value) return
    localStorage.setItem("username", user.value.username)
    userStore.add({ ...user.value });
    user.value = new User();
    router.push("/home");
}

const usernameValidated = ref({
    hasFiveChars: false,
    hasBeginsLetter: false,
    hasContainsLettersNumbers: false
})

const passwordValidated = ref({
    hasEightChars: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
})

watch(user.value, () => {
    usernameValidated.value.hasFiveChars = user.value.username.length >= 5;
    usernameValidated.value.hasBeginsLetter = /^[a-zA-Z]/.test(user.value.username);
    usernameValidated.value.hasContainsLettersNumbers = /^[a-zA-Z0-9]+$/.test(user.value.username);
    passwordValidated.value.hasEightChars = user.value.password.length >= 8;
    passwordValidated.value.hasUpperCase = /[A-Z]/.test(user.value.password);
    passwordValidated.value.hasLowerCase = /[a-z]/.test(user.value.password);
    passwordValidated.value.hasNumber = /[0-9]/.test(user.value.password);
    passwordValidated.value.hasSpecialChar = /[^a-zA-Z0-9]/.test(user.value.password);
    isValidated.value = Object.values(usernameValidated.value).every(v => v) && Object.values(passwordValidated.value).every(v => v);
    console.log(isValidated.value)
})

</script>

<template>
    <div class="app-view">
        <Nav :showHomeLink="isLoggedIn === '' || isLoggedIn === null" :showLoginLogoutLink="false" />
        <div class="login-view view">
            <div class="login-content">
                <div class="login-form">
                    <h1>Let's Go!</h1>
                    <h3 v-if="!isLoggedIn">Enter your credentials</h3>
                    <h3 v-else="!isLoggedIn">Login with another account</h3>
                    <div>
                        <div class="form-item">
                            <label for="username">Username</label>
                            <input v-model="user.username" class="input" aria-label="username" id="username">
                        </div>
                        <div class="form-item">
                            <label for="password">Password</label>
                            <label class="switch align-right">
                                <input type="checkbox" v-model="checked" aria-label="slider">
                                <span class="slider">
                                </span>
                            </label>
                            <input type="password" v-model="user.password" class="input" ref="passwordInput"
                                aria-label="password" id="password">
                        </div>
                    </div>
                    <button @click="login">Log in</button>
                </div>
                <div class="error-messages" :class="{ 'no-width': isValidated }">
                    <div v-if="!(Object.values(usernameValidated).every(v => v))">
                        <span>Username</span>
                        <ul>
                            <li v-if="!usernameValidated.hasFiveChars"><span>Must have at least 5 characters</span></li>
                            <li v-if="!usernameValidated.hasBeginsLetter"><span>Must begin with a letter</span></li>
                            <li v-if="!usernameValidated.hasContainsLettersNumbers"><span>Can only contain letters and
                                    numbers</span></li>
                        </ul>
                    </div>
                    <div v-if="!(Object.values(passwordValidated).every(v => v))">
                        <span>Password</span>
                        <ul>
                            <li v-if="!passwordValidated.hasEightChars"><span>Must have at least 8 characters</span>
                            </li>
                            <li v-if="!passwordValidated.hasUpperCase"><span>Must have 1 uppercase character</span></li>
                            <li v-if="!passwordValidated.hasLowerCase"><span>Must have 1 lowercase character</span></li>
                            <li v-if="!passwordValidated.hasNumber"><span>Must have 1 number</span></li>
                            <li v-if="!passwordValidated.hasSpecialChar"><span>Must have 1 special character</span></li>
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
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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

.view {
    position: relative;
}

.view:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(/starfish.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    filter: grayscale(100%);
    opacity: .05;
    z-index: -1;
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

.login-form>button:active {
    transform: scale(97%);
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
    color: #c70d0d !important;
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

.no-width {
    width: 0;
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
