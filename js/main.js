function showMessage() {
    alert("Welcome to Egypt Tourism!");
}
const container = document.getElementById("cardsContainer");

destinations.forEach(place => {

    const card = `
        <div class="card">
            <img src="${place.image}">
            <h3>${place.name}, ${place.country}</h3>
            <p>Beautiful place to visit</p>
        </div>
    `;

    container.innerHTML += card;

});