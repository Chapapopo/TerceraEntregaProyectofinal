import express from 'express';
import { ensureUser } from '../services/funciones.js';
import makeController from '../controllers/makeController.js'; // Importa el controlador para la lógica de productos

const router = express.Router();

// Ruta para ver un solo producto por ID
router.get('/make', ensureUser, makeController.getProductById);

export default router;

