function showToast(type, message) {
    const toast = document.getElementById('toast');

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}


const settingsModal = document.getElementById('settingsModal');
const settingsBtn = document.getElementById('settingsBtn');
const saveSettings = document.getElementById('saveSettings');
const closeSettings = document.getElementById('closeSettings');

// open
settingsBtn.onclick = () => {
    settingsModal.classList.add('show');
};

// close X
closeSettings.onclick = () => {
    settingsModal.classList.remove('show');
};

// close outside
settingsModal.onclick = (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('show');
    }
};

// save
saveSettings.onclick = () => {

    const newFirst = document.getElementById('newFirst').value.trim();
    const newLast = document.getElementById('newLast').value.trim();
    const oldPass = document.getElementById('oldPass').value.trim();
    const newPass = document.getElementById('newPass').value.trim();

    // ✨ تغيير الاسم
    if (newFirst) user.firstName = newFirst;
    if (newLast) user.lastName = newLast;

    // 🔐 تغيير الباسورد
    if (newPass) {

        if (!oldPass) {
            showToast("error", "Enter current password first");
            return;
        }

        if (oldPass !== user.password) {
            showToast("error", "Wrong current password");
            return;
        }

        if (newPass.length < 6) {
            showToast("error", "Password must be at least 6 characters");
            return;
        }

        user.password = newPass;
    }

    // update users
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users = users.map(u => {
        if (u.email === user.email) return user;
        return u;
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    showToast("success", "Profile updated successfully");

    settingsModal.classList.remove('show');

    setTimeout(() => location.reload(), 600);
};

// ===== GET USER =====
const user = JSON.parse(localStorage.getItem('currentUser'));

// لو مش مسجل دخول
if (!user) {
    window.location.href = "login.html";
}

// ===== ELEMENTS =====
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const avatarEl = document.getElementById('avatar');
const balanceEl = document.getElementById('balance');

// ===== FILL DATA =====
nameEl.textContent = user.firstName + " " + user.lastName;
emailEl.textContent = user.email;

firstNameEl.textContent = user.firstName;
lastNameEl.textContent = user.lastName;


const first = user.firstName.charAt(0);
const last = user.lastName.charAt(0);

avatarEl.textContent = (first + last).toUpperCase();
// ===== BALANCE =====
function updateBalance() {
    balanceEl.textContent = "$" + (user.credit || 0);
}

updateBalance();

// ===== MODAL =====
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBalanceBtn');
const confirmBtn = document.getElementById('confirmAdd');
const amountInput = document.getElementById('amount');

addBtn.onclick = () => {
    modal.classList.add('show');
};

confirmBtn.onclick = () => {
    const amount = Number(amountInput.value);

    if (!amount || amount <= 0) {
        showToast("error", "Amount must be greater than 0");
        return;
    }

    user.credit = (user.credit || 0) + amount;

    // update users list
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users = users.map(u => {
        if (u.email === user.email) {
            return user;
        }
        return u;
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    updateBalance();
    modal.classList.remove('show');
    amountInput.value = "";
};

// ===== LOGOUT =====
document.getElementById('logoutBtn').onclick = () => {
    localStorage.removeItem('currentUser');
    window.location.href = "login.html";
};

const closeModal = document.getElementById('closeModal');

closeModal.onclick = () => {
    modal.classList.remove('show');
};

// كمان تقفل لما تدوس بره
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
};