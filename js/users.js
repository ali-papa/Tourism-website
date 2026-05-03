// ================= USERS SYSTEM =================

// 🔹 جلب كل المستخدمين
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

// 🔹 حفظ مستخدم جديد
function saveUser(user) {
    let users = getUsers();

    // منع تكرار الإيميل
    if (users.some(u => u.email === user.email)) {
        return {
            success: false,
            message: "Email already exists"
        };
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
}

// 🔹 تسجيل الدخول
function loginUser(email, password) {
    let users = getUsers();

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return {
            success: false,
            message: "Wrong email or password"
        };
    }

    // حفظ المستخدم الحالي
    localStorage.setItem("currentUser", JSON.stringify(user));

    // ✅ FIX: return the user object so profile.html can read credit
    return { success: true, user: user };
}

// 🔹 تسجيل الخروج
function logoutUser() {
    localStorage.removeItem("currentUser");
}

// 🔹 بيانات المستخدم الحالي
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}