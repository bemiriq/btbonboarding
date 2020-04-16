<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <b-container class="bv-example-row">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="http://localhost:8080/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/onsite" active>Onsite Players</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Playing">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">

          <b-col>
            <h2 style="color: #007BFF;">ONSITE PLAYERS</h2>
            <!-- <hr/> -->

            <table class="table table-hover">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Full Name</th>
                  <th scope="col">Booked By</th>
                  <th scope="col">Cellnumber</th>
                  <th scope="col">Waiver Signed At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Sandesh Phuyal</p>
                  </td>
                  <td>
                    <b-form-input type="text" value="Alex P" disabled></b-form-input>
                  </td>
                  <td>817 360 2704</td>
                  <td>02:00 PM</td>
                </tr>

                <tr>
                  <td>
                    <p>Jesse Bull</p>
                  </td>
                  <td>
                    <b-form-input type="text" value="Alex P" disabled></b-form-input>
                  </td>
                  <td>817 817 2704</td>
                  <td>02:02 PM</td>
                </tr>

                <tr>
                  <td>
                    <p>Alex Patterson</p>
                  </td>
                  <td>
                    <b-form-input type="text" value="Alex P" disabled></b-form-input>
                  </td>
                  <td>918 817 2704</td>
                  <td>02:15 PM</td>
                </tr>

                <tr>
                  <td>
                    <p>Chuck Fletcher</p>
                  </td>
                  <td>
                    <b-form-input type="text" value="Sandesh P" disabled></b-form-input>
                  </td>
                  <td>617 567 1290</td>
                  <td>02:30 PM</td>
                </tr>

                <tr>
                  <td>
                    <p>Tiffer Valente</p>
                  </td>
                  <td>
                    <b-form-input type="text" value="Sandesh P" disabled></b-form-input>
                  </td>
                  <td>619 217 3889</td>
                  <td>02:34 PM</td>
                  
                </tr>

              </tbody>
            </table>
          </b-col>

        </b-col>

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
</style>
