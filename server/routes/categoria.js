const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');


/**
 *  Customer Routes 
*/
router.get('/', categoriaController.homepage);

router.get('/add', categoriaController.addcategory);
router.post('/add', categoriaController.postcategory);

router.get('/view/:id', categoriaController.view);

router.get('/edit/:id', categoriaController.edit);
router.put('/edit/:id', categoriaController.editCate);

router.delete('/edit/:id', categoriaController.deleteCate);

router.post('/searchcate', categoriaController.searchcate);

module.exports = router;