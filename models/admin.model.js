var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminShema = new Schema({
    name: String,
    username: { type: String, require: true, index: { unique: true } },
    password: { type: String, required: true, select: false }
});

module.exports = mongoose.model('Admin', adminShema);