<<<<<<< HEAD
const sampleProducts = [
    { nom: 'Téléphone Android', prix: 95000 },
    { nom: 'Casque Bluetooth', prix: 23000 },
    { nom: 'Chargeur rapide', prix: 12000 }
];

async function migrerPanierLocalStorage() {
    const raw = localStorage.getItem('panier');
    if (!raw) return;

    try {
        const panier = JSON.parse(raw);
        if (!Array.isArray(panier) || panier.length === 0) {
            localStorage.removeItem('panier');
            return;
        }

        for (const item of panier) {
            await AppDB.addCartItem({ nom: item.nom, prix: item.prix });
        }
        localStorage.removeItem('panier');
    } catch (error) {
        console.error('Migration du panier échouée:', error);
    }
}

function renderProducts() {
    const productsElement = document.getElementById('products');
    if (!productsElement) return;

    productsElement.innerHTML = '';
    sampleProducts.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.nom}</h3>
            <p>${product.prix.toLocaleString('fr-FR')} FCFA</p>
            <button type="button">Ajouter au panier</button>
        `;

        card.querySelector('button').addEventListener('click', () => ajouterAuPanier(product.nom, product.prix));
        productsElement.appendChild(card);
    });
}

async function ajouterAuPanier(nom, prix) {
    if (!nom || prix < 0) {
        console.error('Paramètres invalides pour ajouter au panier');
        return;
    }

    try {
        await AppDB.addCartItem({ nom, prix });
        afficherPanier();
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
    }
}

async function supprimerDuPanier(id) {
    try {
        await AppDB.removeCartItem(Number(id));
        afficherPanier();
    } catch (error) {
        console.error('Erreur lors de la suppression du panier:', error);
    }
}

async function afficherPanier() {
    const panierElement = document.getElementById('panier');
    const totalElement = document.getElementById('total');
    if (!panierElement || !totalElement) return;

    try {
        const panier = await AppDB.getCartItems();
        let total = 0;
        panierElement.innerHTML = '';

        if (panier.length === 0) {
            panierElement.innerHTML = '<p>Votre panier est vide.</p>';
        } else {
            panier.forEach(item => {
                total += item.prix;
                const itemRow = document.createElement('div');
                itemRow.className = 'cart-item';
                itemRow.innerHTML = `
                    <span>${item.nom}</span>
                    <span>${item.prix.toLocaleString('fr-FR')} FCFA</span>
                    <button type="button" data-id="${item.id}">Supprimer</button>
                `;
                itemRow.querySelector('button').addEventListener('click', () => supprimerDuPanier(item.id));
                panierElement.appendChild(itemRow);
            });
        }

        totalElement.innerText = `Total: ${total.toLocaleString('fr-FR')} FCFA`;
    } catch (error) {
        console.error('Erreur lors de l\'affichage du panier:', error);
    }
}

async function validerCommande() {
    try {
        const panier = await AppDB.getCartItems();
        if (panier.length === 0) {
            alert('Votre panier est vide !');
            return;
        }

        await AppDB.addOrder({ date: new Date().toISOString(), items: panier });
        await AppDB.clearCart();
        alert('Commande validée et sauvegardée dans la base de données !');
        afficherPanier();
    } catch (error) {
        console.error('Erreur lors de la validation de commande:', error);
        alert('Impossible de valider la commande. Voir la console.');
    }
}

async function initApp() {
    await migrerPanierLocalStorage();
    renderProducts();
    afficherPanier();

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', validerCommande);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
=======
function ajouterAuPanier(nom,prix) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push({ nom, prix });
    localStorage.setItem("panier", JSON.stringify(panier));
}

if(document.getElementById("panier")){

let panier = JSON.parse(localStorage.getItem("panier")) || [];
let total = 0;

panier.forEach((item, index) => {
    total += item.prix;

    document.getElementById("panier").innerHTML +=
    `<p>${item.nom} - ${item.prix} FCFA
    <button onclick="supprimerDuPanier(${index})">Supprimer</button></p>`;
})
document.getElementById("total").innerText = `Total: ${total} FCFA`;
}

function supprimer(index){
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index,1);
    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload();
}

function validerCommande(e){
    e.preventDefault();
    localStorage.removeItem("panier");
    alert("Commande validée !");
    window.location.href="index.html";
}
>>>>>>> a9f53c133c12448008e6c294e69fbaca9d695454
