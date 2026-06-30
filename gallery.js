
async function load(){
 const res = await fetch("http://localhost:4000/files");
 const data = await res.json();

 const q = document.getElementById("search").value.toLowerCase();
 const grid = document.getElementById("grid");
 grid.innerHTML="";

 data.filter(f=>f.guest.toLowerCase().includes(q))
 .forEach(f=>{
   const url = `https://drive.google.com/drive/folders/10xYKuixE9GESqJ--zuPg4a9I3SsA9Orx?usp=drive_link`;

   const el = document.createElement("div");

   if (f.mimeType.startsWith("image")){
     el.innerHTML = `<img src="${url}"><p>${f.guest}</p>`;
   } else {
     el.innerHTML = `<video src="${url}" controls></video><p>${f.guest}</p>`;
   }

   grid.appendChild(el);
 });
}

load();
