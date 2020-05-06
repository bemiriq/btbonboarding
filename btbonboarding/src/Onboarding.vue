<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="bv-example-row" id="mainContainer">

      <b-row>

        <!-- list for all rfid b-modal -->

        <b-modal id="modal-center" ref="sideArfidModalUpdate" centered title="Side A" v-bind:hide-footer="true">
                              <!-- <p class="my-4">Vertically centered modal!</p> -->
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <!-- <b-form-input id="input-live" placeholder="PLAYER NAME 1"></b-form-input> -->
                                  <div v-for="(listings, index) in list2" :key="index">
                                    <br/>
                                    <b-form-input id="input-live" v-model="listings.first_name" placeholder="PLAYER NAME 1" disabled></b-form-input>
                                    <!-- <b-form-input id="input-live" v-model="listings.rfidSideA1"></b-form-input> -->
                                    <!-- <br/> -->

                                    <b-form-select v-model="listings.rfidState1" style="display:hide;">
                                      <option v-for="option in rfidTagList" v-bind:value="option.id" :key="option.id"> {{ option.tag }} </option>
                                    </b-form-select>

                                    <!-- <b-form-input v-model="listings.rfidState1" list="my-list-id"></b-form-input>

                                    <datalist id="my-list-id">
                                      <option v-for="option in rfidTagList" v-bind:value="option.id" :key="option.id"> {{ option.tag }} </option>
                                    </datalist> -->

                                    <!-- <b-form-input list="input-list" id="input-with-list" v-model="listings.rfidState1"></b-form-input>
                                    <b-form-datalist id="input-list" v-for="option in rfidTagList" v-bind:value="option.id" :key="option.id">{{option.id}}</b-form-datalist> -->

                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked();">UPDATE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>


        <b-modal id="modal-center2" ref="sideArfidModalUpdate2" centered title="Side B" v-bind:hide-footer="true">
                              <!-- <p class="my-4">Vertically centered modal!</p> -->
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <!-- <b-form-input id="input-live" placeholder="PLAYER NAME 1"></b-form-input> -->
                                  <div v-for="(listings, index) in playerCheckList2" :key="index">
                                    <br/>
                                    <b-form-input id="input-live" v-model="listings.first_name" placeholder="PLAYER NAME 1" disabled></b-form-input>
                                    <!-- <b-form-input id="input-live" v-model="listings.rfidSideA2"></b-form-input> -->

                                     <b-form-select v-model="listings.rfidState2" style="display:hide;">
                                      <option v-for="option in rfidTagList" v-bind:value="option.id" :key="option.id"> {{ option.tag }} </option>
                                    </b-form-select>

                                    <br/>
                                  </div>
                                  <!-- <div  v-for="(listings, index) in rfidTagList" :key="index"> -->
                                    <!-- <b-form-input id="input-live" v-model="selectedRfidList1" placeholder="SCAN WRISTBAND" trim v-bind:value="item.id"></b-form-input> -->
                                    
                                  <!-- </div> -->
                                  <!-- <b-form-input id="input-small" size="sm" placeholder="RFID 1"></b-form-input> -->
                                  <!-- <b-form-input id="input-live" v-model="rfid1" :state="rfidState1" aria-describedby="input-live-help input-live-feedback" placeholder="SCAN WRISTBAND 1" trim></b-form-input> -->
                                </b-col>
                                </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked2();">UPDATE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

        <!-- end oof b-modal for rfid list -->


        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="/#/Onboarding" active>Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->




        <!-- start of center div which consists of table with all details -->
        <b-col lg="7" style="background-color:#fafafa; overflow: scroll; height: 650px;">

          <div class="bv-example-row">

            <b-row>

              <b-col>
                <p class="btbSideTitle"><b>SIDE A</b></p>

                <!-- start the form here -->
                <!-- <form id="signup-form" @submit.prevent="processForm"> -->
                <form id="signup-form">
                  <b-col  class="border border-info rounded">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <!-- <label for="input-small">07:00 PM</label> -->
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                        <!-- <p>{{dateTime1Data}}</p> -->
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName1" placeholder="TEAM NAME 1"></b-form-input>
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
                        v-for="(element, index) in list2"
                        :key="index">

                        <b-form-input id="input-live" v-model="element.first_name" disabled></b-form-input>
                        <!-- <input v-model="element.first_name" disabled> -->
                      </div>
                     <!--    <input type="text" :value="item.name" @input="changeList($event, item.id, 'name')" v-model="element.name">
                          {{ element.name }}
                        </div> -->

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
                          <!-- <b-form-select v-model="selected1"> -->
                          <b-form-select v-model="selected1" v-on:change="sortBy">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option v-for="item in missions" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option>
                            <!-- <option>Blockmonster</option> -->
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
                      <br/>
                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected1">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Organization 1 </option>
                            <option>Organization 2</option>
                            <option>Organization 3</option>
                            <!-- <option>C</option> -->
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName1}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>
                        <b-col sm="3">
                          <!-- <b-button variant="info">RFID</b-button> -->
                          <div>
                            <b-button v-b-modal.modal-center variant="info">RFID</b-button>
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

                <!-- start the form here -->
                <!-- <form id="signup-form" @submit.prevent="processForm"> -->
                <form id="signup-form">
                  <b-col  class="border border-info rounded">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <!-- <label for="input-small">07:00 PM</label> -->
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                        <!-- <p>{{dateTime1Data}}</p> -->
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName2" placeholder="TEAM NAME 2"></b-form-input>
                      </b-col>
                    </b-row>

                    <draggable
                        id="first"
                        data-source="juju"
                        :list="playerCheckList2"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;"
                      >
                      <div
                        class="list-group-item item"
                        v-for="(element, index) in playerCheckList2"
                        :key="index">

                        <b-form-input id="input-live" v-model="element.first_name" disabled></b-form-input>
                        <!-- <input v-model="element.first_name" disabled> -->
                      </div>
                     <!--    <input type="text" :value="item.name" @input="changeList($event, item.id, 'name')" v-model="element.name">
                          {{ element.name }}
                        </div> -->

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
                          <!-- <b-form-select v-model="selected1"> -->
                          <b-form-select v-model="selected2" v-on:change="sortBy">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option v-for="item in missions" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option>
                            <!-- <option>Blockmonster</option> -->
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
                      <br/>
                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected2">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Organization 1 </option>
                            <option>Organization 2</option>
                            <option>Organization 3</option>
                            <!-- <option>C</option> -->
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                    <b-modal id="modal-2" ref="my-modal-submit-id2" title="BTB Onboarding " centered v-bind:hide-footer="true">
                      <p> You are going to update data for <b> {{teamName2}} </b> </p>

                      <br>

                        <b-button variant="primary" v-on:click="submitFirstNameList2(); hideModal2();">SUBMIT</b-button>
                      <br>

                    </b-modal>

                      <b-row>
                        <b-col sm="3">
                          <b-button variant="primary" v-b-modal.modal-2 v-on:click="checkPlayerId2();">Update</b-button>
                        </b-col>
                        <b-col sm="3">
                          <!-- <b-button variant="info">RFID</b-button> -->
                          <div>
                            <b-button v-b-modal.modal-center2 variant="info">RFID</b-button>
                          </div>
                        </b-col>
                      </b-row>
                      <br/>

                  </b-col>

                </form>

                <!-- end of the form here -->

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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 3"></b-form-input>
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

                    <br />


                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected3">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Organization 1 </option>
                            <option>Organization 2</option>
                            <option>Organization 3</option>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 4"></b-form-input>
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
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected4">
                            <!-- <option disabled value="">Please select one</option> -->
                            <option>Organization 1 </option>
                            <option>Organization 2</option>
                            <option>Organization 3</option>
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

            </b-row>

          </div>
          <!-- end of container display all the records -->

          <br/>

          <div class="bv-example-row">

            <b-row>

              <b-col>

                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 5"></b-form-input>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 6"></b-form-input>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime4Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 7"></b-form-input>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime4Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 8"></b-form-input>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime5Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 9"></b-form-input>
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
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime5Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 10"></b-form-input>
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
              <b><p>{{dateTime1Data}}</p></b>

              <draggable :list="dataList3" class="list-group" draggable=".item" group="a">
                <div
                  class="list-group-item item"
                  v-for="element in dataList3"
                  :key="element.name"
                >
                <!-- <input v-model="reservationDrag1" type="text"> -->
                  {{ element.first_name }}
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

                <!-- <div
                  class="list-group-item item"
                  v-for="element in dataList1"
                  :key="element.name"
                >
                  {{ element.name }}
                </div> -->

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

              <br>

  <!--             <div v-bind:key="player.Person.id">
   {{player.Person.name}}
