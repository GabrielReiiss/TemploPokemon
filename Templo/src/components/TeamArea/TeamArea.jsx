import './TeamArea.css'

function TeamArea({ team, removeFromTeam }) {

    return (
        <div className='container-pokemonInfo'>
            <h2>Minha Equipe</h2>
            {team.length === 0 ?
                <div><p>Nenhum pokémon na equipe</p></div>
                :
                <div className='team-cards'>
                    {team.map((pokemon) => (
                        <div key={pokemon.id} className='pokemonTeam-container'>
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
                            <button onClick={() => removeFromTeam(pokemon.id)} className='buttonAdd'>Remover da equipe</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}

export default TeamArea
