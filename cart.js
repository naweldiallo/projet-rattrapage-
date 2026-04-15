function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  updateCartCount();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">🛒 Votre panier est vide.<br><a href="products.html" style="color:#e94560">Voir les produits →</a></div>';
    if (summary) summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:2rem">${item.emoji}</span>
        <div>
          <strong>${item.name}</strong>
          <p style="color:#e94560;font-weight:bold">${item.price.toLocaleString()} FCFA</p>
        </div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${item.id})">🗑</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (summary) {
    summary.innerHTML = `
      <div class="cart-summary">
        <p>Nombre d'articles : <strong>${cart.reduce((s,i)=>s+i.qty,0)}</strong></p>
        <h3>Total : ${total.toLocaleString()} FCFA</h3>
        <button class="btn-checkout" onclick="checkout()">✅ Passer la commande</button>
      </div>
    `;
  }
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    const updated = cart.filter(i => i.id !== id);
    saveCart(updated);
  } else {
    saveCart(cart);
  }
  renderCart();
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function checkout() {
  if (confirm('Confirmer votre commande ?')) {
    saveCart([]);
    renderCart();
    showToast('🎉 Commande confirmée ! Merci pour votre achat.');
  }
}

document.addEventListener('DOMContentLoaded', renderCart);
