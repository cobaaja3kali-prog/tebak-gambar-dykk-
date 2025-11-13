
// berita.js - CRUD for news articles using localStorage
const NEWS_KEY = 'perpus_news';
function getNews(){ return JSON.parse(localStorage.getItem(NEWS_KEY) || '[]'); }
function saveNews(list){ localStorage.setItem(NEWS_KEY, JSON.stringify(list)); }
function renderNewsList(list){
  const container = document.getElementById('newsList');
  if(!container) return;
  container.innerHTML = '';
  if(!list || list.length===0){ container.innerHTML='<p>Tidak ada berita.</p>'; return; }
  list.forEach((n,i) => {
    const card = document.createElement('div'); card.className='card'; card.style.marginBottom='10px';
    card.innerHTML = '<div style="display:flex;gap:12px;align-items:center"><img src="'+(n.gambar||'img/placeholder.jpg')+'" style="width:160px;height:90px;object-fit:cover;border-radius:8px"><div><h3 style="margin:0;color:var(--blue-600)">'+escapeHtml(n.judul)+'</h3><p style="margin:6px 0;color:#666">'+escapeHtml(n.excerpt||'')+'</p></div></div>';
    if(document.body.classList.contains('admin-mode')){
      const ctrl = document.createElement('div'); ctrl.style.marginTop='8px';
      const edit = document.createElement('button'); edit.className='btn'; edit.textContent='Edit'; edit.onclick = ()=> editNews(i);
      const del = document.createElement('button'); del.className='btn'; del.style.background='#ef4444'; del.textContent='Hapus'; del.onclick = ()=> { if(confirm('Hapus berita?')){ deleteNews(i); } };
      ctrl.appendChild(edit); ctrl.appendChild(del);
      card.appendChild(ctrl);
    }
    container.appendChild(card);
  });
}
function addNews(item){ const list = getNews(); list.unshift(item); saveNews(list); showPopup('Berita ditambahkan'); }
function deleteNews(idx){ const list = getNews(); list.splice(idx,1); saveNews(list); renderNewsList(list); renderAdminNews(); showPopup('Berita dihapus'); }
function editNews(idx){
  const list = getNews(); const n = list.splice(idx,1)[0]; saveNews(list);
  document.getElementById('newsTitle').value = n.judul;
  document.getElementById('newsExcerpt').value = n.excerpt || '';
  renderNewsList(getNews()); renderAdminNews();
}
function renderAdminNews(){
  const container = document.getElementById('adminNewsList'); if(!container) return;
  const list = getNews();
  container.innerHTML = '';
  if(list.length===0){ container.innerHTML='<p>Tidak ada berita.</p>'; return; }
  list.forEach((n,i)=> {
    const el = document.createElement('div'); el.className='card'; el.style.marginBottom='10px';
    el.innerHTML = '<div style="display:flex;gap:12px;align-items:center"><img src="'+(n.gambar||'img/placeholder.jpg')+'" style="width:140px;height:80px;object-fit:cover;border-radius:8px"><div><h3 style="margin:0;color:var(--blue-600)">'+escapeHtml(n.judul)+'</h3><p style="margin:6px 0;color:#666">'+escapeHtml(n.excerpt||'')+'</p><div style="margin-top:8px"><button class="btn" onclick="editNews('+i+')">Edit</button> <button class="btn" style="background:#ef4444" onclick="deleteNews('+i+')">Hapus</button></div></div></div>';
    container.appendChild(el);
  });
}
