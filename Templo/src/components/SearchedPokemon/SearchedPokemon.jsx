import './SearchedPokemon.css'

function SearchedPokemon({ pokemon }) {

    return (
        <div className='container-pokemonInfo'>
            <div className='pokemon-container'>
                <div className='pokemon-header'>
                    <h3>{pokemon.name}</h3>
                    <span className='pokemon-type'>{pokemon.types?.[0].type.name}</span>
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
        </div>
    )
}

export default SearchedPokemon
