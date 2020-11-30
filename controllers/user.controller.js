var userModel = require('../models/user.model');

exports.getAll = function (req, res) {
    userModel.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json(users);
        }
    });
};

exports.createUser = function (req, res) {
    var newUser = new userModel({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })

    newUser.save(function (err) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json("User created.")
        }
    });
};

exports.updateUser = function (req, res) {
    userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json('User updated.');
        }
    });
};

exports.deleteUser = function (req, res) {
    userModel.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            return res.send(err);
        }
        else {
            res.json('User deleted.');
        }
    });
};

//Authentication
exports.login = function (req, res) {
    userModel.findOne({
        username: req.body.username
    }).select('name username password').exec(function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false,
                message: 'Login failed. User not found.'
            });
        }
        else if (user) {
            var validPassword = user.comparePassword(err, req.body.password);
            if (err) {
                res.send(err);
            }
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Login failed. Your password is wrong.'
                });
            }
            else {
                res.json({
                    success: true,
                    message: 'Login successfull.'
                });
            }
        }
    });
};
