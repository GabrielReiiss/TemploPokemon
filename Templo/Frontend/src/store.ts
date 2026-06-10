import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

type Pokemon = {
    id: string
    pokemonId: string
    name: string
    typePokemon: string[]
    image: string
    habilities: string[]
}

type History = {
    id: String
    pokemon: string
    status: string
    time: string
}

type InitialState = {
    pokemons: Pokemon[]
}

type InitialStateHistory = {
    historys: History[]
}

const initialState: InitialState = {
    pokemons: []
}

const initialStateHistory: InitialStateHistory = {
    historys: []
}

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        addPokemon: (state, { payload }: PayloadAction<Pokemon>) => {
            state.pokemons.push(payload)
        },
        deletePokemon: (state, { payload }: PayloadAction<string>) => {
            state.pokemons = state.pokemons.filter(pokemon => pokemon.pokemonId !== payload)
        },
        setPokemons: (state, { payload }: PayloadAction<Pokemon[]>) => {
            state.pokemons = payload
        }
    },
})

const historySlice = createSlice({
    name: 'historys',
    initialState: initialStateHistory,
    reducers: {
        addHistory: (state, { payload }: PayloadAction<History>) => {
            state.historys.push(payload)
        },
        setHistory: (state, { payload }: PayloadAction<History[]>) => {
            state.historys = payload
        },
        deleteAll: () => {
            return initialStateHistory
        }
    }
})

export const { addPokemon, deletePokemon, setPokemons } = pokemonSlice.actions

export const { addHistory, setHistory, deleteAll } = historySlice.actions

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    history: historySlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<Dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()