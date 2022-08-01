const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuario.routes');
const ProductosRutas = require('./src/routes/productos.routes');
const ChatRutas = require('./src/routes/chat.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas,ProductosRutas,ChatRutas);


module.exports = app;