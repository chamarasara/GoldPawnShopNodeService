const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Users = require('../models/users');

exports.user_signup = (req, res, next) => {
    Users.find({ user_name: req.body.user_name })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: "Username exists"
                });
            } else {
                const users = new Users({
                    //articleId: new mongoose.Types.ObjectId(),
                    _id: req.body._id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    user_name: req.body.user_name,
                    password: req.body.password,
                    user_role: req.body.user_role
                });
                users.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'New user created !'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                // bcrypt.hash(req.body.password, 10, (err, hash) => {
                //     if (err) {
                //         return res.status(500).json({
                //             error: err
                //         });
                //     } else {
                //         const users = new Users({
                //             //articleId: new mongoose.Types.ObjectId(),
                //             _id: req.body._id,
                //             first_name: req.body.first_name,
                //             last_name: req.body.last_name,
                //             user_name: req.body.user_name,
                //             password: hash,
                //             user_role: req.body.user_role
                //         });
                //         users.save()
                //             .then(result => {
                //                 console.log(result);
                //                 res.status(201).json({
                //                     message: 'New user created !'
                //                 });
                //             })
                //             .catch(err => {
                //                 console.log(err);
                //                 res.status(500).json({
                //                     error: err
                //                 });
                //             });
                //     }
                // })
            }
        });

}
//List all users
exports.list_users = (req, res, next) => {
    Users.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}
exports.user_login = (req, res, next) => {
    console.log(req)
    Users.find({ user_name: req.body.user_name })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: "Auth faild"
                })
            }

            if (req.body.password === users[0].password){
                const token = jwt.sign(
                    {
                        user_name: users[0].user_name,
                        _id: users[0]._id,
                        user_role: users[0].user_role
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "8h",
                    }
                );
                return res.status(200).json({
                    message: "Login Successful",
                    token: token,
                });
            }
            else{
                return res.status(401).json({
                        message: "Login faild"
                    });
            }
            // bcrypt.compare(req.body.password, users[0].password, (err, result) => {
            //     if (err) {
            //         return res.status(401).json({
            //             message: "Login faild"
            //         });
            //     }
            //     if (result) {
            //         const token = jwt.sign(
            //             {
            //                 user_name: users[0].user_name,
            //                 _id: users[0]._id,
            //                 user_role: users[0].user_role
            //             }, process.env.JWT_KEY,
            //             {
            //                 expiresIn: "8h",
            //             }
            //         );
            //         return res.status(200).json({ 
            //             message: "Login Successful",
            //             token: token,
            //         });
            //     }
            //     return res.status(401).json({
            //         message: "Login faild"
            //     });
            // })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
//get single user
exports.get_single_user = (req, res, next) => {
    id = req.params._id;
    Users.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid ID found" })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}
//update user
exports.update_user = (req, res, next) => {

    const id = req.params._id;
    console.log("faf", req.body);
    const updateOps = {};
    for (const ops in req.body) {
        updateOps[ops.propName] = ops.value;
    }
    //console.log("ops",updateOps)
    Users.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            Users.findById(id)
                .then(docs => {
                    console.log("docs****", docs)
                    res.status(200).json(docs);
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}
//delete user
exports.delete_user = (req, res, next) => {
    const id = req.params._id;
    Users.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}