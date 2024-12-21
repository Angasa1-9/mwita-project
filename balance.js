class BalanceManager {
    constructor() {
        this.balanceContainer = document.getElementById('balances');
        this.updateInterval = null;
        this.initialize();
    }

    async initialize() {
        await this.updateBalances();
        this.startBalanceUpdates();
        this.attachEventListeners();
    }

    async updateBalances() {
        try {
            const response = await fetch('http://localhost:5000/api/user/balances', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            const balances = await response.json();
            this.renderBalances(balances);
        } catch (error) {
            console.error('Balance update failed:', error);
        }
    }

    renderBalances(balances) {
        this.balanceContainer.innerHTML = Object.entries(balances)
            .map(([currency, amount]) => `
                <div class="balance-item">
                    <span class="currency">${currency}</span>
                    <span class="amount">${amount.toFixed(8)}</span>
                </div>
            `).join('');
    }

    startBalanceUpdates() {
        this.updateInterval = setInterval(() => this.updateBalances(), 10000);
    }

    stopBalanceUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    attachEventListeners() {
        document.addEventListener('newTrade', () => this.updateBalances());
    }
} 