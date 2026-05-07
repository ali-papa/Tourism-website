// ============================================================
// ADMIN DASHBOARD JS
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // AUTH
    // =========================

    const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    if (!currentUser || currentUser.role !== 'admin') {

        window.location.href = 'login.html';
        return;
    }

    // =========================
    // INIT
    // =========================

    loadAllStats();
    renderUsersTable();
    renderBookingsTable();
    renderHotelsGrid();
    renderReports();

    // =========================
    // LOGOUT
    // =========================

    const logoutBtn =
        document.getElementById('adminLogoutBtn');

    if (logoutBtn) {

        logoutBtn.addEventListener('click', function () {

            localStorage.removeItem('currentUser');
            localStorage.removeItem('userRole');

            window.location.href = 'login.html';
        });
    }

    // =========================
    // SEARCH
    // =========================

    const searchInput =
        document.getElementById('userSearchInput');

    if (searchInput) {

        searchInput.addEventListener('input', function () {

            renderUsersTable(
                this.value.toLowerCase().trim()
            );
        });
    }

});

// ============================================================
// STORAGE HELPERS
// ============================================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem('users') || '[]'
    );
}

function saveUsers(users) {

    localStorage.setItem(
        'users',
        JSON.stringify(users)
    );
}

function getBookings() {

    return JSON.parse(
        localStorage.getItem('bookings') || '[]'
    );
}

function getHotels() {

    return JSON.parse(
        localStorage.getItem('hotels') ||
        localStorage.getItem('destinations') ||
        '[]'
    );
}

// ============================================================
// DELETE USER
// ============================================================

function deleteUser(email) {

    const confirmDelete = confirm(
        `Delete user "${email}" ?`
    );

    if (!confirmDelete) return;

    // remove user
    let users = getUsers().filter(
        u => u.email !== email
    );

    saveUsers(users);

    // remove bookings
    let bookings = getBookings().filter(
        b => b.userEmail !== email
    );

    localStorage.setItem(
        'bookings',
        JSON.stringify(bookings)
    );

    // rerender
    loadAllStats();
    renderUsersTable();
    renderBookingsTable();
    renderReports();

    showAdminToast(
        'User deleted successfully',
        'success'
    );
}

// ============================================================
// STATS
// ============================================================

function loadAllStats() {

    const users = getUsers().filter(
        u => u.role !== 'admin'
    );

    const bookings = getBookings();
    const hotels = getHotels();

    const revenue = users.reduce((sum, user) => {

        return sum + (
            parseFloat(user.balance) ||
            parseFloat(user.credit) ||
            0
        );

    }, 0);

    setText('ov-users', users.length);
    setText('ov-bookings', bookings.length);
    setText('ov-hotels', hotels.length);
    setText('ov-revenue', '$' + revenue.toFixed(2));

    setText('stat-users', users.length);
    setText('stat-bookings', bookings.length);
    setText('stat-hotels', hotels.length);
    setText('stat-revenue', '$' + revenue.toFixed(2));
}

// ============================================================
// USERS TABLE
// ============================================================

