import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/main', async (req, res) => {
    try {
        const pokemon = await prisma.pokemon.findMany()
        res.status(200).json({message: "Pokémons encontrados com Sucesso!", pokemon})
    }
    catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente!' })
    }
})

export default router