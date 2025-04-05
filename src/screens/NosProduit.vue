<script setup>
// Vous pouvez ajouter ici des données réactives si nécessaire
</script>

<template>
<div class="container">

    <div class="product-container">
        <!-- Partie texte -->
    <div class="product-info">
      <h1 class="product-title">STELLAR-A</h1>
      <h3 class="product-subtitle text-title">Nouvelle  <span class="text-title"> Référence</span></h3>
      
      <div class="product-description">
        <p class="main-text">Innovation Radicale, Performance Inégalée</p>
        <p class="main-text">
          La marque STELLAR relève à nouveau le défi avec le STELLAR A, son tout nouveau vélo tout-terrain conçu pour repousser les limites de la vitesse et du contrôle. Toujours plus léger, plus robuste et plus technologique, ce modèle intègre les dernières avancées en matière d'aérodynamique et de matériaux composites pour offrir une expérience de ride incomparable.
        </p>
        <p class="main-text">La puissance évoluée, la qualité intacte</p>
      </div>
    </div>
    
    <!-- Partie images -->
    <div class="product-images">
        <div class="image-placeholder">
          <img src="@/assets/image/product-1.png" alt="p1">
        </div>
        <div class="image-placeholder">
          <img src="@/assets/image/product-2.png" alt="p2">
        </div>
    </div>
</div>
</div>
</template>

<style scoped>
.container {
  background-color: var(--dark-color);
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.product-container {
  display: flex;
  background-color: var(--light-color);
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  gap: 3rem;
  align-items: center;
}

.product-info {
  flex: 1;
  padding-right: 2rem;
}

.product-images {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.product-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--white-color);
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.product-subtitle {
  font-weight: 600;
  color:var(--white-color);
  margin-bottom: 2rem;
}

span {
  color: var(--secondary-color);
}

.highlight-text {
  font-size: 1.3rem;
  font-weight: 600;
  color:var(--white-color);
  margin-bottom: 1.5rem;
}

.main-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--white-color);
  margin-bottom: 2rem;
}

.tagline {
  font-size: 1.2rem;
  font-weight: 500;
  font-style: italic;
  color: #222;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.image-placeholder {
  border-radius: 8px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  overflow: hidden;
  position: relative;
}

.image-placeholder img {
  width: 100%;
  height: auto;
  scale: 0.6;
}

/* Effet hover pour les images */
.image-placeholder:hover {
  scale: 1.05;
  transition: scale 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  
  .product-info {
    padding-right: 0;
    margin-bottom: 2rem;
  }
  
  .product-title {
    font-size: 2.2rem;
  }
  
  .product-images {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>