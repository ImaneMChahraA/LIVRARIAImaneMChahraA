/* ============================================
   DONNÉES DES LIVRES
   ============================================ */
const newBooks = [
    { id: 21, title: "Le Siécle de Louis XIV", author: "Voltaire", genre: "Histoire", price: 2000, rating: 4.4, reviews: 89, image: "./images/siecledelouisXIV.jpg" },
    { id: 22, title: "Madame Bovary", author: "Gustave Flaubert", genre: "Littérature", price: 1500, rating: 5, reviews: 456, image: "./images/madamBovary.jpg" },
    
    { id: 23, title: "Une bréve histoire du temps", author: "Stephen Hawking", genre: "Sciences", price: 1100, rating: 4.8, reviews: 234, image: "./images/une-breve-histoire-du-temps-1167433.jpg" },
    { id: 24, title: "Histoire de l'art", author: "E.H.Gombrich", genre: "Art", price: 4500, rating: 5, reviews: 34, image: "./images/histoiredel'art.jpg" },
    { id: 25, title: "Les Misérables", author: "Victor Hugo", genre: "Littérature", price: 5280, rating: 5, reviews: 892, image: "./images/miserables.jpg" },
    { id: 26, title: "Histoire de la Revolution Française", author: "Jules Michelet", genre: "Histoire", price: 3000, rating: 4.8, reviews: 567, image: "./images/histREVfranc.jpg" },
    { id: 27, title: "L'origine des espéces", author: "Charles Darwin", genre: "Sciences", price: 2500, rating: 5, reviews: 134, image: "./images/origineDesEspeces.jpg" },
    { id: 28, title: "Critique de la raison pure", author: "Immanuel Kant", genre: "Philosophie", price: 3500, rating: 5, reviews: 412, image: "./images/critiqueDeLaRaisonPure.jpg" }
];

/* ============================================
   DOM ELEMENTS
   ============================================ */
const header = document.querySelector('.header');
const backToTop = document.getElementById('backToTop');
const newBooksTrack = document.getElementById('newBooksTrack');

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (window.scrollY > 600) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================
   RENDER NEW BOOKS
   ============================================ */
function renderNewBooks() {
    newBooksTrack.innerHTML = newBooks.map(book => `
        <article class="new-book-card">
            <img src="${book.image}" alt="${book.title}" loading="lazy" onerror="this.src=''">
            <div class="book-card-content">
                <span class="book-genre">${book.genre}</span>
                <h3 class="book-card-title">${book.title}</h3>
                <p class="book-card-author">${book.author}</p>
                <div class="book-card-rating">
                    <span class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</span>
                </div>
                <div class="book-card-price">
                    <span class="price-current">${book.price.toFixed(2)} DA</span>
                </div>
               
            </div>
        </article>
    `).join('');
}

/* ============================================
   HORIZONTAL SCROLL BUTTONS
   ============================================ */
const scrollLeftBtn = document.querySelector('.scroll-btn-left');
const scrollRightBtn = document.querySelector('.scroll-btn-right');

if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => newBooksTrack.scrollBy({ left: -400, behavior: 'smooth' }));
    scrollRightBtn.addEventListener('click', () => newBooksTrack.scrollBy({ left: 400, behavior: 'smooth' }));
}



/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.book-card-featured, .section-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

/* ============================================
   PARALLAX EFFECT ON HERO
   ============================================ */
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-bg-img');
    if (heroImg && window.scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    }
});


/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', renderNewBooks);