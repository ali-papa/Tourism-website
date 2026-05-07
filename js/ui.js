// ============================
// UI.JS - SHARED UI LOGIC
// ============================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function updateNavbar() {
    const user = getCurrentUser();
    const signBtn = document.querySelector('.nav-cta');

    if (!signBtn) return;

    if (user) {
        signBtn.textContent = user.firstName;
        signBtn.href = "profile.html";
        signBtn.classList.remove('active');

        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.getElementById('logoutBtn')) {
            let logout = document.createElement('a');
            logout.id = 'logoutBtn';
            logout.textContent = "Logout";
            logout.href = "#";
            logout.addEventListener('click', function () {
                localStorage.removeItem('currentUser');
                location.reload();
            });
            navLinks.appendChild(logout);
        }
    }

    // حط الـ Currency Selector في الـ Navbar
    const navbar = document.querySelector('.nav-links') || document.querySelector('nav');
    if (navbar && !document.getElementById('currencyContainer')) {
        const currencyDiv = document.createElement('div');
        currencyDiv.id = 'currencyContainer';
        navbar.appendChild(currencyDiv);
    }
}

// to details page
function goToDestination(id) {
    window.location.href = `details.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', updateNavbar);