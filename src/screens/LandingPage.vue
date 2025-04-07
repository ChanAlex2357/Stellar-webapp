<script setup>
import { ref } from 'vue';
import Accueil from '@/screens/Accueil.vue'
import Caracteristique from '@/screens/Caracteristique.vue'
import Gallerie from '@/screens/Galerie.vue'
import Contact from '@/screens/Contact.vue'
import NosProduit from '@/screens/NosProduit.vue'
import Footer from '@/screens/Footer.vue'
import Logo from '@/components/Logo.vue'
import ContactForm from '@/components/ContactForm.vue';

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
    <header id="header">
      <div class="container">
        <Logo></Logo>
          <nav id="menu">
            <a href="#accueil-section">Accueil</a>
            <a href="#caracteristique-section">Caractéristiques</a>
            <a href="#gallery-section">Gallery</a>
            <a href="#contact-section">Contact</a>
            <a href="#product-section">Produits</a>
            <button @click="toggleModal" class="modal-button">Open Modal</button>
        </nav>
      </div>
    </header>
    
    <Accueil></Accueil>
    <div id="orange-bar"></div>
    <Caracteristique></Caracteristique>
    <Gallerie></Gallerie>
    <Contact></Contact>
    <NosProduit></NosProduit>
    <Footer></Footer>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
      <div class="modal-content">
        <h2>CONTACTEZ-NOUS</h2>
        <form class="contact-form">
          <div class="form-group">
            <input 
              placeholder="Nom"
              type="text"
              required
            >
          </div>
          
          <div class="form-group">
            <input 
              type="email" 
              placeholder="Adresse mail"
              required
            >
          </div>
          
          <div class="form-group">
            <textarea 
              placeholder="Message"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn">ENVOYER</button>
        </form>
      </div>
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

#orange-bar {
  background-color: var(--secondary-color);
  height: 50px;
}

.modal-button {
  padding: 8px 16px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.modal-button:hover {
  background-color: darken(var(--secondary-color), 10%);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--light-color);
  padding: 20px;
  border-radius: 8px;
  max-width: 1000px;
  width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
  color: var(--white-color);
}

.close-button {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>