<script setup>

import Logo from '@/components/Logo.vue';
import {useRouter} from 'vue-router';
import LogoutIcon from '@/components/LogoutIcon.vue';

const routes = useRouter();

function goToHome(){
  routes.push('/');
}

function goToBoutique() {
  routes.push({ name: 'boutique' });
}

function goToCart() {
  routes.push({ name: 'panier' });
}

function goToCommandes() {
  routes.push({ name: 'commande' });
}
function logout() {
  localStorage.removeItem('DOLAPIKEY');
  routes.push('/login');
}

function goToDashboard() {
  routes.push('/dashboard');
}

</script>
<template>
    <header id="magasin-header">
      <div class="container">
          <Logo></Logo>
          <nav id="menu">
            <a @click="goToHome" >Accueil</a>
            <a @click="goToBoutique">Magasin</a>
            <a @click="goToCommandes">Mes commandes</a>
            <a @click="goToDashboard">Dashboard</a>
            <span style="color: var(--white-color);"> | </span>
            <a @click="goToCart" id="panier">
              <svg width="45px" height="45px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffff77" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM16.25 17.25C15.42 17.25 14.75 17.92 14.75 18.75C14.75 19.58 15.42 20.25 16.25 20.25C17.08 20.25 17.75 19.58 17.75 18.75C17.75 17.92 17.08 17.25 16.25 17.25ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.04 8.25Z" fill="#ffffff"></path> </g></svg>
              <!-- <span id="panier-notif"></span> -->
            </a>
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

a {
  display: flex;
  align-items: center;

}
#panier {
  position: relative;
}
#panier-notif {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--secondary-color);
  color: var(--white-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>