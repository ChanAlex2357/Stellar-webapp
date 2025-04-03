<script setup>
import Accueil from './screens/Accueil.vue'

</script>

<template>
  <main>
      <Accueil></Accueil>
      <div id="orange-bar">
        orange color
      </div>
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
