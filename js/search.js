/* ═══════════════════════════════════════════════════════
   search.js  –  Premium Search Logic
   Paste into: js/search.js
   ═══════════════════════════════════════════════════════ */

"use strict";

// ── State ────────────────────────────────────────────────
const state = {
    query: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "0",
    sortBy: "relevance",
    quickCategory: "all"
};

// ── Bootstrap ────────────────────────────────────────────
function initSearchPage() {
    buildCategorySelect();
    buildQuickChips();
    showSkeletons();

    // Small delay so skeletons flash visibly (feels snappier than instant)
    setTimeout(() => applySearch(), 120);
}

// ── Categories ───────────────────────────────────────────
function getUniqueCategories() {
    return ["all", ...new Set(destinations.map(d => d.category))];
}

function buildCategorySelect() {
    const sel = document.getElementById("categorySelect");
    if (!sel || sel.options.length > 1) return;

    getUniqueCategories().slice(1).forEach(cat => {
        const o = document.createElement("option");
        o.value = cat;
        o.textContent = cat;
        sel.appendChild(o);
    });
}

function buildQuickChips() {
    const wrap = document.getElementById("quickFilters");
    if (!wrap || wrap.dataset.ready) return;

    wrap.innerHTML = getUniqueCategories().map(cat => `
        <button
            class="quick-chip${cat === "all" ? " active" : ""}"
            type="button"
            data-category="${cat}"
            onclick="setQuickCategory('${cat}')"
        >${cat === "all" ? "🌍 All" : cat}</button>
    `).join("");

    wrap.dataset.ready = "true";
}

// ── Quick chips ──────────────────────────────────────────
function setQuickCategory(category) {
    state.quickCategory = category;

    document.querySelectorAll(".quick-chip").forEach(btn =>
        btn.classList.toggle("active", btn.dataset.category === category)
    );

    const sel = document.getElementById("categorySelect");
    if (sel) sel.value = category;

    applySearch();
}

// ── Rating buttons ───────────────────────────────────────
function setRating(btn, value) {
    document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const hiddenSel = document.getElementById("minRating");
    if (hiddenSel) hiddenSel.value = value;

    applySearch();
    updateActiveFilterCount();
}

// ── Sort sync (desktop ↔ mobile) ─────────────────────────
function syncSort(source) {
    const desktop = document.getElementById("sortSelect");
    const mobile  = document.getElementById("sortSelectMobile");

    if (source === "desktop" && mobile) mobile.value = desktop.value;
    if (source === "mobile"  && desktop) desktop.value = mobile.value;

    applySearch();
}

// ── Clear ────────────────────────────────────────────────
function clearFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("categorySelect").value = "all";
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";

    // Rating buttons reset
    document.querySelectorAll(".rating-btn").forEach(b =>
        b.classList.toggle("active", b.dataset.val === "0")
    );
    const hiddenSel = document.getElementById("minRating");
    if (hiddenSel) hiddenSel.value = "0";

    // Sort reset
    const ds = document.getElementById("sortSelect");
    const ms = document.getElementById("sortSelectMobile");
    if (ds) ds.value = "relevance";
    if (ms) ms.value = "relevance";

    setQuickCategory("all");
    updateActiveFilterCount();
}

// ── Main search ──────────────────────────────────────────
function applySearch() {
    const input    = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
    const category = document.getElementById("categorySelect")?.value || "all";
    const minPrice = document.getElementById("minPrice")?.value || "";
    const maxPrice = document.getElementById("maxPrice")?.value || "";
    const minRating= document.getElementById("minRating")?.value || "0";
    const sortBy   = document.getElementById("sortSelect")?.value || "relevance";

    // Update state
    Object.assign(state, { query: input, category, minPrice, maxPrice, minRating, sortBy });

    let results = destinations.filter(item => {
        const haystack = [
            item.name,
            item.country,
            item.category,
            item.shortDescription,
            item.description,
            ...(item.nearbyPlaces || [])
        ].join(" ").toLowerCase();

        const matchesQuery    = !input      || haystack.includes(input);
        const matchesCategory = category === "all" || item.category === category;
        const matchesQuick    = state.quickCategory === "all" || item.category === state.quickCategory;
        const matchesMinPrice = !minPrice   || item.price >= Number(minPrice);
        const matchesMaxPrice = !maxPrice   || item.price <= Number(maxPrice);
        const matchesRating   = !minRating  || item.rating >= Number(minRating);

        return matchesQuery && matchesCategory && matchesQuick
            && matchesMinPrice && matchesMaxPrice && matchesRating;
    });

    results = sortResults(results, sortBy);
    renderResults(results);
    updateActiveFilterCount();
}

