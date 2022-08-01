const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    precio: Number
});

module.exports = mongoose.model('Productos', ProductoSchema);