const router = require('express').Router()
const adCtl = require('../../controllers/ad')

router.get('/ads', adCtl.findAll)
router.post('/ads', adCtl.insertOne)

module.exports = router