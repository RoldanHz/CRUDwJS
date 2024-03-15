const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

/**
 *  Customer Routes 
*/
router.get('/', categoriaController.homepage);

router.get('/add', categoriaController.addcategory);
router.post('/add', categoriaController.postcategory);

module.exports = router;