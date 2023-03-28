'use strict'

var mongoose = require('mongoose')
Contact = mongoose.model( 'Contacts', null, 'Contacts')

exports.listAllContacts = async function(req,res){
    const result = await Contact.find({}).sort( {cid: 1} )
    res.json(result)
}

exports.createAContact = async function(req,res){
    var newContact = new Contact(req.body)
    console.log(req.body)
    const result = await newContact.save()
    res.json(result)
}

exports.readAContact = async function(req,res){
    console.log(req.params.id)
    const result = await Contact.findById(req.params.id)
    res.json(result)
}

exports.deleteAContact = async function(req,res){
    console.log(req.params.id)
    const result = await Contact.findByIdAndRemove(req.params.id)
    console.log(result)
    const response = {
        message: "This contact has been deleted",
        firstname: result.firstname
    }
    res.json(response)
}

exports.updateAContact = async function(req,res){
    console.log(req.params.id)
    var newContact = {}
    newContact = req.body
    const result = await Contact.findByIdAndUpdate(req.params.id, newContact, {new: true})
    res.json(result)
}