<script setup>
import router from '@/router';

// Logique du composant si nécessaire
const goToShop = () => {
  router.push('/boutique');
}
</script>

<template>
        <!-- Bouton BOUTIQUE ajouté ici -->
        <button @click="goToShop" class="btn-cta shop-button">
            BOUTIQUE
            <span class="button-arrow">→</span>
        </button>
</template>

<style>
    .btn-cta {
        background-color: var(--primary-color); 
        color: var(--white-color);
        padding: 1rem ;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        border: none;
    }
    .btn-cta:hover {
        background-color: rgba(42, 146, 244, 0.5);
        cursor: pointer;
    }

    /* Nouveaux styles pour le bouton */
.shop-button {
    background-color: var(--primary-color);
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
    color: var(--primary-color);
    transform: translateY(-2px);
}

.button-arrow {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
}

.shop-button:hover .button-arrow {
    transform: translateX(3px);
}
</style>``