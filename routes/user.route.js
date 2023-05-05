const router = require("express").Router();
const user = require("../controllers/user.contorller");

router.post('/signin', user.signin);

router.get('/get/:id', user.getUserById);

router.post('/addUser', user.addUser);

module.exports = router;