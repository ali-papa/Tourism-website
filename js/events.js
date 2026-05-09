// ============================================================
//  events.js — كل اللوجيك الخاص بصفحة الـ Events
//  مسؤول عن: البيانات، بناء الـ cards، الـ tabs، والـ filter
// ============================================================


// ════════════════════════════════════════════════════════════
//  DATA — البيانات الثابتة
// ════════════════════════════════════════════════════════════

// مصفوفة الـ events — كل object هو event واحد بخصائصه
// region → بيُستخدم في الـ filter عشان نعرف نفلتر بصح
// upcoming → boolean بيحدد لو الـ event جاي أو عدى
const eventsData = [
    { id:"ev1",  destination:1,  country:"Egypt",    region:"egypt",       title:"Eid Al-Adha Celebrations",         emoji:"🐑", date:"June 6–10, 2025",         upcoming:true,  tag:"Religious",  tagColor:"#10b981", description:"Streets fill with prayers, family feasts, and the spirit of giving.",                               highlights:["Grand mosque prayers","Traditional feasts","Street celebrations","Family gatherings"] },
    { id:"ev2",  destination:1,  country:"Egypt",    region:"egypt",       title:"Cairo International Film Festival", emoji:"🎬", date:"November, 2025",          upcoming:false, tag:"Culture",    tagColor:"#6366f1", description:"One of the oldest film festivals in the Arab world.",                                               highlights:["Red carpet events","100+ films","International stars","Award ceremonies"] },
    { id:"ev3",  destination:1,  country:"Egypt",    region:"egypt",       title:"Abu Simbel Sun Festival",           emoji:"☀️", date:"Feb 22 & Oct 22",         upcoming:false, tag:"Historical", tagColor:"#f59e0b", description:"Sunlight perfectly illuminates the inner sanctuary — a 3,000-year-old astronomical marvel.",       highlights:["Solar alignment","Ancient temple","Photography event","Cultural performances"] },
    { id:"ev4",  destination:2,  country:"UAE",      region:"middle-east", title:"Dubai Shopping Festival",           emoji:"🛍️", date:"Jan–Feb, 2026",          upcoming:true,  tag:"Shopping",   tagColor:"#ec4899", description:"The world's biggest shopping festival with discounts, fireworks, and luxury car raffles.",           highlights:["Mega discounts","Fireworks shows","Live concerts","Luxury car raffles"] },
    { id:"ev5",  destination:2,  country:"UAE",      region:"middle-east", title:"Dubai Expo City Events",            emoji:"🏙️", date:"Year-round",              upcoming:false, tag:"Modern",     tagColor:"#0ea5e9", description:"World-class cultural events, concerts, and international exhibitions.",                             highlights:["International pavilions","Tech exhibitions","Food festivals","Concerts"] },
    { id:"ev6",  destination:3,  country:"France",   region:"europe",      title:"Bastille Day – Paris",              emoji:"🇫🇷", date:"July 14, 2025",          upcoming:true,  tag:"National",   tagColor:"#3b82f6", description:"Military parade down the Champs-Élysées and fireworks over the Eiffel Tower.",                      highlights:["Military parade","Eiffel Tower fireworks","Open-air concerts","Street parties"] },
    { id:"ev7",  destination:4,  country:"Italy",    region:"europe",      title:"Venice Carnival",                   emoji:"🎭", date:"February, 2026",          upcoming:true,  tag:"Festival",   tagColor:"#8b5cf6", description:"Elaborate masks, gondola parades, and centuries-old traditions.",                                  highlights:["Mask parade","Gondola festival","Grand balls","Street performers"] },
    { id:"ev8",  destination:5,  country:"Turkey",   region:"europe",      title:"Istanbul Tulip Festival",           emoji:"🌷", date:"April, 2026",             upcoming:true,  tag:"Nature",     tagColor:"#f43f5e", description:"Over 30 million tulips transform Istanbul into a sea of color.",                                   highlights:["30M+ tulips","Park festivals","Photography walks","Cultural shows"] },
    { id:"ev9",  destination:9,  country:"Spain",    region:"europe",      title:"La Tomatina – Barcelona",           emoji:"🍅", date:"August, 2025",            upcoming:false, tag:"Festival",   tagColor:"#ef4444", description:"The world's biggest food fight in the streets.",                                                  highlights:["Epic food fight","Street parties","Live music","Spanish culture"] },
    { id:"ev10", destination:6,  country:"Japan",    region:"asia",        title:"Tokyo Cherry Blossom Festival",     emoji:"🌸", date:"Late March–April, 2026",  upcoming:true,  tag:"Nature",     tagColor:"#f9a8d4", description:"Hanami season — Tokyo transforms into a pink dreamscape.",                                        highlights:["Sakura picnics","Night illuminations","Traditional tea","Photography spots"] },
    { id:"ev11", destination:13, country:"Thailand", region:"asia",        title:"Songkran – Water Festival",         emoji:"💦", date:"April 13–15, 2026",       upcoming:true,  tag:"Festival",   tagColor:"#06b6d4", description:"Thailand's New Year — the world's biggest water fight!",                                          highlights:["City-wide water fight","Temple blessings","Street parades","Night concerts"] },
    { id:"ev12", destination:15, country:"Brazil",   region:"americas",    title:"Rio Carnival",                      emoji:"🎊", date:"Feb/March, 2026",         upcoming:true,  tag:"Festival",   tagColor:"#f97316", description:"2 million people per day fill the streets with samba parades and non-stop music.",                 highlights:["Samba parade","Sambadrome shows","Street blocks","Costume competition"] },
    { id:"ev13", destination:8,  country:"USA",      region:"americas",    title:"New York New Year's Eve",           emoji:"🎆", date:"December 31, 2025",       upcoming:true,  tag:"National",   tagColor:"#facc15", description:"Times Square ball drop watched by over a billion people worldwide.",                              highlights:["Ball drop ceremony","Live concerts","Fireworks display","Times Square party"] },
];

