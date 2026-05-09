// details.js – Destination details page logic with hotel offers, weather, and reviews

const detailsContainer = document.getElementById("detailsContainer");

// ========== Room-specific discount offers ==========
// Key format: "destinationId-hotelIndex-roomType" → discount percentage
const roomOffers = {
    "1-0-standard": 20,   // Cairo, hotel 0 → 20% OFF
    "1-0-deluxe": 25,     // Cairo, hotel 0, deluxe → 25% OFF
    "2-1-deluxe": 15,     // Dubai, hotel 1
    "5-0-standard": 10,   // Istanbul, hotel 0 → 10% OFF
    "8-1-deluxe": 25,     // New York, hotel 1
    "13-0-standard": 30   // Bangkok, hotel 0 → 30% OFF
};

// ========== Mock weather data by city ==========
const weatherData = {
    "Cairo": { temp: "32°C", condition: "Sunny" },
    "Dubai": { temp: "38°C", condition: "Hot" },
    "Paris": { temp: "18°C", condition: "Cloudy" },
    "Rome": { temp: "24°C", condition: "Partly Cloudy" },
    "Istanbul": { temp: "22°C", condition: "Windy" },
    "Tokyo": { temp: "28°C", condition: "Rainy" },
    "London": { temp: "15°C", condition: "Foggy" },
    "New York": { temp: "20°C", condition: "Clear" },
    "Barcelona": { temp: "26°C", condition: "Sunny" },
    "Athens": { temp: "30°C", condition: "Sunny" },
    "Amsterdam": { temp: "17°C", condition: "Breezy" },
    "Zurich": { temp: "13°C", condition: "Snow" },
    "Bangkok": { temp: "35°C", condition: "Humid" },
    "Sydney": { temp: "27°C", condition: "Warm" },
    "Rio de Janeiro": { temp: "33°C", condition: "Tropical" }
};

// ========== Generate fake reviews for a city ==========
function generateCityReviews(cityName) {
    const reviewers = ["Ahmed", "Mona", "Carlos", "Sara", "John"];
    const comments = [
        "Amazing city with rich culture!",
        "I loved the atmosphere and the friendly people.",
        "A must-visit destination, highly recommended.",
        "Great historical sites and delicious food.",
        "Wonderful experience, will come back again."
    ];
    const reviews = [];
    for (let i = 0; i < 3; i++) {
        reviews.push({
            user: reviewers[i],
            rating: (4 + i * 0.5).toFixed(1),
            comment: comments[i],
            date: new Date(2026, Math.floor(Math.random() * 5), Math.floor(Math.random() * 28) + 1)
                .toISOString().split('T')[0]
        });
    }
    return reviews;
}

// Retrieve destination ID from URL query parameters
const params = new URLSearchParams(window.location.search);
const destinationId = parseInt(params.get("id"));
// Find the matching destination object from the global 'destinations' array (defined in data.js)
const destination = destinations.find(item => item.id === destinationId);

