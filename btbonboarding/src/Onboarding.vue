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
        <b-col lg="7" style="background-color:#fafafa;">

          <div class="bv-example-row">

            <b-row>

              <b-col>
                <p class="btbSideTitle"><b>SIDE A</b></p>

                <b-col  class="border border-info">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list2"
                      class="list-group"
                      draggable=".item"
                      group="a"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list2"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                      <div
                        slot="footer"
                        class="btn-group list-group-item"
                        role="group"
                        aria-label="Basic example"
                      >

                      </div>
                         <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                    <br/>

                    <b-row>
                      <b-col sm="3">
                        <b-button variant="primary">Update</b-button>
                      </b-col>
                      <b-col sm="3">
                        <b-button variant="info">RFID</b-button>
                      </b-col>
                    </b-row>
                    <br/>

                </b-col>

              </b-col>

              <b-col>
                <p class="btbSideTitle"><b>SIDE B</b></p>

                <!-- <br/> -->

                <b-col  class="border border-info">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list"
                      class="list-group"
                      draggable=".item"
                      group="a"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                      <div
                        slot="footer"
                        class="btn-group list-group-item"
                        role="group"
                        aria-label="Basic example"
                      >

                      </div>
                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                    <br/>

                    <b-row>
                      <b-col sm="3">
                        <b-button variant="primary">Update</b-button>
                      </b-col>
                      <b-col sm="3">
                        <b-button variant="info">RFID</b-button>
                      </b-col>
                    </b-row>
                    <br/>

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

              <draggable :list="dataList3" class="list-group" draggable=".item" group="a">
                <div
                  class="list-group-item item"
                  v-for="element in dataList3"
                  :key="element.name"
                >
                  {{ element.name }}
                </div>

                <div
                  slot="footer"
                  class="btn-group list-group-item"
                  role="group"
                  aria-label="Basic example"
                >
                  <!-- <button class="btn btn-secondary" @click="add2">Add</button> -->
                  <!-- <button class="btn btn-secondary" @click="replace2">Replace</button> -->
                </div>
              </draggable>

            </b-col>

          </b-row>


        </b-col>
        <!-- end of right div -->


      </b-row>
    </div>

    <!-- <rawDisplayer class="col-2" :value="list" title="List" /> -->

    <!-- <rawDisplayer class="col-2" :value="dataList3" title="dataList3" /> -->

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import draggable from "vuedraggable";
let id = 1;

export default {
  name: 'App',
  components: {
    // HelloWorld
    draggable
  },

  data() {
      return {
        list: [
          
        ],

        list2:[
          
        ],

        dataList3: [
          { name: "John 1", id: 0 },
          { name: "Joao 2", id: 1 },
          { name: "Jean 3", id: 2 },
          { name: "Sacar 1", id: 3 },
          { name: "Zalan 2", id: 4 },
          { name: "Sonica 3", id: 5 },
          { name: "Jonny 4", id: 6 },
          { name: "Guisepe 5", id: 7 }
        ]
      };
    },

    methods: {
      add: function() {
        this.list.push({ name: "Juan " + id, id: id++ });
        this.list2.push({ name: "Juan " + id, id: id++ });
      },
      replace: function() {
        this.list = [{ name: "Edgard", id: id++ }];
        this.list2 = [{ name: "Edgard", id: id++ }];
      },
      add2: function() {
        this.dataList3.push({ name: "Juan " + id, id: id++ });
      },
      replace2: function() {
        this.dataList3 = [{ name: "Edgard", id: id++ }];
      }
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
  margin-top: 50px;
  /*background-color: red;*/
}

#mainContainer{
  /*background-color: green;*/
  width: 80%;
  margin:auto;
}

.displayBorder{
  border-style: outset;
  border-color: #138496;
}

.btbSideTitle{
  font-size: 1.1em;
}

</style>
