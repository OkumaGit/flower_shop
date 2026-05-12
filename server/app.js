//SERVER SIDE (ROUTES)
require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const auth = require('./auth/middleware/auth.js');
const app = express();
const path = require('path');
const { ObjectId } = require('mongodb');
app.use(express.json()); // Must for JSON body read
app.use(express.static(path.join(__dirname, '../app')));
app.use('/admin', express.static(path.join(__dirname, '../app/admin')));
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
      } catch (error) {
        console.log(error);
      }
    });
    //

    //ORDERS ROUTES
    const orderRoutes = require('./orders/routes/index.js');
    // POST Orders API
    app.use('/api/orders', orderRoutes);
    //
    //

    //DELETE many Orders API
    app.delete(`/api/orders`, auth, async (req, res) => {
      try {
        let ids = req.body;
        console.log('ids: ', ids);
        let objectIds;
        if (ids) {
          objectIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
        }
        if (!ids) {
          return res.status(400).json({ message: 'No multiple ids found' });
        }
        console.log('ids1: ', ids);
        const result = await db.collection('flower_orders').deleteMany({ _id: { $in: objectIds } });
        res.status(200).json({ message: 'Successfully deleted' }, result);
      } catch (error) {
        console.log(error);
      }
    });
    //

    // //DELETE one Order API
    // app.delete(`/api/orders/:id`, auth, async (req, res) => {
    //   try {
    //     console.log(req.params.id.trim());
    //     const result = await db
    //       .collection('flower_orders')
    //       .deleteOne({ _id: new ObjectId(req.params.id.trim()) });
    //     res.status(200).json({ message: 'Successfully deleted' }, result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    // //
  } catch (error) {
    console.error('Server error:', error.message);
  }
}

// //DEFEND ADMIN FOLDER WITH AUTH - LEFT HERE
// app.use('/admin', auth, express.static('admin'));
// //

//APP LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//

start();
