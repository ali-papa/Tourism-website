const hotelDetailsContainer = document.getElementById("hotelDetailsContainer");

const params = new URLSearchParams(window.location.search);

const destinationId = parseInt(params.get("destinationId"));
const hotelIndex = parseInt(params.get("hotelIndex"));

const destination = destinations.find(item => item.id === destinationId);
const hotels = hotelsByDestination[destinationId] || [];
const hotel = hotels[hotelIndex];

function createMapEmbed(address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function getReviewScore(rating) {
    return (rating * 2).toFixed(1);
}

function getReviewText(score) {
    if (score >= 9) return "Exceptional";
    if (score >= 8.5) return "Excellent";
    if (score >= 8) return "Very Good";
    return "Good";
}

function isUserLoggedIn() {
    return localStorage.getItem("loggedInUser") ||
           localStorage.getItem("currentUser") ||
           localStorage.getItem("isLoggedIn") === "true";
}

if (destination && hotel) {
    const reviewScore = getReviewScore(hotel.rating);
    const reviewText = getReviewText(reviewScore);
    const reviewCount = 48 + hotelIndex * 36;

    const similarHotels = hotels
        .filter((item, index) => index !== hotelIndex)
        .map(item => `
            <div class="similar-hotel-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="similar-hotel-info">
                    <h3>${item.name}</h3>
                    <p>${item.location}</p>
                    <ul>
                        ${item.features.slice(0, 3).map(feature => `<li>✓ ${feature}</li>`).join("")}
                    </ul>
                    <div class="mini-rating">
                        <span>${getReviewScore(item.rating)}</span>
                        ${getReviewText(getReviewScore(item.rating))}
                    </div>
                    <h4>${item.price} ${item.currency} nightly</h4>
                </div>
            </div>
        `).join("");

    hotelDetailsContainer.innerHTML = `
        <section class="hotel-search-bar">
        <div class="search-box">
            <span>📍</span>
            <div>
                <small>Where to?</small>
                <p>${destination.name}, ${destination.country}</p>
            </div>
        </div>

        <div class="search-box">
            <span>📅</span>
            <div>
                <small>Check-in</small>
                <input type="date" id="topCheckIn" class="hotel-input">
            </div>
        </div>

        <div class="search-box">
            <span>📅</span>
            <div>
                <small>Check-out</small>
                <input type="date" id="topCheckOut" class="hotel-input">
            </div>
        </div>

        <div class="search-box">
            <span>👤</span>
            <div>
                <small>Travelers</small>
                <input type="number" id="topTravelers" class="hotel-input" min="1" value="2">
            </div>
        </div>
    </section>

        <section class="hotel-top-actions">
            <a href="details.html?id=${destination.id}" class="see-all-link">← See all properties</a>

            <div>
                <button class="outline-btn" id="shareBtn">Share</button>
                <button class="outline-btn" id="saveBtn">♡ Save</button>
            </div>
        </section>

        <section class="hotel-main-photo">
            <img src="${hotel.image}" alt="${hotel.name}">
        </section>

        <div class="hotel-tabs-wrapper">
            <nav class="hotel-tabs">
                <a href="#overview" class="active">Overview</a>
                <a href="#about">About</a>
                <a href="#rooms">Rooms</a>
                <a href="#accessibility">Accessibility</a>
                <a href="#policies">Policies</a>
            </nav>

            <a href="#rooms" class="select-room-btn">Select a room</a>
        </div>

        <section id="overview" class="hotel-overview-layout">
            <div class="hotel-main-content">
                <h1>${hotel.name}</h1>

                <div class="stars">★ ★ ★</div>

                <div class="review-row">
                    <span class="score-box">${reviewScore}</span>
                    <strong>${reviewText}</strong>
                </div>

                <p class="reviews-link">See all ${reviewCount} reviews ›</p>

                <h2>Highlights for your 1-night trip</h2>

                <div class="highlights-list">
                    <div class="highlight-item">
                        <div class="highlight-icon">🏆</div>
                        <div>
                            <h3>Highly rated by travelers</h3>
                            <p>This property received multiple high ratings from guests.</p>
                        </div>
                    </div>

                    <div class="highlight-item">
                        <div class="highlight-icon">🤝</div>
                        <div>
                            <h3>Exceptional service & staff</h3>
                            <p>The top-rated staff and service will ensure you feel welcome.</p>
                        </div>
                    </div>

                    <div class="highlight-item">
                        <div class="highlight-icon">📍</div>
                        <div>
                            <h3>Great location</h3>
                            <p>Guests value the location for making travel plans effortless.</p>
                        </div>
                    </div>
                </div>
            </div>

            <aside class="hotel-side-map">
                <h2>Explore the area</h2>

                <div class="small-map">
                    <iframe src="${createMapEmbed(hotel.location)}" loading="lazy"></iframe>
                </div>

                <p>${hotel.location}</p>
                <a href="https://www.google.com/maps?q=${encodeURIComponent(hotel.location)}" target="_blank">
                    View in a map ›
                </a>

                <ul class="nearby-list">
                    ${destination.nearbyPlaces.map((place, index) => `
                        <li>
                            <span>📍 ${place}</span>
                            <small>${(index + 1) * 5} min away</small>
                        </li>
                    `).join("")}
                </ul>
            </aside>
        </section>

        <section id="about" class="hotel-section">
            <h2>About this property</h2>

            <div class="features-grid">
                ${hotel.features.map(feature => `
                    <div class="feature-item">✓ ${feature}</div>
                `).join("")}
                <div class="feature-item">✓ Comfortable rooms</div>
                <div class="feature-item">✓ Business facilities</div>
                <div class="feature-item">✓ Restaurant</div>
                <div class="feature-item">✓ Great location</div>
            </div>
        </section>

        ${
    isUserLoggedIn()
    ? ""
    : `
        <section class="saving-banner">
            <strong>Get instant savings on this stay when you sign in and book!</strong>
            <a href="login.html" class="sign-in-banner-btn">Sign in</a>
        </section>
    `
}

        <section id="rooms" class="hotel-section">
            <h2>Choose your room</h2>

            <div class="rooms-search">
            <div class="room-date-box">
                <small>Start date</small>
                <input type="date" id="roomCheckIn" class="hotel-input">
            </div>

            <div class="room-date-box">
                <small>End date</small>
                <input type="date" id="roomCheckOut" class="hotel-input">
            </div>

            <div class="room-date-box">
                <small>Travelers</small>
                <input type="number" id="roomTravelers" class="hotel-input" min="1" value="2">
            </div>
        </div>

            <div class="price-message">
                <span>↓</span>
                <div>
                    <h3>Price is lower than usual</h3>
                    <p>Pay less than for similar properties on our site.</p>
                </div>
            </div>

            <div class="room-cards">
                <div class="room-card">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    <div class="room-info">
                        <span class="room-label">Our lowest price</span>
                        <h3>Standard Room</h3>
                        <p>✓ Free WiFi</p>
                        <p>✓ Sleeps 2</p>
                        <p>✓ 1 Double Bed</p>
                        <div class="room-rating">
                            <span>${reviewScore}</span>
                            ${reviewText}
                        </div>
                        <h4>${hotel.price} ${hotel.currency} nightly</h4>
                        <p class="total-price">${hotel.price} ${hotel.currency} total</p>
                        <a href="booking.html?id=${destination.id}" class="reserve-btn">Reserve</a>
                    </div>
                </div>

                <div class="room-card">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    <div class="room-info">
                        <span class="room-label">Popular choice</span>
                        <h3>Deluxe Room</h3>
                        <p>✓ Free WiFi</p>
                        <p>✓ City view</p>
                        <p>✓ Breakfast available</p>
                        <div class="room-rating">
                            <span>${reviewScore}</span>
                            ${reviewText}
                        </div>
                        <h4>${hotel.price + 40} ${hotel.currency} nightly</h4>
                        <p class="total-price">${hotel.price + 40} ${hotel.currency} total</p>
                        <a href="booking.html?id=${destination.id}" class="reserve-btn">Reserve</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="accessibility" class="hotel-section two-column-section">
            <div>
                <h2>Accessibility</h2>
                <p>
                    If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.
                </p>
            </div>

            <div>
                <h3>Common areas</h3>
                <p>Wheelchair accessible areas</p>
                <p>Elevator available</p>
                <p>Well-lit path to entrance</p>

                <h3>Rooms</h3>
                <p>Accessible room options</p>
                <p>Private bathroom</p>
            </div>
        </section>

        <section id="policies" class="hotel-section two-column-section">
            <div>
                <h2>Policies</h2>
            </div>

            <div class="policy-columns">
                <div>
                    <h3>Check-in</h3>
                    <p>${destination.policies.checkIn}</p>
                    <p>Minimum check-in age: 18</p>

                    <h3>Special check-in instructions</h3>
                    <p>Guests will receive confirmation information after booking.</p>
                </div>

                <div>
                    <h3>Check-out</h3>
                    <p>${destination.policies.checkOut}</p>
                    <p>Late check-out subject to availability.</p>

                    <h3>Pets</h3>
                    <p>${destination.policies.pets}</p>
                </div>
            </div>
        </section>

        <section class="hotel-section">
            <h2>Property payment types</h2>

            <div class="payment-types">
                <span>Mastercard</span>
                <span>Visa</span>
                <span>Cash</span>
            </div>

            <h2>Important information</h2>
            <ul class="info-list">
                <li>Extra-person charges may apply depending on property policy.</li>
                <li>Government-issued photo identification may be required at check-in.</li>
                <li>Special requests are subject to availability.</li>
            </ul>
        </section>

        <section class="hotel-section">
            <h2>Similar properties to ${hotel.name}</h2>
            <div class="similar-hotels-row">
                ${similarHotels || "<p>No similar hotels available.</p>"}
            </div>
        </section>
    `;
    // Save button logic
const saveBtn = document.getElementById("saveBtn");
const shareBtn = document.getElementById("shareBtn");

const savedHotelKey = `savedHotel-${destination.id}-${hotelIndex}`;

if (saveBtn) {
    if (localStorage.getItem(savedHotelKey) === "true") {
        saveBtn.classList.add("saved");
        saveBtn.textContent = "♥ Saved";
    }

    saveBtn.addEventListener("click", () => {
        const isSaved = saveBtn.classList.toggle("saved");

        if (isSaved) {
            saveBtn.textContent = "♥ Saved";
            localStorage.setItem(savedHotelKey, "true");
        } else {
            saveBtn.textContent = "♡ Save";
            localStorage.removeItem(savedHotelKey);
        }
    });
}

// Share button logic
if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        const pageUrl = window.location.href;

        if (navigator.share) {
            await navigator.share({
                title: hotel.name,
                text: `Check this hotel: ${hotel.name}`,
                url: pageUrl
            });
        } else {
            navigator.clipboard.writeText(pageUrl);
            alert("Hotel link copied!");
        }
    });
}

