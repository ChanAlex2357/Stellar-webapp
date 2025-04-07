<script setup>
import { ref, onMounted } from 'vue';
import RoundSpinner from '@/components/RoundSpinner.vue';

const cart = ref({
  items: [],
  count: 0,
  total: 0
});

const orderLoading = ref(false);

const orderForm = ref({
  socid: '', // Correspond au client dans Dolibarr
  date: new Date().toISOString().split('T')[0], // Date du jour par défaut
  type: 0 // Type de commande (0 par défaut)
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

const submitOrder = async () => {
  orderLoading.value = true;
  if (cart.value.count === 0) {
    alert('Votre panier est vide. Ajoutez des articles avant de valider.');
    return;
  }
  
  try {
  // Convertir la date en timestamp Unix
  const dateTimestamp = Math.floor(new Date(orderForm.value.date).getTime() / 1000);
  const productDetails = await Promise.all(
      cart.value.items.map(async item => {
        const response = await fetch(`http://localhost/dolibarr/htdocs/api/index.php/products/${item.id}`, {
          headers: {
    'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
        });
        return await response.json();
      })
    );

    // Préparer les lignes avec toutes les informations nécessaires
    const lines = cart.value.items.map((item, index) => {
      const product = productDetails[index];
      return {
        fk_product: parseInt(item.id),
        qty: parseInt(item.quantity || 1),
        subprice: item.price / (1 + (product.tva_tx || 20) / 100), // Prix HT
        vat_src_code: product.vat_src_code || '',
        tva_tx: product.tva_tx || 20,
        desc: product.description || product.label,
        product_type: product.type || 0,
        info_bits: product.info_bits || 0,
        label: product.label,
        remise_percent: item.discount || 0,
        rang: index + 1
      };
    });

  // Créer l'objet commande au format Dolibarr
  const dolibarrOrder = {
    socid: 1, // ID du client dans Dolibarr
    date: dateTimestamp,
    type: orderForm.value.type,
    // lines: lines
  };

    // Envoi à l'API Dolibarr
    const response = await fetch('http://localhost/dolibarr/htdocs/api/index.php/orders', {
      method: 'POST',
      headers: {
      'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(dolibarrOrder)
    });

    if (response.status !== 200) throw new Error('Erreur API');

    const data = await response.json();
    console.log('Commande créée dans Dolibarr:', data);

    for (const line of lines) {
      const line_response = await fetch(`http://localhost/dolibarr/htdocs/api/index.php/orders/${data}/lines`, {
        method: 'POST',
        headers: {
          'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(line)
      });
      if (line_response.status !== 200) throw new Error('Erreur API');
    };

    const validation_response = await fetch(`http://localhost/dolibarr/htdocs/api/index.php/orders/${data}/validate`, {
      method: 'POST',
      headers: {
        'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (validation_response.status !== 200) throw new Error('Erreur API');

    // Optionnel : vider le panier après envoi
    cart.value = { items: [], count: 0, total: 0 };
    localStorage.removeItem('cart');
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi à Dolibarr:', error);
    alert('Erreur lors de l\'envoi de la commande à Dolibarr');
  }
  finally {
    orderLoading.value = false;
  }
};
</script>

<template>
  <div class="app-container">
    <h1>Votre Panier ({{ cart.count }})</h1>
    
    <div v-if="cart.count === 0">
      <p>Votre panier est vide.</p>
      <router-link to="/boutique">Continuer vos achats</router-link>
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

      <!-- Formulaire adapté pour Dolibarr -->
      <div class="order-form">
        <h2>Validation de commande</h2>
        <div class="form-group">
          <label for="client-id">ID Client (socid) :</label>
          <input 
            id="client-id" 
            v-model.number="orderForm.socid" 
            type="text" 
            required
            placeholder="ID du client dans Dolibarr"
          >
        </div>
        <div class="form-group">
          <label for="order-date">Date :</label>
          <input id="order-date" v-model="orderForm.date" type="date" required>
        </div>
        <div class="form-group">
          <label for="order-type">Type de commande :</label>
          <select id="order-type" v-model.number="orderForm.type">
            <option value="0">Standard</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
          </select>
        </div>
        <button v-if="orderLoading" class="submit-btn"> <RoundSpinner /> </button>
        <button v-else  @click="submitOrder" class="submit-btn">Valider la commande</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.cart-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item h3 {
  margin-top: 0;
  color: #3498db;
  font-size: 1.3rem;
}

.cart-item p {
  margin: 0.5rem 0;
  color: #555;
}

.cart-summary {
  background-color: #f0f7ff;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: right;
}

.cart-summary h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.order-form {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.order-form h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.submit-btn:active {
  transform: translateY(1px);
}

a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .cart-item, .cart-summary, .order-form {
    padding: 1rem;
  }
}
</style>
