<script setup>
import Footer from '@/components/Footer.vue';
import Nav from '../components/Nav.vue';

const isLoggedIn = localStorage.getItem('username');

function handleLogout() {
    console.log("Logged out")
}

</script>

<template>
    <main>
        <Nav @emitLogout="handleLogout" :showHomeLink="isLoggedIn === ''" :showLoginLogoutLink="true" :loginLogoutText="isLoggedIn ? 'Log out' : 'Log in'" />
        <div class="about-view">
            <h1>About Our App ...</h1>
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
.about-view {
    box-sizing: border-box;
    padding: 20px;
    background-color: #efeded;
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>