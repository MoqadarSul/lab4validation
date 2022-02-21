const express = require('express');
const app = express();
const userModel = require('../model/User')

app.get('/', async (req, res) => {
    console.log("hello")
    res.send("Welcome to ")
})

app.post('/users', async (req, res) =>{
    //trying to test user
    const userList = req.body;
    userModel.insertMany(userList).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
})

module.exports = app