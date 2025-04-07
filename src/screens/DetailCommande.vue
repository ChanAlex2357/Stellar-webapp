<script setup>
import { ref, onMounted } from 'vue';
import BicycleSpinner from '@/components/BicycleSpinner.vue';
import NavListProduit from './NavListProduit.vue';

const orders = ref([]);
const loading = ref(true);
const apiConfig = ref({
  url: 'http://localhost/dolibarr/htdocs/api/index.php',
  key: '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ'
});


// Fonction pour récupérer les commandes
const fetchOrders = async () => {
  try {
    loading.value = true;
    const response = await fetch(`${apiConfig.value.url}/orders?sortfield=t.date_commande&sortorder=DESC`, {
      headers: { 'DOLAPIKEY': apiConfig.value.key }
    });
    
    if (!response.ok) throw new Error('Erreur lors de la récupération des commandes');
    
    orders.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    loading.value = true;
  }
};

// Fonction pour déterminer le statut de la commande
const getOrderStatus = (order) => {
  console.log(order.statut);
  console.log(order.statut === "1");
  if (order.statut === "3") return 'Livree';
  if (order.statut === 3) return 'validée et facturée (paiement effectué)';
  if (order.facture === 2) return 'validée avec facture';
  if (order.statut === "1") return 'validée (commande effectuée)';
  return 'en attente';
};

// Formater la date
const formatDate = (timestamp) => {
  if (!timestamp) return '-';
  return new Date(timestamp * 1000).toLocaleDateString();
};

// Formater le montant
const formatPrice = (amount) => {
  return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <NavListProduit />
  <div class="orders-container">
    <h1>Mes Commandes</h1>
    
    <div v-if="loading" class="loading">
      <BicycleSpinner />
    </div>
    
    <div v-else-if="orders.length === 0" class="no-orders">
      <p>Aucune commande trouvée.</p>
    </div>
    
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card" :class="{
        'status-validated': order.statut === 1,
        'status-invoiced': order.facture,
        'status-paid': order.paye
      }">
        <div class="order-header">
          <h2>Commande #{{ order.ref }}</h2>
          <span class="order-status" :class="{
            'status-badge-validated': order.statut === 1,
            'status-badge-invoiced': order.facture,
            'status-badge-paid': order.paye
          }">
            {{ getOrderStatus(order) }}
          </span>
        </div>
        
        <div class="order-details">
          <div class="detail-row">
            <span>Date :</span>
            <span>{{ formatDate(order.date_creation) }}</span>
          </div>
          <div class="detail-row">
            <span>Total :</span>
            <span class="order-total">{{ formatPrice(order.total_ttc) }}</span>
          </div>
          <div class="detail-row">
            <span>Client :</span>
            <span>{{ order.socid }}</span>
          </div>
        </div>
        
        <div class="order-lines">
          <h3>Articles</h3>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Description</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="line in order.lines" :key="line.id">
                <td>{{ line.product_ref || '-' }}</td>
                <td>{{ line.description || line.desc || '-' }}</td>
                <td>{{ line.qty }}</td>
                <td>{{ formatPrice(line.subprice) }}</td>
                <td>{{ formatPrice(line.total_ttc) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="order.facture" class="order-invoice">
          <h3>Facture associée</h3>
          <p>Référence : {{ order.facture.ref }}</p>
          <p>Montant : {{ formatPrice(order.facture.total_ttc) }}</p>
          <p>Statut : {{ order.facture.paye ? 'Payée' : 'En attente de paiement' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .no-orders {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}

.orders-list {
  display: grid;
  gap: 20px;
}

.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.order-status {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: bold;
}

.status-badge-validated {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-badge-invoiced {
  background-color: #e8f5e9;
  color: #388e3c;
}

.status-badge-paid {
  background-color: #f1f8e9;
  color: #689f38;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.detail-row span:first-child {
  font-weight: bold;
  color: #666;
}

.order-total {
  font-weight: bold;
  color: #1976d2;
}

.order-lines {
  margin-top: 20px;
}

.order-lines table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.order-lines th, .order-lines td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.order-lines th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.order-invoice {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #e0e0e0;
}

/* Styles pour les différents statuts */
.status-validated {
  border-left: 4px solid #1976d2;
}

.status-invoiced {
  border-left: 4px solid #388e3c;
}

.status-paid {
  border-left: 4px solid #689f38;
}
</style>