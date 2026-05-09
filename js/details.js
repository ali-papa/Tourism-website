// details.js – bilingual (EN/AR) with currency converter, offers, weather, reviews

const detailsContainer = document.getElementById("detailsContainer");

const roomOffers = {
    "1-0-standard": 20, "1-0-deluxe": 25, "2-1-deluxe": 15,
    "5-0-standard": 10, "8-1-deluxe": 25, "13-0-standard": 30
};

const weatherData = {
    "Cairo":          { temp: "32°C", condition: "Sunny",        condition_ar: "مشمس" },
    "Dubai":          { temp: "38°C", condition: "Hot",          condition_ar: "حار" },
    "Paris":          { temp: "18°C", condition: "Cloudy",       condition_ar: "غائم" },
    "Rome":           { temp: "24°C", condition: "Partly Cloudy",condition_ar: "غائم جزئياً" },
    "Istanbul":       { temp: "22°C", condition: "Windy",        condition_ar: "عاصف" },
    "Tokyo":          { temp: "28°C", condition: "Rainy",        condition_ar: "ممطر" },
    "London":         { temp: "15°C", condition: "Foggy",        condition_ar: "ضبابي" },
    "New York":       { temp: "20°C", condition: "Clear",        condition_ar: "صافٍ" },
    "Barcelona":      { temp: "26°C", condition: "Sunny",        condition_ar: "مشمس" },
    "Athens":         { temp: "30°C", condition: "Sunny",        condition_ar: "مشمس" },
    "Amsterdam":      { temp: "17°C", condition: "Breezy",       condition_ar: "منعش" },
    "Zurich":         { temp: "13°C", condition: "Snow",         condition_ar: "ثلجي" },
    "Bangkok":        { temp: "35°C", condition: "Humid",        condition_ar: "رطب" },
    "Sydney":         { temp: "27°C", condition: "Warm",         condition_ar: "دافئ" },
    "Rio de Janeiro": { temp: "33°C", condition: "Tropical",     condition_ar: "استوائي" }
};

function getLangNow() {
    return (typeof getLang === 'function') ? getLang() : (localStorage.getItem('lang') || 'en');
}

function loc(obj, field) {
    const lang = getLangNow();
    if (lang === 'ar' && obj[field + '_ar'] !== undefined) return obj[field + '_ar'];
    return obj[field];
}

