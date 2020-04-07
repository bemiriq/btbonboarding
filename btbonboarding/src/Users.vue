<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <p>USERS</p> -->
    <b-container class="bv-example-row">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="#some-link" active>Check-In</b-list-group-item>
            <b-list-group-item href="#">Onsite Groups</b-list-group-item>
            <b-list-group-item href="#">Onboarding</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Waiting</b-list-group-item>
            <b-list-group-item href="#">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Social Tagging</b-list-group-item>
          </b-list-group>

        

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">
          
          <b-container class="bv-example-row mb-3">
            <b-row cols="8" class="rightHeader">
              <b-col md="2">Time</b-col>
              <b-col md="3">Reservation</b-col>
              <b-col md="1">Size</b-col>
              <b-col md="2">Group</b-col>
              <b-col md="1">Arrived</b-col>
              <b-col md="1">Paid</b-col>
              <b-col md="1">Ready</b-col>
              <b-col md="1">Late</b-col>
            </b-row>
          </b-container>
          <hr>
          <b-container class="bv-example-row mb-3">
            <b-row cols="8" class="bottomRightData">
              <b-col md="2"> 12:00 PM </b-col> 
              <b-col md="3">Alexander P</b-col>
              <b-col md="1">5</b-col>
              <b-col md="2">Alexander P</b-col>
              <b-col md="1">5</b-col>
              <b-col md="1">5</b-col>
              <b-col md="1">Tick</b-col>
              <b-col md="1">Yes</b-col>
            </b-row>
          </b-container>

        </b-col>
        <!-- end of right div which all table -->



      </b-row>
    </b-container>
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

.rightHeader{
  text-align: center;
  margin-top: 1.5%;
  font-size: 1.2em;
  font-weight: bold;
}

.leftMenuDiv{
  font-size: 1.0em;
  font-weight: bold;
}

.bottomRightData{
  text-align: center;
  font-size: 1.1em;
}

#dateTimeDiv{
  font-size: 1.1em;
  background-color: #fafafa;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}
</style>
