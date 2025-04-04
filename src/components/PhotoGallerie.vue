<!-- PhotoGallerie.vue -->
<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="photo-button">
        <img class="g-image" :src="props.src" alt="Image" />
    </div>
</template>

<style scoped>
.photo-button {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.photo-button:hover {
    transform: scale(1.03);
}

.g-image {
    aspect-ratio: 16/9;
    width: 400px;
    object-fit:fill;
}

@media (max-width: 480px) {
    .g-image {
        
    }
}
</style>