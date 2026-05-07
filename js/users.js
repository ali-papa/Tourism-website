function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
    let users = getUsers();

    if (users.find(u => u.email === user.email)) {
        return { success: false, message: "Email already exists" };
    }

    const normalizedUser = {
        ...user,
        role: user.role || "user"
    };

    users.push(normalizedUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, user: normalizedUser };
}

function loginUser(email, password) {
    const identifier = email.trim();
    const pass = password.trim();

    // Admin login
    if (identifier.toLowerCase() === "admin" && pass === "teamX") {
        const adminUser = {
            firstName: "Admin",
            name: "Admin",
            email: "Admin",
            role: "admin"
        };

        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('userRole', 'admin');

        return { success: true, user: adminUser, role: "admin" };
    }

    // Normal users
    const users = getUsers();

    const user = users.find(
        u => u.email.trim().toLowerCase() === identifier.toLowerCase() &&
             u.password === pass
    );

    if (!user) {
        return { success: false, message: "Wrong email or password" };
    }

    const currentUser = {
        ...user,
        role: user.role || "user"
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userRole', 'user');

    return { success: true, user: currentUser, role: "user" };
}