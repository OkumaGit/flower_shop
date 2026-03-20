// CHECKING JWT
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer', '').trim();
  if (!token) return res.status(401).json({ error: 'No token' }); //CHECK IF TOKEN STILL EXISTS
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id: '...'}
    next(); //ACESS TO CONTROLLER
  } catch (error) {
    console.log('❌ Ошибка JWT:', error.message, error.name);
    console.log('❌ JWT_SECRET в env:', !!process.env.JWT_SECRET);
    res.status(401).json({ error: 'Wrong token' });
  }
};
