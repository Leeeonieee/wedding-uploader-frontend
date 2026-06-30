async function load() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbwFa1OfbwLLuW5NDN43x5mUSc7f91DW1h7X7aSIobF7_Hv9mVquziFZopHEOUFgbpcVGw/exec");
  const data = await res.json();

  const q = document.getElementById("search").value.toLowerCase();
  const grid = document.getElementById("grid");

  grid.innerHTML = "";

  data
    .filter(f => (f.name || "").toLowerCase().includes(q))
    .forEach(f => {
      const el = document.createElement("div");

      const isImage = f.mimeType && f.mimeType.startsWith("image/");

      if (isImage) {
        el.innerHTML = `
          <img src="${f.url}" style="width:100%; border-radius:8px;">
          <p>${f.name}</p>
        `;
      } else {
        el.innerHTML = `
          <video src="${f.url}" controls style="width:100%; border-radius:8px;"></video>
          <p>${f.name}</p>
        `;
      }

      grid.appendChild(el);
    });
}

document.getElementById("search").addEventListener("input", load);
load();
