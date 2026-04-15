<<<<<<< HEAD
// === GESTION DES FAVORIS ===

class FavoritesManager {
    constructor() {
        this.favorites = new Set();
        this.init();
    }

    async init() {
        await this.loadFavorites();
        this.renderFavorites();
        this.updateStats();
        this.setupEventListeners();
    }

    async loadFavorites() {
        try {
            const favoritesData = localStorage.getItem('userFavorites');
            if (favoritesData) {
                const parsed = JSON.parse(favoritesData);
                this.favorites = new Set(parsed);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error);
            this.favorites = new Set();
        }
    }

    async saveFavorites() {
        try {
            localStorage.setItem('userFavorites', JSON.stringify([...this.favorites]));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des favoris:', error);
        }
    }

    toggleFavorite(productId) {
        if (this.favorites.has(productId)) {
            this.favorites.delete(productId);
        } else {
            this.favorites.add(productId);
        }
        this.saveFavorites();
        this.renderFavorites();
        this.updateStats();
    }

    isFavorite(productId) {
        return this.favorites.has(productId);
    }

    getFavoritesCount() {
        return this.favorites.size;
    }

    getFavoritesProducts() {
        // Récupérer les produits depuis le catalogue
        const allProducts = this.getAllProducts();
        return allProducts.filter(product => this.favorites.has(product.id));
    }

    getTotalValue() {
        const favoritesProducts = this.getFavoritesProducts();
        return favoritesProducts.reduce((total, product) => total + product.price, 0);
    }

