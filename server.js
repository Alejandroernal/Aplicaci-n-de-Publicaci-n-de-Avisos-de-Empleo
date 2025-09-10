const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const dbPath = './empresas-db.json'

// Obtener todas las empresas
app.get('/empresa', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath))
  res.json(data.empresa)
})

// Agregar una empresa
app.post('/empresa', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath))
  const nuevaEmpresa = { ...req.body, id: Date.now().toString() }
  data.empresa.push(nuevaEmpresa)
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
  res.status(201).json(nuevaEmpresa)
})

// Eliminar una empresa
app.delete('/empresa/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath))
  data.empresa = data.empresa.filter(e => e.id !== req.params.id)
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
  res.status(204).end()
})

app.listen(3001, () => {
  console.log('Servidor backend escuchando en puerto 3001')
})