// Active tabs on click and scroll
const tabLinks = document.querySelectorAll(".hotel-tabs a)");
const sections = document.querySelectorAll("#overview, #about, #rooms, #accessibility, #policies");

tabLinks.forEach(link => {
    link.addEventListener("click", () => {
        tabLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    tabLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});

// Dates and travelers sync
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

const topCheckIn = document.getElementById("topCheckIn");
const topCheckOut = document.getElementById("topCheckOut");
const topTravelers = document.getElementById("topTravelers");

const roomCheckIn = document.getElementById("roomCheckIn");
const roomCheckOut = document.getElementById("roomCheckOut");
const roomTravelers = document.getElementById("roomTravelers");

topCheckIn.value = formatDate(today);
topCheckOut.value = formatDate(tomorrow);
roomCheckIn.value = topCheckIn.value;
roomCheckOut.value = topCheckOut.value;
roomTravelers.value = topTravelers.value;

topCheckIn.addEventListener("change", () => {
    roomCheckIn.value = topCheckIn.value;
});

topCheckOut.addEventListener("change", () => {
    roomCheckOut.value = topCheckOut.value;
});

topTravelers.addEventListener("input", () => {
    roomTravelers.value = topTravelers.value;
});

roomCheckIn.addEventListener("change", () => {
    topCheckIn.value = roomCheckIn.value;
});

roomCheckOut.addEventListener("change", () => {
    topCheckOut.value = roomCheckOut.value;
});

roomTravelers.addEventListener("input", () => {
    topTravelers.value = roomTravelers.value;
});
} else {
    hotelDetailsContainer.innerHTML = `
        <div class="not-found">
            <h2>Hotel not found</h2>
            <a href="index.html" class="back-btn">Back Home</a>
        </div>
    `;
}