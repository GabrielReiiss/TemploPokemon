import { useState, useEffect, Fragment } from 'react'
import './SearchedPokemon.css'
import axios from 'axios'

function findNextEvolutions(chain, pokemonName) {
    if (chain.species.name === pokemonName) {
        return chain.evolves_to
    }
    for (const evo of chain.evolves_to) {
        const result = findNextEvolutions(evo, pokemonName)
        if (result !== null) return result
    }
    return null
}

async function findNextEvolutionsImage(nextEvolutionsPokemonsName){
    var nextEvolutionImagesUrl = []

    for(let i in nextEvolutionsPokemonsName){
        const nextEvolutionsApiUrl = `https://pokeapi.co/api/v2/pokemon/${nextEvolutionsPokemonsName[i]}/`
        const nextEvolutionsData = await axios.get(nextEvolutionsApiUrl)
        nextEvolutionImagesUrl.push(nextEvolutionsData.data.sprites?.other['showdown'].front_default)
    }

    return nextEvolutionImagesUrl
}

function SearchedPokemon({ pokemon, nextEvolutionPokemon, team, addToTeam }) {

    const nextEvolutions = findNextEvolutions(nextEvolutionPokemon.chain, pokemon.name)
    const nextEvolutionsPokemonsName = nextEvolutions?.map(item => item.species.name) ?? []
    const [nextEvolutionsPokemonsImage, setNextEvolutionsPokemonsImage] = useState([])

     useEffect(() => {
        if (nextEvolutionsPokemonsName.length === 0) return

        findNextEvolutionsImage(nextEvolutionsPokemonsName).then(setNextEvolutionsPokemonsImage)
    }, [pokemon.name])
    
    let deveDesabilitar

     if (team.length >= 6) {
        deveDesabilitar = true
    } else if (team.some(p => p.id === pokemon.id)) {
        deveDesabilitar = true
    } else if (team.some(p => p.species.name === pokemon.species.name)) {
        deveDesabilitar = true
    }

    return (
        <div className='container-pokemonInfo'>
            <h2>Resultado da Busca</h2>
            <div className='pokemon-container'>
                <div className='pokemon-header'>
                    <h3>{pokemon.name}</h3>
                    <span className='pokemon-type'>
                        {pokemon.types?.map((item, index) => (
                            <span key={index}>
                                {item.type.name}
                                {index < pokemon.types.length - 1 && ' / '}
                            </span>
                        ))}
                    </span>
                </div>
                <div className='pokemon-image'>
                    <img
                        src={pokemon.sprites?.other['showdown'].front_default}
                        alt={pokemon.name}
                    />
                </div>
                <div className='pokemon-abilities'>
                    <p className='abilities-label'>Habilidades</p>
                    {pokemon.abilities?.map((item, index) => (
                        <p key={index} className='ability-item'>
                            {item.ability.name}
                        </p>
                    ))}
                </div>
                <button onClick={() => addToTeam(pokemon)} disabled={deveDesabilitar} className='buttonAdd'>Adicionar à equipe</button>
            </div>
            <div className='nextEvolution-container'>
                <h2>Próximas Evoluções</h2>
                {nextEvolutionsPokemonsName.length === 0 ? (
                    <p className='no-evolution'>Não possui evolução</p>
                ) : (
                    
                    <div className='evolution-timeline'>
                        {nextEvolutionsPokemonsName.map((name, index) => (
                            <Fragment key={index}>
                                <div className='evolution-step'>
                                    <img
                                        src={nextEvolutionsPokemonsImage[index]}
                                        alt={name}
                                    />
                                    <span className='evolution-name'>{name}</span>
                                </div>
                                {index < nextEvolutionsPokemonsName.length - 1 && (
                                    <span className='evolution-arrow'>→</span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchedPokemon
