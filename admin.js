
// admin.js - handles admin login and form submissions
const ADMIN_PASS = 'sm3pasd4';
function adminLogin(){
  const v = document.getElementById('adminPass').value;
  if(v === ADMIN_PASS){
    document.body.classList.add('admin-mode');
    showPopup('Login admin berhasil');
    document.getElementById('adminPass').value = '';
    // redirect to admin page
    window.location.href = 'admin.html';
  } else {
    showPopup('Password salah', 2500);
  }
}

// handle book form on admin.html
function handleBookForm(e){
  e.preventDefault();
  if(!document.body.classList.contains('admin-mode')){ showPopup('Silakan login sebagai admin'); return; }
  const judul = document.getElementById('judul').value.trim();
  const penulis = document.getElementById('penulis').value.trim();
  const deskripsi = document.getElementById('deskripsi').value.trim();
  const file = document.getElementById('bookImage').files[0];
  if(!judul || !penulis){ showPopup('Judul & Penulis wajib diisi'); return; }
  if(file){
    const r = new FileReader();
    r.onload = function(ev){ addBook({judul, penulis, deskripsi, gambar: ev.target.result}); renderCatalog(getBooks()); renderAdminBooks(); };
    r.readAsDataURL(file);
  } else {
    addBook({judul, penulis, deskripsi, gambar: ''});
    renderCatalog(getBooks()); renderAdminBooks();
  }
  document.getElementById('bookForm').reset();
}

// handle news form
function handleNewsForm(e){
  e.preventDefault();
  if(!document.body.classList.contains('admin-mode')){ showPopup('Silakan login sebagai admin'); return; }
  const judul = document.getElementById('newsTitle').value.trim();
  const excerpt = document.getElementById('newsExcerpt').value.trim();
  const file = document.getElementById('newsImage').files[0];
  if(!judul){ showPopup('Judul berita wajib diisi'); return; }
  if(file){
    const r = new FileReader();
    r.onload = function(ev){ addNews({judul, excerpt, gambar: ev.target.result}); renderNewsList(getNews()); renderAdminNews(); };
    r.readAsDataURL(file);
  } else {
    addNews({judul, excerpt, gambar: ''});
    renderNewsList(getNews()); renderAdminNews();
  }
  document.getElementById('newsForm').reset();
}

document.addEventListener('DOMContentLoaded', ()=> {
  // render initial lists on pages if containers exist
  if(document.getElementById('bookList')) renderCatalog(getBooks());
  if(document.getElementById('adminBookList')) renderAdminBooks();
  if(document.getElementById('newsList')) renderNewsList(getNews());
  if(document.getElementById('adminNewsList')) renderAdminNews();

  // attach handlers if forms present
  if(document.getElementById('bookForm')) document.getElementById('bookForm').addEventListener('submit', handleBookForm);
  if(document.getElementById('newsForm')) document.getElementById('newsForm').addEventListener('submit', handleNewsForm);
});
