const Categoria = require('../models/Categoria');
const mongoose = require('mongoose');

exports.homepage = async(req, res) => {

    const message = await req.flash("info");

    const locals = {
        title:'Nodejs',
        description:'jahdhjasd'
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try {
    const categorias = await Categoria.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Categoria.countDocuments({});

    res.render("index", {
        locals,
        categorias,
        current: page,
        pages: Math.ceil(count / perPage),
        message,
    });
    } catch (error) {
    console.log(error);
    }
//
//    try {
//        const categorias = await Categoria.find({}).limit(22);
//        res.render('index', { locals, message, categorias } );
//    } catch (error) {
//        console.log(error);
//    }
//    
    
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
        await req.flash("info", "Se ha agregado una nueva categoría");
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
    
}

exports.view = async(req, res) => {
    try {
    const categoria = await Categoria.findOne({ _id: req.params.id });

    const locals = {
        title: "Ver información de Categoria",
        description: "sdfadfdsf",
    };

    res.render("categorias/view", {
        locals,
        categoria,
    });
    } catch (error) {
    console.log(error);
    }
};


exports.edit = async(req, res) => {
    try {
    const categoria = await Categoria.findOne({ _id: req.params.id });

    const locals = {
        title: "Editar información de Categoria",
        description: "sdfadfdsf",
    };

    res.render("categorias/edit", {
        locals,
        categoria,
    });
    } catch (error) {
    console.log(error);
    }
};

exports.editCate = async (req, res) => {
    try {
        await Categoria.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirigiendo");
    } catch (error) {
    console.log(error);
    }
};

exports.deleteCate = async (req, res) => {
    try {
    await Categoria.deleteOne({ _id: req.params.id });
    res.redirect("/");
    } catch (error) {
    console.log(error);
    }
};


exports.searchcate = async (req, res) => {
    const locals = {
    title: "Buscando Categoría",
    description: "Free NodeJs User Management System",
    };

    try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const categorias = await Categoria.find({
        $or: [
        { nombre: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ]
    });

    res.render("searchcate", {
        categorias,
        locals
    });
    } catch (error) {
    console.log(error);
    }
};