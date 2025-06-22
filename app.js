// TastyBites Express - JavaScript functionality

// Application data
const appData = {
  "restaurant": {
    "name": "TastyBites Express",
    "tagline": "Delicious Food Delivered Fast",
    "phone": "+1 (555) 123-FOOD",
    "email": "orders@tastybites.com",
    "deliveryTime": "30-45 mins",
    "minimumOrder": 15,
    "deliveryFee": 2.99
  },
  "categories": [
    {"id": 1, "name": "Pizza", "icon": "🍕", "image": "pizza-category.jpg"},
    {"id": 2, "name": "Burgers", "icon": "🍔", "image": "burger-category.jpg"},
    {"id": 3, "name": "Asian", "icon": "🍜", "image": "asian-category.jpg"},
    {"id": 4, "name": "Healthy", "icon": "🥗", "image": "healthy-category.jpg"},
    {"id": 5, "name": "Desserts", "icon": "🍰", "image": "dessert-category.jpg"},
    {"id": 6, "name": "Beverages", "icon": "🥤", "image": "beverage-category.jpg"}
  ],
  "menuItems": [
    {
      "id": 1, "name": "Margherita Pizza", "category": "Pizza", "price": 14.99, "originalPrice": 16.99,
      "description": "Fresh mozzarella, tomato sauce, and basil on thin crust",
      "image": "margherita-pizza.jpg", "rating": 4.8, "preparationTime": "20-25 mins",
      "dietary": ["vegetarian"], "spiceLevel": "mild",
      "customizations": {
        "size": [{"name": "Small", "price": 0}, {"name": "Medium", "price": 3}, {"name": "Large", "price": 6}],
        "crust": [{"name": "Thin", "price": 0}, {"name": "Thick", "price": 2}],
        "toppings": [{"name": "Extra Cheese", "price": 2}, {"name": "Mushrooms", "price": 1.5}]
      }
    },
    {
      "id": 2, "name": "Classic Cheeseburger", "category": "Burgers", "price": 12.99,
      "description": "Beef patty with cheese, lettuce, tomato, and special sauce",
      "image": "cheeseburger.jpg", "rating": 4.6, "preparationTime": "15-20 mins",
      "dietary": [], "spiceLevel": "mild",
      "customizations": {
        "patty": [{"name": "Beef", "price": 0}, {"name": "Chicken", "price": 0}, {"name": "Veggie", "price": 0}],
        "additions": [{"name": "Bacon", "price": 2}, {"name": "Avocado", "price": 1.5}]
      }
    },
    {
      "id": 3, "name": "Chicken Teriyaki Bowl", "category": "Asian", "price": 13.99,
      "description": "Grilled chicken with teriyaki sauce, steamed rice, and vegetables",
      "image": "teriyaki-bowl.jpg", "rating": 4.7, "preparationTime": "18-22 mins",
      "dietary": ["gluten-free-option"], "spiceLevel": "mild"
    },
    {
      "id": 4, "name": "Caesar Salad", "category": "Healthy", "price": 10.99,
      "description": "Crisp romaine lettuce, parmesan cheese, croutons, and caesar dressing",
      "image": "caesar-salad.jpg", "rating": 4.4, "preparationTime": "10-15 mins",
      "dietary": ["vegetarian"], "spiceLevel": "none"
    },
    {
      "id": 5, "name": "Chocolate Brownie", "category": "Desserts", "price": 6.99,
      "description": "Rich chocolate brownie served warm with vanilla ice cream",
      "image": "chocolate-brownie.jpg", "rating": 4.9, "preparationTime": "5-10 mins",
      "dietary": ["vegetarian"], "spiceLevel": "none"
    },
    {
      "id": 6, "name": "Fresh Orange Juice", "category": "Beverages", "price": 4.99,
      "description": "Freshly squeezed orange juice, no added sugar",
      "image": "orange-juice.jpg", "rating": 4.5, "preparationTime": "2-5 mins",
      "dietary": ["vegan", "gluten-free"], "spiceLevel": "none"
    }
  ],
  "testimonials": [
    {
      "name": "Sarah Johnson", "rating": 5, "comment": "Amazing food and super fast delivery! The pizza was still hot when it arrived.",
      "avatar": "customer1.jpg", "date": "2025-06-20"
    },
    {
      "name": "Mike Chen", "rating": 5, "comment": "Best burger I've had in years. The chatbot made ordering so easy!",
      "avatar": "customer2.jpg", "date": "2025-06-19"
    },
    {
      "name": "Emma Davis", "rating": 4, "comment": "Great healthy options. Love that they show all the nutritional information.",
      "avatar": "customer3.jpg", "date": "2025-06-18"
    }
  ],
  "chatbotSamples": [
    {"type": "user", "message": "Hello"},
    {"type": "bot", "message": "Welcome to TastyBites Express! I'm here to help you order delicious food. Would you like to see our menu or do you have any questions?"},
    {"type": "user", "message": "Show me your pizza menu"},
    {"type": "bot", "message": "Here are our popular pizzas: Margherita Pizza ($14.99), Pepperoni Pizza ($16.99), Veggie Supreme ($15.99). Would you like to add any of these to your cart?"},
    {"type": "user", "message": "I want 2 large margherita pizzas for delivery"},
    {"type": "bot", "message": "Great choice! I've added 2 Large Margherita Pizzas to your cart. That's $41.98 ($20.99 each). For delivery, I'll need your address. What's your delivery address?"}
  ]
};

