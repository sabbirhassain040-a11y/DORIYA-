<!-- অর্ডার করার পপ-আপ ফর্ম -->
<div class="modal" id="checkoutModal" style="display:none;">
    <div class="modal-content" style="max-width: 400px; padding: 20px;">
        <button class="close-modal" onclick="closeCheckoutModal()">✕</button>
        <h2>📦 অর্ডার সম্পন্ন করুন</h2>
        <form id="orderForm" onsubmit="sendOrderToWhatsApp(event)">
            <p><strong>মোট মূল্য: ৳ <span id="checkoutTotal">0</span></strong></p>
            <hr>
            <div style="margin-bottom: 10px;">
                <label>আপনার নাম:</label><br>
                <input type="text" id="custName" required placeholder="পুরো নাম লিখুন" style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 10px;">
                <label>মোবাইল নম্বর:</label><br>
                <input type="tel" id="custPhone" required placeholder="017XXXXXXXX" style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 10px;">
                <label>পূর্ণাঙ্গ ঠিকানা:</label><br>
                <textarea id="custAddress" required placeholder="বাসা/রোড, এলাকা, জেলা" style="width: 100%; padding: 8px; margin-top: 5px;"></textarea>
            </div>
            <button type="submit" style="background: #25D366; color: white; border: none; width: 100%; padding: 12px; font-weight: bold; border-radius: 5px; cursor: pointer;">
                📲 WhatsApp-এ অর্ডার পাঠান
            </button>
        </form>
    </div>
</div>
// DORIYA মার্কেটপ্লেস - JavaScript

