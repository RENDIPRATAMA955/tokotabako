// ==========================================
// SolStore - Main Application JavaScript
// ==========================================

// State Management
let cart = [];
let products = [];

// DOM Elements
let cartItemsEl, cartCountEl, totalPriceEl, cartModal;

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    initializeElements();
    await loadProducts();
    renderProducts();
    updateCartUI();
});

// Initialize DOM Elements
function initializeElements() {
    cartItemsEl = document.getElementById('cart-items');
    cartCountEl = document.getElementById('cart-count');
    totalPriceEl = document.getElementById('total-price');
    cartModal = document.getElementById('cart-modal');
}

// Load Products from JSON
async function loadProducts() {
    try {
        const response = await fetch('assets/products.json');
        const data = await response.json();
        products = data.products;
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback products
        products = [];
    }
}

// Render Products to DOM
function renderProducts() {
    const productsContainer = documentSelector('main');
    if (!products.queryContainer) return;

    // Keep the first 3 product cards structure, update content
    products.forEach((product, index) => {
        let card = productsContainer.children[index];
        
        if (!card && index < 3) return;
        
        if (!card && index >= 3) {
            // Create new card for additional products
            card = createProductCard(product);
            productsContainer.appendChild(card);
            return;
        }

        // Update existing card
        updateProductCard(card, product);
    });
}

// Create Product Card Element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card p-5 rounded-2xl';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
        <div class="product-image mb-4">
            ${product.image ? 
                `<img src="${product.image}" alt="${product.name}" onerror="this.outerHTML='<span class=\\'icon\\'>${product.icon}</span>'">` : 
                `<span class="icon">${product.icon}</span>`
            }
        </div>
        <h3 class="font-bold text-lg item-name">${product.name}</h3>
        <p class="text-gray-500 text-xs mb-3">${product.description}</p>
        <div class="flex justify-between items-center">
            <span class="font-bold text-green-400 item-price">${formatCurrency(product.price)}</span>
            <button onclick="addToCart(${product.id})" class="sol-btn text-black font-bold text-xs px-4 py-2 rounded-lg">
                + Keranjang
            </button>
        </div>
    `;
    
    return card;
}

// Update Existing Product Card
function updateProductCard(card, product) {
    const imageContainer = card.querySelector('.product-image');
    imageContainer.innerHTML = product.image ? 
        `<img src="${product.image}" alt="${product.name}" onerror="this.outerHTML='<span class=\\'icon\\'>${product.icon}</span>'">` : 
        `<span class="icon">${product.icon}</span>`;
    
    card.querySelector('.item-name').textContent = product.name;
    card.querySelector('.item-price').textContent = formatCurrency(product.price);
    card.querySelector('button').onclick = () => addToCart(product.id);
}

// Format Currency
function formatCurrency(amount) {
    return `${CONFIG.currency} ${amount.toLocaleString(CONFIG.locale)}`;
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push({ ...product });
    updateCartUI();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    if (!cartCountEl || !cartItemsEl || !totalPriceEl) return;

    cartCountEl.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="text-gray-500 text-center">Keranjang kosong</p>';
        totalPriceEl.textContent = formatCurrency(0);
        return;
    }

    let total = 0;
    cartItemsEl.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg">
                <div>
                    <p class="font-medium text-sm">${item.name}</p>
                    <p class="text-xs text-gray-500">${formatCurrency(item.price)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-400 text-xs px-2 py-1 rounded">
                    Hapus
                </button>
            </div>
        `;
    }).join('');

    totalPriceEl.textContent = formatCurrency(total);
}

// Toggle Cart Modal
function toggleCart() {
    if (cartModal) {
        cartModal.classList.toggle('hidden');
    }
}

// Checkout Function
function checkout(platform) {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!', 'error');
        return;
    }

    let total = 0;
    let itemText = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        itemText += `${index + 1}. ${item.name} (${formatCurrency(item.price)})\n`;
    });

    const message = `Halo Admin ${CONFIG.storeName}, saya ingin memesan:\n\n${itemText}\n*Total: ${formatCurrency(total)}*\n\nMohon informasi pembayarannya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);

    if (platform === 'wa') {
        window.open(`https://wa.me/${CONFIG.phoneAdmin}?text=${encodedMessage}`, '_blank');
    } else if (platform === 'line') {
        window.open(`https://line.me/R/msg/text/?${encodedMessage}`, '_blank');
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 transition-all ${
        type === 'success' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (cartModal && !cartModal.classList.contains('hidden')) {
        if (e.target === cartModal) {
            toggleCart();
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal && !cartModal.classList.contains('hidden')) {
        toggleCart();
    }
});

