<script setup>
import TryButton from  '../components/TryButton.vue'
</script>

<template>
    <div class="container" id="accueil">
        <div id="accueil-text-container">
            <div id="accueil-logo" class="">
                <h1 class="text-title">STELLAR</h1>
                <h1 class="text-title">Z</h1>
            </div>
            <div id="accueil-text" class="grow gap">
                <h1 class="text-title">Technologie </h1>
                <h1 style="color: var(--secondary-color);line-height: 0rem;" class="text-title">adrenaline</h1>
                <p style="margin-top: 3rem;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis illum sit vero laboriosam facere! Saepe ipsam sed nam eveniet impedit! Odio minus nihil labore harum voluptas, voluptatibus id architecto excepturi?</p>
            </div>
        </div>
        <div id="try-button-container">
            <div id="button-container">
                <TryButton></TryButton>
            </div>
        </div>
    </div>
</template>

<style>
    #accueil {
        min-height: 800px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        background-size: cover;
        background-repeat: no-repeat;
        color: var(--white-color);
        background-image: radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url("E:\\ITU\\S6\\Stellar-webapp\\src\\assets\\image\\accueil.jpg");
    }
    .grow {
        flex-grow: 1;
    }

    .gap {
        gap: 20px;
    }

    #accueil-logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: 300px;
    }

    #accueil-text-container {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    #accueil-text{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    #try-button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            ". , ."
            ". , a"
        ;
    }


    #button-container {
        grid-area: a;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>