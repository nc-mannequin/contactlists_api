'use strict'
const { verifyToken } = require('../routes/auth.js')
module.exports = function(app){
var contactList = require('../controllers/contactListController')

    app.route('/contacts')
        .get(verifyToken,contactList.listAllContacts) //Show all Contacts
        .post(contactList.createAContact) // Insert a new Contact

    app.route('/contacts/:id')
        .get(contactList.readAContact) // Show a particular Contact
        .delete(contactList.deleteAContact) // Delete one Contact
        .post(contactList.updateAContact) // Update one Contact

    app.route('/sessionLogin')
        .post(contactList.sessionLogin)
}