/* ============================================
   HEREJAIBAS | Script Principal
   ============================================ */

// ---- CAROUSEL ----
const slides = [
    {
        image: "https://4kwallpapers.com/images/wallpapers/warhammer-40k-space-3840x2160-22638.jpg",
        eyebrow: "Club de Wargames · Veracruz",
        titleLine1: "ÚNETE A LA",
        titleAccent: "LEGIÓN",
        text: "Prepara a tu ejército para la guerra en el Puerto de Veracruz. Partidas, torneos y comunidad.",
        btn1Text: "Unirse ahora",
        btn1Link: "comunidad.html",
        btn2Text: "Ver torneos",
        btn2Link: "torneos.html"
    },
    {
        image: "https://images.unsplash.com/photo-1542352467-f2730635d971?q=80&w=1600",
        eyebrow: "Pintura y Modelismo",
        titleLine1: "FORJA TUS",
        titleAccent: "TROPAS",
        text: "El arte de la miniatura es tan importante como la táctica. Comparte tus progresos con la comunidad.",
        btn1Text: "Ver galería",
        btn1Link: "galeria.html",
        btn2Text: "Nuestra comunidad",
        btn2Link: "comunidad.html"
    },
    {
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600",
        eyebrow: "Torneos y Competencias",
        titleLine1: "HEREJÍA EN",
        titleAccent: "EL GOLFO",
        text: "Encuentra rivales, organiza campañas y defiende el honor de tu facción en Veracruz.",
        btn1Text: "Ver torneos",
        btn1Link: "torneos.html",
        btn2Text: "Unirse",
        btn2Link: "comunidad.html"
    }
];

let currentIndex = 0;
let autoplayTimer = null;

const bgElement       = document.getElementById("carousel-bg");
const titleEl         = document.getElementById("carousel-title");
const titleAccentEl   = document.getElementById("carousel-title-accent");
const eyebrowEl       = document.getElementById("carousel-eyebrow");
const textEl          = document.getElementById("carousel-text");
const btn1El          = document.getElementById("carousel-btn-primary");
const btn2El          = document.getElementById("carousel-btn-secondary");
const dots            = document.querySelectorAll(".dot");

function updateSlide(index) {
    const s = slides[index];
    if (!bgElement) return;

    bgElement.style.backgroundImage = `url('${s.image}')`;
    if (eyebrowEl) eyebrowEl.textContent = s.eyebrow;
    if (titleEl) titleEl.childNodes[0].textContent = s.titleLine1 + " ";
    if (titleAccentEl) titleAccentEl.textContent = s.titleAccent;
    if (textEl) textEl.textContent = s.text;
    if (btn1El) { btn1El.textContent = s.btn1Text; btn1El.href = s.btn1Link; }
    if (btn2El) { btn2El.textContent = s.btn2Text; btn2El.href = s.btn2Link; }

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

window.goToSlide = function(index) {
    currentIndex = index;
    updateSlide(index);
    resetAutoplay();
};

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
}

function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 6000);
}

// Init
updateSlide(0);
resetAutoplay();

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