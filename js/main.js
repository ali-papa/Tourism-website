function scrollToDestinations() {
    const section = document.getElementById("destinationsSection");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

const container = document.getElementById("cardsContainer");

function goToDetails(id) {
    window.location.href = "details.html?id=" + id;
}

destinations.forEach(place => {
    const card = `
        <div class="card" onclick="goToDetails(${place.id})">
            <img src="${place.image}" alt="${place.name}">
            <h3>${place.name}, ${place.country}</h3>
            <p>${place.shortDescription}</p>

            <div class="price-box">
                <h4>${place.price} ${place.currency}</h4>
                <span>avg per night</span>
            </div>

            <a href="details.html?id=${place.id}" class="details-btn">View Details</a>
        </div>
    `;

    container.innerHTML += card;
});