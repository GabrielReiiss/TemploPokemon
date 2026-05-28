import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

type Pokemon = {
    id: string
    name: string
    typePokemon: string[]
    image: string
    habilities: string[]
}

type InitialState = {
    pokemons: Pokemon[]
}

const initialState: InitialState = {
    pokemons: []
}

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        addPokemon: (state, { payload }: PayloadAction<Pokemon>) => {
            state.pokemons.push(payload)
        },
        deletePokemon: (state, { payload }: PayloadAction<string>) =>{
            state.pokemons = state.pokemons.filter(pokemon => pokemon.id !== payload)
        },
    },
})

export const { addPokemon, deletePokemon } = pokemonSlice.actions

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<Dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()