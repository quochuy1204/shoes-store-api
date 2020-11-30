const shoesModel = require('../models/shoe.model');

var fs = require('fs');
var path = require('path');
var multer = require('multer');

//middleware để xử lý file upload
var storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var uploadImage = multer({ storage: storage });

//Lấy hết các Shoes
exports.getAll = function (req, res) {
    shoesModel.find(function (err, shoes) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json(shoes);
        }
    });
};

//Tạo mới 1 shoes
exports.createShoes = uploadImage.single('image'), function (req, res, next) {
    var shoes = new shoesModel({
        name: req.body.name,
        price: req.body.price,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    });

    shoes.save(function (err) {
        if (err) {
            return res.send(err);
        }
        else {
            res.send('Shoes created successfully.')
        }
    });
};
