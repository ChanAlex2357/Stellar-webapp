<!-- Galerie.vue -->
<script setup>
import PhotoGallerie from '../components/PhotoGallerie.vue'
</script>

<template>
    <div class="gallery-container">
        <div class="container">
            <div class="title-header">
                <h1>GALLERIE</h1>
            </div>
            
            <div class="video-container">
                <video autoplay muted loop playsinline>
                    <source src="./src/assets/image/video.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas les vidéos HTML5.
                </video>
            </div>
            
            <div class="photos-grid">
                <PhotoGallerie src="./src/assets/image/young-adult-using-electric-bike-country-side.jpg" />
                <PhotoGallerie src="./src/assets/image/original_Sunlight_Over_Misty_Valley_jpg.jpg" />
                <PhotoGallerie src="./src/assets/image/cyclist-sunny-day-bike-adventure-travel-photo.jpg" />
                <PhotoGallerie src="./src/assets/image/bmx-rider-is-performing-tricks-skatepark-sunset.jpg" />
                <PhotoGallerie src="./src/assets/image/young-adult-using-electric-bike-country-side.jpg" />
                <PhotoGallerie src="./src/assets/image/biker-jumping-flying-hill.jpg" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery-container {
    background-color: var(--light-color);
}

.gallery-container .container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem;
    gap: 3rem;
}

.title-header h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    color: var(--white-color);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 700;
}

.video-container {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.video-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.photos-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    gap: 1.5rem;
}

@media (max-width: 1024px) {
    .gallery-container .container {
        padding: 2rem;
    }
    
    .title-header h1 {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .photos-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .title-header h1 {
        font-size: 1.8rem;
    }
}

@media (max-width: 480px) {
    .gallery-container .container {
        padding: 1.5rem;
        gap: 2rem;
    }
    
    .photos-grid {
        grid-template-columns: 1fr;
    }
    
    .title-header h1 {
        font-size: 1.5rem;
    }
}
</style>