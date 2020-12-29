const express = require("express");
const Signin = express.Router();
const Auth = require('../contollers/Auth')

Signin.post('/register', Auth.register)
Signin.post('/login', Auth.login)

{/*
Signin.get('/', (req, res) => {
    res.json(Users)
})

Signin.get('/:id', function (req, res) {
    const found = Users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        res.json(Users.filter(user => user.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }

})

Signin.post('/', async (req, res) => {
    const user = Users.find(user => user.name === req.body.name && user.password === req.body.password)
    
    if(user) {
        res.json(Users.filter(user =>  user.name === req.body.name && user.password === req.body.password)) 
    }
    else{
        return res.status(400).json({msg: `User not available`})

    }

})
*/}
module.exports = Signin;