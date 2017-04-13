<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>


<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div.brick {
  width: 15px;
  height: 15px;
  margin-right: 1px;
  margin-bottom: 1px;
  border: 1px solid #ccc;
}
.brick {
  background: white;
  float: left;
}
.brick.on {
    background: black;
}
.brick.now {
    background: green;
}
div.line {
  clear: both;
}

.container {
  margin-left: 0 auto;


  width: 400px;
}

#stack {
  margin-left: 100px;
}

#logo {
  max-width: 200px;
  margin-bottom: 20px;
  margin-top: -55px;
}
</style>
