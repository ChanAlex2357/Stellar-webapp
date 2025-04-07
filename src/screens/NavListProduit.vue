<script setup>

import {useRouter} from 'vue-router';

const routes = useRouter();

function goToHome(){
  routes.push('/');
}

function goToCart() {
  routes.push({ name: 'panier' });
}

</script>
<template>
    <header id="magasin-header">
      <div class="container">
        <div id="logo-container">
          <img src="@/assets/image/logo.png" alt="Logo" id="logo">
        </div>
          <nav id="menu">
            <a @click="goToHome" >Accueil</a>
            <a href="">Magasin</a>
            <a @click="goToCart">Mon panier</a>
            <a href="">Mes commandes</a>
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