// وظيفة عرض الحجوزات (My Bookings)
function displayMyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const container = document.getElementById('booked-section');
    if (!container || !user) return;

    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const myBookings = allBookings.filter(b => b.userEmail === user.email);

    container.innerHTML = myBookings.length ? "" : "<div class='empty-state'><p>No bookings yet.</p></div>";

    myBookings.forEach(book => {
        let imgPath = book.image;
        if (imgPath && !imgPath.startsWith('../') && !imgPath.startsWith('http')) {
            imgPath = '../' + imgPath;
        }

        container.innerHTML += `
            <div class="booking-card">
                <img src="${imgPath}" alt="${book.tripName}" onerror="this.src='../assets/images/placeholder.jpg'">
                <div class="card-body">
                    <h3>${book.tripName}</h3>
                    <p>Price: <strong>${book.price} EGP</strong></p>
                    <span class="status-badge ${book.status === 'Pending' ? 'status-pending' : 'status-completed'}">
                        ${book.status === 'Pending' ? 'Pending Confirmation' : '✅ Paid'}
                    </span>
                    <div class="button-group">
                        ${book.status === 'Pending' ? 
                            `<button class="confirm-btn" onclick="confirmAndPay('${book.id}', ${book.price})">Confirm & Pay</button>` 
                            : `<p class="processed-text">Trip processed successfully.</p>`
                        }
                    </div>
                </div>
            </div>`;
    });
}

// وظيفة الحجز الصامتة
function bookTrip(name, price, image) {
    const user = JSON.parse(localStorage.getItem('currentUser')) || 
                 JSON.parse(localStorage.getItem('isLoggedIn'));

    if (!user) {
        alert("Please login first to book a room!");
        window.location.href = "login.html";
        return;
    }

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const newBooking = {
        id: "BK" + Date.now(),
        userEmail: user.email,
        tripName: name,
        price: price,
        image: image,
        status: 'Pending'
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// وظيفة عرض المفضلات (Saved Items)
function displaySavedItems() {
    const container = document.getElementById('saved-section');
    if (!container) return;
    container.innerHTML = "";
    let hasItems = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("savedHotel-") && localStorage.getItem(key) === "true") {
            hasItems = true;
            const parts = key.split("-");
            const destId = parseInt(parts[1]);
            const hotelIdx = parseInt(parts[2]);

            if (typeof hotelsByDestination !== 'undefined' && hotelsByDestination[destId]) {
                const hotel = hotelsByDestination[destId][hotelIdx];
                
                let imgPath = hotel.image;
                if (imgPath && !imgPath.startsWith('../') && !imgPath.startsWith('http')) {
                    imgPath = '../' + imgPath;
                }

                container.innerHTML += `
                    <div class="booking-card">
                        <img src="${imgPath}" alt="${hotel.name}" onerror="this.src='../assets/images/placeholder.jpg'">
                        <div class="card-body">
                            <span class="status-badge status-saved">♥️ Saved</span>
                            <h3>${hotel.name}</h3>
                            <p class="location-text">${hotel.location}</p>
                            <div class="button-group">
                                <button class="confirm-btn" onclick="window.location.href='hotel-details.html?destinationId=${destId}&hotelIndex=${hotelIdx}'">View Details</button>
                                <button class="btn-remove" onclick="removeSavedItem('${key}')">Remove</button>
                            </div>
                        </div>
                    </div>`;
            }
        }
    }
    if (!hasItems) container.innerHTML = "<div class='empty-state'><p>Your wishlist is empty.</p></div>";
}

function removeSavedItem(key) {
    localStorage.removeItem(key);
    displaySavedItems();
}

// وظيفة الدفع الصامتة (تم حذف الـ alert)
function confirmAndPay(bookingId, amount) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (!user || user.credit < amount) {
        alert("Insufficient balance!");
        return;
    }

    // خصم المبلغ وتحديث البيانات
    user.credit -= amount;
    const uIdx = allUsers.findIndex(u => u.email === user.email);
    if (uIdx !== -1) allUsers[uIdx].credit = user.credit;

    const bIdx = bookings.findIndex(b => b.id === bookingId);
    if (bIdx !== -1) bookings[bIdx].status = 'Completed';

    // حفظ البيانات الجديدة
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(allUsers));
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // تم حذف سطر alert الدفع بنجاح
    displayMyBookings();
}

document.addEventListener('DOMContentLoaded', () => {
    displayMyBookings();
    displaySavedItems();
});