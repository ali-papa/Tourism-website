/* ============================================
   PROFILE PAGE — profile.js
   Premium Tourism Dashboard
   ============================================ */

// ===== TOAST =====
function showToast(type, message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `ptoast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = 'ptoast';
  }, 2800);
}

// ===== GET USER =====
let user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
  window.location.href = 'login.html';
}

// ===== ELEMENTS =====
const nameEl        = document.getElementById('name');
const emailEl       = document.getElementById('email');
const avatarEl      = document.getElementById('avatar');

const firstNameEl   = document.getElementById('firstName');
const lastNameEl    = document.getElementById('lastName');
const genderSelect  = document.getElementById('genderSelect');
const countrySelect = document.getElementById('countrySelect');
const oldPassEl     = document.getElementById('oldPass');
const newPassEl     = document.getElementById('newPass');

const ovEmail       = document.getElementById('ov-email');
const ovGender      = document.getElementById('ov-gender');
const ovCountry     = document.getElementById('ov-country');
const ovBalance     = document.getElementById('ov-balance');

const completionPctEl  = document.getElementById('completionPct');
const completionLblEl  = document.getElementById('completionLabel');
const progressFillEl   = document.getElementById('progressFill');

const statBalance    = document.getElementById('stat-balance');
const statCompletion = document.getElementById('stat-completion');

// ===== FILL PROFILE DATA =====
function fillProfile() {
  const fullName = user.firstName + ' ' + user.lastName;

  // Hero
  nameEl.textContent  = fullName;
  emailEl.textContent = user.email;

  // Avatar initials
  const initials = (
    (user.firstName?.charAt(0) || '') +
    (user.lastName?.charAt(0)  || '')
  ).toUpperCase();
  avatarEl.textContent = initials;

  // Edit form — readonly inputs auto-filled
  firstNameEl.value = user.firstName || '';
  lastNameEl.value  = user.lastName  || '';

  // Pre-select gender
  if (user.gender) {
    genderSelect.value = user.gender;
  }

  // Pre-select country
  if (user.country) {
    countrySelect.value = user.country;
  }

  // Overview card
  ovEmail.textContent   = user.email || '—';
  ovGender.textContent  = user.gender  ? capitalize(user.gender) : '—';
  ovCountry.textContent = user.country ? getCountryName(user.country) : 'Incomplete';
  if (!user.country) {
    ovCountry.style.color = '#ef4444';
  }

  updateBalanceDisplay();
  updateCompletion();
}

// ===== BALANCE DISPLAY =====
function updateBalanceDisplay() {
  const bal = user.credit || 0;
  ovBalance.textContent  = '$' + bal;
  statBalance.textContent = '$' + bal;

  // legacy support — if old balance element exists
  const legacyBalance = document.getElementById('balance');
  if (legacyBalance) legacyBalance.textContent = '$' + bal;
}

// ===== PROFILE COMPLETION =====
function updateCompletion() {
  const criteria = {
    name:     !!(user.firstName && user.lastName),
    gender:   !!user.gender,
    country:  !!user.country,
    password: !!(user.passwordUpdated),
  };

  const done  = Object.values(criteria).filter(Boolean).length;
  const total = Object.keys(criteria).length;
  const pct   = Math.round((done / total) * 100);

  completionPctEl.textContent  = pct + '%';
  statCompletion.textContent   = pct + '%';
  progressFillEl.style.width   = pct + '%';

  if (pct === 100) {
    completionLblEl.textContent = 'Complete';
    completionLblEl.className   = 'completion-label complete';
  } else {
    completionLblEl.textContent = 'Incomplete';
    completionLblEl.className   = 'completion-label';
  }

  // checklist items
  document.querySelectorAll('.check-item').forEach(item => {
    const key = item.dataset.key;
    if (criteria[key]) {
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
  });
}

// ===== SAVE PROFILE =====
document.getElementById('saveProfileBtn').addEventListener('click', () => {
  const selectedGender  = genderSelect.value;
  const selectedCountry = countrySelect.value;
  const oldPass         = oldPassEl.value.trim();
  const newPass         = newPassEl.value.trim();

  // Update gender & country
  if (selectedGender)  user.gender  = selectedGender;
  if (selectedCountry) user.country = selectedCountry;

  // Handle password change
  if (newPass) {
    if (!oldPass) {
      showToast('error', 'Enter your current password first');
      return;
    }
    if (oldPass !== user.password) {
      showToast('error', 'Wrong current password');
      return;
    }
    if (newPass.length < 6) {
      showToast('error', 'Password must be at least 6 characters');
      return;
    }
    user.password        = newPass;
    user.passwordUpdated = true;

    // Clear inputs
    oldPassEl.value = '';
    newPassEl.value = '';
  }

  persistUser();
  fillProfile();
  showToast('success', 'Profile updated successfully ✓');
});

// ===== LOGOUT =====
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});

// ===== ADD BALANCE MODAL =====
const balanceModal       = document.getElementById('balanceModal');
const stepCode           = document.getElementById('stepCode');
const stepAmount         = document.getElementById('stepAmount');
const accessCodeInput    = document.getElementById('accessCode');
const amountInput        = document.getElementById('amount');

const SECRET_CODE = 'teamX';

// Open modal
document.getElementById('addBalanceBtn').addEventListener('click', () => {
  // Reset to step 1
  stepCode.classList.add('active');
  stepAmount.classList.remove('active');
  accessCodeInput.value = '';
  amountInput.value     = '';

  balanceModal.classList.add('show');
  setTimeout(() => accessCodeInput.focus(), 100);
});

// Close modal
document.getElementById('closeBalanceModal').addEventListener('click', () => {
  balanceModal.classList.remove('show');
});
balanceModal.addEventListener('click', (e) => {
  if (e.target === balanceModal) balanceModal.classList.remove('show');
});

// Verify access code
document.getElementById('verifyCodeBtn').addEventListener('click', () => {
  const code = accessCodeInput.value.trim();

  if (!code) {
    showToast('error', 'Please enter the access code');
    return;
  }
  if (code !== SECRET_CODE) {
    showToast('error', 'Access code is incorrect');
    accessCodeInput.value = '';
    accessCodeInput.focus();
    return;
  }

  // Move to step 2
  stepCode.classList.remove('active');
  stepAmount.classList.add('active');
  setTimeout(() => amountInput.focus(), 100);
});

// Allow pressing Enter on access code input
accessCodeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('verifyCodeBtn').click();
});

// Confirm balance add
document.getElementById('confirmAdd').addEventListener('click', () => {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    showToast('error', 'Amount must be greater than 0');
    return;
  }

  user.credit = (user.credit || 0) + amount;

  persistUser();
  updateBalanceDisplay();
  updateCompletion();

  balanceModal.classList.remove('show');
  amountInput.value = '';

  showToast('success', `$${amount} added to your balance 🎉`);
});

// Allow pressing Enter on amount input
amountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('confirmAdd').click();
});

// ===== PERSIST USER =====
function persistUser() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => (u.email === user.email ? user : u));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// ===== HELPERS =====
function capitalize(str) {
  if (!str) return '—';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getCountryName(code) {
  const countries = {
    EG: 'Egypt', US: 'United States', GB: 'United Kingdom',
    AE: 'UAE', SA: 'Saudi Arabia', FR: 'France', DE: 'Germany',
    IT: 'Italy', ES: 'Spain', TR: 'Turkey', JP: 'Japan',
    AU: 'Australia', CA: 'Canada', BR: 'Brazil', IN: 'India',
    MX: 'Mexico', ZA: 'South Africa', NG: 'Nigeria',
    MA: 'Morocco', TN: 'Tunisia',
  };
  return countries[code] || code;
}

// ===== INIT =====
fillProfile();