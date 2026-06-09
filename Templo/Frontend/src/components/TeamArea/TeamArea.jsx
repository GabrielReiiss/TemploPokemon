import { deletePokemon, useAppDispatch, useAppSelector } from '../../store'
import './TeamArea.css'
import api from "../../Services/api"

function TeamArea() {

    const team = useAppSelector(state => state.pokemon.pokemons)
    const dispatch = useAppDispatch()

    const handleDelete = async (pokemonId) => {
        try {
            await api.delete('/main', { data: { pokemonId }})
            dispatch(deletePokemon(pokemonId))
        } catch (error) {
            console.error('Erro ao remover o pokémon do time:', error.message)
        }
    }

    return (
        <div className='container-pokemonInfo'>
            <h2>Minha Equipe - {team.length} / 6</h2>
            {team.length === 0 ?
                <div className='time-vazio'><p>Nenhum pokémon na equipe</p></div>
                :
                <div className='team-cards'>
                    {team.map((pokemon) => (
                        <div key={pokemon.id} className='pokemonTeam-container'>
                            <div className='pokemonTeam-header'>
                                <h3>{pokemon.name}</h3>
                                <span className='pokemonTeam-type'>
                                    {pokemon.typePokemon.map((item, index) => (
                                        <span key={index}>
                                            {item}
                                            {index < pokemon.typePokemon.length - 1 && ' / '}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className='pokemon-image'>
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                />
                            </div>
                            <div className='pokemon-abilities'>
                                <p className='abilities-label'>Habilidades</p>
                                {pokemon.habilities?.map((item, index) => (
                                    <p key={index} className='ability-item'>
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <button onClick={() => handleDelete(pokemon.pokemonId)} className='buttonAdd'>Remover da equipe</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}

export default TeamArea
