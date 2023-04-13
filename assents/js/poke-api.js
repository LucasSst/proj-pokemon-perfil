const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type 

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height =pokeDetail.height

    pokemon.weight = pokeDetail.weight

    pokemon.abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)

    pokemon.baseStats = pokeDetail.stats.map((stats) => stats.base_stat)

    pokemon.nameStats = pokeDetail.stats.map((stats) => stats.stat.name)


    return pokemon
}


pokeAPI.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}



pokeAPI.getPokemons = (offset=0, limit = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetail) => pokemonDetail)
}