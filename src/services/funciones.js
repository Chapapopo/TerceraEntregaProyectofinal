import Product from '../model/producto.model.js'; // Importa el modelo Product
import Carts from '../model/cart.model.js'; // Importa el modelo Cart
import Users from '../model/user.model.js'; // Importa el modelo User
import Tickets from '../model/ticket.model.js'; // Importa el modelo User


export const searchProducts = async (page = 1, limit = 10, marca = '', orden = 'asc') => {
    const skip = (page - 1) * limit;
    let query = {};
    if (marca) {
        query.marca = marca; // Filtrar por marca si se proporciona
    }

    let sort = { precio: orden === 'asc' ? 1 : -1 }; // Ordenar por precio de forma ascendente o descendente

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

    // Convertir los productos a un array de JavaScript
    const productosJS = products.map(product => {
        return {
            _id: product._id,
            code: product.code,
            estado: product.estado,
            cantidad: product.cantidad,
            categoria: product.categoria,
            id: product.id,
            titulo: product.titulo,
            descripcion: product.descripcion,
            marca: product.marca,
            precio: product.precio,
            demografia: product.demografia,
            imagen: product.imagen,
        };
    });

    return {
        productos: productosJS,
        pagination: {
            totalProducts: totalProducts,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
        }
    };
};

export const searchProductsPorId = async (idProducto, marca = '', orden = 'asc') => {
    try {
        let filtro = { id: idProducto };
        if (marca) {
            filtro.marca = marca;
        }

        const productos = await Product.find(filtro).sort({ precio: orden });
        if (!productos.length) {
            console.error(`No se encontró ningún producto con id ${idProducto}.`);
            return null;
        }

        console.log("Productos encontrados:");

        // Convertir los productos a un array de objetos JavaScript
        const productosJS = productos.map(producto => {
            return {
                id: producto.id,
                titulo: producto.titulo,
                descripcion: producto.descripcion,
                code: producto.code,
                precio: producto.precio,
                estado: producto.estado,
                cantidad: producto.cantidad,
                marca: producto.marca,
                categoria: producto.categoria,
                demografia: producto.demografia,
                imagen: producto.imagen
            };
        });

        return productosJS;
    } catch (error) {
        console.error(`Error al buscar los productos: ${error.message}`);
        return null;
    }
};

export const searchProductsPorId2 = async (idProducto) => {
    try {
        const producto = await Product.findOne({ id: idProducto });
        if (!producto) {
            console.error(`No se encontró un producto con id ${idProducto}.`);
            return null;
        }

        console.log("Producto encontrado:");

        // Convertir el producto a un objeto JavaScript
        const productoJS = {
            id: producto.id,
            titulo: producto.titulo,
            descripcion: producto.descripcion,
            code: producto.code,
            precio: producto.precio,
            estado: producto.estado,
            cantidad: producto.cantidad,
            marca: producto.marca,
            categoria: producto.categoria,
            demografia: producto.demografia,
            imagen: producto.imagen
        };

        return productoJS;
    } catch (error) {
        console.error(`Error al buscar el producto: ${error.message}`);
        return null;
    }
};

export const searchCartsPorId = async (idCarrito) => {
    try {
        const carrito = await Carts.findOne({ id: idCarrito });
        if (!carrito) {
            console.error(`No se encontró un carrito con id ${idCarrito}.`);
            return null;
        }

        console.log("Carrito encontrado:");
        console.log(carrito);

        // Convertir el carrito a un objeto JavaScript
        const carritoJS = {
            id: carrito.id,
            ids: carrito.products.map(producto => producto.id)
        };

        return carritoJS;
    } catch (error) {
        console.error(`Error al buscar el carrito: ${error.message}`);
        return null;
    }
};

export const searchCartsPorId2 = async (idCarrito) => {
    try {
        const carrito = await Carts.findOne({ id: idCarrito });
        if (!carrito) {
            console.error(`No se encontró un carrito con id ${idCarrito}.`);
            return null;
        }

        console.log("Carrito encontrado:");
        console.log(carrito);

        // Convertir el carrito a un objeto JavaScript
        const carritoJS = {
            id: carrito.id,
            products: carrito.products,
        };

        return carritoJS;
    } catch (error) {
        console.error(`Error al buscar el carrito: ${error.message}`);
        return null;
    }
};

