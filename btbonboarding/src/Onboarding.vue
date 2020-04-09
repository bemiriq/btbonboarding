<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="bv-example-row" id="mainContainer">

      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="http://localhost:8080/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/">Onsite Groups</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Onboarding" active>Onboarding</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Waiting</b-list-group-item>
            <b-list-group-item href="#">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of center div which consists of table with all details -->
        <b-col lg="7"  style="background-color:#fafafa;">

          <div class="bv-example-row">

            <b-row>

              <b-col>
                <b>SIDE A</b>

                <b-col>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 1"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 2"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 3"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 4"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 5"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 6"></b-form-input>
                      </b-col>
                    </b-row>

                </b-col>

              </b-col>

              <b-col>
                <b>SIDE B</b>

                <b-col>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 1"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 2"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 3"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 4"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 5"></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="12">
                        <b-form-input id="input-small" size="sm" placeholder="PLAYER 6"></b-form-input>
                      </b-col>
                    </b-row>

                </b-col>

              </b-col>

            </b-row>

          </div>

          <!-- this container display all the events -->
          <div class="bv-example-row">


          </div>
          <!-- end of container display all the records -->

        </b-col>
        <!-- end of center div -->

        <!-- start of right div -->
        <b-col lg="3"  style="background-color:#f0f0f0;">
          <b>RESERVATIONS</b>

          <b-row>

            <b-col>
              <br/>
              <b>7:00 PM</b>
              <b-list-group>
                <b-list-group-item>Sandesh</b-list-group-item>
                <b-list-group-item>Jesse</b-list-group-item>
                <b-list-group-item>Chuck</b-list-group-item>
                <b-list-group-item>Tiffer</b-list-group-item>
                <b-list-group-item>Jesse B</b-list-group-item>
              </b-list-group>
            </b-col>

          </b-row>


        </b-col>
        <!-- end of right div -->


      </b-row>
    </div>

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
  /*margin-top: 60px;*/
  /*background-color: red;*/
}

#mainContainer{
  /*background-color: green;*/
  width: 80%;
  margin:auto;
}
</style>
