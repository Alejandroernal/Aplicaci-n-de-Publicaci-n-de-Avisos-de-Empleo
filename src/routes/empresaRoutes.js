// Rutas para gestionar empresas (Conecta con los controllers)

import express from 'express'
import * as empresaController from '../controllers/empresaController.js'
const router = express.Router()

router.get('/', empresaController.getEmpresas)
router.post('/', empresaController.addEmpresa)
router.delete('/:id', empresaController.deleteEmpresa)

export default router