export const crearCarrito = async () => {
    try {
        const nuevoCarrito = new Carts({
            id: Math.floor(Math.random() * 1000), // Genera una ID aleatoria
            productos: []
        });
        await nuevoCarrito.save();
        console.log(`Carrito creado correctamente.`);
        return nuevoCarrito.id; // Retorna la ID del carrito creado
    } catch (error) {
        console.error(`Error al crear el carrito: ${error.message}`);
        return null; // Retorna null en caso de error
    }
};

export const deleteProductoDelCarritoPorId = async (idCarrito, idProducto) => {
    try {
        // Obtener el carrito por su id
        const carrito = await Carts.findOne({ id: idCarrito });
        if (!carrito) {
            console.error(`No se encontró un carrito con id ${idCarrito}.`);
            return;
        }

        // Eliminar el producto del carrito por su id
        carrito.products = carrito.products.filter(prod => prod.id !== idProducto);
        // Guardar el carrito actualizado en la base de datos
        await carrito.save();
        console.log(`Producto con id ${idProducto} eliminado del carrito con id ${idCarrito}.`);
    } catch (error) {
        console.error(`Error al eliminar el producto del carrito: ${error.message}`);
    }
};

export const modificarProductoPorId = async (id, campo, valor) => {
    try {
        if (campo === 'id' || campo === 'code') {
            console.error(`No se puede modificar el campo ${campo}.`);
            return;
        }

        const update = { [campo]: valor };
        const producto = await Product.findOneAndUpdate({ id: id }, update, { new: true });
        if (!producto) {
            console.error(`No se encontró un producto con id ${id}.`);
            return;
        }
        console.log(`Producto con id ${id} modificado correctamente.`);
    } catch (error) {
        console.error(`Error al modificar el producto con id ${id}: ${error.message}`);
    }
};

export const modificarCarritoPorId = async (idCar, idPro, campo, nuevoValor) => {
    try {
        // Definir el filtro para encontrar el carrito por su id y el producto por su id en el array de productos
        const filter = { id: idCar, "products.id": idPro };

        // Definir la actualización para modificar el campo del producto
        const update = { $set: { [`products.$.${campo}`]: nuevoValor } };

        // Realizar la actualización
        const carritoActualizado = await Carts.findOneAndUpdate(filter, update, { new: true });

        if (!carritoActualizado) {
            console.error(`No se encontró un carrito con id ${idCar} o un producto con id ${idPro} en el carrito.`);
            return;
        }

        console.log(`Producto con id ${idPro} en el carrito con id ${idCar} actualizado.`);
    } catch (error) {
        console.error(`Error al modificar el producto en el carrito: ${error.message}`);
    }
};

export const cargarCarrito = async (idCarrito, idProducto) => {
    try {
        // Obtener el producto por su id
        const producto = await Product.findOne({ id: idProducto });
        if (!producto) {
            console.error(`No se encontró un producto con id ${idProducto}.`);
            return;
        }

        // Verificar que la cantidad del producto sea mayor que cero
        if (producto.cantidad === 0) {
            console.error(`El producto con id ${idProducto} no está disponible.`);
            return;
        }

        // Obtener el carrito por su id
        let carrito = await Carts.findOne({ id: idCarrito });
        if (!carrito) {
            console.error(`No se encontró un carrito con id ${idCarrito}.`);
            return;
        }

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.products.find(prod => prod.id === idProducto);
        if (productoEnCarrito) {
            // Incrementar la cantidad del producto en el carrito
            await modificarCarritoPorId(idCarrito, idProducto, 'cantidad', productoEnCarrito.cantidad + 1);
            console.log(`Cantidad del producto con id ${idProducto} en el carrito con id ${idCarrito} incrementada.`);
        }

        // Agregar el producto al carrito
        const update = {
            $push: {
                products: {
                    id: producto.id,
                    titulo: producto.titulo,
                    cantidad: 1
                }
            }
        };
        const productoActualizado = await Carts.findOneAndUpdate({ id: idCarrito }, update, { new: true });
        console.log(`Producto con id ${idProducto} agregado al carrito con id ${idCarrito}.`);
        
    } catch (error) {
        console.error(`Error al cargar el producto en el carrito: ${error.message}`);
    }
};

export const deleteAllProductosPorId = async (idCarrito) => {
    try {
        // Buscar el carrito por su ID
        const carrito = await Carts.findOne({ id: idCarrito });
        if (!carrito) {
            console.error(`No se encontró un carrito con id ${idCarrito}.`);
            return;
        }

        // Eliminar todos los productos del array 'products' del carrito
        carrito.products = [];
        await carrito.save();

        console.log(`Todos los productos del carrito con id ${idCarrito} han sido eliminados.`);
    } catch (error) {
        console.error(`Error al eliminar los productos del carrito: ${error.message}`);
    }
};

