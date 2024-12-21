// Live Crypto Price Updates
class CryptoPriceTracker {
    constructor() {
        this.prices = {};
        this.websocket = null;
        this.cryptoCards = document.querySelectorAll('.crypto-card');
    }

    // Initialize WebSocket connection
    init() {
        // Using Binance WebSocket API for real-time price updates
        this.websocket = new WebSocket('wss://stream.binance.com:9443/ws');
        
        this.websocket.onopen = () => {
            // Subscribe to multiple crypto pairs
            const subscribeMsg = {
                method: "SUBSCRIBE",
                params: [
                    "btcusdt@ticker",
                    "bnbusdt@ticker",
                    "ethusdt@ticker",
                    "xrpusdt@ticker"
                ],
                id: 1
            };
            this.websocket.send(JSON.stringify(subscribeMsg));
        };

        this.websocket.onmessage = (event) => {
            this.handlePriceUpdate(JSON.parse(event.data));
        };
    }

    // Update price displays
    handlePriceUpdate(data) {
        if (data.s && data.c) { // Symbol and Close price
            const symbol = data.s.replace('USDT', '');
            const price = parseFloat(data.c).toFixed(2);
            const priceChange = parseFloat(data.P).toFixed(2); // 24h price change percent

            const card = document.querySelector(`[data-symbol="${symbol}"]`);
            if (card) {
                const priceElement = card.querySelector('.price');
                const changeElement = card.querySelector('.change');

                // Animate price changes
                this.animatePriceChange(priceElement, this.prices[symbol], price);
                
                // Update price and change percentage
                priceElement.textContent = `${price} $`;
                changeElement.textContent = `${priceChange}%`;
                changeElement.className = `change ${priceChange >= 0 ? 'positive' : 'negative'}`;

                this.prices[symbol] = price;
            }
        }
    }

    animatePriceChange(element, oldPrice, newPrice) {
        if (oldPrice) {
            element.classList.add(newPrice > oldPrice ? 'price-up' : 'price-down');
            setTimeout(() => element.classList.remove('price-up', 'price-down'), 1000);
        }
    }
}

// Navigation and UI
class UI {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.navbar = document.querySelector('.navbar');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.chatButton = document.querySelector('.chat-button');
        
        this.init();
    }

    init() {
        // Theme Toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Mobile Menu
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => this.handleNavbarScroll());

        // Chat Widget
        if (this.chatButton) {
            this.chatButton.addEventListener('click', () => this.openChat());
        }

        // Smooth Scroll for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const icon = this.themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }

    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.mobileMenuBtn.classList.toggle('active');
    }

    handleNavbarScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    openChat() {
        // Implement your chat widget logic here
        console.log('Chat widget clicked');
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Add these styles to your CSS file
const additionalStyles = `
    /* Price change animations */
    .price-up {
        animation: priceUp 1s ease-out;
        color: #00ff88;
    }

    .price-down {
        animation: priceDown 1s ease-out;
        color: #ff4444;
    }

    @keyframes priceUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes priceDown {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    /* Mobile menu styles */
    .mobile-menu-btn {
        display: none;
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }

        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: var(--nav-height);
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.9);
            padding: 1rem;
        }
    }
`;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create style element for additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // Initialize classes
    const ui = new UI();
    const priceTracker = new CryptoPriceTracker();
    priceTracker.init();

    // Add mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('.navbar').appendChild(mobileBtn);
    }

    // Get login button
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // Redirect to dashboard page
            window.location.href = 'dashboard.html';
        });
    }
}); 