// ============================
// CURRENCY CONVERTER - GLOBAL
// ============================

const EXCHANGE_RATES = {
    USD: 1,
    EGP: 49.5,
    EUR: 0.92,
    GBP: 0.79,
    AED: 3.67,
    SAR: 3.75
};

const CURRENCY_SYMBOLS = {
    USD: "$",
    EGP: "EGP",
    EUR: "€",
    GBP: "£",
    AED: "AED",
    SAR: "SAR"
};

function getSelectedCurrency() {
    return localStorage.getItem('selectedCurrency') || 'USD';
}

function setSelectedCurrency(currency) {
    localStorage.setItem('selectedCurrency', currency);
}

function convertPrice(priceInUSD) {
    const currency = getSelectedCurrency();
    const rate = EXCHANGE_RATES[currency] || 1;
    return Math.round(priceInUSD * rate);
}

function getCurrencySymbol() {
    return CURRENCY_SYMBOLS[getSelectedCurrency()] || '$';
}

function handleCurrencyChange(newCurrency) {
    setSelectedCurrency(newCurrency);
    refreshPricesOnPage();
}

function refreshPricesOnPage() {
    const symbol = getCurrencySymbol();
    document.querySelectorAll('[data-price-usd]').forEach(el => {
        const usdPrice = parseFloat(el.getAttribute('data-price-usd'));
        el.textContent = `${symbol} ${convertPrice(usdPrice).toLocaleString()}`;
    });
}

// سيت الـ select على القيمة المحفوظة في localStorage
function initCurrencySelector() {
    const select = document.getElementById('globalCurrencySelect');
    if (select) {
        select.value = getSelectedCurrency();
    }
    refreshPricesOnPage();
}

document.addEventListener('DOMContentLoaded', initCurrencySelector);