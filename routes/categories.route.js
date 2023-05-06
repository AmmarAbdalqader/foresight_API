const router = require("express").Router();
const categories = require("../controllers/categories.controller");

router.get('/getCategories/:id', categories.getCategories);
router.get('/getCategoriesSub/:categoryID', categories.getCategoriesSub);

module.exports = router;