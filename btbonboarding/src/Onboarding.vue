<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <input type="text" placeholder="input field for RFID reader" @blur="focusOutPostRfid" :value=""/> -->
    <!-- <input type="text"/> -->


   <!--    <div v-show="loadScreen" class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div v-show="!loadScreen" class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">LOADED</span>
      </div> -->


    <div class="bv-example-row" id="mainContainer">

      <b-row>

        <!-- list for all rfid b-modal -->

        <!-- <b-modal id="modal-center" ref="sideRfidUpdate" centered title="Side A" v-bind:hide-footer="true"> -->
        <b-modal id="modal-center" ref="sideRfidUpdate10" centered v-bind:hide-footer="true">
                            <b><p>{{teamName10}} Side A {{dateTime1Data}}</p></b>

                              <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[10] > '0' ">
                                    <!-- element in fetchPlayerList[10].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[10].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 10, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 10, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list10" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 10, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 10)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <br/>

                              <b-row>
                                <!-- <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked(); updateRfid();">SAVE & CLOSE</b-button></b-col> -->
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 10);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                              <!-- end of row that displays fetch data from mounted -->


                            </b-modal>

        <!-- end oof b-modal for rfid list -->


        <!-- sibe B 1 .. rfid update -->

                <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-center11" ref="sideRfidUpdate11" centered v-bind:hide-footer="true">
                            <b><p>{{teamName11}} on Side B for {{dateTime1BData}}</p></b>
                           
                           <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[11] > '0' ">
                                    <!-- element in fetchPlayerList[11].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[11].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 11, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 11, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list11" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 11, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 11)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->

                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 11);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

        <!-- end of side b 1 .. rfid update -->



        <!-- SIDE A 2 -->
        <b-modal id="modal-center12" ref="sideRfidUpdate12" centered v-bind:hide-footer="true">
                            <b><p>{{teamName12}} Side A {{dateTime2Data}}</p></b>

                              <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[12] > '0' ">
                                    <!-- element in fetchPlayerList[12].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[12].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 12, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 12, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list12" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 12, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 12)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <br/>

                              <b-row>
                                <!-- <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked(); updateRfid();">SAVE & CLOSE</b-button></b-col> -->
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 12);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                              <!-- end of row that displays fetch data from mounted -->


                            </b-modal>

        <!-- end oof SIDE A 2 -->


        <!-- sibe B 2 -->

                <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-center13" ref="sideRfidUpdate13" centered v-bind:hide-footer="true">
                            <b><p>{{teamName13}} on Side B for {{dateTime1BData}}</p></b>
                           
                           <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[13] > '0' ">
                                    <!-- element in fetchPlayerList[13].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[13].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 13, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 13, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list13" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 13, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 13)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->

                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 13);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

         <!-- end of sibe B 2 -->


         <!-- sibe A 3 -->

                <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-center14" ref="sideRfidUpdate14" centered v-bind:hide-footer="true">
                            <b><p>{{teamName14}} on Side B for {{dateTime1BData}}</p></b>
                           
                           <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[14] > '0' ">
                                    <!-- element in fetchPlayerList[14].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[14].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 14, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 14, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list14" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 14, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 14)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->

                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 14);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

<!-- end of sibe A 3 -->


