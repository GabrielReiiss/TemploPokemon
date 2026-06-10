import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import SearchedPokemon from '../../components/SearchedPokemon/SearchedPokemon'
import TeamArea from '../../components/TeamArea/TeamArea'
import SearchHistory from '../../components/SearchHistory/SearchHistory'
import botaoImg from '../../assets/botao.png'
import botao2Img from '../../assets/botao2.png'
import './index.css'
import { addHistory, setHistory, setPokemons, useAppDispatch } from '../../store'
import api from '../../Services/api'

function Main() {
  const [pokemon, setPokemon] = useState(null)
  const [nextEvolutionPokemon, setNextEvolutionPokemon] = useState(null)
  const [botaoHover, setBotaoHover] = useState(false)
  const inputRef = useRef()
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await api.get('/main')
        dispatch(setPokemons(
          data.map((p) => ({
            id: p.id,
            pokemonId: p.pokemonId,
            name: p.name,
            typePokemon: p.type,
            image: p.image,
            habilities: p.habilities,
          }))
        ))
      } catch (error) {
        console.error('Erro ao carregar o time:', error)
      }
    }

    async function loadHistory() {
      try {
        const { data } = await api.get('/history')
        dispatch(setHistory(
          data.map((h) => ({
            id: h.id,
            pokemon: h.term,
            status: h.status,
            time: h.date,
          }))
        ))
      } catch (error) {
        console.error('Erro ao carregar o histórico:', error)
      }
    }

    loadTeam()
    loadHistory()
  }, [])

  async function searchPokemon() {
    const pokemon = inputRef.current.value.trimEnd()
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    const time = new Date().toLocaleTimeString('pt-BR')

    if (pokemon !== '') {
      try {
        const pokemonData = await axios.get(apiUrl)
        const specieData = await axios.get(pokemonData.data.species.url)
        const evolutionData = await axios.get(specieData.data.evolution_chain.url)
        dispatch(addHistory({
          pokemon: pokemon,
          status: 'Sucesso',
          time: time
        }))
        api.post('/history', {
          term: pokemon,
          status: 'Sucesso',
          date: String(time)
        })
        setPokemon(pokemonData.data)
        setNextEvolutionPokemon(evolutionData.data)
      } catch {
        window.alert('Pokémon não encontrado. Verifique a grafia.')
        dispatch(addHistory({
          pokemon: pokemon,
          status: 'Erro',
          time: time
        }))
        api.post('/history', {
          term: pokemon,
          status: 'Erro',
          date: String(time)
        })
        return
      }
    } else {
      window.alert('Preencha o nome ou id do Pokémon primeiro!')
      return
    }
  }

  return (
    <div className='container'>
      <header>
        <h1>Templo dos Pokémons</h1>
      </header>
      <div className='container-busca'>
        <p>Buscar Pokémon</p>
        <div className='search-row'>
          <input ref={inputRef} type='text' placeholder='Digite o nome ou id do pokémon desejado.'></input>
          <button
            onClick={searchPokemon}
            onMouseEnter={() => setBotaoHover(true)}
            onMouseLeave={() => setBotaoHover(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <img src={botaoHover ? botao2Img : botaoImg} alt="Descrição do botão" width="50px" />
          </button>
        </div>
      </div>
      {pokemon && <SearchedPokemon pokemon={pokemon} nextEvolutionPokemon={nextEvolutionPokemon} />}
      {<TeamArea />}
      {<SearchHistory />}
    </div>
  )
}

export default Main
