/* ============================================
   HEREJAIBAS | Script Principal
   ============================================ */

// ---- CAROUSEL DINÁMICO DESDE SUPABASE ----
let slides = [];
let currentIndex = 0;
let autoplayTimer = null;

const bgElement       = document.getElementById("carousel-bg");
const titleEl         = document.getElementById("carousel-title");
const titleAccentEl   = document.getElementById("carousel-title-accent");
const eyebrowEl       = document.getElementById("carousel-eyebrow");
const textEl          = document.getElementById("carousel-text");
const btn1El          = document.getElementById("carousel-btn-primary");
const btn2El          = document.getElementById("carousel-btn-secondary");

// Inicializar cliente de Supabase de forma global (Evita choques con otras páginas)
window.sb = window.sb || supabase.createClient(window._sbUrl, window._sbAnon);

async function loadCarouselFromDB() {
    const { data, error } = await window.sb.from('banners').select('*').order('id', { ascending: true });
    
    // Si hay error o no hay banners, ponemos un fallback por defecto
    if (error || !data || data.length === 0) {
        slides = [{
            image: "https://4kwallpapers.com/images/wallpapers/warhammer-40k-space-3840x2160-22638.jpg",
            eyebrow: "Club de Wargames · Veracruz",
            title_line1: "ÚNETE A LA",
            title_accent: "LEGIÓN",
            text: "Prepara a tu ejército para la guerra en el Puerto de Veracruz. Partidas, torneos y comunidad.",
            btn1_text: "Unirse ahora", btn1_link: "comunidad.html",
            btn2_text: "Ver torneos", btn2_link: "torneos.html"
        }];
    } else {
        slides = data;
    }
    
    // Generar los botones de puntos de navegación dinámicamente
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = slides.map((_, i) => 
            `<button class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" aria-label="Slide ${i+1}"></button>`
        ).join('');
    }
    
    // Mostrar la primera diapositiva
    updateSlide(0);
    resetAutoplay();
}

function updateSlide(index) {
    if (!slides[index]) return;
    const s = slides[index];
    if (!bgElement) return;

    bgElement.style.backgroundImage = `url('${s.image}')`;
    if (eyebrowEl) eyebrowEl.textContent = s.eyebrow || '';
    if (titleEl) titleEl.childNodes[0].textContent = (s.title_line1 || '') + " ";
    if (titleAccentEl) titleAccentEl.textContent = s.title_accent || '';
    if (textEl) textEl.textContent = s.text || '';
    
    if (btn1El) { 
        if (s.btn1_text) { btn1El.style.display = 'inline-flex'; btn1El.textContent = s.btn1_text; btn1El.href = s.btn1_link || '#'; } 
        else { btn1El.style.display = 'none'; }
    }
    if (btn2El) { 
        if (s.btn2_text) { btn2El.style.display = 'inline-flex'; btn2El.textContent = s.btn2_text; btn2El.href = s.btn2_link || '#'; } 
        else { btn2El.style.display = 'none'; }
    }

    document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === index));
}

window.goToSlide = function(index) {
    currentIndex = index;
    updateSlide(index);
    resetAutoplay();
};

function nextSlide() {
    if(slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
}

function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 6000);
}

// Iniciar la carga de Banners
document.addEventListener('DOMContentLoaded', () => {
    loadCarouselFromDB();
});


// ---- MOBILE NAV ----
const navToggle = document.getElementById("nav-toggle");
const mainNav   = document.getElementById("main-nav");

if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        const icon = navToggle.querySelector("i");
        if (icon) {
            icon.className = mainNav.classList.contains("open") ? "fas fa-times" : "fas fa-bars";
        }
    });

    // Close on link click
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            const icon = navToggle.querySelector("i");
            if (icon) icon.className = "fas fa-bars";
        });
    });
}

// ---- NAVBAR SCROLL SHADOW ----
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 40 
            ? "0 4px 30px rgba(0,0,0,0.6)" 
            : "none";
    }
}, { passive: true });