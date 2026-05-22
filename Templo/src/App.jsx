import { useState, useRef } from 'react'
import axios from 'axios'
import SearchedPokemon from './components/SearchedPokemon/SearchedPokemon'
import botaoImg from './assets/botao.png'
import botao2Img from './assets/botao2.png'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [botaoHover, setBotaoHover] = useState(false)
  const inputRef = useRef()

  async function searchPokemon() {
    const pokemon = inputRef.current.value
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`

    if (!pokemon == '') {
      try {
        const pokemonData = await axios.get(apiUrl)
        setPokemon(pokemonData.data)
      } catch {
        window.alert('Pokémon não encontrado. Verifique a grafia.')
        return
      }
    } else {
      window.alert('Preencha o nome ou id do Pokémon primeiro!')
      return
    }
  }

  return (
    <div className='container'>
      <h1>Templo dos Pokémons</h1>
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
      {pokemon && <SearchedPokemon pokemon={pokemon} />}
    </div>
  )
}

export default App
