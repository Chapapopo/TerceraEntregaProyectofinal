import express from 'express';
import { ensureUser } from '../services/funciones.js';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/', ensureUser, chatController.mostrarChat);

router.post('/', ensureUser, chatController.crearMessage);

export default router;
