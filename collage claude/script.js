/* ========================================
   KLE BCA NIPANI – Main JavaScript
   ======================================== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initParticles();
    initHeroDots();
    initTestiDots();
    startCounters();
    startHeroAutoSlide();
    startTestiAutoSlide();
    observeAnimations();
  }, 1600);
});

// ===== NAVIGATION =====
let currentPage = 'home';

function showPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show/hide footer & chatbot
    const footerHide = ['login', 'student-dashboard', 'admin-dashboard'];
    document.getElementById('footer').style.display = footerHide.includes(page) ? 'none' : '';
    document.getElementById('chatbot').style.display = footerHide.includes(page) ? 'none' : '';
    document.getElementById('navbar').style.display = footerHide.includes(page) ? 'none' : '';
    
    // Restart counters on certain pages
    if (page === 'about' || page === 'placements') {
      setTimeout(startCounters, 300);
    }
    if (page === 'admin-dashboard') {
      setTimeout(() => startCountersIn('#page-admin-dashboard'), 300);
    }
    
    // Close mobile menu
    document.getElementById('navLinks').classList.remove('open');
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== DARK MODE =====
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('darkToggle').textContent = isDark ? '☾' : '☀';
}

// ===== HERO SLIDER =====
let currentSlide = 0;
const totalSlides = 3;
let heroAutoSlide;

function initHeroDots() {
  const container = document.getElementById('heroDots');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    container.appendChild(dot);
  }
}

function goToSlide(n) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
  resetAutoSlide();
}

function startHeroAutoSlide() {
  heroAutoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoSlide() {
  clearInterval(heroAutoSlide);
  startHeroAutoSlide();
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ===== COUNTERS =====
function startCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    animateCount(el, parseInt(el.dataset.count));
  });
}

function startCountersIn(selector) {
  document.querySelectorAll(selector + ' [data-count]').forEach(el => {
    animateCount(el, parseInt(el.dataset.count));
  });
}

function animateCount(el, target) {
  let current = 0;
  const step = target / 60;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 20);
}

// ===== TESTIMONIALS SLIDER =====
let currentTesti = 0;
const totalTesti = 4;
let testiAuto;

function initTestiDots() {
  const container = document.getElementById('testiDots');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < totalTesti; i++) {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToTesti(i);
    container.appendChild(dot);
  }
}

function goToTesti(n) {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testi-dot');
  if (!track) return;
  dots[currentTesti]?.classList.remove('active');
  currentTesti = (n + totalTesti) % totalTesti;
  track.style.transform = `translateX(-${currentTesti * 100}%)`;
  dots[currentTesti]?.classList.add('active');
}

function changeTestimonial(dir) {
  goToTesti(currentTesti + dir);
  clearInterval(testiAuto);
  testiAuto = setInterval(() => goToTesti(currentTesti + 1), 5000);
}

function startTestiAutoSlide() {
  testiAuto = setInterval(() => goToTesti(currentTesti + 1), 5000);
}

// ===== SCROLL ANIMATIONS =====
function observeAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters when visible
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach(el => animateCount(el, parseInt(el.dataset.count)));
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-a');
  const isOpen = btn.classList.contains('open');
  
  // Close all
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.parentElement.querySelector('.faq-a').style.maxHeight = '0';
  });
  
  if (!isOpen) {
    btn.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ===== LOGIN =====
let selectedRole = 'student';
const credentials = {
  student: { email: 'sarvesh2511@gmail.com', password: '12345' },
  admin: { email: 'sarvesh2511@gmail.com', password: '12345' }
};

function setRole(role) {
  selectedRole = role;
  document.getElementById('roleStudent').classList.toggle('active', role === 'student');
  document.getElementById('roleAdmin').classList.toggle('active', role === 'admin');
}

function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  const msg = document.getElementById('loginMsg');
  const btn = document.getElementById('loginBtn');
  
  btn.textContent = 'Logging in...';
  btn.disabled = true;
  
  setTimeout(() => {
    const cred = credentials[selectedRole];
    if (email === cred.email && password === cred.password) {
      msg.className = 'form-msg success';
      msg.textContent = '✓ Login successful! Redirecting...';
      setTimeout(() => {
        if (selectedRole === 'student') {
          showPage('student-dashboard');
          setTimeout(startCounters, 400);
        } else {
          showPage('admin-dashboard');
          setTimeout(() => startCountersIn('#page-admin-dashboard'), 400);
        }
      }, 1000);
    } else {
      msg.className = 'form-msg error';
      msg.textContent = '✗ Invalid email or password. Please try again.';
      btn.textContent = 'Login →';
      btn.disabled = false;
    }
  }, 1000);
}

function togglePass() {
  const input = document.getElementById('loginPass');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function logout() {
  showPage('login');
  document.getElementById('loginMsg').className = 'form-msg';
  document.getElementById('loginBtn').textContent = 'Login →';
  document.getElementById('loginBtn').disabled = false;
}

// ===== STUDENT DASHBOARD =====
function showDashSection(section) {
  document.querySelectorAll('#page-student-dashboard .dash-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#page-student-dashboard .dash-link').forEach(l => l.classList.remove('active'));
  
  const el = document.getElementById('dash-' + section);
  if (el) el.classList.add('active');
  
  event.currentTarget.classList.add('active');
  
  const titles = {
    'profile': 'My Profile',
    'courses-sd': 'My Courses',
    'attendance': 'Attendance',
    'announcements-sd': 'Announcements',
    'results': 'My Results'
  };
  document.getElementById('dashSectionTitle').textContent = titles[section] || 'Dashboard';
}

// ===== ADMIN DASHBOARD =====
function showAdminSection(section) {
  document.querySelectorAll('#page-admin-dashboard .dash-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#page-admin-dashboard .dash-link').forEach(l => l.classList.remove('active'));
  
  const el = document.getElementById('admin-' + section);
  if (el) el.classList.add('active');
  
  event.currentTarget.classList.add('active');
  
  const titles = {
    'overview': 'Dashboard Overview',
    'students': 'Manage Students',
    'courses-ad': 'Manage Courses',
    'announcements-ad': 'Post Announcements'
  };
  document.getElementById('adminSectionTitle').textContent = titles[section] || 'Admin';
}

// ===== ADMIN: STUDENTS =====
function filterStudents() {
  const query = document.getElementById('studentSearch').value.toLowerCase();
  document.querySelectorAll('#studentsBody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function addStudent() {
  const name = prompt('Enter student full name:');
  if (!name) return;
  const email = prompt('Enter student email:');
  const sem = prompt('Enter semester (e.g. 2nd):');
  const tbody = document.getElementById('studentsBody');
  const row = document.createElement('tr');
  const id = 'KLE/25/' + String(Date.now()).slice(-3);
  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${email || 'N/A'}</td>
    <td>${sem || '1st'}</td>
    <td>100%</td>
    <td>
      <button onclick="editStudent(this)">✏</button>
      <button onclick="deleteStudent(this)">🗑</button>
    </td>
  `;
  tbody.insertBefore(row, tbody.firstChild);
  alert('Student "' + name + '" added successfully!');
}

function editStudent(btn) {
  const row = btn.closest('tr');
  const cells = row.querySelectorAll('td');
  const newName = prompt('Edit student name:', cells[1].textContent);
  if (newName) {
    cells[1].textContent = newName;
    alert('Student updated!');
  }
}

function deleteStudent(btn) {
  if (confirm('Delete this student record?')) {
    btn.closest('tr').remove();
    alert('Student deleted!');
  }
}

// ===== ADMIN: COURSES =====
function addCourse() {
  const name = prompt('Course name:');
  if (!name) return;
  const info = prompt('Semester & Credits (e.g. 4th Sem | 3 Credits | Prof. X):');
  const grid = document.getElementById('coursesAdminGrid');
  const card = document.createElement('div');
  card.className = 'cag-card';
  card.innerHTML = `
    <div class="cag-info"><strong>${name}</strong><span>${info || 'N/A'}</span></div>
    <div class="cag-actions">
      <button onclick="editCourse(this)">✏</button>
      <button onclick="deleteCourse(this)">🗑</button>
    </div>
  `;
  grid.prepend(card);
  alert('Course added!');
}

function editCourse(btn) {
  const card = btn.closest('.cag-card');
  const strong = card.querySelector('strong');
  const newName = prompt('Edit course name:', strong.textContent);
  if (newName) {
    strong.textContent = newName;
    alert('Course updated!');
  }
}

function deleteCourse(btn) {
  if (confirm('Delete this course?')) {
    btn.closest('.cag-card').remove();
    alert('Course deleted!');
  }
}

// ===== ADMIN: ANNOUNCEMENTS =====
const announcementsList = [];

function postAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById('ann_title').value.trim();
  const cat = document.getElementById('ann_cat').value;
  const date = document.getElementById('ann_date').value || new Date().toLocaleDateString('en-IN');
  const msg = document.getElementById('ann_msg').value.trim();
  
  const ann = { title, cat, date, msg };
  announcementsList.unshift(ann);
  renderAnnouncements();
  
  // Reset
  document.getElementById('annForm').reset();
  alert('Announcement posted successfully!');
}

function renderAnnouncements() {
  const list = document.getElementById('adminAnnList');
  list.innerHTML = '';
  announcementsList.forEach(ann => {
    const el = document.createElement('div');
    el.className = 'ann-item' + (ann.cat === 'Urgent' ? ' urgent' : '');
    el.innerHTML = `
      <span class="ann-badge ${ann.cat === 'Urgent' ? 'urgent' : ''}">${ann.cat}</span>
      <h4>${ann.title}</h4>
      <p>${ann.msg}</p>
      <small>Posted on ${ann.date}</small>
    `;
    list.appendChild(el);
  });
}

// ===== FORMS =====
function submitApply(e) {
  e.preventDefault();
  const msg = document.getElementById('applyMsg');
  const name = document.getElementById('af_name').value;
  const pct = parseFloat(document.getElementById('af_12th').value);
  
  if (pct < 45) {
    msg.className = 'form-msg error';
    msg.textContent = '✗ Minimum 45% in 12th is required for admission.';
    return;
  }
  
  msg.className = 'form-msg success';
  msg.textContent = `✓ Application submitted successfully! Welcome, ${name}. You will receive a confirmation email shortly. Application ID: KLE-2025-${Date.now().toString().slice(-5)}`;
  document.getElementById('applyForm').reset();
}

function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('cf_name').value;
  const msg = document.getElementById('contactMsg');
  
  msg.className = 'form-msg success';
  msg.textContent = `✓ Thank you, ${name}! Your message has been received. We'll get back to you within 24-48 hours.`;
  document.getElementById('contactForm').reset();
}

// ===== GALLERY / LIGHTBOX =====
const galleryData = [
  { title: 'Computer Labs', desc: 'State-of-the-art computer labs with 60+ workstations', color: 'linear-gradient(135deg,#0d5bbd 0%,#1dbf73 100%)' },
  { title: 'Annual Tech Fest – Binary', desc: 'Our flagship annual technical festival with 1000+ participants', color: 'linear-gradient(135deg,#9b4dca 0%,#e91e63 100%)' },
  { title: 'Sports Day', desc: 'Annual sports meet with inter-college competitions', color: 'linear-gradient(135deg,#ff6b35 0%,#ffd700 100%)' },
  { title: 'College Library', desc: 'Well-stocked library with 10,000+ books and digital resources', color: 'linear-gradient(135deg,#0a1628 0%,#0d5bbd 100%)' },
  { title: 'Hackathon 2024', desc: '24-hour hackathon with teams from 15+ colleges', color: 'linear-gradient(135deg,#1dbf73 0%,#0a2818 100%)' },
  { title: 'Cultural Fest – Tarang', desc: 'Annual cultural extravaganza celebrating arts and culture', color: 'linear-gradient(135deg,#e91e63 0%,#ff6b35 100%)' },
];

let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + galleryData.length) % galleryData.length;
  updateLightbox();
}

function updateLightbox() {
  const data = galleryData[lbIndex];
  document.getElementById('lbContent').innerHTML = `
    <div style="width:100%;height:100%;background:${data.color};display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:2rem;border-radius:14px;">
      <h3 style="color:white;font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;text-shadow:0 2px 8px rgba(0,0,0,0.5);margin-bottom:0.5rem;">${data.title}</h3>
      <p style="color:rgba(255,255,255,0.8);text-align:center;font-size:0.9rem;">${data.desc}</p>
    </div>
  `;
}

// ===== SEARCH =====
const searchData = [
  { title: 'About Us', desc: 'Learn about KLE BCA Nipani history and mission', page: 'about' },
  { title: 'BCA Courses', desc: 'View our BCA curriculum and electives', page: 'courses' },
  { title: 'Admissions 2025-26', desc: 'Apply for BCA program – seats available', page: 'admissions' },
  { title: 'Faculty', desc: 'Meet our expert teaching team', page: 'faculty' },
  { title: 'Campus Life', desc: 'Gallery, events, clubs and testimonials', page: 'campus' },
  { title: 'Placements', desc: 'Placement statistics, packages, and recruiters', page: 'placements' },
  { title: 'Contact Us', desc: 'Phone, email, and location details', page: 'contact' },
  { title: 'Student Login', desc: 'Access student dashboard', page: 'login' },
  { title: 'Download Brochure', desc: 'Get the college brochure PDF', page: null, action: 'brochure' },
  { title: 'TCS Campus Drive', desc: 'Placement drive on July 5, 2025', page: 'placements' },
  { title: 'AI/ML Workshop', desc: 'Hands-on workshop on June 20, 2025', page: 'courses' },
  { title: 'Scholarship Exam', desc: 'Merit scholarship examination details', page: 'admissions' },
];

function doSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) return;
  
  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.desc.toLowerCase().includes(query)
  );
  
  const list = document.getElementById('searchList');
  list.innerHTML = results.length ? '' : '<p style="color:var(--text2)">No results found. Try different keywords.</p>';
  
  results.forEach(item => {
    const el = document.createElement('div');
    el.className = 'search-result-item';
    el.innerHTML = `<strong>${item.title}</strong><span>${item.desc}</span>`;
    el.onclick = () => {
      closeSearch();
      if (item.action === 'brochure') downloadBrochure();
      else if (item.page) showPage(item.page);
    };
    list.appendChild(el);
  });
  
  document.getElementById('searchResults').classList.remove('hidden');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement === document.getElementById('searchInput')) {
    doSearch();
  }
});

function closeSearch() {
  document.getElementById('searchResults').classList.add('hidden');
}

// ===== CHATBOT =====
let chatOpen = true;
const chatResponses = {
  'admissions': '🎓 Admissions for 2025-26 are open! Eligibility: 10+2 with Maths/CS, min 45%. Apply online on our Admissions page.',
  'courses': '📚 We offer a 3-year BCA program with specializations in Python, AI/ML, Web Dev, Java, Database Systems, and Cloud Computing.',
  'fee': '💰 The approximate fee is ₹35,000 per year. Scholarships available! Contact admissions for exact details.',
  'placement': '🏆 We have a 98% placement rate! Top recruiters include TCS, Infosys, Wipro, HCL. Average package: ₹4.5 LPA.',
  'faculty': '👨‍🏫 We have 15+ expert faculty including PhDs and industry professionals. Check our Faculty page for details.',
  'campus': '🏫 Beautiful campus in Nipani with modern labs, library, sports facilities, hostel, and vibrant campus life.',
  'contact': '📞 Call us at +91 8334 224400 or email principal@klebcanipani.edu.in. Office: Mon-Fri 9AM-5PM.',
  'scholarship': '🎯 Merit scholarships up to 100% fee waiver available! SC/ST government scholarships also applicable.',
  'hostel': '🏠 Yes, separate hostel for boys and girls is available on campus with all modern facilities.',
  'hello': '👋 Hello! I am the KLE BCA Nipani assistant. I can help you with admissions, courses, fees, placements, and more!',
  'hi': '👋 Hi there! How can I help you today? Ask me about admissions, courses, placements, or campus life!',
  'help': '🤝 I can help you with: Admissions, Courses, Fee Structure, Placements, Faculty, Campus Life, Hostel, Scholarships.',
};

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  
  addChatMsg(msg, 'user');
  input.value = '';
  
  setTimeout(() => {
    const lower = msg.toLowerCase();
    let response = '🤔 I\'m not sure about that. Please contact us at +91 8334 224400 or visit the Contact page for more info.';
    
    for (const [key, val] of Object.entries(chatResponses)) {
      if (lower.includes(key)) {
        response = val;
        break;
      }
    }
    addChatMsg(response, 'bot');
  }, 600);
}

function addChatMsg(text, type) {
  const msgs = document.getElementById('chatMsgs');
  const el = document.createElement('div');
  el.className = 'chat-msg ' + type;
  el.textContent = text;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function handleChatEnter(e) {
  if (e.key === 'Enter') sendChat();
}

function toggleChat() {
  const body = document.getElementById('chatBody');
  const icon = document.getElementById('chatToggleIcon');
  chatOpen = !chatOpen;
  body.classList.toggle('hidden', !chatOpen);
  icon.textContent = chatOpen ? '⌃' : '⌄';
}

// ===== DOWNLOAD BROCHURE =====
function downloadBrochure() {
  // Simulate PDF download
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
    'KLE BCA NIPANI - COLLEGE BROCHURE 2025-26\n\n' +
    '================================================\n' +
    'KLE Society\'s BCA College, Nipani\n' +
    'Nipani - 591237, Belagavi District, Karnataka\n' +
    'Phone: +91 8334 224400\n' +
    'Email: principal@klebcanipani.edu.in\n\n' +
    'ABOUT US\n--------\n' +
    'Established in 2001, KLE BCA Nipani is a premier institution offering\n' +
    'Bachelor of Computer Applications (BCA) program.\n\n' +
    'COURSES OFFERED\n---------------\n' +
    '• Bachelor of Computer Applications (BCA) - 3 Years\n' +
    '• Specializations: AI/ML, Web Development, Data Science, Cloud Computing\n\n' +
    'HIGHLIGHTS\n----------\n' +
    '• 98% Placement Rate\n' +
    '• Average Package: ₹4.5 LPA\n' +
    '• Top Recruiters: TCS, Infosys, Wipro, HCL\n' +
    '• NAAC A Grade\n' +
    '• 1200+ Alumni Worldwide\n\n' +
    'ADMISSIONS 2025-26\n------------------\n' +
    '• Eligibility: 10+2 with Mathematics/CS, min 45%\n' +
    '• Application Opens: June 1, 2025\n' +
    '• Apply at: admissions@klebcanipani.edu.in\n'
  );
  link.download = 'KLE_BCA_Nipani_Brochure_2025.txt';
  link.click();
  
  // Show confirmation
  setTimeout(() => alert('✓ Brochure downloaded! Check your downloads folder.'), 500);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeLightbox();
  }
});

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date in admin date field
  const annDate = document.getElementById('ann_date');
  if (annDate) {
    annDate.value = new Date().toISOString().split('T')[0];
  }
  
  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') { e.preventDefault(); return; }
    });
  });
});
