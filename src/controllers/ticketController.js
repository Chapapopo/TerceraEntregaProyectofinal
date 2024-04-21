import { searchUserPorId } from '../services/funciones.js';

const admin = {
  name: process.env.adminName,
  lastName: process.env.adminLastName,
  email: process.env.adminEmail,
  cart: process.env.adminCart,
  rol: process.env.adminRol
};

const ticketController = {};

ticketController.mostrarTicket = async (req, res) => {
  try {

    res.render("ticket", { title: "Tiket" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default ticketController;
