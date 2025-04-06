<!-- <script setup>
import { ref, onMounted } from 'vue';

// État du panier
const cart = ref({
  items: [],
  count: 0,
  total: 0
});

// Historique des commandes
const orders = ref([]);

// Formulaire de commande
const orderForm = ref({
  socid: '',
  date: new Date().toISOString().split('T')[0],
  type: 0,
  note: ''
});

// Chargement initial
onMounted(async () => {
  loadCart();
  await loadOrders();
});

// Charger le panier depuis le localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    cart.value.items = parsedCart.items;
    updateCartTotals();
  }
}; -->

// // Mettre à jour les totaux du panier
// const updateCartTotals = () => {
//   cart.value.count = cart.value.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
//   cart.value.total = cart.value.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
// };

// // Charger les commandes depuis l'API Dolibarr
// const loadOrders = async () => {
//   try {
//     const response = await fetch('https://votre-instance-dolibarr/api/index.php/orders?sortfield=t.date_commande&sortorder=DESC', {
//       headers: {
//         'DOLAPIKEY': 'votre_api_key_dolibarr'
//       }
//     });
    
//     if (!response.ok) throw new Error('Erreur de chargement des commandes');
    
//     const data = await response.json();
//     orders.value = data.map(order => ({
//       id: order.id,
//       ref: order.ref,
//       date: formatDate(order.date),
//       status: getStatusText(order.status),
//       total: order.total_ht,
//       items: order.lines.map(line => ({
//         product: line.label,
//         qty: line.qty,
//         price: line.price
//       }))
//     }));
//   } catch (error) {
//     console.error("Erreur:", error);
//   }
// };

// // Soumission de la commande
// const submitOrder = async () => {
//   if (cart.value.count === 0) {
//     alert('Votre panier est vide');
//     return;
//   }

//   const orderData = {
//     socid: orderForm.value.socid || 1, // Fallback à l'ID 1 si non spécifié
//     date: Math.floor(new Date(orderForm.value.date).getTime() / 1000),
//     type: orderForm.value.type,
//     note: orderForm.value.note,
//     lines: cart.value.items.map(item => ({
//       fk_product: item.id,
//       qty: item.quantity || 1,
//       price: item.price
//     }))
//   };

//   try {
//     const response = await fetch('https://votre-instance-dolibarr/api/index.php/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'DOLAPIKEY': 'votre_api_key_dolibarr'
//       },
//       body: JSON.stringify(orderData)
//     });

//     if (!response.ok) throw new Error(await response.text());
    
//     const result = await response.json();
//     alert(`Commande #${result.ref} créée avec succès!`);
//     await loadOrders();
//     resetCart();
//   } catch (error) {
//     console.error('Erreur:', error);
//     alert(`Erreur: ${error.message}`);
//   }
// };

// // Utilitaires
// const formatDate = (timestamp) => {
//   return new Date(timestamp * 1000).toLocaleDateString();
// };

// const getStatusText = (statusCode) => {
//   const statuses = {
//     0: 'Brouillon',
//     1: 'Validée',
//     2: 'Annulée',
//     3: 'Facturée'
//   };
//   return statuses[statusCode] || 'Inconnu';
// };

// const resetCart = () => {
//   cart.value = { items: [], count: 0, total: 0 };
//   localStorage.removeItem('cart');
// };
// </script>

// <template>
//   <div class="app-container">
//     <!-- Section Panier -->
//     <section v-if="cart.count > 0" class="cart-section">
//       <h2>Votre Panier ({{ cart.count }})</h2>
//       <table class="cart-table">
//         <thead>
//           <tr>
//             <th>Produit</th>
//             <th>Prix unitaire</th>
//             <th>Quantité</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr v-for="item in cart.items" :key="item.id">
//             <td>{{ item.label }}</td>
//             <td>{{ item.price.toFixed(2) }} €</td>
//             <td>{{ item.quantity || 1 }}</td>
//             <td>{{ (item.price * (item.quantity || 1)).toFixed(2) }} €</td>
//           </tr>
//         </tbody>
//       </table>
      
