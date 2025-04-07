<script setup>
import { onMounted } from 'vue';
import NavListProduit from './NavListProduit.vue';

onMounted(() => {
  if(localStorage.getItem('DOLAPIKEY') === null){
    router.push('/logins');
  }
})
</script>

<template>
    <NavListProduit></NavListProduit>
    <div class="container">
        <h1>Dashboard</h1>
    </div>
</template>

<style></style>