<script setup>
import routes from '@/router'
import { ref } from 'vue';

const props = defineProps({
    source : {
        type : String,
        default : "/boutique"
    }
});


const loginErrorMessage = ref('')
const errorState = ref(false)
const loginState = ref(false)

const username = ref('')
const password = ref('')
const checkLogin = () => {
    if(username.value === 'admin' && password.value === 'admin') {
        localStorage.setItem('DOLAPIKEY', '2xLG4tBVA4kw3dLrt76735jyCCh8VMfZ')
        loginState.value = true
    }
    else {
        loginState.value = false
    }
   
}
const loginSubmit = () => {
    try {
        // Verification du login
        
        // Redirection en cas de validation
        checkLogin()
        if(loginState.value) {
            routes.push(props.source)
        }
        // Sinon on affiche le message d'erreur
        else {
            errorState.value = true
            loginErrorMessage.value = "Email ou mot de passe incorrect"
        }
    } catch (error) {
        // Afficher les messages d'erreurs

    }
}
</script>

<template>
    <div id="login-page">
        <div class="row">
            <div class="card-image card">

            </div>
            <div class="card">
                <div class="card-title">
                    <h2>Stellar - Connexion</h2>
                    <p v-if="errorState" class="error-message">{{ loginErrorMessage }}</p>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="login">Nom d'utilisateur</label>
                            <input v-model="username" type="email" id="login" placeholder="jean@gmail.com">
                        </div>
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input v-model="password" type="password" id="password" placeholder="********">
                    </div>
                    
                    <div class="form-submit-container">
                        <button @click="loginSubmit" id="submit-btn">
                            Log in
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .card-image {
        background-image: url('@/assets/image/accueil.jpg');
        background-size: cover;
        background-position: center top;
        width: 100%;
        height: 100%;
    }
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
    }
    .card {
        padding:3rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: none;
    }
    .card-title {
        text-align: center;
        margin-bottom: 2rem;
    }
    .card-title h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    .card-title p {
        color: red;
        font-size: 1.2rem;
    }
    .form-group {
        margin-bottom: 1.5rem;
    }
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
    }
    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }
    .form-group input:focus {
        border-color: var(--secondary-color);
        outline: none;
    }
    .form-submit-container {
        text-align: center;
    }
    .form-submit-container button {
        background-color: var(--secondary-color);
        color: var(--white-color);
        padding: 0.5rem 1rem;
        border: 1px solid var(--secondary-color);
        border-radius: 5px;
        font-size: 1.2rem;
        width: 100%;
        cursor: pointer;
    }
    .form-submit-container button:hover {
        background-color: var(--white-color);
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
        transition: background-color 0.3s ease;
    }

    .error-message {
        color: red;
        font-size: 1.2rem;
        margin-top: 1rem;
    }

    .card-body {
        padding: 0 5rem;
    }
</style>