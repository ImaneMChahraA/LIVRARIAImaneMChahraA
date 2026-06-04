// Données des livres
const books = [
    {
        id: 1,
        title: "Les Misérables",
        author: "Victor Hugo",
        category: "litterature",
        price: 5280,
        rating: 4.5,
        image: "../images/miserables.jpg"
    },
    {
        id: 2,
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        category: "litterature",
        price: 1500,
        rating: 4.8,
        image: "../images/madamBovary.jpg"
    },
    {
        id: 3,
        title: "Histoire de l'art",
        author: "E.H.Gombrich",
        category: "art",
        price: 4500,
        rating: 4.3,
        image: "../images/histoiredel'art.jpg"
    },
    {
        id: 4,
        title: "Le Rouge et le Noir",
        author: "Stendhal",
        category: "litterature",
        price: 1800,
        rating: 4.6,
        image: "../images/rougeetnoir.jpg"
    },
    {
        id: 5,
        title: "L'Etranger",
        author: "Albert Camus",
        category: "litterature",
        price: 1600,
        rating: 4.9,
        image: "../images/etranger.jpg"
    },
    {
        id: 6,
        title: "Une bréve histoire du temps",
        author: "Stephen Hawking",
        category: "science",
        price: 1100,
        rating: 4.7,
        image: "../images/une-breve-histoire-du-temps-1167433.jpg"
    },
    {
        id: 7,
        title: "Histoire de la Revolution Française",
        author: "Jules Michelet",
        category: "histoire",
        price: 3000,
        rating: 4.8,
        image: "../images/histREVfranc.jpg"
    },
    {
        id: 8,
        title: "Le Banquet",
        author: "Platon",
        category: "philosophie",
        price: 1200,
        rating: 4.6,
        image: "../images/banquet.jpg"
    },
    {
        id: 9,
        title: "Candide",
        author: "Voltaire",
        category: "litterature",
        price: 1000,
        rating: 4.9,
        image: "../images/candide.jpg"
    },
    {
        id: 10,
        title: "Critique de la raison pure",
        author: "Immanuel Kant",
        category: "philosophie",
        price: 3500,
        rating: 4.7,
        image: "../images/critiqueDeLaRaisonPure.jpg"
    },
    {
        id: 11,
        title: "L'origine des espéces",
        author: "Charles Darwin",
        category: "science",
        price: 2500,
        rating: 4.8,
        image: "../images/origineDesEspeces.jpg"
    },
    {
        id: 12,
        title: "Le Siécle de Louis XIV",
        author: "Voltaire",
        category: "histoire",
        price: 2000,
        rating: 4.4,
        image: "../images/siecledelouisXIV.jpg"
    }
];

// État de l'application
let cart = JSON.parse(localStorage.getItem('livraria_cart')) || [];
let currentCategory = 'all';
let currentSort = 'popularite';

// Éléments DOM
const booksGrid = document.getElementById('booksGrid');
const resultsCount = document.getElementById('resultsCount');
const sortSelect = document.getElementById('sortSelect');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.querySelector('.cart-btn');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    setupEventListeners();
});

// Configuration des événements
function setupEventListeners() {
    // Filtres de catégorie
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderBooks();
        });
    });

    // Tri
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderBooks();
    });

    // Panier
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

// Rendu des livres
function renderBooks() {
    let filteredBooks = [...books];

    // Filtrer par catégorie
    if (currentCategory !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === currentCategory);
    }

    // Trier
    filteredBooks = sortBooks(filteredBooks, currentSort);

    // Mettre à jour le compteur
    resultsCount.textContent = `${filteredBooks.length} livre${filteredBooks.length > 1 ? 's' : ''} trouvé${filteredBooks.length > 1 ? 's' : ''}`;

    // Rendre la grille
    booksGrid.innerHTML = filteredBooks.map(book => `
        <article class="book-card" data-id="${book.id}">
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}" loading="lazy">
                <div class="book-overlay">
                    <button class="add-to-cart" onclick="addToCart(${book.id})">
                        Ajouter au panier
                    </button>
                </div>
            </div>
            <div class="book-info">
                <div class="book-category">${book.category}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-footer">
                    <span class="book-price">${book.price.toFixed(2)} DA</span>
                    <span class="book-rating">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Tri des livres
function sortBooks(books, sortType) {
    switch(sortType) {
        case 'prix-croissant':
            return [...books].sort((a, b) => a.price - b.price);
        case 'prix-decroissant':
            return [...books].sort((a, b) => b.price - a.price);
        case 'titre':
            return [...books].sort((a, b) => a.title.localeCompare(b.title));
        case 'date':
            return [...books].sort((a, b) => b.id - a.id);
        default:
            return books;
    }
}

// Ajouter au panier
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
      saveCart(); 

    updateCartCount();
    
    // Animation du bouton panier
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);


    function saveCart() {
    localStorage.setItem('livraria_cart', JSON.stringify(cart));
}
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Rendu du panier
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Votre panier est vide</p>';
        cartTotal.textContent = '0,00 DA';
        return;
    }

    let total = 0;
    
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border);">
                <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 120px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem;">${item.title}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${item.author}</p>
                    <p style="color: var(--accent); font-weight: 600;">${item.price.toFixed(2)} DA x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.5rem;">&times;</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `${total.toFixed(2)} DA`;
     const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = 'Passer la commande →';
    checkoutBtn.style.cssText = `
        width: 100%;
        padding: 1rem;
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1.5rem;
        transition: background-color 0.3s;
    `;
    checkoutBtn.addEventListener('mouseenter', () => {
        checkoutBtn.style.backgroundColor = '#6b5640';
    });
    checkoutBtn.addEventListener('mouseleave', () => {
        checkoutBtn.style.backgroundColor = 'var(--accent)';
    });
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'commande.html';
    });

    // Supprimer l'ancien bouton s'il existe déjà
    const oldBtn = document.getElementById('checkoutBtn');
    if (oldBtn) oldBtn.remove();

    checkoutBtn.id = 'checkoutBtn';
    cartItems.parentElement.appendChild(checkoutBtn);
}


// Retirer du panier
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCartCount();
    renderCart();
    
}


// Bouton charger plus
document.querySelector('.load-more-btn').addEventListener('click', function() {
    this.textContent = 'Chargement...';
    setTimeout(() => {
        this.textContent = 'Charger plus de livres';
        alert('Plus de livres disponibles dans cette démo!');
    }, 1000);
});