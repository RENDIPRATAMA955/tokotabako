// ==========================================
// JAken.tabako - Main Application JavaScript
// Mobile-First Amazon Style + Solana Theme
// ==========================================

let cart = [];
let products = [];
let filteredProducts = [];
let currentCategory = 'all';
let searchQuery = '';

let cartItemsEl, cartCountEl, cartTotalEl, cartDrawer, cartOverlay;
let productsGridEl, categorySidebarEl, searchInputEl, searchSuggestionsEl, sortSelectEl;

const PRODUCTS_DATA = {
    "products": [
        { "id": 1, "name": "Sampoerna Mild", "price": 6500, "icon": "🚬", "category": "sampoerna", "rating": 4.5 },
        { "id": 2, "name": "Sampoerna Splash A", "price": 6300, "icon": "🚬", "category": "sampoerna", "rating": 4.3 },
        { "id": 3, "name": "Sampoerna Splash B", "price": 6300, "icon": "🚬", "category": "sampoerna", "rating": 4.3 },
        { "id": 4, "name": "Sampoerna Menthol", "price": 6500, "icon": "🍃", "category": "sampoerna", "rating": 4.4 },
        { "id": 5, "name": "Sampoerna Evo", "price": 6900, "icon": "🚬", "category": "sampoerna", "rating": 4.6 },
        { "id": 6, "name": "Samsoe Refill", "price": 6100, "icon": "🚬", "category": "sampoerna", "rating": 4.2 },
        { "id": 7, "name": "Marlboro Black", "price": 6900, "icon": "🚬", "category": "marlboro", "rating": 4.7 },
        { "id": 8, "name": "Surya 16 Coklat", "price": 6600, "icon": "🚬", "category": "surya", "rating": 4.4 },
        { "id": 9, "name": "Surya 16 Merah", "price": 6600, "icon": "🚬", "category": "surya", "rating": 4.4 },
        { "id": 10, "name": "Surya 12", "price": 6100, "icon": "🚬", "category": "surya", "rating": 4.1 },
        { "id": 11, "name": "Surya Eksklusif", "price": 7000, "icon": "🚬", "category": "surya", "rating": 4.6 },
        { "id": 12, "name": "Esse Juicy", "price": 7000, "icon": "💜", "category": "esse", "rating": 4.5 },
        { "id": 13, "name": "Esse Double Click", "price": 7000, "icon": "💜", "category": "esse", "rating": 4.6 },
        { "id": 14, "name": "Esse Berry Pop", "price": 6500, "icon": "💜", "category": "esse", "rating": 4.4 },
        { "id": 15, "name": "Esse Double Pop", "price": 6700, "icon": "💜", "category": "esse", "rating": 4.5 },
        { "id": 16, "name": "Esse Punch Pop", "price": 6700, "icon": "💜", "category": "esse", "rating": 4.4 },
        { "id": 17, "name": "Esse Shuffle Pop", "price": 7000, "icon": "💜", "category": "esse", "rating": 4.5 },
        { "id": 18, "name": "Djarum 76", "price": 5300, "icon": "🚬", "category": "djarum", "rating": 4.3 },
        { "id": 19, "name": "Djarum 76 Mangga", "price": 5100, "icon": "💚", "category": "djarum", "rating": 4.2 },
        { "id": 20, "name": "Djarum 76 Mocca", "price": 5300, "icon": "☕", "category": "djarum", "rating": 4.3 },
        { "id": 21, "name": "Djarum 76 Extra", "price": 5300, "icon": "🚬", "category": "djarum", "rating": 4.2 },
        { "id": 22, "name": "Dunhill Black", "price": 6300, "icon": "🚬", "category": "dunhill", "rating": 4.4 },
        { "id": 23, "name": "Dunhill Putih", "price": 5800, "icon": "🚬", "category": "dunhill", "rating": 4.1 },
        { "id": 24, "name": "La Ice Mango", "price": 6400, "icon": "🥭", "category": "la", "rating": 4.3 },
        { "id": 25, "name": "La Bold", "price": 6900, "icon": "🚬", "category": "la", "rating": 4.5 },
        { "id": 26, "name": "La Ice Purple", "price": 6400, "icon": "💜", "category": "la", "rating": 4.3 },
        { "id": 27, "name": "Win Click", "price": 6300, "icon": "🚬", "category": "win", "rating": 4.2 },
        { "id": 28, "name": "Win Filter", "price": 6300, "icon": "🚬", "category": "win", "rating": 4.2 },
        { "id": 29, "name": "Win Bold", "price": 6300, "icon": "🚬", "category": "win", "rating": 4.3 },
        { "id": 30, "name": "Juara Jambu", "price": 5300, "icon": "🍈", "category": "juara", "rating": 4.1 },
        { "id": 31, "name": "Juara Filter", "price": 6000, "icon": "🚬", "category": "juara", "rating": 4.0 },
        { "id": 32, "name": "Juara Teh", "price": 5300, "icon": "🍵", "category": "juara", "rating": 4.1 },
        { "id": 33, "name": "Djarum Black", "price": 6400, "icon": "🚬", "category": "djarum", "rating": 4.4 },
        { "id": 34, "name": "Djarum Black Cappuccino", "price": 6400, "icon": "☕", "category": "djarum", "rating": 4.3 },
        { "id": 35, "name": "Djarum Espresso", "price": 5300, "icon": "☕", "category": "djarum", "rating": 4.2 },
        { "id": 36, "name": "Gudang Garam Filter", "price": 6100, "icon": "🚬", "category": "djarum", "rating": 4.2 },
        { "id": 37, "name": "Camel Ungu", "price": 6000, "icon": "💜", "category": "camel", "rating": 4.3 },
        { "id": 38, "name": "Camel Connect", "price": 6300, "icon": "🚬", "category": "camel", "rating": 4.4 },
        { "id": 39, "name": "Nestlite", "price": 6500, "icon": "🍃", "category": "camel", "rating": 4.2 },
        { "id": 40, "name": "Magnum", "price": 6100, "icon": "🚬", "category": "djarum", "rating": 4.1 }
    ]
};

