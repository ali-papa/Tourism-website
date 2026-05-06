const hotelDetailsContainer = document.getElementById("hotelDetailsContainer");

const params = new URLSearchParams(window.location.search);

const destinationId = parseInt(params.get("destinationId"));
const hotelIndex = parseInt(params.get("hotelIndex"));

const destination = destinations.find(item => item.id === destinationId);
const hotels = hotelsByDestination[destinationId] || [];
const hotel = hotels[hotelIndex];

if (destination && hotel) {
    const featuresHTML = hotel.features.map(feature => `
        <li>${feature}</li>
    `).join("");

    hotelDetailsContainer.innerHTML = `
        <section class="details-section">
            <a href="details.html?id=${destination.id}" class="back-btn">← Back to ${destination.name}</a>
        </section>

        <section class="hotel-details-page">
            <div class="hotel-details-card">
                <img src="${hotel.image}" alt="${hotel.name}" class="hotel-details-image">

                <div class="hotel-details-info">
                    <h1>${hotel.name}</h1>
                    <p><strong>Destination:</strong> ${destination.name}, ${destination.country}</p>
                    <p><strong>Location:</strong> ${hotel.location}</p>
                    <p><strong>Rating:</strong> ${hotel.rating} ⭐</p>

                    <div class="hotel-details-price">
                        <h2>${hotel.price} ${hotel.currency}</h2>
                        <span>per night</span>
                    </div>

                    <a href="booking.html?id=${destination.id}" class="book-btn">
                        Continue Booking
                    </a>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>Hotel Facilities</h2>
            <ul class="details-list">
                ${featuresHTML}
            </ul>
        </section>

        <section class="details-section">
            <h2>About this Hotel</h2>
            <p>
                ${hotel.name} is located in ${hotel.location}. 
                It is a great choice for travelers visiting ${destination.name}. 
                The hotel offers comfortable rooms, good services, and easy access to nearby attractions.
            </p>
        </section>

        <section class="details-section">
            <h2>Hotel Policies</h2>
            <div class="policy-grid">
                <div class="policy-item">
                    <h4>Check-in</h4>
                    <p>${destination.policies.checkIn}</p>
                </div>

                <div class="policy-item">
                    <h4>Check-out</h4>
                    <p>${destination.policies.checkOut}</p>
                </div>

                <div class="policy-item">
                    <h4>Pets</h4>
                    <p>${destination.policies.pets}</p>
                </div>

                <div class="policy-item">
                    <h4>Children</h4>
                    <p>${destination.policies.children}</p>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>Nearby Places</h2>
            <ul class="details-list">
                ${destination.nearbyPlaces.map(place => `<li>${place}</li>`).join("")}
            </ul>
        </section>
    `;
} else {
    hotelDetailsContainer.innerHTML = `
        <div class="not-found">
            <h2>Hotel not found</h2>
            <a href="index.html" class="back-btn">Back Home</a>
        </div>
    `;
}