const searchBtn = document.getElementById('searchButton');
const input = document.getElementById('search');
const pokemonDiv = document.getElementById('results');

const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  makeDiv(data.name, data.height, data.weight, data.sprites.front_default);
};

const makeDiv = (name, height, weight, picture) => {
  const htmlText = `
    <div class="pokemonContainer">
      <div>Name: ${name}</div>
      <div>height: ${height}</div>
      <div>weight: ${weight}</div>
      <div>picture: <img src="${picture}" /></div>
    </div>
  `;
  pokemonDiv.innerHTML = htmlText;
}

searchBtn.onclick = function() {
    searchPokemon(input.value);
}


