// Language switch
const enBtn = document.getElementById('en-btn');
const srBtn = document.getElementById('sr-btn');
const elements = document.querySelectorAll('[data-en]');

enBtn.addEventListener('click', () => {
    elements.forEach(el => el.textContent = el.getAttribute('data-en'));
});

srBtn.addEventListener('click', () => {
    elements.forEach(el => el.textContent = el.getAttribute('data-sr'));
});

// Smooth scroll for nav links with offset
const navLinks = document.querySelectorAll('nav ul li a');
const navHeight = document.querySelector('nav').offsetHeight;

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Fade-in sections on scroll
const fadeSections = document.querySelectorAll('.fade-section');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Lightbox galerija
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; // prikazuje punu sliku
        lightbox.classList.add('show');
    });
});

// Klikom van slike ili na overlay zatvori
lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('show');
    }
});


let currentIndex = 0;

function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.add('show');
}

// Otvaranje klikom na galeriju
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        showLightbox(index);
    });
});

// Navigacija strelicama
const prevBtn = document.querySelector('#lightbox .prev');
const nextBtn = document.querySelector('#lightbox .next');

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // ne zatvara lightbox
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

// Klik van slike zatvara lightbox
lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
        lightbox.classList.remove('show');
    }
});

// Strelice tastature (levo/desno) za desktop
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') lightbox.classList.remove('show');
});