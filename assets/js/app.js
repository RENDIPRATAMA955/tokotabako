// ==========================================
// JAken.tabako - Main Application JavaScript
// ==========================================

// State Management
let cart = [];
let products = [];

// DOM Elements
let cartItemsEl, cartCountEl, totalPriceEl, cartModal;

// Products Data - Embedded untuk menghindari CORS issue saat file lokal
const PRODUCTS_DATA = {
    "products": [
        {
            "id": 1,
            "name": "Sampoerna Mild",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6500,
            "image": "assets/images/SAMPOERNA MILD.png",
            "icon": "🚬"
        },
        {
            "id": 2,
            "name": "Sampoerna Splash A",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/SAMPOERNA SPLASH A.png",
            "icon": "🚬"
        },
        {
            "id": 3,
            "name": "Sampoerna Splash B",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/SAMPOERNA SPLASH B.png",
            "icon": "🚬"
        },
        {
            "id": 4,
            "name": "Sampoerna Menthol",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6500,
            "image": "assets/images/SAMPOERNA MENTHOL.png",
            "icon": "🍃"
        },
        {
            "id": 5,
            "name": "Sampoerna Evo",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6900,
            "image": "assets/images/SAMPOERNA EVO.png",
            "icon": "🚬"
        },
        {
            "id": 6,
            "name": "Samsoe Refill",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6100,
            "image": "assets/images/SAMSOE REFILL.png",
            "icon": "🚬"
        },
        {
            "id": 7,
            "name": "Marlboro Black Filter",
            "description": "ROKOK FILTER ISI 20 = 1 PACK ISI 10 BUNGKUS",
            "price": 6900,
            "image": "assets/images/MARBORO BLACK FILTER.png",
            "icon": "🚬"
        },
        {
            "id": 8,
            "name": "Surya 16 Coklat",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6600,
            "image": "assets/images/SURYA 16 COKLAT.png",
            "icon": "🚬"
        },
        {
            "id": 9,
            "name": "Surya 16 Merah",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6600,
            "image": "assets/images/SURYA 16 MERAH.png",
            "icon": "🚬"
        },
        {
            "id": 10,
            "name": "Surya 12",
            "description": "ROKOK FILTER ISI 12 = 1 PACK ISI 10 BUNGKUS",
            "price": 6100,
            "image": "assets/images/SURYA 12.png",
            "icon": "🚬"
        },
        {
            "id": 11,
            "name": "Surya Eksklusif",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 7000,
            "image": "assets/images/SURYA EKSKLUSIF.png",
            "icon": "🚬"
        },
        {
            "id": 12,
            "name": "Esse Juicy",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 7000,
            "image": "assets/images/ESSE JUICY.png",
            "icon": "💜"
        },
        {
            "id": 13,
            "name": "Esse Double Click",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 7000,
            "image": "assets/images/ESSE DOUBLE CLICK.png",
            "icon": "💜"
        },
        {
            "id": 14,
            "name": "Esse Berry Pop",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6500,
            "image": "assets/images/ESSE BERRY POP.png",
            "icon": "💜"
        },
        {
            "id": 15,
            "name": "Esse Double Pop",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6700,
            "image": "assets/images/ESSE DOUBLE POP.png",
            "icon": "💜"
        },
        {
            "id": 16,
            "name": "Esse Punch Pop",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6700,
            "image": "assets/images/ESSE PUNCH POP.png",
            "icon": "💜"
        },
        {
            "id": 17,
            "name": "Esse Shuffle Pop",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 7000,
            "image": "assets/images/ESSE SHUFFLE POP.png",
            "icon": "💜"
        },
        {
            "id": 18,
            "name": "Djarum 76",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/DJARUM 76.png",
            "icon": "🚬"
        },
        {
            "id": 19,
            "name": "Djarum 76 Mangga",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5100,
            "image": "assets/images/DJARUM 76 MANGGA.png",
            "icon": "💚"
        },
        {
            "id": 20,
            "name": "Djarum 76 Mocca",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/DJARUM 76 MOCCA.png",
            "icon": "☕"
        },
        {
            "id": 21,
            "name": "Djarum 76 Extra",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/DJARUM 76 EXTRA.png",
            "icon": "🚬"
        },
        {
            "id": 22,
            "name": "Dunhill Black Filter",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/DUNHILL BLACK FILTER.png",
            "icon": "🚬"
        },
        {
            "id": 23,
            "name": "Dunhill Putih",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5800,
            "image": "assets/images/DUNHILL PUTIH.png",
            "icon": "🚬"
        },
        {
            "id": 24,
            "name": "La Ice Mango",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6400,
            "image": "assets/images/LA ICE MANGO.png",
            "icon": "🥭"
        },
        {
            "id": 25,
            "name": "La Bold",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6900,
            "image": "assets/images/LA BOLD.png",
            "icon": "🚬"
        },
        {
            "id": 26,
            "name": "La Ice Purple",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6400,
            "image": "assets/images/LA ICE PURPLE.png",
            "icon": "💜"
        },
        {
            "id": 27,
            "name": "Win Click",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/WIN CLICK.png",
            "icon": "🚬"
        },
        {
            "id": 28,
            "name": "Win Filter",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/WIN FILTER.png",
            "icon": "🚬"
        },
        {
            "id": 29,
            "name": "Win Bold",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/WIN BOLD.png",
            "icon": "🚬"
        },
        {
            "id": 30,
            "name": "Juara Jambu",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/JUARA JAMBU.png",
            "icon": "🍈"
        },
        {
            "id": 31,
            "name": "Juara Filter",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6000,
            "image": "assets/images/JUARA FILTER.png",
            "icon": "🚬"
        },
        {
            "id": 32,
            "name": "Juara Teh",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/JUARA TEH.png",
            "icon": "🍵"
        },
        {
            "id": 33,
            "name": "Sukun 16",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6000,
            "image": "assets/images/SUKUN 16.png",
            "icon": "🚬"
        },
        {
            "id": 34,
            "name": "Djarum Black",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6400,
            "image": "assets/images/DJARUM BLACK.png",
            "icon": "🚬"
        },
        {
            "id": 35,
            "name": "Djarum Black Cappuccino",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6400,
            "image": "assets/images/DJARUM BLACK CAPPUCCINO.png",
            "icon": "☕"
        },
        {
            "id": 36,
            "name": "Djarum Espresso",
            "description": "ROKOK KRETEK ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 5300,
            "image": "assets/images/DJARUM ESPRESSO.png",
            "icon": "☕"
        },
        {
            "id": 37,
            "name": "Gudang Garam Filter",
            "description": "ROKOK KRETEK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6100,
            "image": "assets/images/GUDANG GARAM FILTER.png",
            "icon": "🚬"
        },
        {
            "id": 38,
            "name": "Camel Ungu",
            "description": "ROKOK FILTER ISI 20 = 1 PACK ISI 10 BUNGKUS",
            "price": 6000,
            "image": "assets/images/CAMEL UNGU.png",
            "icon": "💜"
        },
        {
            "id": 39,
            "name": "Camel Connect",
            "description": "ROKOK FILTER ISI 20 = 1 PACK ISI 10 BUNGKUS",
            "price": 6300,
            "image": "assets/images/CAMEL CONNECT.png",
            "icon": "🚬"
        },
        {
            "id": 40,
            "name": "Nestlite",
            "description": "ROKOK FILTER ISI 20 = 1 PACK ISI 10 BUNGKUS",
            "price": 6500,
            "image": "assets/images/NESTLITE.png",
            "icon": "🍃"
        },
        {
            "id": 41,
            "name": "Magnum",
            "description": "ROKOK FILTER ISI 16 = 1 PACK ISI 10 BUNGKUS",
            "price": 6100,
            "image": "assets/images/MAGNUM.png",
            "icon": "🚬"
        }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    loadProducts();
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

// Load Products from embedded data
function loadProducts() {
    products = PRODUCTS_DATA.products;
}

// Render Products to DOM
function renderProducts() {
    const productsContainer = document.querySelector('main');
    if (!productsContainer) return;

    // Clear existing content
    productsContainer.innerHTML = '';

    // Create cards for all products
    products.forEach((product) => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
    });
}

// Create Product Card Element - iOS Style
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'ios-card p-3';
    card.dataset.productId = product.id;

    const icon = product.icon || '🚬';
    const imageSrc = product.image || '';
    const imageHtml = imageSrc 
        ? `<img src="${imageSrc}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<span class=\\'text-3xl\\'>${icon}</span>'">`
        : `<span class="text-3xl">${icon}</span>`;

    card.innerHTML = `
        <div class="ios-image-container aspect-square mb-2 flex items-center justify-center">
            ${imageHtml}
        </div>
        <h3 class="font-bold text-13 mb-1 truncate">${product.name}</h3>
        <p class="text-[rgba(142,142,147,1)] text-10 mb-2 truncate">${product.description}</p>
        <div class="flex justify-between items-center">
            <span class="ios-price text-14">${formatCurrency(product.price)}</span>
            <button onclick="addToCart(${product.id})" class="ios-btn text-11 px-3 py-1.5">
                + Tambah
            </button>
        </div>
    `;

    return card;
}

