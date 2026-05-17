import './styles.css';

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Alex R.",
    role: "Guitarrista",
    text: "La calidad del acero es brutal. El collar de púa es mi favorito, no me lo quito ni para dormir.",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    name: "Sarah M.",
    role: "Fan del Black Metal",
    text: "Regalé un cráneo forjado y fue el mejor regalo de la historia. ¡Gracias Metal Vibes por entender nuestra cultura!",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    name: "Viktor K.",
    role: "Coleccionista",
    text: "Artesanía pura. Se nota el amor por el metal en cada detalle. Piezas pesadas y con alma.",
    avatar: "https://picsum.photos/seed/viktor/100/100"
  }
];

let currentTestimonial = 0;

// --- DOM Elements ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const testimonialContent = document.getElementById('testimonial-content');
const contactForm = document.getElementById('contact-form');
const formContainer = document.getElementById('form-container');
const successMessage = document.getElementById('success-message');

// --- Mobile Menu Toggle ---
mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

// --- Testimonial Carousel ---
function updateTestimonial() {
  if (!testimonialContent) return;
  
  const t = testimonials[currentTestimonial];
  testimonialContent.innerHTML = `
    <div class="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="mb-6 relative">
        <img 
          src="${t.avatar}" 
          alt="${t.name}"
          class="w-16 h-16 rounded-full border-2 border-metal-accent mx-auto grayscale brightness-75"
        >
        <div class="absolute inset-0 bg-metal-accent/20 blur-md rounded-full -z-10"></div>
      </div>
      <p class="text-xl md:text-2xl italic text-metal-silver/80 mb-6 leading-relaxed">
        "${t.text}"
      </p>
      <div>
        <h4 class="font-display text-metal-accent text-lg">${t.name}</h4>
        <p class="text-xs font-mono text-metal-silver/40 uppercase tracking-widest">${t.role}</p>
      </div>
    </div>
  `;
  
  // Update indicators
  const indicators = document.querySelectorAll('.testimonial-indicator');
  indicators.forEach((ind, idx) => {
    if (idx === currentTestimonial) {
      ind.classList.add('bg-metal-accent', 'w-8');
      ind.classList.remove('bg-metal-accent/20');
    } else {
      ind.classList.remove('bg-metal-accent', 'w-8');
      ind.classList.add('bg-metal-accent/20');
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
}

setInterval(nextTestimonial, 7000);

// --- Form Submission ---
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.textContent = 'ENVIANDO AL ABISMO...';
  }

  const formData = new FormData(contactForm as HTMLFormElement);
  
  try {
    await fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString()
    });
    
    formContainer?.classList.add('hidden');
    successMessage?.classList.remove('hidden');
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Hubo un error al enviar tu alma. Inténtalo de nuevo más tarde.');
    if (submitBtn) {
      submitBtn.removeAttribute('disabled');
      submitBtn.textContent = 'REGISTRAR ALMA';
    }
  }
});

// Initialize
updateTestimonial();
