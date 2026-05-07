// details.js (Clean – No Wishlist, No Reviews)

const detailsContainer = document.getElementById("detailsContainer");

const params = new URLSearchParams(window.location.search);
const destinationId = parseInt(params.get("id"));
const destination = destinations.find(item => item.id === destinationId);

// ---------- create map embed ----------
function createMapEmbed(address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

// ---------- main render function ----------
function renderDetails() {
    if (!destination) {
        detailsContainer.innerHTML = `
            <div class="not-found">
                <h2>Destination not found</h2>
                <a href="search.html" class="back-btn">Back to Search</a>
            </div>`;
        return;
    }

    const gallerySlides = destination.gallery.map((img, idx) => `
    <div class="slide">
        <img src="${img}" alt="${destination.name} - Image ${idx+1}">
        <p class="slide-caption">${destination.name} - ${idx+1}</p>
    </div>
`).join("");

    const highlightsHTML = destination.highlights.map(item => `<li>${item}</li>`).join("");
    const accessibilityHTML = destination.accessibility.map(item => `<li>${item}</li>`).join("");
    const nearbyHTML = destination.nearbyPlaces.map(place => `<li>${place}</li>`).join("");

    const hotels = hotelsByDestination[destination.id] || [];
    let hotelsHTML = "";
    if (hotels.length > 0) {
        hotelsHTML = hotels.map((hotel, index) => `
            <div class="hotel-card">
                <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p><strong>📍 ${hotel.location}</strong></p>
                    <p>⭐ ${hotel.rating}</p>
                    <ul>${hotel.features.map(f => `<li>${f}</li>`).join("")}</ul>
                    <div class="hotel-price">
                        <h4>${hotel.price} ${hotel.currency}</h4>
                        <span>per night</span>
                    </div>
                    <a href="hotel-details.html?destinationId=${destination.id}&hotelIndex=${index}" class="view-hotel-btn">
                        View Details
                    </a>
                </div>
            </div>`).join("");
    } else {
        hotelsHTML = `<p class="no-data">No hotels available for this destination.</p>`;
    }

    detailsContainer.innerHTML = `
        <!-- Hero Section -->
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
                        <h3>${destination.price} ${destination.currency}</h3>
                        <span>avg per night</span>
                    </div>

                    <div class="details-actions">
                        <a href="search.html" class="back-btn">Back to Search</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery Slider -->
        <section class="details-section">
            <h2>📷 Gallery</h2>
            <div class="slider-container" id="gallerySlider">
                <div class="slides">${gallerySlides}</div>
                <button class="prev" onclick="changeSlide(-1)">❮</button>
                <button class="next" onclick="changeSlide(1)">❯</button>
                <div class="dots" id="sliderDots"></div>
            </div>
        </section>

        <!-- Video -->
        <section class="details-section">
            <h2>🎥 Video</h2>
            <div class="video-box">
                <video controls class="details-video">
                    <source src="${destination.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>

        <!-- Location -->
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

        <!-- Hotels -->
        <section class="details-section">
            <h2>🏨 Available Hotels</h2>
            <div class="hotels-grid">${hotelsHTML}</div>
        </section>

        <!-- Highlights -->
        <section class="details-section">
            <h2>✨ Highlights</h2>
            <ul class="details-list">${highlightsHTML}</ul>
        </section>

        <!-- Accessibility -->
        <section class="details-section">
            <h2>♿ Accessibility</h2>
            <ul class="details-list">${accessibilityHTML}</ul>
        </section>

        <!-- Policies -->
        <section class="details-section">
            <h2>📋 Policies</h2>
            <div class="policy-grid">
                <div class="policy-item"><h4>Check-in</h4><p>${destination.policies.checkIn}</p></div>
                <div class="policy-item"><h4>Check-out</h4><p>${destination.policies.checkOut}</p></div>
                <div class="policy-item"><h4>Pets</h4><p>${destination.policies.pets}</p></div>
                <div class="policy-item"><h4>Children</h4><p>${destination.policies.children}</p></div>
            </div>
        </section>

        <!-- Nearby Places -->
        <section class="details-section">
            <h2>📍 Nearby Places</h2>
            <ul class="details-list">${nearbyHTML}</ul>
        </section>
    `;

    // Setup slider after inserting HTML
    setupSlider();
}

// ---------- simple slider logic ----------
let currentSlide = 0;
function setupSlider() {
    const slides = document.querySelectorAll("#gallerySlider .slide");
    const dotsContainer = document.getElementById("sliderDots");
    if (!slides.length || !dotsContainer) return;

    // Create dots
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
    const dots = document.querySelectorAll("#gallerySlider .dot");
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? "block" : "none";
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
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

// Initial render
renderDetails();