// ROUTES FOR AUTH
const router = require('express').Router(); // Creating 'router' from express.Router()
const { register, login } = require('../controllers/authControllers.js'); // Import "Controller" from authControllers.js
const auth = require('../middleware/auth'); // Import from ../middleware/auth.js

//ROUTES
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, (req, res) => res.json(req.user));
//

module.exports = router;
