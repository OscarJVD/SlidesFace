const router = require('express').Router()
const auth = require('../middleware/auth') // Middleware
const userCtrl = require('../controllers/userCtrl')

router.get('/searchUser', auth, userCtrl.searchUser)

module.exports = router