</div> -->

              <div v-for="reservation in reservationNameByTime" v-bind:key="reservation.id">
                <div v-for="player in reservation.Players" v-bind:key="player.id">
                  <!-- <div v-bind:key="player.Person.id">
                     {{player.Person.first_name}}
                  </div> -->
                </div>
              </div>
            <!-- </div> -->

              <br/>
              <b>Tiffer's Group</b>
              <draggable :list="reservationNameByTime" class="list-group" draggable=".item" group="a">
                <!-- <div
                  class="list-group-item item"
                  v-for="element in dataListByTime"
                  :key="element.name"
                >
                  {{ element.name }}
                </div> -->

                <div v-for="reservation in reservationNameByTime" v-bind:key="reservation.id">
  <!-- {{reservation.id}} -->
  <div v-for="player in reservation.Players" v-bind:key="player.id">
    {{player.id}}
    <!-- <div v-for="persons in player.Person" v-bind:key="persons.id"> -->
      <!-- {{persons.name}} -->
    <!-- </div> -->
  </div>
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

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
// import HelloWorld from './components/HelloWorld.vue'
import draggable from "vuedraggable";
import axios from 'axios';
var moment = require('moment');

let id = 1;


export default {
  name: 'App',
  components: {
    // HelloWorld
    draggable
  },

  mounted: function(){

    // console.log(process.env.VUE_APP_ROOT_URL);
    // console.log(process.env.VUE_DATABASE_URL);
    console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS);
    
    axios.get(process.env.VUE_APP_DATABASE_MISSION).then(response => (this.missions = response.data ));

    axios.get(process.env.VUE_APP_DATABASE_PEOPLE).then(response => (this.dataList3 = response.data ));

    /** get all the rfid tag **/
    axios.get(process.env.VUE_APP_DATABASE_RFIDS).then(response => (this.rfidTagList = response.data ));

    axios.get(process.env.VUE_APP_DTB_RESERVATIONBYTIME).then(response => (this.reservationNameByTime = response.data));

    var currenttime = moment().format('h:mm A');
    // console.log(currenttime);

    const start = moment();
    /** first time case **/
    const remainder1 = -15 - (start.minute() % 30);
    const dateTime1 = moment(start).add(remainder1, "minutes").format(" h:mm a");

    /** second time case **/
    const remainder2 = 0 - (start.minute() % 30);
    const dateTime2 = moment(start).add(remainder2, "minutes").format(" h:mm a");

    /** third time case **/
    const remainder3 = 15 - (start.minute() % 30);
    const dateTime3 = moment(start).add(remainder3, "minutes").format(" h:mm a");

     /** forth time case **/
    const remainder4 = 30 - (start.minute() % 30);
    const dateTime4 = moment(start).add(remainder4, "minutes").format(" h:mm a");

    /** fifth time case **/
    const remainder5 = 45 - (start.minute() % 30);
    const dateTime5 = moment(start).add(remainder5, "minutes").format(" h:mm a");

    /** sixth time case **/
    const remainder6 = 60 - (start.minute() % 30);
    const dateTime6 = moment(start).add(remainder6, "minutes").format(" h:mm a");

    // console.log(dateTime1);
    this.dateTime1Data = dateTime1;
    this.dateTime2Data = dateTime2;
    this.dateTime3Data = dateTime3;
    this.dateTime4Data = dateTime4;
    this.dateTime5Data = dateTime5;
    this.dateTime6Data = dateTime6;
    console.log(this.dateTime1Data);
    console.log(dateTime2);
    console.log(dateTime3);

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

        playerCheckList2:[], /** this saves dragged item from main div **/

        missions:[],
        filterPlayerId1:[],

        lastTeamIdOne: [],
        lastTeamIdTwo: [],

        reservationNameByTime: [],

        teamName1: '',
        teamName2:'',
        
        reservationTime1: '',
        playing1: '',
        vs1:'',

        columnList1:[],

        rfidTagList: [], // fetches rfid tag list from database

        /** start list for rifd selected for each field **/
        rfidSideA1: [],
        rfidSideA2: [],
        /** end of rfid tag selected **/

        /** organization select list **/
        organizationselected1: '',
        organizationselected2: '',
        organizationselected3: '',
        organizationselected4: '',
        /** end of organization list **/

        /* stores quater format time **/
        dateTime1Data:'',
        dateTime2Data:'',
        dateTime3Data:'',
        dateTime4Data:'',
        dateTime5Data:'',
        dateTime6Data:'',
        /* end of time formated quater wise */

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

        reservationDrag1: '',
        divTeamName1: '',

        dataList3: [
          // { name: "John", id: 0 },
          // { name: "Joao", id: 1 },
          // { name: "Jean", id: 2 },
          // { name: "Sacar", id: 3 },
          // { name: "Zalan", id: 4 },
          // { name: "Sonica", id: 5 },
          // { name: "Jonny", id: 6 },
          // { name: "Guisepe", id: 7 }
        ]

        // dataList1: [
        //    { name: "Sandes", id: 0 },
        //     { name: "Chuck", id: 1 },
        //     { name: "Tiffer", id: 2 },
        //   { name: "Jesse", id: 3 },
        // ]

        // reservationNameByTime: [],
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

      hideModal() {
        this.$refs['my-modal-submit-id'].hide()
      },

      hideModal2() {
        this.$refs['my-modal-submit-id2'].hide()
      },

      hideModalRfidClicked() {
        this.$refs['sideArfidModalUpdate'].hide()
      },

      hideModalRfidClicked2() {
        this.$refs['sideArfidModalUpdate2'].hide()
      },

      // processForm: function() {
      //   console.log(
      //     {
      //       name: this.teamName1,
      //       reservationTime1: this.reservationTime1,
      //       taemlist1: this.divTeamName1
      //       // selected1: this.selected1,
      //       // vsselected1: this.vsselected1,
      //       // element: this.element

      //     }

      //     );
      //   // alert('Processing');
      // },

      checkPlayerId1(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdOne = response.data.slice(-1)});
      },

      checkPlayerId2(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdTwo = response.data.slice(-1)});
      },

      submitFirstNameList(){


        // console.log(this.teamName1);

        // console.log("Team Name");

        // console.log(this.selected1);
        // console.log(this.vsselected1); // teams for versus mode

        axios.post(process.env.VUE_APP_DATABASE_TEAMS,{
        name: this.teamName1,
        })
        .then(function (response) {
          console.log(response);
          // axios.get('http://localhost:9090/people/').then(response => {this.lastTeamIdOne = response.data.slice(-1)});
        })

        .catch(function (error) {
          console.log(error);
        });

        // this will fetch the last team id 
        // axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdOne = response.data.slice(-1)});
        var filterPlayerId1 = this.lastTeamIdOne[0];
        var lastTeamId = filterPlayerId1['id'];

        /** starting of axios post for SESSION TABLE **/
        axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
          mission_id: this.selected1,
          team_id: lastTeamId + 1
        })
        .then(function (response) {
          console.log(response);
        })

        .catch(function (error) {
          console.log(error);
        });

        /** end of session table post **/

        // console.log(lastTeamId);

        var arr = this.list2;
        // console.log(arr);
        for(var i=0; i < arr.length; i++){
          // console.log("WAS here as well");
          // console.log(arr[i]['first_name']);
          // console.log(arr[i]['id']);

          var teamId = lastTeamId + 1;
          var playerId = arr[i]['id'];

          // var arr2 = this.rfidSideA1;
          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{

            team_id: lastTeamId + 1,
            player_id: arr[i]['id'],
            rfid_id: arr[i]['rfidState1']
            // rfid_id: rfidSideA1
            // player_id: sand + 1

          });
        }
      },


      submitFirstNameList2(){


        // console.log(this.teamName1);

        // console.log("Team Name");

        // console.log(this.selected1);
        // console.log(this.vsselected1); // teams for versus mode

        axios.post(process.env.VUE_APP_DATABASE_TEAMS,{
        name: this.teamName2,
        })
        .then(function (response) {
          console.log(response);
          // axios.get('http://localhost:9090/people/').then(response => {this.lastTeamIdOne = response.data.slice(-1)});
        })

        .catch(function (error) {
          console.log(error);
        });

        // this will fetch the last team id 
        // axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdOne = response.data.slice(-1)});
        var filterPlayerId1 = this.lastTeamIdTwo[0];
        var lastTeamId = filterPlayerId1['id'];

        /** starting of axios post for SESSION TABLE **/
        axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
          mission_id: this.selected2,
          team_id: lastTeamId + 1
        })
        .then(function (response) {
          console.log(response);
          // axios.get('http://localhost:9090/people/').then(response => {this.lastTeamIdOne = response.data.slice(-1)});
        })

        .catch(function (error) {
          console.log(error);
        });
        /** end of session table post **/

        // console.log(lastTeamId);

        var arr = this.playerCheckList2;
        // console.log(arr);
        for(var i=0; i < arr.length; i++){
          // console.log("WAS here as well");
          // console.log(arr[i]['first_name']);
          // console.log(arr[i]['id']);

          var teamId = lastTeamId + 1;
          var playerId = arr[i]['id'];

          // var arr2 = this.rfidSideA1;
          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{

            team_id: lastTeamId + 1,
            player_id: arr[i]['id'],
            rfid_id: arr[i]['rfidState2']
            // rfid_id: rfidSideA1
            // player_id: sand + 1

          });
        }
      },


      sortBy: function() {
        console.log(this.selected1);
    },
    

    //   changeList(event, id, property) {
    //   let value = event.target.value
      
    //   for (item of this.list) {
    //     if (item.id === id) {
    //       if(property === 'name') {
    //         item.name = value
    //     }
    //   }
    // }

    // }

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