    // Simulation des produits (en production, récupérer depuis l'API)
    getAllProducts() {
        return [
            { id: 1, name: 'iPhone 15 Pro', price: 650000, category: 'electronique', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop', rating: 5 },
            { id: 2, name: 'MacBook Pro 14"', price: 2500000, category: 'electronique', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', rating: 5 },
            { id: 3, name: 'AirPods Pro', price: 185000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1606841838624-4a2607a10a9f?w=400&h=400&fit=crop', rating: 4 },
            { id: 4, name: 'Apple Watch', price: 450000, category: 'electronique', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 5 },
            { id: 5, name: 'iPad Air', price: 950000, category: 'electronique', image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop', rating: 4 },
            { id: 6, name: 'Casque Logitech', price: 78000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4 },
            { id: 7, name: 'Souris Wireless', price: 25000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', rating: 4 },
            { id: 8, name: 'Clavier Mécanique', price: 95000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1587829191301-72ec7a2d18fa?w=400&h=400&fit=crop', rating: 5 },
            { id: 9, name: 'Lampe LED Smart', price: 35000, category: 'maison', image: 'https://images.unsplash.com/photo-1565636192335-14c95eb4b0d6?w=400&h=400&fit=crop', rating: 4 },
            { id: 10, name: 'Téléviseur 55"', price: 450000, category: 'electronique', image: 'https://images.unsplash.com/photo-1593784991095-46dcec584c4b?w=400&h=400&fit=crop', rating: 5 },
            { id: 11, name: 'Enceinte Bluetooth', price: 55000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', rating: 4 },
            { id: 12, name: 'Caméra instax', price: 125000, category: 'electronique', image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop', rating: 5 },
            { id: 13, name: 'Drone DJI Mini', price: 480000, category: 'electronique', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop', rating: 5 },
            { id: 14, name: 'Montre Connectée', price: 85000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4 },
            { id: 15, name: 'Batterie externe 50000mAh', price: 45000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', rating: 4 },
            { id: 16, name: 'Tapis Yoga Premium', price: 28000, category: 'sport', image: 'https://images.unsplash.com/photo-1518611505868-34f0eef2a239?w=400&h=400&fit=crop', rating: 4 },
            { id: 17, name: 'Haltères adjustables', price: 150000, category: 'sport', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', rating: 5 },
            { id: 18, name: 'Chaussures de course', price: 89000, category: 'sport', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', rating: 4 },
            { id: 19, name: 'Sac de gym', price: 35000, category: 'sport', image: 'https://images.unsplash.com/photo-1599521577915-10d2b1aada49?w=400&h=400&fit=crop', rating: 4 },
            { id: 20, name: 'Miroir Intelligent', price: 250000, category: 'maison', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', rating: 5 }
        ];
    }

    renderFavorites() {
        const grid = document.getElementById('favoritesGrid');
        const favoritesProducts = this.getFavoritesProducts();

        if (favoritesProducts.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❤️</div>
                    <h3>Aucun favori pour le moment</h3>
                    <p>Parcourez notre catalogue et ajoutez des produits à vos favoris !</p>
                    <a href="products.html" class="cta-button">Découvrir les produits</a>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';
        favoritesProducts.forEach(product => {
            const stars = '⭐'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            const card = document.createElement('div');
            card.className = 'favorite-card';
            card.innerHTML = `
                <div class="favorite-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}'">
                    <div class="favorite-heart ${this.isFavorite(product.id) ? 'active' : ''}" onclick="favoritesManager.toggleFavorite(${product.id})">
                        ❤️
                    </div>
                </div>
                <div class="favorite-info">
                    <h3 class="favorite-name">${product.name}</h3>
                    <div class="favorite-price">${product.price.toLocaleString('fr-FR')} FCFA</div>
                    <div class="favorite-rating">${stars}</div>
                    <div class="favorite-actions">
                        <button class="favorite-btn add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                            🛒 Ajouter au panier
                        </button>
                        <button class="favorite-btn remove-btn" onclick="favoritesManager.toggleFavorite(${product.id})">
                            ❌ Retirer
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    updateStats() {
        const countEl = document.getElementById('favoritesCount');
        const valueEl = document.getElementById('totalValue');

        if (countEl) countEl.textContent = this.getFavoritesCount();
        if (valueEl) valueEl.textContent = this.getTotalValue().toLocaleString('fr-FR') + ' FCFA';
    }

    setupEventListeners() {
        // Bouton "Ajouter tous au panier"
        const addAllBtn = document.getElementById('addAllToCart');
        if (addAllBtn) {
            addAllBtn.addEventListener('click', () => this.addAllToCart());
        }

        // Bouton "Vider les favoris"
        const clearBtn = document.getElementById('clearAll');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllFavorites());
        }
    }

    async addAllToCart() {
        const favoritesProducts = this.getFavoritesProducts();
        if (favoritesProducts.length === 0) {
            showNotification('Aucun produit dans les favoris', 'error');
            return;
        }

        try {
            for (const product of favoritesProducts) {
                await AppDB.addCartItem({ nom: product.name, prix: product.price });
            }
            showNotification(`${favoritesProducts.length} produits ajoutés au panier !`);
        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
            showNotification('Erreur lors de l\'ajout au panier', 'error');
        }
    }

    clearAllFavorites() {
        if (confirm('Êtes-vous sûr de vouloir vider tous vos favoris ?')) {
            this.favorites.clear();
            this.saveFavorites();
            this.renderFavorites();
            this.updateStats();
            showNotification('Favoris vidés avec succès');
        }
    }
}

// === FONCTIONS GLOBALES ===

// Fonction pour ajouter au panier (utilise AppDB)
async function addToCart(id, name, price) {
    try {
        await AppDB.addCartItem({ nom: name, prix: price });
        showNotification(`${name} ajouté au panier !`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        showNotification('Erreur lors de l\'ajout au panier', 'error');
    }
}

// Fonction de notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// === ANIMATIONS CSS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === INITIALISATION ===
let favoritesManager;
document.addEventListener('DOMContentLoaded', function() {
    favoritesManager = new FavoritesManager();
    console.log('Page favoris initialisée');
=======
// === GESTION DES FAVORIS ===

class FavoritesManager {
    constructor() {
        this.favorites = new Set();
        this.init();
    }

    async init() {
        await this.loadFavorites();
        this.renderFavorites();
        this.updateStats();
        this.setupEventListeners();
    }

    async loadFavorites() {
        try {
            const favoritesData = localStorage.getItem('userFavorites');
            if (favoritesData) {
                const parsed = JSON.parse(favoritesData);
                this.favorites = new Set(parsed);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error);
            this.favorites = new Set();
        }
    }

    async saveFavorites() {
        try {
            localStorage.setItem('userFavorites', JSON.stringify([...this.favorites]));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des favoris:', error);
        }
    }

    toggleFavorite(productId) {
        if (this.favorites.has(productId)) {
            this.favorites.delete(productId);
        } else {
            this.favorites.add(productId);
        }
        this.saveFavorites();
        this.renderFavorites();
        this.updateStats();
    }

    isFavorite(productId) {
        return this.favorites.has(productId);
    }

    getFavoritesCount() {
        return this.favorites.size;
    }

    getFavoritesProducts() {
        // Récupérer les produits depuis le catalogue
        const allProducts = this.getAllProducts();
        return allProducts.filter(product => this.favorites.has(product.id));
    }

    getTotalValue() {
        const favoritesProducts = this.getFavoritesProducts();
        return favoritesProducts.reduce((total, product) => total + product.price, 0);
    }

    // Simulation des produits (en production, récupérer depuis l'API)
    getAllProducts() {
        return [
            { id: 1, name: 'iPhone 15 Pro', price: 650000, category: 'electronique', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop', rating: 5 },
            { id: 2, name: 'MacBook Pro 14"', price: 2500000, category: 'electronique', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', rating: 5 },
            { id: 3, name: 'AirPods Pro', price: 185000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1606841838624-4a2607a10a9f?w=400&h=400&fit=crop', rating: 4 },
            { id: 4, name: 'Apple Watch', price: 450000, category: 'electronique', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 5 },
            { id: 5, name: 'iPad Air', price: 950000, category: 'electronique', image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop', rating: 4 },
            { id: 6, name: 'Casque Logitech', price: 78000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4 },
            { id: 7, name: 'Souris Wireless', price: 25000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', rating: 4 },
            { id: 8, name: 'Clavier Mécanique', price: 95000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1587829191301-72ec7a2d18fa?w=400&h=400&fit=crop', rating: 5 },
            { id: 9, name: 'Lampe LED Smart', price: 35000, category: 'maison', image: 'https://images.unsplash.com/photo-1565636192335-14c95eb4b0d6?w=400&h=400&fit=crop', rating: 4 },
            { id: 10, name: 'Téléviseur 55"', price: 450000, category: 'electronique', image: 'https://images.unsplash.com/photo-1593784991095-46dcec584c4b?w=400&h=400&fit=crop', rating: 5 },
            { id: 11, name: 'Enceinte Bluetooth', price: 55000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', rating: 4 },
            { id: 12, name: 'Caméra instax', price: 125000, category: 'electronique', image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop', rating: 5 },
            { id: 13, name: 'Drone DJI Mini', price: 480000, category: 'electronique', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop', rating: 5 },
            { id: 14, name: 'Montre Connectée', price: 85000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4 },
            { id: 15, name: 'Batterie externe 50000mAh', price: 45000, category: 'accessoires', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', rating: 4 },
            { id: 16, name: 'Tapis Yoga Premium', price: 28000, category: 'sport', image: 'https://images.unsplash.com/photo-1518611505868-34f0eef2a239?w=400&h=400&fit=crop', rating: 4 },
            { id: 17, name: 'Haltères adjustables', price: 150000, category: 'sport', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', rating: 5 },
            { id: 18, name: 'Chaussures de course', price: 89000, category: 'sport', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', rating: 4 },
            { id: 19, name: 'Sac de gym', price: 35000, category: 'sport', image: 'https://images.unsplash.com/photo-1599521577915-10d2b1aada49?w=400&h=400&fit=crop', rating: 4 },
            { id: 20, name: 'Miroir Intelligent', price: 250000, category: 'maison', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', rating: 5 }
        ];
    }

    renderFavorites() {
        const grid = document.getElementById('favoritesGrid');
        const favoritesProducts = this.getFavoritesProducts();

        if (favoritesProducts.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❤️</div>
                    <h3>Aucun favori pour le moment</h3>
                    <p>Parcourez notre catalogue et ajoutez des produits à vos favoris !</p>
                    <a href="products.html" class="cta-button">Découvrir les produits</a>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';
        favoritesProducts.forEach(product => {
            const stars = '⭐'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            const card = document.createElement('div');
            card.className = 'favorite-card';
            card.innerHTML = `
                <div class="favorite-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}'">
                    <div class="favorite-heart ${this.isFavorite(product.id) ? 'active' : ''}" onclick="favoritesManager.toggleFavorite(${product.id})">
                        ❤️
                    </div>
                </div>
                <div class="favorite-info">
                    <h3 class="favorite-name">${product.name}</h3>
                    <div class="favorite-price">${product.price.toLocaleString('fr-FR')} FCFA</div>
                    <div class="favorite-rating">${stars}</div>
                    <div class="favorite-actions">
                        <button class="favorite-btn add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                            🛒 Ajouter au panier
                        </button>
                        <button class="favorite-btn remove-btn" onclick="favoritesManager.toggleFavorite(${product.id})">
                            ❌ Retirer
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    updateStats() {
        const countEl = document.getElementById('favoritesCount');
        const valueEl = document.getElementById('totalValue');

        if (countEl) countEl.textContent = this.getFavoritesCount();
        if (valueEl) valueEl.textContent = this.getTotalValue().toLocaleString('fr-FR') + ' FCFA';
    }

    setupEventListeners() {
        // Bouton "Ajouter tous au panier"
        const addAllBtn = document.getElementById('addAllToCart');
        if (addAllBtn) {
            addAllBtn.addEventListener('click', () => this.addAllToCart());
        }

        // Bouton "Vider les favoris"
        const clearBtn = document.getElementById('clearAll');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllFavorites());
        }
    }

    async addAllToCart() {
        const favoritesProducts = this.getFavoritesProducts();
        if (favoritesProducts.length === 0) {
            showNotification('Aucun produit dans les favoris', 'error');
            return;
        }

        try {
            for (const product of favoritesProducts) {
                await AppDB.addCartItem({ nom: product.name, prix: product.price });
            }
            showNotification(`${favoritesProducts.length} produits ajoutés au panier !`);
        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
            showNotification('Erreur lors de l\'ajout au panier', 'error');
        }
    }

    clearAllFavorites() {
        if (confirm('Êtes-vous sûr de vouloir vider tous vos favoris ?')) {
            this.favorites.clear();
            this.saveFavorites();
            this.renderFavorites();
            this.updateStats();
            showNotification('Favoris vidés avec succès');
        }
    }
}

// === FONCTIONS GLOBALES ===

// Fonction pour ajouter au panier (utilise AppDB)
async function addToCart(id, name, price) {
    try {
        await AppDB.addCartItem({ nom: name, prix: price });
        showNotification(`${name} ajouté au panier !`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        showNotification('Erreur lors de l\'ajout au panier', 'error');
    }
}

// Fonction de notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// === ANIMATIONS CSS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === INITIALISATION ===
let favoritesManager;
document.addEventListener('DOMContentLoaded', function() {
    favoritesManager = new FavoritesManager();
    console.log('Page favoris initialisée');
>>>>>>> a9f53c133c12448008e6c294e69fbaca9d695454
});