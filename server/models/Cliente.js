const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ClienteSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    apellidoMaterno: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Cliente', ClienteSchema);