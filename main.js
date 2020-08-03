const input = document.getElementById('searchLine');
const pokemonDiv = document.getElementById('results');
const pokemonName = document.getElementById('pokemon-name');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonImg = document.getElementById('pokemon-image');
const listNames = document.getElementById('types');
const pokemonList = document.getElementById('list');

const search = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${input.value}/`)
  .then(res => {
    pokemonName.textContent = res.data.name;
    pokemonHeight.textContent = res.data.height;
    pokemonWeight.textContent = res.data.weight;
    pokemonImg.src = res.data.sprites.front_default;
    pokemonList.textContent = '';
    listNames.textContent = 'List of Pokemon types';
    pokemonImg.onmouseover = () => pokemonImg.src = res.data.sprites.back_default;
    pokemonImg.onmouseout = () => pokemonImg.src = res.data.sprites.front_default;
    let types = res.data.types;
    let count = 0;
    types.map((pokemonType) => {
      count++;
      const newItem = document.createElement('p');
      newItem.style.cursor = 'pointer';
      newItem.textContent = `${count}, ${pokemonType.type.name}`;
      const list = document.createElement('ol');
    })
    })
    .catch(() => {
      pokemonName.textContent = '';
      pokemonHeight.textContent = '';
      pokemonWeight.textContent = '';
      pokemonImg.textContent = '';
      listNames.textContent = '';
    })
}
