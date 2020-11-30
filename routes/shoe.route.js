const express = require('express');
const shoesRoute = express.Router();

var shoesController = require('../controllers/shoe.controller');

//Route lấy hết tất cả Shoes
shoesRoute.get('/getAll', shoesController.getAll);

//Route tạo mới 1 shoes
shoesRoute.post('/createShoes', shoesController.createShoes);

module.exports = shoesRoute;