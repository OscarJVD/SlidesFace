const router = require("express").Router();
const auth = require("../middleware/auth"); // Middleware
const crudCtrl = require("../controllers/crudCtrl");

router.post("/createField", auth, crudCtrl.createField);

module.exports = router;
