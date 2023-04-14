'use strict'

module.exports = function(app){
var contactList = require('../controllers/contactListController')

    app.route('/contacts')
        .get(contactList.listAllContacts) //Show all Contacts
        .post(contactList.createAContact) // Insert a new Contact

    app.route('/contacts/:id')
        .get(contactList.readAContact) // Show a particular Contact
        .delete(contactList.deleteAContact) // Delete one Contact
        .post(contactList.updateAContact) // Update one Contact

var user = require('../controllers/userController')

    app.route('/login')
        .post(user.login) // Simple Login

}