export const searchUserPorId = async (idUser) => {
    try {
        const user = await Users.findOne({ _id: idUser });
        if (!user) {
            console.error(`No se encontró un usuario con id ${idUser}.`);
            return null;
        }

        // Convertir el usuario a un objeto JavaScript
        const userJS = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            cart: user.cart,
            age: user.age,
            rol: user.rol
        };

        return userJS;
    } catch (error) {
        console.error(`Error al buscar el usuario: ${error.message}`);
        return null;
    }
};

export const userValidation = async (email, password) => {
    try {
        const usuario = await Users.findOne({ email, password });
        if (usuario) {
            return usuario._id;
        }
        return null;
    } catch (error) {
        console.error(`Error al buscar usuario: ${error.message}`);
        return null;
    }
};

export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Si el usuario está autenticado, continuar con la siguiente función de middleware
    }
    res.redirect('/log'); // Si el usuario no está autenticado, redirigir al login
};

export const ensureUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'user') {
        return next(); // Si el usuario está autenticado y es usuario normal, continuar
    } else {
        res.status(403).send('Acceso prohibido'); // Si no está autenticado o no es usuario normal, mostrar error de acceso prohibido
    }
};

export const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next(); // Si el usuario está autenticado y es usuario normal, continuar
    } else {
        res.status(403).send('Acceso prohibido'); // Si no está autenticado o no es usuario normal, mostrar error de acceso prohibido
    }
};

export const crearTiket = async (costo, correo) => {
    try {
        const nuevoTiket = new Tickets({
            code: Math.floor(Math.random() * 1000), // Genera una ID aleatoria
            purchase_datetimer: new Date(), // Asigna la fecha y hora actual
            amount: costo,
            purchase: correo
        });
        await nuevoTiket.save();
        console.log(`Ticket creado correctamente.`);
        return nuevoTiket.code;
    } catch (error) {
        console.error(`Error al crear el Ticket: ${error.message}`);
        return null; // Retorna null en caso de error
    }
};

export const calcularCosto = async (id) => {
    try {
        // Encontrar el carrito con el ID proporcionado
        const carrito = await Carts.findOne({ id: id });

        if (!carrito) {
            console.log(`Carrito con ID ${id} no encontrado.`);
            return null;
        }

        // Si el carrito se encuentra, continuar con el cálculo del costo
        let costoTotal = 0;
        for (const producto of carrito.products) {
            const precioProducto = await buscarProductoPorid(producto.id);
            if (precioProducto !== null) {
                costoTotal += precioProducto * producto.cantidad; // Multiplica el precio por la cantidad y suma al costo total
            }
        }

        console.log(`Costo total del carrito ${id}: ${costoTotal}`);
        return costoTotal;

    } catch (error) {
        console.error(`Error al calcular coste del carrito: ${error.message}`);
        return null;
    }
};

export const buscarCorreoPorNumeroDeCart = async (numeroDeCart) => {
    try {
        // Buscar al usuario con el número de carrito proporcionado
        const usuarioEncontrado = await Users.findOne({ cart: numeroDeCart }).exec();

        if (!usuarioEncontrado) {
            console.log(`Usuario con número de carrito ${numeroDeCart} no encontrado.`);
            return null;
        }

        console.log(`Correo del usuario encontrado: ${usuarioEncontrado.email}`);
        return usuarioEncontrado.email; // Devuelve el correo electrónico del usuario encontrado
    } catch (error) {
        console.error(`Error al buscar el correo del usuario: ${error.message}`);
        return null;
    }
};

export const buscarProductoPorid = async (id) => {
    try {
        const productoEncontrado = await Product.findOne({ id: id }).exec();
        if (productoEncontrado) {
            console.log(`Producto encontrado: ${productoEncontrado}`);
            return productoEncontrado.precio; // Devuelve solo el precio del producto encontrado
        } else {
            console.log(`Producto con id ${id} no encontrado.`);
            return null;
        }
    } catch (error) {
        console.error(`Error al buscar el producto: ${error.message}`);
        return null;
    }
};

export const productosVender = async (id) => {
    try {

    } catch (error) {
        console.error(`Error al calcular coste del carrito: ${error.message}`);
        return null;
    }
};