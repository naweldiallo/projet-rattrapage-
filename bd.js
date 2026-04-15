const DB = {

  //PRODUITS
  getProducts() {
    return JSON.parse(localStorage.getItem('sz_products')) || [];
  },
  saveProducts(products) {
    localStorage.setItem('sz_products', JSON.stringify(products));
  },
  addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now();
    product.createdAt = new Date().toISOString();
    products.push(product);
    this.saveProducts(products);
    return product;
  },
  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },
  updateProduct(id, changes) {
    const products = this.getProducts().map(p => p.id === id ? { ...p, ...changes } : p);
    this.saveProducts(products);
  },

  // COMMANDES 
  getOrders() {
    return JSON.parse(localStorage.getItem('sz_orders')) || [];
  },
  saveOrder(cartItems) {
    const orders = this.getOrders();
    const order = {
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce((s, i) => s + i.price * i.qty, 0),
      status: 'en attente',
      date: new Date().toISOString(),
    };
    orders.push(order);
    localStorage.setItem('sz_orders', JSON.stringify(orders));
    return order;
  },
  updateOrderStatus(id, status) {
    const orders = this.getOrders().map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem('sz_orders', JSON.stringify(orders));
  },

  // UTILISATEURS
  getUsers() {
    return JSON.parse(localStorage.getItem('sz_users')) || [];
  },
  registerUser(name, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email déjà utilisé.' };
    }
    const user = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
    users.push(user);
    localStorage.setItem('sz_users', JSON.stringify(users));
    return { success: true, user };
  },
  loginUser(email, password) {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('sz_current_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Email ou mot de passe incorrect.' };
  },
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('sz_current_user')) || null;
  },
  logoutUser() {
    sessionStorage.removeItem('sz_current_user');
  },

  // tableau de bord admin 
  getStats() {
    const orders = this.getOrders();
    const users = this.getUsers();
    const total = orders.reduce((s, o) => s + o.total, 0);
    return {
      totalOrders: orders.length,
      totalRevenue: total,
      totalUsers: users.length,
      pendingOrders: orders.filter(o => o.status === 'en attente').length,
    };
  },

  //RESET 
  clearAll() {
    ['sz_products','sz_orders','sz_users'].forEach(k => localStorage.removeItem(k));
    console.log('Base de données réinitialisée.');
  }
};

// Export pour usage dans les autres fichiers
window.DB = DB;
