'use strict'
var mongoose = require('mongoose')
User = mongoose.model( 'Users',null,'Users')

exports.login = async function(req,res){
    const query = {
        username:req.body.username,
        password:req.body.password
    }
    const result = await User.find(query)
    const access_status = result.length > 0 ? 'ACCEPT' : 'DENY'
    res.json({ status: access_status })
}