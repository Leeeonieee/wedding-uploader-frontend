let allData = [];
let filteredData = [];
let loadedCount = 0;

const BATCH_SIZE = 20;

async function loadData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbw9TEFO4HPb3KkvU1GsIgXWYqv1JsyZbwVbvRzgZ5f0d7cnVolsEcbsGLpRoYnhMtMigA/exec");
  allData = await res.json();

  applyFilter();
}

function applyFilter() {
  const q = document.getElementById("search").value.toLowerCase();

 filteredData = allData.filter(f => {
  const fileName = (f.name || "").toLowerCase();
  const guestName = (f.guest || "").toLowerCase();

  return fileName.includes(q) || guestName.includes(q);
});

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  loadedCount = 0;
  loadMore(); // load first batch
}

function loadMore() {
  const grid = document.getElementById("grid");

  const nextItems = filteredData.slice(loadedCount, loadedCount + BATCH_SIZE);

  nextItems.forEach(f => {
    const el = document.createElement("div");

    const isImage = f.mimeType && f.mimeType.startsWith("image/");

    if (isImage) {
      el.innerHTML = `
        <img src="${f.url}" loading="lazy"
          style="width:100%; border-radius:8px;">
        <p>${f.name}</p>
      `;
    } else {
      el.innerHTML = `
        <video src="${f.url}" controls
          style="width:100%; border-radius:8px;"></video>
        <p>${f.name}</p>
      `;
    }

    grid.appendChild(el);
  });

  loadedCount += BATCH_SIZE;
}

function handleScroll() {
  const scrollPos = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 300;

  if (scrollPos >= threshold) {
    if (loadedCount < filteredData.length) {
      loadMore();
    }
  }
}

document.getElementById("search").addEventListener("input", applyFilter);
window.addEventListener("scroll", handleScroll);

loadData();
