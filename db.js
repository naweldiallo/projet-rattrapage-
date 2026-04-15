<<<<<<< HEAD
const AppDB = (function() {
    const DB_NAME = 'smartmarket-db';
    const DB_VERSION = 1;
    const STORE_USERS = 'users';
    const STORE_CART = 'cart';
    const STORE_ORDERS = 'orders';

    function openDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_USERS)) {
                    const userStore = db.createObjectStore(STORE_USERS, { keyPath: 'id', autoIncrement: true });
                    userStore.createIndex('email', 'email', { unique: true });
                }
                if (!db.objectStoreNames.contains(STORE_CART)) {
                    db.createObjectStore(STORE_CART, { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains(STORE_ORDERS)) {
                    db.createObjectStore(STORE_ORDERS, { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function transaction(storeName, mode = 'readwrite') {
        return openDb().then(db => db.transaction(storeName, mode).objectStore(storeName));
    }

    async function addItem(storeName, value) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.add(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getAllItems(storeName) {
        const store = await transaction(storeName, 'readonly');
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async function getItemById(storeName, id) {
        const store = await transaction(storeName, 'readonly');
        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getItemByIndex(storeName, indexName, value) {
        const store = await transaction(storeName, 'readonly');
        const index = store.index(indexName);
        return new Promise((resolve, reject) => {
            const request = index.get(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function updateItem(storeName, id, value) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.put({ ...value, id });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function deleteItem(storeName, id) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async function clearStore(storeName) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    return {
        // Utilisateurs
        addUser: user => addItem(STORE_USERS, user),
        getUserById: id => getItemById(STORE_USERS, id),
        getUserByEmail: email => getItemByIndex(STORE_USERS, 'email', email),
        updateUser: (id, user) => updateItem(STORE_USERS, id, user),
        getAllUsers: () => getAllItems(STORE_USERS),

        // Panier
        addCartItem: item => addItem(STORE_CART, item),
        getCartItems: () => getAllItems(STORE_CART),
        removeCartItem: id => deleteItem(STORE_CART, id),
        clearCart: () => clearStore(STORE_CART),

        // Commandes
        addOrder: order => addItem(STORE_ORDERS, order),
        getOrders: () => getAllItems(STORE_ORDERS),
    };
})();
=======
const AppDB = (function() {
    const DB_NAME = 'smartmarket-db';
    const DB_VERSION = 1;
    const STORE_CART = 'cart';
    const STORE_ORDERS = 'orders';

    function openDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_CART)) {
                    db.createObjectStore(STORE_CART, { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains(STORE_ORDERS)) {
                    db.createObjectStore(STORE_ORDERS, { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function transaction(storeName, mode = 'readwrite') {
        return openDb().then(db => db.transaction(storeName, mode).objectStore(storeName));
    }

    async function addItem(storeName, value) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.add(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getAllItems(storeName) {
        const store = await transaction(storeName, 'readonly');
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async function deleteItem(storeName, id) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async function clearStore(storeName) {
        const store = await transaction(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    return {
        addCartItem: item => addItem(STORE_CART, item),
        getCartItems: () => getAllItems(STORE_CART),
        removeCartItem: id => deleteItem(STORE_CART, id),
        clearCart: () => clearStore(STORE_CART),
        addOrder: order => addItem(STORE_ORDERS, order),
        getOrders: () => getAllItems(STORE_ORDERS),
    };
})();
>>>>>>> a9f53c133c12448008e6c294e69fbaca9d695454
