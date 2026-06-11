import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Adicionar Pokémon ao time
router.post('/main', async (req, res) => {
    try {
        const pokemon = req.body

        const existingPokemon = await prisma.pokemon.findFirst({
            where: {
                pokemonId: pokemon.pokemonId,
                userId: req.userId,
            }
        })

        if (existingPokemon) {
            return res.status(400).json({ error: 'Pokémon já está no time' })
        }

        const pokemonDb = await prisma.pokemon.create({
            data: {
                pokemonId: pokemon.pokemonId,
                userId: req.userId,
                name: pokemon.name,
                type: pokemon.type,
                image: pokemon.image,
                habilities: pokemon.habilities,
            }
        })

        res.status(201).json(pokemonDb)
    }
    catch (error) {
       res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Listar Pokémons do time
router.get('/main', async (req, res) => {
    try {
        const pokemons = await prisma.pokemon.findMany({
            where: {
                userId: req.userId
            }
        })

        res.status(200).json(pokemons)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Deletar Pokémon do time
router.delete('/main', async (req, res) => {
    try {
        const deletedPokemon = await prisma.pokemon.delete({
            where: {
                pokemonId_userId: {
                    userId: req.userId,
                    pokemonId: req.body.pokemonId,
                }
            }
        })

        res.status(200).json(deletedPokemon)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Adicionar pesquisa no histórico
router.post('/history', async (req, res) => {
    try {
        const search = req.body

        const historyDb = await prisma.history.create({
            data: {
                userId: req.userId,
                term: search.term,
                status: search.status,
                date: search.date,
            }
        })

        res.status(200).json(historyDb)
    } catch (error) {
       res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Listar o histórico
router.get('/history', async (req,res) => {
    try {
        const history = await prisma.history.findMany({
            where: {
                userId: req.userId
            }
        })

        res.status(200).json(history)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Limpar o histórico
router.delete('/history', async (req, res) => {
    try {
        const historyDelete = await prisma.history.deleteMany({
            where: {
                userId: req.userId
            }
        })

        res.status(200).json(historyDelete)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

//Logout
router.post('logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout realizado com sucesso!' })        
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente! ' + error.message })
    }
})

export default router