// مصفوفة الـ guides — كل object هو guide واحد
// avatar → الحرفين الأوليين من الاسم، بيتعرضوا لو الصورة مش موجودة
// color  → لون مميز لكل guide بيتطبق على الـ avatar وتأثيرات البطاقة
const guidesData = [
    { id:"g1", destination:1,  flag:"🇪🇬", name:"Ahmed El-Masry",  specialty:"Ancient History & Archaeology",  languages:["Arabic","English","French"],      rating:4.9, reviews:312, experience:"12 yrs", price:45,  avatar:"AE", color:"#f59e0b", tours:["Pyramids of Giza","Egyptian Museum","Luxor Temples","Nile Cruise"] },
    { id:"g2", destination:1,  flag:"🇪🇬", name:"Nour Hassan",     specialty:"Cairo Food & Culture Tours",      languages:["Arabic","English"],               rating:4.8, reviews:187, experience:"7 yrs",  price:35,  avatar:"NH", color:"#10b981", tours:["Khan El Khalili","Old Cairo","Street Food Walk","Islamic Cairo"] },
    { id:"g3", destination:2,  flag:"🇦🇪", name:"Omar Al-Rashidi", specialty:"Modern Dubai & Architecture",     languages:["Arabic","English","Hindi"],       rating:4.9, reviews:445, experience:"10 yrs", price:80,  avatar:"OA", color:"#0ea5e9", tours:["Burj Khalifa","Dubai Marina","Desert Safari","Gold Souk"] },
    { id:"g4", destination:3,  flag:"🇫🇷", name:"Sophie Dubois",   specialty:"Art, History & Gastronomy",       languages:["French","English","Spanish"],     rating:4.9, reviews:521, experience:"15 yrs", price:95,  avatar:"SD", color:"#6366f1", tours:["Louvre Museum","Versailles","Montmartre","French Cuisine Tour"] },
    { id:"g5", destination:6,  flag:"🇯🇵", name:"Yuki Tanaka",     specialty:"Traditional Culture & Anime",     languages:["Japanese","English"],             rating:5.0, reviews:634, experience:"9 yrs",  price:110, avatar:"YT", color:"#ec4899", tours:["Shibuya & Harajuku","Akihabara","Senso-ji Temple","Teamlab"] },
    { id:"g6", destination:5,  flag:"🇹🇷", name:"Mehmet Yilmaz",   specialty:"Ottoman History & Bazaars",       languages:["Turkish","English","German"],     rating:4.8, reviews:289, experience:"11 yrs", price:55,  avatar:"MY", color:"#8b5cf6", tours:["Hagia Sophia","Grand Bazaar","Topkapi Palace","Bosphorus Cruise"] },
    { id:"g7", destination:15, flag:"🇧🇷", name:"Carlos Santos",   specialty:"Carnival & Beach Culture",        languages:["Portuguese","English","Spanish"], rating:4.7, reviews:198, experience:"8 yrs",  price:65,  avatar:"CS", color:"#f97316", tours:["Christ the Redeemer","Carnival Backstage","Copacabana","Favela Tour"] },
    { id:"g8", destination:13, flag:"🇹🇭", name:"Somchai Wongsa",  specialty:"Temples & Street Food",           languages:["Thai","English"],                 rating:4.8, reviews:356, experience:"6 yrs",  price:40,  avatar:"SW", color:"#06b6d4", tours:["Grand Palace","Wat Pho","Floating Market","Street Food Night Tour"] },
];


