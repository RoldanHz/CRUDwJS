const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

/**
 *  Customer Routes 
*/
router.get('/', proveedorController.homepage);

router.get('/add', proveedorController.addproveedor);
router.post('/add', proveedorController.postproveedor);
//
//router.get('/viewpro/:id', proveedorController.view);
//
//router.get('/edit/:id', categoriaController.edit);
//router.put('/edit/:id', categoriaController.editCate);
//
//router.delete('/edit/:id', categoriaController.deleteCate);
//
//router.post('/searchcate', categoriaController.searchcate);

module.exports = router;