const router = require("express").Router();
const auth = require("../middleware/auth"); // Middleware
const userCtrl = require("../controllers/userCtrl");

router.get("/searchUser", auth, userCtrl.searchUser);
router.get("/getUser/:id", auth, userCtrl.getUser);
router.post("/setUserName", auth, userCtrl.setUserName);

module.exports = router;
