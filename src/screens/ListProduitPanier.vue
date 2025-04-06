<script setup>
import { ref, onMounted } from 'vue';

const cart = ref({
  items: [],
  count: 0,
  total: 0
});

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
  if (cart.value.count === 0) {
    alert('Votre panier est vide. Ajoutez des articles avant de valider.');
    return;
  }

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
    lines: lines
  };

  try {
    // Envoi à l'API Dolibarr
    const response = await fetch('https://votre-instance-dolibarr/api/index.php/orders', {
      method: 'POST',
      headers: {
      'DOLAPIKEY': '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(dolibarrOrder)
    });

    if (!response.ok) throw new Error('Erreur API');

    const data = await response.json();
    console.log('Commande créée dans Dolibarr:', data);
    alert('Commande validée et envoyée à Dolibarr avec succès !');
    
    // Optionnel : vider le panier après envoi
    // cart.value = { items: [], count: 0, total: 0 };
    // localStorage.removeItem('cart');
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi à Dolibarr:', error);
    alert('Erreur lors de l\'envoi de la commande à Dolibarr');
  }
};
</script>

<template>
  <div class="app-container">
    <h1>Votre Panier ({{ cart.count }})</h1>
    
    <div v-if="cart.count === 0">
      <p>Votre panier est vide.</p>
      <router-link to="/">Continuer vos achats</router-link>
    </div>
    
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Réf.</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" :key="item.id">
            <td>{{ item.label }}</td>
            <td>{{ item.price }} €</td>
            <td>{{ item.quantity || 1 }}</td>
            <td>{{ (item.price * (item.quantity || 1)).toFixed(2) }} €</td>
          </tr>
        </tbody>
      </table>
      
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
        <button @click="submitOrder" class="submit-btn">Valider la commande</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles existants conservés */
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.cart-table th, 
.cart-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.cart-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.cart-table tbody tr:hover {
  background-color: #f9f9f9;
}

.cart-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: right;
}

.cart-summary h3 {
  margin: 0;
  font-size: 1.2em;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Styles pour le formulaire */
.order-form {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.order-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.3em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #369f6b;
}
</style>