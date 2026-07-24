let allData = [];
let filteredData = [];
let loadedCount = 0;

const BATCH_SIZE = 20;

async function loadData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbyWJ64I4zcWPd9lb-JKvlISawvQGye6z_N-uyqrmG9QbmpZL_om05tVwphw8Di34iX0gA/exec");
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

    const grid=document.getElementById("grid");

    const nextItems=filteredData.slice(loadedCount,loadedCount+BATCH_SIZE);

    nextItems.forEach(f=>{

        const card=document.createElement("div");
        card.className="card";

        if(f.mimeType.startsWith("image/")){

            card.innerHTML=`
                <img src="${f.thumbnail}" loading="lazy">
                <p>${f.guest}</p>
            `;

        }else{

            card.innerHTML=`
                <div class="video-thumb">
                    <img src="${f.thumbnail}" loading="lazy">
                    <div class="play">▶</div>
                </div>
                <p>${f.guest}</p>
            `;

        }

        card.onclick=()=>openViewer(f);

        grid.appendChild(card);

    });

    loadedCount+=BATCH_SIZE;
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
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const closeBtn = document.getElementById("close");

function openViewer(file) {

    lightbox.style.display = "flex";

    if (file.mimeType.startsWith("image/")) {

        lightboxImage.style.display = "block";
        lightboxVideo.style.display = "none";

        lightboxImage.src = file.thumbnail;

    } else {

        lightboxImage.style.display = "none";
        lightboxVideo.style.display = "block";

        lightboxVideo.src = file.preview;

    }
}

closeBtn.onclick = function () {
    lightbox.style.display = "none";
    lightboxVideo.src = "";
};

lightbox.onclick = function (e) {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxVideo.src = "";
    }
};
