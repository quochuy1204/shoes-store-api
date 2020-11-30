var express = require('express');
var userRoute = express.Router();

var userController = require('../controllers/user.controller');

userRoute.get('/getAll', userController.getAll);

userRoute.post('/createUser', userController.createUser);

userRoute.put('/updateUser/:id', userController.updateUser);

userRoute.delete('/deleteUser/:id', userController.deleteUser);

userRoute.post('/login', userController.login);
module.exports = userRoute;