var express = require('express')
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb')


// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

const uri = "mongodb+srv://puttimaitviw:E063TajKsVgJ036H@cluster0.ekxhdtj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const database_name = "ContactList"
const collection_name = "Contacts"
var db, collection

async function dbConnect(){
    await client.connect()
    db = client.db(database_name)
    collection = db.collection(collection_name)
    console.log("DB Connected")
}
async function getAllContacts(){
    const result = await collection.find().toArray()
    return result
}
async function getSpecificContact(cid){
    try{
        var query = {_id:new ObjectId(cid)}
        const result = await collection.findOne(query)
        return result
    }
    catch(err){
        return null
    }
    
    
}
async function addNewContact(request){
    const result = await collection.insertOne(request)
    return result
}
async function editContact(request,cid){

    try{    
        const query = {_id:new ObjectId(cid)}
        const new_value = {$set:request}
        const result = await collection.updateOne(query,new_value)
        return result
    }
    catch(err){
        return null
    }

}
async function deleteContact(cid){
    const query = {_id:new ObjectId(cid)}
    const result = await collection.deleteOne(query)
    return result
}

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.json({ status: "look fine" })
})

app.get('/contacts',function(req,res){
    getAllContacts().then((result) => {
        console.log(result)
        res.json(result)
    })
})
app.get('/contacts/:cid',function(req,res){
    getSpecificContact(req.params.cid).then((result)=>{
        console.log(result)
        res.json(result)
    })
})
app.post('/contacts/',function(req,res){
    var request = req.body
    addNewContact(request).then((result)=>{
        request.cid = request._id
        delete request._id
        res.json(request)
    })
})
app.post('/contacts/:cid',function(req,res){
    var request = req.body
    editContact(request,req.params.cid).then((result)=>{
        if(result!=null){
            request.cid = req.params.cid
            res.json(request)
        }
        else
        {
            res.json({message:"No record found"})
        }
        
    })
})
app.delete('/contacts/:cid',function(req,res){
    getSpecificContact(req.params.cid).then((result)=>{
        if(result!=null){
            const json_res_OK = {
                message:"This contact has been deleted",
                firstname:result.firstname
            }
            deleteContact(req.params.cid).then(()=>{
                res.json(json_res_OK)
            })
        }
        else
        {
            const json_res_ERR = {
                message:"No contact found"
            }
            res.json(json_res_ERR)
        }
    })
    
})

dbConnect().catch(console.error)
var server = app.listen(8081, function(){
    const host = "127.0.0.1"
    const port = server.address().port
    console.log("API Server running at http://%s:%s",host,port)
})
server.on('close',function(event){
    console.log('Server is shutdown')
    client.close()
})
process.on('SIGINT',function(){
    console.log('Server is shutdown')
    client.close()
    process.exit()
})