function renderUsersTable(filter = '') {

    const users = getUsers().filter(
        u => u.role !== 'admin'
    );

    const tbody =
        document.getElementById('usersTableBody');

    if (!tbody) return;

    const filteredUsers = users.filter(u => {

        const fullName =
            `${u.firstName || ''} ${u.lastName || ''}`
                .toLowerCase();

        const email =
            (u.email || '').toLowerCase();

        return (
            fullName.includes(filter) ||
            email.includes(filter)
        );
    });

    if (filteredUsers.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="table-empty">
                    No users found.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = filteredUsers.map((u, i) => {

        const fullName =
            `${u.firstName || ''} ${u.lastName || ''}`.trim();

        const initials =
            fullName
                .split(' ')
                .map(x => x[0] || '')
                .join('')
                .slice(0, 2)
                .toUpperCase();

        const balanceValue =
            parseFloat(u.balance) ||
            parseFloat(u.credit) ||
            0;

        return `
            <tr>

                <!-- # -->
                <td>
                    ${i + 1}
                </td>

                <!-- NAME -->
                <td>
                    <div class="user-name-cell">

                        <div class="user-mini-avatar">
                            ${initials}
                        </div>

                        <div>
                            <div class="user-full-name">
                                ${escHtml(fullName)}
                            </div>

                            <div class="user-email-sub">
                                ${escHtml(u.email)}
                            </div>
                        </div>

                    </div>
                </td>

                <!-- EMAIL -->
                <td>
                    ${escHtml(u.email)}
                </td>

                <!-- COUNTRY -->
                <td>
                    ${escHtml(u.country || 'Egypt')}
                </td>

                <!-- BALANCE -->
                <td>
                    <span class="balance-pill">
                        $${balanceValue.toFixed(2)}
                    </span>
                </td>

                <!-- ACTIONS -->
                <td>

                    <button
                        class="tbl-btn tbl-btn-delete"
                        onclick="deleteUser('${escAttr(u.email)}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;

    }).join('');
}
// ============================================================
// BOOKINGS TABLE
// ============================================================

function renderBookingsTable() {

    const bookings = getBookings();

    const tbody =
        document.getElementById('bookingsTableBody');

    if (!tbody) return;

    if (bookings.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="table-empty">
                    No bookings recorded yet.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = bookings.map((b, i) => {

        const status =
            (b.status || 'Pending').toLowerCase();

        const statusClass =
            status === 'completed'
                ? 'confirmed'
                : 'pending';

        return `
            <tr>

                <!-- # -->
                <td>${i + 1}</td>

                <!-- USER -->
                <td>
                    ${escHtml(b.userEmail || '—')}
                </td>

                <!-- HOTEL -->
                <td>
                    ${escHtml(b.tripName || 'Unknown Hotel')}
                </td>

                <!-- DATE -->
                <td>
                    ${new Date(
                        parseInt(
                            String(b.id || '0')
                                .replace('BK', '')
                        ) || Date.now()
                    ).toLocaleDateString()}
                </td>

                <!-- AMOUNT -->
                <td>
                    <span class="balance-pill">
                        $${parseFloat(
                            b.price || 0
                        ).toFixed(2)}
                    </span>
                </td>

                <!-- STATUS -->
                <td>
                    <span class="status-pill ${statusClass}">
                        ${capitalise(status)}
                    </span>
                </td>

            </tr>
        `;

    }).join('');
}
// ============================================================
// HOTELS
// ============================================================

function renderHotelsGrid() {

    const grid =
        document.getElementById('hotelsGrid');

    if (!grid) return;

    // hotels from destinations
    const destinations =
        JSON.parse(
            localStorage.getItem('destinations') || '[]'
        );

    if (!destinations.length) {

        grid.innerHTML = `
            <div class="hotel-empty-state">
                <p>No hotels found.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = destinations.map(h => {

        return `
            <div class="hotel-card-admin">

                <div class="hotel-card-name">
                    ${escHtml(
                        h.name ||
                        h.title ||
                        'Unnamed Hotel'
                    )}
                </div>

                <div class="hotel-card-loc">
                    ${escHtml(
                        h.location ||
                        h.country ||
                        'Unknown Location'
                    )}
                </div>

            </div>
        `;

    }).join('');
}
// ============================================================
// REPORTS
// ============================================================

function renderReports() {

    const users = getUsers().filter(
        u => u.role !== 'admin'
    );

    const bookings = getBookings();

    // =========================
    // TOTAL BALANCE
    // =========================

    const revenue = users.reduce((sum, user) => {

        return sum + (
            parseFloat(user.credit) ||
            parseFloat(user.balance) ||
            0
        );

    }, 0);

    // =========================
    // COMPLETED BOOKINGS
    // =========================

    const completedBookings = bookings.filter(
        b => (b.status || '').toLowerCase() === 'completed'
    ).length;

    const completionRate =
        bookings.length
            ? Math.round(
                (completedBookings / bookings.length) * 100
            )
            : 0;

    // =========================
    // MAIN REPORTS
    // =========================

    setText(
        'report-users',
        users.length
    );

    setText(
        'report-revenue',
        '$' + revenue.toFixed(2)
    );

    setText(
        'report-bookings',
        bookings.length
    );

    setText(
        'report-completion',
        completionRate + '%'
    );

    // =========================
    // TRENDS
    // =========================

    const usersTrend =
        document.getElementById('report-users-trend');

    const bookingsTrend =
        document.getElementById('report-bookings-trend');

    const completionTrend =
        document.getElementById('report-completion-trend');

    if (usersTrend) {

        usersTrend.textContent =
            users.length > 0
                ? '↑ Active'
                : '— No users';

        usersTrend.className =
            users.length > 0
                ? 'report-trend up'
                : 'report-trend neutral';
    }

    if (bookingsTrend) {

        bookingsTrend.textContent =
            bookings.length > 0
                ? '↑ Booking activity'
                : '— No bookings';

        bookingsTrend.className =
            bookings.length > 0
                ? 'report-trend up'
                : 'report-trend neutral';
    }

    if (completionTrend) {

        if (completionRate >= 70) {

            completionTrend.textContent =
                '↑ Excellent';

            completionTrend.className =
                'report-trend up';

        } else if (completionRate >= 40) {

            completionTrend.textContent =
                '↑ Good engagement';

            completionTrend.className =
                'report-trend up';

        } else if (completionRate > 0) {

            completionTrend.textContent =
                '↓ Needs improvement';

            completionTrend.className =
                'report-trend down';

        } else {

            completionTrend.textContent =
                '— No completed bookings';

            completionTrend.className =
                'report-trend neutral';
        }
    }

    // =========================
    // HEALTH CARD
    // =========================

    const healthPct =
        document.getElementById('healthPct');

    const healthLabel =
        document.getElementById('healthLabel');

    const healthFill =
        document.getElementById('healthFill');

    if (healthPct) {

        const healthValue =
            users.length > 0
                ? Math.max(70, completionRate)
                : 40;

        healthPct.textContent =
            healthValue + '%';

        if (healthLabel) {

            healthLabel.textContent =
                healthValue >= 90
                    ? 'Excellent'
                    : healthValue >= 70
                        ? 'Operational'
                        : 'Limited';
        }

        if (healthFill) {

            healthFill.style.width =
                healthValue + '%';
        }
    }
}

// ============================================================
// UTILITIES
// ============================================================

function showAdminToast(msg, type = 'success') {

    const toast =
        document.getElementById('toast');

    if (!toast) return;

    toast.textContent = msg;

    toast.className =
        'ptoast ptoast--' + type + ' show';

    clearTimeout(toast._t);

    toast._t = setTimeout(() => {

        toast.className = 'ptoast';

    }, 3000);
}

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) el.textContent = value;
}

function capitalise(str) {

    return str.charAt(0).toUpperCase() +
           str.slice(1);
}

function escHtml(str) {

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escAttr(str) {

    return String(str)
        .replace(/'/g, "\\'");
}