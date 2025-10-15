require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;

async function start() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("flowers_store");
  const products = db.collection("flowers");
  //   const orders = db.collection('flower_orders')

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get("/api/products", async (req, res) => {
    try {
      const items = await products.find().toArray();
      res.json(items);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const order = req.body;
      const result = await db.collection("flower_orders").insertOne(order);
      res.status(201).json(result);
      console.log("Получили заказ:", req.body);
      res.json({
        message: "Заказ получен!",
        receivedData: req.body,
      });
    } catch (error) {
      console.log(error);
    }
  });
}

start();
