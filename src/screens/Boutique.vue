<script setup>
import { ref , onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Changement ici : useRouter au lieu de useRoute
import NavListProduit from './NavListProduit.vue';
import  Footer from './Footer.vue'
import BycicleSpinner from '@/components/BicycleSpinner.vue';

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const loading = ref(true);

const router = useRouter(); // Correction ici : useRouter() pour la navigation

const cart = ref([]);

onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    cart.value = parsedCart.items;
  }
});

// Liste des catégories
const categories = ref([
  { id: 1, name: 'Vélos' },
  { id: 2, name: 'Accessoires' },
  { id: 3, name: 'Pièces détachées' }
]);

// Fonction pour ajouter au panier
function addToCart(product) {
  console.log('Produit ajouté au panier:', product);
  const exists = cart.value.find(p => p.id === product.id);
  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify({ items: cart.value }));
}

// Fonction pour aller au panier


axios.get('http://localhost/dolibarr/htdocs/api/index.php/products?sortfield=t.ref&sortorder=ASC&limit=100', {
  headers: {
    'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
  products.value = response.data;

  products.value.forEach(product => {
      try {
         axios.get(`http://localhost/dolibarr/htdocs/api/index.php/products/${product.id}/categories?sortfield=s.rowid&sortorder=ASC1`,
        {
          headers: {
            'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          const category = response.data[0];
          if (category) {
            product.category = category.label;
          } else {
            product.category = 'Non spécifiée';
          }
        })

      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
  });

  loading.value = false;
})
.catch(error => {
  console.error('Error fetching products:', error);
});
</script>

<template>
  <NavListProduit />
 
  <div class="app-container">
    
    <div class="filters-container">
      <div class="shop-title">
        <h1>NOS PRODUITS</h1>
      </div>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un produit..."
          class="search-input"
        >
        <button class="orange-btn search-button">
          Rechercher
        </button>
      </div>
      
      <div class="category-filter">
        <select v-model="selectedCategory" class="category-select">
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="product-list-container-loading">
      <BycicleSpinner />
    </div>

    <div v-else class="product-list-container">
      <div class="product-list">

        <div v-for="product in products" :key="product.id" class="product-card">
          <img v-if="product.url" :src="product.url" :alt="product.name">
          <img v-else src="@/assets/image/bike-placeholder.png" alt="Image non disponible">
          <h3>{{ product.label }}</h3>
          <p>{{ product.price }}</p>
          <p>{{ product.ref }}</p>
          <p>{{ product.nature }}</p>
          <p>{{ product.category }}</p>
          <!-- <p>{{ product.libelle }}</p> -->
          <button class="orange-btn" @click="addToCart(product)">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  margin: 0 auto;
}

h1 {
  max-width: 2000px;
  text-align:left;
  color:#070707;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.shop-title {
  display: flex;
  justify-content: start;
  flex-grow: 1;
}

.filters-container {
  display: flex;
  justify-content: right;
  gap: 1rem;
  margin-bottom: 1.5rem;
}


.search-input {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  width: 250px;
}

.category-filter select {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-width: 200px;
}

.product-list-container{
  display: flex;
  justify-content: center;;
}

.product-list-container-loading {
  height: 55vh;
  display: flex;
  justify-content: center;
  align-self: center;
}
.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 75%;
  justify-content: center;
}

.product-card {
  border: 1px solid #e0e0e0;
  padding: 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-card h3 {
  color: var(--dark-color);
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}


.product-card p {
  color: var(--dark-color);
  font-size: 1rem;
  margin: 0.5rem 0;
}

@media (max-width: 600px) {
  .filters-container {
    flex-direction: column;
    align-items: center;
  }
  
  .search-container {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
  
  .category-filter select {
    width: 100%;
  }
}
</style>