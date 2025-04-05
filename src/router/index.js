// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/screens/LandingPage.vue'
import Boutique from '@/screens/Boutique.vue'
import ListProduitPanier from '@/screens/ListProduitPanier.vue'
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
    }

//     meta: {
//       title: 'Nos Produits - Stellar Bikes'
//     }
//   },
//   {
//     path: '/contact',
//     name: 'contact',
//     component: ContactView,
//     meta: {
//       title: 'Contact - Stellar Bikes'
//     }
//   },
//   {
//     path: '/panier',
//     name: 'panier',
//     component: PanierView,
//     meta: {
//       title: 'Panier - Stellar Bikes'
//     }
//   },
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: DashboardView,
//     meta: {
//       title: 'Dashboard - Stellar Bikes',
//       requiresAuth: true
//     }
//   },
  // Route pour la page 404
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'not-found',
//     component: () => import('@/screens/NotFoundView.vue'),
//   }
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