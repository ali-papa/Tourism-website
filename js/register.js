// ===== TOAST =====
function showToast(type, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== TOGGLE PASSWORD =====
function togglePw(id, btn) {
    const inp = document.getElementById(id);
    inp.type = inp.type === 'password' ? 'text' : 'password';
    btn.style.color = inp.type === 'text' ? '#000' : '#666';
}

// ===== PASSWORD STRENGTH =====
function checkStrength(val) {
    const segs = ['s1','s2','s3','s4'].map(id => document.getElementById(id));
    const label = document.getElementById('s-label');

    let score = 0;
    if (val.length >= 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const cls = ['','weak','fair','strong','strong'];
    const names = ['','Weak','Fair','Good','Strong'];

    segs.forEach((s,i)=>{
        s.className = 's-seg' + (i < score ? ' ' + cls[score] : '');
    });

    label.textContent = val.length ? names[score] : '';
}

// ===== ERROR HANDLING =====
function setErr(id, show) {
    const input = document.getElementById(id);
    const err = document.getElementById('err-' + id);

    if (input) input.classList.toggle('input-error', show);
    if (err) err.classList.toggle('show', show);
}

// ===== VALIDATION =====
const isValidName  = n => /^[A-Za-z]{2,}$/.test(n);
const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// ===== INIT AFTER DOM LOAD =====
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('registerForm');
    if (!form) return;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // ===== SUBMIT =====
    form.addEventListener('submit', function(e){
        e.preventDefault();

        const f = firstName.value.trim();
        const l = lastName.value.trim();
        const e1 = email.value.trim();
        const p = password.value.trim();
        const c = confirmPassword.value.trim();

        ['firstName','lastName','email','password','confirmPassword']
          .forEach(id => setErr(id,false));

        let valid = true;

        if (!isValidName(f)) { setErr('firstName', true); valid = false; }
        if (!isValidName(l)) { setErr('lastName', true); valid = false; }
        if (!isValidEmail(e1)) { setErr('email', true); valid = false; }
        if (p.length < 6) { setErr('password', true); valid = false; }
        if (p !== c) { setErr('confirmPassword', true); valid = false; }

        if (!valid) return;

        const newUser = {
            firstName: f,
            lastName: l,
            email: e1,
            password: p,
            credit: 0
        };

        const result = saveUser(newUser);

        if (!result.success) {
            showToast("error", result.message);
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(newUser));

        showToast("success", "Account created successfully");

        setTimeout(() => {
            window.location.href = "profile.html";
        }, 900);
    });

    // ===== BLUR VALIDATION =====
    firstName.addEventListener('blur', () => {
        if (firstName.value.trim())
            setErr('firstName', !isValidName(firstName.value.trim()));
    });

    lastName.addEventListener('blur', () => {
        if (lastName.value.trim())
            setErr('lastName', !isValidName(lastName.value.trim()));
    });

    email.addEventListener('blur', () => {
        if (email.value.trim())
            setErr('email', !isValidEmail(email.value.trim()));
    });

    confirmPassword.addEventListener('blur', () => {
        if (confirmPassword.value)
            setErr('confirmPassword', confirmPassword.value !== password.value);
    });

});