const Proveedor = require('../models/Proveedor');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
    const message = await req.flash("info");
    const locals = {
        title:'Nodejs',
        description:'jahdhjasd'
    }
    let perPage = 10;
    let page = req.query.page || 1;

    try {
    const proveedores = await Proveedor.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
    const count = await Proveedor.countDocuments({});
    res.render("indexpro", {
        locals,
        proveedores,
        current: page,
        pages: Math.ceil(count / perPage),
        message,
    });
    } catch (error) {
    console.log(error);
    } 
};

exports.addproveedor = async (req, res) => {
    const locals = {
        title: 'Nuevo Proveedor',
        description: 'Añadir nuevo proveedor'
    };
    res.render('proveedores/add', locals);
};

exports.postproveedor = async (req, res) => {
    console.log(req.body);

    const newProveedor = new Proveedor({
        nombre: req.body.nombre,
        razonSocial: req.body.razonSocial,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono
    });

    try {
        await newProveedor.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar el proveedor');
    }
};

exports.deleteProveedor = async (req, res) => {
    const id = req.params.id;
    try {
        await Proveedor.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el proveedor');
    }
};

exports.updateProveedor = async (req, res) => {
    const id = req.params.id;
    const updateData = {
        nombre: req.body.nombre,
        razonSocial: req.body.razonSocial,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono
    };
    try {
        await Proveedor.findByIdAndUpdate(id, updateData);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el proveedor');
    }
};

exports.getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los proveedores');
    }
};

exports.getFirstTenProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find().limit(10);
        res.json(proveedores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los primeros diez proveedores');
    }
};
