const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProveedorSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Proveedor', ProveedorSchema);