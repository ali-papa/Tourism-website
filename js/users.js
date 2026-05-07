function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
    let users = getUsers();

    // check email exists
    if (users.find(u => u.email === user.email)) {
        return { success: false, message: "Email already exists" };
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
}

function loginUser(email, password) {
    let users = getUsers();

    let user = users.find(
        u => u.email.trim() === email.trim() &&
            u.password === password
    );

    if (!user) {
        return { success: false, message: "Wrong email or password" };
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, user };
}