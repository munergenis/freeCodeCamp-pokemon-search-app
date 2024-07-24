// ENDPOINTS
const endpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

// DOM ELS
const formEl = document.getElementById("input-cont")
const inputEl = document.getElementById("search-input")
const pokemonNameEl = document.getElementById("pokemon-name")
const pokemonIdEl = document.getElementById("pokemon-id")
const pokemonWeightEl = document.getElementById("weight")
const pokemonHeightEl = document.getElementById("height")
const pokemonImgEl = document.getElementById("pokemon-img")
const pokemonTypesEl = document.getElementById("types")
const pokemonHp = document.getElementById("hp")
const pokemonAttack = document.getElementById("attack")
const pokemonDeffense = document.getElementById("defense")
const pokemonSpecialAttack = document.getElementById("special-attack")
const pokemonSpecialDefense = document.getElementById("special-defense")
const pokemonSpeed = document.getElementById("speed")

// GLOBAL VARS
let pokemonData = {}

// FUNCTIONS
const submitForm = (e) => {
  e.preventDefault()
  const searchValue = inputEl.value
  
  if (!searchValue || searchValue.startsWith(" ")) {
    inputEl.value = ""
    return
  }

  // Do fetching logic
  fetchPokemonData(searchValue.toLowerCase())

  inputEl.value = ""
}

const fetchPokemonData = async (searchValue) => {
  try {
    const res = await fetch(`${endpoint}/${searchValue}`)
    const data = await res.json()

    savePokemonData(data)
    renderPokemonData()
  } catch (err) {
    console.log(err)
    alert("Pokémon not found")
  }
}

const savePokemonData = (data) => {
  const {
    name,
    id,
    weight,
    height,
    sprites,
    types,
    stats
  } = data
  
  console.log(data)

  const formattedName = name[0].toUpperCase() + name.slice(1)
  const formattedWeight = +(weight / 10).toFixed(2)
  const formattedHeight = +(height / 10).toFixed(2)
  const img = sprites.front_default
  const formattedTypes = types.map(type => type.type.name.toUpperCase())
  const formattedStats = stats.map(stat => stat.base_stat)

  console.log(formattedStats)
  pokemonData = {
    id,
    name: formattedName,
    weight: formattedWeight,
    height: formattedHeight,
    img,
    types: formattedTypes,
    stats: formattedStats
  }

  console.log(pokemonData.stats[4])
}

const renderPokemonData = () => {
  pokemonNameEl.textContent = pokemonData.name
  pokemonIdEl.textContent = `#${pokemonData.id}`
  pokemonWeightEl.textContent = `Weight: ${pokemonData.weight} kg`
  pokemonHeightEl.textContent = `Height: ${pokemonData.height} m`
  pokemonImgEl.src = pokemonData.img
  pokemonTypesEl.innerHTML = pokemonData.types.map(type => {
    return `
      <span class="type-tag">${type}</span>
    `
  }).join("")
  pokemonHp.textContent = pokemonData.stats[0]
  pokemonAttack.textContent = pokemonData.stats[1]
  pokemonDeffense.textContent = pokemonData.stats[2]
  pokemonSpecialAttack.textContent = pokemonData.stats[3]
  pokemonSpecialDefense.textContent = pokemonData.stats[4]
  pokemonSpeed.textContent = pokemonData.stats[5]
}

formEl.addEventListener("submit", submitForm)