
// buku.js - CRUD for books using localStorage
const BOOK_KEY = 'perpus_books';
function getBooks(){ return JSON.parse(localStorage.getItem(BOOK_KEY) || '[]'); }
function saveBooks(list){ localStorage.setItem(BOOK_KEY, JSON.stringify(list)); }
function renderCatalog(list){
  const container = document.getElementById('bookList');
  if(!container) return;
  container.innerHTML = '';
  if(!list || list.length===0){ container.innerHTML = '<p>Tidak ada buku.</p>'; return; }
  list.forEach((b, i) => {
    const card = document.createElement('div'); card.className='book';
    const cov = document.createElement('div'); cov.className='cover';
    const img = document.createElement('img'); img.alt = b.judul;
    img.src = b.gambar && b.gambar.length>20 ? b.gambar : 'img/placeholder.jpg';
    cov.appendChild(img);
    const meta = document.createElement('div'); meta.className='meta';
    meta.innerHTML = `<h3>${escapeHtml(b.judul)}</h3><p><strong>Penulis:</strong> ${escapeHtml(b.penulis)}</p><p style="color:#666">${escapeHtml(b.deskripsi||'')}</p>`;
    card.appendChild(cov); card.appendChild(meta);
    if(document.body.classList.contains('admin-mode')){
      const ctrl = document.createElement('div'); ctrl.style.padding='12px';
      const edit = document.createElement('button'); edit.className='btn'; edit.textContent='Edit'; edit.onclick = ()=> editBook(i);
      const del = document.createElement('button'); del.className='btn'; del.style.background='#ef4444'; del.textContent='Hapus'; del.onclick = ()=> { if(confirm('Hapus?')){ deleteBook(i); } };
      ctrl.appendChild(edit); ctrl.appendChild(del);
      card.appendChild(ctrl);
    }
    container.appendChild(card);
  });
}
function escapeHtml(str){ if(!str) return ''; return str.replace(/[&<>"']/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

function addBook(book){ const list = getBooks(); list.unshift(book); saveBooks(list); showPopup('Buku ditambahkan'); }
function deleteBook(idx){ const list = getBooks(); list.splice(idx,1); saveBooks(list); renderCatalog(list); renderAdminBooks(); showPopup('Buku dihapus'); }
function editBook(idx){
  const list = getBooks(); const b = list.splice(idx,1)[0]; saveBooks(list); renderCatalog(list); renderAdminBooks();
  // prefill admin form
  document.getElementById('judul').value = b.judul;
  document.getElementById('penulis').value = b.penulis;
  document.getElementById('deskripsi').value = b.deskripsi || '';
}
function renderAdminBooks(){
  const list = getBooks();
  const container = document.getElementById('adminBookList');
  if(!container) return;
  container.innerHTML = '';
  if(list.length===0){ container.innerHTML='<p>Tidak ada buku.</p>'; return; }
  list.forEach((b,i)=> {
    const el = document.createElement('div'); el.className='book';
    el.innerHTML = '<div class="cover"><img src="'+(b.gambar||'img/placeholder.jpg')+'"></div><div class="meta"><h3>'+escapeHtml(b.judul)+'</h3><p style="color:#666">'+escapeHtml(b.penulis)+'</p><div style="margin-top:8px"><button class="btn" onclick="editBook('+i+')">Edit</button> <button class="btn" style="background:#ef4444" onclick="deleteBook('+i+')">Hapus</button></div></div>';
    container.appendChild(el);
  });
}
