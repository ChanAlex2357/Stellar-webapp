<script setup>
import TryButton from  '../components/TryButton.vue'
</script>

<template>
    <div class="container" id="accueil">
        <div>
            <h1>Stellar</h1>
            <h2>Technologie adrenaline</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis illum sit vero laboriosam facere! Saepe ipsam sed nam eveniet impedit! Odio minus nihil labore harum voluptas, voluptatibus id architecto excepturi?</p>
        </div>
        <div id="try-button-container">
            <p>
                <TryButton></TryButton>
            </p>
        </div>
    </div>
</template>

<style>
    #accueil {
        /* width: 100vw; */
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-size: cover;
        background-repeat: no-repeat;
        color: var(--white-color);
        background-image: radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ), url("E:\\ITU\\S6\\Stellar-webapp\\src\\assets\\image\\accueil.jpg");
    }

    #try-button-container {
        display: flex;
        justify-content: end;
        align-items: end;
    }
</style>