<script setup>
import router from '@/router';

// Logique du composant si nécessaire
const goToShop = () => {
  router.push('/boutique');
}
</script>

<template>
    <div class="container" id="caracteristique">
        <div class="product-container">
            <div class="product-image">
                <img src="/src/assets/image/cool-bicycle-outdoors.jpg" alt="cool-bicycle-outdoors.jpg">
                <div class="orange-bloc"></div>
            </div>
            <div class="product-content">
                <h1 class="text-header">L'ESSENCE MÊME DE LA PERFORMANCE EXTREME</h1>
                <p>Ce VTT haut de gamme repousse les limites avec son cadre en fibre de carbone renforcée de nanotubes (5 kg seulement !), une transmission électronique 12 vitesses et des freins hydrauliques ultra-réactifs. Conçu pour les riders exigeants, il allie légèreté extrême, robustesse innovante et vitesse +15% plus élevée grâce à son aérodynamique optimisée. Prêt à dompter les trails les plus fous ? Stellar Z, c'est la fusion parfaite entre high-tech et performance pure</p>
                
                <!-- Bouton BOUTIQUE ajouté ici -->
                <button @click="goToShop" class="shop-button">
                    BOUTIQUE
                    <span class="button-arrow">→</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Styles existants conservés */
#caracteristique {
    background-color: var(--dark-color);
    color: var(--white-color);
}
.product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    padding: 6rem 0;
    min-width: 1000px;
}

.product-image {
    margin: 3rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
}

.orange-bloc {
    position: absolute;
    top: calc(100% - 100px + 2rem);
    left: -2rem ;
    width: 150px;
    height: 100px;
    background-color: var(--secondary-color);
}

.product-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    min-height: 500px;
}

.product-content h1 {
    line-height: 1.2;
}

.product-content p {
    line-height: 1.6;
}

/* Nouveaux styles pour le bouton */
.shop-button {
    align-self: flex-start; /* Alignement à gauche */
    background-color: var(--primary-color);
    color: var(--dark-color);
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    margin-top: 1rem;
    border-radius: 2px;
}

.shop-button:hover {
    background-color: var(--white-color);
    transform: translateY(-2px);
}

.button-arrow {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
}

.shop-button:hover .button-arrow {
    transform: translateX(3px);
}

@media (max-width: 768px) {
    .product-container {
        grid-template-columns: 1fr;
        min-width: none;
    }
    
    .shop-button {
        align-self: center; /* Centrer sur mobile */
    }
}
</style>