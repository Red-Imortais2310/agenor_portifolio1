// ========================================
// Header Shrink Effect on Scroll
// ========================================
const header = document.querySelector('.header');
let lastScrollTop = 0;
let isScrollingDown = false;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
  
  lastScrollTop = scrollTop;
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ========================================
// Shader Canvas Animation
// ========================================
const canvas = document.getElementById('shader-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let time = 0;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
});

// Perlin-like noise function
function noise(x, y, t) {
  return Math.sin(x * 0.5 + t * 0.002) * Math.cos(y * 0.5 + t * 0.002) * 
         Math.sin(x * 0.3 + y * 0.3 + t * 0.001);
}

function animateShader() {
  time++;
  
  // Clear with dark background
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Create gradient effect
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
  gradient.addColorStop(0.5 + mouseX * 0.2, 'rgba(59, 130, 246, 0.1)');
  gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw animated waves
  const waveAmount = 3;
  for (let waveIndex = 0; waveIndex < waveAmount; waveIndex++) {
    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - waveIndex * 0.03})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    for (let x = 0; x < canvas.width; x += 5) {
      const n = noise(
        x * 0.002,
        waveIndex * 0.5,
        time + mouseX * 50
      );
      
      const waveHeight = 100 + n * 150 + mouseY * 100;
      const y = canvas.height / 2 + Math.sin(x * 0.01 + time * 0.005 + waveIndex) * waveHeight;
      
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.stroke();
  }
  
  // Draw animated particles/dots
  const particleCount = 50;
  ctx.fillStyle = `rgba(59, 130, 246, 0.3)`;
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + time * 0.002;
    const distance = 100 + Math.sin(time * 0.005 + i) * 50;
    
    const x = canvas.width / 2 + Math.cos(angle) * distance + (mouseX - 0.5) * 100;
    const y = canvas.height / 2 + Math.sin(angle) * distance + (mouseY - 0.5) * 100;
    const size = 1 + Math.sin(time * 0.01 + i) * 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  requestAnimationFrame(animateShader);
}

animateShader();

// ========================================
// Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  // Create WhatsApp message with form data
  const whatsappMessage = `Olá Agenor! Meu nome é ${name}, email: ${email}. \n\nMensagem: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappLink = `https://wa.me/5513982018522?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappLink, '_blank');
  
  // Reset form after submission
  contactForm.reset();
});

// ========================================
// Scroll Animation
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ========================================
// Image Fallback
// ========================================
document.querySelectorAll('.tech-logo, .skill-icon').forEach(img => {
  img.addEventListener('error', function() {
    console.warn(`[v0] Imagem não carregada: ${this.src}`);
    // Mostrar ícone do Font Awesome como fallback se a imagem não carregar
    this.style.display = 'none';
  });
});
