const express = require('express');
const { postsController } = require('../controllers');

const router = express.Router();

// router.get('/categories', categoriesController.getAll);

// router.get('/products/:id', productController.getById);

router.post('/post', postsController.add);

// router.put('/products/:id', productController.update);

// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;