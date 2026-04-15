 SmartMarket

📌 Description du projet

SmartMarket est un site web de e-commerce simple développé en HTML, CSS et JavaScript.
Il permet aux utilisateurs de consulter des produits, les ajouter dans un panier, puis simuler une commande.

Ce projet a été réalisé dans le cadre d’un travail de groupe afin de mettre en pratique les bases du développement web et l'utilisation des commandes git.

⸻

🎯 Objectifs du projet
	•	Comprendre la structure d’un site web (HTML)
	•	Appliquer un design moderne (CSS)
	•	Implémenter des fonctionnalités dynamiques (JavaScript)
	•	Travailler en équipe avec GitHub (branches, commits, merge)

⸻

🧰 Technologies utilisées
	•	HTML : structure des pages
	•	CSS : design et mise en forme
	•	JavaScript : logique du site (panier, interactions)
	•	LocalStorage : stockage temporaire des données du panier

⸻

⚙️ Fonctionnalités

🏠 1. Affichage des produits
	•	Les produits sont affichés sur la page d’accueil
	•	Chaque produit contient :
	•	un nom
	•	un prix
	•	un bouton “Ajouter au panier”

⸻

🛒 2. Gestion du panier
	•	L’utilisateur peut ajouter des produits au panier
	•	Les produits sont stockés dans le navigateur grâce à localStorage
	•	Le panier est conservé même après actualisation de la page

⸻

❌ 3. Suppression des produits
	•	Chaque produit du panier peut être supprimé individuellement
	•	Le total est mis à jour automatiquement

⸻

💰 4. Calcul du total
	•	Le prix total des produits est calculé automatiquement
	•	Il est affiché en bas de la page panier

⸻

📦 5. Validation de la commande
	•	L’utilisateur peut valider sa commande
	•	Le panier est vidé après validation
	•	Un message de confirmation s’affiche

⸻

🔄 Fonctionnement technique

📌 Ajout au panier

Lorsqu’un utilisateur clique sur “Ajouter” :
	•	Le produit est ajouté à un tableau JavaScript
	•	Ce tableau est sauvegardé dans le localStorage

⸻

📌 Affichage du panier
	•	Les données du localStorage sont récupérées
	•	Les produits sont affichés dynamiquement sur la page
	•	Le total est calculé en parcourant le tableau

⸻

📌 Suppression
	•	Un produit est supprimé du tableau grâce à son index
	•	Le localStorage est mis à jour
	•	L’affichage est rafraîchi

⸻

📌 Commande
	•	Le panier est supprimé du localStorage
	•	L’utilisateur est redirigé vers la page d’accueil

⸻

👥 Organisation du travail (Groupe)
	•	Frontend (HTML) : création des pages
	•	Design (CSS) : mise en forme et styles
	•	JavaScript : logique du panier
	•	Finition : tests et amélioration UX
