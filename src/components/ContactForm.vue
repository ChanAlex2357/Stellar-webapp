<script setup>
import {ref} from 'vue'
const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  console.log('Formulaire soumis:', form.value);
  // Ajoutez ici la logique d'envoi
};</script>
<template>
    <!-- Partie Droite - Formulaire -->
    <div class="right-section">
      <h2>CONTACTEZ-NOUS</h2>
      
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input 
            placeholder="Nom"
            type="text" 
            v-model="form.name" 
            required
          >
        </div>
        
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Adresse mail"
            v-model="form.email" 
            required
          >
        </div>
        
        <div class="form-group">
          <textarea 
            placeholder="Message"
            v-model="form.message" 
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn">ENVOYER</button>
      </form>
    </div>
</template>


<style>

.right-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  background-color: var(--dark-color);
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.right-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color:var(--white-color);
}

.contact-form {
  width: 100%;
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
  background-color:var(--white-color);
  color: var(--primary-color);
}
</style>