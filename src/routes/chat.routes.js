const express = require('express');
const chatControlador = require('../controllers/chat.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/AsignarChat',md_autenticacion.Auth, chatControlador.AsignarChat);
api.get('/verChatsCreados', md_autenticacion.Auth, chatControlador.verChatsCreados)
api.put('/nuevoMensaje/:chatId', md_autenticacion.Auth, chatControlador.nuevoMensaje)
api.get('/listarMensajes/:chatId', md_autenticacion.Auth, chatControlador.listarMensajes)

module.exports = api;