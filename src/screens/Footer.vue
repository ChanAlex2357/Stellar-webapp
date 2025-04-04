<script setup>
// Vous pouvez importer vos icônes ici
// Par exemple avec Font Awesome ou des icônes SVG
</script>

<template>
  <div class="contact-info-card">
    <!-- Ligne téléphone -->
    <div class="info-line">
      <span class="icon">📞</span>
      <span class="text">038417806 - 033775590</span>
    </div>
    
    <!-- Ligne adresse -->
    <div class="info-line">
      <span class="icon">📍</span>
      <span class="text">Andoharanofotsy</span>
    </div>
    
    <!-- Ligne email -->
    <div class="info-line">
      <span class="icon">✉️</span>
      <a href="mailto:stellarz@gmail.com" class="text email">stellarz@gmail.com</a>
    </div>
    
    <!-- Ligne statut -->
    <div class="info-line">
      <span class="icon">🔹</span>
      <span class="text status">StellarZ</span>
    </div>
  </div>
</template>

<style scoped>
.contact-info-card {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  max-width: 300px;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}

.info-line {
  display: flex;
  align-items: center;
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
  color: #333;
}

.email {
  color: #0066cc;
  text-decoration: none;
}

.email:hover {
  text-decoration: underline;
}

.status {
  font-size: 0.85rem;
  color: #666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

@media (max-width: 480px) {
  .contact-info-card {
    width: 100%;
    max-width: none;
    padding: 1rem;
  }
}
</style>