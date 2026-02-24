<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  localStorage.clear();
})

</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>


</style>
