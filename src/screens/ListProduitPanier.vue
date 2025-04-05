<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const loading = ref(true);
const cart = ref([]);

function addToCart(product) {
  const exists = cart.value.find(p => p.id === product.id);
  if (!exists) {
    cart.value.push(product);
  }
}

function goToCart() {
  router.push({ name: 'Cart', state: { cart: cart.value } });
}

axios.get('http://localhost/dolibarr/htdocs/api/index.php/products?sortfield=t.ref&sortorder=ASC&limit=100', {
  headers: {
    'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(response => {
  products.value = response.data;
  loading.value = false;
});
</script>

<template>
  <div>
    <h1>NOS PRODUITS</h1>

    <!-- ... search + filtre comme avant ... -->

    <div v-if="loading">Chargement...</div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.label }}</h3>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)">Ajouter au panier</button>
      </div>
    </div>

    <button @click="goToCart" style="margin-top: 2rem;">Voir le panier</button>
  </div>
</template>
