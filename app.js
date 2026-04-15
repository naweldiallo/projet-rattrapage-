// ===== DONNÉES PRODUITS =====
const products = [
  { id: 1, name: "Smartphone Pro Max", price: 200000, category: "electronique", emoji: "📱", stars: 5, stock: 10 },
  { id: 2, name: "Casque Bluetooth", price: 8000,  category: "electronique", emoji: "🎧", stars: 4, stock: 5 },
  { id: 3, name: "Laptop Ultra Slim", price: 400000, category: "electronique", emoji: "💻", stars: 5, stock: 3 },
  { id: 4, name: "T-Shirt Premium",   price: 10000,  category: "vetements",   emoji: "👕", stars: 4, stock: 20 },
  { id: 5, name: "Sneakers Trendy",   price: 45000,  category: "vetements",   emoji: "👟", stars: 4, stock: 8 },
  { id: 6, name: "Veste en Jean",     price: 10000,  category: "vetements",   emoji: "🧥", stars: 3, stock: 6 },
  { id: 7, name: "Lampe LED Bureau",  price: 20000,  category: "maison",      emoji: "💡", stars: 4, stock: 15 },
  { id: 8, name: "Tapis Décoratif",   price: 80000,  category: "maison",      emoji: "🪞", stars: 3, stock: 4 },
];

// ===== PANIER (LocalStorage) =====
function getCart() {
  return JSON.parse(localStorage.getItem('shopzone_cart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('shopzone_cart', JSON.stringify(cart));
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`✅ ${product.name} ajouté au panier !`);
}

// ===== COMPTEUR PANIER =====
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; background: #1a1a2e;
    color: white; padding: 0.8rem 1.5rem; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 999;
    font-size: 0.95rem; animation: fadeIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== RENDU CARTE PRODUIT =====
function createCard(p) {
  const stars = '⭐'.repeat(p.stars);
  return `
    <div class="card">
      <div class="card-emoji">${p.emoji}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="stars">${stars}</p>
        <p class="price">${p.price.toLocaleString()} FCFA</p>
        <p style="font-size:0.8rem;color:#aaa">Stock : ${p.stock}</p>
        <button class="btn-add" onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    </div>
  `;
}

// ===== AFFICHAGE PRODUITS =====
function renderProducts(data, containerId = 'productsGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = data.length
    ? data.map(createCard).join('')
    : '<p style="text-align:center;color:#aaa;grid-column:1/-1">Aucun produit trouvé.</p>';
}

// ===== FILTRAGE =====
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

// ===== RECHERCHE =====
function searchProducts() {
  const query = document.getElementById('searchInput')?.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

// ===== MENU HAMBURGER =====
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('navLinks')?.classList.toggle('active');
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById('featuredGrid')) {
    renderProducts(products.slice(0, 4), 'featuredGrid');
  }
  if (document.getElementById('productsGrid')) {
    renderProducts(products);
  }
});
