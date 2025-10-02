import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import empresaRoutes from './src/routes/empresaRoutes.js'
import avisoRoutes from './src/routes/avisoRoutes.js'


dotenv.config()
const PORT = process.env.PORT || 3000

const app = express();
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({
    message: 'API de Avisos de Empleo',
    version: '1.0.0',
    endpoints: {
      avisos: '/api/avisos',
      empresas: '/api/empresas'
    }
  });
});

// Rutas principales
app.use('/api/empresas', empresaRoutes)
app.use('/api/avisos', avisoRoutes)



app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en  http://localhost:${PORT}`)
})


