const Categoria = require('../models/Categoria');
const mongoose = require('mongoose');

exports.homepage = async(req, res) => {
    const locals = {
        title:'Nodejs',
        description:'jahdhjasd'
    }
    res.render('index',locals);
};


//new category
exports.addcategory = async(req, res) => {
    const locals = {
        title:'Nueva categoría',
        description:'Añadir nueva categoria'
    }
    res.render('categorias/add',locals);
};



exports.postcategory = async(req, res) => {

    console.log(req.body);  
    
    const newCategoria = new Categoria({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    try {
        
        await Categoria.create(newCategoria);
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
    
}
