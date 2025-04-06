<script setup>
import Accueil from '@/screens/ListProduitPanier.vue'

</script>
<template>
    <header id="header">
      <div class="container">
        <div id="logo-container">
          <img src="@/assets/image/logo.png" alt="Logo" id="logo">
        </div>
          <nav id="menu">
            <p>NOS PRODUIT</p>
            <a href=""> <Ri:a>Recherche un  produit</Ri:a></a>
         
        </nav>
      </div>
    </header>
        <Accueil></Accueil>
      <div id="orange-bar"></div>
      <Caracteristique></Caracteristique>
      <Gallerie></Gallerie>
      <Contact></Contact>
      <NosProduit></NosProduit>
    <Footer></Footer>
</template>
<style scoped>
header {
  line-height: 1.5;
}

#orange-bar {
  background-color:#0d0d58;
  height: 50px;
}
</style>