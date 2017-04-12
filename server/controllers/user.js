const User = require('../models/user')
const passwordHash = require('password-hash')
const methods = {}

methods.findAll = function(req, res) {
  User.find({}, (err, records) => {
    if (err) { res.send(err) }
    else {
      res.json(records)
    }
  })
}

methods.findOne = function(req, res) {
  User.findById(req.params.id, (err, record) => {
    if (err) { res.send(err) }
    else {
      res.json(record)
    }
  })
}

methods.insertOne = function(req, res) {
  req.body.password = passwordHash.generate(req.body.password)
  User.create(req.body, (err, record) => {
    if (err) { res.send(err) }
    else {
      res.json(record)
    }
  })
}

methods.updateOne = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((err, record) => {
      if (err) { res.send(err) }
      else {
        res.json(record)
      }
    })
}

methods.deleteOne = function(req, res) {
  User.findByIdAndRemove(req.params.id)
      .exec((err, record) => {
        if (err) { res.send(err) }
        else {
          res.json(record)
        }
      })
}

module.exports = methods