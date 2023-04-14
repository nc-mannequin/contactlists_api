var express = require('express')
app = express()

mongoose = require('mongoose')
main().catch(err => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const cors = require('cors')

port = process.env.PORT || 5001

Contact = require('./models/contactListModel')
User = require('./models/userModel')

mongoose.Promise = global.Promise
async function main() {
    url = "mongodb://puttimaitviw:E063TajKsVgJ036H@ac-97bisij-shard-00-00.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-01.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-02.ekxhdtj.mongodb.net:27017/?ssl=true&replicaSet=atlas-18qz92-shard-0&authSource=admin&retryWrites=true&w=majority"
    const option = {
        dbName: "ContactList"
    }
    //E063TajKsVgJ036H
    //mongodb://puttimaitviw:<password>@ac-97bisij-shard-00-00.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-01.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-02.ekxhdtj.mongodb.net:27017/?ssl=true&replicaSet=atlas-18qz92-shard-0&authSource=admin&retryWrites=true&w=majority
    await mongoose.connect(url, option)
  }

app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true }));

var routes = require('./routes/contactListRoutes')
routes(app)

app.listen(port)
console.log('ContactList started on : ' + port)