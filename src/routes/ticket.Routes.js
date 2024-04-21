import express from 'express';
import { ensureUser } from '../services/funciones.js';
import ticketController from '../controllers/ticketController.js';

const router = express.Router();

router.get('/', ensureUser, ticketController.mostrarTicket);

export default router;
