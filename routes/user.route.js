const router = require("express").Router();
const user = require("../controllers/user.contorller");

router.get('/:username/:password',(req, res) =>{ 
    user.getUser(req.params, res);
});

router.post('/addUser',(req, res) =>{
  user.addUser(req.body, res);
});



module.exports = router;