// প্রোডাক্ট ডাটাবেস
const products = [
    // ইলেকট্রনিক্স
    { id: 1, title: "স্মার্ট ওয়াচ প্রো", category: "ইলেকট্রনিক্স", originalPrice: 8999, currentPrice: 3999, emoji: "⌚", rating: 4.5, reviews: 250, seller: "টেক স্টোর বাংলাদেশ", hotDeal: true, description: "সর্বশেষ প্রযুক্তির স্মার্ট ওয়াচ যা আপনার স্বাস্থ্য ট্র্যাক করতে পারে।" },
    { id: 2, title: "ওয়্যারলেস ইয়ারবাড", category: "ইলেকট্রনিক্স", originalPrice: 4999, currentPrice: 1999, emoji: "🎧", rating: 4.3, reviews: 180, seller: "অডিও প্লাস", hotDeal: true, description: "উচ্চমানের সাউন্ড কোয়ালিটি সহ ওয়্যারলেস ইয়ারবাড।" },
    { id: 3, title: "পাওয়ার ব্যাংক 20000mAh", category: "ইলেকট্রনিক্স", originalPrice: 3500, currentPrice: 1599, emoji: "🔋", rating: 4.6, reviews: 320, seller: "চার্জিং হাব", hotDeal: false, description: "দ্রুত চার্জিং প্রযুক্তি সহ পাওয়ারফুল পাওয়ার ব্যাংক।" },
    { id: 4, title: "ওয়েব ক্যামেরা HD", category: "ইলেকট্রনিক্স", originalPrice: 2999, currentPrice: 1299, emoji: "📷", rating: 4.2, reviews: 145, seller: "ভিডিও সলিউশন", hotDeal: true, description: "ক্রিস্টাল ক্লিয়ার HD ভিডিও কোয়ালিটি সহ ওয়েব ক্যামেরা।" },
    
    // ফ্যাশন
    { id: 5, title: "কটন টি-শার্ট", category: "ফ্যাশন", originalPrice: 1200, currentPrice: 399, emoji: "👕", rating: 4.4, reviews: 210, seller: "ফ্যাশন হাব", hotDeal: false, description: "আরামদায়ক এবং টেকসই কটন টি-শার্ট।" },
    { id: 6, title: "জিন্স প্যান্ট", category: "ফ্যাশন", originalPrice: 2500, currentPrice: 999, emoji: "👖", rating: 4.5, reviews: 180, seller: "ডেনিম স্টোর", hotDeal: true, description: "স্টাইলিশ এবং আরামদায়ক জিন্স প্যান্ট।" },
    { id: 7, title: "স্নিকার শুজ", category: "ফ্যাশন", originalPrice: 3999, currentPrice: 1799, emoji: "👟", rating: 4.6, reviews: 290, seller: "শুজ পার্টনার", hotDeal: false, description: "আধুনিক ডিজাইনের আরামদায়ক স্নিকার শুজ।" },
    { id: 8, title: "স্প্রিং জ্যাকেট", category: "ফ্যাশন", originalPrice: 3500, currentPrice: 1499, emoji: "🧥", rating: 4.3, reviews: 120, seller: "আউটার ওয়্যার", hotDeal: true, description: "হালকা এবং স্টাইলিশ স্প্রিং জ্যাকেট।" },
    
    // বই
    { id: 9, title: "বাংলা সাহিত্য সংগ্রহ", category: "বই", originalPrice: 1500, currentPrice: 699, emoji: "📚", rating: 4.7, reviews: 85, seller: "বই পাঠাগার", hotDeal: false, description: "বাংলা সাহিত্যের সেরা রচনাগুলির সংগ্রহ।" },
    { id: 10, title: "প্রোগ্রামিং গাইড", category: "বই", originalPrice: 2000, currentPrice: 899, emoji: "💻", rating: 4.5, reviews: 160, seller: "টেক বুকস", hotDeal: true, description: "জাভাস্ক্রিপ্ট এবং ওয়েব ডেভেলপমেন্টের সম্পূর্ণ গাইড।" },
    { id: 11, title: "ইতিহাস পাঠ", category: "বই", originalPrice: 1800, currentPrice: 799, emoji: "🏛️", rating: 4.4, reviews: 95, seller: "ঐতিহাসিক তথ্য", hotDeal: false, description: "বিশ্ব ইতিহাসের গুরুত্বপূর্ণ ঘটনাগুলির বিস্তারিত বর্ণনা।" },
    { id: 12, title: "স্ব-উন্নয়ন বই", category: "বই", originalPrice: 1200, currentPrice: 499, emoji: "🌟", rating: 4.6, reviews: 220, seller: "মোটিভেশন হাব", hotDeal: true, description: "আপনার জীবন পরিবর্তনের জন্য অনুপ্রেরণামূলক বই।" },
    
    // খেলনা
    { id: 13, title: "বিল্ডিং ব্লকস", category: "খেলনা", originalPrice: 1500, currentPrice: 599, emoji: "🧱", rating: 4.5, reviews: 140, seller: "খেলনা স্বর্গ", hotDeal: false, description: "শিশুদের সৃজনশীলতা বিকাশের জন্য আদর্শ।" },
    { id: 14, title: "রোবট খেলনা", category: "খেলনা", originalPrice: 3999, currentPrice: 1499, emoji: "🤖", rating: 4.7, reviews: 180, seller: "স্মার্ট খেলনা", hotDeal: true, description: "ইন্টারঅ্যাক্টিভ এবং শিক্ষামূলক রোবট খেলনা।" },
    { id: 15, title: "পাজল গেম", category: "খেলনা", originalPrice: 800, currentPrice: 299, emoji: "🧩", rating: 4.3, reviews: 110, seller: "মস্তিষ্ক খেলা", hotDeal: false, description: "মানসিক দক্ষতা বৃদ্ধির জন্য মজাদার পাজল।" },
    { id: 16, title: "বোর্ড গেম", category: "খেলনা", originalPrice: 2000, currentPrice: 799, emoji: "🎲", rating: 4.4, reviews: 95, seller: "পরিবার খেলা", hotDeal: true, description: "পরিবারের সাথে মজার সময় কাটানোর জন্য।" },
    
    // হোম
    { id: 17, title: "LED লাইট বাল্ব", category: "হোম", originalPrice: 500, currentPrice: 199, emoji: "💡", rating: 4.4, reviews: 250, seller: "হোম লাইট", hotDeal: true, description: "শক্তি সাশ্রয়ী এবং দীর্ঘস্থায়ী LED বাল্ব।" },
    { id: 18, title: "কিচেন ন্যাপকিন", category: "হোম", originalPrice: 400, currentPrice: 99, emoji: "🧻", rating: 4.2, reviews: 180, seller: "হোম সাপ্লাই", hotDeal: false, description: "উচ্চমানের এবং টেকসই কিচেন ন্যাপকিন।" },
    { id: 19, title: "বিছানার চাদর", category: "হোম", originalPrice: 2500, currentPrice: 999, emoji: "🛏️", rating: 4.5, reviews: 160, seller: "কমফর্ট হোম", hotDeal: true, description: "নরম এবং আরামদায়ক বিছানার চাদর।" },
    { id: 20, title: "ডিনার সেট", category: "হোম", originalPrice: 3000, currentPrice: 1299, emoji: "🍽️", rating: 4.6, reviews: 120, seller: "রান্নাঘর স্টোর", hotDeal: false, description: "সুন্দর এবং টেকসই ডিনার সেট।" },
    
    // বিউটি
    { id: 21, title: "ফেস ওয়াশ", category: "বিউটি", originalPrice: 600, currentPrice: 249, emoji: "🧴", rating: 4.5, reviews: 310, seller: "বিউটি প্লাস", hotDeal: true, description: "ত্বকের জন্য নরম এবং কার্যকর ফেস ওয়াশ।" },
    { id: 22, title: "হেয়ার শ্যাম্পু", category: "বিউটি", originalPrice: 800, currentPrice: 399, emoji: "🧴", rating: 4.4, reviews: 220, seller: "হেয়ার কেয়ার", hotDeal: false, description: "চুলের স্বাস্থ্য বৃদ্ধির জন্য প্রাকৃতিক শ্যাম্পু।" },
    { id: 23, title: "লিপস্টিক কালেকশন", category: "বিউটি", originalPrice: 1200, currentPrice: 499, emoji: "💄", rating: 4.6, reviews: 180, seller: "লিপস বিউটি", hotDeal: true, description: "রঙিন এবং দীর্ঘস্থায়ী লিপস্টিক।" },
    { id: 24, title: "মেইকআপ ব্রাশ সেট", category: "বিউটি", originalPrice: 1500, currentPrice: 599, emoji: "🖌️", rating: 4.3, reviews: 140, seller: "মেইকআপ স্টুডিও", hotDeal: false, description: "পেশাদার মানের মেইকআপ ব্রাশ সেট।" }
];

