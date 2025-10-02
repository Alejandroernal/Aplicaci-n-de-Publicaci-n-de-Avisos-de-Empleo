//Configura express, cors, json y monta las rutas

import express from 'express'
import cors from 'cors'
import empresaRoutes from './routes/empresaRoutes.js'
import avisoRoutes from './routes/avisoRoutes.js'
import { supabase } from './config/database.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/empresa', empresaRoutes)
app.use('/aviso', avisoRoutes)

app.get('/test-supabase', async (req, res) => {
  const { data, error } = await supabase.from('empresa').select('*').limit(1)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true, data })
})

export default app