const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'sampoerna', name: 'Sampoerna' },
    { id: 'surya', name: 'Surya' },
    { id: 'djarum', name: 'Djarum' },
    { id: 'esse', name: 'Esse' },
    { id: 'marlboro', name: 'Marlboro' },
    { id: 'dunhill', name: 'Dunhill' },
    { id: 'la', name: 'LA' },
    { id: 'win', name: 'Win' },
    { id: 'juara', name: 'Juara' },
    { id: 'camel', name: 'Camel' }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    loadProducts();
    renderCategories();
    applyFilters();
    setupEventListeners();
    loadCartFromStorage();
});

function initializeElements() {
    cartItemsEl = document.getElementById('cart-items');
    cartCountEl = document.getElementById('cart-count');
    cartTotalEl = document.getElementById('cart-total');
    cartDrawer = document.getElementById('cart-drawer');
    cartOverlay = document.getElementById('cart-overlay');
    productsGridEl = document.getElementById('products-grid');
    categorySidebarEl = document.getElementById('category-sidebar');
    searchInputEl = document.getElementById('search-input');
    searchSuggestionsEl = document.getElementById('search-suggestions');
    sortSelectEl = document.getElementById('sort-select');
}

function setupEventListeners() {
    if (searchInputEl) {
        searchInputEl.addEventListener('input', handleSearchInput);
        searchInputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
        searchInputEl.addEventListener('focus', handleSearchInput);
        document.addEventListener('click', (e) => {
            if (searchSuggestionsEl && !searchInputEl.contains(e.target) && !searchSuggestionsEl.contains(e.target)) {
                hideSuggestions();
            }
        });
    }
    
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.dataset.category;
            applyFilters();
        });
    });
    
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentCategory = item.dataset.category;
            document.querySelectorAll('.filter-pill').forEach(p => {
                p.classList.toggle('active', p.dataset.category === currentCategory);
            });
            applyFilters();
        });
    });
}

function loadProducts() {
    products = PRODUCTS_DATA.products;
}

