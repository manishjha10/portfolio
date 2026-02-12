// Cleaned script.js — single API-backed contact handler
'use strict';
const API_BASE = 'http://localhost:4000/api';

/* Navbar toggle */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
if (navToggleBtn) {
  navToggleBtn.addEventListener("click", function () {
    header.classList.toggle("nav-active");
    this.classList.toggle("active");
  });
}

/* Navbar links */
const navbarLinks = document.querySelectorAll("[data-nav-link]");
for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    if (navToggleBtn) navToggleBtn.classList.toggle("active");
  });
}

/* Back to top */
const backTopBtn = document.querySelector("[data-back-to-top]");
window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

/* Footer subscribe (demo) */
document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.querySelector('.subscribe-form');
  const subscribeMsgEl = document.querySelector('.subscribe-msg');
  if (!subscribeForm) return;

  const input = subscribeForm.querySelector('input[type="email"]');
  // Clean single-file script for site interactions
  'use strict';
  const API_BASE = 'http://localhost:4000/api';

  /* Navbar toggle */
  const header = document.querySelector("[data-header]");
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  if (navToggleBtn) {
    navToggleBtn.addEventListener("click", function () {
      header.classList.toggle("nav-active");
      this.classList.toggle("active");
    });
  }

  /* Navbar links */
  const navbarLinks = document.querySelectorAll("[data-nav-link]");
  for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", function () {
      header.classList.toggle("nav-active");
      if (navToggleBtn) navToggleBtn.classList.toggle("active");
    });
  }

  /* Back to top */
  const backTopBtn = document.querySelector("[data-back-to-top]");
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      header.classList.add("active");
      if (backTopBtn) backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      if (backTopBtn) backTopBtn.classList.remove("active");
    }
  });

  /* Footer subscribe (demo) */
  document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.querySelector('.subscribe-form');
    const subscribeMsgEl = document.querySelector('.subscribe-msg');
    if (!subscribeForm) return;

    const input = subscribeForm.querySelector('input[type="email"]');
    const button = subscribeForm.querySelector('button[type="submit"]');

    function showSubscribeMsg(text, isError = false) {
      if (!subscribeMsgEl) return;
      subscribeMsgEl.style.display = 'block';
      subscribeMsgEl.textContent = text;
      subscribeMsgEl.style.color = isError ? '#ffd6d6' : '#e6f7ff';
      subscribeMsgEl.style.background = isError ? 'rgba(255,50,50,0.08)' : 'rgba(255,255,255,0.03)';
    }

    function clearSubscribeMsg(timeout = 3500) {
      if (!subscribeMsgEl) return;
      setTimeout(() => {
        subscribeMsgEl.style.display = 'none';
        subscribeMsgEl.textContent = '';
      }, timeout);
    }

    function handleSubscribe(event) {
      if (event && typeof event.preventDefault === 'function') event.preventDefault();
      const email = (input && input.value || '').trim();
      const re = /^\S+@\S+\.\S+$/;
      if (!email) {
        showSubscribeMsg('Please enter your email.', true);
        return clearSubscribeMsg(2500);
      }
      if (!re.test(email)) {
        showSubscribeMsg('Please enter a valid email address.', true);
        return clearSubscribeMsg(2500);
      }

      if (button) {
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        showSubscribeMsg('Sending...', false);
        setTimeout(() => {
          showSubscribeMsg('Thanks — I will reach out soon.', false);
          input.value = '';
          button.disabled = false;
          button.textContent = originalText;
          clearSubscribeMsg(4200);
        }, 1100);
      } else {
        showSubscribeMsg('Subscribed (demo).', false);
        clearSubscribeMsg(3000);
      }
    }

    subscribeForm.addEventListener('submit', handleSubscribe);
    if (button) button.addEventListener('click', handleSubscribe);
  });

  /* Contact form handler (single, API-backed) */
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form') || document.querySelector('.contact-form');
    const msgEl = document.querySelector('.contact-msg');
    if (!form) return;

    function showMessage(text, isError = false) {
      if (!msgEl) return;
      msgEl.style.display = 'block';
      msgEl.textContent = text;
      msgEl.style.background = isError ? 'rgba(255,50,50,0.12)' : 'rgba(255,255,255,0.06)';
      msgEl.style.color = isError ? '#ffdddd' : '#fff';
    }

    function hideMessage() {
      if (!msgEl) return;
      msgEl.style.display = 'none';
      msgEl.textContent = '';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = (form.querySelector('input[name="name"]')?.value || '').trim();
      const email = (form.querySelector('input[name="email"]')?.value || '').trim();
      const message = (form.querySelector('textarea[name="message"]')?.value || '').trim();

      if (!name || !email || !message) {
        showMessage('Please fill all fields.', true);
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showMessage('Please enter a valid email address.', true);
        return;
      }

      showMessage('Sending message...', false);

      try {
        const res = await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        let data;
        try { data = await res.json(); } catch (err) { data = {}; }

        if (!res.ok) throw new Error(data.error || data.message || 'Network error');

        showMessage('Thanks! Your message has been sent successfully. I will contact you soon.', false);
        form.reset();
        setTimeout(hideMessage, 4500);
      } catch (err) {
        console.error('Contact submit error:', err);
        showMessage('An error occurred sending message. Try again later.', true);
      }
    });
  });

  /* Load profile & projects (uses API_BASE) */
  async function loadProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) return;
      const p = await res.json();
      if (!p) return;
      const heroEl = document.querySelector('.hero-title strong');
      if (heroEl && p.name) heroEl.textContent = p.name;
      const heroText = document.querySelector('.hero-text marquee');
      if (heroText && p.bio) heroText.textContent = p.bio;
      const footerName = document.querySelector('.footer-brand .logo');
      if (footerName && p.name) footerName.textContent = p.name;
      const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
      if (emailLink && p.email) emailLink.textContent = p.email;
      const phoneLink = document.querySelector('.contact-item a[href^="tel:"]');
      if (phoneLink && p.phone) phoneLink.textContent = p.phone;
    } catch (err) {
      console.error('loadProfile err', err);
    }
  }
  loadProfile();

  async function loadProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) return;
      const projects = await res.json();
      if (!projects || !projects.length) return;
      const ul = document.querySelector('.portfolio-list');
      if (!ul) return;
      ul.innerHTML = '';
      projects.forEach(pr => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a class="portfolio-card" style="background-image:url('${pr.imageUrl || '/assets/images/portfolio-1.png'}')">
            <div class="card-content">
              <p class="card-subtitle">${pr.subtitle || ''}</p>
              <h3 class="h3 card-title">${pr.title || ''}</h3>
              <span class="btn-link">
                <span style="cursor:pointer;" onclick="window.open('${pr.demoUrl || '#'}', '_blank')">View Project</span>
                <ion-icon name="arrow-forward"></ion-icon>
              </span>
            </div>
          </a>
        `;
        ul.appendChild(li);
      });
    } catch (err) {
      console.error('loadProjects err', err);
    }
  }
  loadProjects();
      if (backTopBtn) backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      if (backTopBtn) backTopBtn.classList.remove("active");
    }
  });

  // Footer subscribe handler (demo)
  document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.querySelector('.subscribe-form');
    const subscribeMsgEl = document.querySelector('.subscribe-msg');
    if (!subscribeForm) return;

    const input = subscribeForm.querySelector('input[type="email"]');
    const button = subscribeForm.querySelector('button[type="submit"]');

    function showSubscribeMsg(text, isError = false) {
      if (!subscribeMsgEl) return;
      subscribeMsgEl.style.display = 'block';
      subscribeMsgEl.textContent = text;
      subscribeMsgEl.style.color = isError ? '#ffd6d6' : '#e6f7ff';
      subscribeMsgEl.style.background = isError ? 'rgba(255,50,50,0.08)' : 'rgba(255,255,255,0.03)';
    }

    function clearSubscribeMsg(timeout = 3500) {
      if (!subscribeMsgEl) return;
      setTimeout(() => {
        subscribeMsgEl.style.display = 'none';
        subscribeMsgEl.textContent = '';
      }, timeout);
    }

    function handleSubscribe(event) {
      if (event && typeof event.preventDefault === 'function') event.preventDefault();
      const email = (input && input.value || '').trim();
      const re = /^\S+@\S+\.\S+$/;
      if (!email) {
        showSubscribeMsg('Please enter your email.', true);
        return clearSubscribeMsg(2500);
      }
      if (!re.test(email)) {
        showSubscribeMsg('Please enter a valid email address.', true);
        return clearSubscribeMsg(2500);
      }

      if (button) {
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        showSubscribeMsg('Sending...', false);
        setTimeout(() => {
          showSubscribeMsg('Thanks — I will reach out soon.', false);
          input.value = '';
          button.disabled = false;
          button.textContent = originalText;
          clearSubscribeMsg(4200);
        }, 1100);
      } else {
        showSubscribeMsg('Subscribed (demo).', false);
        clearSubscribeMsg(3000);
      }
    }

    subscribeForm.addEventListener('submit', handleSubscribe);
    if (button) button.addEventListener('click', handleSubscribe);
  });

  // Contact form handler (API-backed)
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form') || document.querySelector('.contact-form');
    const msgEl = document.querySelector('.contact-msg');
    if (!form) return;

    function showMessage(text, isError = false) {
      if (!msgEl) return;
      msgEl.style.display = 'block';
      msgEl.textContent = text;
      msgEl.style.background = isError ? 'rgba(255,50,50,0.12)' : 'rgba(255,255,255,0.06)';
      msgEl.style.color = isError ? '#ffdddd' : '#fff';
    }

    function hideMessage() {
      if (!msgEl) return;
      msgEl.style.display = 'none';
      msgEl.textContent = '';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = (form.querySelector('input[name="name"]')?.value || '').trim();
      const email = (form.querySelector('input[name="email"]')?.value || '').trim();
      const message = (form.querySelector('textarea[name="message"]')?.value || '').trim();

      if (!name || !email || !message) {
        showMessage('Please fill all fields.', true);
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showMessage('Please enter a valid email address.', true);
        return;
      }

      showMessage('Sending message...', false);

      try {
        const res = await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        let data;
        try { data = await res.json(); } catch (err) { data = {}; }

        if (!res.ok) throw new Error(data.error || data.message || 'Network error');

        showMessage('Thanks! Your message has been sent successfully. I will contact you soon.', false);
        form.reset();
        setTimeout(hideMessage, 4500);
      } catch (err) {
        console.error('Contact submit error:', err);
        showMessage('An error occurred sending message. Try again later.', true);
      }
    });
  });

  // Load profile & projects
  async function loadProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) return;
      const p = await res.json();
      if (!p) return;
      const heroEl = document.querySelector('.hero-title strong');
      if (heroEl && p.name) heroEl.textContent = p.name;
      const heroText = document.querySelector('.hero-text marquee');
      if (heroText && p.bio) heroText.textContent = p.bio;
      const footerName = document.querySelector('.footer-brand .logo');
      if (footerName && p.name) footerName.textContent = p.name;
      const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
      if (emailLink && p.email) emailLink.textContent = p.email;
      const phoneLink = document.querySelector('.contact-item a[href^="tel:"]');
      if (phoneLink && p.phone) phoneLink.textContent = p.phone;
    } catch (err) {
      console.error('loadProfile err', err);
    }
  }
  loadProfile();

  async function loadProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) return;
      const projects = await res.json();
      if (!projects || !projects.length) return;
      const ul = document.querySelector('.portfolio-list');
      if (!ul) return;
      ul.innerHTML = '';
      projects.forEach(pr => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a class="portfolio-card" style="background-image:url('${pr.imageUrl || '/assets/images/portfolio-1.png'}')">
            <div class="card-content">
              <p class="card-subtitle">${pr.subtitle || ''}</p>
              <h3 class="h3 card-title">${pr.title || ''}</h3>
              <span class="btn-link">
                <span style="cursor:pointer;" onclick="window.open('${pr.demoUrl || '#'}', '_blank')">View Project</span>
                <ion-icon name="arrow-forward"></ion-icon>
              </span>
            </div>
          </a>
        `;
        ul.appendChild(li);
      });
    } catch (err) {
      console.error('loadProjects err', err);
    }
  }
  loadProjects();
    } catch (err) {
      console.error(err);
      showMessage('An error occurred sending message. Try again later.', true);
    }
  });

  function showMessage(text, isError) {
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.textContent = text;
    msgEl.style.background = isError ? 'rgba(255,50,50,0.12)' : 'rgba(255,255,255,0.06)';
    msgEl.style.color = isError ? '#ffdddd' : '#fff';
  }

  function hideMessage() {
    if (!msgEl) return;
    msgEl.style.display = 'none';
    msgEl.textContent = '';
  }
});



