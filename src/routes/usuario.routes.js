const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const recordatorioController = require('../controllers/recordatorios.controller')

const api = express.Router();

api.post('/login', usuarioControlador.Login); // login de pacientes, doctores y admins
api.post('/RegistrarPaciente',md_autenticacion.Auth, usuarioControlador.RegistroNuevoPaciente)
api.post('/RegistrarAdministrador',md_autenticacion.Auth, usuarioControlador.RegistroNuevoAdministrador)
api.post('/RegistrarDoctor',md_autenticacion.Auth, usuarioControlador.RegistroNuevoDoctor)
api.put('/EditarPerfil',md_autenticacion.Auth, usuarioControlador.EditarPerfil)
api.delete('/EliminarPerfil',md_autenticacion.Auth, usuarioControlador.EliminarPerfil)
api.get('/VerDoctores',md_autenticacion.Auth, usuarioControlador.VerDoctores)
api.get('/VerPacientes',md_autenticacion.Auth, usuarioControlador.VerPacientes)
api.get('/VerUsuarios',md_autenticacion.Auth, usuarioControlador.VerUsuarios)
api.put('/EliminarPaciente/:idUsuario',md_autenticacion.Auth, usuarioControlador.EliminarPaciente)
api.put('/EliminarDoctor/:idUsuario',md_autenticacion.Auth, usuarioControlador.EliminarDoctor)
api.get('/obtenerRecordatorios', md_autenticacion.Auth, recordatorioController.obtenerRecordatorios)
api.post('/agregarRecordatorio/:idUser', md_autenticacion.Auth, recordatorioController.AgregarRecordatorio)
api.get('/buscarUserId/:idUser', usuarioControlador.obtenerUserId)
module.exports = api;