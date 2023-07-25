document.getElementById("searchButton").addEventListener("click", searchPokemon);

async function searchPokemon() {
    const inputElement = document.getElementById("pokemonInput");
    const pokemonName = inputElement.value.toLowerCase();

    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        displayPokemonDetails(data);
    } catch (error) {
        console.error(error);
        displayError();
    }
}

function displayPokemonDetails(pokemon) {
    const pokemonDetailsElement = document.getElementById("pokemonDetails");
    
    const html = `
        <div class="pokemon-card">
            <h2 class="pokemon-name">${capitalizeFirstLetter(pokemon.name)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
            <p class="pokemon-types">Type: ${getPokemonTypes(pokemon)}</p>
            <p class="pokemon-evolution">Height: ${pokemon.height} dm</p>
            <p class="pokemon-evolution">Weight: ${pokemon.weight / 10} kg</p>
        </div>
    `;
    pokemonDetailsElement.innerHTML = html;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonTypes(pokemon) {
    return pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(", ");
}

function displayError() {
    const pokemonDetailsElement = document.getElementById("pokemonDetails");
    pokemonDetailsElement.innerHTML = `<p class="error">Pokemon not found</p>`;
}
