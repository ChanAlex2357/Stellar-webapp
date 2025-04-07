<script setup>
import { ref } from 'vue';
import IconDisplay from '@/components/IconDisplay.vue'
import ContactForm from '@/components/ContactForm.vue'
</script>

<template>
  <div class="contact-page" id="contact-section" tabindex="-1">
    <!-- Partie Gauche - Texte et icônes -->
    <div class="left-section">
      <div>

        <h1>AVEZ-VOUS DES QUESTIONS ?</h1>
        <p class="subtitle">Si vous en avez contactez-nous via le formulaire ou trouvez-nous à cette adresse</p>
      </div>
      
      <div class="social-block">
        <h2>SUIVEZ-NOUS</h2>
        <div class="social-icons">
          <!-- Remplacez par vos vrais composants d'icônes -->
          <IconDisplay name="facebook"></IconDisplay>
          <IconDisplay name="instagram"></IconDisplay>
          <IconDisplay name="twitter"></IconDisplay>
        </div>
      </div>
    </div>

    <ContactForm />
  </div>
</template>

<style scoped>
.contact-page {
  display: flex;
  min-height: 100vh;
}

.left-section {
  flex: 1;
  padding: 3rem;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.left-section h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--white-color);
}

.subtitle {
  font-size: 1.2rem;
  color:var(--white-color);
  margin-bottom: 3rem;
  max-width: 60%;

}

.social-block {
  margin-top: 3rem;
}

.social-block h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color:var(--white-color);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.icon {
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}


@media (max-width: 768px) {
  .contact-page {
    flex-direction: column;
  }
  
  .left-section,
  .right-section {
    padding: 2rem;
  }
  
  .left-section h1 {
    font-size: 2rem;
  }
}
</style>