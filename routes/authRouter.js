const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)
router.post('/refreshTkn', authCtrl.genAccessTkn)

module.exports = router