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
                userId: pokemon.userId,
            }
        })

        if (existingPokemon) {
            return res.status(400).json({ error: 'Pokémon já está no time' })
        }

        const pokemonDb = await prisma.pokemon.create({
            data: {
                pokemonId: pokemon.pokemonId,
                userId: pokemon.userId,
                name: pokemon.name,
                type: pokemon.type,
                image: pokemon.image,
                habilities: pokemon.habilities,
            }
        })

        res.status(201).json(pokemonDb)
    }
    catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente!' })
    }
})

//Listar Pokémons do time
router.get('/main', async (req, res) => {
    try {
        
        console.log(req.userId)

        const pokemons = await prisma.pokemon.findMany({
            where: {
                userId: req.userId
            }
        })

        res.status(200).json(pokemons)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente!' })
    }
})

export default router