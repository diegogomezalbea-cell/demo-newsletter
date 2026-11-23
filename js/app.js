// URL du webhook n8n — activer le workflow dans n8n avant de tester
// En production : remplacer par l'URL publique de ton n8n
const WEBHOOK_URL = "http://localhost:5678/webhook/newsletter-inscription";

const form       = document.getElementById("newsletter-form");
const successCard = document.getElementById("success-card");
const submitBtn  = document.getElementById("submit-btn");
const btnText    = document.getElementById("btn-text");
const btnLoading = document.getElementById("btn-loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value.trim();
  const email  = document.getElementById("email").value.trim();

  // Validation
  if (!prenom || !email) return;

  // État chargement
  submitBtn.disabled = true;
  btnText.style.display    = "none";
  btnLoading.style.display = "inline";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom, email, date_inscription: new Date().toISOString() })
    });

    if (response.ok) {
      // Succès — afficher la carte de confirmation
      form.style.display = "none";
      successCard.style.display = "block";
    } else {
      throw new Error(`Erreur serveur: ${response.status}`);
    }
  } catch (err) {
    console.error("Erreur inscription:", err);
    // Réinitialiser le bouton
    submitBtn.disabled = false;
    btnText.style.display    = "inline";
    btnLoading.style.display = "none";
    alert("Une erreur s'est produite. Vérifiez que le workflow n8n est bien activé et réessayez.");
  }
});
