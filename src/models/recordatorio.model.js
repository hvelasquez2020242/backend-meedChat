const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordatorioSchema = Schema({
    medicina: String,
    cantidad: Number,
    descripcion: String,
    checked: String,
    usuario:  {type : Schema.Types.ObjectId, ref:'Usuarios'}
});

module.exports = mongoose.model('Recordatorios', RecordatorioSchema);