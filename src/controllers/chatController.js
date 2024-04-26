/* import {socket} from "socket.io"; */
import {createMessage, searchMessages} from '../services/funciones.js';

const chatController = {};

chatController.mostrarChat = async (req, res) => {
  try {
    console.log("Chat")
    // Buscar todos los mensajes en la base de datos
    const mensajes = await searchMessages();
    res.render("chat", { title: "Chat", messages: mensajes }); // Pasamos un array de mensajes a la plantilla
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

chatController.crearMessage = async (req, res) => {
  try {
    const {message} = req.body;
    const name = req.user.name

    console.log(message)
    console.log(name)

    const mensaje = await createMessage(name, message);

    console.log(mensaje)

    res.redirect("/chat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default chatController;