<script setup>
import Accueil from '@/screens/Accueil.vue'
import Caracteristique from '@/screens/Caracteristique.vue'
import Gallerie from '@/screens/Galerie.vue'
import Contact from '@/screens/Contact.vue'
import NosProduit from '@/screens/NosProduit.vue'
import Footer from '@/screens/Footer.vue'

</script>
<template>
    <header id="header">
      <div class="container">
        <div id="logo-container">
          <img src="@/assets/image/logo.png" alt="Logo" id="logo">
        </div>
          <nav id="menu">
            <a href="">Accueil</a>
            <a href="">Caractéristiques</a>
            <a href="">Gallery</a>
            <a href="">Contact</a>
            <a href="">Produits</a>
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
  background-color: var(--secondary-color);
  height: 50px;
}
</style>