// Application state
let cart = [];
let currentFilter = 'all';
let currentView = 'home';
let chatMessages = [];

// DOM Elements
const cartSidebar = document.getElementById('cartSidebar');
const cartContent = document.getElementById('cartContent');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.querySelector('.cart-count');
const checkoutModal = document.getElementById('checkoutModal');
const chatWindow = document.getElementById('chatWindow');
const searchInput = document.getElementById('searchInput');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderCategories();
    renderFeaturedItems();
    renderMenu();
    renderReviews();
    setupEventListeners();
    updateCartDisplay();
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveFilter(this.dataset.category);
        });
    });
    
    // Order type selection
    document.querySelectorAll('input[name="orderType"]').forEach(radio => {
        radio.addEventListener('change', updateCartTotals);
    });
    
    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
    
    // Chat input
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Category rendering
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = appData.categories.map(category => `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-card__icon">${category.icon}</div>
            <h3>${category.name}</h3>
        </div>
    `).join('');
}

// Featured items rendering
function renderFeaturedItems() {
    const grid = document.getElementById('featuredGrid');
    const featuredItems = appData.menuItems.slice(0, 6);
    grid.innerHTML = featuredItems.map(item => createMenuItemHTML(item)).join('');
}

// Menu rendering
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    let itemsToShow = appData.menuItems;
    
    if (currentFilter !== 'all') {
        itemsToShow = appData.menuItems.filter(item => item.category === currentFilter);
    }
    
    grid.innerHTML = itemsToShow.map(item => createMenuItemHTML(item)).join('');
}

