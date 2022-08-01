const express = require('express');
const productosControlador = require('../controllers/productos.controller')
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/AgregarProductos',md_autenticacion.Auth, productosControlador.AgregarProductos);
api.put('/EditarProducto/:Id',md_autenticacion.Auth, productosControlador.EditarProducto);
api.delete('/EliminarProducto/:Id',md_autenticacion.Auth, productosControlador.EliminarProducto);
api.get('/VerProductos', productosControlador.VerProductos);
module.exports = api;