// ════════════════════════════════════════════════════════════
//  RENDER FUNCTIONS — دوال بناء الـ HTML ديناميكياً
// ════════════════════════════════════════════════════════════

// renderEvents(filter) → بيبني cards الـ events في الـ #eventsGrid
// filter: "all" | "upcoming" | اسم الـ region (egypt, europe, …)
function renderEvents(filter = "all") {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return; // لو الصفحة مش فيها eventsGrid، اخرج من الدالة

    // فلترة البيانات حسب الـ filter المطلوب
    const list = filter === "upcoming"
        ? eventsData.filter(e => e.upcoming)       // بس الـ events اللي upcoming = true
        : filter === "all"
        ? eventsData                               // كل الـ events من غير فلترة
        : eventsData.filter(e => e.region === filter); // فلتر حسب المنطقة (egypt, europe, …)

    // لو في نتائج: ابني HTML لكل event باستخدام map
    // لو مفيش نتائج: ارسم رسالة "No events found."
    grid.innerHTML = list.length
        ? list.map(e => `
            <div class="ev-card">
                <div class="ev-card-header">
                    <span class="ev-emoji">${e.emoji}</span>
                    <div class="ev-card-meta">
                        <!-- الـ tagColor بيتطبق inline كـ background بـ opacity 20% وكـ color للنص -->
                        <span class="ev-tag" style="background:${e.tagColor}20;color:${e.tagColor}">${e.tag}</span>
                        <!-- badge "⭐ Upcoming" بيبان بس لو upcoming = true -->
                        ${e.upcoming ? '<span class="ev-upcoming-badge">⭐ Upcoming</span>' : ''}
                    </div>
                </div>
                <div class="ev-card-body">
                    <h3 class="ev-card-title">${e.title}</h3>
                    <div class="ev-card-location">
                        <i class="fas fa-map-marker-alt"></i> ${e.country}
                        <span class="ev-dot">·</span>
                        <i class="fas fa-calendar-alt"></i> ${e.date}
                    </div>
                    <p class="ev-card-desc">${e.description}</p>
                    <!-- highlights: قائمة نقاط مميزة للـ event، بنبنيها بـ map تاني -->
                    <ul class="ev-highlights">
                        ${e.highlights.map(h => `<li><i class="fas fa-check-circle"></i>${h}</li>`).join("")}
                    </ul>
                </div>
                <div class="ev-card-footer">
                    <!-- الزرار بيوديك لصفحة تفاصيل الـ destination المرتبط بالـ event -->
                    <a href="details.html?id=${e.destination}" class="ev-explore-btn">
                        Explore ${e.country} <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>`).join("") // join("") عشان نجمع كل الـ strings من غير فاصل
        : `<div class="ev-empty">No events found.</div>`;
}


