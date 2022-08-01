const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Recordatorios = require('../models/recordatorio.model')

function AgregarRecordatorio(req, res) {
    var rol = req.user.rol
    const usuario = req.params.idUser;
    if (rol == "Doctor") {
        var modeloRecordatorio = new Recordatorios();
        var parametros = req.body

        modeloRecordatorio.medicina = parametros.medicina;
        modeloRecordatorio.cantidad = parametros.cantidad; 
        modeloRecordatorio.descripcion = parametros.descripcion; 
        modeloRecordatorio.checked = 'a';
        modeloRecordatorio.usuario = usuario
        
        modeloRecordatorio.save((err,recordatorioAgregado)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if(!recordatorioAgregado) return res.status(500).send({ mensaje: 'error al guardar el producto'})
            return res.status(200).send({recordatorio: recordatorioAgregado})
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de agregar recordatorios'})
    }   
}
function obtenerRecordatorios(req, res){
    const id = req.user.sub; 
    Recordatorios.find({usuario: id}, (err, recordatoriosEncontrados)=>{
        if(err) return res.status(500).send({mensaje: 'erroe en la peticion'})
        if(!recordatoriosEncontrados) return res.status(404).send({mensaje: 'Hubo un error al buscar  el usuario'})
        return res.status(200).send({recordatorios: recordatoriosEncontrados})
    })
}
module.exports = { 
    AgregarRecordatorio, 
    obtenerRecordatorios
}