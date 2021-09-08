<template>
  <div id="app">

    <p style="font-size: 2em;"><b>GAME BAY ONBOARDING</b></p>
    <hr>

    <div class="bv-example-row" id="mainContainer">

      <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true">
        Page will refresh in 3 seconds.
      </b-modal>


      <!-- same rfid value used modal -->
      <b-modal id="modal-sameReader" centered v-bind:hide-footer="true" v-bind:hide-header="true">
        <p class="warning"><b> You have already used that wristband for a player. Please use a different one.</b></p>
        
        <br>
        <!-- {{emptyBoxValue}} -->
        <b-row>
          <b-col><b-button variant="primary" @click="hideSameReaderModal">OK</b-button></b-col>
        </b-row>

      </b-modal>

      <!-- delete game bay team modal -->
      <b-modal id="modal-deleteGameBayTeam" centered v-bind:hide-footer="true">
        <b-row>
          <b-col><b>Are you sure you want to delete this team ?</b></b-col>
        </b-row>
        <br><br>
        <b-row>
          <b-col>
            <b-button variant="primary" v-on:click="yesDeleteTeam()">YES</b-button>
          </b-col>
          <b-col>
            <b-button variant="info" v-on:click="hideDeleteTeamModal()">No</b-button>
          </b-col>
        </b-row>
      </b-modal>
      <!-- end of delete game bay team modal -->


      <!-- this modal is used to reloadReservation -->
      <b-modal id="modal-reloadReservation" centered v-bind:hide-footer="true">
        <b-row>
          <!-- <p class="playerModalText"><b> This box contains. {{reservationSessionId}}</b></p> -->
        </b-row>

        <b-container class="bv-example-row" fluid="lg">
          <b-row style="font-weight:bold;">
            <b-col cols="6"><p>Full Name</p></b-col>
            <b-col cols="2"><p>Player</p></b-col>
            <b-col cols="2"><p>Assigned</p></b-col>
          </b-row>

          <b-row v-for="reservationListings in clickedReservationId.Reservation_people" v-bind:key="reservationListings.id">
            <b-col style="text-transform: capitalize;" cols="6">{{reservationListings.Person.first_name}} {{reservationListings.Person.last_name}}</b-col>

            <b-col>
              <p>A</p>
            </b-col>

            <b-col>
              <p v-if="reservationListings.session_id > '0'"><input type="checkbox" id="jule" value="reservationListings.Person.first_name" v-on:click="updateReservationSession($event, reservationListings.player_minor_id = 0, reservationListings.person_id, reservationListings.id)" checked></p>
              <p v-else><input type="checkbox" value="reservationListings.Person.first_name" disabled></p>
            </b-col>

          </b-row>

          <b-row v-for="reservationListings in clickedReservationId.Reservation_minors" v-bind:key="reservationListings.id">
            <b-col style="text-transform: capitalize;" cols="6">{{reservationListings.Player_minor.first_name}} {{reservationListings.Player_minor.last_name}}</b-col>

            <b-col>
              <p>M</p>
            </b-col>

            <b-col>
              <p v-if="reservationListings.session_id > '0'"><input type="checkbox" id="jule" value="reservationListings.Player_minor.first_name" v-on:click="updateReservationSession($event, reservationListings.player_minor_id = 'M', reservationListings.player_minor_id, reservationListings.id)" checked></p>

              <p v-else><input type="checkbox" value="reservationListings.player_first_name" v-on:click="updateReservationSession($event, reservationListings.reservation_people_minor_table_id, reservationListings.minor_tag)" disabled></p>
            </b-col>

          </b-row>

        </b-container>

        <hr>
        <b-row class="my-1" style="margin-left: 2%;">
          <b-col sm="2"><b-button variant="primary" v-on:click="emptyBoxReload()">YES</b-button></b-col>
          <b-col><b-button variant="info" @click="hideReloadReservationModal()">NO</b-button></b-col>
        </b-row>
      </b-modal>

      <!-- modal for ASSIGN-RFID -->
      <b-modal id="modal-center" ref="sideRfidUpdate10" centered v-bind:hide-footer="true">
        <b><p class="capitalLetters">{{teamName}} Side A {{sessionDateTime}}</p></b>

        <b-row class="my-1">
          <b-col sm="12">

            <div v-for="(listings, index) in releasedPlayerList" :key="index">

              <br/>
              <b-row>
                <b-col sm="1">
                  <p v-if="!listings.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                  <p v-else>&#10060;</p>
                </b-col>

                <b-col sm="6">
                  <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                  <input type="text" v-model="listings.id" disabled style="display:none;"/>
                </b-col>
                <b-col sm="3">
                  <b-form-input v-model="listings.rfidState1" ref="rfidInputRef" v-on:input="posttorfidapi($event, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false">
                  </b-form-input>

                </b-col>

                <b-col sm="2">
                  <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfid($event,index)"></b-icon>
                </b-col>

              </b-row>

            </div>

          </b-col>
        </b-row>

        <br/>

        <b-row>
          <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked()">SAVE & CLOSE</b-button></b-col>
          <br/>
        </b-row>
        <br/>
      </b-modal>
      <!-- end of ASSIGN RFID modal -->


      <b-row>

        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->


        <!-- start of center div which consists of table with all details -->
        <b-col lg="7" style="background-color:#fafafa;height: 650px;">

          <div class="bv-example-row">

            <br>
            <b-row>

              <b-col>
                <b-col :class="{ red : sendtoWaitList }">

                  <b-row class="my-1">
                    <b-col sm="2">

                    </b-col>
                    <b-col sm="2">
                      <b-form-input type="text" name="reservationTime1" v-model="sessionDateTime" disabled></b-form-input>
                      <!-- {{timeListText | fetchList1}} -->
                    </b-col>
                    <b-col sm="5">

                      <b-form-input size="md" v-model="teamName" placeholder="TEAM NAME" v-on:change="posttoapi($event,10)" style="text-transform: uppercase" maxlength="20"></b-form-input>

                    </b-col>

                    <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                      <b-icon icon="trash-fill" font-scale="1.5" @click="deleteGameBayTeam(event)"></b-icon>
                    </b-col>

                  </b-row>

                  <div class="container" style="border-style: outset; width: 95%; margin:auto; border-color:#17a2b8; border-width:thin; height:440px; aria-hidden:false;">

                    <draggable id="dragPlayerDiv" data-source="juju" :list="releasedPlayerList" class="list-group1" draggable=".playerItem" group="a" @choose="dragStart($event,1)" @change="dragPlayerOut($event)" @add="dragPlayerIn($event)">

                      <!--                         <draggable id="first" data-source="juju" :list="releasedPlayerList" class="list-group1" draggable=".item" group="a" style="height: 440px;" @choose="dragStart($event,1)" :move="checkMove($event)" @end="drag=false"> -->

                        <div class="col playerItem" v-for="(element, index) in releasedPlayerList" :key="index">
                          <b-row>
                            <b-col sm="2">

                              <!-- <p v-if="releasedPlayerList[index].rfidState1 == '' || !releasedPlayerList[index].rfidState1 > '0'">&#10060;</p>
                              <p v-if="releasedPlayerList[index].rfidState1 > '0'" style='color:green;'>&#9989;</p> -->
                              <img src="./assets/nowristband.png" style="width:120%;height:100%;" v-if="releasedPlayerList[index].rfidState1 == '' || !releasedPlayerList[index].rfidState1 > '0'"/>
                              <img src="./assets/greenWristband.png" style="width:120%;height:100%;" v-else/>
                            </b-col>

                            <b-col sm="9" style="text-transform:capitalize;">
                              {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                            </b-col>

                            <b-col sm="0">
                              {{element.Person.minorsymbol}}
                            </b-col>

                            <b-col sm="0">
                              <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                            </b-col>

                            <b-col sm="1">
                              <p v-if="element.Person.Player.play_count > '1' ">R</p>
                            </b-col>
                          </b-row>
                        </div>

                      </draggable>
                    </div>


                    <br/>

                    <b-row>
                      <b-col sm="1" style="margin-left:2%;">

                      </b-col>
                      <b-col sm="3">
                        <label for="input-large">Mission</label>
                      </b-col>
                      <b-col sm="5" style="margin-left: 1%;">
                        <b-form-select v-model="missionSelected" v-on:change="onChangeMission1($event, 10)">
                          <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <br />

                    <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                      <p> You are going to update data for <b> {{teamName}} </b> </p>
                      <br>

                      <b-button variant="primary" v-on:click="submitFirstNameList(); hideModal();">SUBMIT</b-button>
                      <br>

                    </b-modal>

                    <b-row>

                      <div style="width: 41%; margin:auto;">
                        <b-row>
                          <b-col>
                            <b-button block v-b-modal.modal-center variant="info">Assign RFID</b-button>
                          </b-col>
                          <b-col>
                            <b-button block variant="primary" v-if="activateButton == '1' && sendtoWaitList != 'true'" @click="activateTeam()">Send to Waitlist</b-button>
                            <b-button block variant="primary" v-if="activateButton == '0'" disabled>Send to Waitlist</b-button>
                            <b-button block variant="warning" v-if="sendtoWaitList == 'true' " @click="unactivateTeam()">Remove Waitlist</b-button>
                                <!-- <div v-if="removeWaitlist0 == false">
                                  <b-button block v-if="disableButton0 == false" variant="primary" disabled>Send To Waitlist</b-button>
                                  <b-button block v-else variant="primary" v-on:click="activateTeam($event, 10)">Send To Waitlist</b-button>
                                </div>
                                <div v-else>
                                  <b-button block variant="warning" v-on:click="removeWaitingList($event, 0)">Remove Waitlist</b-button>
                                </div> -->

                              </b-col>
                            </b-row>
                          </div>
                        </b-row>

                        <br/>

                      </b-col>

                      <!-- </form> -->

                      <!-- end of the form here -->

                    </b-col>

                    <!-- <b-col>
                      <div>
                        <draggable id="first" data-source="juju" :list="releasedPlayerList" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="dragPlayerIn($event)" @change="dragPlayerOut($event)">
                          <div class="list-group-item item" v-for="(element, index) in releasedPlayerList" :key="index">
                            <b-row>
                              <b-col sm="0">

                                <p v-if="releasedPlayerList[index].rfidState1 == '' || !releasedPlayerList[index].rfidState1 > '0'">&#10060;</p>
                                <p v-if="releasedPlayerList[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                              </b-col>

                              <b-col sm="9">
                                {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                              </b-col>

                              <b-col sm="0">
                                {{element.Person.minorsymbol}}
                              </b-col>

                              <b-col sm="0">
                                <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                              </b-col>

                              <b-col sm="1">
                                <p v-if="element.Person.Player.play_count > '1' ">R</p>
                              </b-col>
                            </b-row>
                          </div>

                        </draggable>
                      </div>
                    </b-col> -->

                  </b-row>

                </div>

                <br/>
              </b-col>

              <!-- start of right div -->
              <b-col lg="3"  style="background-color:#f0f0f0; height: 650px; overflow:scroll;">

                <b-row>

                  <b-col>
                    <br>


                    <div v-for="reservation in teamByTime2" v-bind:key="reservation.id">
                      <br>
                      <p class="filters">{{reservation.reservation_for | moment}}</p>

                      <b v-if="reservation.Booker.Person.last_name == 'undefined' || reservation.Booker.Person.last_name == 'null'" style="text-transform: capitalize" >{{reservation.Booker.Person.first_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}}- <button  type="button" class="btn btn-outline-primary" v-on:click="reservationSessionId = reservation.id, reservationDetail($event,reservation.id)" v-b-modal.modal-reloadReservation style="margin-bottom: 2%;">&#10002;</button> </b>

                      <b v-else style="text-transform: capitalize">{{reservation.Booker.Person.last_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}} 
                        <span v-if="reservation.battlemode > '0' "> <br> Battle Mode </span> <button  type="button" class="btn btn-outline-primary" v-on:click="reservationSessionId = reservation.id, reservationDetail($event,reservation.id)" v-b-modal.modal-reloadReservation style="margin-bottom: 2%;">&#10002;</button></b>

                        <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1"> -->
                          <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" @choose="dragStart($event,2)" @add="onDragBackReservation($event,2)" >
                            <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.id">
                              <!-- <p>{{element.Person.first_name}}  {{ element.Person.last_name }} {{element.Person.minorsymbol}}</p> -->
                              <b-row>
                                <b-col sm="8">
                                  <p v-if="element.Person.last_name == 'undefined'" style="text-transform: capitalize"> {{element.Person.first_name}}</p>
                                  <p v-else style="text-transform: capitalize"> {{element.Person.first_name}} {{element.Person.last_name}}</p>
                                </b-col>
                                <b-col sm="1">
                                  {{element.Person.minorsymbol}}
                                </b-col>
                              </b-row>
                            </div>
                          </draggable>
                          <div slot="footer" class="btn-group list-group-item" role="group" aria-label="Basic example">

                          </div>

                        </div>
                        <br><br>
                      </b-col>
                    </b-row>
                  </b-col>
                  <!-- end of right div -->


                </b-row>



              </div>

              <!-- <rawDisplayer class="col-2" :value="list" title="List" /> -->

              <!-- <rawDisplayer class="col-2" :value="dataList3" title="dataList3" /> -->

              <br/>
              <br/>

              <div class="bv-example-row" style="width:80%;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

                <b-row>
                  <b-col><a href="/#/Onboardingtest">Onboarding Test</a></b-col>
                  <!-- <b-col><a href="/#/Print">Print Score</a></b-col> -->
                  <b-col>On Deck</b-col>
                  <!-- <b-col>Room Status</b-col> -->
                  <b-col>CCTV</b-col>
                  <b-col><a href="/#/controlroom">Control Room</a></b-col>
                  <b-col>Photo Bomb</b-col>
                  <b-col>Bomb Vision</b-col>
                  <b-col>Stats</b-col>
                  <b-col>Support</b-col>
                  <b-col><a href="https://docs.google.com/document/u/3/?tgif=c" target="_blank">EOD</a></b-col>
                  <b-col>Photo Bomb</b-col>
                  <!-- <b-col> | </b-col> -->
                  <b-col><a href="https://joinhomebase.com/" target="_blank">Homebase</a></b-col>
                  <b-col><a href="https://xola.com/_public/login.html" target="_blank">Xola</a></b-col>
                  <b-col><a href="https://squareup.com/login" target="_blank">Square</a></b-col>

                </b-row>

              </div>

              <br/>


            </div>
          </template>

          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/v-img@latest/dist/v-img.min.js"></script>
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

    axios.get(process.env.VUE_APP_DATABASE_MISSION).then(response => (this.missions = response.data ));

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
    this.sessionDateTime = dateTime1;
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
    console.log(this.sessionDateTime);
    console.log("DATE TIME BOX 1 "+this.sessionDateTime);
    console.log("DATE TIME BOX 2 "+this.dateTime2BData);
    console.log(dateTime1);
    console.log(dateTime3);

    this.sessionRowDateTime = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD hh:mm:00");

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

    // var startReservationTime = moment().subtract(2, 'hours').format('HH:mm:ss');
    // var endReservationTime = moment().add(2, 'hours').format('HH:mm:ss');
    var startReservationTime = moment().format('00:00:00');
    var endReservationTime = moment().format('23:59:00');

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
                

                /** added this line to format reservation people based upon first name **/
                console.log(this.teamByTime2[0]);
                this.teamByTime2[i].Reservation_people.sort((a,b) => a.Person.first_name.localeCompare(b.Person.first_name));
                /** end of format reservation people following first name **/


              }

            } 

            /** end of DISPLAY MINORS after PERSON DRAGGED SCENARION **/

            else{
              console.log("NOT ONLY MINORS");
            }

          }

          else{

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


                  for(let j=0; j < response.data[i].Reservation_minors.length; j++){

                    console.log(response.data[i].Reservation_minors.length);

                    var countReservationPeople1 = response.data[i].Reservation_people.length;
                    var incrementObject = countReservationPeople1++;
                    console.log(incrementObject);

                    console.log("True");
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
                    // this.teamByTime2.Reservation_people.sort((a,b) => a.Person.last_name.localeCompare(b.Person.last_name));

                    /** added this line to format reservation people based upon first name **/
                    console.log(this.teamByTime2[0]);
                    this.teamByTime2[i].Reservation_people.sort((a,b) => a.Person.first_name.localeCompare(b.Person.first_name));
                    /** end of format reservation people following first name **/
                  }

                } 

                /** end of DISPLAY MINORS after PERSON DRAGGED SCENARION **/

                else{
                  console.log("NOT ONLY MINORS");
                }

            // this.loadScreen = false;

          }
          



        }


      })