// renderGuides() → بيبني cards الـ guides في الـ #guidesGrid
// مفيش filter هنا — بيعرض كل الـ guides دايماً
function renderGuides() {
    const grid = document.getElementById("guidesGrid");
    if (!grid) return;

    grid.innerHTML = guidesData.map(g => `
        <div class="guide-card">
            <!-- الـ avatar دايرة بلون مميز لكل guide (الـ color من الـ data) -->
            <div class="guide-avatar" style="background:${g.color}20;color:${g.color}">${g.avatar}</div>
            <div class="guide-info">
                <div class="guide-header">
                    <div>
                        <h3 class="guide-name">${g.name} ${g.flag}</h3>
                        <p class="guide-specialty">${g.specialty}</p>
                    </div>
                    <!-- التقييم: نجمة + رقم + عدد الـ reviews بين قوسين -->
                    <div class="guide-rating">
                        <i class="fas fa-star"></i> <strong>${g.rating}</strong> <span>(${g.reviews})</span>
                    </div>
                </div>
                <div class="guide-stats">
                    <span class="guide-stat"><i class="fas fa-clock"></i> ${g.experience}</span>
                    <!-- join(", ") بيحول array اللغات لـ string: "Arabic, English, French" -->
                    <span class="guide-stat"><i class="fas fa-globe"></i> ${g.languages.join(", ")}</span>
                </div>
                <!-- tags الجولات: كل tour بيبقى span صغير -->
                <div class="guide-tours">
                    ${g.tours.map(t => `<span class="guide-tour-tag">${t}</span>`).join("")}
                </div>
                <div class="guide-footer">
                    <div class="guide-price">
                        <span class="guide-price-from">from</span>
                        <strong>$${g.price}</strong>
                        <span>/ half day</span>
                    </div>
                    <a href="details.html?id=${g.destination}" class="guide-book-btn">View Destination</a>
                </div>
            </div>
        </div>`).join("");
}


// ════════════════════════════════════════════════════════════
//  CONTROLS — دوال التحكم في الـ UI
// ════════════════════════════════════════════════════════════

// switchTab(tab) → بيبدّل بين Tab الـ Events وTab الـ Guides
// tab: "events" | "guides"
function switchTab(tab) {
    // خطوة 1: شيل active من كل الـ tabs، وحطها بس على الـ tab اللي اتضغط
    document.querySelectorAll(".ev-tab").forEach(b =>
        b.classList.toggle("active", b.dataset.tab === tab)
        // toggle(class, condition): يضيف الـ class لو الـ condition = true، ويشيله لو false
    );

    // خطوة 2: شيل active-section من كل الـ sections (يخفيهم كلهم)
    document.querySelectorAll(".ev-section").forEach(s =>
        s.classList.remove("active-section")
    );

    // خطوة 3: حط active-section على الـ section الصح بس
    document.getElementById(
        tab === "events" ? "events-section" : "guides-section"
    ).classList.add("active-section");
}


// filterEvents(filter, btn) → بيفلتر الـ events حسب المنطقة
// filter: "all" | "upcoming" | "egypt" | "europe" | …
// btn: الزرار اللي اتضغط (عشان نحط عليه الـ active style)
function filterEvents(filter, btn) {
    // شيل active من كل الـ filter buttons
    document.querySelectorAll(".ev-filter").forEach(b => b.classList.remove("active"));

    // حط active على الزرار اللي اتضغط بس
    btn.classList.add("active");

    // أعد رسم الـ events بالـ filter الجديد
    renderEvents(filter);
}


// ════════════════════════════════════════════════════════════
//  INIT — تشغيل أول ما الصفحة تتحمل
// ════════════════════════════════════════════════════════════

// DOMContentLoaded: بينتظر الـ HTML يتبني الأول قبل ما يشغّل الكود
// عشان #eventsGrid و #guidesGrid يكونوا موجودين في الـ DOM
document.addEventListener("DOMContentLoaded", () => {
    renderEvents();  // ارسم كل الـ events (filter = "all" افتراضياً)
    renderGuides();  // ارسم كل الـ guides
});