const productModel = require('../models/product.model');

//Lấy hết các product
exports.getAll = function (req, res) {
    productModel.find(function (err, products) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json(products);
        }
    });
};

//Tạo 1 product mới
exports.createProduct = function (req, res) {
    var newproduct = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    newproduct.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.send("Product created successfully.");
        }
    });
};

//Lấy product bằng ID
exports.getById = function (req, res) {
    productModel.findById(req.params.id, function (err, products) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json(products);
        }
    });
};

//Chỉnh sửa thông tin của product
exports.updateProduct = function (req, res) {
    productModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, products) {
        if (err) {
            return res.send(err);
        }
        else {
            res.send("Product updated.");
        }
    });
};

//Xóa product theo ID
exports.deleteProduct = function (req, res) {
    productModel.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            return res.send(err);
        }
        else {
            res.send("Product deleted.");
        }
    });
};