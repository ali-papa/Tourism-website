function showToast(type, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorEl = document.getElementById('error');

        const result = loginUser(email, password);

        if (!result.success) {
            showToast("error", result.message || "Wrong email or password");
            if (errorEl) {
                errorEl.textContent = "Wrong email or password";
                errorEl.style.color = "red";
            }
            return;
        }

        showToast("success", "Logged in successfully");

        if (errorEl) {
            errorEl.textContent = "Logged in successfully";
            errorEl.style.color = "green";
        }

        setTimeout(() => {
            if (result.role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "profile.html";
            }
        }, 700);
    });
});