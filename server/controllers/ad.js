const Ad = require('../models/ad')
const methods = {}

methods.findAll = function(req, res) {
  Ad.find({}, (err, records) => {
    if (err) { res.send(err) }
    else {
      res.json(records)
    }
  })
}

methods.insertOne = function(req, res) {
  Ad.create(req.body, (err, record) => {
    if (err) { res.send(err) }
    else {
      res.json(record)
    }
  })
}

methods.deleteOne = function(req, res) {
  Ad.findByIdAndRemove(req.params.id)
      .exec((err, record) => {
        if (err) { res.send(err) }
        else {
          res.json(record)
        }
      })
}

module.exports = methods