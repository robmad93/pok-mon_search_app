const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const sprite = document.getElementById('sprite');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const formattedQuery = formatQuery(query);

  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedQuery}`);
    if (!res.ok) throw new Error('Pokémon not found');

    const data = await res.json();
    updateUI(data);
  } catch (error) {
    alert('Pokémon not found');
    clearUI();
  }
});

function formatQuery(query) {
  if (isNaN(query)) {
    let name = query.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    if (query.includes('♀')) name = name.replace('♀', '-f');
    if (query.includes('♂')) name = name.replace('♂', '-m');
    return name;
  }
  return query;
}

function updateUI(data) {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  // Update sprite
  sprite.src = data.sprites.front_default;
  sprite.style.display = 'block';
  sprite.alt = data.name;

  // Update types
  types.innerHTML = '';
  data.types.forEach(typeInfo => {
    const span = document.createElement('span');
    span.textContent = typeInfo.type.name.toUpperCase();
    types.appendChild(span);
  });

  // Update stats
  const statsMap = {};
  data.stats.forEach(stat => {
    statsMap[stat.stat.name] = stat.base_stat;
  });

  hp.textContent = statsMap.hp;
  attack.textContent = statsMap.attack;
  defense.textContent = statsMap.defense;
  specialAttack.textContent = statsMap['special-attack'];
  specialDefense.textContent = statsMap['special-defense'];
  speed.textContent = statsMap.speed;
}

function clearUI() {
  pokemonName.textContent = '';
  pokemonId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  types.innerHTML = '';
  sprite.style.display = 'none';
  sprite.src = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}