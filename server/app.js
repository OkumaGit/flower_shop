//SERVER SIDE (ROUTES)
require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const auth = require('./auth/middleware/auth.js');
const app = express();
app.use(express.json()); // Must for JSON body read
app.use(express.static('public'));
const path = require('path');
// app.use(express.static(path.join(__dirname, '../app')));
// app.use('/admin', express.static(path.join(__dirname, '../admin')));
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('flowers_store');
    const products = db.collection('flowers');
    // Saving DB in locals.
    app.locals.db = db;
    //
    //Adding AUTH (Routes) to server
    const authRoutes = require('./auth/routes/index.js');
    app.use('/api/auth', authRoutes);
    //

    // GET PRODUCTS FROM DB
    app.get('/api/products', async (req, res) => {
      try {
        const items = await products.find().toArray();
        res.json(items);
      } catch (error) {
        console.log(error);
      }
    });
    //

    // GET orderList FROM DB
    const orders = db.collection('flower_orders');
    app.get('/api/ordersList', async (req, res) => {
      try {
        const ordersList = await orders.find().toArray();
        res.json(ordersList);
        // console.log("fetched Orders from DB done");
      } catch (error) {
        console.log(error);
      }
    });
    //

    // POST Orders API
    app.post('/api/orders', async (req, res) => {
      try {
        const order = req.body;
        const result = await db.collection('flower_orders').insertOne(order);
        res.status(201).json(result);
        console.log('Recieved order: ', req.body);
        // res.json({
        //   message: "Заказ получен!",
        //   receivedData: req.body,
        // });
      } catch (error) {
        console.log(error);
      }
    });
    //

    //DELETE Orders API
    const orderId = '69127c3e7631c7153702855c';
    app.delete(`/api/orders/${orderId}`, auth, async (req, res) => {
      try {
        const toDelete = req.body;
        const result = await db.collection('flower_orders').deleteOne(toDelete);
        res.status(200).json({ message: 'Successfully deleted' }, result);
      } catch (error) {
        console.log(error);
      }
    });
    //
  } catch (error) {
    console.error('Server error:', error.message);
  }
}

// //DEFEND ADMIN FOLDER WITH AUTH
// const auth = require('./auth/middleware/auth');
// app.use('/admin', auth, express.static('admin'));
// //

//APP LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//

start();
