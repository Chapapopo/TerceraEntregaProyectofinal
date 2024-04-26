import express from 'express';
import { ensureAdmin } from '../services/funciones.js';
import makeController from '../controllers/makeController.js'; // Importa el controlador para la lógica de productos

const router = express.Router();

// Ruta para ver un solo producto por ID
router.get('/', ensureAdmin, makeController.makeProduct);
router.post('/crear', ensureAdmin, makeController.crearProducto);
router.post('/borrar', ensureAdmin, makeController.borrarProducto);
router.post('/modificar', ensureAdmin, makeController.modificarProducto);

export default router;

