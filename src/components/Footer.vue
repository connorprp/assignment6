<script setup>
</script>

<template>
    <footer>
        <RouterLink class="link" active-class="link--active" to="/about">About</RouterLink>
    </footer>
</template>

<style scoped>
footer {
    background-color: #dcdcdc;
    padding: 10px;
    display: flex;
    justify-content: center;
}

.link {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    color: #000;
    background-color: rgba(128, 128, 128, 0);
    transition: background-color .25s ease-in, color 0s ease-in .25s; /* need to find a way to make nav buttons transition smoothly */
}

.link--active {
    background-color: rgba(128, 128, 128, 1);
    color: #fff;
}
</style>