const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, max: 124 },
    price: { type: Number, required: true }
});

//Xuất model ra để dùng trong các file khác 
module.exports = mongoose.model('Product', ProductSchema);