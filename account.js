// === GESTION DES COMPTES UTILISATEURS ===

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    async init() {
        await this.checkCurrentUser();
        this.setupEventListeners();
        this.updateUI();
    }

    async checkCurrentUser() {
        const userId = localStorage.getItem('currentUserId');
        if (userId) {
            try {
                this.currentUser = await AppDB.getUserById(parseInt(userId));
                if (!this.currentUser) {
                    localStorage.removeItem('currentUserId');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', error);
                localStorage.removeItem('currentUserId');
            }
        }
    }

    setupEventListeners() {
        // Switch entre connexion et inscription
        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('register');
        });

        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('login');
        });

        // Formulaires
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });

        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(e.target);
        });

        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpdateProfile(e.target);
        });
    }

    showSection(section) {
        const sections = ['login-section', 'register-section', 'profile-section'];
        sections.forEach(sec => {
            document.getElementById(sec).classList.add('hidden');
        });
        document.getElementById(`${section}-section`).classList.remove('hidden');
    }

    updateUI() {
        if (this.currentUser) {
            this.showSection('profile');
            this.populateProfile();
        } else {
            this.showSection('login');
        }
    }

    async handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            this.showMessage('Connexion en cours...', 'info');

            const user = await AppDB.getUserByEmail(email);
            if (!user) {
                throw new Error('Email ou mot de passe incorrect');
            }

            if (user.password !== this.hashPassword(password)) {
                throw new Error('Email ou mot de passe incorrect');
            }

            this.currentUser = user;
            localStorage.setItem('currentUserId', user.id);
            this.showMessage('Connexion réussie !', 'success');
            setTimeout(() => this.updateUI(), 1000);

        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    async handleRegister(form) {
        const formData = new FormData(form);
        const userData = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: this.hashPassword(formData.get('password')),
            confirmPassword: formData.get('confirmPassword'),
            createdAt: new Date().toISOString(),
            orders: []
        };

        // Validation
        if (userData.password !== this.hashPassword(formData.get('confirmPassword'))) {
            this.showMessage('Les mots de passe ne correspondent pas', 'error');
            return;
        }

        if (userData.password.length < 6) {
            this.showMessage('Le mot de passe doit contenir au moins 6 caractères', 'error');
            return;
        }

        try {
            this.showMessage('Création du compte en cours...', 'info');

            // Vérifier si l'email existe déjà
            const existingUser = await AppDB.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Un compte avec cet email existe déjà');
            }

            // Supprimer les champs de validation avant sauvegarde
            delete userData.confirmPassword;

            const userId = await AppDB.addUser(userData);
            userData.id = userId;

            this.currentUser = userData;
            localStorage.setItem('currentUserId', userId);
            this.showMessage('Compte créé avec succès !', 'success');
            setTimeout(() => this.updateUI(), 1000);

        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    async handleUpdateProfile(form) {
        const formData = new FormData(form);
        const updates = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            phone: formData.get('phone')
        };

        try {
            await AppDB.updateUser(this.currentUser.id, { ...this.currentUser, ...updates });
            this.currentUser = { ...this.currentUser, ...updates };
            this.showMessage('Profil mis à jour avec succès !', 'success');
            this.populateProfile();
        } catch (error) {
            this.showMessage('Erreur lors de la mise à jour du profil', 'error');
        }
    }

    populateProfile() {
        if (!this.currentUser) return;

        document.getElementById('user-name').textContent =
            `${this.currentUser.firstname} ${this.currentUser.lastname}`;
        document.getElementById('user-email').textContent = this.currentUser.email;

        // Pré-remplir le formulaire de paramètres
        document.getElementById('settings-firstname').value = this.currentUser.firstname;
        document.getElementById('settings-lastname').value = this.currentUser.lastname;
        document.getElementById('settings-phone').value = this.currentUser.phone;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUserId');
        this.updateUI();
        this.showMessage('Déconnexion réussie', 'success');
    }

    // Fonction de hash simple (en production, utiliser bcrypt)
    hashPassword(password) {
        // Hash simple pour démonstration - NE PAS UTILISER EN PRODUCTION
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir en 32 bits
        }
        return hash.toString();
    }

    showMessage(message, type) {
        // Supprimer les anciens messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;

        const container = document.querySelector('.auth-container');
        container.insertBefore(messageEl, container.firstChild);

        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// === GESTION DE L'HISTORIQUE DES COMMANDES ===

function showOrderHistory() {
    const historyEl = document.getElementById('order-history');
    const isVisible = !historyEl.classList.contains('hidden');

    // Masquer les autres sections
    document.getElementById('account-settings').classList.add('hidden');

    if (isVisible) {
        historyEl.classList.add('hidden');
    } else {
        historyEl.classList.remove('hidden');
        loadOrderHistory();
    }
}

async function loadOrderHistory() {
    const ordersList = document.getElementById('orders-list');

    try {
        const orders = await AppDB.getOrders();
        ordersList.innerHTML = '';

        if (orders.length === 0) {
            ordersList.innerHTML = '<p class="no-orders">Aucune commande trouvée</p>';
            return;
        }

        orders.forEach(order => {
            const orderEl = document.createElement('div');
            orderEl.className = 'order-item';
            orderEl.innerHTML = `
                <div class="order-header">
                    <span class="order-date">${new Date(order.date).toLocaleDateString('fr-FR')}</span>
                    <span class="order-total">${order.items.reduce((sum, item) => sum + item.prix, 0).toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `<span class="order-item-name">${item.nom}</span>`).join(', ')}
                </div>
            `;
            ordersList.appendChild(orderEl);
        });

    } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
        ordersList.innerHTML = '<p class="no-orders">Erreur lors du chargement des commandes</p>';
    }
}

function showAccountSettings() {
    const settingsEl = document.getElementById('account-settings');
    const isVisible = !settingsEl.classList.contains('hidden');

    // Masquer les autres sections
    document.getElementById('order-history').classList.add('hidden');

    if (isVisible) {
        settingsEl.classList.add('hidden');
    } else {
        settingsEl.classList.remove('hidden');
    }
}

// === VALIDATION DES FORMULAIRES ===

function setupFormValidation() {
    // Validation en temps réel des mots de passe
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Les mots de passe ne correspondent pas');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    }

    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    // Validation du téléphone
    const phoneInput = document.getElementById('register-phone');
    phoneInput.addEventListener('input', function() {
        const phoneRegex = /^(\+237|237)?[6-9][0-9]{7}$/;
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            this.setCustomValidity('Format de téléphone invalide (ex: 677123456)');
        } else {
            this.setCustomValidity('');
        }
    });
}

// === INITIALISATION ===

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la gestion des comptes
    const authManager = new AuthManager();

    // Configuration de la validation des formulaires
    setupFormValidation();

    // Exposition des fonctions globales pour les boutons
    window.showOrderHistory = showOrderHistory;
    window.showAccountSettings = showAccountSettings;
    window.logout = () => authManager.logout();

    console.log('Page compte initialisée avec succès');
});