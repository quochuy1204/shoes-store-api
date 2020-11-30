var express = require('express');
var app = express();
var mongoose = require("mongoose");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var DBConnectionString = "mongodb+srv://quochuy1204:Cuhuy1204@shoestore.qxbs4.mongodb.net/shoesstore?retryWrites=true&w=majority";
// require('dotenv/config');

var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';


//Khai báo route cho products
var productRoute = require('./routes/product.route');

var shoesRoute = require('./routes/shoe.route');

var userRoute = require('./routes/user.route');
//Cấu hình cho ứng dụng
//Dùng body-parse để giúp chúng ta lấy thông tin từ 1 cái POST request
//Dùng body-parser để phân tích dữ liệu trong body được gửi kèm theo request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as templating engine  
app.set("view engine", "ejs");

//Cấu hình để kết nối với MongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(DBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the Database.");
    })
    .catch(err => {
        console.log("Could not connect to the Database. Exiting now ....", err);
        process.exit();
    });

//Cấu hình cho ứng dụng để xử lý CORS - 1 dạng MiddleWare
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Sử dụng morgan để báo mọi truy cập và yêu cầu về console
app.use(morgan('dev'));

//khai báo productRoute 
app.use('/product', productRoute);

//khai báo shoeRoute
app.use('/shoes', shoesRoute);

app.use('/user', userRoute);

//Khởi động server
app.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});
