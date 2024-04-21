/* import {socket} from "socket.io"; */
const chatController = {};

chatController.mostrarChat = async (req, res) => {
  try {console.log("Chat")
    
    res.render("chat", { title: "Chat" }); // Renderiza la plantilla con los productos, la información de paginación, la marca y la orden para mostrarla en la plantilla
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default chatController;
