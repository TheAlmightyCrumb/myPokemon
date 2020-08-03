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
    pokemonName.textContent = res.data.name[0].toUpperCase() + res.data.name.substring(1);
    pokemonName.style.color = 'black';
    pokemonName.style.fontWeight = 'bold';
    pokemonHeight.textContent = res.data.height;
    pokemonWeight.textContent = res.data.weight;
    pokemonImg.hidden = false;
    pokemonImg.alt = res.data.name[0].toUpperCase() + res.data.name.substring(1);
    // if (res.data.sprites.front_default) {
    //   pokemonImg.src = res.data.sprites.front_default;
    // } else {
    //   pokemonImg.hidden = true;
    // }
    (res.data.sprites.front_default) ? pokemonImg.src = res.data.sprites.front_default : pokemonImg.hidden = true; // instead of 'if'-'else'
    // console.log(pokemonImg.src); // in order to check image address
    // pokemonImg.src = res.data.sprites.front_default;
    pokemonList.textContent = '';
    namesList.textContent = 'List of Pokemon types:';
    pokemonImg.onmouseover = () => {
      (res.data.sprites.back_default) ? pokemonImg.src = res.data.sprites.back_default : pokemonImg.src = res.data.sprites.front_default;
    }
    // pokemonImg.onmouseover = () => pokemonImg.src = res.data.sprites.back_default;
    pokemonImg.onmouseout = () => {
      (res.data.sprites.front_default) ? pokemonImg.src = res.data.sprites.front_default : pokemonImg.src = '';
    }
    // pokemonImg.onmouseout = () => pokemonImg.src = res.data.sprites.front_default;
    let types = res.data.types;
    let count = 0;
    types.map((pokemonType) => {
      count++;
      const newItem = document.createElement('p');
      newItem.setAttribute('class', 'newItem');
      newItem.style.cursor = 'pointer';
      newItem.textContent = `${count} type is ${pokemonType.type.name[0].toUpperCase() + pokemonType.type.name.substring(1)}`;
      const list = document.createElement('ol');
      list.hidden = true;
      axios.get(`https://pokeapi.co/api/v2/type/${pokemonType.type.name}/`)
      .then(res => res.data.pokemon.map((x) => {
        let newLi = document.createElement('li');
        newLi.setAttribute('class', 'newLi');
        newLi.style.cursor = 'pointer';
        newLi.textContent = x.pokemon.name[0].toUpperCase() + x.pokemon.name.substring(1);
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
      pokemonName.style.color = 'maroon';
      pokemonName.style.fontWeight = 'bold';
      pokemonHeight.textContent = '';
      pokemonWeight.textContent = '';
      pokemonImg.hidden = true;
      namesList.textContent = '';
      pokemonList.textContent = '';
    })
}
