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

        // remove hover issue
        signBtn.classList.remove('active');

        // add logout button (اختياري)
        let logout = document.createElement('a');
        logout.textContent = "Logout";
        logout.href = "#";

        logout.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            location.reload();
        });

        document.querySelector('.nav-links').appendChild(logout);
    }
}

document.addEventListener('DOMContentLoaded', updateNavbar);