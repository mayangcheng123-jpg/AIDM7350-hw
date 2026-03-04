// Enhanced Interactions for Chinese Culture Map

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// ===== Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ===== Explore Button =====
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    document.querySelector('#regions').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add reveal class to elements
document.querySelectorAll('.culture-card, .stat-box, .about-box').forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
  }
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Validate
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }
    
    // Show success message
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    
    // Reset form
    this.reset();
    
    // Log for debugging
    console.log('Form submitted:', { name, email, message });
  });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.5s ease reverse';
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

// ===== Close Button for Region Info Panel =====
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const regionPanel = document.querySelector('.region-info-panel');
    if (regionPanel) {
      regionPanel.style.display = 'none';
    }
  });
}

// ===== Update Active Nav Link on Scroll =====
window.addEventListener('scroll', () => {
  let current = '';
  
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Add Hover Effects to Links =====
document.querySelectorAll('.card-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.color = 'var(--primary-red)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.color = '';
  });
});

// ===== Initialize Tooltips =====
function initializeTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      tooltip.style.cssText = `
        position: absolute;
        background: var(--primary-red);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        white-space: nowrap;
        animation: fadeIn 0.3s ease;
      `;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + 'px';
      tooltip.style.top = (rect.top - tooltip.clientHeight - 10) + 'px';
      
      this._tooltip = tooltip;
    });
    
    el.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => this._tooltip.remove(), 300);
      }
    });
  });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  // Escape to close mobile menu
  if (e.key === 'Escape') {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) {
      navMenu.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  }
  
  // Arrow keys for navigation (optional)
  if (e.key === 'ArrowDown') {
    window.scrollBy({ top: 100, behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp') {
    window.scrollBy({ top: -100, behavior: 'smooth' });
  }
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
  document.body.style.animation = 'fadeIn 0.6s ease';
});

// ===== Lazy Load Images (if any) =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Initialize on DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('✓ Enhanced interactions loaded');
  initializeTooltips();
  revealOnScroll();
});

// ===== Console Message =====
console.log('%c🏛️ Chinese Culture Map Interactive Features Enabled 🏛️', 'color: #c60c30; font-size: 14px; font-weight: bold;');
console.log('%cEnjoy exploring China\'s rich cultural heritage!', 'color: #1a5490; font-size: 12px;');
