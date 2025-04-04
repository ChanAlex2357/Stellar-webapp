<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  console.log('Formulaire soumis:', form.value);
  // Ajoutez ici la logique d'envoi
};
</script>

<template>
  <div class="contact-page">
    <!-- Partie Gauche - Texte et icônes -->
    <div class="left-section">
      <h1>AVEZ-VOUS DES QUESTIONS ?</h1>
      <p class="subtitle">Si vous en avez contactez-nous via le formulaire ou trouvez-nous à cette adresse</p>
      
      <div class="social-block">
        <h2>SUIVEZ-NOUS</h2>
        <div class="social-icons">
          <!-- Remplacez par vos vrais composants d'icônes -->
          <span class="icon">FB</span>
          <span class="icon">IG</span>
          <span class="icon">TW</span>
          <span class="icon">LI</span>
        </div>
      </div>
    </div>

    <!-- Partie Droite - Formulaire -->
    <div class="right-section">
      <h2>CONTACTEZ-NOUS</h2>
      
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label>Nom</label>
          <input 
            type="text" 
            v-model="form.name" 
            required
          >
        </div>
        
        <div class="form-group">
          <label>Adresse mail</label>
          <input 
            type="email" 
            v-model="form.email" 
            required
          >
        </div>
        
        <div class="form-group">
          <label>Message</label>
          <textarea 
            v-model="form.message" 
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn">ENVOYER</button>
      </form>
    </div>
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
  justify-content: center;
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
  max-width: 80%;
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

.right-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  background-color: var(--dark-color);
  flex-direction: column;
  justify-content: center;
}

.right-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color:var(--white-color);
}

.contact-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background-color: var(--primary-color);
  color:var(--white-color);
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-btn:hover {
  background-color: #555;
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