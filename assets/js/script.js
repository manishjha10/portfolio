'use strict';



/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}





/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});





// Contact form demo handler (no backend) - gives user feedback and clears inputs
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form') || document.querySelector('.contact-form');
  const msgEl = document.querySelector('.contact-msg');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // collect values
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    // basic validation
    if (!name || !email || !message) {
      showMessage('Please fill all fields.', true);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    // simulate "sending"
    showMessage('Sending message...', false);
    // fake network delay
    setTimeout(function () {
      // on success
      showMessage('Thanks! Your message has been sent sucessfully. I will contact you soon.', false);
      form.reset();
      // hide message after a few seconds
      setTimeout(function () { hideMessage(); }, 4500);
    }, 900);
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



// Footer subscribe handler (demo) ------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // find the form + elements
  const form = document.querySelector('.subscribe-form');
  const msgEl = document.querySelector('.subscribe-msg');

  if (!form) {
    // nothing to do
    return;
  }

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');

  // helper to show messages
  function showMsg(text, isError = false) {
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.textContent = text;
    msgEl.style.color = isError ? '#ffd6d6' : '#e6f7ff';
    msgEl.style.background = isError ? 'rgba(255,50,50,0.08)' : 'rgba(255,255,255,0.03)';
  }

  function clearMsg(timeout = 3500) {
    if (!msgEl) return;
    setTimeout(() => {
      msgEl.style.display = 'none';
      msgEl.textContent = '';
    }, timeout);
  }

  // central handler
  function handleSubscribe(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const email = (input && input.value || '').trim();
    const re = /^\S+@\S+\.\S+$/;

    if (!email) {
      showMsg('Please enter your email.', true);
      return clearMsg(2500);
    }
    if (!re.test(email)) {
      showMsg('Please enter a valid email address.', true);
      return clearMsg(2500);
    }

    // simulate sending
    if (button) {
      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      showMsg('Sending...', false);

      setTimeout(() => {
        // on success (demo)
        showMsg('Thanks — you  for Connect me. I will reach out soon.', false);
        input.value = '';
        button.disabled = false;
        button.textContent = originalText;
        clearMsg(4200);
      }, 1100);
    } else {
      // fallback
      showMsg('Subscribed (demo).', false);
      clearMsg(3000);
    }
  }

  // handle form submit
  form.addEventListener('submit', handleSubscribe);

  // also handle direct button click (in case some markup blocks submit)
  if (button) {
    button.addEventListener('click', handleSubscribe);
  }
});
