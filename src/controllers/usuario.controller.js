const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function UsuarioDefault(req, res) {
    var modeloUsuario = new Usuario();
    Usuario.find({ email: "Administrador@gmail.com", nombre: "Administrador" }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            if (err) console.log({ mensaje: 'error en la peticion ' })
            if (!usuarioEncontrado) console.log({ mensaje: 'error al crear usuario por defecto ' })
            console.log({ mensaje: "ya se ha creado el usuario del Administrador" })
        } else {
            modeloUsuario.nombre = "Administrador";
            modeloUsuario.email = "Administrador@gmail.com";
            modeloUsuario.password = "123456";
            modeloUsuario.rol = "Administrador";
            bcrypt.hash(modeloUsuario.password, null, null, (err, passwordEncryptada) => {
                modeloUsuario.password = passwordEncryptada
                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) console.log({ mensaje: 'error en la peticion ' })
                    if (!usuarioGuardado) console.log({ mensaje: 'error al crear usuario por defecto ' })
                    console.log({ Usuario: usuarioGuardado })

                })
            })
        }
    })

}
function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email }, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (usuarioencontrado) {
            bcrypt.compare(parametros.password, usuarioencontrado.password, (err, Verificaciondepasswor) => {
                if (Verificaciondepasswor) {
                    if (parametros.obtenerToken == 'true') {
                        return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) })
                    } else {
                        usuarioencontrado.password = undefined;
                        return res.status(200).send({ usuario: usuarioencontrado })
                    }
                } else {
                    return res.status(500).send({ mensaje: 'la contraseña no coincide' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'El usuario nose ha podido identificar' })
        }
    })
}

function RegistroNuevoPaciente(req, res){
    var token = req.user
    var parametros = req.body;
    var modeloUsuario = new Usuario()

    if(token.rol == "Administrador"){

        Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'error al encontrar usuario' })
                return res.status(200).send({ mensaje: "ya se ha creado el usuario con este email" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = "Paciente"
                bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
                    modeloUsuario.password = passwordEncryptada
                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al crear usuario Paciente' })
                        return res.status(200).send({ NuevoPaciente: usuarioGuardado })
                    })
                })
            }
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de crear un Paciente'})
    } 
}
function RegistroNuevoAdministrador(req, res){
    var token = req.user
    var parametros = req.body;
    var modeloUsuario = new Usuario()

    if(token.rol == "Administrador"){

        Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'error al encontrar usuario' })
                return res.status(200).send({ mensaje: "ya se ha creado el usuario con este email" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = "Administrador"
                bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
                    modeloUsuario.password = passwordEncryptada
                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al crear usuario Administrador ' })
                        return res.status(200).send({ NuevoPaciente: usuarioGuardado })
                    })
                })
            }
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de crear un Administrador'})
    } 
}
function RegistroNuevoDoctor(req, res){
    var token = req.user
    var parametros = req.body;
    var modeloUsuario = new Usuario()

    if(token.rol == "Administrador"){

        Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'error al encontrar usuario' })
                return res.status(200).send({ mensaje: "ya se ha creado el usuario con este email" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = "Doctor"
                bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
                    modeloUsuario.password = passwordEncryptada
                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al crear usuario Doctor ' })
                        return res.status(200).send({ NuevoPaciente: usuarioGuardado })
                    })
                })
            }
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de crear un Doctor'})
    } 
}

function EditarPerfil(req, res) {
    var parametros = req.body;    
    var id = req.user.sub
    Usuario.findByIdAndUpdate(id, parametros, {new : true},(err, usuarioActualizado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!usuarioActualizado) return res.status(200).send({ mensaje: 'Error al editar el Usuario'});
            return res.status(200).send({usuarioEditado : usuarioActualizado})
        })
    }

function EliminarPerfil(req, res) {
    var id = req.user.sub
     Usuario.findByIdAndDelete(id, {new : true},(err, usuarioActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioActualizado) return res.status(500).send({ mensaje: 'Error al eliminar el Usuario'});
            return res.status(200).send({usuarioEliminado : usuarioActualizado})
    })
}

function VerDoctores(req, res) {
    if (req.user.rol =="Administrador") {
        Usuario.find({rol:"Doctor"},(err,DoctoresEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if(!DoctoresEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar Doctores'});
            return res.status(200).send({Doctores: DoctoresEncontrados});
        })
    }else{ 
        return res.status(500).send({ mensaje: 'no tienes los permisos para ver los doctores'})
    }
}

function VerPacientes(req, res) {
    if (req.user.rol =="Administrador" || req.user.rol =="Doctor") {
        Usuario.find({rol:"Paciente"},(err,PacientesEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if(!PacientesEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar Doctores'});
            return res.status(200).send({Pacientes: PacientesEncontrados});
        })
    }else{ 
        return res.status(500).send({ mensaje: 'no tienes los permisos para ver los pacientes'})
    }
}

function VerUsuarios(req, res) {
    if (req.user.rol =="Administrador") {
        Usuario.find({},(err,PacientesEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if(!PacientesEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar Doctores'});
            return res.status(200).send({Pacientes: PacientesEncontrados});
        })
    }else{ 
        return res.status(500).send({ mensaje: 'no tienes los permisos para ver los usuarios'})
    }
}

function EliminarPaciente(req,res) {
    var idUsuario = req.params.idUsuario
    var token = req.user.rol
    if (token== "Administrador") {

        Usuario.findById(idUsuario, (err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if(!usuarioEncontrado) return res.status(500).send({mensaje: "no existe el paciente"})

            if(usuarioEncontrado.rol =="Paciente"){
                Usuario.findByIdAndDelete(idUsuario,{new:true}, (err,PacienteEncontrado)=>{
                    if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                    if(!PacienteEncontrado) return res.status(500).send({mensaje: "error al eliminar paciente"})
                    return res.status(200).send({PacienteEliminado: PacienteEncontrado})
                })
            }else{
                return res.status(500).send({ mensaje: 'el usuario no es un paciente'})
            }
        })

    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos para eliminar un paciente'})
    }    
}

function EliminarDoctor(req,res) {
    var idUsuario = req.params.idUsuario
    var token = req.user.rol
    if (token== "Administrador") {

        Usuario.findById(idUsuario, (err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if(!usuarioEncontrado) return res.status(500).send({mensaje: "no existe el Doctor"})

            if(usuarioEncontrado.rol =="Doctor"){
                Usuario.findByIdAndDelete(idUsuario,{new:true}, (err,PacienteEncontrado)=>{
                    if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                    if(!PacienteEncontrado) return res.status(500).send({mensaje: "error al eliminar Doctor"})
                    return res.status(200).send({PacienteEliminado: PacienteEncontrado})
                })
            }else{
                return res.status(500).send({ mensaje: 'el usuario no es un Doctor'})
            }
        })

    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos para eliminar un Doctor'})
    }    
}
function obtenerUserId(req, res){
    const idUser = req.params.idUser; 

    Usuario.findOne({_id: idUser}, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
        if(!usuarioEncontrado) return res.status(500).send({mensaje: "error al buscar el usuario"})
        return res.status(200).send({usuario: usuarioEncontrado})
    })
}

module.exports = {
    UsuarioDefault,
    obtenerUserId,
    Login, 
    RegistroNuevoPaciente,
    RegistroNuevoAdministrador,
    RegistroNuevoDoctor,
    EditarPerfil,
    EliminarPerfil,
    VerDoctores,
    VerPacientes,
    VerUsuarios,
    EliminarPaciente,
    EliminarDoctor
}