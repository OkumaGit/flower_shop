const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');

//REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Desconstructing req.body object. Equal to const name = req.body.name etc.
    const db = req.app.locals.db; // send db from app.js

    //Check if unique
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('Email is already used');
      return res.status(400).json({ error: 'Email is already used' });
    }
    //

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ name, email, password: hashed });

    const token = jwt.sign({ id: result.insertedId.toString() }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    console.log('/login works');

    const { email, password } = req.body;
    const db = req.app.locals.db;

    const user = await db.collection('users').findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Wrong credentials' });

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
