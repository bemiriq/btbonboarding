<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="bv-example-row" id="mainContainer">

      <b-row>

        <!-- list for all rfid b-modal -->

        <b-modal id="modal-center" ref="sideArfidModalUpdate" centered title="Side A" v-bind:hide-footer="true">
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <div v-for="(listings, index) in list2" :key="index">
                                    <br/>
                                    <b-form-input id="input-live" v-model="listings.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                    <input type="text" v-model="listings.id" disabled style="display:none;"/>

                                    <b-form-input v-model="listings.rfidState1" v-on:input="posttorfidapi($event)"></b-form-input>

                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked(); updateRfid();">UPDATE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

        <!-- end oof b-modal for rfid list -->


        <!-- sibe B 1 .. rfid update -->

                <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1 2" v-bind:hide-footer="true">
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <div v-for="(listings, index) in list4" :key="index">
                                    <br/>
                                    <b-form-input id="input-live" v-model="listings.last_name" placeholder="PLAYER NAME" disabled></b-form-input>
                                    <input type="text" v-model="listings.id" disabled style="display:none;"/>

                                    <b-form-input v-model="listings.rfidState1" v-on:input="posttorfidapi2($event)"></b-form-input>

                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClickedSideB1(); updateRfid2();">UPDATE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

        <!-- end of side b 1 .. rfid update -->

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
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName1" placeholder="TEAM NAME 1" v-on:blur="posttoapi($event)"></b-form-input>
                      </b-col>
                    </b-row>

                    <draggable
                        id="first"
                        data-source="juju"
                        :list="list2"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;" @add="onDrop"
                      >
                      <div
                        class="list-group-item item"
                        v-for="(element, index) in list2"
                        :key="index">

                        <!-- <input type="text" v-model="reservation.mission_id"> -->

                          <input v-model="element.id" type="text" disabled style="display:none;">
                          <b-form-input id="input-live" v-model="element.Person.last_name" disabled @input="inputEvent"></b-form-input>
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
                            <b-form-select v-model="selected1" v-on:change="sortBy">
                              <!-- <option disabled value="">Please select one</option> -->
                              <!-- <option v-for="item in missions" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option> -->
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
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
                            <option v-for="option in allTeamList" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
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
                        <b-form-input type="text" name="reservationTime2" v-model="dateTime2Data" disabled></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName2" placeholder="TEAM NAME 2" v-on:blur="posttoapi2($event)"></b-form-input>
                      </b-col>
                    </b-row>

                    <draggable
                        id="first"
                        data-source="juju"
                        :list="list4"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;" @add="onDrop2"
                      >
                      <div
                        class="list-group-item item"
                        v-for="(element2, index) in list4"
                        :key="index">

                        <input v-model="element2.id" type="text" disabled style="display:none;">
                        <b-form-input id="input-live" v-model="element2.Person.last_name" disabled @input="inputEvent2"></b-form-input>
                      </div>
                      </draggable>

                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Playing</label>
                        </b-col>
                        <b-col sm="9">
                          <!-- <b-form-select v-model="selected1"> -->
                          <b-form-select v-model="selected2" v-on:change="sortBy">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
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
                            <option v-for="option in allTeamList2" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
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
                            <b-button v-b-modal.modal-centersideB_one variant="info">RFID</b-button>
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
              <!-- <br/>

              <draggable :list="dataList3" class="list-group" draggable=".item" group="a" :move="checkMove1">
                <div
                  class="list-group-item item"
                  v-for="element in dataList3"
                  :key="element.name">
                  {{ element.last_name }}
                </div>
              </draggable> -->
            

              <br>

              <!-- <div> -->
                  <!-- <b><p> {{dateTime1Data}} </p></b> -->

              <div v-for="reservation in teamByTime2" v-bind:key="reservation.id">

                <!-- {{reservation.id}} -->
                {{reservation.reservation_for}}
                <br>
                
                <!-- :list="reservation.Resevation_people" defines what you are trying to grag on -->


                <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1">
                <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                    {{ element.Person.last_name }} 
                  </div>

                </draggable>

            <!--     <draggable :list="teamByTime2" class="list-group" draggable=".item" group="a" :move="checkMove1">
                
                  <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.id">
                    {{ element.Person.last_name }}
                  </div> -->


                
                    <!-- <div v-for="yahoo in reservation.Reservation_people" v-bind:key="yahoo.id" > -->
                         <!-- {{element.Person.first_name}} -->
                      <!-- <div class="list-group-item item" v-for="element in yahoo.Person" :key="element.person_id"> -->
                      
                        
                      <!-- </div> -->
                      
                    <!-- </div> -->


                
                <!-- </draggable> -->
                <br>
              </div>  
              <!-- </div> -->

              <br>

              <!-- <p>LAST NAME GROUP </p>

                <draggable :list="teamByTime2" class="list-group" draggable=".item" group="a">
                    <div v-for="reservation in teamByTime2" v-bind:key="reservation.id" class="list-group-item item">
                      <div v-for="element in reservation.Reservation_people" v-bind:key="element.id" >
                         {{element.Person.first_name}}
                      </div>
                    </div>
                  </draggable>
              <br> -->

