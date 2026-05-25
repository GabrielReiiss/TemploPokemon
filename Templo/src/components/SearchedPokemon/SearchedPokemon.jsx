import './SearchedPokemon.css'

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

function SearchedPokemon({ pokemon, nextEvolutionPokemon }) {

    const nextEvolutions = findNextEvolutions(nextEvolutionPokemon.chain, pokemon.name)

    console.log(pokemon)
    console.log(nextEvolutionPokemon)

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
                <button className='buttonAdd'>Adicionar à equipe</button>
            </div>
            <div className='nextoEvolution-container'>
                <h2>Próximas Evoluções</h2>
                <div className='nextEvolution-image'>
                    <img
                        src={pokemon.sprites?.other['showdown'].front_default}
                        alt={pokemon.name}
                    />
                </div>
                <div className='nextEvolution-header'>
                    {!nextEvolutions || nextEvolutions.length === 0 ? (
                        <p>Não possui evolução</p>
                    ) : (
                        nextEvolutions.map((evo, index) => (
                            <p key={index}>{evo.species.name}</p>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchedPokemon
