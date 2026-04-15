<<<<<<< HEAD
// === PAGE À PROPOS - INTERACTIONS ===

// Animation au scroll pour les cartes de valeurs
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de valeurs
    document.querySelectorAll('.value-card, .team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent.replace(/[^0-9]/g, ''));
                animateNumber(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString('fr-FR') + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Gestion du menu mobile (si nécessaire plus tard)
function initMobileMenu() {
    // Pour l'instant, le menu est responsive avec CSS
    // On peut ajouter un menu hamburger plus tard si besoin
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    animateStats();
    initMobileMenu();

    console.log('Page À propos chargée avec succès');
});
=======



function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de valeurs
    document.querySelectorAll('.value-card, .team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}


function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent.replace(/[^0-9]/g, ''));
                animateNumber(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString('fr-FR') + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Gestion du menu mobile (si nécessaire plus tard)
function initMobileMenu() {
    // Pour l'instant, le menu est responsive avec CSS
    // On peut ajouter un menu hamburger plus tard si besoin
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    animateStats();
    initMobileMenu();

    console.log('Page À propos chargée avec succès');
});
>>>>>>> a9f53c133c12448008e6c294e69fbaca9d695454
