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
        <Nav @emitLogout="handleLogout" :showHomeLink="false" :showLoginLogoutLink="true" :loginLogoutText="'Log out'" />
        <div class="home-view">
            <h1>Welcome {{ loggedInUser.username.slice(0,1).toUpperCase() + loggedInUser.username.slice(1,loggedInUser.username.length)}}!</h1>
            <div class="ee hidden">
                <div class="six">6</div>
                <div class="seven">7</div>
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

.ee {
    display: flex;
    gap: 20px;
    font-size: 267px;
    font-weight: 700;
    font-family: Arial Black, sans-serif;
    align-self: center;
}

.hidden {
    visibility: hidden;
}

.six,
.seven {
    display: inline-block;
    animation: animation .4s infinite cubic-bezier(.68, -.55, .27, 1.55);
}

.seven {
    animation-delay: .1s;
    color: #ff4757;
}

@keyframes animation {
    0%,
    100% {
        transform: translateY(0) rotate(0);
    }

    30% {
        transform: translateY(-40px) rotate(-10deg) scale(1.1);
    }

    70% {
        transform: translateY(10px) rotate(5deg) scale(.9);
    }
}
</style>
