// ============================
// MAIN.JS - HOME PAGE
// ============================

function scrollToDestinations() {
    const section = document.getElementById("destinationsSection");
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function goToDetails(id) {
    window.location.href = "details.html?id=" + id;
}

function renderDestinations(list) {
    const container = document.getElementById("cardsContainer");
    if (!container) return;

    container.innerHTML = '';

    list.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => goToDetails(place.id);

        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <h3>${place.name}, ${place.country}</h3>
            <p>${place.shortDescription}</p>
            <div class="price-box">
                <h4 data-price-usd="${place.price}">
                    ${getCurrencySymbol()} ${convertPrice(place.price).toLocaleString()}
                </h4>
                <span>avg per night</span>
            </div>
            <a href="details.html?id=${place.id}" class="details-btn" onclick="event.stopPropagation()">View Details</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderDestinations(destinations);
});