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
            <b-list-group-item href="http://localhost:8080/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Onboarding" active>Onboarding</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="#">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of center div which consists of table with all details -->
        <b-col lg="7" style="background-color:#fafafa; overflow: scroll; height: 600px;">

          <div class="bv-example-row">

            <b-row>

              <b-col>
                <p class="btbSideTitle"><b>SIDE A</b></p>

                <!-- start the form here -->
                <form id="signup-form" @submit.prevent="processForm">
                  <b-col  class="border border-info rounded">

                    <b-row class="my-1">
                      <b-col sm="3">
                        <!-- <label for="input-small">07:00 PM</label> -->
                        <input type="text" name="reservationTime1" v-model="reservationTime1">
                      </b-col>
                      <b-col sm="9">
                        <b-form-input id="input-small" size="sm" name="teamName1" v-model="teamName1" placeholder="TEAM NAME"></b-form-input>
                      </b-col>
                    </b-row>

                    <draggable
                        id="first"
                        data-source="juju"
                        :list="list2"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;"
                      >
                        <div
                          class="list-group-item item"
                          v-for="element in list2"
                          :key="element.name"
                        >
                        <input v-model="element.name">
                          <!-- {{ element.name }} -->
                        </div>

                           <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                          <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                        </div> -->
                      </draggable>

                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Playing</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="selected1">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Cyberbot</option>
                            <option>Blockmonster</option>
                            <!-- <option>C</option> -->
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Vs</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="vsselected1">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Team Name 1 </option>
                            <option>Team Name 2</option>
                            <option>Team Name 3</option>
                            <!-- <option>C</option> -->
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <b-row>
                        <b-col sm="3">
                          <b-button variant="primary" type="submit">Update</b-button>
                        </b-col>
                        <b-col sm="3">
                          <!-- <b-button variant="info">RFID</b-button> -->
                          <div>
                            <b-button v-b-modal.modal-center variant="info">RFID</b-button>

                            <b-modal id="modal-center" centered title="Team Name 1">
                              <!-- <p class="my-4">Vertically centered modal!</p> -->
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <b-form-input id="input-live" placeholder="PLAYER NAME 1"></b-form-input>
                                  <!-- <b-form-input id="input-small" size="sm" placeholder="RFID 1"></b-form-input> -->
                                  <b-form-input id="input-live" v-model="rfid1" :state="rfidState1" aria-describedby="input-live-help input-live-feedback" placeholder="SCAN WRISTBAND 1" trim></b-form-input>
                                </b-col>
                              </b-row>
                              <br/>

                              <b-row class="my-1">
                                <b-col sm="11">
                                  <b-form-input id="input-live" placeholder="PLAYER NAME 1"></b-form-input>
                                  <!-- <b-form-input id="input-small" size="sm" placeholder="RFID 1"></b-form-input> -->
                                  <b-form-input id="input-live" v-model="rfid2" :state="rfidState2" aria-describedby="input-live-help input-live-feedback" placeholder="SCAN WRISTBAND 2" trim></b-form-input>
                                </b-col>
                              </b-row>
                              <br/>

                              <b-row class="my-1">
                                <b-col sm="11">
                                  <b-form-input id="input-live" placeholder="PLAYER NAME 1"></b-form-input>
                                  <!-- <b-form-input id="input-small" size="sm" placeholder="RFID 1"></b-form-input> -->
                                  <b-form-input id="input-live" v-model="rfid3" :state="rfidState3" aria-describedby="input-live-help input-live-feedback" placeholder="SCAN WRISTBAND 3" trim></b-form-input>
                                </b-col>
                              </b-row>
                              <br/>

                            </b-modal>
                          </div>
                        </b-col>
                      </b-row>
                      <br/>

                  </b-col>

                </form>

                <!-- end of the form here -->

              </b-col>

              <b-col>
                <p class="btbSideTitle"><b>SIDE B</b></p>

                <!-- <br/> -->

                <b-col  class="border border-info rounded">

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
                      group="a" style="height: 300px; border-style: outset;" 
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list"
                        :key="element.name">
                        {{ element.name }}
                      </div>

                      <!-- <div
                        slot="footer"
                        class="btn-group list-group-item"
                        role="group"
                        aria-label="Basic example"
                      >

                      </div> -->



                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected2">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected2">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

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

          <br/>
          <!-- this container display all the events -->
          <div class="bv-example-row">

            <b-row>

              <b-col>

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:15 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list4"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list4"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                         <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected3">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected3">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

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
              <!-- <br/> -->

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:15 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list5"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list5"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>
                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected4">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected4">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

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
          <!-- end of container display all the records -->

          <br/>

          <div class="bv-example-row">

            <b-row>

              <b-col>

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:30 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list6"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list6"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                         <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected5">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected5">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

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
              <!-- <br/> -->

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:30 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list7"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list7"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>
                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected6">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected6">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

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
          <!-- end of container display all the records -->

          <br/>

          <div class="bv-example-row">

            <b-row>

              <b-col>

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:45 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list8"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list8"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                         <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected7">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected3">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

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
              <!-- <br/> -->

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">07:45 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list9"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list9"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>
                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected8">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected8">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

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
          <!-- end of container display all the records -->

          <br/>

          <div class="bv-example-row">

            <b-row>

              <b-col>

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">08:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list10"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list10"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>

                         <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected9">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected9">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

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
              <!-- <br/> -->

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="input-small">08:00 PM</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="input-small" size="sm" placeholder="TEAM NAME"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list11"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 300px; border-style: outset;"
                    >
                      <div
                        class="list-group-item item"
                        v-for="element in list11"
                        :key="element.name"
                      >
                        {{ element.name }}
                      </div>
                      <!--
                         <button class="btn btn-secondary" @click="add">Add</button> -->
                        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                      </div> -->
                    </draggable>

                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Playing</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected10">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Cyberbot</option>
                          <option>Blockmonster</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Vs</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="vsselected10">
                          <!-- <option disabled value="">Please select one</option> -->
                          <option>Team Name 1 </option>
                          <option>Team Name 2</option>
                          <option>Team Name 3</option>
                          <!-- <option>C</option> -->
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

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
          <!-- end of container display all the records -->

        </b-col>
        <!-- end of center div -->

        <!-- start of right div -->
        <b-col lg="3"  style="background-color:#f0f0f0; height: 450px; overflow:scroll;">
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

                <div
                  class="list-group-item item"
                  v-for="element in dataList1"
                  :key="element.name"
                >
                  {{ element.name }}
                </div>

               <!--  <div
                  slot="footer"
                  class="btn-group list-group-item"
                  role="group"
                  aria-label="Basic example"
                > -->
                  <!-- <button class="btn btn-secondary" @click="add2">Add</button> -->
                  <!-- <button class="btn btn-secondary" @click="replace2">Replace</button> -->
                <!-- </div> -->
              </draggable>

              <br/>
              <b>Tiffer's Group</b>
              <draggable :list="dataList" class="list-group" draggable=".item" group="a">
                <div
                  class="list-group-item item"
                  v-for="element in dataList"
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

                <div
                  class="list-group-item item"
                  v-for="element in dataList1"
                  :key="element.name"
                >
                  {{ element.name }}
                </div>

               <!--  <div
                  slot="footer"
                  class="btn-group list-group-item"
                  role="group"
                  aria-label="Basic example"
                > -->
                  <!-- <button class="btn btn-secondary" @click="add2">Add</button> -->
                  <!-- <button class="btn btn-secondary" @click="replace2">Replace</button> -->
                <!-- </div> -->
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
        list: [],

        list2:[],

        list4:[],
        list5:[],
        list6:[],
        list7:[],
        list8:[],
        list9:[],
        list10:[],
        list11:[],

        teamName1: '',
        reservationTime1: '',
        playing1: '',
        vs1:'',

        columnList1:[],

        selected1: '',
        selected2: '',
        selected3: '',
        selected4: '',
        selected5: '',
        selected6: '',
        selected7: '',
        selected8: '',
        selected9: '',
        selected10: '',
        // selected6: '',


        vsselected1: '',
        vsselected2: '',
        vsselected3: '',
        vsselected4: '',
        vsselected5: '',
        vsselected6: '',
        vsselected7: '',
        vsselected8: '',
        vsselected9: '',
        vsselected10: '',

        rfid1: '',
        rfid2: '',
        rfid3: '',
        rfid4: '',
        rfid5: '',
        rfid6: '',

        dataList3: [
          { name: "John", id: 0 },
          { name: "Joao", id: 1 },
          { name: "Jean", id: 2 },
          { name: "Sacar", id: 3 },
          { name: "Zalan", id: 4 },
          { name: "Sonica", id: 5 },
          // { name: "Jonny", id: 6 },
          // { name: "Guisepe", id: 7 }
        ],

        dataList1: [
           { name: "Sandes", id: 0 },
            { name: "Chuck", id: 1 },
            { name: "Tiffer", id: 2 },
          { name: "Jesse", id: 3 },
        ]
      };
    },

    methods: {
      add: function() {
        this.list.push({ name: "Juan " + id, id: id++ });
        // this.list2.push({ name: "Juan " + id, id: id++ });
      },
      replace: function() {
        this.list = [{ name: "Edgard", id: id++ }];
        // this.list2 = [{ name: "Edgard", id: id++ }];
      },
      add2: function() {
        this.dataList3.push({ name: "Juan " + id, id: id++ });
      },
      replace2: function() {
        this.dataList3 = [{ name: "Edgard", id: id++ }];
      },

      processForm: function() {
        console.log(
          {
            name: this.teamName1,
            reservationTime1: this.reservationTime1,
            selected1: this.selected1,
            vsselected1: this.vsselected1,
            element: this.element

          }

          );
        // alert('Processing');
      }
    },

    computed:{
      rfidState1() {
        return this.rfid1.length > 5 ? true : false
      },

      rfidState2() {
        return this.rfid2.length > 5 ? true : false
      },

      rfidState3() {
        return this.rfid3.length > 5 ? true : false
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

#div2 {
  width: 350px;
  height: 70px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}

</style>
