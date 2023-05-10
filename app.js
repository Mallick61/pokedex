const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const resultContainer = document.querySelector('#result-container');

// When the search button is clicked, fetch the Pokemon data
searchBtn.addEventListener('click', function() {
    const searchValue = searchInput.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            console.error(error);
            resultContainer.innerHTML = '<p>Sorry, no Pokemon found.</p>';
        });
});

// Display the Pokemon data in a card
function displayResult(data) {
    const card = `
        <div class="card">
            <img src="${data.sprites.front_default}">
            <h2>${data.name}</h2>
            <p>Type: ${data.types[0].type.name}</p>
            <p>Height: ${data.height}m</p>
            <p>Weight: ${data.weight}kg</p>
        </div>
    `;
    resultContainer.innerHTML = card;
}
