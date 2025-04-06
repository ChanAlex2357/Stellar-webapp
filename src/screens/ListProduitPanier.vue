<script setup>
import { ref, onMounted } from 'vue';

const cart = ref({
  items: [],
  count: 0,
  total: 0
});

onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    cart.value.items = parsedCart.items;
    
    // Calculer le total et le nombre d'articles
    cart.value.count = parsedCart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cart.value.total = parsedCart.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }
});
</script>

<template>
  <div class="app-container">
    <h1>Votre Panier ({{ cart.count }})</h1>
    
    <div v-if="cart.count === 0">
      <p>Votre panier est vide.</p>
      <router-link to="/">Continuer vos achats</router-link>
    </div>
    
    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <h3>{{ item.label }}</h3>
        <p>Prix unitaire: {{ item.price }} €</p>
        <p>Quantité: {{ item.quantity || 1 }}</p>
        <p>Total: {{ (item.price * (item.quantity || 1)).toFixed(2) }} €</p>
      </div>
      
      <div class="cart-summary">
        <h3>Total du panier: {{ cart.total.toFixed(2) }} €</h3>
      </div>
    </div>
  </div>
</template>