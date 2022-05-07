const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

 // use middleware

 // dbuser2 and pass: bieA28OgmwP0XoBA
 app.use(cors());
 app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mablm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('warehouse connected');
  // perform actions on the collection object
  client.close();
});

 app.get('/', (req,res) => {
    res.send('running my CRUD server');
 });

 app.listen(port, () => {
    console.log('CRUD server is running');
 });
