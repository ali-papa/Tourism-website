// =========================
// VALIDATION FUNCTIONS
// =========================
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
const isValidEmail = (email) => /^[^\s@]+@gmail\.com$/.test(email);


// =========================
//  REGISTER
// =========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirm = document.getElementById("confirmPassword").value.trim();
        let error = document.getElementById("error");

        error.style.color = "red";
        error.innerText = "";

        // validations
        if (!name || !email || !password || !confirm) {
            return error.innerText = "All fields are required";
        }

        if (!isValidName(name)) {
            return error.innerText = "Name must contain letters only";
        }

        if (!isValidEmail(email)) {
            return error.innerText = "Email must be Gmail only";
        }

        if (password.length < 6) {
            return error.innerText = "Password must be at least 6 characters";
        }

        if (password !== confirm) {
            return error.innerText = "Passwords do not match";
        }

        // Load users
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check email exists
        if (users.some(u => u.email === email)) {
            return error.innerText = "Email already exists!";
        }

        // Save new user
        users.push({
            name,
            email,
            password,
            credit: 0
        });

        localStorage.setItem("users", JSON.stringify(users));

        error.style.color = "green";
        error.innerText = "Registered successfully ✅";

        // redirect after 1 sec
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    });
}



// =========================
//  LOGIN
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let error = document.getElementById("error");

        error.style.color = "red";
        error.innerText = "";

        // validation
        if (!email || !password) {
            return error.innerText = "All fields are required";
        }

        if (!isValidEmail(email)) {
            return error.innerText = "Email must be Gmail only";
        }

        if (password.length < 6) {
            return error.innerText = "Password must be at least 6 characters";
        }

        let users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find user
        let found = users.find(u => u.email === email && u.password === password);

        if (!found) {
            return error.innerText = "Wrong email or password";
        }

        // Save session
        localStorage.setItem("currentUser", JSON.stringify(found));

        error.style.color = "green";
        error.innerText = "Login successful ✅";

        // redirect
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    });
}



// =========================
//  ADD CREDIT FUNCTION
// =========================
function addCredit(secretCode, amount) {
    if (secretCode !== "1234") {
        return "Invalid code ❌";
    }

    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return "Not logged in ❌";

    user.credit += Number(amount);

    let users = JSON.parse(localStorage.getItem("users"));
    let index = users.findIndex(u => u.email === user.email);
    users[index] = user;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    return `Credit Updated ✔ New Balance: ${user.credit}`;
}



// =========================
//  CUSTOMER INFO
// =========================
function customerInformation() {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) return null;

    return {
        name: user.name,
        email: user.email,
        credit: user.credit
    };
}