const express = require('express');
const productRoute = express.Router();

const productController = require('../controllers/product.controller');

//Route getAll products
productRoute.get('/getAll', productController.getAll);

//Route tạo mới 1 product
productRoute.post('/createProduct', productController.createProduct);

//Route lấy product bằng ID
productRoute.get('/:id', productController.getById);

//Chỉnh sửa product theo ID
productRoute.put('/update/:id', productController.updateProduct);

//Xóa product theo ID
productRoute.delete('/delete/:id', productController.deleteProduct);

module.exports = productRoute;