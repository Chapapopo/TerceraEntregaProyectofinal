const makeController = {};

makeController.createUser = async (req, res, next) => {
  try {
    res.render("make", { title: "Make handelbars" });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

export default registerController;
