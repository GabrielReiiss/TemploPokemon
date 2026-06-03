import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const token = req.header.authorization

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' })
    }
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        req.userId = decoded.id
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido' })       
    }

    next()
}

export default auth