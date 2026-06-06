document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const files = [
    ...document.getElementById("files").files,
    ...document.getElementById("camera").files
  ];

  if (files.length === 0) {
    alert("Veuillez sélectionner au moins un fichier.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);

  for (let file of files) {
    formData.append("files", file);
  }

  const progressBar = document.getElementById("progressBar");
  progressBar.style.display = "block";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://wedding-uploader-backend.onrender.com/upload");

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = (event.loaded / event.total) * 100;
      progressBar.value = percent;
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      document.getElementById("uploadForm").classList.add("hidden");
      document.getElementById("thankyou").classList.remove("hidden");
    } else {
      alert("Erreur lors de l'envoi.");
    }
  };

  xhr.send(formData);
});
