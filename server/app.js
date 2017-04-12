// NOTE: init
const express    = require('express')
const app        = express()
const passport   = require('passport')

// NOTE: engine

// NOTE: set
app.set('port', process.env.PORT || 3000)

// NOTE: locals

// NOTE: use
app.use(require('morgan')('dev'))
app.use(express.static(__dirname + '/public'))
app.use(require('body-parser').json())
app.use(passport.initialize())
app.use('/', require('./routes'))

// NOTE: run
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
require('./backgroundJob')