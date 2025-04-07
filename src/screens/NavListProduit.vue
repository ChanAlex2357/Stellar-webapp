<script setup>

import Logo from '@/components/Logo.vue';
import {useRouter} from 'vue-router';
import LogoutIcon from '@/components/LogoutIcon.vue';

const routes = useRouter();

function goToHome(){
  routes.push('/');
}

function goToCart() {
  routes.push({ name: 'panier' });
}

function goToCommandes() {
  routes.push({ name: 'commandes' });
}
function logout() {
  localStorage.removeItem('DOLAPIKEY');
  routes.push('/login');
}

</script>
<template>
    <header id="magasin-header">
      <div class="container">
          <Logo></Logo>
          <nav id="menu">
            <a @click="goToHome" >Accueil</a>
            <a href="">Magasin</a>
            <a @click="goToCart">Mon panier</a>
            <a @click="goToCommandes">Mes commandes</a>
            <a @click="logout">
              <LogoutIcon></LogoutIcon>
            </a>
          </nav>
      </div>
    </header>
</template>

<style scoped>
#magasin-header {
  line-height: 1.5;
  background-color: #03224c;
  width: 100%;
  height: 100px;
}

</style>