<!-- sibe B 3 and BOX 6 -->

                <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-center15" ref="sideRfidUpdate15" centered v-bind:hide-footer="true">
                            <b><p>{{teamName15}} on Side B for {{dateTime1BData}}</p></b>
                           
                           <b-row class="my-1">
                                <b-col sm="12">

                                  <div v-if="fetchPlayerList[15] > '0' ">
                                    <!-- element in fetchPlayerList[15].Team_player_sessions -->
                                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[15].Team_player_sessions" :key="index">
                                        <b-row>
                                          <b-col >
                                             <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                          </b-col>

                                          <b-col>

                                            <p v-if="teamfetch.Rfid != null">
                                            <!-- VALUE -->
                                              <b-form-input v-model="teamfetch.Rfid.tag" disabled style="background-color: #33FF90;color:#33FF90;">
                                                {{teamfetch.Rfid.tag}}
                                              </b-form-input>
                                            </p>
                                            <p v-else>
                                                <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 15, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"
                                                :class="{active: activeBtn === 'btn1' }"></b-form-input>
                                            </p>
                                          </b-col>

                                          <b-col>
                                            <p v-if="teamfetch.Rfid != null">
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 15, index) , activeBtn = 'btn1' "></b-icon>
                                            </p>

                                            <p v-else>
                                              <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='' " ></b-icon>
                                            </p>

                                          </b-col>

                                        </b-row>
                                    </div>

                                  </div>

                                  <div v-else>

                                      <div v-for="(listings, index) in list15" :key="index">

                                        <br/>
                                        <b-row>
                                          <b-col sm="6">
                                            <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                            <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                          </b-col>
                                          <b-col sm="4">
                                            <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 15, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                                          </b-col>

                                          <b-col sm="2">
                                            <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 15)"></b-icon>
                                          </b-col>

                                        </b-row>

                                      </div>

                                  </div>

                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->

                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 15);">SAVE & CLOSE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                            </b-modal>

 <!-- end of sibe B 3 and BOX 6 -->


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
                <!-- <form id="signup-form"> -->
                  <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked10 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName10" placeholder="TEAM NAME 1" v-on:change="posttoapi($event, 10)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                    <!-- <div v-if="this.teamName1.length > 1"> checks at first if the team name is inserted or not / if not it will disable drag -->

                        <div v-if="fetchPlayerList[10] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[10].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 10)" @change="deleteTeamPlayerSessionAfterReload1($event, 10)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[10].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '10'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>





                      <!-- </draggable> -->
                    <!-- </div> -->

                    <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="getpersonDetails1">
                      <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                      </div>
                    </draggable -->

                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list10" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 10, index)" @change="onDropReservation1($event, 10)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list10" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list10[index].rfidState1 == '' || !list10[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list10[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '10'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected10" v-on:change="onChangeMission1($event, 10)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />


                      <div v-if=" selected10 > 0 && selected10 == selected11">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <!-- <b-form-select v-model="vsselected10" v-on:change="onChangeTeamVsTeam1($event, 10)"> -->
                              <!-- <p>{{vsselected10}}</p>
                              <p>{{vsselected11}}</p> -->
                            <b-form-select v-model="vsselected10" v-on:change="onChangeTeamVsTeam1($event, 10)">
                              <option> </option>
                              <option :value="teamName11"> {{ teamName11 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>
                     <!--  <br/>
                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected1" @change="onChange($event)">
                            <option v-for="option in organizationList" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
                          </b-form-select>
                        </b-col>
                      </b-row> -->

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName10}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>
                        <!-- <b-col sm="3"> -->
                          <!-- <b-button variant="info">RFID</b-button> -->
                          <!-- <div>
                            <b-button v-b-modal.modal-center variant="info">RFID</b-button>
                          </div> -->
                        <!-- </b-col> -->

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist10 == false">
                                  <b-button block v-if="disableButton10 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 10)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 10)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                      <br/>

                  </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col>

                                                                                        <!-- SIDE 1 B -->
             <b-col>
                <p class="btbSideTitle"><b>SIDE B</b></p>

                <!-- <form id="signup-form"> -->
                  <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked11 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName11" placeholder="TEAM NAME 2" v-on:change="posttoapi($event, 11)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                        <div v-if="fetchPlayerList[11] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[11].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 11)" @change="deleteTeamPlayerSessionAfterReload1($event, 11)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[11].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>



                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list11" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 11, index)" @change="onDropReservation1($event, 11)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list11" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list11[index].rfidState1 == '' || !list11[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list11[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected11" v-on:change="onChangeMission1($event, 11)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected11 > 0 && selected10 == selected11">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <b-form-select v-model="vsselected11" v-on:change="onChangeTeamVsTeam1($event, 11)">
                              <option> </option>
                              <option :value="teamName10"> {{ teamName10 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName11}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center11 variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist11 == false">
                                  <b-button block v-if="disableButton11 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 11)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 11)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                      <br/>

                  </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col>

            </b-row>

          </div>

          <br/>
          <!-- this container display all the events -->
          <div class="bv-example-row">

            <b-row>

              

<!-- SIDE A 2 -->

              <b-col>
                <!-- <p class="btbSideTitle"><b>SIDE B</b></p> -->

                <!-- <form id="signup-form"> -->
                  <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked12 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName12" placeholder="TEAM NAME 3" v-on:change="posttoapi($event, 12)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                        <div v-if="fetchPlayerList[12] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[12].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 12)" @change="deleteTeamPlayerSessionAfterReload1($event, 12)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[12].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>



                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list12" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 12, index)" @change="onDropReservation1($event, 12)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list12" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list12[index].rfidState1 == '' || !list12[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list12[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected12" v-on:change="onChangeMission1($event, 12)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected12 > 0 && selected12 == selected13">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <b-form-select v-model="vsselected12" v-on:change="onChangeTeamVsTeam1($event, 12)">
                              <option> </option>
                              <option :value="teamName13"> {{ teamName13 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName12}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center12 variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist12 == false">
                                  <b-button block v-if="disableButton12 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 12)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 12)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                      <br/>

                  </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col>


<!-- END OF SIDE A 2 -->



<!--         THIS IS SIDE B 2                    -->


              <b-col>

                <!-- <form id="signup-form"> -->
                  <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked13 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName13" placeholder="TEAM NAME 4" v-on:change="posttoapi($event, 13)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                        <div v-if="fetchPlayerList[13] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[13].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 13)" @change="deleteTeamPlayerSessionAfterReload1($event, 13)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[13].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>



                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list13" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 13, index)" @change="onDropReservation1($event, 13)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list13" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list13[index].rfidState1 == '' || !list13[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list13[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected13" v-on:change="onChangeMission1($event, 13)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected13 > 0 && selected12 == selected13">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <b-form-select v-model="vsselected13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                              <option> </option>
                              <option :value="teamName12"> {{ teamName12 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName13}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center13 variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist13 == false">
                                  <b-button block v-if="disableButton13 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 13)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 13)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                      <br/>

                  </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col>

<!-- END OF SIDE B 2 which is 13 denoted in Array(13)-->

            </b-row>

          </div>
          <!-- end of container display all the records -->

          <br/>

          <div class="bv-example-row">

            <b-row>

<!-- SIDE A BOX 5 -->

              <b-col>

                <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked14 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName14" placeholder="TEAM NAME 5" v-on:change="posttoapi($event, 14)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                        <div v-if="fetchPlayerList[14] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[14].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 14)" @change="deleteTeamPlayerSessionAfterReload1($event, 14)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[14].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>



                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list14" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 14, index)" @change="onDropReservation1($event, 14)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list14" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list14[index].rfidState1 == '' || !list14[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list14[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected14" v-on:change="onChangeMission1($event, 14)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected14 > 0 && selected12 == selected14">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <b-form-select v-model="vsselected14" v-on:change="onChangeTeamVsTeam1($event, 14)">
                              <option> </option>
                              <option :value="teamName15"> {{ teamName15 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName14}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center14 variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist14 == false">
                                  <b-button block v-if="disableButton14 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 14)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 14)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                      <br/>

                  </b-col>

              </b-col>

<!-- SIDE B BOX 3 or BOX 15 -->
              <b-col>
              <!-- <br/> -->

                <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked15 }">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">


                        <b-form-input size="md" v-model="teamName15" placeholder="TEAM NAME 6" v-on:change="posttoapi($event, 15)" style="text-transform: uppercase" maxlength="20"></b-form-input>


                      </b-col>
                    </b-row>


                        <div v-if="fetchPlayerList[15] > '0'"  style="height: 440px;border-style: outset;">

                          <draggable id="first" data-source="juju" :list="fetchPlayerList[15].Team_player_sessions" class="list-group" draggable=".item" group="a" 
                          @add="onDrop1AfterReload($event, 15)" @change="deleteTeamPlayerSessionAfterReload1($event, 15)">

                            <div class="list-group-item item" v-for="element in fetchPlayerList[15].Team_player_sessions" :key="element.id">

                              <b-row>
                                    <b-col sm="1">
                                      <!-- <p v-if="element.rfid_id != null && element.rfid_id > 0" style='font-size:17px; color:green;'>&#9989;</p> -->
                                      <p v-if="element.rfid_id > 0 " style='font-size:17px; color:green;'>&#9989;</p>
                                      <p v-else>&#10060;</p>

                                    </b-col>

                                    <b-col sm="8">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.player_count}}
                                    </b-col>

                                  </b-row>

                            </div>
                          </draggable>

                          <draggable>
                              <!-- <transition-group> -->
                                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                                      {{element.Person.first_name}}
                                  </div>
                              <!-- </transition-group> -->
                          </draggable>

                        </div>



                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list15" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1($event, 15, index)" @change="onDropReservation1($event, 15)">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list15" :key="index">

                                  <b-row>

                                    <b-col sm="2">

                                      <p v-if="list15[index].rfidState1 == '' || !list15[index].rfidState1 > '0'">&#10060;</p>
                                      <p v-if="list15[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                    </b-col>

                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.minor_tag}}
                                    </b-col>

                                    <b-col sm="1">
                                      <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                    </b-col>

                                    <b-col sm="1">
                                      {{element.Person.Player.play_count}}
                                    </b-col>


                                  </b-row>
                              </div>
                              </draggable>
                            </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected15" v-on:change="onChangeMission1($event, 15)">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected15 > 0 && selected12 == selected15">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Battle Mode</label>
                          </b-col>
                          <b-col sm="9">

                            <b-form-select v-model="vsselected15" v-on:change="onChangeTeamVsTeam1($event, 15)">
                              <option> </option>
                              <option :value="teamName14"> {{ teamName14 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <br />

                      <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                        <p> You are going to update data for <b> {{teamName15}} </b> </p>
                        <br>

                          <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                        <br>

                      </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                        </b-col>

                          <div style="width: 70%; margin:auto;">
                            <b-row>
                              <b-col>
                                <b-button block v-b-modal.modal-center15 variant="info">Assign RFID</b-button>
                              </b-col>
                              <b-col>
                                <div v-if="removeWaitlist15 == false">
                                  <b-button block v-if="disableButton15 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 15)">Send To Waitlist</b-button>
                                  <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 15)">Remove Waitlist</b-button>
                                </div>
                              </b-col>
                            </b-row>
                          </div>
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
                      <b-form-input size="md" placeholder="TEAM NAME 7"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list8"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 440px; border-style: outset;"
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
                      <label for="input-small">Battle Mode</label>
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
                      <b-form-input size="md" placeholder="TEAM NAME 8"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list9"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 440px; border-style: outset;"
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
                      <label for="input-small">Battle Mode</label>
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
                      <b-form-input size="md" placeholder="TEAM NAME 9"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list10"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 440px; border-style: outset;"
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
                      <label for="input-small">Battle Mode</label>
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
                      <b-form-input size="md" placeholder="TEAM NAME 10"></b-form-input>
                    </b-col>
                  </b-row>

                  <draggable
                      id="first"
                      data-source="juju"
                      :list="list11"
                      class="list-group"
                      draggable=".item"
                      group="a" style="height: 440px; border-style: outset;"
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
                      <label for="input-small">Battle Mode</label>
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
        <b-col lg="3"  style="background-color:#f0f0f0; height: 650px; overflow:scroll;">
          <!-- <b>RESERVATIONS</b> -->

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
                <br>
                <p class="filters">{{reservation.reservation_for | moment}}</p>

                <b v-if="reservation.Booker.Person.last_name == 'undefined'">{{reservation.Booker.Person.first_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}}</b>

                <b v-else>{{reservation.Booker.Person.last_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}}</b>

                <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1"> -->
                <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" @add="getpersonDetails1($event)">
                  <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.id">
                      <!-- <p>{{element.Person.first_name}}  {{ element.Person.last_name }} {{element.Person.minorsymbol}}</p> -->

                      <b-row>
                        <b-col sm="8">
                          <p v-if="element.Person.last_name == 'undefined'"> {{element.Person.first_name}}</p>
                          <p v-else> {{element.Person.first_name}} {{element.Person.last_name}}</p>
                        </b-col>

                        <b-col sm="1">
                          {{element.Person.minorsymbol}}
                        </b-col>

                        <!-- <b-col sm="1">
                          <p v-if="element.Person.Player.bomb_beater == '10'">&#128163;</p>
                        </b-col> -->

                        <!-- <b-col sm="1">
                          {{element.Person.Player.play_count}}
                        </b-col> -->

                      </b-row>

                      <!-- <p>S</p> -->
                  </div>
                </draggable>


                <div slot="footer" class="btn-group list-group-item" role="group" aria-label="Basic example">
                  
                  </div>

              </div>
                
                <!-- </draggable> -->
                <br>
              <!-- </div>   -->
              <!-- </div> -->

              <br>

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
import Vue from 'vue';
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVueIcons)

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
    // console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS);
    
    axios.get(process.env.VUE_APP_DATABASE_MISSION).then(response => (this.missions = response.data ));

    // axios.get(process.env.VUE_APP_DATABASE_PEOPLE).then(response => (this.dataList3 = response.data ));

    /** get all the rfid tag **/
    // axios.get(process.env.VUE_APP_DATABASE_RFIDS).then(response => (this.rfidTagList = response.data ));

    // axios.get(process.env.VUE_APP_DTB_RESERVATIONBYTIME).then(response => (this.reservationNameByTime = response.data));

    axios.get(process.env.VUE_APP_DTB_ORGANIZATION).then(response => (this.organizationList = response.data));

    var currenttime = moment().format('h:mm A');
    // console.log(currenttime);

    const start = moment();
    /** first time case **/
    const remainder1 = -15 - (start.minute() % 30);
    const dateTime1 = moment(start).add(remainder1, "minutes").format(" h:mm a");
    const dateTime1B = moment(start).add(remainder1, "minutes").format(" h:mm a");

    /** second time case **/
    const remainder2 = 0 - (start.minute() % 30);
    const dateTime2 = moment(start).add(remainder2, "minutes").format(" h:mm a");
    const dateTime2A = moment(start).add(remainder2, "minutes").format(" h:mm a");
    const dateTime2B = moment(start).add(remainder2, "minutes").format(" h:mm a");
    // const dateTime1B = moment(start).add(remainder1, "minutes").format(" h:mm a");

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
    this.dateTime1BData = dateTime1B;

    this.dateTime2Data = dateTime2;
    this.dateTime2AData = dateTime2A;
    this.dateTime2BData = dateTime2B;

    this.dateTime2Data = dateTime2;
    this.dateTime2BData = dateTime2;
    this.dateTime3Data = dateTime3;
    this.dateTime4Data = dateTime4;
    this.dateTime5Data = dateTime5;
    this.dateTime6Data = dateTime6;
    console.log(this.dateTime1Data);
    console.log("DATE TIME BOX 1 "+this.dateTime1Data);
    console.log("DATE TIME BOX 2 "+this.dateTime2BData);
    console.log(dateTime1);
    console.log(dateTime3);

    this.sessionRow10DateTime = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD hh:mm:00");
    this.sessionRow11DateTime = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD hh:mm:00");
    console.log(this.sessionRow10DateTime);

    this.sessionRow12DateTime = moment(start).add(remainder2, "minutes").format("YYYY-MM-DD hh:mm:00");
    this.sessionRow13DateTime = moment(start).add(remainder2, "minutes").format("YYYY-MM-DD hh:mm:00");
    console.log(this.sessionRow12DateTime);

    this.sessionRow14DateTime = moment(start).add(remainder3, "minutes").format("YYYY-MM-DD hh:mm:00");
    this.sessionRow15DateTime = moment(start).add(remainder3, "minutes").format("YYYY-MM-DD hh:mm:00");
    console.log(this.sessionRow14DateTime);

    this.sessionRow16DateTime = moment(start).add(remainder4, "minutes").format("YYYY-MM-DD hh:mm:00");
    this.sessionRow17DateTime = moment(start).add(remainder4, "minutes").format("YYYY-MM-DD hh:mm:00");
    console.log(this.sessionRow16DateTime);

    this.sessionRow18DateTime = moment(start).add(remainder5, "minutes").format("YYYY-MM-DD hh:mm:00");
    this.sessionRow19DateTime = moment(start).add(remainder5, "minutes").format("YYYY-MM-DD hh:mm:00");
    console.log(this.sessionRow18DateTime);

    /** Auto Genrate Date / Time based upon totalBoxes define **/
    var totalBoxes = '10';
      var timeUsed = -30;
      console.log('false'+this.loadScreen);
      for(let b=0; b < totalBoxes; b++){

        if (b%2 == 0){
          var x = 10;
          var routeId = '1';
          timeUsed += 15; /** each time its 0 , 2 , 4, 6, 8 on array will add 15 minutes as for the time **/
          console.log(timeUsed);

          const start = moment();
          const remainder1 = timeUsed - (start.minute() % 30);
          const dateTime1 = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a");
          console.log(dateTime1);

          var i = x+b;
          this["sessionRow"+i+"DateTime"] = dateTime1;
          console.log(i);
          // console.log(x+b);
        }
        else{

          var x = 10;
          var i = x+b;

          const start = moment();
          const remainder1 = timeUsed - (start.minute() % 30);
          const dateTime1 = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a");
          console.log(dateTime1);

          var i = x+b;
          var routeId = '2';
          this["sessionRow"+i+"DateTime"] = dateTime1;
        }
      }
    /** END of auto generate date/time based upon box **/

    var starttime='start';
    var endtime='end';
    // var currentdate = moment().subtract(9, 'days').format("YYYY-MM-DD");
    var currentdate = moment().format("YYYY-MM-DD");
    // console.log(currentdate);

    var startReservationTime = moment().subtract(8, 'hours').format('HH:mm:ss');
    var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');

    console.log(startReservationTime);
    console.log(endReservationTime);
    console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);

    // axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T10:00:00'+'/'+endtime+'/'+currentdate+'T23:00:00').then(response => 
    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
      .then(response => 
      {
        console.log(response);
        console.log(response.data);

        for(let i=0; i < response.data.length; i++){
          // console.log("090");
          console.log(i);

          // this.loadScreen = true;

          var booker_last_name = response.data[i].Booker.Person.last_name;
          var booker_first_name = response.data[i].Booker.Person.first_name;
          var booker_id = response.data[i].Booker.Person.id;

          console.log(booker_first_name +' '+ booker_last_name);

          var replyDataObj1 = response.data;
          console.log(replyDataObj1);

          console.log(response.data[i].Reservation_people.length);
          var countReservationList = response.data[i].Reservation_people.length;
          /** if the main booker and person is dragged. The code below dislays the minors later on **/

          if(countReservationList == '0'){

            console.log("check minor now");
            console.log(i);

            if(response.data[i].Reservation_minors.length > '0'){
              console.log("GREATER THAN 0 minors ");
              console.log(i);

              var k = response.data[i].Reservation_people.length;
              var incrementObject = k++;
              console.log(incrementObject);

              for(let j=0; j < response.data[i].Reservation_minors.length; j++){
                console.log("TERRR");
                console.log(j);

                var minorReservationsMinorId = response.data[i].Reservation_minors[j].id;
                var minorPlayerMinorId = response.data[i].Reservation_minors[j].Player_minor.id;
                var personSignedWaiverId = response.data[i].Reservation_minors[j].Player_minor.player_id;
                var minorReservationID = response.data[i].Reservation_minors[j].reservation_id;

                var minorLastName = response.data[i].Reservation_minors[j].Player_minor.last_name;
                var minorFirstName = response.data[i].Reservation_minors[j].Player_minor.first_name;

                var missionName = response.data[0].Mission.name;
                var missionId = response.data[0].Mission.id;

                console.log(minorLastName+' '+minorFirstName);
                console.log("RESERVATION ID SOLTA "+minorReservationID);

                var countReservationPeople = response.data[i].Reservation_people.length;
                var incrementObject = countReservationPeople++;
                console.log(incrementObject);

                replyDataObj1[i]['Reservation_people'][incrementObject]={
                   // "id" : booker_id,
                   "person_id": minorPlayerMinorId,
                   "id": minorReservationsMinorId,
                   "Person":
                      {
                        "Player":{
                          "id" : minorReservationsMinorId,
                          "minor": 'yes'
                        },
                        "first_name" : minorFirstName,
                        "last_name" : minorLastName,
                        "person_id" : minorPlayerMinorId,
                        "minor" : 'yes',
                        "minorsymbol" : 'M',
                        "player_id" : personSignedWaiverId,
                        "reservation_id": minorReservationID,
                        "mission_name" : missionName,
                        "mission_id" : missionId,
                        "Bookerdetail":{
                          "id" : booker_id, /** this is the person id for the booker **/
                          "firstName" : booker_first_name,
                          "lastName" : booker_last_name
                        }
                    }

                  }

                  this.teamByTime2 = replyDataObj1;
                      console.log(replyDataObj1);

              }

            } 

            /** end of DISPLAY MINORS after PERSON DRAGGED SCENARION **/

            else{
              console.log("NOT ONLY MINORS");
            }

          }

          else{
            console.log("conisistsss s ssssssssssssssssssssssssssss");
            
                for(let i=0; i < response.data.length; i++){

                  console.log(i);
                  console.log(response.data[i].Reservation_people.length);

                  var booker_last_name = response.data[i].Booker.Person.last_name;
                  var booker_first_name = response.data[i].Booker.Person.first_name;
                  var booker_id = response.data[i].Booker.Person.id;

                  console.log(booker_last_name);

                  for(let j=0; j < response.data[i].Reservation_people.length; j++){

                    console.log(i);
                    console.log(j);

                    replyDataObj1[i]['Reservation_people'][j]['Person']['Bookerdetail']={
                       // "address": [
                       //   ccEmailId
                       //  ]
                       "id" : booker_id, /** this is the person id for the booker **/
                       "firstName" : booker_first_name,
                       "lastName" : booker_last_name
                    }

                  this.teamByTime2 = replyDataObj1;
                  console.log(replyDataObj1);

                  
                      


                }
              }


              if(response.data[i].Reservation_minors.length > '0'){
                  console.log("GREATER THAN 0 minors 000000000000000 ");
                  console.log(i);
                  // console.log(j);


                  for(let j=0; j < response.data[i].Reservation_minors.length; j++){

                    console.log(response.data[i].Reservation_minors.length);

                    var countReservationPeople1 = response.data[i].Reservation_people.length;
                    var incrementObject = countReservationPeople1++;
                    console.log(incrementObject);

                    console.log("Troo oooooo");
                    console.log(j);
                    console.log(i);

                    var minorReservationsMinorId = response.data[i].Reservation_minors[j].id;
                    console.log(minorReservationsMinorId);

                    console.log(response.data[i]);

                    var minorPlayerMinorId = response.data[i].Reservation_minors[j].Player_minor.id;
                    console.log(minorPlayerMinorId);

                    var personSignedWaiverId = response.data[i].Reservation_minors[j].Player_minor.player_id;
                    console.log(personSignedWaiverId);

                    var minorLastName = response.data[i].Reservation_minors[j].Player_minor.last_name;
                    var minorFirstName = response.data[i].Reservation_minors[j].Player_minor.first_name;

                    var missionName = response.data[0].Mission.name;
                    var missionId = response.data[0].Mission.id;

                    var reservationID = response.data[i].Reservation_minors[j].reservation_id;
                    console.log(reservationID);

                    console.log(minorLastName+' '+minorFirstName);
                    

                    replyDataObj1[i]['Reservation_people'][incrementObject]={
                       // "id" : booker_id,
                       "person_id": minorPlayerMinorId,
                       "id": minorReservationsMinorId,
                       "Person":
                          {
                            "Player":{
                              "id" : minorReservationsMinorId,
                              "minor": 'yes'
                            },
                            "first_name" : minorFirstName,
                            "last_name" : minorLastName,
                            "person_id" : minorPlayerMinorId,
                            "minor" : 'yes',
                            "minorsymbol" : 'M',
                            "player_id" : personSignedWaiverId,
                            "reservation_id": reservationID,
                            "mission_name" : missionName,
                            "mission_id" : missionId,
                            "Bookerdetail":{
                              "id" : booker_id, /** this is the person id for the booker **/
                              "firstName" : booker_first_name,
                              "lastName" : booker_last_name
                            }
                        }

                      }

                      this.teamByTime2 = replyDataObj1;
                      console.log(replyDataObj1);
                      

                  }

                } 

                /** end of DISPLAY MINORS after PERSON DRAGGED SCENARION **/

                else{
                  console.log("NOT ONLY MINORS");
                }

            // this.loadScreen = false;

          }


        }


        /** this is the function that gets the latest time at top **/
        //  this.teamByTime2.sort(function(a,b){
        //   return -1;
        //   console.log(" PO PE YE");
        // })

        /** end of the latest time at top **/

        // this.teamByTime2 = replyDataObj1;
        //               console.log(replyDataObj1);

      })
      .catch(function (error){
        // console.log("error at line 1789");
        console.log(error);
      });


    // var sideA1route='1';
    // var sideA1time= '2020-06-03%2004:13:42.000000';

    // console.log(sideA1time);
    // console.log(moment().format('YYYY-MM-DD')+'%20'+dateTime1);

    if(dateTime1 != null){

      // console.log(dateTime1);
      // const remainderRoute1 = -15 - (start.minute() % 30);
      // console.log(remainderRoute1);
      // const routeDateTime = moment(start).add(remainderRoute1, "minutes").subtract(5,'hours').format("HH:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      // const routeDateTime = moment(start).add(remainderRoute1, "minutes").format("h:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      // console.log(routeDateTime);

      // var sideA1route='1';
      // var sideA1time = moment().format('YYYY-MM-DD')+'%20'+routeDateTime;

      var totalBoxes = '10';
      
      var timeUsed = -30;
      // var timeUsed = -15;

      // this.loadScreen = true;

      console.log('false'+this.loadScreen);

      // setTimeout(() => this.loadScreen = false, 5000);


      for(let b=0; b < totalBoxes; b++){

        if (b%2 == 0){
          var routeId = '1';
          timeUsed += 15; /** each time its 0 , 2 , 4, 6, 8 on array will add 15 minutes as for the time **/
          console.log("B EVEN "+b);
        }
        else{
          var routeId = '2';
        }

        // if (b % 2 == 0){
        //   console.log("B EVEN "+b);
        // }


        const remainderRoute1 = timeUsed - (start.minute() % 30);
        const routeDateTime = moment(start).add(remainderRoute1, "minutes").format("HH:mm:00");
        var boxTime = moment().format('YYYY-MM-DD')+'%20'+routeDateTime;

        console.log(boxTime);
        console.log(routeId);

        var replyDataObj1 = b;

          replyDataObj1={
            // "first_name": b,
            "route_id" : routeId,
            "team_drag_time" : boxTime
          }

        console.log("VALUE FOR B OUTSIDE "+b);

        // console.log(replyDataObj1);

        this.toListFetchRouteA1 = replyDataObj1;

        console.log(this.toListFetchRouteA1);

        // console.log("B "+b+" Route "+routeId+" Box Time "+boxTime);

        // this.fetchPlayerList.push(this.toListFetchRouteA1);

        // console.log(this.fetchPlayerList);

        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId)
        .then(response => {
                        console.log("B "+b+" Route "+routeId+" Box Time "+boxTime);
                        console.log(response);
                        console.log(response.data);
              })
        .catch(function (error) {
                        console.log(error);
                      });

        
        // console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId);

        // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId)
        // .then(response => {
        //                 console.log(response);

        //                 this.onDrop1FunctionLoaded = response.data.length;
        //                 console.log(this.onDrop1FunctionLoaded);

        //                 if(response.data.length > 0){
        //                   console.log("greater than 0" + b);

        //                   var teamNumber = b+10;
        //                   this['teamName'+teamNumber] = response.data[0].Team.name; /** [0] in this case as its define using single objects **/
        //                   this['selected'+teamNumber] = response.data[0].mission_id;

        //                   this.sideA1BookerNameFetched = response.data[0].Reservation.Booker.Person.first_name +' '+ response.data[0].Reservation.Booker.Person.last_name;

        //                   console.log(response.data[0]);

        //                   // this.toListFetchRouteA1 = response.data[0];

        //                   var trackId = response.data[0].id;
        //                   console.log(trackId);

        //                   // console.log(this.toListFetchRouteA1);
                          
        //                   var replyDataObj3 = response.data[0];
        //                   var replyDataObj2 = response.data[0];

        //                   for(let i=0; i < response.data[0].Team_player_sessions.length; i++){

                            
        //                     console.log(i);
        //                     console.log(response.data[0]);
        //                     var ifPlayerMinor = response.data[0].Team_player_sessions[i].player_minor_id;

        //                     console.log(" IN SID EEEEE ");


        //                     if(response.data[0].Team_player_sessions[i].Player.Person.id > 0){

        //                       for(let j=0; j < response.data[0].Team_player_sessions.length; j++){
        //                         console.log("S ABA BA BAB ");

        //                         console.log(response.data[0]);
        //                         console.log(response.data[0].Team_player_sessions);
        //                         console.log(response.data[0].reservation_id);
        //                         console.log(i);

        //                         if(response.data[0].Team_player_sessions[j].Player_minor == null){
        //                           console.log("IT WAS NULL");

        //                           var playerLastName = response.data[0].Team_player_sessions[j].Player.Person.last_name;
        //                           var playerFirstName = response.data[0].Team_player_sessions[j].Player.Person.first_name;
        //                           var playerId = response.data[0].Team_player_sessions[j].Player.Person.id;
        //                           var playerReservationID = response.data[0].reservation_id;
        //                           var player_id = response.data[0].Team_player_sessions[j].Player.id;
        //                           var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;

        //                           var bombBeater = response.data[0].Team_player_sessions[j].Player.bomb_beater;
        //                           var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

        //                           console.log(bombBeater);
        //                           console.log(playerCount);

        //                           // this.teamName[] = response.data[0].Team.name;
        //                           // console.log(teamNameFetched);

        //                           console.log(playerLastName);
        //                           console.log(playerFirstName);
        //                           console.log(playerId);
                                  
        //                           console.log(b+" that was B id");

        //                           replyDataObj3['Team_player_sessions'][j]['Person']={
        //                            "first_name": playerFirstName,
        //                            "last_name": playerLastName,
        //                            "id": playerId,
        //                            "reservation_id": playerReservationID,
        //                            "player_id": player_id,
        //                            "team_player_session": teamPlayerSessionId,
        //                            "Player":{
        //                             "bomb_beater": bombBeater,
        //                             "player_count": playerCount
        //                            }
        //                           }

        //                           console.log("90909090909990909");
        //                           console.log(replyDataObj1);

        //                           this.toListFetchRouteA1 = replyDataObj3;


        //                           var replyDataObj2 = response.data[0].Team_player_sessions[j].Person.team_player_session;
        //                           console.log(replyDataObj2);

        //                           replyDataObj2={
        //                            "team_player_session": teamPlayerSessionId
        //                           }
        //                           this.tolist2TPSafterReload = replyDataObj2;


        //                           var teamNameFetched = response.data[0].Team.name;
        //                           var teamIdFetch = response.data[0].Team.id;
        //                           var selectFetched = response.data[0].mission_id;

        //                           var teamObjectId = b+10;
        //                           console.log(teamObjectId);
        //                           console.log(selectFetched);
        //                           // var defineTeam = 'teamName'+teamObjectId;
        //                           // console.log(defineTeam);
        //                           // console.log(teamObjectId);

        //                           // this.(defineTeam) = teamNameFetched;
        //                           // this.teamName1 = response.data[0].Team.name;
        //                           // this.teamIdSideA1 = response.data[0].Team.id;
        //                           // this.selected1 = response.data[0].mission_id;
        //                           this["teamName"+teamObjectId] = teamNameFetched;
        //                           this["selected"+teamObjectId] = selectFetched; /** this passes the value of mission to selected(COLVALUE) **/
        //                           this["vsselected"+teamObjectId] = teamNameFetched;

        //                           this["arrived"+teamObjectId] = arrivedValue;

        //                           if(response.data[0].Team_player_sessions[j].Rfid > '0'){
        //                             this['removeWaitlist'+teamObjectId] = true;
        //                             this["sendToWishlistClicked"+teamObjectId] = true;
        //                           }
        //                           else{
        //                             this['disableButton'+teamObjectId] = false;
        //                           }

        //                           // var useThisObject = 10+teamObjectId;

        //                           // console.log(this["fetchPlayerList"+useThisObject]);

        //                         }

        //                         else{
        //                           console.log(" P OPO PO PO NULL");
        //                           console.log(response.data[0]);

        //                           var minorLastName = response.data[0].Team_player_sessions[j].Player_minor.last_name;
        //                           var minorFirstName = response.data[0].Team_player_sessions[j].Player_minor.first_name;
        //                           var minorPersonId = response.data[0].Team_player_sessions[j].Player_minor.id;
        //                           var minorPlayerSignedWaiverid = response.data[0].Team_player_sessions[j].Player_minor.player_id;
        //                           var playerReservationID = response.data[0].reservation_id;
        //                           var player_id = response.data[0].Team_player_sessions[j].Player.id;
        //                           var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;
        //                           var SessionId = response.data[0].Team_player_sessions[j].session_id;

        //                           // var bombBeater = response.data[0].Team_player_sessions[j].Player.bomb_beater;
        //                           // var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

        //                           console.log(minorFirstName + ' ' + minorLastName);
        //                           console.log(minorPersonId);
        //                           console.log(minorPlayerSignedWaiverid);

        //                           replyDataObj3['Team_player_sessions'][i]['Person']={
        //                              "first_name": minorFirstName,
        //                              "last_name": minorLastName,
        //                              "id": minorPersonId,
        //                              "minor_tag": 'M',
        //                              "reservation_id": playerReservationID,
        //                              "player_id": player_id,
        //                              "team_player_session": teamPlayerSessionId,
        //                              "Player":{
        //                               "minor_tag": 'M',
        //                               "bomb_beater": 1,
        //                               "player_count": 1
        //                              }
        //                           }

        //                           this.toListFetchRouteA1 = replyDataObj3;
                                  
        //                            var replyDataObj2 = response.data[0].Team_player_sessions[j].id;
        //                            console.log(replyDataObj2);

        //                           replyDataObj2={
        //                            "team_player_session": teamPlayerSessionId
        //                           }
        //                           this.tolist2TPSafterReload = replyDataObj2;

        //                           var teamNameFetched = response.data[0].Team.name;
        //                           var teamIdFetch = response.data[0].Team.id;
        //                           var selectFetched = response.data[0].mission_id;
        //                           var arrivedValue = response.data[0].active;

        //                           console.log(response.data[0]);
        //                           console.log(arrivedValue);


        //                           var teamObjectId = b+10;
        //                           console.log(teamObjectId);
        //                           // var defineTeam = 'teamName'+teamObjectId;
        //                           // console.log(defineTeam);
        //                           // console.log(teamObjectId);

        //                           // this.(defineTeam) = teamNameFetched;
        //                           // this.teamName1 = response.data[0].Team.name;
        //                           // this.teamIdSideA1 = response.data[0].Team.id;
        //                           // this.selected1 = response.data[0].mission_id;
        //                           this["list"+teamObjectId+"sessionid"] = SessionId;
        //                           this["teamName"+teamObjectId] = teamNameFetched;
        //                           this["teamIdBox"+teamObjectId] = teamIdFetch;
        //                           this["selected"+teamObjectId] = selectFetched;
        //                           this["vsselected"+teamObjectId] = teamNameFetched;

        //                           this["arrived"+teamObjectId] = arrivedValue;

        //                           // if(arrivedValue == '1'){
        //                           //   this['removeWaitlist'+teamObjectId] = true;
        //                           //   this["sendToWishlistClicked"+teamObjectId] = true;
        //                           // }
        //                           // else{
        //                           //   this['disableButton'+teamObjectId] = true;
        //                           // }

        //                           if(response.data[0].Team_player_sessions[j].Rfid > '0'){
        //                             this['removeWaitlist'+teamObjectId] = true;
        //                             this["sendToWishlistClicked"+teamObjectId] = true;
        //                           }
        //                           else{
        //                             this['disableButton'+teamObjectId] = false;
        //                           }

        //                         }

        //                       }

        //                     }

                          

        //                   }

        //                   // if (trackId > 0) { 
                            
        //                       this.fetchPlayerList.push(this.toListFetchRouteA1);

        //                       // console.log("SAAAAAAA");
        //                   // }

        //               }

        //                 else{
        //                   console.log("less");
        //                 }

                      
        //               })

        //               .catch(function (error) {
        //                 console.log(error);
        //               });
      }

      
      // this.loadScreen = false;

    }

  },

  data() {
      return {

        draggedItemObjectId: '',

        loadScreen: false,

        checkReader:'',
        draggedTeamPlayerSessionId:'',
        // teamIdSideA1: '',
        // teamIdSideB1: '',
        // teamIdSideA2: '',
        // teamIdSideB2: '',

        teamIdBox1: '',
        teamIdBox2: '',

        myArray: [],
        myArray2:[],
        myArray3:[],
        myArray4:[],


        sideB1BookerNameFetched:'',
        sideA1BookerNameFetched:'',
        sideA2BookerNameFetched:'',
        sideB2BookerNameFetched:'',

        sessionRow1DateTime:'',
        sessionRow2DateTime:'',
        sessionRow3DateTime:'',
        sessionRow4DateTime:'',

        list: [],

        list2:[], /** this grabs the player names for side A first form */

        list4:[],
        list5:[],
        list6:[],
        list7:[],
        list8:[],
        list9:[],
        // list10:[],
        // list11:[],

        // isChanged:false,

        timeListText:'Time',
        toListFetchRouteA1:'',
        fetchPlayerList:[],

        toListFetchRouteB1:'',
        fetchPlayerList2:[],
        dateTime1BData: '',

        toListFetchRouteA2:'',
        fetchPlayerList3:[],
        dateTime2AData: '',

        toListFetchRouteB4:'',
        fetchPlayerList4:[],
        dateTime2BData: '',

        teamByTime2FormattedTime:[],

        list2SelectedPlayerId:'',

        list2sessionid: '', /* this submits the session id as an variable to update rfid reader **/
        list2teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
        tolist2teamplayersessionid: '',
        list2rfidcontainerarray: [],
        list2rfidcontainer: '',


        tolist2TPSafterReload:'',
        list2TPSafterReload: [],

        activeBtn:'',


        countfunction: '0',
        countfunction2: '0',
        countfunction3: '0',
        countfunction4: '0',

        playerSessionDetail2:'',

        playerCheckList2:[], /** this saves dragged item from main div **/

        missions:[],
        filterPlayerId1:[],

        lastTeamIdOne: [],
        lastTeamIdTwo: [],
        lastTeamIdThree: [],
        lastTeamIdFour: [],

        onDrop1FunctionLoaded: '0',
        onDrop2FunctionLoaded:'0',
        onDrop3FunctionLoaded:'0',
        onDrop4FunctionLoaded:'0',

        onDrop1FuntionAfterReload: '0',
        onDrop2FuntionAfterReload: '0',
        onDrop3FuntionAfterReload: '0',
        onDrop4FuntionAfterReload: '0',
        // reservationNameByTime: [],

        teamName10: '',
        teamName11: '',
        teamName12: '',
        teamName13: '',
        teamName14: '',
        teamName15: '',
        teamName16: '',
        teamName17: '',
        teamName18: '',
        teamName19: '',
        teamName20: '',

        teamname10id:'',
        teamname11id:'',
        teamname12id:'',
        teamname13id:'',
        teamname14id:'',
        teamname15id:'',
        teamname16id:'',
        teamname17id:'',
        teamname18id:'',
        teamname19id:'',
        teamname20id:'',

        teamIdSide10:'',
        teamIdSide11:'',
        teamIdSide12:'',
        teamIdSide13:'',
        teamIdSide14:'',
        teamIdSide15:'',
        teamIdSide16:'',
        teamIdSide17:'',
        teamIdSide18:'',
        teamIdSide19:'',
        teamIdSide20:'',

        onDrop10FunctionLoaded:'',
        onDrop11FunctionLoaded:'',
        onDrop12FunctionLoaded:'',
        onDrop13FunctionLoaded:'',
        onDrop14FunctionLoaded:'',
        onDrop15FunctionLoaded:'',
        onDrop16FunctionLoaded:'',
        onDrop17FunctionLoaded:'',
        onDrop18FunctionLoaded:'',
        onDrop19FunctionLoaded:'',
        onDrop20FunctionLoaded:'',

        list10:[],
        list11:[],
        list12:[],
        list13:[],
        list14:[],
        list15:[],
        list16:[],
        list17:[],
        list18:[],
        list19:[],
        list20:[],

        list10sessionid:'',
        list11sessionid:'',
        list12sessionid:'',
        list13sessionid:'',
        list14sessionid:'',
        list15sessionid:'',
        list16sessionid:'',
        list17sessionid:'',
        list18sessionid:'',
        list19sessionid:'',
        list20sessionid:'',

        list10teamplayersessionid: [],
        list11teamplayersessionid: [],
        list12teamplayersessionid: [],
        list13teamplayersessionid: [],
        list14teamplayersessionid: [],
        list15teamplayersessionid: [],
        list16teamplayersessionid: [],
        list17teamplayersessionid: [],
        list18teamplayersessionid: [],
        list19teamplayersessionid: [],
        list20teamplayersessionid: [],

        tolist10teamplayersessionid: '',
        tolist11teamplayersessionid: '',
        tolist12teamplayersessionid: '',
        tolist13teamplayersessionid: '',
        tolist14teamplayersessionid: '',
        tolist15teamplayersessionid: '',
        tolist16teamplayersessionid: '',
        tolist17teamplayersessionid: '',
        tolist18teamplayersessionid: '',
        tolist19teamplayersessionid: '',
        tolist20teamplayersessionid: '',

        playerSessionDetail10:'',
        playerSessionDetail11:'',
        playerSessionDetail12:'',
        playerSessionDetail13:'',
        playerSessionDetail14:'',
        playerSessionDetail15:'',
        playerSessionDetail16:'',
        playerSessionDetail17:'',
        playerSessionDetail18:'',
        playerSessionDetail19:'',
        playerSessionDetail20:'',

        sessionRow10DateTime:'',
        sessionRow11DateTime:'',
        sessionRow12DateTime:'',
        sessionRow13DateTime:'',
        sessionRow14DateTime:'',
        sessionRow15DateTime:'',
        sessionRow16DateTime:'',
        sessionRow17DateTime:'',
        sessionRow18DateTime:'',
        sessionRow19DateTime:'',
        sessionRow20DateTime:'',

        selected10: '',
        selected11: '',
        selected12: '',
        selected13: '',
        selected14: '',
        selected15: '',
        selected16: '',
        selected17: '',
        selected18: '',
        selected19: '',
        selected20: '',

        disableButton10: false,
        disableButton11: false,
        disableButton12: false,
        disableButton13: false,
        disableButton14: false,
        disableButton15: false,
        disableButton16: false,
        disableButton17: false,
        disableButton18: false,
        disableButton19: false,
        disableButton20: false,

        removeWaitlist10: false,
        removeWaitlist11: false,
        removeWaitlist12: false,
        removeWaitlist13: false,
        removeWaitlist14: false,
        removeWaitlist15: false,
        removeWaitlist16: false,
        removeWaitlist17: false,
        removeWaitlist18: false,
        removeWaitlist19: false,
        removeWaitlist20: false,

        sendToWishlistClicked10: false,
        sendToWishlistClicked11: false,
        sendToWishlistClicked12: false,
        sendToWishlistClicked13: false,
        sendToWishlistClicked14: false,
        sendToWishlistClicked15: false,
        sendToWishlistClicked16: false,
        sendToWishlistClicked17: false,
        sendToWishlistClicked18: false,
        sendToWishlistClicked19: false,
        sendToWishlistClicked20: false,

        arrived10: '',
        arrived11: '',
        arrived12: '',
        arrived13: '',
        arrived14: '',
        arrived15: '',
        arrived16: '',
        arrived17: '',
        arrived18: '',
        arrived19: '',
        arrived20: '',

        reservationTime1: '',
        playing1: '',
        vs1:'',
        // selected1: null,
        missionSideA1:'',
        reservationNameDragged1: '',

        delTeamPlayerSessionId1: '',

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


        /** this is for the first form list side A 2 **/

          reservationTime3:'',
          teamName3:'',
          teamname3id:'',
          allTeamList3:[],
          countfunction3:'0',
          onDrop3FunctionLoaded:'0',
          /** this is for the draggable events **/

          teamname5id: '',
          list5sessionid:'',
          list5teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
          tolist5teamplayersessionid: '',
          toListFetchRouteA3: '',
          /** end of draggable event for side A 2 **/

          /** this updates rfid reader for side A 2 **/
          playerCheckListSideB1:[],
          list5rfidcontainerarray: [],
          list5rfidcontainer: '',
          playerSessionDetail5: '',

          /** end of rfid reader updates for side A 2 **/

          /** this for pre select down for side A 2 **/
          selected3: null,
          missions3:[],
          dateTime2AData:'',
          /** end of pre select dropdown for game name **/

        /** end of objects for second form list side A 2 **/


        /** this is for the second row second column SIDE B 2 **/
          reservationTime4:'',
          teamName4:'',
          teamname4id:'',
          allTeamList4:[],
          countfunction4:'0',
          onDrop4FunctionLoaded:'0',
          /** this is for the draggable events **/

          // teamname4id: '',
          list6sessionid:'',
          list6teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
          tolist6teamplayersessionid: '',
          toListFetchRouteA4: '',
          /** end of draggable event for side A 2 **/

          /** this updates rfid reader for side A 2 **/
          playerCheckListSideB2:[],
          list6rfidcontainerarray: [],
          list6rfidcontainer: '',
          playerSessionDetail6: '',

          /** end of rfid reader updates for side A 2 **/

          /** this for pre select down for side A 2 **/
          selected4: null,
          missions4:[],
          dateTime2BData:'',
          /** end of pre select dropdown for game name **/

        /** END OF SIDE B 2 **/


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
        organizationList: [],
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
        // selected3: '',
        selected4: '',
        selected5: '',
        selected6: '',
        selected7: '',
        selected8: '',
        selected9: '',
        // selected10: '',
        // selected6: '',

        vsselected3: null,
        vsselected4: null,
        vsselected5: null,
        vsselected6: null,
        vsselected7: null,
        vsselected8: '',
        vsselected9: '',

        vsselected10: null,
        vsselected11: null,
        vsselected12: null,
        vsselected13: null,
        vsselected14: '',
        vsselected15: '',
        vsselected16: '',
        vsselected17: '',
        vsselected18: '',
        vsselected19: '',

        teamvsteamBoolen10: false,
        teamvsteamBoolen11: false,
        teamvsteamBoolen12: false,
        teamvsteamBoolen13: false,
        teamvsteamBoolen14: false,
        teamvsteamBoolen15: false,
        teamvsteamBoolen16: false,
        teamvsteamBoolen17: false,
        teamvsteamBoolen18: false,
        teamvsteamBoolen19: false,

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
        // teamname1id:'',
        /*end of team name id after post */

        /* gets the session id once the team name is inserted */
        // playerSessionDetail1:[],
        playerSessionDetail2:[],
        playerSessionDetail3:[],
        playerSessionDetail4:[]
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

      activateTeam(event, value){
        console.log("team activated");
        console.log(value);

        console.log(this["list"+value+"sessionid"]);

        var sessionid = this["list"+value+"sessionid"];

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
          active: 1
        })
        .then(response => {
          console.log(response);
          this["sendToWishlistClicked"+value] = true;
          this["removeWaitlist"+value] = true;
        })
        .catch(function (error) {
          console.log(error);
        });


      },

      removeWaitingList(event, value){

        var sessionid = this["list"+value+"sessionid"];

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
          active: 0
        })
        .then(response => {
          console.log(response);
          this["sendToWishlistClicked"+value] = false;
          this["removeWaitlist"+value] = false;
          this["disableButton"+value] = true;
        })
        .catch(function (error) {
          console.log(error);
        });


      },

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

      hideModalRfidClicked(event, colvalue) {
        console.log(event);
        console.log(colvalue);
        this.$refs['sideRfidUpdate'+colvalue].hide()
      },

      // hideModalRfidClicked2() {
      //   this.$refs['sideRfidUpdate2'].hide()
      // },


      // hideModalRfidClickedSideB1() {
      //   this.$refs['sideB1rfidModalUpdate'].hide()
      // },

      // hideModalRfidClickedSideB1_2() {
      //   this.$refs['sideB1rfidModalUpdate2'].hide()
      // },

      // hideModalRfidClickedSideA2() {
      //   this.$refs['sideA2rfidModalUpdate'].hide()
      // },


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

      focusOutPostRfid(e){
        console.log('inside focus out');
        console.log('blur', e.target.value);
      },

      posttorfidapiAfterReload(event, col , index){
        console.log(event);
        console.log(col);
        console.log(index);

        if(event.length > 7){

        // console.log("inside update rfid side A after reload");
        console.log(event);
         var arr = this.fetchPlayerList[col];

         console.log(this.fetchPlayerList[col].Team_player_sessions[index].id);

         var number = this.countfunction++;

          console.log(number);
          

          var rfid_tag = event;
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            console.log(response);
            console.log(response.data[0].id);

            this.fetchPlayerList[col].Team_player_sessions[index].rfid_id = response.data[0].id; /** this will convert the RED CROSS SIGN into GREEN CHECKMARK AS
            the RFID_ID value will be added to fetchPlayerList depending on col and index of the column **/

              var rfidtag_id = response.data[0].id;

              var updateOnTPS = this.fetchPlayerList[col].Team_player_sessions[index].id;

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                      // player_id: playerid,
                      rfid_id: rfidtag_id
                    })
                      .then(function (response) {
                        console.log(response);

                        // this.fetchPlayerList[col].Team_player_sessions[index].rfid_id = rfidtag_id;
                        // console.log("papa");
                        // this.list2teamplayersessionid = response.data[0].id;
                      })

                      .catch(function (error) {
                        console.log(error);
                });


            })

            /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });

          const nextIndex = index + 1;
          console.log(nextIndex);
          // console.log(this.list2.length);

          
          this.$refs.todosAfterReload[nextIndex].focus();
          console.log("SWITH TO NEXT");
        
        }

      },

      deleteRfidBeforeReload(event, index , col){

        console.log(event);
        console.log(index);
        console.log(col);

        this["list"+col][index].rfidState1 = ''; /** this will make input field blank on UI part **/

        this["disableButton"+col] = false; /** this will disable the SEND TO WAITLIST BUTTON **/

        var teamPlayerSessionId = this["list"+col+"teamplayersessionid"][index];


        axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerSessionId,{
          rfid_id: ''
        })
        .then(function (response) {
          console.log(response);
          // this["list"+col][index].rfidState1 = ''; 
        })
        .catch(function (error) {
          console.log(error);
        });

      },

      deleterfidonclick(event, col, index){
        console.log(event);
        console.log(index);

        console.log("delete rfid side A after reload");

         var arr = this.fetchPlayerList[col];

         // var number = this.countfunction++;

              var updateOnTPS = this.fetchPlayerList[col].Team_player_sessions[index].id;

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                      // player_id: playerid,
                      rfid_id: 0
                    })
                      .then(function (response) {
                        console.log(response);

                        // console.log("papa");
                        // this.list2teamplayersessionid = response.data[0].id;
                      })

                      .catch(function (error) {
                        console.log(error);
                });

            this.fetchPlayerList[col].Team_player_sessions[index].rfid_id = 0; /** this will convert the RED CROSS SIGN into GREEN CHECKMARK AS
            the RFID_ID value will be added to fetchPlayerList depending on col and index of the column **/
        
        },

      posttorfidapiAfterReload2(event, index){

        if(event.length > 7){

         var arr = this.toListFetchRouteB1;


         var number = this.countfunction2++;

          var rfid_tag = event;
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {

              var rfidtag_id = response.data[0].id;

              var updateOnTPS = this.toListFetchRouteB1.Team_player_sessions[index].id;

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                      // player_id: playerid,
                      rfid_id: rfidtag_id
                    })
                      .then(function (response) {
                        console.log(response);
                      })

                      .catch(function (error) {
                        console.log(error);
                });


            })

            /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });

          const nextIndex = index + 1;
          
          this.$refs.todosAfterReload2[nextIndex].focus();    
        }

      },

      posttorfidapi(event, col, index){

        // console.log(event);
        // console.log(col);
        // console.log(index);

        // var defineListNumber = 12 - col ; /** this defines the column as list2, list4 and list5. As the first box is list2 and second is suppose to be list3 **/

        // console.log(defineListNumber);
        // var listNumberPositive = Math.abs(defineListNumber);
        // console.log(listNumberPositive);

        // console.log(this["list"+col]);

        if(event.length > 7){

        // console.log("inside update rfid side A");
        // console.log(event);
         // var arr = this["list"+col];

         // console.log(this.list2);

         var number = this.countfunction++;
         // console.log(this["list"+col][index]);

         // console.log(this["list"+col][index].rfidState1);

          var rfid_tag = this["list"+col][index].rfidState1;

          // console.log(arr);
          // console.log(index);
          // console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            console.log(response.data[0].id);
            this["list"+col+"rfidcontainer"] = response.data[0].id;

            var rfidtag_id = response.data[0].id;

            var updateOnTPS = this["list"+col+"teamplayersessionid"][index];

            axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                      // player_id: playerid,
                      rfid_id: rfidtag_id
                    })
                      .then(function (response) {
                        console.log(response);
                        // console.log("papa");
                        // this.list2teamplayersessionid = response.data[0].id;
                      })

                      .catch(function (error) {
                        console.log(error);
                });

            })

            /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });

          var totalPlayers = this["list"+col].length;
          console.log(totalPlayers);
          // if()
          // if(this.list10[index].rfidState1 == '' || !this.list10[index].rfidState1 > '0')
          for(var i=0; i < totalPlayers; i++){
            if(this["list"+col][i].rfidState1 == ''){
              this["disableButton"+col] = false;
              break;
            }
            else{

              if(this["list"+col][i].rfidState1 > '0'){
                this["disableButton"+col] = true;
              }
              else{
                this["disableButton"+col] = false;
                break;
              }

            }
          }


          // console.log(event);
          // console.log(event.length);

          const nextIndex = index + 1;
          // console.log(nextIndex);
          // console.log(this.list2.length);

          
            this.$refs.todos[nextIndex].focus();
            // console.log("SWITH TO NEXT");


        }

        else{
          console.log("RFID TAG WAS LESS THAN 8 characters");
        }

      },

      posttorfidapi2(event, index){
   
         if(event.length > 7){
            console.log(event);
             var arr = this.list4;

             var number = this.countfunction2++;

              var rfid_tag = this.list4[number].rfidState2;

              axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
                tag: rfid_tag,
              })
              .then(response => {

                console.log(response.data[0].id);
                var rfidtag_id = response.data[0].id;

                var updateOnTPS = this.list4teamplayersessionid[index];
                console.log(updateOnTPS);

                axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                          rfid_id: rfidtag_id
                        })
                          .then(function (response) {
                            console.log(response);
                        })

                          .catch(function (error) {
                            console.log(error);
                    });
              })

               /** end of rfid update to team player session table **/
              .catch(function (error) {
                console.log(error);
              });

              const nextIndex = index + 1;

              this.$refs.todos2[nextIndex].focus();

        }
        else{
          console.log("RFID TAG WAS LESS THAN 8 characters");
        }

      },

      posttorfidapi3(event, index){

        if(event.length > 7){

          console.log("inside update rfid side A 2");
          console.log(event);
           var arr = this.list5;

           console.log(this.list5);

           var number = this.countfunction3++;

           console.log(this.list4[number].rfidState1);

            var rfid_tag = this.list4[number].rfidState1;

            console.log(arr);
            console.log(number);
            console.log(rfid_tag);

            axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
              tag: rfid_tag,
            })
            .then(response => {
              console.log(response.data[0].id);
              this.list5rfidcontainer  = response.data[0].id;

              this.list5rfidcontainer = response.data[0].id;

                    if (this.list5rfidcontainer > 0) { 
                          this.list5rfidcontainerarray.push(this.list5rfidcontainer);
                      }
              })

              /** end of rfid update to team player session table **/
            .catch(function (error) {
              console.log(error);
            });



            // const nextIndex = index + 1;
            // if (nextIndex < this.list4.length && rfid_tag.length > 7) {
            //   this.$refs.todos[nextIndex].focus()
            // }

            const nextIndex = index + 1;
            console.log(nextIndex);
            console.log(this.list5.length);

            this.$refs.todos3[nextIndex].focus();
              console.log("SWITH TO NEXT");
        }

      },

      getAllTeamName(){
        // console.log("san");
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList = response.data));

      },

      getAllTeamName2(){

        // console.log("san");
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList2 = response.data));

      },

      getAllTeamName3(){

        // console.log("san");
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList3 = response.data));

      },

      onChangeTeamVsTeam1(event, colvalue){

        console.log(event);
        console.log(colvalue);

        console.log(this['vsselected'+colvalue]);

        if(this['vsselected'+colvalue] == ''){
          console.log("LESS OR NULL VALUES");

            if(colvalue%2 != '0'){
                var colvalue1 = 11-1;
                var colvalue2 = 11+0;
              }
              if(colvalue%2 == '0'){
                var colvalue1 = 10+0;
                var colvalue2 = 10+1;
              }

              var getSessionIdFirstTeam = this.fetchPlayerList[colvalue1].Team_player_sessions[0].session_id;
              var getSessionIdSecondTeam = this.fetchPlayerList[colvalue2].Team_player_sessions[0].session_id;

              var teamName1 = this.fetchPlayerList[colvalue1].Team.name;
              var teamName2 = this.fetchPlayerList[colvalue2].Team.name;

              console.log(teamName1);
              console.log(teamName2);

              var teamSessionId1 = getSessionIdFirstTeam;
              var teamSessionId2 = getSessionIdSecondTeam;
              console.log(teamSessionId2 +' '+ teamSessionId1);

              console.log(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName1);

              axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName1,{
                    
                  })
                    .then(response => {
                      console.log(response);
                      console.log(response.data[0].id);
                      var teamNameId = response.data[0].id;
                      console.log(teamNameId);

                      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId1);

                      /** this will update session id on team_vs_team_id for SIDE A 1 **/
                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId1,{
                        team_vs_team_id : teamSessionId2
                      })
                        .then(response => {
                          console.log(response);
                        })

                        .catch(function (error) {
                          console.log(error);
                        });
                      /** end of SIDE A 1 session id update on team vs team id **/

                      
                      /**this will update session id on team_vs_team_id for SIDE B 1 **/

                        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId2,{
                            team_vs_team_id : teamSessionId1
                            })

                            .then(response => {
                            console.log(response);
                            })

                            .catch(function (error) {
                              console.log(error);
                            });


                        /** end of team_vs_team_id for side B 1 **/
                    })

                    .catch(function (error) {
                      console.log(error);
                    });
              
              this['vsselected'+colvalue1] = this['teamName'+colvalue2]; /** this updates the team name auto on SIDE B 1 **/
              this['vsselected'+colvalue2] = this['teamName'+colvalue1]; /** this updates the team name auto on SIDE B 1 **/
        } /** END OF IF FOR TEAM PLAYER SESSION **/

        else{
          console.log("MORE VALUESSSSSSSSSSSSSSSSSSSSSS");

            if(colvalue%2 != '0'){
                var colvalue1 = 11-1;
                var colvalue2 = 11+0;
            }
            if(colvalue%2 == '0'){
                var colvalue1 = 10+0;
                var colvalue2 = 10+1;
            }

            var getSessionIdFirstTeam = this['list'+colvalue1+'sessionid'];
            var getSessionIdSecondTeam = this['list'+colvalue2+'sessionid'];

            var teamName1 = this['teamName'+colvalue1];
            var teamName2 = this['teamName'+colvalue2];

            console.log(teamName1);
            console.log(teamName2);

            var teamSessionId1 = getSessionIdFirstTeam;
            var teamSessionId2 = getSessionIdSecondTeam;

            console.log(getSessionIdFirstTeam);
            console.log(getSessionIdSecondTeam);

            axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName1,{
                    
                  })
                    .then(response => {
                      console.log(response);
                      console.log(response.data[0].id);
                      var teamNameId = response.data[0].id;
                      console.log(teamNameId);

                      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId1);

                      /** this will update session id on team_vs_team_id for SIDE A 1 **/
                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId1,{
                        team_vs_team_id : teamSessionId2
                      })
                        .then(response => {
                          console.log(response);
                        })

                        .catch(function (error) {
                          console.log(error);
                        });
                      /** end of SIDE A 1 session id update on team vs team id **/

                      
                      /**this will update session id on team_vs_team_id for SIDE B 1 **/

                        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId2,{
                            team_vs_team_id : teamSessionId1
                            })

                            .then(response => {
                            console.log(response);
                            })

                            .catch(function (error) {
                              console.log(error);
                            });


                        /** end of team_vs_team_id for side B 1 **/
                    })

                    .catch(function (error) {
                      console.log(error);
                    });



            this['vsselected'+colvalue1] = this['teamName'+colvalue2]; /** this updates the team name auto on SIDE B 1 **/
            this['vsselected'+colvalue2] = this['teamName'+colvalue1]; /** this updates the team name auto on SIDE B 1 **/

            console.log(this['teamName'+colvalue2]);
            console.log(this['teamName'+colvalue1]);
        }

        

      },

      onChangeTeamVsTeam2(){

        console.log(this.list4sessionid);
        console.log(this.vsselected2);
        // http://localhost:9090/team_vs_teams
        console.log(this.allTeamList2.id);
        console.log("inside on change team vs team 1");

        var teamName = this.vsselected2;
        var teamSessionId = this.list2sessionid;
        var teamSessionId2 = this.list4sessionid; /** this is the parent now **/

        console.log(teamName);
        console.log(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName);

        axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
              name: this.vsselected2
            })
              .then(response => {
                console.log(response);
                console.log(response.data[0].id);
                var teamNameId = response.data[0].id;
                console.log(teamNameId);

                console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId2);

                /** this will update session id on team_vs_team_id for SIDE A 1 **/
                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId2,{
                  team_vs_team_id : teamSessionId
                })
                  .then(response => {
                    console.log(response);
                  })

                  .catch(function (error) {
                    console.log(error);
                  });
                /** end of SIDE A 1 session id update on team vs team id **/

                
                /**this will update session id on team_vs_team_id for SIDE B 1 **/

                  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId,{
                      team_vs_team_id : teamSessionId2
                      })

                      .then(response => {
                      console.log(response);
                      })

                      .catch(function (error) {
                        console.log(error);
                      });


                  /** end of team_vs_team_id for side B 1 **/
              })

              .catch(function (error) {
                console.log(error);
              });
        // console.log("inside team vs team 2nd column");
        this.vsselected1 = this.teamName2; /** this updates the team name auto on SIDE A 1 **/  
      },

      updateRfid(){

        var arr = this.list2teamplayersessionid;
         for(var i=0; i < arr.length; i++){

            var teamplayertableid = this.list2teamplayersessionid[i];
            var rfidtag_id = this.list2rfidcontainerarray[i];
            // var playerid = this.list2[i].id;
            var sessionid = this.list2sessionid;

          console.log(this.list2[i].id);

          console.log(teamplayertableid);
          console.log(rfidtag_id);

          console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid);


          axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
              // player_id: playerid,
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

         /** this will update the player_count on session table **/
        console.log(this.list2.length);        
        var sessionid = this.list2sessionid;

         axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
              player_count: this.list2.length
            })
              .then(function (response) {
                console.log(response);
                // console.log("papa");
                // this.list2teamplayersessionid = response.data[0].id;
              })

              .catch(function (error) {
                console.log(error);
              });

          /** end of player_count on session table **/
        
      },


      updateRfid2(){ 

        console.log("rfid 2 column updated");

        // var arr = this.list4teamplayersessionid;
        //  for(var i=0; i < arr.length; i++){

        //     var teamplayertableid = this.list4teamplayersessionid[i];
        //     var rfidtag_id = this.list4rfidcontainerarray[i];
        //     var playerid = this.list4[i].id;
        //     var sessionid = this.list4sessionid;

        //   axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
        //       player_id: playerid,
        //       rfid_id: rfidtag_id,
        //       team_id: this.teamname2id[0].id,
        //       session_id: sessionid
        //     })
        //       .then(function (response) {
        //         console.log(response);
        //       })

        //       .catch(function (error) {
        //         console.log(error);
        //       });

        //  }

        //  /** this will update the player_count on session table **/
        //  console.log(this.list4.length);        
        // var sessionid = this.list4sessionid;

        //  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
        //       player_count: this.list4.length
        //     })
        //       .then(function (response) {
        //         console.log(response);
        //       })

        //       .catch(function (error) {
        //         console.log(error);
        //       });

        /** end of player_count for session table **/
        
      },

      updateRfid3(){
        console.log("Updated RFID for Side A 2 ");
      },

      // posttorfidapi(event){
      //   console.log("sandes man");
      // },

      posttoapi(event, col){

        var teamIdSide = this["teamIdSide"+col];
        var teamName = this["teamName"+col];
        console.log(teamIdSide);
        console.log(teamName);

        if(teamIdSide > 0){
          console.log(this["teamName"+col]);

          axios.put(process.env.VUE_APP_DATABASE_TEAMS+'/'+teamIdSide,{
            name: teamName
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          /** at first it will update team name from PUT and GET teamIdSideA1 as a value **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/'+teamIdSide,{
          })
          .then(response => {
            console.log(response);
            // this.teamname1id = response.data;
            // teamIdSide = response.data[0].id;
          })
          .catch(function (error) {
            console.log(error);
          });
          // console.log("ITS A TEAM");
        }

        else{
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+teamName,{
            name: teamName
          })
          .then(response => {
            this["teamname"+col+"id"] = response.data;
            this["teamIdSide"+col] = response.data[0].id;
          })
          .catch(function (error) {
            console.log(error);
          });
        }
          
          
      },

      posttoapi2(event){
          // console.log("in");
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+this.teamName2,{
          name: this.teamName2,
          })
          .then(response => {
            this.teamname2id = response.data;
            this.teamIdSideB1 = response.data[0].id;
            // console.log(this.teamname2id);
            // console.log(response.data[0].id);
          })
          .catch(function (error) {
            console.log(error);
          });
          
      },

      posttoapi3(event){
          // console.log("in");
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+this.teamName3,{
          name: this.teamName3,
          })
          .then(response => {
            this.teamname3id = response.data;
            this.teamIdSideA2 = response.data[0].id;
          })
          .catch(function (error) {
            console.log(error);
          });
          
      },


      inputEvent(e) {
        console.log('sattttt');
      // this.$emit('input', e.target.value);
      },

      inputEvent2(e) {
        console.log('sattttt on side b 1');
      // this.$emit('input', e.target.value);
      },

      inputEvent3(e) {
        console.log('sattttt on side b 1');
      // this.$emit('input', e.target.value);
      },

      //removes the team player ssession data when dropped back to reservation from list2,list4,list5,list6
      // onDropReservation(e){

      //   console.log("moved in");

      //   console.log(this.list2);
      //   console.log(this.list2.id);
      //   console.log(this.list2[0].id);
      //   // console.log(this.list2[1].id);
      //   var draggedPlayerId = this.list2;
      //   console.log(draggedPlayerId);
      //   console.log(this.list2sessionid);
      //   var sessionId = this.list2sessionid;

      //   console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionId);

      //   axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionId,{
      //           })
      //           .then(response => {
      //             console.log(response);
      //             console.log(response.data);
      //           })

      //           .catch(error => {
      //             console.log(error);
      //           });

      // },

      // movingItemFrom2(e){
      //   console.log(" 87 89 0");
      //   console.log(e);
      //   console.log(e.draggedContext.index);
      //   var index = e.draggedContext.index;
      //   console.log(this.list4teamplayersessionid[index]);

      //   this.draggedTeamPlayerSessionId = this.list4teamplayersessionid[index];
      // },

      deleteTeamPlayerSessionAfterReload1(event, col){

        var boxObjectId = col;
        console.log(boxObjectId);
        console.log(" INISDE DELETE SECTION");

        console.log("0909090");
        console.log(event);
        // console.log(event.removed.element.Person.first_name);

        if(event.removed.element.Person.first_name.length > '1'){

            // console.log(event.draggedContext.element.reservation_id);
          // console.log(event.draggedContext.element.Person.first_name);
          // console.log(event.draggedContext.element.Person.last_name);
          // console.log(event.draggedContext.element.Person.id); /** this is waiver id **/
          // console.log(event.draggedContext.element.reservation_id);
          // // console.log(event.draggedContext.element.Person.player_id);
          // // console.log(event.draggedContext.element.Person.reservation_id);
          // // console.log(event.draggedContext.index);
          // console.log(event.draggedContext.element.id);
          // console.log(event.draggedContext.index);

          // var fetchIndex = e.draggedContext.index;
          // console.log(fetchIndex);

          console.log(this.fetchPlayerList[boxObjectId]);

          var deleteId = this.fetchPlayerList[boxObjectId];

          var updateNullOnReservationPeople = event.removed.element.id;
          console.log(updateNullOnReservationPeople);

          // var deleteTeamPlayerSessionId = e.draggedContext.element.Person.team_player_session;
          // var deleteTeamPlayerSessionId = this.tolist2TPSafterReload[boxObjectId];
          var deleteTeamPlayerSessionId = event.removed.element.Person.team_player_session;
          console.log(deleteTeamPlayerSessionId);

          var sessionID = event.removed.element.session_id;


          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTeamPlayerSessionId,{

          })
          .then(response => {
            console.log("Deleted Id "+deleteTeamPlayerSessionId);
            // console.log(boxObjectId);
            // this.fetchPlayerList.splice(boxObjectId,1);
          })
          .catch(error => {
            console.log(error);
          });

          if(event.removed.element.player_minor_id > "0"){

            console.log(" YESSSSSSSS MINOOOOORRRS ");

            var minorId = event.removed.element.Person.id;
            var minorReservationId = event.removed.element.reservation_id;

            console.log(minorId);
            console.log(minorReservationId);

            axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorId+'/reservation/'+minorReservationId,{
                  session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });

          }

          else{

            console.log(" NOTTTTT MINOOOOORRRS ");

            var playerId = event.removed.element.Person.id;
            var playerReservationId = event.removed.element.reservation_id;

            axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+playerId+'/reservation/'+playerReservationId,{
                  session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });

                /** end of reservation-people update for SESSION_ID **/
          }

          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
          })
          .then(response => {
            console.log(response);
            console.log(response.data.player_count);

            var count_total_player = response.data.player_count;

              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
                player_count: count_total_player-1
              })
              .then(response => {
                console.log(response);
                console.log(response.data.session_id);
              })
              .catch(error => {
                console.log(error);
              });

          })
          .catch(error => {
            console.log(error);
          });

        }    

      },


      deleteTeamPlayerSessionAfterReload2(e){

        console.log(e);

        var fetchIndex = e.draggedContext.index;

        var deleteId = this.fetchPlayerList2[fetchIndex];

        var updateNullOnReservationPeople = e.draggedContext.element.id;
        console.log(updateNullOnReservationPeople);

        var deleteTeamPlayerSessionId = e.draggedContext.element.id;



        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTeamPlayerSessionId,{

        })
        .then(response => {
          console.log("Deleted Id "+deleteTeamPlayerSessionId);
          console.log(fetchIndex);
          this.fetchPlayerList2.splice(fetchIndex,1);
        })
        .catch(error => {
          console.log(error);
        });

        if(e.draggedContext.element.player_minor_id > "0"){

          console.log(" YESSSSSSSS MINOOOOORRRS ");

          var minorId = e.draggedContext.element.Person.id;
          var minorReservationId = e.draggedContext.element.reservation_id;

          console.log(minorId);
          console.log(minorReservationId);

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorId+'/reservation/'+minorReservationId,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        }

        else{

          console.log(" NOTTTTT MINOOOOORRRS ");

          var playerId = e.draggedContext.element.Person.id;
          var playerReservationId = e.draggedContext.element.reservation_id;

          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+playerId+'/reservation/'+playerReservationId,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of reservation-people update for SESSION_ID **/
        }
            

      },


      onDropReservation1(event, col){

        console.log(event);

        if(event.removed.element.Person.first_name.length > '1'){

          console.log(col);
          console.log(event.removed.element.Person.first_name);

          console.log("0909090");
          console.log(event);
          console.log(event.removed.element.Person.first_name);
          console.log(event.removed.element.Person.last_name);
          console.log(event.removed.element.Person.id); /** this is waiver id **/
          console.log(event.removed.element.reservation_id);
          // console.log(event.removed.element.Person.player_id);
          console.log(event.removed.element.person_id);
          console.log(event.removed.element.reservation_id);
          console.log(event.removed.oldIndex);
          console.log(event.removed.element.Person.minor);


            var fetchIndex = event.removed.oldIndex;
            console.log(fetchIndex);

            var deleteId = this["list"+col+"teamplayersessionid"][fetchIndex];
            console.log("000000000000000"+deleteId);

            var updateNullOnReservationPeople = event.removed.element.id;
            console.log(updateNullOnReservationPeople);


            axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteId,{

            })
            .then(response => {
              console.log("Deleted Id "+deleteId);
              console.log(fetchIndex);
              this["list"+col+"teamplayersessionid"].splice(fetchIndex,1);

              // this.onDrop1FunctionLoaded--;
              this["onDrop"+col+"FunctionLoaded"]--;
              // if(this.onDrop1FunctionLoaded > 0){
              //   console.log('yes greater than 0');
              // }
              // else{
              //   console.log('equal to 0');
              // }


              /** below axios.get will fetch the player_count for particular SESSION ID and 
               update player_count as -1 when dragged out from team box **/

              var sessionIdDragged = this["list"+col+"sessionid"]; /** its define as array but contains only one object as session id can be used on 5 times **/

              axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                          
                })
                .then(response => {
                  console.log(response);
                  console.log(response.data);
                  console.log(response.data.player_count);

                  var sessionPlayerCount = response.data.player_count;
                  // console.log(sessionPlayerCount);
                  // console.log(sessionIdDragged);

                  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                    player_count: sessionPlayerCount-1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                })
                
                .catch(function (error) {
                  console.log(error);
                });

              /** end of SESSION ID PLAYER COUNT -1 update **/


            })
            .catch(error => {
              console.log(error);
            });



            /** this will update the reservation_people **/

            console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople);

            if(event.removed.element.Person.minor == "yes"){

              axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+updateNullOnReservationPeople,{
                    session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

            }

            else{

              axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople,{
                    session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                  /** end of reservation-people update for SESSION_ID **/
            }
                
            // let removed = myFish.splice(3, 1)

        }

      },

      onDropReservation2(e){

        var fetchIndex = e.draggedContext.index;

        console.log(this.list4teamplayersessionid[fetchIndex]);

        var deleteId = this.list4teamplayersessionid[fetchIndex];

        var updateNullOnReservationPeople = e.draggedContext.element.id;
        console.log(updateNullOnReservationPeople);

        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteId,{

        })
        .then(response => {
          console.log("Deleted Id "+deleteId);
          console.log(fetchIndex);
          this.list4teamplayersessionid.splice(fetchIndex,1);

          this.onDrop2FunctionLoaded--;
          if(this.onDrop2FunctionLoaded > 0){
            console.log('yes greater than 0');
          }
          else{
            console.log('equal to 0');
          }

           /** below axios.get will fetch the player_count for particular SESSION ID and 
           update player_count as -1 when dragged out from team box **/

          var sessionIdDragged = this.list4sessionid; /** its define as array but contains only one object as session id can be used on 5 times **/
          
          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                      
            })
            .then(response => {
              console.log(response);
              console.log(response.data);
              console.log(response.data.player_count);

              var sessionPlayerCount = response.data.player_count;
              // console.log(sessionPlayerCount);
              // console.log(sessionIdDragged);

              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                player_count: sessionPlayerCount-1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

            })
            
            .catch(function (error) {
              console.log(error);
            });

          /** end of SESSION ID PLAYER COUNT -1 update **/


        })
        .catch(error => {
          console.log(error);
        });



        /** this will update the reservation_people **/

        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople);

        if(e.draggedContext.element.Person.minor == "yes"){

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+updateNullOnReservationPeople,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

        }

        else{

          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of reservation-people update for SESSION_ID **/
        }
            
        // let removed = myFish.splice(3, 1)

      },


      onDropReservation3(e){

         console.log("0909090");
        console.log(e);
        console.log(e.draggedContext.element.Person.first_name);
        console.log(e.draggedContext.element.Person.last_name);
        console.log(e.draggedContext.element.Person.id); /** this is waiver id **/
        console.log(e.draggedContext.element.reservation_id);
        console.log(e.draggedContext.element.Person.player_id);
        console.log(e.draggedContext.element.Person.reservation_id);
        console.log(e.draggedContext.index);
        console.log(e.draggedContext.element.Person.minor);

        var fetchIndex = e.draggedContext.index;

        console.log(this.list5teamplayersessionid[fetchIndex]);

        var deleteId = this.list5teamplayersessionid[fetchIndex];

        var updateNullOnReservationPeople = e.draggedContext.element.id;
        console.log(updateNullOnReservationPeople);

        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteId,{

        })
        .then(response => {
          console.log("Deleted Id "+deleteId);
          console.log(fetchIndex);
          this.list5teamplayersessionid.splice(fetchIndex,1);

          this.onDrop3FunctionLoaded--;
          if(this.onDrop3FunctionLoaded > 0){
            console.log('yes greater than 0');
          }
          else{
            console.log('equal to 0');
          }

        })
        .catch(error => {
          console.log(error);
        });



        /** this will update the reservation_people **/

        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople);

        if(e.draggedContext.element.Person.minor == "yes"){

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+updateNullOnReservationPeople,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

        }

        else{

          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople,{
                session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of reservation-people update for SESSION_ID **/
        }
            
        // let removed = myFish.splice(3, 1)
      },


      // onDrop for Team Name 1 table it will post to session table and team_player_session table
      onDrop1(event, col){

        console.log(col);
        console.log(event);
        var index = event.newIndex;
        
        // console.log("0909090");
        // console.log(e);
        // // var index = e.draggedContext.index;
        // console.log(this.draggedTeamPlayerSessionId);

        var teamName = this["teamName"+col];
        var teamNameId = this["teamIdSide"+col];

        console.log(teamName);
        console.log(teamNameId);

        this["disableButton"+col] = false;

      /** this if and ELSE statement is for the TEAM NAME update before and after dropping player name **/
        if(this["teamName"+col].length > 1){

          // axios.put(process.env.VUE_APP_DATABASE_TEAMS+'/'+teamNameId,{
          //   name: teamName
          // })
          // .then(response => {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

          // axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/'+this["teamIdSide"+col],{
          // })
          // .then(response => {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          
          axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
            name: teamName
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        }

        else{
          var teamText = "BOX";
          var boxId = col;
          var teamNameCreate = teamText + boxId;

          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+teamNameCreate,{
            name: teamNameCreate
          })

          .then(response => {

            this["teamname"+col+"id"] = response.data;
            // this["teamIdSide"+col]teamIdSideA1 = response.data[0].id;
            this["teamIdSide"+col] = response.data[0].id;
            console.log(this["teamIdSide"+col]);

          })
          
          .catch(error => {
            console.log(error);
          });

        }
        /** END of IF and ELSE statement is for the TEAM NAME update **/

        var missionid = this.teamByTime2[0].mission_id;

        console.log(this.teamByTime2[0].mission_id);

        var countondrop = this["onDrop"+col+"FunctionLoaded"]++;
        console.log(countondrop);

        console.log("below is the dragged id as person id");
        console.log(this["list"+col][countondrop]);

        this["selected"+col] = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/
        console.log(this["selected"+col]);

        // var draggedPlayerId = this.list2[this.list2.length - 1].id; /* this will always select the last player id dragged */
        var listLength = this["list"+col].length;
        console.log(index);

        var newIndex = index;
        console.log(newIndex);

        console.log(this["list"+col][newIndex]);
        // console.log(listLength);

        /************* DRAGGED PLAYER ID MIGHT MESS UP FOR *********************************** MINORS ***********************/

        var draggedPlayerId = this["list"+col][newIndex].Person.Player.id; /* this will always select the last player id dragged */
        console.log(draggedPlayerId);

        if(this["list"+col][newIndex].Person.minorsymbol == "M"){
          var reservationid = this["list"+col][newIndex].Person.reservation_id;
        }
        else{
        var reservationid = this["list"+col][newIndex].reservation_id; 
        // var reservationid = this["list"+col][newIndex].Person.reservation_id;
        }

        console.log("RESERVATION ID "+reservationid);

        // var teamId = this.teamname1id[0].id;
        var teamId = this["teamname"+col+"id"][0].id;
        console.log(teamId);

        /**** if BOX even then 1 or else 2 **/
        if (col%2 == 0){
          var routeId = 1;
        }
        else{
          var routeId = 2;
        }

        console.log("ROUTE ID ==== "+routeId);

        var reservationIdForSessionUpdate = this["list"+col][countondrop].id;
        console.log(reservationIdForSessionUpdate);

        console.log(reservationid);

        // console.log(reservationid);

        /** statement that checks if the dragged item is MONOR or NOT **/

          console.log(this["list"+col][countondrop].Person.minor);

          if(this["list"+col][countondrop].Person.minor == 'yes'){
            
            var peopleidused = this["list"+col][countondrop].person_id;

            console.log('YES MINOR');
            // console.log(this.list2[countondrop2].Person.Player.id);
            // console.log(this.list2[countondrop2].Person.player_id);
            console.log(countondrop);
            console.log(peopleidused);

            var id_of_player = this["list"+col][countondrop].Person.player_id;
            // console.log(this.list2[0].Person.player_id);
            console.log(id_of_player);

            var minor_id = this["list"+col][countondrop].person_id;
            var id_of_reservation = this["list"+col][countondrop].Person.reservation_id;
            console.log(id_of_reservation);
            console.log(minor_id);
            // console.log(id_of_player+'/'+minor_id);

            var reservationIdForSessionUpdate = this["list"+col][countondrop].id;
            console.log(this["list"+col][countondrop].id);

          if(teamId > 0){

            

            if(!this["list"+col+"sessionid"] > '0' ){

              console.log("inside");

              var sessionDateTime = this["sessionRow"+col+"DateTime"];
              console.log("SESSION DATE TIME "+sessionDateTime);

                  console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId);

                  axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId,{
                    team_id: teamId,
                    route_id: routeId,
                    mission_id: this.teamByTime2[0].mission_id,
                    reservation_id: id_of_reservation,
                    session_time: this["sessionRow"+col+"DateTime"],
                    location_id: 1
                    // player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                    console.log(response.data);

                    this.list2sessionid = response.data[0].id; /** this pass session id to list2sessionid **/
                    this["list"+col+"sessionid"] = response.data[0].id;

                    this.playerSessionDetail2 = response.data[0].id;
                    var sessionIdInserted = response.data[0].id;


                    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                      player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                    })
                    .then(response => {

                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                    /** this will update the reservation_minors session_id **/

                    console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate);
                    console.log(sessionIdInserted);
                    console.log(this.list2sessionid);
                    var minorSessionId = this.list2sessionid;

                    axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate,{
                      session_id: sessionIdInserted, /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      player_minor_id: minor_id,
                      reservation_id: id_of_reservation
                    })
                    .then(response => {
                      console.log("INSERTED MINOR VALUE");
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                    /** end of reservation-minors update for SESSION_ID **/



                    /** checks the session id and post again using axios.post for team player session table **/
                    if(sessionIdInserted > 0){

                      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                      team_id: teamId,
                      player_id: id_of_player,
                      player_minor_id: minor_id,
                      reservation_id: id_of_reservation
                      })
                      .then(response => {

                        /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                        /* multiple objects is passed to array called list2teamplayersession*/
                        console.log("inside solti");
                        this["tolist"+col+"teamplayersessionid"] = response.data[0].id;

                        if (this["tolist"+col+"teamplayersessionid"] > 0) { 
                              this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
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

            else{

              var sessionIdInserted = this["list"+col+"sessionid"];

               axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                      player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                    })
                    .then(response => {

                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                    /** this will update the reservation_minors session_id **/

                    console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate);
                    console.log(sessionIdInserted);
                    console.log(this["list"+col+"sessionid"]);
                    var minorSessionId = this["list"+col+"sessionid"];

                    axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate,{
                      session_id: sessionIdInserted, /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      player_minor_id: minor_id,
                      reservation_id: id_of_reservation
                    })
                    .then(response => {
                      console.log("INSERTED MINOR VALUE");
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                    /** end of reservation-minors update for SESSION_ID **/



                    /** checks the session id and post again using axios.post for team player session table **/
                    if(sessionIdInserted > 0){

                      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                          team_id: teamId,
                          player_id: id_of_player,
                          player_minor_id: minor_id,
                          reservation_id: id_of_reservation
                      })
                      .then(response => {

                        /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                        /* multiple objects is passed to array called list2teamplayersession*/
                        this["tolist"+col+"teamplayersessionid"] = response.data[0].id;

                        if (this["tolist"+col+"teamplayersessionid"] > 0) { 
                              this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
                          }
                      })

                      .catch(error => {
                        console.log(error);
                      });
                    }
                    /** ends axios post on team player sessions **/

            }

          }
        }

          else{
            console.log('Not Minor');
            // console.log(reservationid);


            var peopleidused = this["list"+col][countondrop].Person.Player.id;
            console.log(peopleidused);


          if(teamId > 0){

            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            var sessionDateTime = this["sessionRow"+col+"DateTime"];
            console.log("SESSION DATE TIME "+sessionDateTime);

            if(!this["list"+col+"sessionid"] > '0' ){

                  console.log(" NOW DSS  KDS KKDS S");

                  axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
                    team_id: teamId,
                    route_id: routeId,
                    mission_id: this.teamByTime2[0].mission_id,
                    reservation_id: reservationid,
                    // session_time: this.sessionRow1DateTime,
                    session_time: this["sessionRow"+col+"DateTime"],
                    location_id: 1
                    // player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                    console.log(response.data);

                    this["list"+col+"sessionid"] = response.data[0].id; /** this pass session id to list2sessionid **/

                    this["playerSessionDetail"+col] = response.data[0].id;
                    var sessionIdInserted = response.data[0].id;

                    console.log(reservationid);

                    /** checks the session id and post again using axios.post for team player session table **/
                    if(sessionIdInserted > 0){

                      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                          // session_id: sessionIdInserted,
                          team_id: teamId,
                          player_id: peopleidused,
                          reservation_id: reservationid
                          // reservation_id: reservationid
                      })
                      .then(response => {

                        console.log(response.data);
                        console.log(reservationid);
                        /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                        /* multiple objects is passed to array called list2teamplayersession*/
                        console.log(" PU GEY HAI");

                        this["tolist"+col+"teamplayersessionid"] = response.data[0].id;

                        if (this["tolist"+col+"teamplayersessionid"] > 0) { 
                              this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
                          }
                      })

                      .catch(error => {
                        console.log(error);
                      });


                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                        player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                      /** this will update the reservation_people **/

                      console.log("WALA WALA WALA");
                      axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationIdForSessionUpdate,{
                        session_id: sessionIdInserted /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                      /** end of reservation-people update for SESSION_ID **/

                    }
                    /** ends axios post on team player sessions **/

                  })

                  .catch(function (error) {
                    console.log(error);
                  });

            }

            else{

              /** checks the session id and post again using axios.post for team player session table **/

              var sessionIdInserted = this["list"+col+"sessionid"];

                    if(sessionIdInserted > 0){

                      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                      team_id: teamId,
                      player_id: peopleidused,
                      // reservation_id: id_of_reservation
                      reservation_id: reservationid
                      })
                      .then(response => {

                        console.log(response.data);
                        console.log(reservationid);

                        /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                        /* multiple objects is passed to array called list2teamplayersession*/
                        this["tolist"+col+"teamplayersessionid"] = response.data[0].id;

                        if (this["tolist"+col+"teamplayersessionid"] > 0) { 
                              this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
                          }
                      })

                      .catch(error => {
                        console.log(error);
                      });


                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                        player_count: countondrop+1 /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                      /** this will update the reservation_people **/

                      console.log("WALA WALA WALA");
                      axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationIdForSessionUpdate,{
                        session_id: sessionIdInserted /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                      /** end of reservation-people update for SESSION_ID **/

                    }
                    /** ends axios post on team player sessions **/

            }


          }

          }

        /** end of MINOR CHECK STATEMENT **/
      },

      onDrop3(e){

        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList3 = response.data));

         var missionid = this.teamByTime2[0].mission_id;

        console.log(this.teamByTime2[0].mission_id);

        var countondrop3 = this.onDrop3FunctionLoaded++;
        // this.onDrop2FunctionLoaded++;
        console.log(countondrop3);

        console.log("below is the dragged id as person id");
        console.log(this.list5[countondrop3].person_id);

        this.selected3 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        var draggedPlayerId = this.list5[this.list5.length - 1].id; /* this will always select the last player id dragged */

        var reservationid = this.list5[countondrop3].reservation_id;
        var teamId = this.teamname3id[0].id;
        var routeId = 1;

        var reservationIdForSessionUpdate = this.list5[countondrop3].id;
        console.log(reservationIdForSessionUpdate);

        // console.log(reservationid);

        /** statement that checks if the dragged item is MONOR or NOT **/

          if(this.list5[countondrop3].Person.minor == 'yes'){

            var peopleidused = this.list5[countondrop3].person_id;

            console.log('YES MINOR');
            // console.log(this.list2[countondrop2].Person.Player.id);
            // console.log(this.list2[countondrop2].Person.player_id);
            console.log(countondrop3);
            var id_of_player = this.list5[countondrop3].Person.player_id;
            console.log(this.list5[0].Person.player_id);
            console.log(id_of_player);

            var minor_id = this.list5[countondrop3].person_id;
            var id_of_reservation = this.list5[countondrop3].Person.reservation_id;
            console.log(id_of_reservation);
            console.log(minor_id);
            // console.log(id_of_player+'/'+minor_id);

            var reservationIdForSessionUpdate = this.list5[countondrop3].id;
            console.log(this.list5[countondrop3].id);

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId,{
              team_id: teamId,
              route_id: routeId,
              mission_id: this.teamByTime2[0].mission_id,
              reservation_id: id_of_reservation,
              session_time: this.sessionRow3DateTime,
              location_id: 1
              // player_count: countondrop2+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

              console.log(response.data);

              this.list5sessionid = response.data[0].id; /** this pass session id to list2sessionid **/

              this.playerSessionDetail4 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;


              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                player_count: countondrop3+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

              /** this will update the reservation_minors session_id **/

              console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate);
              console.log(sessionIdInserted);
              console.log(this.list5sessionid);
              var minorSessionId = this.list5sessionid;

              axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate,{
                session_id: sessionIdInserted, /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
                player_minor_id: minor_id,
                reservation_id: id_of_reservation
              })
              .then(response => {
                console.log("INSERTED MINOR VALUE");
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of reservation-minors update for SESSION_ID **/



              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId,
                player_id: id_of_player,
                player_minor_id: minor_id,
                reservation_id: reservationid,
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list2teamplayersession*/
                  this.tolist5teamplayersessionid = response.data[0].id;

                  if (this.tolist5teamplayersessionid > 0) { 
                        this.list5teamplayersessionid.push(this.tolist5teamplayersessionid);
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


          }
          else{
            console.log('Not Minor');
            // console.log(reservationid);


            var peopleidused = this.list5[countondrop3].Person.Player.id;
            console.log(peopleidused);


            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);

            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
              team_id: teamId,
              route_id: routeId,
              mission_id: this.teamByTime2[0].mission_id,
              reservation_id: reservationid,
              session_time: this.sessionRow2DateTime,
              location_id: 1
              // player_count: countondrop2+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

              console.log(response.data);

              this.list5sessionid = response.data[0].id; /** this pass session id to list2sessionid **/

              this.playerSessionDetail5 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                  // session_id: sessionIdInserted,
                  team_id: teamId,
                  player_id: peopleidused,
                  reservation_id: reservationid
                  // reservation_id: reservationid
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list2teamplayersession*/
                  this.tolist5teamplayersessionid = response.data[0].id;

                  if (this.tolist5teamplayersessionid > 0) { 
                        this.list5teamplayersessionid.push(this.tolist5teamplayersessionid);
                    }
                })

                .catch(error => {
                  console.log(error);
                });


                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                  player_count: countondrop3+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {

                })
                .catch(function (error) {
                  console.log(error);
                });

                /** this will update the reservation_people **/

                console.log("WALA WALA WALA");
                axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationIdForSessionUpdate,{
                  session_id: sessionIdInserted /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {

                })
                .catch(function (error) {
                  console.log(error);
                });

                /** end of reservation-people update for SESSION_ID **/

              }
              /** ends axios post on team player sessions **/

            })

            .catch(function (error) {
              console.log(error);
            });

          }

          }

        /** end of MINOR CHECK STATEMENT **/
      },


      onDrop1AfterReload(event, col){

        var boxObjectId = col;

        console.log(boxObjectId+ " YES");

        console.log("below is the dragged id as person iddd");

        console.log(event);

        var countLastPlayerDragged = this.fetchPlayerList[boxObjectId].Team_player_sessions.length-1;
        console.log(countLastPlayerDragged);
        console.log(this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged]);

        // var lastPlayerDraggedId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.Player.id;
        // console.log(lastPlayerDraggedId);

        var sessionIdAfterReload1 = this.fetchPlayerList[boxObjectId].id; /** this is the session id **/
        console.log(sessionIdAfterReload1);

        var checkReservationId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].reservation_id;
        console.log(checkReservationId);

        var teamIdFetched = this.fetchPlayerList[boxObjectId].team_id;

        var reservationIdToUpdateSession = this.fetchPlayerList[boxObjectId].reservation_id;

        console.log("used the drag event");
        // console.log(event);
        console.log(this.onDrop1FunctionLoaded);
        console.log(this.fetchPlayerList[boxObjectId].mission_id);
        console.log(this.fetchPlayerList[boxObjectId].reservation_id);
        console.log(this.fetchPlayerList[boxObjectId].team_id);
        console.log(this.fetchPlayerList[boxObjectId].route_id);
        console.log(this.fetchPlayerList[boxObjectId].team_vs_team_id);
        console.log(this.fetchPlayerList[boxObjectId].id);

        var checkIfMinor = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.minor;
        console.log(checkIfMinor);

        if(checkIfMinor == "yes"){
          console.log(" 09 ");
          var lastPlayerDraggedId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.Player.id;
          console.log(lastPlayerDraggedId);

          console.log(lastPlayerDraggedId);

          var checkPlayerIdforMinor = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.player_id;
          console.log(checkPlayerIdforMinor);

          var checkDraggedMinorId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.person_id;
          console.log(checkDraggedMinorId);

          var checkReservationMinorId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].id;
          console.log(checkReservationMinorId);

          var checkMReservationId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.reservation_id;
          console.log(checkMReservationId);
          
          // axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+lastPlayerDraggedId+'/session/'+sessionIdAfterReload1,{
              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
                team_id: teamIdFetched,
                player_id: checkPlayerIdforMinor,
                session_id: sessionIdAfterReload1,
                player_minor_id: checkDraggedMinorId,
                reservation_id: checkMReservationId
              })
              
              .then(response => {

                console.log(response.data);
                console.log("inserted after reload");

                console.log("LA YO HO HAI COUNT"+countLastPlayerDragged);

                var team_player_session_id = response.data.id;
                console.log(team_player_session_id);

                // this.fetchPlayerList[boxObjectId].push(this.fetchPlayerList[boxObjectId][countLastPlayerDragged].team_player_session_id);


                axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+checkReservationMinorId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });



                /** this will get the player_count for session_id and add +1 **/
                  axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdAfterReload1,{
                     
                  })
                  .then(response => {
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.player_count);

                    var totalPlayer = response.data.player_count;

                    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdAfterReload1,{
                     player_count: totalPlayer+1
                    })
                    .then(response => {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                  })
                  .catch(function (error) {
                    console.log(error);
                  });


                  /** END of get and put for player_count on session_id **/


              })

              .catch(error => {
                console.log(error);
              });
          }

        else{ /** NOT MINOR **/

          var lastPlayerDraggedId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.Player.id;
          console.log(lastPlayerDraggedId);

            var checkReservationPlayerId = this.fetchPlayerList[boxObjectId].Team_player_sessions[countLastPlayerDragged].id;

            console.log(checkReservationPlayerId);

          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
              team_id: teamIdFetched,
              player_id: lastPlayerDraggedId,
              session_id: sessionIdAfterReload1,
              reservation_id: checkReservationId
            })
                .then(response => {

                  console.log(response.data);

                   console.log("LA YO HO HAI COUNT"+countLastPlayerDragged);

                    var team_player_session_id = response.data.id;
                    console.log(team_player_session_id);

                    this.tolist2TPSafterReload = response.data.id;

                    if (this.tolist2TPSafterReload > 0) { 
                      this.list2TPSafterReload.push(this.tolist2TPSafterReload);
                      console.log("LA YO HO HAI COUNT"+countLastPlayerDragged);
                    }

                    // this.fetchPlayerList[boxObjectId].push(this.fetchPlayerList[boxObjectId][countLastPlayerDragged].team_player_session_id);


                  axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+checkReservationPlayerId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                  /** this will get the player_count for session_id and add +1 **/
                  axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdAfterReload1,{
                     
                  })
                  .then(response => {
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.player_count);

                    var totalPlayer = response.data.player_count;

                    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdAfterReload1,{
                     player_count: totalPlayer+1
                    })
                    .then(response => {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                  })
                  .catch(function (error) {
                    console.log(error);
                  });


                  /** END of get and put for player_count on session_id **/

                })

                .catch(error => {
                  console.log(error);
                });

        }


      },

      onDrop2AfterReload(e){

        // var countOnDrop1AfterReload = this.onDrop1FuntionAfterReload++;
        // console.log(this.)
        console.log(event);
        console.log("below is the dragged id on SIDE B 1");
        // console.log(this.toListFetchRouteA1.Team_player_sessions.length);

        var countLastPlayerDragged = this.toListFetchRouteB1.Team_player_sessions.length-1;
        console.log(countLastPlayerDragged);

        var lastPlayerDraggedId = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].Person.Player.id;
        console.log(lastPlayerDraggedId);

        var sessionIdAfterReload1 = this.toListFetchRouteB1.id; /** this is the session id **/
        console.log(sessionIdAfterReload1);

        var teamIdFetched = this.toListFetchRouteB1.team_id;

        var reservationIdToUpdateSession = this.toListFetchRouteB1.reservation_id;

        console.log("used the drag event");
        console.log(e);
        console.log(this.onDrop1FunctionLoaded);
        console.log(this.toListFetchRouteB1.mission_id);
        console.log(this.toListFetchRouteB1.reservation_id);
        console.log(this.toListFetchRouteB1.team_id);
        console.log(this.toListFetchRouteB1.route_id);
        console.log(this.toListFetchRouteB1.team_vs_team_id);
        console.log(this.toListFetchRouteB1.id);

        var checkIfMinor = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].Person.minor;
        console.log(checkIfMinor);

        if(checkIfMinor == "yes"){
          console.log(" 09 ");
          console.log(lastPlayerDraggedId);

          var checkPlayerIdforMinor = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].Person.player_id;
          console.log(checkPlayerIdforMinor);

          var checkDraggedMinorId = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].Person.person_id;
          console.log(checkDraggedMinorId);

          var checkReservationMinorId = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].id;
          console.log(checkReservationMinorId);

          // axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+lastPlayerDraggedId+'/session/'+sessionIdAfterReload1,{
              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
                team_id: teamIdFetched,
                player_id: checkPlayerIdforMinor,
                session_id: sessionIdAfterReload1,
                player_minor_id: checkDraggedMinorId
              })
              
              .then(response => {

                console.log(response.data);
                console.log("inserted after reload");

                axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+checkReservationMinorId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });


                  /** below axios.get will fetch the player_count for particular SESSION ID and 
                   update player_count as +1 when dragged in to team box **/

                  var sessionIdDragged = this.list4sessionid; /** its define as array but contains only one object as session id can be used on 5 times **/
                  
                  axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                              
                    })
                    .then(response => {
                      console.log(response);
                      console.log(response.data);
                      console.log(response.data.player_count);

                      var sessionPlayerCount = response.data.player_count;
                      // console.log(sessionPlayerCount);
                      // console.log(sessionIdDragged);

                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                        player_count: sessionPlayerCount+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    })
                    
                    .catch(function (error) {
                      console.log(error);
                    });

                  /** end of SESSION ID PLAYER COUNT +1 update **/


              })

              .catch(error => {
                console.log(error);
              });
          }

        else{ /** NOT MINOR **/

            var checkReservationPlayerId = this.toListFetchRouteB1.Team_player_sessions[countLastPlayerDragged].id;

            console.log(checkReservationPlayerId);

          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
          team_id: teamIdFetched,
          player_id: lastPlayerDraggedId,
          session_id: sessionIdAfterReload1
        })
                .then(response => {

                  console.log(response.data);

                  axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+checkReservationPlayerId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {


                    /** below axios.get will fetch the player_count for particular SESSION ID and 
                   update player_count as +1 when dragged in to team box **/

                  var sessionIdDragged = this.list4sessionid; /** its define as array but contains only one object as session id can be used on 5 times **/
                  
                  axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                              
                    })
                    .then(response => {
                      console.log(response);
                      console.log(response.data);
                      console.log(response.data.player_count);

                      var sessionPlayerCount = response.data.player_count;
                      // console.log(sessionPlayerCount);
                      // console.log(sessionIdDragged);

                      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                        player_count: sessionPlayerCount+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                      })
                      .then(response => {

                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    })
                    
                    .catch(function (error) {
                      console.log(error);
                    });

                  /** end of SESSION ID PLAYER COUNT +1 update **/

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                })

                .catch(error => {
                  console.log(error);
                });

        }
      },

      onDrop3AfterReload(e){

        // var countOnDrop1AfterReload = this.onDrop1FuntionAfterReload++;
        // console.log(this.)
        console.log("below is the dragged id on SIDE A 2");
        // console.log(this.toListFetchRouteA1.Team_player_sessions.length);

        var countLastPlayerDragged = this.toListFetchRouteA2.Team_player_sessions.length-1;
        console.log(countLastPlayerDragged);

        var lastPlayerDraggedId = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].Person.Player.id;
        console.log(lastPlayerDraggedId);

        var sessionIdAfterReload1 = this.toListFetchRouteA2.id; /** this is the session id **/
        console.log(sessionIdAfterReload1);

        var teamIdFetched = this.toListFetchRouteA2.team_id;

        var reservationIdToUpdateSession = this.toListFetchRouteA2.reservation_id;

        console.log("used the drag event");
        console.log(e);
        console.log(this.onDrop3FunctionLoaded);
        console.log(this.toListFetchRouteA2.mission_id);
        console.log(this.toListFetchRouteA2.reservation_id);
        console.log(this.toListFetchRouteA2.team_id);
        console.log(this.toListFetchRouteA2.route_id);
        console.log(this.toListFetchRouteA2.team_vs_team_id);
        console.log(this.toListFetchRouteA2.id);

        var checkIfMinor = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].Person.minor;
        console.log(checkIfMinor);

        if(checkIfMinor == "yes"){
          console.log(" 09 ");
          console.log(lastPlayerDraggedId);

          var checkPlayerIdforMinor = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].Person.player_id;
          console.log(checkPlayerIdforMinor);

          var checkDraggedMinorId = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].Person.person_id;
          console.log(checkDraggedMinorId);

          var checkReservationMinorId = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].id;
          console.log(checkReservationMinorId);

          // axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+lastPlayerDraggedId+'/session/'+sessionIdAfterReload1,{
              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
                team_id: teamIdFetched,
                player_id: checkPlayerIdforMinor,
                session_id: sessionIdAfterReload1,
                player_minor_id: checkDraggedMinorId
              })
              
              .then(response => {

                console.log(response.data);
                console.log("inserted after reload");

                axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+checkReservationMinorId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

              })

              .catch(error => {
                console.log(error);
              });
          }

        else{ /** NOT MINOR **/

            var checkReservationPlayerId = this.toListFetchRouteA2.Team_player_sessions[countLastPlayerDragged].id;

            console.log(checkReservationPlayerId);

          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
          team_id: teamIdFetched,
          player_id: lastPlayerDraggedId,
          session_id: sessionIdAfterReload1
        })
                .then(response => {

                  console.log(response.data);

                  axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+checkReservationPlayerId,{
                    session_id: sessionIdAfterReload1 
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                })

                .catch(error => {
                  console.log(error);
                });

        }
      },


      onChange(event){
        // console.log(this.list2['id']);
        console.log(this.organizationselected1);

        var missionid = this.teamByTime2[0].mission_id;
        this.selected1 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/


        var draggedPlayerId = this.list2[this.list2.length - 1].id; /* this will always select the last player id dragged */
        console.log(draggedPlayerId);

        // console.log('one drop');
        // console.log(this.element.id);
        console.log(this.teamname1id[0].id);
        var reservationid = this.list2[0].reservation_id;
        var teamId = this.teamname1id[0].id;
        var organizationid = this.organizationselected1;
        var sessionID = this.list2sessionid;
        console.log(organizationid);

        var routeId = 1;
        // console.log(this.list2);

          if(teamId > 0){
            // console.log('greater than 0');
            // console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
            // team_id: teamId,
            // route_id: routeId,

              organization_id: organizationid

            })
            .then(response => {

              console.log(response.data);

            })

            .catch(function (error) {
              console.log(error);
            });
          }

      },

      onChange2(event){
        // console.log(this.list2['id']);
        console.log(this.organizationselected1);

        var missionid = this.teamByTime2[0].mission_id;
        this.selected2 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/


        var draggedPlayerId = this.list4[this.list4.length - 1].id; /* this will always select the last player id dragged */
        console.log(draggedPlayerId);

        // console.log('one drop');
        // console.log(this.element.id);
        console.log(this.teamname2id[0].id);
        var reservationid = this.list4[0].reservation_id;
        var teamId = this.teamname2id[0].id;
        var organizationid = this.organizationselected2;
        var sessionID = this.list4sessionid;
        console.log(organizationid);

        var routeId = 1;
        // console.log(this.list2);

          if(teamId > 0){
            // console.log('greater than 0');
            // console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
            // team_id: teamId,
            // route_id: routeId,
            
              organization_id: organizationid

            })
            .then(response => {

              console.log(response.data);

            })

            .catch(function (error) {
              console.log(error);
            });
          }

      },


      onChange3(event){
        // console.log(this.list2['id']);
        console.log(this.organizationselected3);

        var missionid = this.teamByTime2[0].mission_id;
        this.selected3 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/


        var draggedPlayerId = this.list5[this.list5.length - 1].id; /* this will always select the last player id dragged */
        console.log(draggedPlayerId);

        // console.log('one drop');
        // console.log(this.element.id);
        console.log(this.teamname3id[0].id);
        var reservationid = this.list5[0].reservation_id;
        var teamId = this.teamname3id[0].id;
        var organizationid = this.organizationselected3;
        var sessionID = this.list5sessionid;
        console.log(organizationid);

        var routeId = 1;
        // console.log(this.list2);

          if(teamId > 0){
            // console.log('greater than 0');
            // console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
            // team_id: teamId,
            // route_id: routeId,
            
              organization_id: organizationid

            })
            .then(response => {

              console.log(response.data);

            })

            .catch(function (error) {
              console.log(error);
            });
          }

      },

      onChangeMission1(event, colvalue){

        console.log(event); /** this print out the selected values as 1,2,3 for cyberbot,blockmonster, promode**/

        // var getSessionId = this.fetchPlayerList[colvalue].Team_player_sessions[0].session_id;

        var getSessionId = this['list'+colvalue+'sessionid'];

        var selectedMissionId = event;

        console.log("inside on change mission"+selectedMissionId+' '+ getSessionId);

            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionId,{

              mission_id: selectedMissionId

            })
            .then(response => {

              console.log(response.data);

            })

            .catch(function (error) {
              console.log(error);
            });

      },

       onChangeMission3(event){
        console.log(this.list5sessionid);
        console.log(event); /** this print out the selected values as 1,2,3 for cyberbot,blockmonster, promode**/

        var selectedMissionId = event;

        console.log("inside on change mission");

        // var missionid = this.teamByTime2[0].mission_id;
        // this.selected1 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/


        var draggedPlayerId = this.list5[this.list5.length - 1].id; /* this will always select the last player id dragged */
        // console.log(draggedPlayerId);
        // console.log(this.teamname1id[0].id);
        var reservationid = this.list5[0].reservation_id;
        var teamId = this.teamname3id[0].id;
        var organizationid = this.organizationselected3;
        var sessionID = this.list5sessionid;
        // var missionid = this.selected1;
        var missionid = selectedMissionId;

        console.log(missionid);

        var routeId = 1;

          if(teamId > 0){
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{

              mission_id: missionid

            })
            .then(response => {

              console.log(response.data);

            })

            .catch(function (error) {
              console.log(error);
            });
          }

      },

      reservationBy: function(e) {
        
        var peopleBookedId = e.target.value;
        console.log(peopleBookedId);

        // http://localhost:9090/people/140

        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleBookedId,{

            })
            .then(response => {
              console.log(response.data);
              this.reservationNameDragged1 = response.data.last_name;
              console.log(response.data.last_name);
            })

            .catch(function (error) {
              console.log(error);
            });

    },

    selectedPlayerId: function(e){
      console.log(e.traget.value);
    },

      checkMove1(evt){
        // if (evt.draggedContext.element.name=='apple'){
        //   return false
        // }
        console.log('check move 1');
        console.log(this.teamName10.length);
        // console.log(sortKey);

        if(this.teamName10.length > 1){
          return true;
        }
        else{
          return false;
        }

        if(this.teamName2.length > 2){
          return true;
        }
        else{
          return false;
        }
     },

     checkMove2(evt){
        console.log('check move 2');
        if(this.teamName2.length < 1){
           return false
        }
      },

      // list1Move(evt){
      //   console.log("ins");
      // },

      getpersonDetails1(event){ /** right now it only selects list2 or list 4 **/

        console.log("Dragged back to reservation");
        console.log(event);
        // // console.log(this.list2[0].id);

        // // console.log(this.list4[0].id);

        // // this.playerSessionDetail4 = response.data[0].id;
        //       var draggedPlayerId = this.list2[0].id;
        //       var sessionIdInserted = this.playerSessionDetail1;

        //       console.log(this.playerSessionDetail1);

        //       /** checks the session id and post again using axios.post for team player session table **/
        //       // if(this.list2[0].id > 0){
        //       //   console.log("first");
        //       // }
        //       // if(this.list2[1].id > 0){
        //       //   console.log("second");
        //       // }

        //       if(sessionIdInserted > 0){

        //         console.log("inside man");

        //         axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
        //         // session_id: sessionIdInserted,
        //         // team_id: teamId
        //         // player_id: draggedPlayerId
        //         })
        //         .then(response => {
        //           var getTeamPlayerSessionId1 = response.data[0].id;
        //           console.log(getTeamPlayerSessionId1);

        //           axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+getTeamPlayerSessionId1);

        //         })
      },

    // },

      checkPlayerId1(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdOne = response.data.slice(-1)});
      },

      checkPlayerId2(){
        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => {this.lastTeamIdTwo = response.data.slice(-1)});
      },

      submitFirstNameList(){

        axios.post(process.env.VUE_APP_DATABASE_TEAMS,{
        name: this.teamName10,
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

      // teambytimeRepeat() {
      //     const grouped = this.teamByTime2.reduce((map, { text, time }) => {
      //       let group = map.get(time) || map.set(time, []).get(time)
      //       group.push(text)
      //       return map
      //     }, new Map())

      //     return Array.from(grouped, ([ time, texts ]) => ({ time, texts }))
      //   }

      disableButton: function (){
        console.log(" INSIDE disabled");
        /** this.disableButton = true; **/
      },

      fullNameOk() {
        console.log("koiralo la ja");
        // if(this.list4[0].rfidState2.length > 3){
        //   console.log("inside KOIRALO");
        // }
      },

      rfidState1() {
        return this.rfid1.length > 7 ? true : false
      },

      rfidState2() {
        return this.rfid2.length > 5 ? true : false
      },

      rfidState3() {
        return this.rfid3.length > 5 ? true : false
      },

      convertedTime() {

          // var currentTimeUse = moment().format('h:mm A');

          // var subtracttime = moment().subtract(55 , 'minutes');
          // var arr = this.teamByTime2;

          // for(var i=0; i < arr.length; i++){

          // }
          console.log(this.teamByTime2[1].reservation_for);

          return moment(this.teamByTime2[1].reservation_for).add(2, 'hours').add(30, 'minutes').format('h:mm A');

          // items[0].arrivalTime =  moment(b.items[0].arrivalTime,"h:mm A").format("h:mm A");

        }
        // return this.posts.sort(compare);
    },

    filters: {
    moment: function (date) {
      // return moment(date).add(2, 'hours').add(30, 'minutes').format('h:mm A');
      return moment(date).format('h:mm A');
    },

    // fetchList1: function (){
    //   console.log("sadasdas");
    //   // console.log(this.dateTime1Data);
    // }
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

#insertTeamFirst{
  color: #C0C0C0; font-size: 15px; font-style: italic; margin-top: 5%;
}

#div2 {
  width: 350px;
  height: 70px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}

.active{
  background-color:red;
}

.red {
  background-color: #90EE90;
}

</style>