// Create menu item HTML
function createMenuItemHTML(item) {
    const categoryIcon = appData.categories.find(cat => cat.name === item.category)?.icon || '🍽️';
    const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));
    
    return `
        <div class="menu-item fade-in">
            <div class="menu-item__image">${categoryIcon}</div>
            <div class="menu-item__content">
                <div class="menu-item__header">
                    <h3 class="menu-item__title">${item.name}</h3>
                    <div class="menu-item__price">
                        <span class="current-price">$${item.price.toFixed(2)}</span>
                        ${item.originalPrice ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                </div>
                <p class="menu-item__description">${item.description}</p>
                <div class="menu-item__meta">
                    <div class="rating">
                        <span>${stars}</span>
                        <span>${item.rating}</span>
                    </div>
                    <span>⏱️ ${item.preparationTime}</span>
                </div>
                ${item.dietary && item.dietary.length > 0 ? `
                    <div class="dietary-tags">
                        ${item.dietary.map(tag => `<span class="dietary-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="menu-item__actions">
                    <button class="btn btn--primary btn--add-cart" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                    ${item.customizations ? `<button class="btn--customize" onclick="showCustomizations(${item.id})">⚙️</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Reviews rendering
function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    grid.innerHTML = appData.testimonials.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.name.charAt(0)}</div>
                <div class="review-info">
                    <h4>${review.name}</h4>
                    <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
            </div>
            <p class="review-comment">"${review.comment}"</p>
        </div>
    `).join('');
}

// Navigation functions
function showMenu() {
    document.getElementById('home').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.featured').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    document.querySelector('.reviews').style.display = 'none';
    document.getElementById('menu').classList.remove('hidden');
    currentView = 'menu';
}

function showHome() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('home').style.display = 'block';
    document.querySelector('.categories').style.display = 'block';
    document.querySelector('.featured').style.display = 'block';
    document.querySelector('.how-it-works').style.display = 'block';
    document.querySelector('.reviews').style.display = 'block';
    currentView = 'home';
}

function filterByCategory(category) {
    showMenu();
    setActiveFilter(category);
}

function setActiveFilter(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderMenu();
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const menuGrid = document.getElementById('menuGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    
    if (query.length === 0) {
        if (currentView === 'menu') {
            renderMenu();
        } else {
            renderFeaturedItems();
        }
        return;
    }
    
    const filteredItems = appData.menuItems.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    
    const targetGrid = currentView === 'menu' ? menuGrid : featuredGrid;
    targetGrid.innerHTML = filteredItems.map(item => createMenuItemHTML(item)).join('');
    
    if (filteredItems.length === 0) {
        targetGrid.innerHTML = '<p>No items found matching your search.</p>';
    }
}

// Cart functionality
function addToCart(itemId, customizations = {}) {
    const item = appData.menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const cartItem = {
        id: itemId,
        name: item.name,
        price: item.price,
        quantity: 1,
        customizations: customizations
    };
    
    // Check if item already exists in cart
    const existingItem = cart.find(i => i.id === itemId && JSON.stringify(i.customizations) === JSON.stringify(customizations));
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    updateCartDisplay();
    showNotification(`${item.name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    updateCartCount();
    updateCartContent();
    updateCartTotals();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateCartContent() {
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart__empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn--primary" onclick="showMenu(); toggleCart();">Browse Menu</button>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }
    
    cartContent.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item__info">
                <div class="cart-item__name">${item.name}</div>
                <div class="cart-item__price">$${item.price.toFixed(2)} each</div>
                <div class="cart-item__controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    cartFooter.style.display = 'block';
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const isDelivery = document.querySelector('input[name="orderType"]:checked')?.value === 'delivery';
    const deliveryFee = isDelivery ? appData.restaurant.deliveryFee : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartDeliveryFee').textContent = isDelivery ? `$${deliveryFee.toFixed(2)}` : 'Free';
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
    
    // Update delivery address visibility in checkout
    const deliveryAddress = document.querySelector('.delivery-address');
    if (deliveryAddress) {
        deliveryAddress.style.display = isDelivery ? 'block' : 'none';
        deliveryAddress.querySelector('textarea').required = isDelivery;
    }
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Checkout functionality
function showCheckout() {
    if (cart.length === 0) return;
    
    // Update checkout items summary
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    updateCartTotals();
    checkoutModal.classList.add('open');
    toggleCart();
}

function closeCheckout() {
    checkoutModal.classList.remove('open');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    // Simulate order processing
    showNotification('Order placed successfully! You will receive a confirmation shortly.', 'success');
    
    // Clear cart and close modal
    cart = [];
    updateCartDisplay();
    closeCheckout();
    
    // Reset form
    e.target.reset();
}

// Chatbot functionality
function toggleChat() {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open') && chatMessages.length === 0) {
        initializeChatbot();
    }
}

function initializeChatbot() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = `
        <div class="message bot-message">
            <p>Welcome to TastyBites Express! I'm here to help you order delicious food. Would you like to see our menu or do you have any questions?</p>
        </div>
    `;
    chatMessages = [
        {type: 'bot', message: 'Welcome to TastyBites Express! I\'m here to help you order delicious food. Would you like to see our menu or do you have any questions?'}
    ];
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage('bot', response);
    }, 1000);
}

function addChatMessage(type, message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    chatMessages.push({type, message});
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('menu') || message.includes('food')) {
        return "Here are our popular categories: Pizza 🍕, Burgers 🍔, Asian 🍜, Healthy 🥗, Desserts 🍰, and Beverages 🥤. Would you like to see items from any specific category?";
    } else if (message.includes('pizza')) {
        return "Our Margherita Pizza is very popular at $14.99! It has fresh mozzarella, tomato sauce, and basil. Would you like to add it to your cart?";
    } else if (message.includes('delivery') || message.includes('time')) {
        return `Our delivery time is ${appData.restaurant.deliveryTime} and delivery fee is $${appData.restaurant.deliveryFee}. Free delivery on orders over $25!`;
    } else if (message.includes('order') || message.includes('cart')) {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (itemCount > 0) {
            return `You have ${itemCount} items in your cart. Would you like to proceed to checkout or add more items?`;
        } else {
            return "Your cart is empty. Would you like me to show you our menu so you can start ordering?";
        }
    } else if (message.includes('hello') || message.includes('hi')) {
        return "Hello! Welcome to TastyBites Express. How can I help you today? I can show you our menu, help with orders, or answer any questions!";
    } else if (message.includes('help')) {
        return "I can help you with: viewing our menu, adding items to cart, checking delivery times, and answering questions about our food. What would you like to know?";
    } else {
        return "I'd be happy to help! You can ask me about our menu, delivery times, or how to place an order. What would you like to know?";
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: var(--color-success);
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showCustomizations(itemId) {
    const item = appData.menuItems.find(i => i.id === itemId);
    if (!item || !item.customizations) return;
    
    showNotification('Customization options will be available in the full version!');
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);