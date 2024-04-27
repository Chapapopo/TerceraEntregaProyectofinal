/* import {socket} from "socket.io"; */
/* import { connect } from 'mongoose'; */
import {searchMessages} from '../services/funciones.js';

const chatController = {};

chatController.mostrarChat = async (req, res) => {
  try {
    console.log("Chat")
    // Buscar todos los mensajes en la base de datos
    const mensajes = await searchMessages();
    res.render("chat", { title: "Chat", messages: mensajes, nombre: "Pedro"}); // Pasamos un array de mensajes a la plantilla
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default chatController;