document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  // Simulation envoi
  const successMsg = document.getElementById('successMsg');
  successMsg.style.display = 'block';
  this.reset();
  setTimeout(() => successMsg.style.display = 'none', 5000);
});
