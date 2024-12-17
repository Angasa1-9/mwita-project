document.addEventListener("DOMContentLoaded", function() {
    // Fetch live cryptocurrency data (example: from CoinGecko API)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        const prices = data;
        const cryptoPricesDiv = document.getElementById('crypto-prices');
        
        for (const [coin, info] of Object.entries(prices)) {
            const coinDiv = document.createElement('div');
            coinDiv.innerHTML = `<p>${coin.toUpperCase()}: $${info.usd}</p>`;
            cryptoPricesDiv.appendChild(coinDiv);
        }
    })
    .catch(error => {
        console.error('Error fetching crypto data:', error);
    });
});
