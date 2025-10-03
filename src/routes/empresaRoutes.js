import express from 'express';
import * as empresaController from '../controllers/empresaController.js';
import * as validateEmpresa from '../middlewares/validation.js';

const router = express.Router();

router.get('/', empresaController.empresaController.getAll);
router.get('/:id', empresaController.empresaController.getById);
router.post('/', validateEmpresa.validateEmpresa, empresaController.empresaController.create);
router.put('/:id', validateEmpresa.validateEmpresa, empresaController.empresaController.update);
router.delete('/:id', empresaController.empresaController.delete);

export default router;