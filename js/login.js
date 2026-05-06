
function showToast(type, message) {
    const toast = document.getElementById('toast');

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
// handle login form
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const result = loginUser(email, password);

        const errorEl = document.getElementById('error');

        if (!result.success) {
            showToast("error", "Wrong email or password");
            errorEl.style.color = "red";
            return;
        }

        showToast("success", "Logged in successfully");
        errorEl.style.color = "green";

        // redirect
        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);
    });

});