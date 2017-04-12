'use strict'

const CronJob  = require('cron').CronJob
const firebase = require("firebase")
const ads      = require('../data/data')

const config = {
  apiKey: "AIzaSyB7ktf9-yjDIr5UyjoLRlDSVGf4o-Rw0tQ",
  authDomain: "simple-bf04f.firebaseapp.com",
  databaseURL: "https://simple-bf04f.firebaseio.com",
  projectId: "simple-bf04f",
  storageBucket: "simple-bf04f.appspot.com",
  messagingSenderId: "419783550884"
}

firebase.initializeApp(config)
const database = firebase.database()
let h = 0

function updateAds() {
  let random = Math.floor(Math.random()*ads.length)
  firebase.database().ref('ad').set({
    image_url: ads[random].image_url,
    target_url: ads[random].target_url,
    timestamp: new Date().getTime().toString()
  })
  if (h == random)
    updateAds()
  else {
    h = random
  }
}

new CronJob('*/10 * * * * *', function() {
  updateAds()
  },
  null,
  true,
  'Asia/Jakarta'
)