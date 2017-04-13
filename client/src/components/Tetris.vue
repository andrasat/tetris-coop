<template>
  <div class="hello">
    <center><img src="../assets/tetris_logo.jpg" id="logo"></center>
    <div class="container">
    <input type="text" v-model="user">

    <button type="button" id="start" class="btn btn-primary">START</button>
    <button type="button" id="pause" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">PAUSE</button>
    <!-- <button type="button" id="pause">PAUSE</button> -->
    <div class="score"><h3>score: <span id="result">0</span></h3></div>

      <div id='stack'></div>
      <audio controls>
        <source src="http://66.90.93.122/ost/tetris-gameboy-rip-/eeeughvtth/tetris-gameboy-02.mp3" type="audio/mpeg">
      </audio>
    </div>

    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <a :href="target_url" target="_blank"><img :src="image_url" alt=""></a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      image_url: '',
      target_url: '',
      msg: 'Welcome to Your Vue.js App',
      user: 1,
      now: [6,0],
      pos: [4,0],
      fn: {},
      toV: -1,
      pieces:
        "1111:01|01|01|01*"+ // i
        "011|110:010|011|001*"+ // s
        "110|011:001|011|010*"+ // z
        "111|010:01|11|01:010|111:10|11|10*"+ // t
        "11|11*"+ // o
        "010|010|011:111|100:11|01|01:001|111*"+ // l
        "01|01|11:100|111:11|10|10:111|001" // j
    }
  },
  methods: {
    drawPlayField: function(){
      for (let row=0; row<20; row++) {
        $('#stack').append(`<div data-y="${row}" class="line"></div>`)
        for (let col=0; col<10; col++) {
          $("#stack").find(`[data-y='${row}']`).append(`<div data-x="${col}" class="brick"></div>`)
        }
      }
    },

    getBrickDom: function(x, y) {
      return document.querySelector(`[data-y="${y}"] [data-x="${x}"]`)
    },

    draw: function(offset, clazz, e) {
      let self = this
      let piece = self.pieces.split('*')[self.now[0]]
        .split(':')[self.now[1]]
        .split('|')
        .map(function(a) {
          return a.split('')
        })

      for (let y=0; y<piece.length; y++)
        for (let x=0; x<piece[y].length; x++)
          if (piece[y][x] == '1') {
            if(x+self.pos[0]+offset[0]>9 ||
              x+self.pos[0]+offset[0]<0 ||
              y+self.pos[1]+offset[1]>19 ||
              self.getBrickDom(
                x+self.pos[0]+offset[0],
                y+self.pos[1]+offset[1]).classList.contains('on')) {
                  return false
                }
            self.getBrickDom(
                  x+self.pos[0]+offset[0],
                  y+self.pos[1]+offset[1])
                  .classList.add(clazz !== undefined ? clazz:'now')
          }
      self.pos = [self.pos[0]+offset[0], self.pos[1]+offset[1]]

      // firebase
      if (self.user == 1) {
        firebase.database().ref('tetris/2').set({
          now: self.now,
          pos: self.pos,
          pause: false,
          timestamp: new Date().getTime().toString()
        })
      }

      if (self.user == 2 && e !== 0) {
        firebase.database().ref('tetris/1').set({
          e,
          pause: false,
          timestamp: new Date().getTime().toString()
        })
      }

    },

    reset: function() {
      let self = this
      if (document.querySelectorAll('.now').length>0)
        self.reset(document.querySelector('.now').classList.remove('now'))
    },

    check: function(){
      let self = this
      for (let i=0; i<20; i++)
        if (document.querySelectorAll(`[data-y="${i}"] .brick.on`).length == 10)
          return self.check(self.roll(i), document.querySelector('#result').innerHTML=Math.floor(document.querySelector('#result').innerHTML)+100)
    },

    roll: function(line) {
      let self = this
      if (false !== (document.querySelector(`[data-y="${line}"]`).innerHTML = document.querySelector(`[data-y="${line-1}"]`).innerHTML) && line>1)
        self.roll(line-1)
    },

    down: function() {
      let self = this
      if (false === self.draw([0,1], undefined, 0, self.reset())) {
        if (self.draw([0,0], 'on', 0, self.reset()) || true) self.check()
        if (false === self.draw([0,0], undefined, 0,
                        self.now = [Math.floor(Math.random()*self.pieces.split('*').length),0],
                        self.pos = [4,0])) {
          self.toV = -1
          // alert('Your score: '+document.querySelector('#result').innerHTML);
        }
      }
    },

    start: function() {
      let self = this
      self.down()
      // tetris.event({ keyCode: 40 })
      setTimeout(function() {
        if(self.toV>=0)
          self.start()
      }, self.toV = self.toV>0 ? self.toV-0.5 : self.toV)
    }


  },
  mounted: function() {
    let self = this
    this.drawPlayField()


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB7ktf9-yjDIr5UyjoLRlDSVGf4o-Rw0tQ",
      authDomain: "simple-bf04f.firebaseapp.com",
      databaseURL: "https://simple-bf04f.firebaseio.com",
      projectId: "simple-bf04f",
      storageBucket: "simple-bf04f.appspot.com",
      messagingSenderId: "419783550884"
    }
    firebase.initializeApp(config)

    // preparation
    firebase.database().ref('tetris/2').set({
      now: [6,0],
      pos: [4,0],
      pause: false,
      timestamp: new Date().getTime().toString()
    })

    // listener
    var baseRef = firebase.database().ref('tetris/2')
    baseRef.on('value', function(snapshot) {
      if (self.user == 2) {
        if (!snapshot.val().pause) {
          self.now = snapshot.val().now
          self.pos = snapshot.val().pos
          // now = snapshot.val().now
          // pos = snapshot.val().pos
          self.down()
        }
      }
    })

    var baseRef = firebase.database().ref('tetris/1')
    baseRef.on('value', function(snapshot) {
      if (self.user == 1) {
        if (!snapshot.val().pause) {
          self.fn.event({ keyCode: snapshot.val().e })
        } else {
          self.toV = -1
        }
      }
    })

    // NOTE: iklan
    var starCountRef = firebase.database().ref('ad')
    starCountRef.on('value', function(snapshot) {
      self.image_url = snapshot.val().image_url
      self.target_url = snapshot.val().target_url
    })

    window.addEventListener('keydown', self.fn.event = function(e) {
      if (e.keyCode == 37) {
        if (false===self.draw([-1,0], undefined, 37, self.reset()))
        self.draw([0,0], undefined, 37, self.reset())
      } // left

      if (e.keyCode == 38) {
        let prv = 0
        if (false !== (self.now[1]=((prv=self.now[1])+1)%self.pieces.split('*')[self.now[0]].split(':').length)
        &&
        false===self.draw([0,0], undefined, 38, self.reset()))
        self.draw([0,0], undefined, 38, self.reset(), self.now=[self.now[0],prv])
      } // up

      if (e.keyCode == 39) {
        if (false===self.draw([1,0], undefined, 39, self.reset()))
        self.draw([0,0], undefined, 39, self.reset())
      } // right

      if (e.keyCode == 40) {
        if (false === self.draw([0,1], undefined, 40, self.reset())) {
          if (self.draw([0,0], 'on', 40, self.reset()) || true) self.check()
          if (false === self.draw([0,0], undefined, 40,
                          self.now = [Math.floor(Math.random()*self.pieces.split('*').length),0],
                          self.pos = [4,0])) {
            self.toV = -1
            // alert('Your score: '+document.querySelector('#result').innerHTML);
          }
        }
      } // down

    })


    $('#start').on('click', function(e) {
      if (self.user == 1) {
        self.start(self.toV = 1000)
      } else {
        self.draw([0,0], undefined, 0, self.reset())
        self.toV = -1
      }
    })

    $('#pause').on('click', function(e) {
      if (self.user == 1) {
        if (self.toV>0) {
          self.toV = -1
          firebase.database().ref('tetris/2').set({
            now: self.now,
            pos: self.pos,
            pause: true,
            timestamp: new Date().getTime().toString()
          })
        } else {
          self.start(self.toV = 1000)
          firebase.database().ref('tetris/2').set({
            now: self.now,
            pos: self.pos,
            pause: false,
            timestamp: new Date().getTime().toString()
          })
        }
      }

    })



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
