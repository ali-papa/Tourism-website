const detailsContainer = document.getElementById("detailsContainer");

const params = new URLSearchParams(window.location.search);
const destinationId = parseInt(params.get("id"));

const destination = destinations.find(item => item.id === destinationId);

if (destination) {
    const galleryHTML = destination.gallery.map(img => `
        <img src="${img}" alt="${destination.name}" class="gallery-image">
    `).join("");

    const highlightsHTML = destination.highlights.map(item => `
        <li>${item}</li>
    `).join("");

    const accessibilityHTML = destination.accessibility.map(item => `
        <li>${item}</li>
    `).join("");

    const nearbyHTML = destination.nearbyPlaces.map(place => `
        <li>${place}</li>
    `).join("");

    const hotels = hotelsByDestination[destination.id] || [];

    const hotelsHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">

            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p><strong>Location:</strong> ${hotel.location}</p>
                <p><strong>Rating:</strong> ${hotel.rating} ⭐</p>

                <ul>
                    ${hotel.features.map(feature => `<li>${feature}</li>`).join("")}
                </ul>

                <div class="hotel-price">
                    <h4>${hotel.price} ${hotel.currency}</h4>
                    <span>per night</span>
                </div>

                <a href="booking.html?id=${destination.id}" class="book-btn">Book Hotel</a>
            </div>
        </div>
    `).join("");

    detailsContainer.innerHTML = `
        <section class="details-hero">
            <div class="details-card">
                <div class="details-main-image">
                    <img src="${destination.image}" alt="${destination.name}" class="details-image">
                </div>

                <div class="details-info">
                    <h1>${destination.name}</h1>
                    <p><strong>Country:</strong> ${destination.country}</p>
                    <p><strong>Category:</strong> ${destination.category}</p>
                    <p><strong>Rating:</strong> ${destination.rating} ⭐</p>
                    <p><strong>Short Description:</strong> ${destination.shortDescription}</p>
                    <p><strong>Description:</strong> ${destination.description}</p>

                    <div class="price-box">
                        <h3>${destination.price} ${destination.currency}</h3>
                        <span>avg per night</span>
                    </div>

                    <div class="details-actions">
                        <a href="booking.html?id=${destination.id}" class="book-btn">Book Now</a>
                        <a href="search.html" class="back-btn">Back to Search</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>Gallery</h2>
            <div class="gallery-grid">
                ${galleryHTML}
            </div>
        </section>

        <section class="details-section">
            <h2>Video</h2>
            <div class="video-box">
                <video controls class="details-video">
                   <source src="${destination.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>

        <section class="details-section location-section">
            <div class="location-info">
                <h2>Location</h2>
                <p>${destination.location.address}</p>
                <a href="${destination.location.mapLink}" target="_blank" class="map-btn">View on Map</a>
            </div>
        </section>

        <section class="details-section">
            <h2>Available Hotels</h2>
            <div class="hotels-grid">
                ${hotelsHTML}
            </div>
        </section>

        <section class="details-section">
            <h2>Highlights</h2>
            <ul class="details-list">
                ${highlightsHTML}
            </ul>
        </section>

        <section class="details-section">
            <h2>Accessibility</h2>
            <ul class="details-list">
                ${accessibilityHTML}
            </ul>
        </section>

        <section class="details-section">
            <h2>Policies</h2>
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
                ${nearbyHTML}
            </ul>
        </section>
    `;
} else {
    detailsContainer.innerHTML = `
        <div class="not-found">
            <h2>Destination not found</h2>
            <a href="search.html" class="back-btn">Back to Search</a>
        </div>
    `;
}