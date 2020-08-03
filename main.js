const input = document.getElementById('searchLine');
const pokemonDiv = document.getElementById('results');
const pokemonName = document.getElementById('pokemon-name');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonImg = document.getElementById('pokemon-image');
const namesList = document.getElementById('types');
const pokemonList = document.getElementById('list');

const search = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${input.value}/`)
  .then(res => {
    pokemonName.textContent = res.data.name;
    pokemonHeight.textContent = res.data.height;
    pokemonWeight.textContent = res.data.weight;
    pokemonImg.src = res.data.sprites.front_default;
    pokemonList.textContent = '';
    namesList.textContent = 'List of Pokemon types';
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
      list.hidden = true;
      axios.get(`https://pokeapi.co/api/v2/type/${pokemonType.type.name}/`)
      .then(res => res.data.pokemon.map((x) => {
        let newLi = document.createElement('li');
        newLi.style.cursor = 'pointer';
        newLi.textContent = x.pokemon.name;
        newLi.onclick = () => {
          input.value = x.pokemon.name;
          input.onkeyup();
        }
        list.appendChild(newLi);
      }))
      newItem.appendChild(list);
      newItem.onclick = () => {
        list.hidden ? list.hidden = false : list.hidden = true;
      }
      pokemonList.appendChild(newItem);
    })
    })
    .catch(() => {
      pokemonName.textContent = 'No Pokemon found mate :(';
      pokemonHeight.textContent = '';
      pokemonWeight.textContent = '';
      pokemonImg.src = '';
      namesList.textContent = '';
      pokemonList.textContent = '';
    })
}
