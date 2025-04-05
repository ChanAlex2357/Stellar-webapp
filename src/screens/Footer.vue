<script setup>
import IconDisplay from '@/components/IconDisplay.vue'
</script>

<template>
  <div class="contact-info-card">
    <!-- Ligne téléphone -->
    <div class="info-line">
      <IconDisplay name="phone" />
      <span class="text">038417806 - 033775590</span>
    </div>
    
    <!-- Ligne adresse -->
    <div class="info-line">
      <IconDisplay name="home" />

      <span class="text">Andoharanofotsy</span>
    </div>
    
    <!-- Ligne email -->
    <div class="info-line">
      <IconDisplay name="mail" />

      <a href="mailto:stellarz@gmail.com" class="text email">stellarz@gmail.com</a>
    </div>
    
    <!-- Ligne statut -->
    <div class="info-line">
      <IconDisplay name="facebook" />

      <span class="text status">StellarZ</span>
    </div>
  </div>
</template>

<style scoped>
.contact-info-card {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  width: 100%;
  padding: 1.5rem;
  color: var(--white-color);
  background-color: var(--secondary-color);
  display: flex;
}

.info-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 0.8rem;
}

.icon {
  margin-right: 12px;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.text {
  font-size: 0.95rem;
}

.email {
  color: var(--white-color);
  text-decoration: none;
}

.email:hover {
  text-decoration: underline;
}

.status {
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

@media (max-width: 480px) {
  .contact-info-card {
    width: 100%;
    max-width: none;
    padding: 1rem;
  }
}
</style>