<script setup>
import { ref } from 'vue';

const products = ref([
  { id: 1, name: 'Vélo Stellar A', image: '/images/velo1.jpg' },
  { id: 2, name: 'Vélo Stellar B', image: '/images/velo2.jpg' },
  // ... autres produits
]);
</script>

<template>
  <div class="app-container">
    <h1>Nos Produits</h1>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}
</style>