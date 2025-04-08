<script setup>
import { onMounted, ref } from 'vue';
import NavListProduit from './NavListProduit.vue';
import { BarChart, PieChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import BicycleSpinner from '@/components/BicycleSpinner.vue';

Chart.register(...registerables);

const loading = ref(true);

// Données statiques pour la démo
const dashboardData = ref({
  totalProduits: 1245,
  totalClients: 342,
  totalVentes: 568,
  chiffreAffaire: 284500,
  ventesParMois: [12000, 19000, 3000, 5000, 2000, 3000, 8000, 4500, 12000, 19000, 28000, 32000],
  repartitionCategories: {
    'Électronique': 45,
    'Vêtements': 25,
    'Alimentation': 15,
    'Meubles': 10,
    'Autres': 5
  }
});

// Config graphique linéaire (chiffre d'affaires mensuel)
const lineChartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Chiffre d\'affaires (€)',
      data: dashboardData.value.ventesParMois,
      borderColor: '#4f46e5',
      backgroundColor: '#4f46e5',
      tension: 0.4,
      fill: true
    }
  ]
};

// Config graphique camembert (répartition catégories)
const pieChartData = {
  labels: Object.keys(dashboardData.value.repartitionCategories),
  datasets: [
    {
      data: Object.values(dashboardData.value.repartitionCategories),
      backgroundColor: [
        '#4f46e5',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6'
      ]
    }
  ]
};

onMounted(() => {
  if(localStorage.getItem('DOLAPIKEY') === null) {
    router.push('/logins');
  }
  
  // Simuler un chargement
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});
</script>

<template>
  <NavListProduit />
  <div class="container">
    <h1>Dashboard</h1>
    
    <div v-if="loading" class="loading">
      <BycicleSpinner />
    </div>
    <div v-else class="dashboard-content">
      <!-- Cartes indicateurs -->
      <div class="stats-grid">
        <div class="stat-card bg-purple">
          <h3>Produits</h3>
          <p class="stat-value">{{ dashboardData.totalProduits }}</p>
          <p class="stat-desc">+12% vs mois dernier</p>
        </div>
        
        <div class="stat-card bg-green">
          <h3>Clients</h3>
          <p class="stat-value">{{ dashboardData.totalClients }}</p>
          <p class="stat-desc">+5 nouveaux ce mois</p>
        </div>
        
        <div class="stat-card bg-orange">
          <h3>Ventes</h3>
          <p class="stat-value">{{ dashboardData.totalVentes }}</p>
          <p class="stat-desc">+8% vs mois dernier</p>
        </div>
        
        <div class="stat-card bg-red">
          <h3>Chiffre d'affaires</h3>
          <p class="stat-value">{{ dashboardData.chiffreAffaire.toLocaleString() }} €</p>
          <p class="stat-desc">Objectif à 110%</p>
        </div>
      </div>
      
      <!-- Graphiques -->
      <div class="charts-grid">
        <div class="chart-container">
          <h3>Chiffre d'affaires mensuel</h3>
          <LineChart :chartData="lineChartData" />
        </div>
        
        <div class="chart-container">
          <h3>Répartition par catégorie</h3>
          <PieChart :chartData="pieChartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: white;
}

.bg-purple { background-color: #4f46e5; }
.bg-green { background-color: #10b981; }
.bg-orange { background-color: #f59e0b; }
.bg-red { background-color: #ef4444; }

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.stat-desc {
  opacity: 0.9;
  font-size: 0.9rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}
</style>