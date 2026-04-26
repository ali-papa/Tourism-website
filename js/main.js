function showMessage() {
    alert("Welcome to Egypt Tourism!");
}

const container = document.getElementById("cardsContainer");

destinations.forEach(place => {
    const card = `
        <div class="card">
            <img src="${place.image}" alt="${place.name}">
            <h3>${place.name}, ${place.country}</h3>
            <p>Beautiful place to visit</p>
            <a href="details.html?id=${place.id}" class="details-btn">View Details</a>
        </div>
    `;

    container.innerHTML += card;
});