// Build a Google Maps embed URL from an address string
function createMapEmbed(address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

// Main rendering function – populates the details page with destination info, hotels, offers, weather, and reviews
function renderDetails() {
    if (!destination) {
        // Show a friendly error message if the destination doesn't exist
        detailsContainer.innerHTML = `
            <div class="not-found">
                <h2>Destination not found</h2>
                <a href="search.html" class="back-btn">Back to Search</a>
            </div>`;
        return;
    }

    // Build gallery slides markup
    const gallerySlides = destination.gallery.map((img, idx) => `
        <div class="slide">
            <img src="${img}" alt="${destination.name} - Image ${idx+1}">
            <p class="slide-caption">${destination.name} - ${idx+1}</p>
        </div>
    `).join("");

    // Build list items for highlights, accessibility, and nearby places
    const highlightsHTML    = destination.highlights.map(item => `<li>${item}</li>`).join("");
    const accessibilityHTML = destination.accessibility.map(item => `<li>${item}</li>`).join("");
    const nearbyHTML        = destination.nearbyPlaces.map(place => `<li>${place}</li>`).join("");

    // Retrieve hotels for this destination (global hotelsByDestination from data.js)
    const hotels = hotelsByDestination[destination.id] || [];
    let hotelsHTML = "";
    if (hotels.length > 0) {
        hotelsHTML = hotels.map((hotel, index) => {
            // Build offer keys for both room types
            const keyStandard = `${destination.id}-${index}-standard`;
            const keyDeluxe = `${destination.id}-${index}-deluxe`;

            const discountStd = roomOffers[keyStandard] || null;
            const discountDlx = roomOffers[keyDeluxe] || null;

            const priceStd = hotel.price;
            const priceDlx = hotel.price + 40;

            // Apply discount if available
            const finalStd = discountStd ? (priceStd * (1 - discountStd / 100)).toFixed(0) : priceStd;

            const finalDlx = discountDlx ? (priceDlx * (1 - discountDlx / 100)).toFixed(0) : priceDlx;

            const hasOffer = discountStd || discountDlx;
            const displayPriceUSD = Math.min(Number(finalStd), Number(finalDlx));
            const displayDiscount = discountStd !== null && discountDlx !== null
                ? Math.max(discountStd, discountDlx)
                : discountStd || discountDlx;

            // Convert price to the active currency (functions from currency.js)
            const convertedPrice = convertPrice(displayPriceUSD).toLocaleString();
            const symbol = getCurrencySymbol();

            // Build price HTML: show original crossed out if on offer
            let priceHTML = '';
            if (hasOffer) {
                const originalConverted = convertPrice(hotel.price).toLocaleString();
                priceHTML = `<s style="color:#999;">From ${symbol} ${originalConverted}</s><br>
                             <h4 data-price-usd="${displayPriceUSD}">${symbol} ${convertedPrice}</h4>
                             <span style="color:green;">(${displayDiscount}% OFF on select room)</span>`;
            } else {
                priceHTML = `<h4 data-price-usd="${displayPriceUSD}">${symbol} ${convertedPrice}</h4>
                             <span>per night</span>`;
            }

            return `
                <div class="hotel-card">
                    <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                    <div class="hotel-info">
                        <h3>${hotel.name} ${hasOffer ? '🔥' : ''}</h3>
                        <p><strong>📍 ${hotel.location}</strong></p>
                        <p>⭐ ${hotel.rating}</p>
                        <ul>${hotel.features.map(f => `<li>${f}</li>`).join("")}</ul>
                        <div class="hotel-price">
                            ${priceHTML}
                        </div>
                        <a href="hotel-details.html?destinationId=${destination.id}&hotelIndex=${index}" class="view-hotel-btn">View Details</a>
                    </div>
                </div>`;
        }).join("");
    } else {
        hotelsHTML = `<p class="no-data">No hotels available for this destination.</p>`;
    }

     // Inject the complete details layout into the container
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
                    <p>⭐ ${destination.rating} (Rating)</p>
                    <p class="short-desc">${destination.shortDescription}</p>
                    <p>${destination.description}</p>

                    <div class="price-box">
                        <h3 data-price-usd="${destination.price}">
                            ${getCurrencySymbol()} ${convertPrice(destination.price).toLocaleString()}
                        </h3>
                        <span>avg per night</span>
                    </div>

                    <div class="details-actions">
                        <a href="search.html" class="back-btn">Back to Search</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>📷 Gallery</h2>
            <div class="slider-container" id="gallerySlider">
                <div class="slides">${gallerySlides}</div>
                <button class="prev" onclick="changeSlide(-1)">❮</button>
                <button class="next" onclick="changeSlide(1)">❯</button>
                <div class="dots" id="sliderDots"></div>
            </div>
        </section>

        <section class="details-section">
            <h2>🎥 Video</h2>
            <div class="video-box">
                <video controls class="details-video">
                    <source src="${destination.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>

        <section class="details-section location-section">
            <h2>📍 Location</h2>
            <div class="location-layout">
                <div class="location-info">
                    <p>${destination.location.address}</p>
                    <a href="${destination.location.mapLink}" target="_blank" rel="noopener" class="map-btn">
                        Open in Google Maps
                    </a>
                </div>
                <div class="map-box">
                    <iframe src="${createMapEmbed(destination.location.address)}" 
                            loading="lazy" allowfullscreen></iframe>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>🏨 Available Hotels</h2>
            <div class="hotels-grid">${hotelsHTML}</div>
        </section>

        <section class="details-section">
            <h2>✨ Highlights</h2>
            <ul class="details-list">${highlightsHTML}</ul>
        </section>

        <section class="details-section">
            <h2>♿ Accessibility</h2>
            <ul class="details-list">${accessibilityHTML}</ul>
        </section>

        <section class="details-section">
            <h2>📋 Policies</h2>
            <div class="policy-grid">
                <div class="policy-item"><h4>Check-in</h4><p>${destination.policies.checkIn}</p></div>
                <div class="policy-item"><h4>Check-out</h4><p>${destination.policies.checkOut}</p></div>
                <div class="policy-item"><h4>Pets</h4><p>${destination.policies.pets}</p></div>
                <div class="policy-item"><h4>Children</h4><p>${destination.policies.children}</p></div>
            </div>
        </section>

        <section class="details-section">
            <h2>📍 Nearby Places</h2>
            <ul class="details-list">${nearbyHTML}</ul>
        </section>

        <!-- Current weather widget -->
        <section class="details-section weather-section">
            <h2>🌤️ Current Weather</h2>
            <div class="weather-widget">
                <span>${weatherData[destination.name] ? weatherData[destination.name].temp : "N/A"}</span>
                <p>${weatherData[destination.name] ? weatherData[destination.name].condition : "No data"}</p>
            </div>
        </section>

        <!-- Guest reviews for the city -->
        <section class="details-section reviews-section">
            <h2>💬 Guest Reviews about ${destination.name}</h2>
            <div class="reviews-container">
                ${generateCityReviews(destination.name).map(r => `
                    <div class="review-card">
                        <div class="review-header">
                            <strong>${r.user}</strong>
                            <span>⭐ ${r.rating}</span>
                            <time>${r.date}</time>
                        </div>
                        <p>${r.comment}</p>
                    </div>
                `).join("")}
            </div>
        </section>
    `;

     // Initialize the gallery slider after injecting the HTML
    setupSlider();
}

// Gallery Slider Implementation
let currentSlide = 0;

function setupSlider() {
    const slides = document.querySelectorAll("#gallerySlider .slide");
    const dotsContainer = document.getElementById("sliderDots");
    if (!slides.length || !dotsContainer) return;

    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    currentSlide = 0;
    updateSliderView();
}

function updateSliderView() {
    const slides = document.querySelectorAll("#gallerySlider .slide");
    const dots   = document.querySelectorAll("#gallerySlider .dot");
    slides.forEach((slide, i) => slide.style.display = i === currentSlide ? "block" : "none");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

function changeSlide(n) {
    const slides = document.querySelectorAll("#gallerySlider .slide");
    if (!slides.length) return;
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    updateSliderView();
}

function goToSlide(index) {
    currentSlide = index;
    updateSliderView();
}

// Initial page render on script load
renderDetails();