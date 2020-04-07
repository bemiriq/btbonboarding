<template>
  <div id="app">
    <a href='/'> <img alt="BTB  Logo" src="./assets/btb.png"> </a>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <br/><br/><br/><br/>

    <b-container>
      <b-row id="dateTimeDiv">

        <b-col lg="5">
          Beat The Bomb Site Operations (BTB Site Ops)
        </b-col>

        <b-col lg="3">
          Location: BROOKLYN
        </b-col>

        <b-col lg="2">
          Date: Current Date
        </b-col>

        <b-col lg="2">
          Time: Current Time
        </b-col>

      </b-row>
    </b-container>


        <br>

    <!-- starting of the search div -->

      <b-container class="bv-example-row">
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <b-row>
          <b-col cols="12" md="8"></b-col>
          <b-col cols="6" md="4">
            
            <input type="text" placeholder="Seach Name"/>

          </b-col>
        </b-row>
      </b-container>
    <!-- end of serch div -->
    <router-view></router-view>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
