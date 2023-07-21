const router = require("express").Router();
const user = require("../controllers/user.contorller");

router.patch('/auth', user.signin);
router.get('/get/:id', user.getUserById);
router.patch('/signup', user.addUser);
router.patch('/editUser', user.editUser);
router.get('/getAllUsers', user.getAllUsers);
router.patch('/changePassword', user.changePassword);

module.exports = router;