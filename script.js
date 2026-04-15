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