function generateCityReviews(cityName) {
    const lang = getLangNow();
    const reviewers = ["Ahmed", "Mona", "Carlos", "Sara", "John"];
    const comments_en = [
        "Amazing city with rich culture!",
        "I loved the atmosphere and the friendly people.",
        "A must-visit destination, highly recommended.",
        "Great historical sites and delicious food.",
        "Wonderful experience, will come back again."
    ];
    const comments_ar = [
        "مدينة رائعة بثقافة غنية!",
        "أحببت الأجواء والناس الودودين.",
        "وجهة يجب زيارتها، أوصي بها بشدة.",
        "مواقع تاريخية رائعة وطعام لذيذ.",
        "تجربة جميلة، سأعود مرة أخرى."
    ];
    const comments = lang === 'ar' ? comments_ar : comments_en;
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

const params = new URLSearchParams(window.location.search);
const destinationId = parseInt(params.get("id"));
const destination = destinations.find(item => item.id === destinationId);

function createMapEmbed(address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function renderDetails() {
    if (!destination) {
        const lang = getLangNow();
        detailsContainer.innerHTML = `
            <div class="not-found">
                <h2>${lang === 'ar' ? 'الوجهة غير موجودة' : 'Destination not found'}</h2>
                <a href="search.html" class="back-btn">${lang === 'ar' ? 'العودة للبحث' : 'Back to Search'}</a>
            </div>`;
        return;
    }

    const lang = getLangNow();
    const isAr = lang === 'ar';

    const name = isAr && destination.name_ar ? destination.name_ar : destination.name;
    const country = isAr && destination.country_ar ? destination.country_ar : destination.country;
    const shortDesc = loc(destination, 'shortDescription');
    const desc = loc(destination, 'description');
    const highlights = loc(destination, 'highlights') || destination.highlights;
    const accessibility = loc(destination, 'accessibility') || destination.accessibility;
    const nearbyPlaces = loc(destination, 'nearbyPlaces') || destination.nearbyPlaces;
    const policies = isAr && destination.policies_ar ? destination.policies_ar : destination.policies;

    const gallerySlides = destination.gallery.map((img, idx) => `
        <div class="slide">
            <img src="${img}" alt="${name} - ${isAr ? 'صورة' : 'Image'} ${idx+1}">
            <p class="slide-caption">${name} - ${idx+1}</p>
        </div>
    `).join("");

    const highlightsHTML    = highlights.map(item => `<li>${item}</li>`).join("");
    const accessibilityHTML = accessibility.map(item => `<li>${item}</li>`).join("");
    const nearbyHTML        = nearbyPlaces.map(place => `<li>${place}</li>`).join("");

    const hotels = hotelsByDestination[destination.id] || [];
    let hotelsHTML = "";
    if (hotels.length > 0) {
        hotelsHTML = hotels.map((hotel, index) => {
            const keyStandard = `${destination.id}-${index}-standard`;
            const keyDeluxe   = `${destination.id}-${index}-deluxe`;
            const discountStd = roomOffers[keyStandard] || null;
            const discountDlx = roomOffers[keyDeluxe] || null;
            const priceStd    = hotel.price;
            const priceDlx    = hotel.price + 40;
            const finalStd    = discountStd ? (priceStd * (1 - discountStd / 100)).toFixed(0) : priceStd;
            const finalDlx    = discountDlx ? (priceDlx * (1 - discountDlx / 100)).toFixed(0) : priceDlx;
            const hasOffer    = discountStd || discountDlx;
            const displayPriceUSD  = Math.min(Number(finalStd), Number(finalDlx));
            const displayDiscount  = discountStd !== null && discountDlx !== null
                ? Math.max(discountStd, discountDlx) : discountStd || discountDlx;
            const convertedPrice   = convertPrice(displayPriceUSD).toLocaleString();
            const symbol           = getCurrencySymbol();
            const hotelLocation    = isAr && hotel.location_ar ? hotel.location_ar : hotel.location;
            const hotelFeatures    = (isAr && hotel.features_ar ? hotel.features_ar : hotel.features) || [];

            let priceHTML = '';
            if (hasOffer) {
                const originalConverted = convertPrice(hotel.price).toLocaleString();
                const offLabel = isAr ? `(خصم ${displayDiscount}% على غرف مختارة)` : `(${displayDiscount}% OFF on select room)`;
                const fromLabel = isAr ? 'من' : 'From';
                priceHTML = `<s style="color:#999;">${fromLabel} ${symbol} ${originalConverted}</s><br>
                             <h4 data-price-usd="${displayPriceUSD}">${symbol} ${convertedPrice}</h4>
                             <span style="color:green;">${offLabel}</span>`;
            } else {
                const perNight = isAr ? 'في الليلة' : 'per night';
                priceHTML = `<h4 data-price-usd="${displayPriceUSD}">${symbol} ${convertedPrice}</h4>
                             <span>${perNight}</span>`;
            }

            const viewDetailsLabel = isAr ? 'عرض التفاصيل' : 'View Details';

            return `
                <div class="hotel-card">
                    <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                    <div class="hotel-info">
                        <h3>${hotel.name} ${hasOffer ? '🔥' : ''}</h3>
                        <p><strong>📍 ${hotelLocation}</strong></p>
                        <p>⭐ ${hotel.rating}</p>
                        <ul>${hotelFeatures.map(f => `<li>${f}</li>`).join("")}</ul>
                        <div class="hotel-price">${priceHTML}</div>
                        <a href="hotel-details.html?destinationId=${destination.id}&hotelIndex=${index}" class="view-hotel-btn">${viewDetailsLabel}</a>
                    </div>
                </div>`;
        }).join("");
    } else {
        hotelsHTML = `<p class="no-data">${isAr ? 'لا توجد فنادق متاحة لهذه الوجهة.' : 'No hotels available for this destination.'}</p>`;
    }

    const weather = weatherData[destination.name];
    const weatherCondition = weather ? (isAr ? weather.condition_ar : weather.condition) : (isAr ? 'لا توجد بيانات' : 'No data');
    const weatherTemp = weather ? weather.temp : 'N/A';

    const labels = {
        country:      isAr ? 'الدولة'       : 'Country',
        category:     isAr ? 'الفئة'        : 'Category',
        rating:       isAr ? 'التقييم'      : 'Rating',
        avgNight:     isAr ? 'متوسط سعر الليلة' : 'avg per night',
        backSearch:   isAr ? '→ العودة للبحث' : '← Back to Search',
        gallery:      isAr ? '📷 معرض الصور' : '📷 Gallery',
        video:        isAr ? '🎥 فيديو'       : '🎥 Video',
        noVideo:      isAr ? 'المتصفح لا يدعم الفيديو.' : 'Your browser does not support the video tag.',
        location:     isAr ? '📍 الموقع'     : '📍 Location',
        openMaps:     isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps',
        hotels:       isAr ? '🏨 الفنادق المتاحة' : '🏨 Available Hotels',
        highlights:   isAr ? '✨ أبرز المميزات'   : '✨ Highlights',
        accessibility:isAr ? '♿ إمكانية الوصول'   : '♿ Accessibility',
        policies:     isAr ? '📋 السياسات'         : '📋 Policies',
        checkIn:      isAr ? 'تسجيل الوصول'        : 'Check-in',
        checkOut:     isAr ? 'تسجيل المغادرة'       : 'Check-out',
        pets:         isAr ? 'الحيوانات الأليفة'    : 'Pets',
        children:     isAr ? 'الأطفال'              : 'Children',
        nearby:       isAr ? '📍 أماكن قريبة'       : '📍 Nearby Places',
        weather:      isAr ? '🌤️ حالة الطقس الحالية' : '🌤️ Current Weather',
        reviews:      isAr ? `💬 آراء الضيوف عن ${name}` : `💬 Guest Reviews about ${name}`,
    };

    detailsContainer.innerHTML = `
        <section class="details-hero">
            <div class="details-card">
                <div class="details-main-image">
                    <img src="${destination.image}" alt="${name}" class="details-image">
                </div>
                <div class="details-info">
                    <h1>${name}</h1>
                    <p><strong>${labels.country}:</strong> ${country}</p>
                    <p><strong>${labels.category}:</strong> ${destination.category}</p>
                    <p>⭐ ${destination.rating} (${labels.rating})</p>
                    <p class="short-desc">${shortDesc}</p>
                    <p>${desc}</p>
                    <div class="price-box">
                        <h3 data-price-usd="${destination.price}">
                            ${getCurrencySymbol()} ${convertPrice(destination.price).toLocaleString()}
                        </h3>
                        <span>${labels.avgNight}</span>
                    </div>
                    <div class="details-actions">
                        <a href="search.html" class="back-btn">${labels.backSearch}</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>${labels.gallery}</h2>
            <div class="slider-container" id="gallerySlider">
                <div class="slides">${gallerySlides}</div>
                <button class="prev" onclick="changeSlide(-1)">❮</button>
                <button class="next" onclick="changeSlide(1)">❯</button>
                <div class="dots" id="sliderDots"></div>
            </div>
        </section>

        <section class="details-section">
            <h2>${labels.video}</h2>
            <div class="video-box">
                <video controls class="details-video">
                    <source src="${destination.video}" type="video/mp4">
                    ${labels.noVideo}
                </video>
            </div>
        </section>

        <section class="details-section location-section">
            <h2>${labels.location}</h2>
            <div class="location-layout">
                <div class="location-info">
                    <p>${destination.location.address}</p>
                    <a href="${destination.location.mapLink}" target="_blank" rel="noopener" class="map-btn">
                        ${labels.openMaps}
                    </a>
                </div>
                <div class="map-box">
                    <iframe src="${createMapEmbed(destination.location.address)}" loading="lazy" allowfullscreen></iframe>
                </div>
            </div>
        </section>

        <section class="details-section">
            <h2>${labels.hotels}</h2>
            <div class="hotels-grid">${hotelsHTML}</div>
        </section>

        <section class="details-section">
            <h2>${labels.highlights}</h2>
            <ul class="details-list">${highlightsHTML}</ul>
        </section>

        <section class="details-section">
            <h2>${labels.accessibility}</h2>
            <ul class="details-list">${accessibilityHTML}</ul>
        </section>

        <section class="details-section">
            <h2>${labels.policies}</h2>
            <div class="policy-grid">
                <div class="policy-item"><h4>${labels.checkIn}</h4><p>${policies.checkIn}</p></div>
                <div class="policy-item"><h4>${labels.checkOut}</h4><p>${policies.checkOut}</p></div>
                <div class="policy-item"><h4>${labels.pets}</h4><p>${policies.pets}</p></div>
                <div class="policy-item"><h4>${labels.children}</h4><p>${policies.children}</p></div>
            </div>
        </section>

        <section class="details-section">
            <h2>${labels.nearby}</h2>
            <ul class="details-list">${nearbyHTML}</ul>
        </section>

        <section class="details-section weather-section">
            <h2>${labels.weather}</h2>
            <div class="weather-widget">
                <span>${weatherTemp}</span>
                <p>${weatherCondition}</p>
            </div>
        </section>

        <section class="details-section reviews-section">
            <h2>${labels.reviews}</h2>
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

    setupSlider();
}

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

renderDetails();

// Re-render when language changes
document.addEventListener('langChanged', function() {
    renderDetails();
});
