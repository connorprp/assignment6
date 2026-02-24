<script setup>
import { defineProps } from 'vue';
const emit = defineEmits(['emitLogout']);
const currentUser = localStorage.getItem('username');

const props = defineProps({
    showLoginLogoutLink: Boolean,
    showHomeLink: Boolean,
    loginLogoutText: String
})

function handleClick() {
    emit('emitLogout');
    localStorage.setItem('username', '');
}

</script>

<template>
    <nav>
        <RouterLink class="link" :class="{ hidden: !showHomeLink}" to="/home">Home</RouterLink>
        <!--change v-if to appear when user is logged in (username exists in localstorage)-->
        <RouterLink class='link' :class="{ hidden: !showLoginLogoutLink }" to="/login">
            <span @click="handleClick">{{ loginLogoutText }}</span>
        </RouterLink>
    </nav>
</template>

<style scoped>
nav {
    background-color: #dcdcdc;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.link {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    color: #000;
}

.hidden {
    visibility: hidden;
}

.router-link-active {
    background-color: gray;
    color: #fff;
    transition: background-color .25s ease-in, color 0s ease-in .25s;
}
</style>