// ── Sort ─────────────────────────────────────────────────
function sortResults(list, sortBy) {
    const s = [...list];
    switch (sortBy) {
        case "priceAsc":   return s.sort((a, b) => a.price - b.price);
        case "priceDesc":  return s.sort((a, b) => b.price - a.price);
        case "ratingDesc": return s.sort((a, b) => b.rating - a.rating);
        case "nameAsc":    return s.sort((a, b) => a.name.localeCompare(b.name));
        default:           return s;
    }
}

// ── Render ───────────────────────────────────────────────
function renderResults(results) {
    const grid  = document.getElementById("results");
    const count = document.getElementById("resultsCount");
    if (!grid) return;

    grid.innerHTML = "";

    if (!results.length) {
        count.textContent = "0 destinations";
        grid.innerHTML = `
            <div class="no-results">
                <span class="no-results-icon">🔍</span>
                <h3 class="no-results-title">No destinations found</h3>
                <p class="no-results-sub">Try adjusting your filters or search for a different destination.</p>
                <button class="no-results-btn" onclick="clearFilters()">Clear all filters</button>
            </div>
        `;
        return;
    }

    count.textContent = `${results.length} destination${results.length !== 1 ? "s" : ""} found`;

    results.forEach((item, i) => {
        const card = document.createElement("div");
        card.className = "destination-card";
        card.style.animationDelay = `${Math.min(i * 35, 280)}ms`;
        card.onclick = () => goToDetails(item.id);
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="card-img-overlay"></div>
                <span class="card-badge-cat">${item.category}</span>
                <span class="card-badge-rating">
                    <span class="star-icon">★</span>${item.rating}
                </span>
                <span class="card-country-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${item.country}
                </span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.shortDescription}</p>
                <div class="card-footer">
                    <div class="card-price">
                        <span class="card-price-label">From</span>
                        <span class="card-price-value">
                            ${item.price.toLocaleString()}
                            <span class="card-price-currency">${item.currency || "USD"}</span>
                        </span>
                    </div>
                    <button class="card-cta" tabindex="-1">View deal →</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ── Skeletons ─────────────────────────────────────────────
function showSkeletons(count = 6) {
    const grid  = document.getElementById("results");
    const counter = document.getElementById("resultsCount");
    if (!grid) return;

    if (counter) counter.textContent = "Searching…";

    grid.innerHTML = Array.from({ length: count }, () => `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-body">
                <div class="skeleton-line w80"></div>
                <div class="skeleton-line w60"></div>
                <div class="skeleton-line w40"></div>
            </div>
        </div>
    `).join("");
}

// ── Active filter count (badge on mobile filter btn) ──────
function updateActiveFilterCount() {
    const badge = document.getElementById("activeFilterCount");
    if (!badge) return;

    let n = 0;
    if (state.query)            n++;
    if (state.category !== "all" || state.quickCategory !== "all") n++;
    if (state.minPrice)         n++;
    if (state.maxPrice)         n++;
    if (state.minRating !== "0") n++;

    badge.textContent = n;
    badge.style.display = n > 0 ? "inline" : "none";
}

// ── Mobile filter panel ───────────────────────────────────
function openMobileFilters() {
    document.getElementById("filtersSidebar")?.classList.add("open");
    document.getElementById("filtersOverlay")?.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeMobileFilters() {
    document.getElementById("filtersSidebar")?.classList.remove("open");
    document.getElementById("filtersOverlay")?.classList.remove("open");
    document.body.style.overflow = "";
}

// ── Navigation ────────────────────────────────────────────
function goToDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

// ── Init ─────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", initSearchPage);

// Expose globals
window.search           = applySearch;
window.clearFilters     = clearFilters;
window.goToDetails      = goToDetails;
window.setQuickCategory = setQuickCategory;
window.setRating        = setRating;
window.syncSort         = syncSort;
window.openMobileFilters  = openMobileFilters;
window.closeMobileFilters = closeMobileFilters;