<!--               <br/>
              <b>
                <div v-for="reservation in teamByTime1" v-bind:key="reservation.id">
                  <div v-for="element in reservation.Reservation_people" v-bind:key="element.id" >
                  <p> {{element.Person.last_name}} Group</p>
                  </div>
                </div>
              </b>

                <div v-for="reservation in reservationNameByTime" v-bind:key="reservation.id">
                  <draggable :list="reservationNameByTime" class="list-group" draggable=".item" group="a">
                    <div class="list-group-item item" v-for="element in reservation.Reservation_people" v-bind:key="element.id" >
                         {{element.Person.last_name}}
                    </div>
                  </draggable>
                </div> -->

              

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

    // axios.get(process.env.VUE_APP_DATABASE_RESERVATIONBYID).then(response => (this.teamByTime1 = response.data));

    var starttime='start';
    var endtime='end';
    var currentdate = moment().format("YYYY-MM-DD");
    // const dateTime1Reservation1 = moment(start).add(remainder1, "minutes").format("h:mm:00");
    // const dateTime2Reservation1 = moment(start).add(remainder1, "minutes").format("h:mm:59")


    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T00:00:00'+'/'+endtime+'/'+currentdate+'T23:45:00').then(response => (this.teamByTime2 = response.data));

    console.log(this.teamByTime2);

    // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T01:00:00'+'/'+endtime+'/'+currentdate+'T23:45:00');

  },

  data() {
      return {
        list: [],

        list2:[], /** this grabs the player names for side A first form */

        list4:[],
        list5:[],
        list6:[],
        list7:[],
        list8:[],
        list9:[],
        list10:[],
        list11:[],

        list2sessionid: '', /* this submits the session id as an variable to update rfid reader **/
        list2teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
        tolist2teamplayersessionid: '',
        list2rfidcontainerarray: [],
        list2rfidcontainer: '',

        countfunction: '0',

        playerCheckList2:[], /** this saves dragged item from main div **/

        missions:[],
        filterPlayerId1:[],

        lastTeamIdOne: [],
        lastTeamIdTwo: [],

        // reservationNameByTime: [],

        teamName1: '',
        reservationTime1: '',
        playing1: '',
        vs1:'',
        // selected1: null,
        missionSideA1:'',

        /** this is for the second form list side B 1 **/

          reservationTime2:'',
          teamName2:'',
          teamname2id:'',
          allTeamList2:[],

          /** this is for the draggable events **/

          teamname4id: '',
          list4sessionid:'',
          list4teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
          tolist4teamplayersessionid: '',

          /** end of draggable event for side B 1 **/

          /** this updates rfid reader for side B 1 **/
          playerCheckListSideB1:[],
          list4rfidcontainerarray: [],
          list4rfidcontainer: '',
          playerSessionDetail4: '',

          /** end of rfid reader updates for side B 1 **/

          /** this for pre select down for side B 1 **/
          selected2: null,
          missions2:[],
          /** end of pre select dropdown for game name **/

        /** end of objects for second form list side B 1 **/

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

        selected1: null,
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

        dataList3: [],

        reservationNameByTime:[],

        allTeamList: [], /* its for the team vs team dropdown */

        teamByTime1: [], /* will display players name according to time from axios post url as reservation/xola_order_id */
        teamByTime2: [],

        /* gets team name id when post */
        teamname1id:'',
        /*end of team name id after post */

        /* gets the session id once the team name is inserted */
        playerSessionDetail1:[],
        /* end of session id */

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


      hideModalRfidClickedSideB1() {
        this.$refs['sideB1rfidModalUpdate'].hide()
      },

      hideModalRfidClickedSideB1_2() {
        this.$refs['sideB1rfidModalUpdate2'].hide()
      },

      // hideModalRfidClickedSideB1() {
      //   this.$refs['sideB1rfidModalUpdate'].hide()
      // },

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

      posttorfidapi(event){
        console.log("inside update rfid");
         var arr = this.list2;

         var number = this.countfunction++;

          var rfid_tag = this.list2[number].rfidState1;

          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            // console.log(response.data[0].id);
           // this.list2rfidcontainer = response.data[0].id;
            this.list2rfidcontainer  = response.data[0].id;

            this.list2rfidcontainer = response.data[0].id;

                  if (this.list2rfidcontainer > 0) { 
                        this.list2rfidcontainerarray.push(this.list2rfidcontainer);
                    }

            })
            

            /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });
      },

      posttorfidapi2(event){
        console.log("inside update rfid side b 1");
         var arr = this.list4;

         var number = this.countfunction++;

          var rfid_tag = this.list4[number].rfidState1;

          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            // console.log(response.data[0].id);
           // this.list2rfidcontainer = response.data[0].id;
            this.list4rfidcontainer  = response.data[0].id;

            this.list4rfidcontainer = response.data[0].id;

                  if (this.list4rfidcontainer > 0) { 
                        this.list4rfidcontainerarray.push(this.list4rfidcontainer);
                    }

            })
            

            /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });
      },

      updateRfid(){

        var arr = this.list2teamplayersessionid;
         for(var i=0; i < arr.length; i++){

            var teamplayertableid = this.list2teamplayersessionid[i];
            var rfidtag_id = this.list2rfidcontainerarray[i];
            var playerid = this.list2[i].id;
            var sessionid = this.list2sessionid;

            console.log(this.list2[i].id);
          console.log(teamplayertableid);
          console.log(rfidtag_id);

          console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid);


          axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
              player_id: playerid,
              rfid_id: rfidtag_id,
              team_id: this.teamname1id[0].id,
              session_id: sessionid
            })
              .then(function (response) {
                console.log(response);
                // console.log("papa");
                // this.list2teamplayersessionid = response.data[0].id;
              })

              .catch(function (error) {
                console.log(error);
              });

         }
        
      },


      updateRfid2(){

        var arr = this.list4teamplayersessionid;
         for(var i=0; i < arr.length; i++){

            var teamplayertableid = this.list4teamplayersessionid[i];
            var rfidtag_id = this.list4rfidcontainerarray[i];
            var playerid = this.list4[i].id;
            var sessionid = this.list4sessionid;

          axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
              player_id: playerid,
              rfid_id: rfidtag_id,
              team_id: this.teamname1id[0].id,
              session_id: sessionid
            })
              .then(function (response) {
                console.log(response);
                // this.list2teamplayersessionid = response.data[0].id;
              })

              .catch(function (error) {
                console.log(error);
              });

         }
        
      },

      // posttorfidapi(event){
      //   console.log("sandes man");
      // },

      posttoapi(event){
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+this.teamName1,{
          name: this.teamName1,
          })
          .then(response => {this.teamname1id = response.data})
          .catch(function (error) {
            console.log(error);
          });

          axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList = response.data));
          
      },

      posttoapi2(event){
          // console.log("in");
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+this.teamName2,{
          name: this.teamName2,
          })
          .then(response => {this.teamname2id = response.data})
          .catch(function (error) {
            console.log(error);
          });

          axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList2 = response.data));
          
      },


      inputEvent(e) {
        console.log('sattttt');
      // this.$emit('input', e.target.value);
      },

      inputEvent2(e) {
        console.log('sattttt on side b 1');
      // this.$emit('input', e.target.value);
      },

      // onDrop for Team Name 1 table it will post to session table and team_player_session table
      onDrop(e){
        // console.log(this.list2['id']);
        // return Object.keys(this.list2).length-1;

        var missionid = this.teamByTime2[0].mission_id;
        this.selected1 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/


        var draggedPlayerId = this.list2[this.list2.length - 1].id; /* this will always select the last player id dragged */
        console.log(draggedPlayerId);

        // console.log('one drop');
        // console.log(this.element.id);
        console.log(this.teamname1id[0].id);
        var reservationid = this.list2[0].reservation_id;
        var teamId = this.teamname1id[0].id;
        var routeId = 1;
        // console.log(this.list2);

          if(teamId > 0){
            // console.log('greater than 0');
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId
            })
            .then(response => {

              // console.log(response.data.id);
              // console.log(response.data.session_id);
              console.log(response.data);

              // console.log(response.data[0].route_id);
              this.list2sessionid = response.data[0].id; /** this pass session id to list2sessionid **/

              this.playerSessionDetail1 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId
                // player_id: draggedPlayerId
                })
                .then(response => {
                  // console.log(response.data);
                  // console.log(response.data[0].id);
                  // var list2_teamplayersessionid = response.data[0].id;
                  // console.log(list2_teamplayersessionid);
                  // this.list2teamplayersessionid = response.data;


                  /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list2teamplayersession*/
                  this.tolist2teamplayersessionid = response.data[0].id;

                  if (this.tolist2teamplayersessionid > 0) { 
                        this.list2teamplayersessionid.push(this.tolist2teamplayersessionid);
                    }

                  

                  // this.list2teamplayersessionid.push(this.tolist2teamplayersessionid);
              
                  // console.log(this.list2teamplayersessionid.push(this.tolist2teamplayersessionid));

                  // this.list2teamplayersessionid = response.data[0].id;

                  // this.list2teamplayersessionid.forEach(obj => {
                  //     array.push(obj.list2_teamplayersessionid);
                  // });
                  // just run team_player_session here

                  // axios.get('http://localhost:9090/people/').then(response => {this.lastTeamIdOne = response.data.slice(-1)});
                })

                .catch(error => {
                  console.log(error);
                });
              }
              /** ends axios post on team player sessions **/

            })

            .catch(function (error) {
              console.log(error);
            });
          }
      },

      onDrop2(e){

        var missionid = this.teamByTime2[0].mission_id;
        this.selected2 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        var draggedPlayerId = this.list4[this.list4.length - 1].id; /* this will always select the last player id dragged */

        var reservationid = this.list4[0].reservation_id;
        var teamId = this.teamname2id[0].id;
        var routeId = 1;

          if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId
            })
            .then(response => {

              console.log(response.data);

              this.list4sessionid = response.data[0].id; /** this pass session id to list4sessionid **/

              this.playerSessionDetail4 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId
                // player_id: draggedPlayerId
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist4teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list4teamplayersession*/
                  this.tolist4teamplayersessionid = response.data[0].id;

                  if (this.tolist4teamplayersessionid > 0) { 
                        this.list4teamplayersessionid.push(this.tolist4teamplayersessionid);
                    }
                })

                .catch(error => {
                  console.log(error);
                });
              }
              /** ends axios post on team player sessions **/

            })

            .catch(function (error) {
              console.log(error);
            });
          }
      },

      checkMove1(evt){
        // if (evt.draggedContext.element.name=='apple'){
        //   return false
        // }
        if(this.teamName1.length < 1){
          return false;
        }
        else{
          console.log('insert team name first');
        }
      },

      checkMove2(evt){
        // if (evt.draggedContext.element.name=='apple'){
        //   return false
        // }
        if(this.teamName2.length < 1){
          return false
        }
        else{
          console.log('else print vo');
        }
      },

      checkPlayerId1(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdOne = response.data.slice(-1)});
      },

      checkPlayerId2(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdTwo = response.data.slice(-1)});
      },

      submitFirstNameList(){

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

        /* end of submit team name */

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
