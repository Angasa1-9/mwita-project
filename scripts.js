document.addEventListener("DOMContentLoaded", function() {
    // Fetch live cryptocurrency data (example: from CoinGecko API)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,binancecoin&vs_currencies=usd&include_24hr_change=true')
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

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,binancecoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        updatePrices(data);
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

function updatePrices(data) {
    // Update BTC price
    document.querySelector('.btc .price').textContent = `${data.bitcoin.usd.toFixed(2)} $`;
    document.querySelector('.btc .change').textContent = `${data.bitcoin.usd_24h_change.toFixed(2)}%`;
    
    // Add similar updates for other cryptocurrencies
}

// Update prices every 30 seconds
setInterval(fetchCryptoPrices, 30000);
fetchCryptoPrices();
