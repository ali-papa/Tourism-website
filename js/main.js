// ============================
// MAIN.JS - HOME PAGE
// ============================

function scrollToDestinations() {
    const section = document.getElementById("destinationsSection");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToDetails(id) {
    window.location.href = "details.html?id=" + id;
}

function getLocalizedField(place, field) {
    const lang = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('lang') || 'en');
    if (lang === 'ar' && place[field + '_ar']) return place[field + '_ar'];
    return place[field];
}

function renderDestinations(list) {
    const container = document.getElementById("cardsContainer");
    if (!container) return;

    container.innerHTML = '';
    const lang = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('lang') || 'en');

    list.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => goToDetails(place.id);

        const name = lang === 'ar' && place.name_ar ? place.name_ar : place.name;
        const country = lang === 'ar' && place.country_ar ? place.country_ar : place.country;
        const shortDesc = getLocalizedField(place, 'shortDescription');

        card.innerHTML = `
            <img src="${place.image}" alt="${name}">
            <h3>${name}, ${country}</h3>
            <p>${shortDesc}</p>
            <div class="price-box">
                <h4 data-price-usd="${place.price}">
                    ${getCurrencySymbol()} ${convertPrice(place.price).toLocaleString()}
                </h4>
                <span>${(typeof t === 'function') ? t('avg_per_night') : 'avg per night'}</span>
            </div>
            <a href="details.html?id=${place.id}" class="details-btn" onclick="event.stopPropagation()">${(typeof t === 'function') ? t('view_details') : 'View Details'}</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderDestinations(destinations);
});

document.addEventListener('langChanged', function () {
    renderDestinations(destinations);
});
