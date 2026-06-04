document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupFormSubmission();
    updateCartCount();
});

// Charger le panier depuis localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('livraria_cart')) || [];
}

function loadOrderSummary() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('totalAmount');
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">🛒 Votre panier est vide</p>
                <a href="livres.html" style="color: var(--accent); text-decoration: none; font-weight: 600;">
                    ← Retourner à la boutique
                </a>
            </div>
        `;
        subtotalElement.textContent = '0,00 DA';
        totalElement.textContent = '0,00 DA';
        return;
    }
    
    let total = 0;
    
    const cartHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.author}</p>
                    <p class="price">${item.price.toFixed(2)} DA</p>
                    <p class="quantity">Quantité : ${item.quantity}</p>
                </div>
            </div>
        `;
    }).join('');
    
    cartItemsContainer.innerHTML = cartHTML;
    subtotalElement.textContent = `${total.toFixed(2)} DA`;
    totalElement.textContent = `${total.toFixed(2)} DA`;
}

function setupFormSubmission() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cart = getCart();
            
            if (cart.length === 0) {
                alert('Votre panier est vide.');
                return;
            }
            
            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                adresse: document.getElementById('adresse').value,
                ville: document.getElementById('ville').value,
                wilaya: document.getElementById('wilaya').value,
                codePostal: document.getElementById('codePostal').value,
                notes: document.getElementById('notes').value,
                payment: document.getElementById('payment').value
            };
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const order = {
                id: Date.now(),
                date: new Date().toISOString(),
                customer: formData,
                items: cart,
                total: total
            };
            
            console.log('Commande validée :', order);
            
            // Sauvegarder la commande dans localStorage
            const orders = JSON.parse(localStorage.getItem('livraria_orders')) || [];
            orders.push(order);
            localStorage.setItem('livraria_orders', JSON.stringify(orders));
            
            // Vider le panier
            localStorage.removeItem('livraria_cart');
            
            alert(`Merci ${formData.nom} !\n\nVotre commande n°${order.id} a été validée.\n\nTotal : ${total.toFixed(2)} DA\n\nNous vous contacterons bientôt.`);
            
            window.location.href = 'livres.html';
        });
    }
}

function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = count;
    }
}