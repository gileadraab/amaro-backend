import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import xmlparser from 'express-xml-bodyparser'
import { pingRouter } from './router/pingRouter'
import { productRouter } from './router/ProductRouter'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(xmlparser())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.use("/ping", pingRouter)
app.use("/products", productRouter)




