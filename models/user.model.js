var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false }
});

//middleware dùng để mã hóa mật khẩu và so sánh mật khẩu 
userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }
    else {
        bcrypt.hash(user.password, null, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            else {
                user.password = hash;
                next();
            }
        })
    };
});

userSchema.methods.comparePassword = function (err, password) {
    var user = this;
    if (err) {
        throw err;
    }
    else {
        return bcrypt.compareSync(password, user.password);
    }
};

module.exports = mongoose.model('Users', userSchema);