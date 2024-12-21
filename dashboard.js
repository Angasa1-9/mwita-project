// Dashboard functionality
class Dashboard {
    constructor() {
        this.initializeComponents();
        this.attachEventListeners();
        this.loadWalletData();
        this.initializeTradeStats();
    }

    initializeComponents() {
        // Referral link components
        this.referralInput = document.querySelector('.referral-link input');
        this.copyButton = document.querySelector('.copy-btn');

        // Security alert components
        this.securityAlert = document.querySelector('.security-alert');
        this.closeAlertButton = document.querySelector('.security-alert .close-btn');

        // Wallet components
        this.walletList = document.querySelector('.wallet-list');
        this.showMoreButton = document.querySelector('.show-more');

        // User menu components
        this.userMenu = document.querySelector('.user-profile');
        
        // Trading stats
        this.tradingStats = {
            openOrder: document.querySelector('[data-stat="open-order"]'),
            completedOrder: document.querySelector('[data-stat="completed-order"]'),
            canceledOrder: document.querySelector('[data-stat="canceled-order"]'),
            totalTrade: document.querySelector('[data-stat="total-trade"]')
        };
    }

    attachEventListeners() {
        // Copy referral link
        this.copyButton.addEventListener('click', () => this.copyReferralLink());

        // Close security alert
        if (this.closeAlertButton) {
            this.closeAlertButton.addEventListener('click', () => this.hideSecurityAlert());
        }

        // Show more wallet items
        if (this.showMoreButton) {
            this.showMoreButton.addEventListener('click', () => this.toggleWalletList());
        }

        // User menu dropdown
        if (this.userMenu) {
            this.userMenu.addEventListener('click', () => this.toggleUserMenu());
        }

        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });
    }

    // Copy referral link to clipboard
    async copyReferralLink() {
        try {
            await navigator.clipboard.writeText(this.referralInput.value);
            this.showToast('Referral link copied to clipboard!');
        } catch (err) {
            this.showToast('Failed to copy referral link', 'error');
        }
    }

    // Hide security alert
    hideSecurityAlert() {
        this.securityAlert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            this.securityAlert.style.display = 'none';
        }, 300);
    }

    // Load wallet data
    async loadWalletData() {
        try {
            // Simulate API call
            const walletData = await this.fetchWalletData();
            this.updateWalletDisplay(walletData);
        } catch (error) {
            this.showToast('Failed to load wallet data', 'error');
        }
    }

    // Simulate wallet data fetch
    async fetchWalletData() {
        // This would be replaced with actual API call
        return [
            { currency: 'UGX', name: 'Ugandan Shilling', balance: '0.0000', icon: 'ugx.png' },
            { currency: 'ETH', name: 'Ethereum', balance: '0.0000', icon: 'eth.png' },
            { currency: 'USDT', name: 'Tether', balance: '0.0000', icon: 'usdt.png' }
        ];
    }

    // Update wallet display
    updateWalletDisplay(walletData) {
        this.walletList.innerHTML = walletData.map(wallet => `
            <div class="wallet-item">
                <img src="assets/img/currencies/${wallet.icon}" alt="${wallet.currency}">
                <div class="currency-info">
                    <span class="currency-name">${wallet.name}</span>
                    <span class="currency-code">${wallet.currency}</span>
                </div>
                <span class="balance">${wallet.balance}</span>
            </div>
        `).join('');
    }

    // Initialize trading statistics
    initializeTradeStats() {
        // This would be replaced with actual API data
        const stats = {
            openOrder: 0,
            completedOrder: 0,
            canceledOrder: 0,
            totalTrade: 0
        };

        this.updateTradeStats(stats);
    }

    // Update trading statistics
    updateTradeStats(stats) {
        Object.keys(stats).forEach(key => {
            if (this.tradingStats[key]) {
                this.tradingStats[key].textContent = stats[key];
            }
        });
    }

    // Toggle wallet list expansion
    toggleWalletList() {
        const walletItems = this.walletList.querySelectorAll('.wallet-item');
        walletItems.forEach((item, index) => {
            if (index > 2) {
                item.style.display = item.style.display === 'none' ? 'flex' : 'none';
            }
        });
        this.showMoreButton.textContent = 
            this.showMoreButton.textContent === 'Show More' ? 'Show Less' : 'Show More';
    }

    // Handle sidebar navigation
    handleNavigation(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        // Add navigation logic here
    }

    // Toast notification system
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Add these styles to your CSS
const toastStyles = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 4px;
        color: white;
        animation: slideIn 0.3s ease forwards;
        z-index: 1000;
    }

    .toast.success {
        background: var(--success-color);
    }

    .toast.error {
        background: var(--warning-color);
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add toast styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = toastStyles;
    document.head.appendChild(styleSheet);

    // Initialize dashboard
    const dashboard = new Dashboard();
}); 