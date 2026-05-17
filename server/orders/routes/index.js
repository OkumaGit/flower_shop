const router = require('express').Router();
const { ReturnDocument } = require('mongodb');
const auth = require('../../auth/middleware/auth');
const { ObjectId } = require('mongodb');

// POST Orders API
router.post('/', async (req, res) => {
  try {
    const order = req.body;
    const db = req.app.locals.db; // locals.db vs const db = client.db('flowers_store'); in app.js
    const result = await db.collection('flower_orders').insertOne(order);
    res.status(201).json(result);
    console.log('Recieved order: ', req.body);
  } catch (error) {
    console.log(error);
  }
});
//

//EDIT ORDER
router.put('/editOrder/:id', async (req, res) => {
  orderId = req.params.id.trim();
  try {
    console.log('Yo');
    const db = req.app.locals.db;
    const result = await db
      .collection('flower_orders')
      .findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        { $set: { first_name: 'Updated first name' } },
        { returnDocument: 'after' }
      ); //LEFT HERE

    res.status(201).json({ message: `Order Id: ${orderId}`, result });
  } catch (error) {
    console.log('Server error:', error.message);
  }
});
//

//     //DELETE many Orders API
//     app.delete(`/api/orders`, auth, async (req, res) => {
//       try {
//         let ids = req.body;
//         console.log('ids: ', ids);
//         let objectIds;
//         if (ids) {
//           objectIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
//         }
//         if (!ids) {
//           return res.status(400).json({ message: 'No multiple ids found' });
//         }
//         console.log('ids1: ', ids);
//         const result = await db.collection('flower_orders').deleteMany({ _id: { $in: objectIds } });
//         res.status(200).json({ message: 'Successfully deleted' }, result);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     //

module.exports = router;
