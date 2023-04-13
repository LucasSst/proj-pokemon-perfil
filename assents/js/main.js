const pokemonPerfil = document.getElementById('pokemon-perfil')
const pokemonInfo = document.getElementById('InfoUl')

const statusButton = document.getElementById('baseStatus')
const aboutButton = document.getElementById('about')



const maxRecords = 448;
const limit = 1;
let offset = 0;

let i = 0;






function loadPokemonPerfil(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => ` 
        <div id="pokemon" class='pokemon ${pokemon.type}'>
            <div class="arrow">
                <button id='backArrow' onclick="backArrow()" type="button">Back</button>
                <button id='nextArrow' onclick="nextArrow()" type="button">Next</button>
            </div>

            <div class="pokemonResume">
                <h1 class="name">${pokemon.name}</h1>
                <span class="id">${pokemon.number}</span>
                ${pokemon.types.map((type) => `<span class="type ${type}"> ${type}</span>`).join('')}
                
            </div>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        
        </div>
        
       
        `).join('')
        const infoHtml = pokemons.map((pokemon) => `
            <li class="InfoList">
                <h3 class="InfoTitle">Height</h3>
                <span class="InfoAdjunt">${pokemon.height/10}m</span> 
            </li>
            
            <li class="InfoList">
                <h3 class="InfoTitle">Weight</h3>
                <span class="InfoAdjunt">${pokemon.weight/10}kg</span>
            </li class="InfoList">

            <li class="InfoList">
                <h3 class="InfoTitle">Ability</h3>
                <span class="InfoAdjunt"> ${pokemon.abilities.map((abilities) => ` ${abilities} `)} </span>
                
            </li>
        
        `).join('')

        
        const baseStatus = pokemons.map((pokemon) => `
                ${pokemon.nameStats.map((name) =>`
                <li class="InfoList">
                    <h3 class="InfoTitle"> ${name}</h3>
                    <span class="InfoAdjunt">${pokemon.baseStats[addI()]}</span> 
                </li>` ).join('')}
        `).join()
        pokemonPerfil.innerHTML = newHtml
        pokemonInfo.innerHTML = infoHtml
            
        statusButton.addEventListener('click', () => {
            pokemonInfo.innerHTML = baseStatus
        })
        aboutButton.addEventListener('click', () => {
            pokemonInfo.innerHTML = infoHtml
        })


        
        



    })

}
loadPokemonPerfil(offset, limit)

function addI(){
    
    if(i === 5){
        return i = 0
    }else {
        return i++
    }
}

function nextArrow() {
    offset += limit
    if (offset < maxRecords) {
        loadPokemonPerfil(offset, limit)
    }
}

function backArrow() {
    if (offset >= 1) {
        offset -= limit
        loadPokemonPerfil(offset, limit)
    }
}













