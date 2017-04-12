const mongoose = require('../config')
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  token: [{
    type: String
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

let User = mongoose.model('User', userSchema)
User.disconnect = function() {
  mongoose.disconnect()
}

module.exports = User
