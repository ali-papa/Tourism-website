const detailsContainer = document.getElementById("detailsContainer");

// Get id from URL
const params = new URLSearchParams(window.location.search);
const destinationId = parseInt(params.get("id"));

// Find destination by id
const destination = destinations.find(item => item.id === destinationId);

// Display destination details
if (destination) {
    detailsContainer.innerHTML = `
        <div class="details-card">
            <img src="${destination.image}" alt="${destination.name}" class="details-image">

            <div class="details-info">
                <h2>${destination.name}</h2>
                <p><strong>Country:</strong> ${destination.country}</p>
                <p><strong>Category:</strong> ${destination.category}</p>
                <p><strong>Price:</strong> ${destination.price} EGP</p>
                <p><strong>Rating:</strong> ${destination.rating} ⭐</p>
                <p><strong>Description:</strong> ${destination.description}</p>

                <a href="booking.html?id=${destination.id}" class="book-btn">Book Now</a>            </div>
        </div>
    `;
} else {
    detailsContainer.innerHTML = `<h2>Destination not found</h2>`;
}