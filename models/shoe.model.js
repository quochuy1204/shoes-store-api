const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, require: true },
    image: { contentType: String, data: Buffer }
});

module.exports = mongoose.model('Shoes', shoesSchema);