const mongoose = require('mongoose');
const usuarioControlador = require('./src/controllers/usuario.controller');
const app = require('./app');
// MongoDb Compas: mongodb+srv://Grupo4:Grupo4@cluster0.tm8stud.mongodb.net/Med&Chat 
// MongoDb url online: mongodb+srv://Grupo4:Grupo4@cluster0.tm8stud.mongodb.net/Med&Chat/?retryWrites=true&w=majority           
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Grupo4:Grupo4@cluster0.tm8stud.mongodb.net/Med&Chat?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, function () {
        console.log("Esta corriendo en el puerto 3000!")
        usuarioControlador.UsuarioDefault();      
    })

}).catch(error => console.log(error));

// url de google https://cloud.mongodb.com/v2/62bc7b267dead06f9a870334#metrics/replicaSet/62bc7b9f65f084320f6ed738/explorer/Med%26Chat/usuarios/find
// Mail: grupo4in5bv@gmail.com
// Contraseña: Grupo1234