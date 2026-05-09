// ============================================================
//  TRANSLATIONS.JS  — Lightweight EN/AR language support
// ============================================================

const TRANSLATIONS = {
  en: {
    // Navbar
    home:    "Home",
    explore: "Explore",
    book:    "Book",
    signin:  "Sign in",
    logout:  "Logout",
    lang_label: "AR",

    // Hero
    hero_title:    "Discover the World",
    hero_subtitle: "Explore amazing places inside and outside Egypt",
    hero_btn:      "✈ Explore Now",
    hero_search:   "Search Destinations",

    // World map section
    world_kicker:   "WORLD EXPLORER",
    world_title:    "Explore Every Corner of the Planet",
    world_subtitle: "From iconic cities to hidden gems, your next unforgettable journey starts here.",

    // Landmark
    landmark_badge: "⭐ Featured Landmark",
    landmark_title: "Universal Studios Japan",
    landmark_desc:  "One of the world's most iconic theme parks — home to the legendary USJ Globe in the heart of Osaka, Japan.",
    landmark_cta:   "Explore Tokyo & Japan",

    // Destinations
    destinations_title: "Popular Destinations",
    avg_per_night: "avg per night",
    view_details:  "View Details",

    // Search page
    search_placeholder: "Where do you want to go?",
    search_btn: "Search",
    all_categories: "All",
    filters: "Filters",

    // Booking
    manage_trips:  "Manage your trips",
    manage_sub:    "Track your bookings and saved destinations.",

    // Details
    back: "← Back",
    book_now: "Book Now",

    // Footer
    footer_desc:   "Discover the world's most beautiful destinations with us. Your journey starts here.",
    quick_links:   "Quick Links",
    contact_us:    "Contact Us",
    footer_rights: "© 2026 Tourism Website | Designed with ❤️",
    book_now_footer: "Book Now",

    // Login page
    welcome_back:   "Welcome Back",
    no_account:     "Don't have an account?",
    register_link:  "Register",
    login_submit:   "Sign in",

    // Register page
    create_account: "Create Account",
    have_account:   "Already have an account?",
    login_link:     "Login",
    register_btn:   "Register",

    // Placeholders
    ph_email:       "Email",
    ph_password:    "Password",
    ph_first_name:  "First Name",
    ph_last_name:   "Last Name",
    ph_enter_email: "Enter your email",
    ph_enter_pw:    "Enter password",
    ph_confirm_pw:  "Confirm password",

    // Search page hero
    search_curated:     "Curated destinations worldwide",
    search_hero_title:  "Where do you want to explore next?",
    search_hero_sub:    "Discover extraordinary places — from ancient ruins to tropical escapes",
    destination_label:  "Destination",
    check_in_label:     "Check in",
    check_out_label:    "Check out",
    ph_city:            "City, country, or attraction...",
    ph_min:             "Min",
    ph_max:             "Max",

    // Search filters
    filters_title:      "Filters",
    reset_all:          "Reset all",
    sort_by:            "Sort by",
    category_label:     "Category",
    price_range:        "Price range",
    min_rating_label:   "Minimum rating",
    any_rating:         "Any",
    apply_filters:      "Apply filters",
    sort_relevance:     "Relevance",
    price_low_high:     "Price: low → high",
    price_high_low:     "Price: high → low",
    sort_rating:        "Rating: high → low",
    sort_name:          "Name: A → Z",
    all_categories_opt: "All categories",
    sort_label_txt:     "Sort:",
    filters_btn:        "Filters",
    searching:          "Searching…",
    from_label:         "From",
    view_deal:          "View deal",

    // Results
    no_results_title: "No destinations found",
    no_results_sub:   "Try adjusting your filters or search for a different destination.",
    clear_filters:    "Clear all filters",

    // Booking page
    my_bookings:    "My Bookings",
    saved_items:    "Saved Items",
    no_bookings:    "No bookings yet.",
    empty_wishlist: "Your wishlist is empty.",
    confirm_pay:    "Confirm & Pay",
    trip_processed: "Trip processed successfully.",
    pending_status: "Pending Confirmation",
    paid_status:    "✅ Paid",
    saved_badge:    "♥️ Saved",
    remove_btn:     "Remove",
    price_lbl:      "Price:",
    rooms_lbl:      "Rooms:",
    checkin_lbl:    "Check-in:",
    checkout_lbl:   "Check-out:",
    please_login:   "Please login first to book a room!",

    // Chat
    chat_title:       "Support Chat",
    chat_placeholder: "Type a message...",
    chat_send:        "Send",
    chat_welcome:     "👋 Hi! How can I help you today?",
    chat_options: [
      "Hello 👋",
      "Booking help",
      "Contact support",
      "Pricing info"
    ],
    chat_replies: {
      "Hello 👋":        "Hello! Welcome to Tourism. How can I assist you?",
      "Booking help":    "Sure! You can manage your bookings from the 'Book' page. Need more help?",
      "Contact support": "You can reach us at support@tourism.com or call +20 123 456 789.",
      "Pricing info":    "Prices vary by destination. Check the Explore page for up-to-date rates.",
      "default":         "Thanks for your message! Our team will get back to you shortly."
    }
  },

  ar: {
    // Navbar
    home:    "الرئيسية",
    explore: "استكشف",
    book:    "احجز",
    signin:  "تسجيل الدخول",
    logout:  "تسجيل الخروج",
    lang_label: "EN",

    // Hero
    hero_title:    "اكتشف العالم",
    hero_subtitle: "استكشف أجمل الأماكن داخل وخارج مصر",
    hero_btn:      "✈ استكشف الآن",
    hero_search:   "ابحث عن وجهات",

    // World map section
    world_kicker:   "مستكشف العالم",
    world_title:    "استكشف كل زاوية في الكوكب",
    world_subtitle: "من المدن الشهيرة إلى الجواهر الخفية، رحلتك التالية تبدأ هنا.",

    // Landmark
    landmark_badge: "⭐ معلم مميز",
    landmark_title: "يونيفرسال ستوديوز اليابان",
    landmark_desc:  "واحدة من أشهر متنزهات الترفيه في العالم، موطن الكرة الأسطورية في قلب أوساكا، اليابان.",
    landmark_cta:   "استكشف طوكيو واليابان",

    // Destinations
    destinations_title: "الوجهات الأكثر شعبية",
    avg_per_night: "متوسط سعر الليلة",
    view_details:  "عرض التفاصيل",

    // Search page
    search_placeholder: "إلى أين تريد الذهاب؟",
    search_btn: "بحث",
    all_categories: "الكل",
    filters: "الفلاتر",

    // Booking
    manage_trips:  "إدارة رحلاتك",
    manage_sub:    "تتبع حجوزاتك ووجهاتك المحفوظة.",

    // Details
    back: "→ رجوع",
    book_now: "احجز الآن",

    // Footer
    footer_desc:   "اكتشف أجمل وجهات العالم معنا. رحلتك تبدأ من هنا.",
    quick_links:   "روابط سريعة",
    contact_us:    "اتصل بنا",
    footer_rights: "© 2026 موقع السياحة | صُمم بـ ❤️",
    book_now_footer: "احجز الآن",

    // Login page
    welcome_back:   "مرحباً من جديد",
    no_account:     "ليس لديك حساب؟",
    register_link:  "سجّل الآن",
    login_submit:   "تسجيل الدخول",

    // Register page
    create_account: "إنشاء حساب",
    have_account:   "لديك حساب بالفعل؟",
    login_link:     "تسجيل الدخول",
    register_btn:   "تسجيل",

    // Placeholders
    ph_email:       "البريد الإلكتروني",
    ph_password:    "كلمة المرور",
    ph_first_name:  "الاسم الأول",
    ph_last_name:   "اسم العائلة",
    ph_enter_email: "أدخل بريدك الإلكتروني",
    ph_enter_pw:    "أدخل كلمة المرور",
    ph_confirm_pw:  "تأكيد كلمة المرور",

    // Search page hero
    search_curated:     "وجهات مختارة حول العالم",
    search_hero_title:  "إلى أين تريد الاستكشاف؟",
    search_hero_sub:    "اكتشف أماكن استثنائية — من الآثار القديمة إلى الشواطئ الاستوائية",
    destination_label:  "الوجهة",
    check_in_label:     "تسجيل الوصول",
    check_out_label:    "تسجيل المغادرة",
    ph_city:            "مدينة، دولة، أو معلم...",
    ph_min:             "أدنى",
    ph_max:             "أقصى",

    // Search filters
    filters_title:      "الفلاتر",
    reset_all:          "إعادة تعيين",
    sort_by:            "ترتيب حسب",
    category_label:     "الفئة",
    price_range:        "نطاق السعر",
    min_rating_label:   "أقل تقييم",
    any_rating:         "أي",
    apply_filters:      "تطبيق الفلاتر",
    sort_relevance:     "الأكثر صلة",
    price_low_high:     "السعر: من الأدنى للأعلى",
    price_high_low:     "السعر: من الأعلى للأدنى",
    sort_rating:        "التقييم: من الأعلى للأدنى",
    sort_name:          "الاسم: أ ← ي",
    all_categories_opt: "جميع الفئات",
    sort_label_txt:     "ترتيب:",
    filters_btn:        "الفلاتر",
    searching:          "جارٍ البحث…",
    from_label:         "من",
    view_deal:          "عرض العرض",

    // Results
    no_results_title: "لا توجد وجهات",
    no_results_sub:   "جرّب تعديل الفلاتر أو البحث عن وجهة مختلفة.",
    clear_filters:    "مسح جميع الفلاتر",

    // Booking page
    my_bookings:    "حجوزاتي",
    saved_items:    "المحفوظات",
    no_bookings:    "لا توجد حجوزات بعد.",
    empty_wishlist: "قائمة الرغبات فارغة.",
    confirm_pay:    "تأكيد والدفع",
    trip_processed: "تم معالجة الرحلة بنجاح.",
    pending_status: "في انتظار التأكيد",
    paid_status:    "✅ مدفوع",
    saved_badge:    "♥️ محفوظ",
    remove_btn:     "إزالة",
    price_lbl:      "السعر:",
    rooms_lbl:      "الغرف:",
    checkin_lbl:    "تسجيل الوصول:",
    checkout_lbl:   "تسجيل المغادرة:",
    please_login:   "يرجى تسجيل الدخول أولاً للحجز!",

    // Chat
    chat_title:       "الدعم الفوري",
    chat_placeholder: "اكتب رسالة...",
    chat_send:        "إرسال",
    chat_welcome:     "👋 مرحباً! كيف يمكنني مساعدتك؟",
    chat_options: [
      "مرحباً 👋",
      "مساعدة في الحجز",
      "تواصل مع الدعم",
      "معلومات الأسعار"
    ],
    chat_replies: {
      "مرحباً 👋":         "مرحباً! أهلاً بك في موقع السياحة. كيف أساعدك؟",
      "مساعدة في الحجز":  "بالطبع! يمكنك إدارة حجوزاتك من صفحة 'احجز'. هل تحتاج مزيداً من المساعدة؟",
      "تواصل مع الدعم":   "يمكنك التواصل معنا على support@tourism.com أو الاتصال على +20 123 456 789.",
      "معلومات الأسعار":  "تتفاوت الأسعار حسب الوجهة. تفقد صفحة الاستكشاف للاطلاع على أحدث الأسعار.",
      "default":           "شكراً لرسالتك! سيتواصل معك فريقنا قريباً."
    }
  }
};

