const slides = [
    {
        image: "https://4kwallpapers.com/images/wallpapers/warhammer-40k-space-3840x2160-22638.jpg", 
        title: "UNETE A LA COMUNIDAD",
        text: "Prepara a tu ejercito para la batalla en el Puerto de Veracruz",
        buttonText: "UNIRSE A LA BATALLA",
        buttonLink: "#torneos"
    },
    {
        image: "https://images.unsplash.com/photo-1542352467-f2730635d971?q=80&w=1200", 
        title: "FORJA TUS TROPAS",
        text: "Armado y pintura. Mira las Unidades de tus compañeros.",
        buttonText: "VER GALERÍA",
        buttonLink: "#galeria"
    },
    {
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200", 
        title: "HEREJÍA EN EL GOLFO",
        text: "Encuentra comandantes rivales, organiza partidas y defiende tu facción en Veracruz.",
        buttonText: "NUESTRA COMUNIDAD",
        buttonLink: "#comunidad"
    }
];

let currentIndex = 0;

const bgElement = document.getElementById("carousel-bg");
const titleElement = document.getElementById("carousel-title");
const textElement = document.getElementById("carousel-text");
const buttonElement = document.getElementById("carousel-btn");
const dots = document.querySelectorAll(".dot");

function updateSlide(index) {
    bgElement.style.backgroundImage = `url('${slides[index].image}')`;
    titleElement.textContent = slides[index].title;
    textElement.textContent = slides[index].text;
    buttonElement.textContent = slides[index].buttonText;
    buttonElement.href = slides[index].buttonLink;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

window.goToSlide = function(index) {
    currentIndex = index;
    updateSlide(currentIndex);
};

// Inicialización manual
updateSlide(0);

// El fondo también es clickeable para comodidad
bgElement.addEventListener('click', (e) => {
    if (e.target.id === 'carousel-btn') return;
    window.location.href = slides[currentIndex].buttonLink;
});
bgElement.style.cursor = 'pointer';