//       <div class="cart-total">
//         <h3>Total: {{ cart.total.toFixed(2) }} €</h3>
//       </div>

//       <!-- Formulaire de commande -->
//       <div class="order-form">
//         <h3>Informations de commande</h3>
//         <div class="form-grid">
//           <div class="form-group">
//             <label>ID Client (Dolibarr)</label>
//             <input v-model.number="orderForm.socid" type="text" placeholder="ID du client">
//           </div>
          
//           <div class="form-group">
//             <label>Date de commande</label>
//             <input v-model="orderForm.date" type="date">
//           </div>
          
//           <div class="form-group">
//             <label>Type</label>
//             <select v-model.number="orderForm.type">
//               <option value="0">Standard</option>
//               <option value="1">Proforma</option>
//               <option value="2">Spéciale</option>
//             </select>
//           </div>
          
//           <div class="form-group full-width">
//             <label>Notes</label>
//             <textarea v-model="orderForm.note" placeholder="Instructions spéciales..."></textarea>
//           </div>
//         </div>
        
//         <button @click="submitOrder" class="submit-btn">
//           Valider la commande
//         </button>
//       </div>
//     </section>

//     <!-- Section Historique des Commandes -->
//     <section class="orders-section">
//       <h2>Historique des Commandes</h2>
      
//       <div v-if="orders.length === 0" class="empty-orders">
//         <p>Aucune commande trouvée</p>
//       </div>
      
//       <div v-else class="orders-list">
//         <div v-for="order in orders" :key="order.id" class="order-card">
//           <div class="order-header">
//             <span class="order-ref">#{{ order.ref }}</span>
//             <span class="order-date">{{ order.date }}</span>
//             <span :class="['order-status', order.status.toLowerCase()]">
//               {{ order.status }}
//             </span>
//           </div>
          
//           <div class="order-details">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Produit</th>
//                   <th>Qté</th>
//                   <th>Prix</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="(item, index) in order.items" :key="index">
//                   <td>{{ item.product }}</td>
//                   <td>{{ item.qty }}</td>
//                   <td>{{ item.price.toFixed(2) }} €</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
          
//           <div class="order-footer">
//             <span class="order-total">Total: {{ order.total.toFixed(2) }} €</span>
//             <button class="action-btn" @click="downloadInvoice(order.id)">
//               Télécharger la facture
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   </div>
// </template>

// <style scoped>
// .app-container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// }

// /* Styles pour le panier */
// .cart-section {
//   margin-bottom: 40px;
//   background: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.05);
// }

// .cart-table {
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
// }

// .cart-table th {
//   text-align: left;
//   padding: 12px;
//   background-color: #f8f9fa;
//   border-bottom: 2px solid #dee2e6;
// }

/* .cart-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

/* .cart-total {
  text-align: right;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

/* Styles du formulaire */
.order-form {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group.full-width {
  grid-column: span 2;
} */

/* label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #495057;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
} */
/* 
textarea {
  min-height: 80px;
} */ */
/* 
.submit-btn {
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Styles pour l'historique des commandes */
.orders-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.orders-list {
  margin-top: 20px;
}

.order-card {
  border: 1px solid #dee2e6;
  border-radius: 6px;
  margin-bottom: 20px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.order-ref {
  font-weight: 600;
  color: #212529;
}

.order-date {
  color: #6c757d;
}

.order-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.order-status.validée {
  background-color: #d4edda;
  color: #155724;
} */
/* 
.order-status.annulée {
  background-color: #f8d7da;
  color: #721c24;
}

.order-status.brouillon {
  background-color: #fff3cd;
  color: #856404;
}

.order-details {
  padding: 15px;
}

.order-details table {
  width: 100%;
  border-collapse: collapse;
}

.order-details th, .order-details td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.order-details th {
  background-color: #f8f9fa;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.order-total {
  font-weight: 600;
  font-size: 16px;
}

.action-btn {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.action-btn:hover {
  background-color: #0069d9;
}

.empty-orders {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}
</style> */