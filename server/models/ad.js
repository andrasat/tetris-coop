const mongoose = require('../config')
const Schema = mongoose.Schema

let adSchema = new Schema({
  image_url: {
    type: String,
    required: true
  },
  target_url: {
    type: String,
    required: true
  }
})

let Ad = mongoose.model('Ad', adSchema)
Ad.disconnect = function() {
  mongoose.disconnect()
}

module.exports = Ad
