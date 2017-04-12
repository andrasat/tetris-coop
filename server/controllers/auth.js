const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const User = require('../models/user').User
require('dotenv').config()

const strategy = {

  general: new passportStrategy(
    function(username, password, cb) {

      // User.findOne({ where: { username: username }})
      //   .then(record => {
      //     if (!record) cb('You are not registered')
      //     if (passwordHash.verify(password, record.password)) {
      //       cb(null, record)
      //     } else {
      //       cb('Password is not correct')
      //     }
      //   })
      //   .catch(err => cb(err))

    }
  )

}

const methods = {}

methods.login = function(req, res) {

  // let user = req.user
  // let data = Object.assign({}, user.toJSON())
  // delete data.password
  // delete data.token
  //
  // let token = jwt.sign(data, process.env.JWT_SECRET)
  // user.token.push(token)
  //
  // user.update({ token: user.token })
  //   .then(() => {
  //     res.send(token)
  //   })
  //   .catch(err => res.send(err))

} // login

methods.logout = function(req, res) {

  // let token = req.headers.app_token
  // jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //
  //     User.findOne({ where: { id: decoded.id }})
  //       .then(user => {
  //         let userToken = user.token.filter(val => val !== token)
  //         user.update({ token: userToken })
  //           .then(() => {
  //             req.logout()
  //             res.send('You are logout')
  //           })
  //           .catch(err => res.send(err))
  //       })
  //       .catch(err => res.send(err))
  //
  //   }
  // })

} // logout

methods.isAuthorized = function(req, res, next) {

  // if (req.headers.hasOwnProperty('app_token')) {
  //   let token = req.headers.app_token
  //   jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
  //     if (err) {
  //       res.send(err)
  //     } else {
  //
  //       User.findOne({ where: { id: decoded.id }})
  //         .then(user => {
  //           if (user.token.includes(token)) {
  //             next() // role not assigned yet
  //           } else {
  //             res.send('You are not authorized to access')
  //           }
  //         })
  //         .catch(err => res.send(err))
  //
  //     }
  //   })
  // } else {
  //   res.send('You are not authorized to access')
  // }

} // isAuthorized

module.exports = {
  methods: methods,
  passport: passport,
  strategy: strategy
}