const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/user', userController.add);

router.post('/login', userController.login);

// router.get('/sales/:id', salesController.getById);

// router.post('/sales', salesController.add);

// router.put('/sales/:id', salesController.update);

// router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;