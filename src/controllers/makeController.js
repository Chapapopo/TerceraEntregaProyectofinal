import { cargarProducto, deleteProductsPorId, modificarProductoPorId } from "../services/funciones.js";

const makeController = {};

makeController.makeProduct = async (req, res, next) => {
  try {
    console.log("make");
    res.render("make", { title: "Make handelbars" });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

makeController.crearProducto = async (req, res, next) => {
  try {
    console.log("crearProducto");

    const { titulo, descripcion, code, precio, cantidad, marca, categoria, demografia } = req.body;

    const producto = {
      titulo: titulo,
      descripcion: descripcion,
      code: code,
      precio: precio,
      cantidad: cantidad,
      marca: marca,
      categoria: categoria,
      demografia: demografia
    }

    console.log(producto);

    await cargarProducto(producto);

    res.render("make", { title: "Make handelbars" });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

makeController.borrarProducto = async (req, res, next) => {
  try {
    console.log("borrarProducto");

    const { idProducto } = req.body;

    console.log(idProducto)

    await deleteProductsPorId(idProducto)

    res.render("make", { title: "Make handelbars" });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

makeController.modificarProducto = async (req, res, next) => {
  try {
    console.log("modificarProducto");

    const { idProducto , campo, valor } = req.body;

    console.log(idProducto)

    await modificarProductoPorId(idProducto, campo, valor)
    res.render("make", { title: "Make handelbars" });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

export default makeController;
