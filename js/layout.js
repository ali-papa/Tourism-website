document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const page = document.body.dataset.page || "home";

  if (header) {
    header.innerHTML = `
      <nav class="navbar">
        <a href="index.html" class="logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Tourism
        </a>

        <div class="nav-links">
          <a href="index.html" class="${page === 'home' ? 'active' : ''}">Home</a>
          <a href="search.html" class="${page === 'search' ? 'active' : ''}">Explore</a>
          <a href="booking.html" class="${page === 'booking' ? 'active' : ''}">Book</a>
          <a href="login.html" class="nav-cta">Sign in</a>
        </div>

        <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer">
        <p>© 2026 Tourism Website</p>
      </div>
    `;
  }

  const btn = document.getElementById("navHamburger");
  const links = document.querySelector(".nav-links");

  if (btn && links) {
    btn.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }
});