// Format Currency
function formatCurrency(amount) {
    return `${CONFIG.currency}${amount.toLocaleString(CONFIG.locale)}`;
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
        cartItemsEl.innerHTML = '<p class="text-center text-[rgba(142,142,147,1)] py-8">Keranjang kosong</p>';
        totalPriceEl.textContent = formatCurrency(0);
        return;
    }

    let total = 0;
    cartItemsEl.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="flex justify-between items-center p-3 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <div class="flex-1">
                    <p class="font-medium text-14">${item.name}</p>
                    <p class="text-12 text-[rgba(142,142,147,1)]">${formatCurrency(item.price)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="ios-delete text-white text-12 px-3 py-1.5 rounded-lg ml-2">
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

// Checkout Function - WhatsApp
function checkout() {
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

    window.open(`https://wa.me/${CONFIG.phoneAdmin}?text=${encodedMessage}`, '_blank');
}

// Show Notification - iOS Style
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `ios-toast fixed bottom-24 left-1/2 transform -translate-x-1/2 px-4 py-3 z-50 ${
        type === 'success' ? '' : 'bg-red-500 text-white'
    }`;
    notification.style.cssText = 'min-width: 200px; display: flex; align-items: center; justify-content: center;';
    notification.textContent = message;
    
    if (type === 'success') {
        notification.innerHTML = `<span style="color: ${getComputedStyle(document.documentElement).getPropertyValue('--sol-start')}; font-weight: 600;">${message}</span>`;
    }
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) scale(0.8)';
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

