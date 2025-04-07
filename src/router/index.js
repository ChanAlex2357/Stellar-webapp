// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/screens/LandingPage.vue'
import Boutique from '@/screens/Boutique.vue'
import ListProduitPanier from '@/screens/ListProduitPanier.vue'
import DetailCommande from '@/screens/DetailCommande.vue'
import NavListProduit from '@/screens/NavListProduit.vue'

import CustomerLogin from '@/screens/LoginPage.vue'
import Dashboard from '@/screens/Dashboard.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/boutique',
    name: 'boutique',
    component: Boutique
  },

  { 
    path: '/panier',
    name: 'panier',
    component: ListProduitPanier,
  },
  { 
    path: '/commande',
    name: 'commande',
    component:DetailCommande,
  },
  {
    path: '/navbar',
    name: 'navbar',
    component:NavListProduit,
  },{
    path:'/login',
    name:'login',
    component:CustomerLogin
  },{
    path:'/dashboard',
    name:'dashboard',
    component:Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Retour en haut de page lors des changements de route
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Gestion du titre de la page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Stellar Bikes'
  next()
})



export default router