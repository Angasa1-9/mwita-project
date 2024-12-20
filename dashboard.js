document.addEventListener('DOMContentLoaded', function() {
    // Close wallet overview
    const closeBtn = document.querySelector('.close-btn');
    const walletOverview = document.querySelector('.wallet-overview');
    
    if (closeBtn && walletOverview) {
        closeBtn.addEventListener('click', () => {
            walletOverview.style.display = 'none';
        });
    }
    
    // Show more functionality
    const showMoreBtn = document.querySelector('.show-more-btn');
    const cryptoBalances = document.querySelector('.crypto-balances');
    
    if (showMoreBtn && cryptoBalances) {
        showMoreBtn.addEventListener('click', () => {
            cryptoBalances.classList.toggle('show-all');
            showMoreBtn.innerHTML = cryptoBalances.classList.contains('show-all') 
                ? '<i class="fas fa-chevron-up"></i> Show Less'
                : '<i class="fas fa-chevron-down"></i> Show More';
        });
    }
}); 