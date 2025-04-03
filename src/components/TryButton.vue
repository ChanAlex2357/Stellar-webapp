<script setup>

</script>

<template>
        <button class="btn-cta" id="try-button">
            JE VEUX ESSAYER
        </button>
</template>

<style>
    .btn-cta {
        background-color: var(--primary-color); 
        color: var(--white-color);
        padding: 1rem ;
        border-radius: 5px;
        text-align: center;
    }

    #try-button {
        width: 100%;
        border: none;
    }
    #try-button:hover {
        background-color: rgba(42, 146, 244, 0.5);
        cursor: pointer;
    }
</style>