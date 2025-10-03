import express from 'express';
import * as  avisoController  from '../controllers/avisoController.js';
import * as validateAviso  from '../middlewares/validation.js';

const router = express.Router();

router.get('/', avisoController.avisoController.getAll);
router.get('/:id', avisoController.avisoController.getById);
router.post('/', validateAviso.validateAviso, avisoController.avisoController.create);
router.put('/:id', validateAviso.validateAviso, avisoController.avisoController.update);
router.delete('/:id', avisoController.avisoController.delete);

export default router;