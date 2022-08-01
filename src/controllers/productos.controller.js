const Usuario = require('../models/usuario.model');
const Producto = require('../models/productos.model');

function AgregarProductos(req, res) {
    var token = req.user.rol
    if (token == "Administrador") {
        var modeloProductos = new Producto();
        var parametros = req.body

        modeloProductos.nombre = parametros.nombre;
        modeloProductos.descripcion = parametros.descripcion;
        modeloProductos.precio = parametros.precio;
        modeloProductos.cantidad = parametros.cantidad;
        modeloProductos.save((err,productoGuardado)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if(!productoGuardado) return res.status(500).send({ mensaje: 'error al guardar el producto'})
            return res.status(200).send({ProductosAgregado:productoGuardado})
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de agregar productos'})
    }   
}

function EditarProducto(req, res) {
    var IdProd = req.params.Id
    var token = req.user.rol
    if (token == "Administrador") {

        var parametros = req.body
        Producto.findByIdAndUpdate(IdProd,parametros,{new : true},(err,productoEditado)=>{
            if (err) return res.status(500).send({ mensaje: 'el producto no existe'})
            if (!productoEditado) return res.status(500).send({ mensaje: 'error al editar producto'})
            return res.status(200).send({ ProductoEditado: productoEditado})
        })

    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de editar productos'})
    } 
}

function EliminarProducto(req, res) {
    var IdProd = req.params.Id
    var token = req.user.rol
    if (token == "Administrador") {
        
        Producto.findByIdAndDelete(IdProd,{new : true},(err,productoElimindado)=>{
            if (err) return res.status(500).send({ mensaje: 'el producto no existe'})
            if (!productoElimindado) return res.status(500).send({ mensaje: 'error al eliminar producto'})
            return res.status(200).send({ ProductoElimindado: productoElimindado})
        })

    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de eliminar productos'})
    } 
}

function VerProductos(req, res) {

        Producto.find({},(err,productos)=>{
            if (err) return res.status(500).send({ mensaje: 'error en la peticion'})
            if (!productos) return res.status(500).send({ mensaje: 'error al ver productos'})
            return res.status(200).send({ Productos: productos})
        })
}

module.exports = {
    AgregarProductos,
    EditarProducto,
    EliminarProducto,
    VerProductos
}