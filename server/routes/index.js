const router  = require('express').Router()
// const userCtl = require('../controllers/pg/user')
// const authCtl = require('../controllers/pg/auth')

router.use('/api', require('./api'))

// authCtl.passport.use(authCtl.strategy.general)

router.get('/', function(req, res) {
  res.send('v 1.0')
})

// router.get('/users', authCtl.methods.isAuthorized, userCtl.findAll)
// router.get('/users/:id', userCtl.findOne)
// router.post('/users', userCtl.insertOne)
//
// router.post('/login',
//   authCtl.passport.authenticate('local', { session: false }),
//   authCtl.methods.login
// )
//
// router.post('/logout', authCtl.methods.isAuthorized, authCtl.methods.logout)

module.exports = router