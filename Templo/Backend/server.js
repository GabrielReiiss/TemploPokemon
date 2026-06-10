import 'dotenv/config'
import express from "express"
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import auth from './middlewares/auth.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Servidor rodando 🚀")
})
