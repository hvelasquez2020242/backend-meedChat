const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatsSchema = Schema({
    IdDoc:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    IdPac:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    Mensajes:[
        {
            Emisor: String,
            mensaje: String
        }
    ]
});

module.exports = mongoose.model('Chats', ChatsSchema);