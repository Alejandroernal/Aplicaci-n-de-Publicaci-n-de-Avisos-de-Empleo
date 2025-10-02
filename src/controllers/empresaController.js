// Controlador para gestionar empresas (Logica para listar, crear, editar, eliminar)

import * as empresaModel from '../models/empresaModel.js'

export async function getEmpresas(req, res) {
  try {
    const empresas = await empresaModel.getEmpresas()
    res.json(empresas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function addEmpresa(req, res) {
  try {
    const empresa = await empresaModel.addEmpresa(req.body)
    res.status(201).json(empresa)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteEmpresa(req, res) {
  try {
    await empresaModel.deleteEmpresa(req.params.empresa_id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}