.catch(function (error){
        // console.log("error at line 1789");
        console.log(error);
      });

},

data() {
  return {
    missions: [],
    teamByTime2:[],
    teamName:'',
    teamId:'',
    missionSelected:'',
    sendToWishlistClicked10: false,
    list:[],
    releasedPlayerList:[],
    routeId:3,
    onboardCreatedTime:'',
    onboardedTime:'',
    sessionDateTime:'',
    missionId:5,
    sessionId:'',
    sessionRowDateTime:'',
    clickedReservationId:[],
    dragStartValue: '',
    dragDropValue: '',
    activateButton:0,
    sendtoWaitList:false,
  }
},

computed:{

  checkPlayerReload(){
    console.log('check player reload here');
  }

},

methods:{

  activateTeam(){
    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
      active: 1
    })
    .then(response => {
      this.sendtoWaitList='true';
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  unactivateTeam(){
    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
      active: null
    })
    .then(response => {
      this.sendtoWaitList = false;
      this.activateButton = '1';
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  hideSameReaderModal(){
    this.$root.$emit('bv::hide::modal', 'modal-sameReader', '#btnShow');
    // this.checkRfidReader = 0;
  },

  hideModalRfidClicked(){
    this.$root.$emit('bv::hide::modal', 'modal-center', '#btnShow');
  },

  deleteGameBayTeam(event){
    console.log('inside delete game bay team');

    this.$root.$emit('bv::show::modal', 'modal-deleteGameBayTeam', '#btnShow');

  },

  yesDeleteTeam(){
    console.log('session id was '+this.sessionId);
    console.log('team player session list was '+this.releasedPlayerList);
    console.log('you need to update reservation people and minor table');


    axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{

    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    for (var i = 0; i < this.releasedPlayerList.length; i++) {

      console.log(i + ' i value ');
      if(this.releasedPlayerList[i].Person.Player.minor == 'yes'){

        var playerId = this.releasedPlayerList[i].Person.player_id;
        var minorPeopleId = this.releasedPlayerList[i].person_id;
        var reservationId = this.releasedPlayerList[i].Person.reservation_id;

        /** update reserbation minor as null on session column **/
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorPeopleId+'/reservation/'+reservationId,{
          session_id: null
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of reservation minor as null on session column **/


        /** delelte the minor team player session **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPeopleId+'/session/'+this.sessionId,{

        })
        .then(response => {
          // console.log(response);

          var deleteTps = response.data[0].id;

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTps,{

          })
          .then(response => {
            console.log(i + ' i value ');
            console.log('Delete row '+i+' from tps');
            console.log(response);

            console.log(this.releasedPlayerList.length);

          })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of team player session**/

        /** this will refresh a page**/
        if(i+1 == this.releasedPlayerList.length){
          this.emptyBoxReload();
          this.$bvModal.hide('modal-deleteGameBayTeam');
          this.$bvModal.show('modal-success');
        }

      }/** end of if for minor check **/
      else{

        var playerId = this.releasedPlayerList[i].Person.Player.id;
        var peopleId = this.releasedPlayerList[i].Person.Player.person_id;
        var reservationId = this.releasedPlayerList[i].reservation_id;

        /** update reservation people as session id null **/
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+peopleId+'/reservation/'+reservationId,{
          session_id: null
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of reservation people update **/

        /** add the value on team player session **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+this.sessionId,{

        })
        .then(response => {
          // console.log(response);

          var deleteTps = response.data[0].id;

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTps,{

          })
          .then(response => {
            console.log('Delete row '+i+' from tps');
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of add row on team player session **/

        /** this will refresh a page**/
        if(i+1 == this.releasedPlayerList.length){
          this.emptyBoxReload();
          this.$bvModal.hide('modal-deleteGameBayTeam');
          this.$bvModal.show('modal-success');
        }

      }/**end of else for adult check **/

    }

  },

  deleteRfid(event,index){
    console.log(event);
    console.log(index);

    console.log(this.releasedPlayerList[index]);

    if(this.releasedPlayerList[index].Person.Player.minor == 'yes'){

      var playerId = this.releasedPlayerList[index].Person.player_id;
      var minorPeopleId = this.releasedPlayerList[index].person_id;
      var reservationId = this.releasedPlayerList[index].Person.reservation_id;

      /** delelte the minor team player session **/
      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPeopleId+'/session/'+this.sessionId,{

      })
      .then(response => {
          // console.log(response);

          var tpsId = response.data[0].id;

          axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId,{
            rfid_id: null
          })
          .then(response => {
            console.log(response);
            this.releasedPlayerList[index].rfidState1='';

          })
          .catch(function (error) {
            console.log(error);
          });

        })
      .catch(function (error) {
        console.log(error);
      });
      /** end of team player session**/


    }/** end if, delete RFID value from TPS for minor **/
    else{

      var playerId = this.releasedPlayerList[index].Person.Player.id;
      var peopleId = this.releasedPlayerList[index].Person.Player.person_id;
      var reservationId = this.releasedPlayerList[index].reservation_id;

      /** add the value on team player session **/
      axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+this.sessionId,{

      })
      .then(response => {
          // console.log(response);

          var tpsId = response.data[0].id;

          axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId,{
            rfid_id: null
          })
          .then(response => {
            console.log(response);
            this.releasedPlayerList[index].rfidState1='';

          })
          .catch(function (error) {
            console.log(error);
          });

        })
      .catch(function (error) {
        console.log(error);
      });
      /** end of add row on team player session **/

    }/** end else , delete RFID value from TPS for player **/


    for (var i = 0; i < this.releasedPlayerList.length; i++) {

      if(this.releasedPlayerList[i].rfidState1 != undefined || !this.releasedPlayerList[i].rfidState1.length > '3'){
        console.log('undefined value');
        this.activateButton = '0';
        // break;
      }
      else{
        console.log('value defined');
        this.activateButton = '1';
      }

    }

  },

  hideDeleteTeamModal(){
    this.$root.$emit('bv::hide::modal', 'modal-deleteGameBayTeam', '#btnShow');
  },

  dragStart($event,value){
    console.log('drag player name started');
    console.log(event);
    this.dragStartValue = value;
    console.log('this.dragstart was '+this.dragStartValue);

  },

  checkMove(evt){
    console.log(evt);
  },

  checkDrop(event){
    console.log(event);
  },

  // onDrop for Team Name 1 table it will post to session table and team_player_session table
  dragPlayerIn(event,value){
    console.log('Dragged player in');
    console.log(event);
    var index = event.newIndex;
    console.log(index);

    this.dragDropValue = value;

    // console.log(this.dragStartValue+ ' its drag start value');
    // console.log(this.dragDropValue+ ' its drag drop value');

    if(this.releasedPlayerList.length > '12' || this.dragStartValue == this.dragStopValue){

      console.log('More than 12 players');

      console.log(this.releasedPlayerList[index]);

      this.releasedPlayerList.splice(index,1);

      this.reloadRightDiv();

    }
    else{
      console.log('Less than 12 players');

      if(this.dragStartValue != this.dragDropValue){
        /** this will derrived value to drag and drop **/
        var listPlayerSize = this.list.length;
        console.log(listPlayerSize);

        this.missionSelected = '5';

        /** this if and ELSE statement is for the TEAM NAME update before and after dropping player name **/
        if(this.teamName.length < 1){
          this.teamName = 'Team Name';

          axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+this.teamName,{

          })
          .then(response => {
            console.log(response);
            this.teamId = response.data[0].id;
            this.sessionUpdate(event,index);
          })
          .catch(error => {
            console.log(error);
          });

        }
        else{
          console.log('Team name is '+this.teamName);

          axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+this.teamName,{

          })
          .then(response => {
            console.log(response);
            this.teamId = response.data[0].id;
            this.sessionUpdate(event,index);
          })
          .catch(error => {
            console.log(error);
          });

        }
      }
      else{
        console.log('dragged inside same box');
      }

    }

    // console.log(this.releasedPlayerList);

    // console.log(this.releasedPlayerList[index]);

    /** end of check for minor / adult **/
    
  },

  onDragBackReservation(event,value){
    console.log(event);
    console.log(value);
    this.dragStartValue = value;

    console.log(this.dragStartValue+ ' its drag start value');
    console.log(this.dragDropValue+ ' its drag drop value');
  },

  reservationDetail(event,reservationId){
    console.log(reservationId);
    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{

    })
    .then(response =>
    {
      console.log(response);
      this.clickedReservationId = response.data;
    })
    .catch(function (error){
      console.log(error);
    });

  },

  posttorfidapi($event,index){
    console.log(event);
    console.log(index);
    console.log(this.releasedPlayerList[index]);
    console.log('post to rfid');

    if(this.releasedPlayerList[index].rfidState1.length == '8'){
      console.log('inside rfid value post function');

      var checkRfidValue = 0;
      for (var i = 0; i < this.releasedPlayerList.length; i++) {
        var rfidValue = this.releasedPlayerList[i].rfidState1;

        console.log('rfid value was '+rfidValue);

        if(this.releasedPlayerList[index].rfidState1 != rfidValue){
          console.log('different value used');
            // break;
          }
          else{
            console.log('same value used');
            checkRfidValue++;
          }
        }

        if(checkRfidValue > 1){
          console.log('do not insert');
          this.releasedPlayerList[index].rfidState1 = null;
          this.$root.$emit('bv::show::modal', 'modal-sameReader', '#btnShow'); /** displays the modal saying same value used **/
          // this.releasedPlayerList[index].focus();
        }
        else{
          console.log('different value now insert');

          if(this.releasedPlayerList[index].Person.minor == 'yes'){
            console.log('post rfid value to minor');


            var playerId = this.releasedPlayerList[index].Person.player_id;
            var minorPlayerId = this.releasedPlayerList[index].Person.person_id;

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPlayerId+'/session/'+this.sessionId,{

            })
            .then(response =>
            {
              console.log(response);
              var tpsId = response.data[0].id;
              console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId);
              console.log(this.releasedPlayerList[index].rfidState1);

              var tappedRfid = this.releasedPlayerList[index].rfidState1;

              axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+tappedRfid.toUpperCase(),{
                tag: tappedRfid.toUpperCase(),
              })
              .then(response => {
                console.log(response);

                var rappedRfidId = response.data[0].id;

                axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId,{
                  rfid_id: rappedRfidId
                })
                .then(response =>
                {
                  console.log(response);

                  const nextIndex = index + 1;          
                  if(this.releasedPlayerList.length != nextIndex){
                    this.$refs.rfidInputRef[nextIndex].focus();
                    console.log('switch to next input field');
                  }
                  else{
                    console.log('looks like last value');
                  }

                  this.checkActivateButton();

                })
                .catch(function (error){
                  console.log(error);
                });

              })
              .catch(function (error){
                console.log(error);
              });



            })
            .catch(function (error){
              console.log(error);
            });

          }
          else{
            console.log('post rfid value to adult');

            var playerId = this.releasedPlayerList[index].Person.Player.id;

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+playerId+'/session/'+this.sessionId,{

            })
            .then(response =>
            {
              console.log(response);
              var tpsId = response.data[0].id;
              console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId);
              console.log(this.releasedPlayerList[index].rfidState1);

              var tappedRfid = this.releasedPlayerList[index].rfidState1;

              axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+tappedRfid.toUpperCase(),{
                tag: tappedRfid.toUpperCase(),
              })
              .then(response => {
                console.log(response);

                var rappedRfidId = response.data[0].id;

                axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsId,{
                  rfid_id: rappedRfidId
                })
                .then(response =>
                {
                  console.log(response);

                  const nextIndex = index + 1;          
                  if(this.releasedPlayerList.length != nextIndex){
                    this.$refs.rfidInputRef[nextIndex].focus();
                    console.log('switch to next input field');
                  }
                  else{
                    console.log('looks like last value');
                  }

                  this.checkActivateButton();
                })
                .catch(function (error){
                  console.log(error);
                });

              })
              .catch(function (error){
                console.log(error);
              });



            })
            .catch(function (error){
              console.log(error);
            });

          }

        }


      }/** close of IF for RFID VALUE update with 8 characters **/
      else{
        console.log('rfid value was less than 8');
        this.releasedPlayerList[index].rfidState1 = null;
      }

    },

    checkActivateButton(){
      for (var i = 0; i < this.releasedPlayerList.length; i++) {

        console.log('inside activate button function');
      // console.log(this.releasedPlayerList[i].rfidState1);
      // console.log(this.releasedPlayerList[i].rfidState1.length);

      // if(this.releasedPlayerList[i].rfidState1 != undefined || !this.releasedPlayerList[i].rfidState1.length > '0'){
      //   this.activateButton = '0';
      //   console.log('activate 0');
      // }
      // else{
      //   this.activateButton = '1';
      //   console.log('activate 1');

      // }

      if(this.releasedPlayerList[i].rfidState1 == undefined || !this.releasedPlayerList[i].rfidState1 > '7'){
        console.log('undefined value');
        this.activateButton = '0';
        break;
      }
      else{
        console.log('value defined');
        this.activateButton = '1';
      }

    }
  },

  updateReservationSession(event, minorOrNot, personId, reservationId){
    console.log(event);
    console.log(minorOrNot);
    console.log(personId);
    console.log(reservationId);
    console.log(event.target.checked);

    if(minorOrNot == 'M'){
      console.log('Minors as player');
      axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationId,{
        session_id: 0
      })

      .then(response => 
      {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    else{
      console.log('Player not minor');

      axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationId,{
        session_id: 0
      })
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  },

  emptyBoxReload(){
    // window.location.reload(true);
    this.$bvModal.hide('modal-reloadReservation');
    this.$bvModal.show('modal-success');
    setTimeout(function(){
     window.location.reload(true);
   }, 2500);
  },

  hideReloadReservationModal(){
    this.$root.$emit('bv::hide::modal', 'modal-reloadReservation', '#btnShow');
  },

  sessionUpdate(event,index){

    /** check minor or adult **/
    if(this.releasedPlayerList[index].Person.minor == "yes"){
      console.log('minor');

      var playerId = this.releasedPlayerList[index].Person.player_id;
      var minorPlayerId = this.releasedPlayerList[index].id;
      var minorPeopleId = this.releasedPlayerList[index].person_id;
      var reservationId = this.releasedPlayerList[index].Person.reservation_id;
      // var peopleId = this.releasedPlayerList[index].Person.id;

      console.log(reservationId);

      /** this will post out to session table **/
      axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationId+'/team/'+this.teamId+'/route/'+this.routeId,{

      })
      .then(response => {
        console.log(response);
        this.sessionId = response.data[0].id;

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
          team_id: this.teamId,
          route_id: this.routeId,
          mission_id: this.missionId,
          reservation_id: reservationId,
          session_time: moment(this.sessionRowDateTime).subtract(4,'hours'),
          location_id: 1,
          player_count: this.releasedPlayerList.length
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });


        /** add row on team player session **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPeopleId+'/session/'+this.sessionId,{
          team_id: this.teamId,
          reservation_id: reservationId
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of row on team player session **/

        /** update on reservation minor **/
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorPeopleId+'/reservation/'+reservationId,{
          session_id: this.sessionId
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of update on reservation minor **/

      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of post to SESSION table **/

    }
    else{
      console.log('adult');

      var playerId = this.releasedPlayerList[index].Person.Player.id;
      var reservationId = this.releasedPlayerList[index].reservation_id;
      var peopleId = this.releasedPlayerList[index].Person.id;
      console.log(this.sessionRowDateTime);
      console.log('team name was '+this.teamId);

      /** this will post out to session table **/
      axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationId+'/team/'+this.teamId+'/route/'+this.routeId,{

      })
      .then(response => {
        console.log(response);
        this.sessionId = response.data[0].id;

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
          team_id: this.teamId,
          route_id: this.routeId,
          mission_id: this.missionId,
          reservation_id: reservationId,
          session_time: moment(this.sessionRowDateTime).subtract(4,'hours'),
          location_id: 1,
          player_count: this.releasedPlayerList.length
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });


        /** add the value on team player session **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+this.sessionId,{
          team_id: this.teamId,
          reservation_id: reservationId
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of add row on team player session **/

        /** update session colum on reservation people **/
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+peopleId+'/reservation/'+reservationId,{
          session_id: this.sessionId /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of add row on team player session **/

      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of post to SESSION table **/

    }

    /** end of session post for player table **/
  },

  dragPlayerOut(event){
    console.log(event);
    console.log(event.removed);

    // if(this.dragStartValue != this.dragDropValue){
    //   console.log('dragged on different box as for change part');
    if(event.removed.element.id > '0'){

      if(event.removed.element.Person.minor == 'yes'){
        console.log('Dragged out minor');

        var minorPlayerId = event.removed.element.Person.Player.id;
        var minorPeopleId = event.removed.element.Person.person_id;
        var reservationId = event.removed.element.Person.reservation_id;
        var playerId = event.removed.element.Person.player_id;

        /** update null on session column for reservation minor **/
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorPeopleId+'/reservation/'+reservationId,{
          session_id: null
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of update session column for reservation minor table **/

        /** delete the value on team player session **/
        console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPeopleId+'/session/'+this.sessionId);

        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+minorPeopleId+'/session/'+this.sessionId,{

        })
        .then(response => {
          // console.log(response);

          var deleteTps = response.data[0].id;

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTps,{

          })
          .then(response => {
            console.log(response);

            /** update the player_count on session table now **/
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
              player_count: this.releasedPlayerList.length
            })
            .then(response => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of player count update **/

          })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of delete row on team player session **/

      }
      else{
        console.log('Dragged out player');

        var playerId = event.removed.element.Person.Player.id;
        var peopleId = event.removed.element.Person.Player.person_id;
        var reservationId = event.removed.element.reservation_id;

        /** update null on session column for reservation people **/
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+peopleId+'/reservation/'+reservationId,{
          session_id: null
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of update session column for reservation people table **/

        /** delete the value on team player session **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+this.sessionId,{

        })
        .then(response => {
          // console.log(response);

          var deleteTps = response.data[0].id;

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTps,{

          })
          .then(response => {
            console.log(response);

            /** update the player_count on session table now **/
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.sessionId,{
              player_count: this.releasedPlayerList.length
            })
            .then(response => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of player count update **/

          })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of delete row on team player session **/


      }

    }
    
    // else{
    //   console.log('dragged on same box as for change part');
    // }

    
  },

  posttoapi(event, col){

    console.log(col);
    console.log(event);

    var teamName = this.teamName;

    axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
              // name: teamName
            })
    .then(response => {

      console.log(response);
      console.log(response.data);
      console.log(response.data[0].id);

    })

    .catch(function (error) {
      console.log(error);
    });

  },

  reloadRightDiv(){
    var starttime='start';
    var endtime='end';
    // var currentdate = moment().subtract(9, 'days').format("YYYY-MM-DD");
    var currentdate = moment().format("YYYY-MM-DD");
    // console.log(currentdate);

    // var startReservationTime = moment().subtract(2, 'hours').format('HH:mm:ss');
    // var endReservationTime = moment().add(2, 'hours').format('HH:mm:ss');
    var startReservationTime = moment().format('06:00:00');
    var endReservationTime = moment().format('23:59:00');

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


                  for(let j=0; j < response.data[i].Reservation_minors.length; j++){

                    console.log(response.data[i].Reservation_minors.length);

                    var countReservationPeople1 = response.data[i].Reservation_people.length;
                    var incrementObject = countReservationPeople1++;
                    console.log(incrementObject);

                    console.log("True");
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


      })
.catch(function (error){
        // console.log("error at line 1789");
        console.log(error);
      });
}/** end of reloadDiv **/

}, /** end of method **/

filters:{
  moment: function (date) {
    return moment(date).format('h:mm A');
  },
},


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
  background-color: white;
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

.dropdownbox{
  width: auto; 
  margin-left: auto;
  height: 80%;
  color:#17A2B8;
  border-color:#17A2B8;
  border-radius:7px;
}

#dragPlayerDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  text-align: center;
  /*background-color: yellow;*/
  height:440px;
  align-content: start;
  margin-top:1%;
}
.playerItem {
  border-radius:7px;
  border-color:#dfdfdf;
  color:black;
  background-color: #fff;
  height:100%;
  width: 50%;
  border-style:groove ;
  padding-top: 2%;
  margin-bottom: 4%;
  border-width: 1px;
}
.my-handle {
  cursor: move;
  cursor: -webkit-grabbing;
}

</style>
