<script setup>
import Accueil from '@/screens/Accueil.vue'
import Caracteristique from '@/screens/Caracteristique.vue'
import Gallerie from '@/screens/Galerie.vue'
import Contact from '@/screens/Contact.vue'
import NosProduit from '@/screens/NosProduit.vue'
import Footer from '@/screens/Footer.vue'
import Logo from '@/components/Logo.vue'

</script>
<template>
    <header id="header">
      <div class="container">
        <Logo></Logo>
          <nav id="menu">
            <a href="#accueil-section">Accueil</a>
            <a href="#caracteristique-section">Caractéristiques</a>
            <a href="#gallery-section">Gallery</a>
            <a href="#contact-section">Contact</a>
            <a href="#product-section">Produits</a>
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