// ── Core Language Functions ──────────────────────────────

function getLang() {
  return localStorage.getItem('lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'][key]) || key;
}

function applyLang(lang) {
  const tr = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // RTL / LTR
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);

  // Translate all elements with data-lang attribute
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (tr[key] !== undefined) {
      // Don't overwrite elements that have child nodes we care about (icons etc.)
      if (el.children.length === 0) {
        el.textContent = tr[key];
      } else {
        // Only update text nodes, preserve child elements
        for (const node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = tr[key];
            break;
          }
        }
      }
    }
  });

  // Translate select option text with data-lang-opt
  document.querySelectorAll('option[data-lang-opt]').forEach(el => {
    const key = el.getAttribute('data-lang-opt');
    if (tr[key] !== undefined) {
      el.textContent = tr[key];
    }
  });

  // Translate input placeholders with data-placeholder-lang
  document.querySelectorAll('[data-placeholder-lang]').forEach(el => {
    const key = el.getAttribute('data-placeholder-lang');
    if (tr[key] !== undefined) {
      el.placeholder = tr[key];
    }
  });

  // Update lang toggle button label
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = tr.lang_label;

  // Update page title direction for RTL
  if (lang === 'ar') {
    document.body.style.fontFamily = "'Cairo', 'DM Sans', sans-serif";
  } else {
    document.body.style.fontFamily = "";
  }
}

// ── Init on DOM ready ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load Arabic font if needed
  if (!document.getElementById('cairo-font')) {
    const link = document.createElement('link');
    link.id   = 'cairo-font';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
    document.head.appendChild(link);
  }
  applyLang(getLang());
});
