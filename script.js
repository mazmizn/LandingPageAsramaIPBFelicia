const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = [...document.querySelectorAll('.nav-panel a')];
const currentPage = document.body.dataset.page;
const searchInput = document.querySelector('#siteSearch');
const searchResults = document.querySelector('#searchResults');
const contactForm = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');

const searchIndex = [
  { title: 'Home', type: 'Halaman', url: 'index.html', keywords: 'home asrama felicia pengkaderan mahasiswa branding kegiatan berita faq alumni kontak' },
  { title: 'Tentang Kami', type: 'Halaman', url: 'tentang.html', keywords: 'profil visi misi karakter kepemimpinan kolaborasi kontribusi organisasi pengkaderan' },
  { title: 'Blog', type: 'Halaman', url: 'blog.html', keywords: 'blog tulisan opini refleksi kader mahasiswa karakter leadership asrama' },
  { title: 'Berita', type: 'Halaman', url: 'berita.html', keywords: 'berita pengumuman open recruitment public speaking felicia mengabdi' },
  { title: 'Galeri', type: 'Halaman', url: 'galeri.html', keywords: 'galeri foto dokumentasi forum mentoring akademik latihan kepemimpinan malam keakraban' },
  { title: 'Kegiatan', type: 'Halaman', url: 'kegiatan.html', keywords: 'kegiatan mentoring kader leadership camp felicia mengabdi forum alumni' },
  { title: 'Kata Alumni', type: 'Halaman', url: 'alumni.html', keywords: 'alumni testimoni rani dimas livia pengalaman pembinaan' },
  { title: 'FAQ', type: 'Halaman', url: 'faq.html', keywords: 'faq pertanyaan bergabung daftar tinggal asrama kegiatan rutin' },
  { title: 'Kontak', type: 'Halaman', url: 'kontak.html', keywords: 'kontak email whatsapp instagram alamat pendaftaran kerja sama' },
  { title: 'Open Recruitment Kader Muda Felicia', type: 'Berita', url: 'berita-open-recruitment.html', keywords: 'pendaftaran mahasiswa baru kader muda' },
  { title: 'Mentoring Kader', type: 'Kegiatan', url: 'kegiatan-mentoring.html', keywords: 'mentoring pembinaan kelompok kecil refleksi akademik' },
  { title: 'Leadership Camp', type: 'Kegiatan', url: 'kegiatan-leadership.html', keywords: 'kepemimpinan komunikasi konflik keputusan' },
  { title: 'Felicia Mengabdi', type: 'Kegiatan', url: 'kegiatan-mengabdi.html', keywords: 'pengabdian masyarakat literasi kontribusi sosial' },
  { title: 'Forum Alumni', type: 'Kegiatan', url: 'kegiatan-forum-alumni.html', keywords: 'forum alumni karier jejaring pascakampus' },
  { title: 'Pelatihan Public Speaking', type: 'Berita', url: 'berita-public-speaking.html', keywords: 'public speaking manajemen acara komunikasi forum' },
  { title: 'Edukasi Literasi Komunitas', type: 'Berita', url: 'berita-felicia-mengabdi.html', keywords: 'felicia mengabdi literasi komunitas sosial' },
  { title: 'Form Kontak Asrama Felicia', type: 'Kontak', url: 'kontak.html', keywords: 'kirim pesan email whatsapp instagram alamat' }
];

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navPanel.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.classList.toggle('active', link.dataset.nav === currentPage);
  link.addEventListener('click', () => {
    navPanel.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function renderSearch(query) {
  const q = normalize(query);
  if (!q) {
    searchResults.classList.remove('show');
    searchResults.innerHTML = '';
    return;
  }

  const matches = searchIndex
    .filter((entry) => normalize(`${entry.title} ${entry.type} ${entry.keywords}`).includes(q))
    .slice(0, 6);

  searchResults.classList.add('show');
  if (!matches.length) {
    searchResults.innerHTML = '<p class="empty-result">Tidak ada hasil.</p>';
    return;
  }

  searchResults.innerHTML = matches.map((entry) => `
    <a class="result-item" href="${entry.url}">
      <strong>${entry.title}</strong>
      <span>${entry.type}</span>
    </a>
  `).join('');
}

searchInput?.addEventListener('input', (event) => renderSearch(event.target.value));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-search')) renderSearch('');
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Terima kasih. Pesanmu sudah tercatat di simulasi website ini.';
  contactForm.reset();
});

