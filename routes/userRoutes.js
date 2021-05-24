const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/user', userController.getAll);

router.get('/user/:id', userController.getById);

router.post('/user', userController.add);

router.post('/login', userController.login);

module.exports = router;