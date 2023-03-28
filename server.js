var express = require('express')
app = express()

mongoose = require('mongoose')
main().catch(err => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const cors = require('cors')

port = process.env.PORT || 5001


Contact = require('./models/contactListModel')
mongoose.Promise = global.Promise
async function main() {
    url = "mongodb://127.0.0.1/ContactList"
    await mongoose.connect(url);
  }

const { appendFile } = require('fs')
app.use(cors())

var routes = require('./routes/contactListRoutes')
routes(app)

app.listen(port)
console.log('ContactList started on : ' + port)