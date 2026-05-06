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

   const similarHotels = hotels.map((item, index) => ({ item, index }))
    .filter(obj => obj.index !== hotelIndex)
    .map(obj => `
        <a 
            href="hotel-details.html?destinationId=${destination.id}&hotelIndex=${obj.index}" 
            class="similar-hotel-card"
        >
            <img src="${obj.item.image}" alt="${obj.item.name}">

            <div class="similar-hotel-info">
                <h3>${obj.item.name}</h3>
                <p>${obj.item.location}</p>

                <ul>
                    ${obj.item.features.slice(0, 3).map(feature => `<li>✓ ${feature}</li>`).join("")}
                </ul>

                <div class="mini-rating">
                    <span>${getReviewScore(obj.item.rating)}</span>
                    ${getReviewText(getReviewScore(obj.item.rating))}
                </div>

                <h4>${obj.item.price} ${obj.item.currency} nightly</h4>
            </div>
        </a>
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
    <nav class="hotel-tabs" id="hotelTabs">
        <a href="#overview" class="active">Overview</a>
        <a href="#about">About</a>
        <a href="#rooms">Rooms</a>
        <a href="#accessibility">Accessibility</a>
        <a href="#policies">Policies</a>
    </nav>

    <a href="#rooms" class="select-room-small">Select a room</a>
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
        <small>Rooms</small>
        <input type="number" id="roomCount" class="hotel-input" min="1" max="4" value="1">
    </div>

    <div class="room-date-box">
        <small>Travelers</small>
        <input type="number" id="roomTravelers" class="hotel-input" min="1" max="4" value="2">
    </div>
</div>

<p id="bookingValidationMessage" class="validation-message"></p>

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
                            <div class="room-rating">
                            <span>${reviewScore}</span>
                            ${reviewText}
                        </div>
                        <h4>${hotel.price} ${hotel.currency}</h4>
                        <!-- التعديل هنا: زرار الحجز -->
                        <button onclick="handleRoomBooking('${hotel.name} - Standard', ${hotel.price}, '${hotel.image}')" class="reserve-btn" style="border:none; cursor:pointer; width:100%;">Reserve</button>
                    </div>
                </div>

                <div class="room-card">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    <div class="room-info">
                        <span class="room-label">Popular choice</span>
                        <h3>Deluxe Room</h3>
                        <p>✓ City view</p>
                        <div class="room-rating">
                            <span>${reviewScore}</span>
                            ${reviewText}
                        </div>
                        <h4>${hotel.price + 40} ${hotel.currency}</h4>
                        <!-- التعديل هنا: زرار الحجز للغرفة الأغلى -->
                        <button onclick="handleRoomBooking('${hotel.name} - Deluxe', ${hotel.price + 40}, '${hotel.image}')" class="reserve-btn" style="border:none; cursor:pointer; width:100%;">Reserve</button>
                    </div>
                </div>
            </div>
        </section>

       <section id="accessibility" class="hotel-section">
    <h2>Accessibility</h2>

    <div class="hotel-info-grid">
        <div class="info-card">
            <h3>Common areas</h3>
            <p>Wheelchair accessible areas</p>
            <p>Elevator available</p>
            <p>Well-lit path to entrance</p>
        </div>

        <div class="info-card">
            <h3>Rooms</h3>
            <p>Accessible room options</p>
            <p>Private bathroom</p>
            <p>Comfortable room layout</p>
        </div>

        <div class="info-card">
            <h3>Guest support</h3>
            <p>Guests can contact the property for accessibility requests.</p>
            <p>Support information is provided after booking.</p>
        </div>
    </div>
</section>

        <section id="policies" class="hotel-section">
    <h2>Policies</h2>

    <div class="hotel-info-grid">
        <div class="info-card">
            <h3>Check-in</h3>
            <p>${destination.policies.checkIn}</p>
            <p>Minimum check-in age: 18</p>
        </div>

        <div class="info-card">
            <h3>Check-out</h3>
            <p>${destination.policies.checkOut}</p>
            <p>Late check-out subject to availability.</p>
        </div>

        <div class="info-card">
            <h3>Pets</h3>
            <p>${destination.policies.pets}</p>
        </div>

        <div class="info-card">
            <h3>Children</h3>
            <p>${destination.policies.children}</p>
        </div>

        <div class="info-card">
            <h3>Special instructions</h3>
            <p>Guests will receive confirmation information after booking.</p>
        </div>

        <div class="info-card">
            <h3>Payment types</h3>
            <p>Mastercard</p>
            <p>Visa</p>
            <p>Cash</p>
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

    // Safe booking validation
(function () {
    const bookingCheckIn = document.getElementById("roomCheckIn");
    const bookingCheckOut = document.getElementById("roomCheckOut");
    const bookingRoomCount = document.getElementById("roomCount");
    const bookingTravelers = document.getElementById("roomTravelers");
    const bookingMessage = document.getElementById("bookingValidationMessage");
    const reserveButtons = document.querySelectorAll(".reserve-btn");

    if (!bookingCheckIn || !bookingCheckOut || !bookingRoomCount || !bookingTravelers || !bookingMessage) {
        return;
    }

    function formatBookingDate(date) {
        return date.toISOString().split("T")[0];
    }

    function addBookingDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    const currentDate = new Date();
    const nextDate = addBookingDays(currentDate, 1);

    bookingCheckIn.value = formatBookingDate(currentDate);
    bookingCheckOut.value = formatBookingDate(nextDate);

    bookingCheckIn.min = formatBookingDate(currentDate);
    bookingCheckOut.min = formatBookingDate(nextDate);

    function updateMaxTravelers() {
        const rooms = parseInt(bookingRoomCount.value) || 1;
        const maxTravelers = rooms * 4;

        bookingTravelers.max = maxTravelers;

        if (parseInt(bookingTravelers.value) > maxTravelers) {
            bookingTravelers.value = maxTravelers;
        }
    }

    function validateBooking() {
        const checkInDate = new Date(bookingCheckIn.value);
        const checkOutDate = new Date(bookingCheckOut.value);
        const rooms = parseInt(bookingRoomCount.value);
        const travelers = parseInt(bookingTravelers.value);
        const maxTravelers = rooms * 4;

        bookingMessage.textContent = "";

        if (checkOutDate <= checkInDate) {
            bookingMessage.textContent = "Check-out date must be after check-in date.";
            return false;
        }

        if (rooms < 1 || rooms > 4) {
            bookingMessage.textContent = "Rooms must be between 1 and 4.";
            return false;
        }

        if (travelers < 1 || travelers > maxTravelers) {
            bookingMessage.textContent = `Travelers must be between 1 and ${maxTravelers} for ${rooms} room(s).`;
            return false;
        }

        return true;
    }

    bookingCheckIn.addEventListener("change", function () {
        const checkInDate = new Date(bookingCheckIn.value);
        const minCheckoutDate = addBookingDays(checkInDate, 1);

        bookingCheckOut.min = formatBookingDate(minCheckoutDate);

        if (new Date(bookingCheckOut.value) <= checkInDate) {
            bookingCheckOut.value = formatBookingDate(minCheckoutDate);
        }

        validateBooking();
    });

    bookingCheckOut.addEventListener("change", validateBooking);

    bookingRoomCount.addEventListener("input", function () {
        updateMaxTravelers();
        validateBooking();
    });

    bookingTravelers.addEventListener("input", validateBooking);

    reserveButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            if (!validateBooking()) {
                e.preventDefault();
            }
        });
    });

    updateMaxTravelers();
    validateBooking();
})();

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

const tabLinks = document.querySelectorAll("#hotelTabs a");
const sections = document.querySelectorAll("#overview, #about, #rooms, #accessibility, #policies");

function changeActiveTab() {
    let current = "overview";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    tabLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", changeActiveTab);

tabLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").replace("#", "");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 150,
                behavior: "smooth"
            });
        }

        tabLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// Dates and travelers sync
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

// Dates and travelers sync
const topCheckIn = document.getElementById("topCheckIn");
const topCheckOut = document.getElementById("topCheckOut");
const topTravelers = document.getElementById("topTravelers");   

const roomCheckIn = document.getElementById("roomCheckIn");
const roomCheckOut = document.getElementById("roomCheckOut");
const roomTravelers = document.getElementById("roomTravelers");

// topCheckIn.value = formatDate(today);
// topCheckOut.value = formatDate(tomorrow);
// roomCheckIn.value = topCheckIn.value;
// roomCheckOut.value = topCheckOut.value;
// roomTravelers.value = topTravelers.value;

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
// وظيفة الربط مع نظام الحجز والخصم (المعدلة)
function handleRoomBooking(roomName, price, image) { // أضفنا image هنا
    // التأكد أن ملف booking.js موجود
    if (typeof bookTrip === "function") {
        // تنفيذ الحجز مع تمرير رابط الصورة
        bookTrip(roomName, price, image); // أضفنا image هنا
        
        // الانتقال لصفحة الدفع والخصم
        setTimeout(() => {
            window.location.href = "booking.html";
        }, 800);
    } else {
        alert("Error: booking.js is missing!");
    }
}