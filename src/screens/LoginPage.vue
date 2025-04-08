<script setup>
import RoundSpinner from '@/components/RoundSpinner.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    source: {
        type: String,
        default: "/boutique"
    }
});

const router = useRouter();
const loginErrorMessage = ref('');
const errorState = ref(false);
const loginState = ref(false);

const credentials = ref({
    username: '',
    password: ''
});


const loginSubmit = async () => {
    try {
        loginState.value = true;
        errorState.value = false;
        loginErrorMessage.value = '';
        
        // Extraction des valeurs primitives
        const loginData = {
            login: credentials.value.username,
            password: credentials.value.password
        };

        const response = await fetch('http://localhost/dolibarr/htdocs/api/index.php/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        console.log("Réponse de l'API:", response);

        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }

        const data = await response.json();
        
        console.log("Données de l'API:", data);
        if (data.success && data.success.token) {
            const token = data.success.token;
            localStorage.setItem('DOLAPIKEY', token);
            
            // Redirection après connexion réussie
            localStorage.setItem('user_id', JSON.stringify(data.success.entity));
            
            localStorage.setItem('cart', JSON.stringify({ items: [], count: 0, total: 0 }));
            router.push(props.source);
        } else {
            throw new Error(data.error?.message || 'Identifiants incorrects');
        }
    } catch (error) {
        errorState.value = true;
        loginErrorMessage.value = error.message;
        console.error("Erreur de connexion:", error);
    }
    finally {
        loginState.value = false;
    }
};
</script>

<template>
    <div id="login-page">
        <div class="row">
            <div class="card-image card"></div>
            <div class="card">
                <div class="card-title">
                    <h2>Stellar - Connexion</h2>
                    <p v-if="errorState" class="error-message">{{ loginErrorMessage }}</p>
                </div>
                <div class="card-body">
                    <form @submit.prevent="loginSubmit">
                        <div class="form-group">
                            <label for="login">Nom d'utilisateur</label>
                            <input v-model="credentials.username" type="text" id="login" placeholder="jean@gmail.com" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Mot de passe</label>
                            <input v-model="credentials.password" type="password" id="password" placeholder="********" required>
                        </div>
                        
                        <div class="form-submit-container">
                            <button v-if="loginState" class="submit-btn"> <RoundSpinner /> </button>
                            <button v-else  type="submit" id="submit-btn">Se connecter</button>
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
    padding: 3rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 0;
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

@media (max-width: 768px) {
    .row {
        grid-template-columns: 1fr;
    }
    
    .card-image {
        display: none;
    }
    
    .card-body {
        padding: 0 1rem;
    }
}
</style>