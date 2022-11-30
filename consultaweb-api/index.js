import express from "express"
import routes from "./routes.js"
import cors from 'cors'
import db from './db.js'
import authMiddleware from "./middlewares/authMiddleware.js"


const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)


db.sync(() => console.log('Banco de dados conectado!'))


app.listen(port, () => {
    console.log(`API subiu na porta ${port} `)
})