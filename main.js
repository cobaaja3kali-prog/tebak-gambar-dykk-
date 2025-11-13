// ====== Popup di Tengah (Soft Style) ======
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "center-popup";
  popup.innerText = message;

  document.body.appendChild(popup);

  // animasi muncul
  setTimeout(() => popup.classList.add("show"), 10);

  // hilangkan otomatis setelah 2.5 detik
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 2500);
}

}
function toggleNav(){
  const nav = document.getElementById('navSide');
  nav.style.right = nav.style.right === '0px' ? '-280px' : '0px';
}
document.addEventListener('click', (e)=>{
  const nav = document.getElementById('navSide');
  const btn = document.getElementById('menuBtn');
  if(!nav) return;
  if(!nav.contains(e.target) && !btn.contains(e.target)){
    nav.style.right = '-280px';
  }
});
