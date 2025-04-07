<script setup>
import { onMounted , ref} from 'vue';
import NavListProduit from './NavListProduit.vue';

const loading = ref(true);

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
        <div v-if="loading" class="loading">
          <BicycleSpinner />
        </div>
        <div v-else class="dashboard-content">
            <h2>Welcome to the Dashboard</h2>
            <p>Your dashboard content goes here.</p>
        </div>
    </div>
</template>

<style></style>