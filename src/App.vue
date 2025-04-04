<script setup>
import Accueil from './screens/Accueil.vue'
import Caracteristique from './screens/Caracteristique.vue'
import Gallerie from './screens/Galerie.vue'
import Contact from './screens/Contact.vue'
import NosProduit from './screens/NosProduit.vue'
import Footer from './screens/Footer.vue'
import Boutique from './page/Boutique.vue'

</script>

<template>
  <main>
      <Accueil></Accueil>
      <div id="orange-bar"></div>
      <Caracteristique></Caracteristique>
      <Gallerie></Gallerie>
      <Contact></Contact>
      <NosProduit></NosProduit>
      <Footer></Footer>
      <Boutique></Boutique>
   
      
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

#orange-bar {
  background-color: var(--secondary-color);
  height: 50px;
}

/* 

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  */
</style>