// গ্লোবাল ভেরিয়েবল
let cart = [];
let filteredProducts = [...products];
let currentFilter = "সব";
let selectedModal = null;

// পেজ লোড হওয়ার সময়
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayProducts(products);
    setupEventListeners();
});

// ইভেন্ট লিসেনার সেটআপ
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterBySearch(e.target.value);
    });

    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}

// প্রোডাক্ট ডিসপ্লে করা
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">কোনো প্রোডাক্ট পাওয়া যাচ্ছি না</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => showModal(product);

        card.innerHTML = `
            <div class="product-image">
                ${product.emoji}
                ${product.hotDeal ? '<span class="hot-deal-badge">🔥 হট ডিল</span>' : ''}
                <span class="discount-badge">${discount}% ছাড়</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ⭐ ${product.rating} (${product.reviews} রিভিউ)
                </div>
                <div class="product-price">
                    <span class="current-price">৳ ${product.currentPrice.toLocaleString()}</span>
                    <span class="original-price">৳ ${product.originalPrice.toLocaleString()}</span>
                </div>
                <p class="seller">বিক্রেতা: ${product.seller}</p>
                <button class="add-btn" onclick="event.stopPropagation(); addToCart(${product.id})">কার্টে যোগ করুন</button>
                <button class="view-details-btn" onclick="event.stopPropagation(); showModal(${product.id})">বিস্তারিত দেখুন</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ক্যাটাগরি ফিল্টার
function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) btn.classList.add('active');
    });
    if (category === 'সব') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    displayProducts(filteredProducts);
}

// সার্চ ফিল্টার
function filterBySearch(searchTerm) {
    const search = searchTerm.toLowerCase();
    filteredProducts = products.filter(p => 
        p.title.toLowerCase().includes(search) || 
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.seller.toLowerCase().includes(search)
    );
    displayProducts(filteredProducts);
}

// প্রাইস ফিল্টার
function filterByPrice(maxPrice) {
    document.getElementById('priceValue').textContent = maxPrice.toLocaleString();
    filterProducts();
}

// সব ফিল্টার প্রয়োগ করা
function filterProducts() {
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    const rating4 = document.querySelectorAll('.filter-group input[type="checkbox"]')[0].checked;
    const hotDeal = document.querySelectorAll('.filter-group input[type="checkbox"]')[3].checked;

    let filtered = products.filter(p => {
        let pass = true;
        if (p.currentPrice > maxPrice) pass = false;
        if (rating4 && p.rating < 4) pass = false;
        if (hotDeal && !p.hotDeal) pass = false;
        if (currentFilter !== 'সব' && p.category !== currentFilter) pass = false;
        return pass;
    });
    displayProducts(filtered);
}

// রিসেট ফিল্টার
function resetFilters() {
    document.getElementById('priceRange').value = 50000;
    document.getElementById('priceValue').textContent = '50000';
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false);
    currentFilter = 'সব';
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.category-btn').classList.add('active');
    displayProducts(products);
}

// কার্টে যোগ করা
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
    showNotification('প্রোডাক্টটি কার্টে যোগ করা হয়েছে! ✅');
}

// কার্ট আপডেট করা
function updateCart() {
    saveCart();
    updateCartCount();
    displayCartItems();
}

// কার্ট কাউন্ট আপডেট
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// কার্ট আইটেম ডিসপ্লে
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">কার্ট খালি</p>';
        cartTotalDiv.textContent = '0';
        return;
    }
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.currentPrice * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">৳ ${(item.currentPrice * item.quantity).toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="remove-item-btn" onclick="removeFromCart(${index})">সরান</button>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
    cartTotalDiv.textContent = total.toLocaleString();
}

// কোয়ান্টিটি পরিবর্তন করা
function changeQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            updateCart();
        }
    }
}

// কার্ট থেকে সরানো
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('প্রোডাক্টটি কার্ট থেকে সরানো হয়েছে');
}

// কার্ট পরিষ্কার করা
function clearCart() {
    if (confirm('আপনি কার্ট পরিষ্কার করতে চান?')) {
        cart = [];
        updateCart();
        showNotification('কার্ট পরিষ্কার করা হয়েছে');
    }
}

// চেকআউট
function checkout() {
    if (cart.length === 0) {
        alert('কার্ট খালি! প্রথমে প্রোডাক্ট যোগ করুন।');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    alert(`✅ অর্ডার সফল!\n\nমোট: ৳ ${total.toLocaleString()}\n\n2-3 দিনে আপনার দোরগোড়ায় পৌঁছে যাবে।`);
    cart = [];
    updateCart();
    toggleCart();
}

// কার্ট টগল করা
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

// মডেল দেখানো
function showModal(product) {
    if (typeof product === 'number') {
        product = products.find(p => p.id === product);
    }
    if (!product) return;
    selectedModal = product;
    const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalImage').style.fontSize = '100px';
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalRating').textContent = `⭐ ${product.rating}`;
    document.getElementById('modalReviews').textContent = `(${product.reviews} রিভিউ)`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalOriginalPrice').textContent = `৳ ${product.originalPrice.toLocaleString()}`;
    document.getElementById('modalDiscountPrice').textContent = `৳ ${product.currentPrice.toLocaleString()}`;
    document.getElementById('modalDiscount').textContent = `${discount}% ছাড়`;
    document.getElementById('modalSeller').textContent = product.seller;
    document.getElementById('productModal').classList.add('open');
}

// মডেল বন্ধ করা
function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    selectedModal = null;
}

// মডেল থেকে কার্টে যোগ করা
function addToCartFromModal() {
    if (selectedModal) {
        addToCart(selectedModal.id);
        closeModal();
        toggleCart();
    }
}

// AI চ্যাটবট
const aiResponses = {
    'আলো': 'আমরা আপনার জন্য LED বাল্ব, ডেস্ক ল্যাম্প খুঁজে পেয়েছি।',
    'পোশাক': 'আমাদের কাছে টি-শার্ট, জিন্স, জ্যাকেট এবং আরও অনেক কিছু রয়েছে।',
    'বই': 'আমাদের বিশাল বই সংগ্রহ রয়েছে - প্রোগ্রামিং, ইতিহাস, সাহিত্য।',
    'খেলনা': 'শিশুদের জন্য আমাদের কাছে শিক্ষামূলক খেলনা রয়েছে।',
    'দাম': 'আমরা সব ধরনের বাজেটের জন্য পণ্য অফার করি।',
    'ছাড়': 'আমাদের আজকের হট ডিলে 70% পর্যন্ত ছাড় পাবেন! 🔥',
    'ডেলিভারি': 'আমরা 2-3 দিনে বিনামূল্যে ডেলিভারি প্রদান করি।',
    'পেমেন্ট': 'আমরা সব ধরনের পেমেন্ট পদ্ধতি গ্রহণ করি।'
};

function toggleChatbot() {
    document.getElementById('chatbotContainer').classList.toggle('open');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    const messagesDiv = document.getElementById('chatbotMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `<p>${message}</p>`;
    messagesDiv.appendChild(userMsg);
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    setTimeout(() => {
        let response = 'আমি বুঝতে পারলাম না। আপনি কি সাহায্য করতে পারেন? 🤔';
        for (let key in aiResponses) {
            if (message.toLowerCase().includes(key)) {
                response = aiResponses[key];
                break;
            }
        }
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        botMsg.innerHTML = `<p>${response}</p>`;
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
}

function showNotification(message) {
    alert(message);
}

// লোকাল স্টোরেজ থেকে কার্ট লোড করা
function loadCart() {
    const saved = localStorage.getItem('doriyaCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// লোকাল স্টোরেজে কার্ট সেভ করা
function saveCart() {
    localStorage.setItem('doriyaCart', JSON.stringify(cart));
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeModal();
    }
});
