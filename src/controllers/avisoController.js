// Controlador para gestionar avisos de empleo (Logica para listar, crear, editar, eliminar)

import * as avisoModel from '../models/avisoModel.js'

export async function getAvisos(req, res) {
  try {
    const avisos = await avisoModel.getAvisos()
    res.json(avisos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAvisoById(req, res) {
  try {
    const aviso = await avisoModel.getAvisoById(req.params.id)
    res.json(aviso)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function addAviso(req, res) {
  try {
    const aviso = await avisoModel.addAviso(req.body)
    res.status(201).json(aviso)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteAviso(req, res) {
  try {
    await avisoModel.deleteAviso(req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}