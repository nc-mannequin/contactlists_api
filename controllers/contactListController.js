'use strict'
var mongoose = require('mongoose')
const admin = require('firebase-admin');
Contact = mongoose.model( 'Contacts',null,'Contacts')

exports.listAllContacts = async function(req,res){
    const result = await Contact.find({}).sort( {cid: 1} )
    res.json(result)
}

exports.createAContact = async function(req,res){
    var newContact = new Contact(req.body)
    const result = await newContact.save()
    res.json(result)
}

exports.readAContact = async function(req,res){
    const result = await Contact.findById(req.params.id)
    res.json(result)
}

exports.deleteAContact = async function(req,res){
    const result = await Contact.findByIdAndRemove(req.params.id)
    const response = {
        message: "This contact has been deleted",
        firstname: result.firstname
    }
    res.json(response)
}

exports.updateAContact = async function(req,res){
    var newContact = {}
    newContact = req.body
    const result = await Contact.findByIdAndUpdate(req.params.id, newContact, {new: true})
    res.json(result)
}

exports.sessionLogin = async function(req,res){
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();

    if (csrfToken !== req.cookies.csrftoken) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return;
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin.auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      async (sessionCookie) => {
        // Set cookie policy for session cookie.
        // console.log("Output =>", sessionCookie)
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, domain: 'localhost', path: '/' };
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.cookie('session', sessionCookie, options);
        res.json({ status: 'success' });
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
}