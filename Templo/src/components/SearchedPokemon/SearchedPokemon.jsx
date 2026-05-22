import './SearchedPokemon.css'

function SearchedPokemon({ pokemon, nextEvolutionPokemon }) {

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
                    <h3>{nextEvolutionPokemon.chain.evolves_to?.map((item, index) => {
                        if (nextEvolutionPokemon.chain.evolves_to.length == 0){
                            <p key={index}>Não possui evolução</p>
                        } else if (nextEvolutionPokemon.chain.evolves_to.length > 2){
                            return <p key={index}>{item.species.name}</p>
                        } else {
                            return <span key={index}>{item.evolves_to?.map((item2, index) => ( <p key={index}>{item2.species.name}</p> ))}</span>
                        }
                    })}</h3>
                </div>
            </div>
        </div>
    )
}

export default SearchedPokemon
