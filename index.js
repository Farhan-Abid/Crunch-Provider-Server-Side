const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

 // use middleware

 // dbuser2 and pass: bieA28OgmwP0XoBA
 app.use(cors());
 app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mablm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const productCollection = client.db("warehouse").collection("products");
        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
          });

          app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productCollection.findOne(query);
            res.send(products);
          });

          app.delete('/user/:id', async(req,res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
          });



          app.put('products/:id',async (req,res)=>{
              const id =req.params.id;
              const updateQuantity=req.body;
              const filter={_id:ObjectId(id)};
              const options={upsert:true};
              const updateDoc={
                  $set:{
                      quantity:updateQuantity.quantity
                  }

              }
              const result=await productCollection.updateOne;
          })

    }
    finally{

    }
}

run().catch(console.dir);

 app.get('/', (req,res) => {
    res.send('running my CRUD server');
 });

 app.listen(port, () => {
    console.log('CRUD server is running');
 });
