<script setup>
import { ref } from 'vue';
import axios from 'axios';

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const loading = ref(true);

// Liste des catégories (à adapter selon vos besoins)
const categories = ref([
  { id: 1, name: 'Vélos' },
  { id: 2, name: 'Accessoires' },
  { id: 3, name: 'Pièces détachées' }
]);

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
  loading.value = false;
})
.catch(error => {
  console.error('Error fetching products:', error);
});
</script>

<template>
  <div class="app-container">
    <h1>NOS PRODUITS</h1>
    
    <div class="filters-container">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un produit..."
          class="search-input"
        >
        <button class="search-button">
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
    
    <div v-if="loading">
      <p>Loading products...</p>
    </div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.label }}</h3>
        <p>{{ product.price }}</p>
        <p>{{ product.ref }}</p>
        <p>{{ product.nature }}</p>
        <!-- <p>{{ product.libelle }}</p> -->
        <button class="search-button">
          Ajouter au panier
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color:#070707;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.filters-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-container {
  display: flex;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  width: 250px;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.category-filter select {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-width: 200px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
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
  color: #34495e;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.product-card p {
  color: #7f8c8d;
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