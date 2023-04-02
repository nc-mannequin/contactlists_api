const cookieParser = require('cookie-parser');
const firebase = require('firebase/app');
require('firebase/auth');

var express = require('express')
app = express()

mongoose = require('mongoose')
main().catch(err => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cookieParser());

const cors = require('cors')

port = process.env.PORT || 5001


Contact = require('./models/contactListModel')
mongoose.Promise = global.Promise
async function main() {
    url = "mongodb://puttimaitviw:E063TajKsVgJ036H@ac-97bisij-shard-00-00.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-01.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-02.ekxhdtj.mongodb.net:27017/?ssl=true&replicaSet=atlas-18qz92-shard-0&authSource=admin&retryWrites=true&w=majority"
    const option = {
        dbName: "ContactList"
    }
    //E063TajKsVgJ036H
    //mongodb://puttimaitviw:<password>@ac-97bisij-shard-00-00.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-01.ekxhdtj.mongodb.net:27017,ac-97bisij-shard-00-02.ekxhdtj.mongodb.net:27017/?ssl=true&replicaSet=atlas-18qz92-shard-0&authSource=admin&retryWrites=true&w=majority
    await mongoose.connect(url, option)
    console.log("DB Connect")
  }

app.use(cors({origin:'http://127.0.0.1:5173', credentials:true}))

var routes = require('./routes/contactListRoutes')
routes(app)

app.listen(port)
console.log('ContactList started on : ' + port)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwsZJteg_1rEIipMla4M-1OJ1xukIMOSU",
  authDomain: "contactlists-3133d.firebaseapp.com",
  projectId: "contactlists-3133d",
  storageBucket: "contactlists-3133d.appspot.com",
  messagingSenderId: "1005535165804",
  appId: "1:1005535165804:web:2862427824ef46c48f8749"
};
firebase.initializeApp(firebaseConfig);