const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/Login');

const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if(err) {
            res.json({
                err
            })
        }
        let user = new Login({
            email: req.body.email,
            username: req.body.username,
            password: hashedPass,
            
            
        })
        user.save()
        .then(user => {
            res.json({msg: "user added successfully"})
            console.log(user)
        })
        .catch(error => {
            res.json({msg: "An error occured"})
            console.log(error)
        })
    })
   
}

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password

    Login.findOne({$or: [{email:username}, {username:username}]})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        err
                    })
                }
                if(result) {
                    let token = jwt.sign({name: user.name}, "verySecretValue", {expiresIn:"1h"})
                    res.json({
                        msg: "Login successfully",
                        token: token
                    })
                }
                else{
                    res.json({
                        msg: "Password do not match"
                    })
                }
            })

        }
        else {
            res.json({msg: "No user found"})
        }
    })
}

module.exports = {
    register, login
}