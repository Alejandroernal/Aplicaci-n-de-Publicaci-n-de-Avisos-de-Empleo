//Configura express, cors, json y monta las rutas

import express from 'express'
import cors from 'cors'
import empresaRoutes from './routes/empresaRoutes.js'
import avisoRoutes from './routes/avisoRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/empresa', empresaRoutes)
app.use('/aviso', avisoRoutes)

export default app