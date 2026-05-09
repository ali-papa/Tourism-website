// ============================================================
//  UPDATED UI.JS  (full replacement — drop into js/ui.js)
// ============================================================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function getDisplayName(user) {
    if (!user) return "Sign in";
    if (user.role === "admin") return "Admin";
    return user.firstName || user.name || user.email?.split("@")[0] || "User";
}

function updateNavbar() {
    const user    = getCurrentUser();
    const signBtn = document.querySelector('.nav-cta');

    if (!signBtn) return;

    if (user) {
        // إزالة data-lang حتى لا تتجاوز الترجمة اسم المستخدم
        signBtn.removeAttribute('data-lang');
        signBtn.textContent = getDisplayName(user);
        signBtn.href        = user.role === "admin" ? "admin-dashboard.html" : "profile.html";
        signBtn.classList.remove('active');

        // Mark the nav-cta active on its own page
        const onAdmin   = window.location.pathname.includes('admin-dashboard');
        const onProfile = window.location.pathname.includes('profile');
        if ((user.role === 'admin' && onAdmin) || (user.role !== 'admin' && onProfile)) {
            signBtn.classList.add('active');
        }
    } else {
        // إعادة data-lang="signin" للزر لو مفيش مستخدم
        signBtn.setAttribute('data-lang', 'signin');
        signBtn.textContent = (typeof t === 'function') ? t('signin') : "Sign in";
        signBtn.href        = "login.html";
        signBtn.classList.add('active');
    }

    // ── Logout in navbar: only for normal (non-admin) users ──
    const navLinks = document.querySelector('.nav-links');

    // Remove any stale logout link first
    const stale = document.getElementById('navLogoutBtn');
    if (stale) stale.remove();

    if (user && user.role !== 'admin' && navLinks) {
        const logout = document.createElement('a');
        logout.id        = 'navLogoutBtn';
        logout.textContent = (typeof t === 'function') ? t('logout') : "Logout";
        logout.href      = "#";
        logout.className = "nav-logout";
        logout.setAttribute('data-lang', 'logout');
        logout.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userRole');
            window.location.href = "login.html";
        });
        navLinks.appendChild(logout);
    }

    // ── Currency container (keep existing behaviour) ──
    const navbar = document.querySelector('.nav-links') || document.querySelector('nav');
    if (navbar && !document.getElementById('currencyContainer')) {
        const currencyDiv = document.createElement('div');
        currencyDiv.id = 'currencyContainer';
        navbar.appendChild(currencyDiv);
    }
}

// Navigate to destination details
function goToDestination(id) {
    window.location.href = `details.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', updateNavbar);

document.addEventListener('langChanged', function() {
    updateNavbar();
});


// ============================================================
//  UPDATED LOGIN.JS  — patch to add inside your existing
//  login handler (replace or merge with your current logic)
//
//  Place this in: js/login.js
// ============================================================
//
//  The key change is the admin credential check that runs
//  BEFORE the normal user lookup.  Everything else stays the
//  same as your existing login file.
//
// ────────────────────────────────────────────────────────────
//
//  Example — inside your form submit / login function:
//
//  function handleLogin(usernameOrEmail, password) {
//
//      // ① Admin shortcut ─────────────────────────────────
//      if (usernameOrEmail === 'Admin' && password === 'teamX') {
//          const adminUser = {
//              name      : 'Admin',
//              firstName : 'Admin',
//              email     : 'admin@tourism.com',
//              role      : 'admin'
//          };
//          localStorage.setItem('currentUser', JSON.stringify(adminUser));
//          localStorage.setItem('userRole', 'admin');
//          window.location.href = 'admin-dashboard.html';
//          return;
//      }
//
//      // ② Normal user lookup (your existing logic below) ──
//      const users      = JSON.parse(localStorage.getItem('users') || '[]');
//      const matchedUser = users.find(
//          u => (u.email === usernameOrEmail || u.username === usernameOrEmail)
//               && u.password === password
//      );
//
//      if (!matchedUser) {
//          showError('Invalid credentials.');
//          return;
//      }
//
//      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
//      localStorage.setItem('userRole', matchedUser.role || 'user');
//      window.location.href = 'profile.html';
//  }
//
// ============================================================


// ============================================================
//  UPDATED USERS.JS  — minimal additions only.
//  Add these helpers if they don't already exist in users.js
// ============================================================

// (These are also defined in admin-dashboard.js as local copies,
//  so this is only needed if other pages import users.js directly.)

if (typeof window !== 'undefined' && !window._usersJsPatchApplied) {
    window._usersJsPatchApplied = true;

    /**
     * Return all users from localStorage.
     * If your users.js already exposes getUsers(), skip this.
     */
    if (typeof getUsers === 'undefined') {
        window.getUsers = function () {
            return JSON.parse(localStorage.getItem('users') || '[]');
        };
    }

    /**
     * Persist user array.
     */
    if (typeof saveUsers === 'undefined') {
        window.saveUsers = function (users) {
            localStorage.setItem('users', JSON.stringify(users));
        };
    }
}