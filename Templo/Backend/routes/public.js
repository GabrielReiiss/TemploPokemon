import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

// Cadastro
router.post('/cadastro', async (req, res) => {

    try {
    const user = req.body

    const existingUser = await prisma.user.findFirst({
        where: {
            name: user.name
        }
    })

    if(existingUser) {
        return res.status(400).json({ error: 'Já existe um usuário com esse nome!' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    const userdb = await prisma.user.create({
        data: {
            name: user.name,
            password: hashedPassword,
        },
    })
    res.status(201).json(userdb)
    } catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente!' })
    }
})

// Login
router.post('/login', async (req, res) => {

    try {
        const userInfo = req.body

        const userdb = await prisma.user.findUnique({
            where: {
                name: userInfo.name,
            }
        })

        if (!userdb) {
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        const isPasswordValid = await bcrypt.compare(userInfo.password, userdb.password)

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta!' })
        }

        const token = jwt.sign({ userId: userdb.id }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json(token)
    }
    catch (error) {
        res.status(500).json({ error: 'Erro no Servidor, tente novamente!' })
    }
})

export default router