function renderCategories() {
    if (!categorySidebarEl) return;
    categorySidebarEl.innerHTML = CATEGORIES.map(cat => `
        <div class="category-item ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</div>
    `).join('');
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    searchQuery = query;
    
    if (query.length < 1) {
        hideSuggestions();
        applyFilters();
        return;
    }
    
    const suggestions = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 6);
    showSuggestions(suggestions);
}

function showSuggestions(suggestions) {
    if (!searchSuggestionsEl || suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    searchSuggestionsEl.innerHTML = suggestions.map(p => `
        <div style="padding:12px 16px;cursor:pointer;border-bottom:1px solid #f0f0f0;" 
             onclick="selectSuggestion('${p.name.replace(/'/g, "\\'")}')"
             onmouseover="this.style.background='#f7f8fa'"
             onmouseout="this.style.background='#fff'">${p.name}</div>
    `).join('');
    searchSuggestionsEl.style.display = 'block';
}

function selectSuggestion(name) {
    if (searchInputEl) {
        searchInputEl.value = name;
        searchQuery = name.toLowerCase();
        hideSuggestions();
        applyFilters();
    }
}

function hideSuggestions() {
    if (searchSuggestionsEl) {
        searchSuggestionsEl.style.display = 'none';
    }
}

function performSearch() {
    if (searchInputEl) {
        searchQuery = searchInputEl.value.toLowerCase().trim();
        applyFilters();
        hideSuggestions();
    }
}

function applyFilters() {
    let result = [...products];
    if (currentCategory !== 'all') {
        result = result.filter(p => p.category === currentCategory);
    }
    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery));
    }
    filteredProducts = result;
    sortProducts();
}

function sortProducts() {
    if (!sortSelectEl) return;
    const sortValue = sortSelectEl.value;
    
    switch (sortValue) {
        case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
        case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
        case 'name-asc': filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc': filteredProducts.sort((a, b) => b.name.localeCompare(a.name)); break;
        default: filteredProducts.sort((a, b) => a.id - b.id);
    }
    renderProducts();
}

function renderProducts() {
    if (!productsGridEl) return;
    
    if (filteredProducts.length === 0) {
        productsGridEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#666;">Produk tidak ditemukan</div>';
        return;
    }
    
    productsGridEl.innerHTML = filteredProducts.map(product => `
        <div class="amazon-card">
            <div class="product-image">
                <span>${product.icon}</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            ${renderRating(product.rating)}
            <div class="price">¥${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${product.id})" class="amazon-btn-primary">Tambah</button>
        </div>
    `).join('');
}

function renderRating(rating) {
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + (rating % 1 >= 0.5 ? '½' : '');
    return `<div class="rating"><span class="stars">${stars}</span><span class="rating-count">${rating}</span></div>`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCartToStorage();
    updateCartUI();
    showToast(`${product.name} ditambahkan`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    saveCartToStorage();
    updateCartUI();
}

function updateCartUI() {
    if (!cartCountEl || !cartItemsEl || !cartTotalEl) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <p>Keranjang kosong</p>
            </div>
        `;
        cartTotalEl.textContent = '¥0';
        return;
    }
    
    let total = 0;
    cartItemsEl.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <span>${item.icon}</span>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="delete-btn" onclick="cart=cart.filter(i=>i.id!==${item.id});saveCartToStorage();updateCartUI()">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotalEl.textContent = `¥${total.toLocaleString()}`;
}

function toggleCart() {
    if (cartDrawer && cartOverlay) {
        cartDrawer.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Keranjang kosong!');
        return;
    }
    
    let total = 0;
    let itemText = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemText += `${index + 1}. ${item.name} x${item.quantity} (¥${itemTotal.toLocaleString()})\n`;
    });
    
    const message = `Halo Admin ${CONFIG.storeName}, saya pesan:\n\n${itemText}\n*Total: ¥${total.toLocaleString()}*\n\nMohon info pembayaran.`;
    window.open(`https://wa.me/${CONFIG.phoneAdmin}?text=${encodeURIComponent(message)}`, '_blank');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function saveCartToStorage() {
    localStorage.setItem('jaken_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('jaken_cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
            updateCartUI();
        } catch (e) {}
    }
}

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.performSearch = performSearch;
window.selectSuggestion = selectSuggestion;
window.sortProducts = sortProducts;

