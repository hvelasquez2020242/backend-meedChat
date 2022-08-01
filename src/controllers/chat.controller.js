const Chat = require('../models/chat.model');
const Usuario = require('../models/usuario.model');

function AsignarChat(req, res) {
    var token = req.user.rol
    if (token == "Administrador"){
        var parametros = req.body
        var modeloChat = new Chat()


        Usuario.findById(parametros.Doctor,(err,doctorEncontrado)=>{
            if (err) return res.status(500).send({ mensaje: 'error en la peticion'})
            if (!doctorEncontrado) return res.status(500).send({ mensaje: 'error al encontrar doctor'})

            Usuario.findById(parametros.Paciente,(err,pacienteEncontrado)=>{
                if (err) return res.status(500).send({ mensaje: 'error en la peticion'})
                if (!pacienteEncontrado) return res.status(500).send({ mensaje: 'error al encontrar Paciente'})

                if (pacienteEncontrado.rol == 'Paciente' ) {
                    if (doctorEncontrado.rol == 'Doctor') {
                        
                        modeloChat.IdDoc = parametros.Doctor;
                        modeloChat.IdPac  = parametros.Paciente;
                        modeloChat.save((err,chatCreado)=>{
                            if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                            if (!chatCreado) return res.status(500).send({ mensaje: 'error al crear chat'})
                            return res.status(200).send({ ChatCreado: chatCreado })

                            
                        })

                    }else{
                        return res.status(200).send({ mensaje: 'parametro Doctor no es un doctor'})
                    }

                }else{
                    return res.status(200).send({ mensaje: 'parametro Paciente no es un paciente'})
                }
            })
        })        
    }else{
        return res.status(500).send({ mensaje: 'no tienes permisos para asignar un chat'})
    }
}


function verChatsCreados(req, res) {
    var token = req.user.rol
    if (token == "Administrador"){

        Chat.find({}, (err, chatsEncontrados)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la Peticion'});
            if(!chatsEncontrados) return res.status(500).send({ mensaje: 'Error al obtener las encuestas'});
            let numeroChats = chatsEncontrados.length;
            return res.status(200).send({"Chats Creados": numeroChats,"chats Encontrados": chatsEncontrados })
        }).populate('IdPac IdDoc', 'nombre email')
               
    }else{
        return res.status(500).send({ mensaje: 'no tienes permisos para asignar un chat'})
    }

}

function nuevoMensaje(req, res) {
    var chatId = req.params.chatId;
    var token = req.user
    var parametros = req.body

    if(token.rol == "Doctor" ){
            Chat.findOne({IdDoc: req.user.sub},(err, encontrado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!encontrado) {
                return res.status(500).send({ mensaje: 'no perteneces a este chat'})
            }else{
                Chat.findByIdAndUpdate(chatId, { $push: {  Mensajes : { Emisor: req.user.nombre, mensaje: parametros.mensaje } } }, {new : true}, 
                    (err, mensajeAgregado) => {
                        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                        if(!mensajeAgregado) return res.status(500).send({ mensaje: 'Error al agregar el mensaje'});
            
                        return res.status(200).send({ MensajeAgregado: mensajeAgregado.Mensajes });
                    })
            }  
        })
    }else if (token.rol == "Paciente") {
        Chat.findOne({IdPac: req.user.sub},(err, encontrado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!encontrado) {
                return res.status(500).send({ mensaje: 'no perteneces a este chat'})
            }else{
                Chat.findByIdAndUpdate(chatId, { $push: {  Mensajes : { Emisor: req.user.nombre, mensaje: parametros.mensaje } } }, {new : true}, 
                    (err, mensajeAgregado) => {
                        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                        if(!mensajeAgregado) return res.status(500).send({ mensaje: 'Error al agregar el mensaje'});
            
                        return res.status(200).send({ MensajeAgregado: mensajeAgregado.Mensajes });
                    })
            }  
        })
    }
 
}

function listarMensajes(req, res) {
    var chatId = req.params.chatId;
    var token = req.user


    if(token.rol == "Doctor" ){
        Chat.findOne({IdDoc: req.user.sub},(err, encontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!encontrado) {
            return res.status(500).send({ mensaje: 'no perteneces a este chat'})
        }else{
            Chat.findById(chatId,(err, mensajes) => {
                    if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                    if(!mensajes) return res.status(500).send({ mensaje: 'Error al agregar el mensaje'});
        
                    return res.status(200).send({ Mensajes: mensajes.Mensajes });
                })
        }  
    })
}else if (token.rol == "Paciente") {
    Chat.findOne({IdPac: req.user.sub},(err, encontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!encontrado) {
            return res.status(500).send({ mensaje: 'no perteneces a este chat'})
        }else{
            Chat.findById(chatId,(err, mensajes) => {
                    if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                    if(!mensajes) return res.status(500).send({ mensaje: 'Error al agregar el mensaje'});
        
                    return res.status(200).send({ Mensajes: mensajes.Mensajes });
                })
        }  
    })
}

}

module.exports = {
    AsignarChat,
    verChatsCreados,
    nuevoMensaje,
    listarMensajes
}