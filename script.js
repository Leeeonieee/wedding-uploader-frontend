const form = document.getElementById("uploadForm");
const statusEl = document.getElementById("status");
const thankyouEl = document.getElementById("thankyou");
const submitBtn = document.getElementById("submitBtn");

const BACKEND_URL = "https://wedding-uploader-backend.onrender.com/upload";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const filesInput = document.getElementById("files");
  const files = filesInput.files;

  if (!name || !files.length) {
    statusEl.textContent = "Veuillez entrer votre nom et choisir au moins un fichier.";
    return;
  }

  submitBtn.disabled = true;
  statusEl.textContent = "Envoi en cours, merci de patienter...";

  const formData = new FormData();
  formData.append("name", name);
  for (let file of files) {
    formData.append("files", file);
  }

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      showThankYou();
    } else {
      statusEl.textContent = "Une erreur est survenue. Veuillez réessayer.";
      submitBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Impossible de contacter le serveur. Réessayez plus tard.";
    submitBtn.disabled = false;
  }
});

function showThankYou() {
  form.classList.add("hidden");
  thankyouEl.classList.remove("hidden");
}