async function loadProfile() {
  try {
    const res = await fetch('http://localhost:4000/api/profile');
    if (!res.ok) return;
    const p = await res.json();
    if (!p) return;
    // example: replace hero name and bio
    const heroEl = document.querySelector('.hero-title strong');
    if (heroEl && p.name) heroEl.textContent = p.name;
    const heroText = document.querySelector('.hero-text marquee');
    if (heroText && p.bio) heroText.textContent = p.bio;
    // footer name
    const footerName = document.querySelector('.footer-brand .logo');
    if (footerName && p.name) footerName.textContent = p.name;
    // update contact email/phone
    const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
    if (emailLink && p.email) emailLink.textContent = p.email;
    const phoneLink = document.querySelector('.contact-item a[href^="tel:"]');
    if (phoneLink && p.phone) phoneLink.textContent = p.phone;
  } catch (err) {
    console.error('loadProfile err', err);
  }
}
loadProfile();

async function loadProjects() {
  try {
    const res = await fetch('http://localhost:4000/api/projects');
    if (!res.ok) return;
    const projects = await res.json();
    if (!projects || !projects.length) return;
    const ul = document.querySelector('.portfolio-list');
    if (!ul) return;
    ul.innerHTML = ''; // clear static items if you seeded via HTML
    projects.forEach(pr => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a class="portfolio-card" style="background-image:url('${pr.imageUrl || '/assets/images/portfolio-1.png'}')">
          <div class="card-content">
            <p class="card-subtitle">${pr.subtitle || ''}</p>
            <h3 class="h3 card-title">${pr.title || ''}</h3>
            <span class="btn-link">
              <span style="cursor:pointer;" onclick="window.open('${pr.demoUrl || '#'}', '_blank')">View Project</span>
              <ion-icon name="arrow-forward"></ion-icon>
            </span>
          </div>
        </a>
      `;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error('loadProjects err', err);
  }
}
loadProjects();





document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form') || document.querySelector('.contact-form');
  const msgEl = document.querySelector('.contact-msg');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill all fields.', true);
      return;
    }

    showMessage('Sending message...', false);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Network error');

      showMessage('Thanks! Your message has been sent successfully.', false);
      form.reset();
      setTimeout(hideMessage, 4500);
    } catch (err) {
      console.error('Contact submit error:', err);
      showMessage('An error occurred sending message. Try again later.', true);
    }
  });

  function showMessage(text, isError) {
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.textContent = text;
    msgEl.style.background = isError ? 'rgba(255,50,50,0.12)' : 'rgba(255,255,255,0.06)';
    msgEl.style.color = isError ? '#ffdddd' : '#fff';
  }

  function hideMessage() {
    if (!msgEl) return;
    msgEl.style.display = 'none';
    msgEl.textContent = '';
  }
});




