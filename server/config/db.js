//Conexión a la base de datos

//Se utiliza la librería mongosee para conectarse
const mongoose = require('mongoose');

//Iniciamos la función "connectDB" para realizar la conexión
const connectDB = async()=> {
    try {
    mongoose.set('strictQuery', false);
    //Se establece la conexión utilizando la URI de .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    //Se muestra un mensja en consola indicando la conexión
    console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
    console.log(error);
    }
}
//se exporta la función de la conexión para utilizarla en otros lados
module.exports = connectDB;