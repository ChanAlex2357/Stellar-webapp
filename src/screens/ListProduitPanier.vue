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
  <div class="container" id="list-produit">
    <div id="list-produit-container">
      <div id="list-produit-header" class="">
        <h1 class="text-title">VOTRE PANIER</h1>
        <h1 class="text-title">({{ cart.count }})</h1>
      </div>
      
      <div v-if="cart.count === 0" id="empty-cart" class="grow gap">
        <p>Votre panier est vide.</p>
        <router-link to="/" style="color: var(--secondary-color);">Continuer vos achats</router-link>
      </div>
      
      <div v-else id="cart-items" class="grow gap">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <h3 class="text-title">{{ item.label }}</h3>
          <p>Prix unitaire: {{ item.price }} €</p>
          <p>Quantité: {{ item.quantity || 1 }}</p>
          <p style="color: var(--secondary-color);">Total: {{ (item.price * (item.quantity || 1)).toFixed(2) }} €</p>
        </div>
        
        <div class="cart-summary">
          <h3 class="text-title">TOTAL DU PANIER: {{ cart.total.toFixed(2) }} €</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
    #list-produit {
        min-height: 800px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        background-size: cover;
        background-repeat: no-repeat;
        color: var(--white-color);
        background-image: radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url("./src\\assets\\image\\accueil.jpg");
    }
    
    .grow {
        flex-grow: 1;
    }

    .gap {
        gap: 20px;
    }

    #list-produit-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: 300px;
        gap: 20px;
    }

    #list-produit-container {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    #cart-items, #empty-cart {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .cart-item {
        padding: 1rem;
        border-bottom: 1px solid var(--secondary-color);
    }
    
    .cart-summary {
        margin-top: 3rem;
        padding: 1rem;
        border-top: 2px solid var(--secondary-color);
    }
    
    .text-title {
        font-size: 2.5rem;
        line-height: 2.5rem;
    }
</style>