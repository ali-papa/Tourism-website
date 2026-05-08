// SVG icons for theme toggle
const ICON_SUN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`;

const ICON_MOON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

document.addEventListener("DOMContentLoaded", () => {
  // 1. استرجاع الثيم المحفوظ
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 2. حقن الأيقونة في زرار الثيم الموجود في الـ HTML
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.innerHTML = savedTheme === 'dark' ? ICON_SUN : ICON_MOON;

    themeBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.innerHTML = newTheme === 'dark' ? ICON_SUN : ICON_MOON;
    });
  }

  // 3. منطق اللغة
  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    // Set correct label on load
    const currentLang = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('lang') || 'en');
    langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';

    langBtn.addEventListener("click", () => {
      if (typeof setLang === 'function') {
        const newLang = getLang() === 'ar' ? 'en' : 'ar';
        setLang(newLang);
        langBtn.textContent = newLang === 'ar' ? 'EN' : 'AR';
      }
    });
  }

  // 4. منطق الموبايل منيو
  const hamburger = document.getElementById("navHamburger");
  const links = document.querySelector(".nav-links");
  if (hamburger && links) {
    hamburger.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }
});
