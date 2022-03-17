<template>
  <div style="width: 88%; margin:auto; margin-top: 2%;">
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


  <div class="bv-example-row">

    <b-row>

      <!-- check team name once the player name is dragged -->

      <b-modal id="modal-checkTeamName" centered v-bind:hide-footer="true" title="Missing Team Name">
        <div> Please write down the team name which should be more than 2 characters and then drag the players. </div>
        <br>
        <b-col><b-button block variant="primary" @click="closeCheckTeamName()">OK</b-button></b-col>
      </b-modal>

      <!-- end of check team name once the player name is dragged -->

      <!-- missing player id modal -->

      <b-modal id="modal-checkPlayerId" centered v-bind:hide-footer="true" title="Error Missing Player Id">
        <div> Unable to drag this player as it's missing player id so we need to ask them to sign the waiver again. </div>
        <br>
        <b-col><b-button block variant="primary" @click="checkPlayerIdModal()">OK</b-button></b-col>
      </b-modal>

      <!-- end of missing player id modal -->


      <!-- the modal below will display modal to check if the TPS and RFID is scanned or not -->

      <b-modal id="modal-playersDetail" centered v-bind:hide-footer="true">
        <b-row>
          <b-col><b>PLAYER NAMES</b></b-col>
          <b-col><b>RFID SCANNED</b></b-col>
        </b-row>
        <br>
        <div v-for="element in playerDetailsArray" v-bind:key="element.id">
          <b-row>
            <b-col style="text-transform:capitalize;">{{element[0].player_name}}</b-col>
            <b-col>
              <p v-if="element[0].rfid_id > '0'" style='font-size:17px; color:green;'>&#9989;</p>
              <p v-else>&#10060;</p>
            </b-col>
          </b-row>
        </div>
      </b-modal>

      <!-- end of MODAL to check TPS and RFID value -->


      <b-modal id="modal-previousTeamRfid" centered v-bind:hide-footer="true" v-bind:hide-header="false" title="Assign RFIDs">
        <!-- <p class="warning"><b> You are inside previous button rfid and array value is {{previousTeamArrayValue}}</b></p> -->
        <!-- <br> -->
        <div v-if="previousTeamEnableRfidModal == '1'"> <!-- used this as it was throwing error while loading the page at first -->

          <b><p> {{fetchPlayerList[previousTeamArrayValue].Team.name}} - Side {{previousRouteValue}} - {{formatedReservationFor(fetchPlayerList[previousTeamArrayValue].session_time)}}</p></b>

          <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList[previousTeamArrayValue].Team_player_sessions" :key="index" >

            <b-row>

              <b-col sm="1">
                <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                <p v-else>&#10060;</p>
              </b-col>

              <b-col sm="6">
                <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
              </b-col>

              <b-col sm="3">
                <!-- <div v-if="teamfetch.rfid_id > 0 || !teamfetch.rfidState1 == ''">
                  <b-form-input disabled style="background-color: #33FF90;color:#33FF90;">
                  </b-form-input>
                </div>
                <div v-else>
                  <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="previousTeamRfidUpdate($event, previousTeamArrayValue, index)">
                  </b-form-input>
                </div> -->

                <div v-if="teamfetch.rfid_id > '0'">
                  <b-form-input disabled style="background-color: #33FF90;color:#33FF90;">

                  </b-form-input>
                  <!-- <p>P</p> -->
                </div>

                <div v-else>
                  <b-form-input v-model="teamfetch.rfidState1" v-on:input="previousTeamRfidUpdate($event, previousTeamArrayValue, index)" :style="teamfetch.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null">
                  </b-form-input>
                  <!-- <p>S</p> -->
                </div>

              </b-col>

              <b-col sm="2">
                <!-- <p v-if="teamfetch.Rfid != null"> -->
                  <!-- <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleteTeamRfidUpdate($event, previousTeamArrayValue, index) , activeBtn = 'btn1' "></b-icon> -->
                  <button type="button" class="btn btn-outline-primary" v-if="teamfetch.Rfid != null" @click="teamfetch.Rfid.tag='' , deleteTeamRfidUpdate($event, previousTeamArrayValue, index) , activeBtn = 'btn1' ">Clear</button>
                  <!-- </p> -->
                  <!-- <p v-else> -->
                    <button type="button" class="btn btn-outline-primary" v-else @click="teamfetch.rfidState1='', deleteTeamRfidUpdate($event, previousTeamArrayValue, index)" >
                      Clear
                    </button>
                    <!-- <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleteTeamRfidUpdate($event, previousTeamArrayValue, index)" ></b-icon> -->
                    <!-- </p> -->
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- {{emptyBoxValue}} -->

            <br/>

            <b-row>
              <b-col><b-button variant="primary" @click="hidePreviousteamRfid">OK</b-button></b-col>
            </b-row>

          </b-modal>


          <!-- this modal will be displayed when the user tries to delete box after reload -->
          <b-modal id="modal-previousDeleteBox" centered v-bind:hide-footer="true" title="Clear Team">
            <p><b> This will reset the team name and mission, and unassign all its players. Are you sure ?</b></p>

            <br>
            <!-- {{emptyBoxValue}} -->
            <b-row>
              <b-col cols="4"><b-button variant="primary" @click="previousEmptyBox($event, previousTeamArrayValue), reloadPageEvent()" >Clear Team</b-button></b-col>
              <b-col cols="1"><b-button variant="info" @click="previousDeleteBoxModal()">Cancel</b-button></b-col>
            </b-row>

          </b-modal>

          <!-- the modal below will notify user if they add more than 6 players -->
          <b-modal id="modal-morethan6players" centered v-bind:hide-footer="true" v-bind:hide-header="true">
            <p class="warning"><b> You cannot add more than 6 players in a team.</b></p>

            <br>
            <!-- {{emptyBoxValue}} -->
            <b-row>
              <b-col><b-button variant="primary" @click="hideMoreThan6Players">OK</b-button></b-col>
            </b-row>

          </b-modal>

          <b-modal id="modal-sameReader" centered v-bind:hide-footer="true" v-bind:hide-header="true">
            <p class="warning"><b> You have already used that wristband for a player. Please use a different one.</b></p>

            <br>
            <!-- {{emptyBoxValue}} -->
            <b-row>
              <b-col><b-button variant="primary" @click="hideSameReaderModal">OK</b-button></b-col>
            </b-row>

          </b-modal>

          <!-- <b-modal id="modal-emptyBox" centered v-bind:hide-footer="true"> -->
            <b-modal id="modal-emptyBox" centered v-bind:hide-footer="true" :title="clickedTeamName">
              <p><b> This will reset the team name and mission, and unassign all its players. Are you sure ?</b></p>

              <br>
              <!-- {{emptyBoxValue}} -->
              <b-row>
                <b-col cols="4"><b-button variant="primary" @click="emptyBox($event, emptyBoxValue)" >Clear Team</b-button></b-col>
                <b-col cols="1"><b-button variant="info" @click="hideEmptyBoxModal()">Cancel</b-button></b-col>
              </b-row>

            </b-modal>

            <!-- this modal is used to let front desk staff to drag out after they select 6 player -->
            <b-modal id="modal-checkMoveBox" centered v-bind:hide-footer="true">
              <b-row>
                <p class="playerModalText"><b> This box contains 6 players team, to enable dragging out player please click yes.</b></p>
              </b-row> 
              <b-row class="my-1">
                <b-col sm="2"><b-button variant="primary" @click="checkMoveButton($event, checkMoveButtonValue), $bvModal.hide('modal-checkMoveBox')" >YES</b-button></b-col>
                <b-col sm="2"><b-button variant="info" @click="$bvModal.hide('modal-checkMoveBox')">NO</b-button></b-col>
              </b-row>
            </b-modal>


            <!-- this modal is used to reloadReservation -->
            <b-modal id="modal-reloadReservation" centered v-bind:hide-footer="true" :title="clickedReservationLastName">
              <b-row>
                <!-- <p class="playerModalText"><b> This box contains. {{reservationSessionId}}</b></p> -->
              </b-row>

              <b-container class="bv-example-row" fluid="lg">
                <b-row style="font-weight:bold;">
                  <b-col cols="5"><p>Full Name</p></b-col>
                  <b-col cols="1"><p>Adult/Minor</p></b-col>
                  <b-col cols="6"><p style="text-align:right;">Assigned To Team</p></b-col>
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
                <b-col sm="2"><b-button variant="primary" v-on:click="emptyBoxReload">Save</b-button></b-col>
                <b-col><b-button variant="info" @click="hideReloadReservationModal()">Cancel</b-button></b-col>
              </b-row>
            </b-modal>



            <!-- list for all rfid b-modal -->

            <!-- <b-modal id="modal-center" ref="sideRfidUpdate" centered title="Side A" v-bind:hide-footer="true"> -->
              <b-modal id="modal-center" ref="sideRfidUpdate10" centered v-bind:hide-footer="true" title="Assign RFIDs">
                <b><p class="capitalLetters">{{teamName10}} - Side A - {{dateTime1Data}}</p></b>

                <b-row class="my-1">
                  <b-col sm="12">

                    <div v-if="fetchPlayerList0[1] > '0' ">
                      <!-- element in fetchPlayerList0.Team_player_sessions -->
                      <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList0[1].Team_player_sessions" :key="index">
                        <b-row>

                          <b-col sm="1">
                            <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                            <p v-else>&#10060;</p>
                          </b-col>

                          <b-col sm="6">
                           <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                         </b-col>

                         <b-col sm="3">


                          <div v-if="teamfetch.rfid_id > '0'">
                            <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                            </b-form-input>
                          </div>
                          <div v-else>
                            <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 0, index)">

                            </b-form-input>

                          </div>

                        </b-col>

                        <b-col sm="2">
                          <p v-if="teamfetch.Rfid != null">
                            <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 10, index) , activeBtn = 'btn1' "></b-icon>
                          </p>

                          <p v-else>
                            <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 10 , index)" ></b-icon>
                          </p>

                        </b-col>

                      </b-row>
                    </div>

                  </div>

                  <div v-else>

                    <div v-for="(listings, index) in list10" :key="index">

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
                          <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 10, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false">
                          </b-form-input>

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
                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 10)">SAVE & CLOSE</b-button></b-col>
                <br/>
              </b-row>
              <br/>

              <!-- end of row that displays fetch data from mounted -->


            </b-modal>

            <!-- end oof b-modal for rfid list -->


            <!-- sibe B 1 .. rfid update -->

            <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
              <b-modal id="modal-center11" ref="sideRfidUpdate11" centered v-bind:hide-footer="true" title="Assign RFIDs">
                <b><p class="capitalLetters">{{teamName11}} - Side B - {{dateTime1BData}}</p></b>

                <b-row class="my-1">
                  <b-col sm="12">

                    <div v-if="fetchPlayerList1[1] > '0' ">
                      <!-- element in fetchPlayerList1.Team_player_sessions -->
                      <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList1[1].Team_player_sessions" :key="index">
                        <b-row>

                          <b-col sm="1">
                            <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                            <p v-else>&#10060;</p>
                          </b-col>

                          <b-col sm="6">
                           <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                         </b-col>

                         <b-col sm="3">

                          <div v-if="teamfetch.rfid_id > '0'">
                            <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                            </b-form-input>
                          </div>
                          <div v-else>
                            <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 1, index)">

                            </b-form-input>

                          </div>

                        </b-col>

                        <b-col sm="2">
                          <p v-if="teamfetch.Rfid != null">
                            <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 11, index) , activeBtn = 'btn1' "></b-icon>
                          </p>

                          <p v-else>
                            <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 11 , index)" ></b-icon>
                          </p>

                        </b-col>

                      </b-row>
                    </div>

                  </div>

                  <div v-else>

                    <div v-for="(listings, index) in list11" :key="index">

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
            <b-modal id="modal-center12" ref="sideRfidUpdate12" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName12}} - Side A - {{dateTime2Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList2[1] > '0' ">
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList2[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">


                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 2, index)">

                          </b-form-input>

                        </div>

                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 12, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 12 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list12" :key="index">

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
            <b-modal id="modal-center13" ref="sideRfidUpdate13" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName13}} - Side B - {{dateTime2Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList3[1] > '0' ">
                    <!-- element in fetchPlayerList[13].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList3[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">


                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 3, index)">

                          </b-form-input>

                        </div>

                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 13, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 13 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list13" :key="index">

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
            <b-modal id="modal-center14" ref="sideRfidUpdate14" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName14}} - Side A - {{dateTime3Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList4[1] > '0' ">
                    <!-- element in fetchPlayerList[14].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList4[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">


                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 4, index)">

                          </b-form-input>

                        </div>

                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 14, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 14 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list14" :key="index">

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
            <b-modal id="modal-center15" ref="sideRfidUpdate15" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName15}} - Side B - {{dateTime3Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList5[1] > '0' ">
                    <!-- element in fetchPlayerList5[1].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList5[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">


                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 5, index)">

                          </b-form-input>

                        </div>

                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 15, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 15 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list15" :key="index">

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


          <!-- sibe A 4 and BOX 7 -->

          <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
            <b-modal id="modal-center16" ref="sideRfidUpdate16" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName16}} - Side B - {{dateTime4Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList6[1] > '0' ">
                    <!-- element in fetchPlayerList6[1].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList6[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">


                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 6, index)">

                          </b-form-input>

                        </div>

                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 16, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 16 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list16" :key="index">

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
                        <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 16, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                      </b-col>

                      <b-col sm="2">
                        <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 16)"></b-icon>
                      </b-col>

                    </b-row>

                  </div>

                </div>

              </b-col>
            </b-row>

            <!-- end of row that displays fetch data from mounted -->

            <br/>
            <b-row>
              <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 16);">SAVE & CLOSE</b-button></b-col>
              <br/>
            </b-row>
            <br/>

          </b-modal>

          <!-- end of sibe A 4 and BOX 7 -->


          <!-- sibe B 4 and BOX 8 -->

          <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
            <b-modal id="modal-center17" ref="sideRfidUpdate17" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName17}} - Side B - {{dateTime4Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList7[1] > '0' ">
                    <!-- element in fetchPlayerList7[1].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList7[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">
                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 7, index)">

                          </b-form-input>
                        </div>
                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 17, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 17 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list17" :key="index">

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
                        <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 17, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                      </b-col>

                      <b-col sm="2">
                        <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 17)"></b-icon>
                      </b-col>

                    </b-row>

                  </div>

                </div>

              </b-col>
            </b-row>

            <!-- end of row that displays fetch data from mounted -->

            <br/>
            <b-row>
              <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 17);">SAVE & CLOSE</b-button></b-col>
              <br/>
            </b-row>
            <br/>

          </b-modal>

          <!-- end of sibe B , BOX 8 -->


          <!-- sibe A BOX 9 -->

          <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
            <b-modal id="modal-center18" ref="sideRfidUpdate18" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName18}} - Side A - {{dateTime5Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList8[1] > '0' ">
                    <!-- element in fetchPlayerList8[1].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList8[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">
                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 8, index)">

                          </b-form-input>
                        </div>
                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 18, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 18 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>

                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list18" :key="index">

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
                        <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 18, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                      </b-col>

                      <b-col sm="2">
                        <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 18)"></b-icon>
                      </b-col>

                    </b-row>

                  </div>

                </div>

              </b-col>
            </b-row>

            <!-- end of row that displays fetch data from mounted -->

            <br/>
            <b-row>
              <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 18);">SAVE & CLOSE</b-button></b-col>
              <br/>
            </b-row>
            <br/>

          </b-modal>

          <!-- end of sibe A , BOX 9 -->



          <!-- sibe B , BOX 10 -->

          <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
            <b-modal id="modal-center19" ref="sideRfidUpdate19" centered v-bind:hide-footer="true" title="Assign RFIDs">
              <b><p class="capitalLetters">{{teamName19}} - Side B - {{dateTime5Data}}</p></b>

              <b-row class="my-1">
                <b-col sm="12">

                  <div v-if="fetchPlayerList9[1] > '0' ">
                    <!-- element in fetchPlayerList9[1].Team_player_sessions -->
                    <div class="list-group-item item" v-for="(teamfetch, index) in fetchPlayerList9[1].Team_player_sessions" :key="index">
                      <b-row>

                        <b-col sm="1">
                          <p v-if="!teamfetch.rfid_id == '' || !teamfetch.rfidState1 == ''" style='font-size:17px; color:green;'>&#9989;</p>
                          <p v-else>&#10060;</p>
                        </b-col>

                        <b-col sm="6">
                         <b-form-input id="input-live" :value="teamfetch.Person.first_name +' '+teamfetch.Person.last_name" disabled placeholder="PLAYER NAME" class="capitalLetters"></b-form-input>
                       </b-col>

                       <b-col sm="3">
                        <div v-if="teamfetch.rfid_id > '0'">
                          <b-form-input disabled style="background-color: #33FF90;color:#33FF90;" ref="todosAfterReload">
                          </b-form-input>
                        </div>
                        <div v-else>
                          <b-form-input v-model="teamfetch.rfidState1" ref="todosAfterReload" v-on:input="posttorfidapiAfterReload($event, 9, index)">

                          </b-form-input>
                        </div>
                      </b-col>

                      <b-col sm="2">
                        <p v-if="teamfetch.Rfid != null">
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.Rfid.tag='' , deleterfidonclick($event, 19, index) , activeBtn = 'btn1' "></b-icon>
                        </p>

                        <p v-else>
                          <b-icon icon="trash-fill" font-scale="1.5" @click="teamfetch.rfidState1='', deleterfidonclick($event, 19 , index)" ></b-icon>
                        </p>

                      </b-col>

                    </b-row>
                  </div>

                </div>

                <div v-else>

                  <div v-for="(listings, index) in list19" :key="index">

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
                        <b-form-input v-model="listings.rfidState1" ref="todos" v-on:input="posttorfidapi($event, 19, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90', color:'#33FF90' } : null" spellcheck="false"></b-form-input>

                      </b-col>

                      <b-col sm="2">
                        <b-icon icon="trash-fill" font-scale="1.5" @click="deleteRfidBeforeReload($event, index, 19)"></b-icon>
                      </b-col>

                    </b-row>

                  </div>

                </div>

              </b-col>
            </b-row>

            <!-- end of row that displays fetch data from mounted -->

            <br/>
            <b-row>
              <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked($event, 19);">SAVE & CLOSE</b-button></b-col>
              <br/>
            </b-row>
            <br/>

          </b-modal>

          <!-- end of sibe B BOX 10 -->




          <!-- start of the left div which has navigation menu -->
          <b-col lg="2">

            <b-list-group class="leftMenuDiv">
              <b-list-group-item href="/#/users">Check-In</b-list-group-item>
              <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
              <b-list-group-item href="/#/Onboarding" active>Onboarding</b-list-group-item>
              <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
              <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
              <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
              <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
              <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
              <b-list-group-item href="/#/Social">Team Summary</b-list-group-item>
              <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
              <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
            </b-list-group>

          </b-col>
          <!-- end of navigation menu on left side -->




          <!-- start of center div which consists of table with all details -->
          <b-col lg="7" style="background-color:#fafafa; overflow: scroll; height: 1000px;">

            <div class="bv-example-row">

              <b-row style="margin-top: 1%;">

                <b-col cols="7">
                  <p style="font-size: 2em;text-align:center;"><b>Mission</b></p>
                </b-col>
                <b-col cols="1">
                  <b-button variant="info" href="/#/Onboarding" size="md">Mission</b-button>
                </b-col>
                <b-col cols="2">
                  <b-button variant="outline-info" href="/#/Gamebay" size="md">Game bay</b-button>
                </b-col>

                <b-col sm="1">
                  <button role="menuitem" type="button" tabindex="-1" aria-label="Go to previous page" aria-disabled="true" class="page-link" v-on:click="mostRecentTeams()">
                   <b> &#60; </b>
                 </button>
               </b-col>

             </b-row>
             <hr>
            <!-- <b-row>
              <b-col>
                <div v-for="(item,index) in fetchPlayerList.slice().reverse()" :key="item.id" class="border border-info rounded">
                  
                  <div>
                    {{index}}
                    <div v-if="fetchPlayerList[index].route_id == '1'">
                      {{formatTimeAddFour(item.session_time)}} + {{fetchPlayerList[index].route_id}}
                    </div>
                    <div v-else>
                      GRAY
                    </div>

                  </div>


                </div>
              </b-col>

              <b-col>
                <div v-for="(item,index) in fetchPlayerList.slice().reverse()" :key="item.id" class="border border-info rounded">
                  
                  <div>
                    {{index}}
                    <div v-if="fetchPlayerList[index].route_id == '2'">
                      {{formatTimeAddFour(item.session_time)}} + {{fetchPlayerList[index].route_id}}
                    </div>
                    <div v-else>
                      GRAY
                    </div>

                  </div>
                  
                </div>
              </b-col>
            </b-row>
            <hr> -->
            <b-row>

              <!-- previous button clicked display SIDE A b-col or column -->

              <b-col>
                <p class="btbSideTitle"><b>SIDE A</b></p>

                <div v-for="(item,index) in fetchPlayerList.slice().reverse()" :key="item.id" class="border border-info rounded">

                  <!-- <p>session id {{item.id}}</p> -->

                  <div v-if="item.route_id == '1' " :class="{'previousDivColor' : fetchPlayerList[index].active == '1'}">

                    <br>
                    <b-row class="my-2" style="margin-top:-2% !important;">
                      <b-col sm="4">
                        <!-- <b-form-input type="text" name="reservationTime1" disabled>{{formatedReservationFor(item.createdAt)}}</b-form-input> -->
                        <p style="width: auto; height : 38px; background-color:#e9ecef; padding-top: 7%; margin-left: 4%;">{{formatTimeAddFour(item.session_time)}}</p>
                      </b-col>
                      <b-col sm="7">

                        <b-form-input size="md" v-model="item.Team.name" placeholder="TEAM NAME 1"  style="text-transform: uppercase"></b-form-input>

                      </b-col>

                      <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                        <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-previousDeleteBox @click="previuosTeamArrayValueFunction($event,index)"></b-icon>
                      </b-col>
                    </b-row>

                    <b-row class="my-6" style="font-size: 0.9em; margin-top: -3%;">
                      <b-col>
                        <b>Players Added</b>
                      </b-col>

                      <b-col>
                        <b>Xola Reservation</b>
                      </b-col>

                      <b-col>
                        <b>Onboarded Time</b>
                      </b-col>

                    </b-row>

                    <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;">
                      <b-col>
                        <p>{{item.Team_player_sessions.length}}</p>
                      </b-col>
                      <b-col>
                        <p>{{formatedReservationFor(item.Reservation.reservation_for)}}</p>
                      </b-col>

                      <b-col>
                        <p>{{formatTimeAddFour(item.createdAt)}}</p>
                      </b-col>

                    </b-row>

                    <div style="height: 440px;border-style: outset;">
                      <draggable id="first" data-source="juju" :list="item.Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" @add="previousTeamAdd($event, index)" @change="deletePlayerFromTeam($event, index)">
                        <div class="list-group-item item" v-for="element in item.Team_player_sessions" :key="element.id">

                          <b-row>
                            <b-col sm="0">
                              <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                              <p v-else>&#10060;</p>

                            </b-col>

                                <!-- <b-col sm="9" v-if="element.player_minor_id > '0'" style="text-transform: capitalize">
                                    {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{element.Person.booker_first_name}} {{element.Person.booker_last_name}} )
                                  </b-col> -->

                                  <b-col sm="9" style="text-transform: capitalize" v-if="element.Person.booker_last_name != 'null'">
                                    {{element.Person.first_name}} {{element.Person.last_name}} ( {{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}} )
                                  </b-col>

                                  <b-col sm="9" style="text-transform: capitalize" v-else>
                                    {{element.Person.first_name}} {{element.Person.last_name}} ( {{element.Person.Bookerdetail.firstName}})
                                  </b-col>

                                  <b-col sm="0">
                                    <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                                    <p v-if="element.Person.minor == 'yes'">M</p>
                                  </b-col>

                                  <b-col sm="0" v-if="element.player_minor_id > '0'">
                                    <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                                  </b-col>

                                  <b-col v-else>
                                    <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                                  </b-col>

                                  <b-col sm="1">
                                    <p v-if="element.Person.Player.player_count > '1' ">R</p>
                                  </b-col>

                                </b-row>

                              </div>
                            </draggable>
                          </div>

                          <br>

                          <b-row>
                            <b-col sm="3">
                              <label for="input-small">Mission</label>
                            </b-col>
                            <b-col sm="8">
                              <!-- <p>{{item.mission_id}}</p> -->
                              <b-form-select v-model="item.mission_id" v-on:change="previousChangeMission($event, index, item.id)">
                                <option v-for="itemCategory in missions" :value="itemCategory.id" v-bind:key="itemCategory.id">{{itemCategory.name}}</option>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <br />

                          <div v-if=" selected13 > 0 && selected12 == selected13">

                            <b-row>
                              <b-col sm="4">
                                <label for="input-small">Battle Mode <br> Opponent</label>
                              </b-col>
                              <b-col sm="8">

                                <b-form-select v-if="!teamVsTeam13 > '0'" v-model="vsselected13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                                  <option> </option>
                                  <option :value="teamName12" style="text-transform: capitalize;"> {{ teamName12 }} </option>
                                </b-form-select>

                                <b-form-select v-else v-model="bothTeamName13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                                  <option :value="teamName12" style="text-transform: capitalize;" checked> {{ teamName12 }} </option>
                                  <option value=""> </option>
                                </b-form-select>

                              </b-col>
                            </b-row>

                          </div>


                          <b-row>
                            <b-col sm="3" style="display: none;">
                              <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                            </b-col>

                            <div style="width: 70%; margin:auto;">
                              <b-row>
                                <b-col>
                                  <b-button block v-b-modal.modal-previousTeamRfid variant="info" @click="previuosTeamArrayValueFunction($event,index), previousTeamEnableRfidModal = '1' , previousRouteValue = 'A'">Assign RFID</b-button>
                                </b-col>
                                <b-col>

                                  <div v-if="fetchPlayerList[index].active != '1'">
                                    <!-- <b-button block v-if="disableButton7 == false" variant="primary" disabled>Send To Waitlist</b-button> -->
                                    <b-button block variant="primary" v-on:click="previousButtonActivateTeam($event, index)">Send To Waitlist</b-button>
                                  </div>
                                  <div v-else>
                                    <b-button block variant="warning" v-on:click="previousButtonRemoveWaitlist($event, index)">Remove Waitlist</b-button>
                                  </div>

                                </b-col>
                              </b-row>
                            </div>
                          </b-row>

                          <br/>

                        </div>

                        <div v-else style="background-color: #E9EcEf; height: 707px;">

                        </div>

                      </div>
                    </b-col>
                    <!-- end of COLUMN for side A on previous button clicked -->


                    <!-- on previous button clicked this is SIDE B -->

                    <b-col>

                      <p class="btbSideTitle"><b>SIDE B</b></p>

                      <div v-for="(item,index) in fetchPlayerList.slice().reverse()" :key="item.id" class="border border-info rounded">

                        <!-- <p>session id {{item.id}}</p> -->

                        <!-- <div style="background-color: yellow;">{{index}} col</div> -->
                        <div v-if="item.route_id == '2' " :class="{'previousDivColor' : fetchPlayerList[index].active == '1'}">

                          <br>

                          <b-row class="my-2" style="margin-top:-2% !important;">
                            <b-col sm="4">
                              <!-- <b-form-input type="text" name="reservationTime1" disabled>{{formatedReservationFor(item.createdAt)}}</b-form-input> -->
                              <p style="width: auto; height : 38px; background-color:#e9ecef; padding-top: 7%; margin-left: 4%;">{{formatTimeAddFour(item.session_time)}}</p>
                            </b-col>
                            <b-col sm="7">

                              <b-form-input size="md" v-model="item.Team.name" placeholder="TEAM NAME 1" v-on:blur="posttoapi($event, 10)" style="text-transform: uppercase" maxlength="20"></b-form-input>

                            </b-col>

                            <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                              <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-previousDeleteBox @click="previuosTeamArrayValueFunction($event,index)"></b-icon>
                            </b-col>
                          </b-row>

                          <b-row class="my-6" style="font-size: 0.9em; margin-top: -3%;">
                            <b-col>
                              <b>Players Added</b>
                            </b-col>

                          <!-- <b-col>
                            <p>Created Time: {{onboardedCreatedTime1}}</p>
                          </b-col> -->

                          <b-col>
                            <b>Xola Reservation</b>
                          </b-col>

                          <b-col>
                            <b>Onboarded Time</b>
                          </b-col>

                        </b-row>

                        <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;">
                          <b-col>
                            <p>{{item.Team_player_sessions.length}}</p>
                          </b-col>
                          <b-col>
                            <p>{{formatedReservationFor(item.Reservation.reservation_for)}}</p>
                          </b-col>

                          <b-col>
                            <p>{{formatTimeAddFour(item.createdAt)}}</p>
                          </b-col>

                        </b-row>

                        <div style="height: 440px;border-style: outset;">
                          <draggable id="first" data-source="juju" :list="item.Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" @add="previousTeamAdd($event, index)" @change="deletePlayerFromTeam($event, index)">
                            <div class="list-group-item item" v-for="element in item.Team_player_sessions" :key="element.id">

                              <b-row>
                                <b-col sm="0">
                                  <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                                  <p v-else>&#10060;</p>

                                </b-col>

                                <!-- <b-col sm="9" v-if="element.player_minor_id > '0'" style="text-transform: capitalize">
                                    {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{element.Person.booker_first_name}} {{element.Person.booker_last_name}} )
                                  </b-col> -->

                                  <b-col sm="9" style="text-transform: capitalize" v-if="element.Person.booker_last_name != 'null'">
                                    {{element.Person.first_name}} {{element.Person.last_name}} ( {{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}} )
                                  </b-col>

                                  <b-col sm="9" style="text-transform: capitalize" v-else>
                                    {{element.Person.first_name}} {{element.Person.last_name}} ( {{element.Person.Bookerdetail.firstName}})
                                  </b-col>

                                  <b-col sm="0">
                                    <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                                    <p v-if="element.Person.minor == 'yes'">M</p>
                                  </b-col>

                                  <b-col sm="0" v-if="element.player_minor_id > '0'">
                                    <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                                  </b-col>

                                  <b-col v-else>
                                    <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                                  </b-col>

                                  <b-col sm="1">
                                    <p v-if="element.Person.Player.player_count > '1' ">R</p>
                                  </b-col>

                                </b-row>

                              </div>
                            </draggable>
                          </div>

                          <br>

                          <b-row>
                            <b-col sm="3">
                              <label for="input-small">Mission</label>
                            </b-col>
                            <b-col sm="8">
                              <!-- <p>{{item.mission_id}}</p> -->
                              <b-form-select v-model="item.mission_id" v-on:change="previousChangeMission($event, index, item.id)">
                                <option v-for="itemCategory in missions" :value="itemCategory.id" v-bind:key="itemCategory.id">{{itemCategory.name}}</option>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <br />

                          <div v-if=" selected13 > 0 && selected12 == selected13">

                            <b-row>
                              <b-col sm="4">
                                <label for="input-small">Battle Mode <br> Opponent</label>
                              </b-col>
                              <b-col sm="8">

                                <b-form-select v-if="!teamVsTeam13 > '0'" v-model="vsselected13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                                  <option> </option>
                                  <option :value="teamName12" style="text-transform: capitalize;"> {{ teamName12 }} </option>
                                </b-form-select>

                                <b-form-select v-else v-model="bothTeamName13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                                  <option :value="teamName12" style="text-transform: capitalize;" checked> {{ teamName12 }} </option>
                                  <option value=""> </option>
                                </b-form-select>

                              </b-col>
                            </b-row>

                          </div>


                          <b-row>
                            <b-col sm="3" style="display: none;">
                              <b-button variant="primary" v-b-modal.modal-1 v-on:click="checkPlayerId1();">Update</b-button>
                            </b-col>

                            <div style="width: 70%; margin:auto;">
                              <b-row>
                                <b-col>
                                  <b-button block v-b-modal.modal-previousTeamRfid variant="info" @click="previuosTeamArrayValueFunction($event,index) , previousTeamEnableRfidModal = '1', previousRouteValue = 'B'">Assign RFID</b-button>
                                </b-col>
                                <b-col>

                                  <div v-if="fetchPlayerList[index].active != '1'">
                                    <!-- <b-button block v-if="disableButton7 == false" variant="primary" disabled>Send To Waitlist</b-button> -->
                                    <b-button block variant="primary" v-on:click="previousButtonActivateTeam($event, index)">Send To Waitlist</b-button>
                                  </div>
                                  <div v-else>
                                    <b-button block variant="warning" v-on:click="previousButtonRemoveWaitlist($event, index)">Remove Waitlist</b-button>
                                  </div>

                                </b-col>
                              </b-row>
                            </div>
                          </b-row>

                          <br/>

                        </div>

                        <div v-else style="background-color: #E9EcEf; height: 707px;">

                        </div>

                      </div>
                    </b-col>
                    <!-- END of previous button clicked SIDE B -->

                  </b-row> <!-- this row separates the previous button value row -->

                  <b-row>


                    <b-col>
                      <!-- <p class="btbSideTitle"><b>SIDE A</b></p> -->

                      <!-- start the form here -->
                      <!-- <form id="signup-form" @submit.prevent="processForm"> -->
                        <!-- <form id="signup-form"> -->


                          <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked10 }">
                            <!-- <b-col class="border border-info rounded"> -->
                              <b-row class="my-2">
                                <b-col sm="4">
                                  <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                                </b-col>
                                <b-col sm="7">

                                  <b-form-input size="md" v-model="teamName10" placeholder="TEAM NAME 1" v-on:blur="posttoapi($event, 10)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 10)"></b-form-input>

                                  <span v-if="teamNameSpecialCharacters10 == '1'" class="specialCharacters">
                                    Please dont use special characters
                                  </span>

                                </b-col>

                                <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                                  <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 10, clickedTeamName = teamName10"></b-icon>
                                </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove10 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 10" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>

                <!-- <div v-if="this.teamName1.length > 1"> checks at first if the team name is inserted or not / if not it will disable drag -->

                  <b-row class="my-6" style="font-size: 0.9em;">
                    <b-col>
                      <b>Players Added</b>
                    </b-col>

                    <b-col>
                      <b>Xola Reservation</b>
                    </b-col>

                    <b-col>
                      <b>Onboarded Time</b>
                    </b-col>

                  </b-row>

                  <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime1 > '0' && playersAdded1 > '0'">
                    <b-col>
                      <b-button v-on:click="playerDetailSession(10);" size="sm" variant="link"><b>{{playersAdded1}}</b></b-button>
                    </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime1}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime1}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList0[1] > '0'" class="capitalLetters" style="height: 440px;border-style: outset;" >


                  <draggable id="first" data-source="juju" :list="fetchPlayerList0[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a"
                  @add="onDrop1AfterReload($event, 0)" @change="deleteTeamPlayerSessionAfterReload1($event, 0)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList0[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>

                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'" style="text-transform: capitalize">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <!-- {{element.Player.play_count}} -->
                        <!-- <p v-if="element.Person.Player.play_count > '1'">R</p> -->
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
                      </b-col>

                    </b-row>

                  </div>
                </draggable>

                <draggable>
                  <div v-for="element in myArray" :key="element.id" style="background-color: yellow; height: 300px;">
                    {{element.Person.first_name}}
                  </div>
                </draggable>

              </div>





              <!-- </draggable> -->
              <!-- </div> -->

                <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="getpersonDetails1">
                  <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                  </div>
                </draggable -->

                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list10" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 10, index)" @change="onDropReservation1($event, 10)" :disabled="!checkMove10">

                    <div class="list-group-item item" v-for="(element, index) in list10" :key="index">

                      <b-row>

                        <b-col sm="0">

                          <p v-if="list10[index].rfidState1 == '' || !list10[index].rfidState1 > '0'">&#10060;</p>
                          <p v-if="list10[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                        </b-col>

                        <b-col sm="9" style="text-transform: capitalize">
                          {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                        </b-col>

                        <b-col sm="0">
                          {{element.Person.minorsymbol}}
                        </b-col>

                        <b-col sm="0">
                          <p v-if="element.Person.Player.bomb_beater == '10'">&#128163;</p>
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
                    <b-col sm="4">
                      <label for="input-small">Battle Mode <br> Opponent</label>
                    </b-col>
                    <b-col sm="8">

                      <b-form-select v-if="!teamVsTeam10 > '0'" v-model="vsselected10" v-on:change="onChangeTeamVsTeam1($event, 10)">
                        <option> </option>
                        <option :value="teamName11" style="text-transform: capitalize;"> {{ teamName11 }} </option>
                      </b-form-select>

                      <b-form-select v-else v-model="bothTeamName10" v-on:change="onChangeTeamVsTeam1($event, 10)">
                        <option :value="teamName11" style="text-transform: capitalize;" checked> {{ teamName11 }} </option>
                        <option value=""> </option>
                      </b-form-select>

                    </b-col>
                  </b-row>
                </div>

                <br />

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

                            <div v-if="removeWaitlist0 == false">
                              <b-button block v-if="disableButton0 == false" variant="primary" disabled>Send To Waitlist</b-button>
                              <b-button block v-else variant="primary" v-on:click="activateTeam($event, 10)">Send To Waitlist</b-button>
                              <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                            </div>
                            <div v-else>
                              <b-button block variant="warning" v-on:click="removeWaitingList($event, 0)">Remove Waitlist</b-button>
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
                  <!-- <p class="btbSideTitle"><b>SIDE B</b></p> -->

                  <!-- <form id="signup-form"> -->
                    <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked11 }" >
                      <!-- <b-col class="border border-info rounded"> -->

                        <b-row class="my-2">
                          <b-col sm="4">
                            <b-form-input type="text" name="reservationTime1" v-model="dateTime1Data" disabled></b-form-input>
                            <!-- {{timeListText | fetchList1}} -->
                          </b-col>
                          <b-col sm="7">


                            <b-form-input size="md" v-model="teamName11" placeholder="TEAM NAME 2" v-on:blur="posttoapi($event, 11)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 11)"></b-form-input>

                            <span v-if="teamNameSpecialCharacters11 == '1'" class="specialCharacters">
                              Please dont use special characters
                            </span>


                          </b-col>

                          <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                            <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 11,clickedTeamName = teamName11"></b-icon>
                          </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove11 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 11" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>


                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime2 > '0' && playersAdded2 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(11);" size="sm" variant="link"><b>{{playersAdded2}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime2}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime2}}</p>
                  </b-col>

                </b-row>



                <div v-if="fetchPlayerList1[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList1[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 1)" @change="deleteTeamPlayerSessionAfterReload1($event, 1)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList1[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>

                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <!-- <p v-if="element.Person.Player.player_count > '1' ">R</p> -->
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list11" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 11, index)" @change="onDropReservation1($event, 11)"  :disabled="!checkMove11">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list11" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list11[index].rfidState1 == '' || !list11[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list11[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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
                    <!-- <b-row>
                      <b-col sm="3">
                      <label for="input-small">Battle Mode Opponent</label>
                      </b-col>
                      <b-col sm="9">

                        <b-form-select v-model="vsselected11" v-on:change="onChangeTeamVsTeam1($event, 11)">
                          <option> </option>
                          <option :value="teamName10" style="text-transform: capitalize;"> {{ teamName10 }} </option>
                        </b-form-select>

                      </b-col>
                    </b-row> -->

                    <b-row>
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam11 > '0'" v-model="vsselected11" v-on:change="onChangeTeamVsTeam1($event, 11)">
                          <option> </option>
                          <option :value="teamName10" style="text-transform: capitalize;"> {{ teamName10 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName11" v-on:change="onChangeTeamVsTeam1($event, 11)">
                          <option :value="teamName10" style="text-transform: capitalize;" checked> {{ teamName10 }} </option>
                          <option value=""> </option>
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

                          <div v-if="removeWaitlist1 == false">
                            <b-button block v-if="disableButton1 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 11)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 1)">Remove Waitlist</b-button>
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

                    <!-- <b-col class="border border-info rounded"> -->

                      <b-row class="my-1">
                        <b-col sm="4">
                          <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                          <!-- {{timeListText | fetchList1}} -->
                        </b-col>
                        <b-col sm="7">


                          <b-form-input size="md" v-model="teamName12" placeholder="TEAM NAME 3" v-on:blur="posttoapi($event, 12)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 12)"></b-form-input>

                          <span v-if="teamNameSpecialCharacters12 == '1'" class="specialCharacters">
                            Please dont use special characters
                          </span>


                        </b-col>

                        <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                          <!-- <b-icon icon="trash-fill" font-scale="1.5" @click="emptyBox($event, 10)"></b-icon> -->
                          <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 12,clickedTeamName = teamName12"></b-icon>

                        </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove12 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 12" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>



                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime3 > '0' && playersAdded3 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(12);" size="sm" variant="link"><b>{{playersAdded3}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime3}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime3}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList2[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList2[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 2)" @change="deleteTeamPlayerSessionAfterReload1($event, 2)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList2[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>

                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list12" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 12, index)" @change="onDropReservation1($event, 12)" :disabled="!checkMove12">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list12" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list12[index].rfidState1 == '' || !list12[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list12[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam12 > '0'" v-model="vsselected12" v-on:change="onChangeTeamVsTeam1($event, 12)">
                          <option> </option>
                          <option :value="teamName13" style="text-transform: capitalize;"> {{ teamName13 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName12" v-on:change="onChangeTeamVsTeam1($event, 12)">
                          <option :value="teamName13" style="text-transform: capitalize;" checked> {{ teamName13 }} </option>
                          <option value=""> </option>
                        </b-form-select>

                      </b-col>
                    </b-row>
                  </div>

                  <br />

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

                          <div v-if="removeWaitlist2 == false">
                            <b-button block v-if="disableButton2 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 12)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 2)">Remove Waitlist</b-button>
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
                      <b-col sm="7">

                        <b-form-input size="md" v-model="teamName13" placeholder="TEAM NAME 4" v-on:blur="posttoapi($event, 13)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 13)"></b-form-input>

                        <span v-if="teamNameSpecialCharacters13 == '1'" class="specialCharacters">
                          Please dont use special characters
                        </span>

                      </b-col>

                      <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                        <!-- <b-icon icon="trash-fill" font-scale="1.5" @click="emptyBox($event, 10)"></b-icon> -->
                        <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 13,clickedTeamName = teamName13"></b-icon>

                      </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove13 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 13" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>


                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime4 > '0' && playersAdded4 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(13);" size="sm" variant="link"><b>{{playersAdded4}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime4}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime4}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList3[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList3[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 3)" @change="deleteTeamPlayerSessionAfterReload1($event, 3)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList3[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list13" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 13, index)" @change="onDropReservation1($event, 13)" :disabled="!checkMove13">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list13" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list13[index].rfidState1 == '' || !list13[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list13[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam13 > '0'" v-model="vsselected13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                          <option> </option>
                          <option :value="teamName12" style="text-transform: capitalize;"> {{ teamName12 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName13" v-on:change="onChangeTeamVsTeam1($event, 13)">
                          <option :value="teamName12" style="text-transform: capitalize;" checked> {{ teamName12 }} </option>
                          <option value=""> </option>
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

                          <div v-if="removeWaitlist3 == false">
                            <b-button block v-if="disableButton3 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 13)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 3)">Remove Waitlist</b-button>
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





          <div class="bv-example-row"> <!-- div that open / close for Box 5 and Box 6 -->

            <b-row>

              <b-col > <!-- bc-col that OPENED for SIDE A BOX number 5 -->

                <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked14 }">

                  <b-row class="my-1">
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                      <!-- {{timeListText | fetchList1}} -->
                    </b-col>
                    <b-col sm="7">

                      <b-form-input size="md" v-model="teamName14" placeholder="TEAM NAME 5" v-on:blur="posttoapi($event, 14)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 14)"></b-form-input>

                      <span v-if="teamNameSpecialCharacters14 == '1'" class="specialCharacters">
                        Please dont use special characters
                      </span>

                    </b-col>

                    <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                      <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 14,clickedTeamName = teamName14"></b-icon>
                    </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove14 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 14" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime5 > '0' && playersAdded5 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(14);" size="sm" variant="link"><b>{{playersAdded5}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime5}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime5}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList4[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList4[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 4)" @change="deleteTeamPlayerSessionAfterReload1($event, 4)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList4[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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

                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list14" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 14, index)" @change="onDropReservation1($event, 14)" :disabled="!checkMove14">

                    <div class="list-group-item item" v-for="(element, index) in list14" :key="index">

                      <b-row>

                        <b-col sm="0">

                          <p v-if="list14[index].rfidState1 == '' || !list14[index].rfidState1 > '0'">&#10060;</p>
                          <p v-if="list14[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                        </b-col>

                        <b-col sm="9">
                          {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                        </b-col>

                        <b-col sm="0">
                          {{element.Person.minorsymbol}}
                        </b-col>

                        <b-col sm="0">
                          <p v-if="element.Person.Player.bomb_beater == '14'">&#128163;</p>
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


                <div v-if=" selected14 > 0 && selected14 == selected15">

                  <b-row>
                    <b-col sm="4">
                      <label for="input-small">Battle Mode <br> Opponent</label>
                    </b-col>
                    <b-col sm="8">

                      <b-form-select v-if="!teamVsTeam14 > '0'" v-model="vsselected14" v-on:change="onChangeTeamVsTeam1($event, 14)">
                        <option> </option>
                        <option :value="teamName15" style="text-transform: capitalize;"> {{ teamName15 }} </option>
                      </b-form-select>

                      <b-form-select v-else v-model="bothTeamName14" v-on:change="onChangeTeamVsTeam1($event, 14)">
                        <option :value="teamName15" style="text-transform: capitalize;" checked> {{ teamName15 }} </option>
                        <option value=""> </option>
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
                  <!-- <b-col sm="3"> -->
                    <!-- <b-button variant="info">RFID</b-button> -->
                      <!-- <div>
                        <b-button v-b-modal.modal-center variant="info">RFID</b-button>
                      </div> -->
                      <!-- </b-col> -->

                      <div style="width: 70%; margin:auto;">
                        <b-row>
                          <b-col>
                            <b-button block v-b-modal.modal-center14 variant="info">Assign RFID</b-button>
                          </b-col>
                          <b-col>

                            <div v-if="removeWaitlist4 == false">
                              <b-button block v-if="disableButton4 == false" variant="primary" disabled>Send To Waitlist</b-button>
                              <b-button block v-else variant="primary" v-on:click="activateTeam($event, 14)">Send To Waitlist</b-button>
                              <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                            </div>
                            <div v-else>
                              <b-button block variant="warning" v-on:click="removeWaitingList($event, 4)">Remove Waitlist</b-button>
                            </div>

                          </b-col>
                        </b-row>
                      </div>
                    </b-row>

                    <br/>

                  </b-col>

                </b-col> <!-- END FOR BOX NUMBER 5 -->



                <!-- SIDE B BOX NUMBER 6 -->

                <b-col>
                  <!-- <p class="btbSideTitle"><b>SIDE B</b></p> -->

                  <!-- <form id="signup-form"> -->
                    <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked15 }">

                      <b-row class="my-1">
                        <b-col sm="4">
                          <b-form-input type="text" name="reservationTime1" v-model="dateTime3Data" disabled></b-form-input>
                          <!-- {{timeListText | fetchList1}} -->
                        </b-col>
                        <b-col sm="7">

                          <b-form-input size="md" v-model="teamName15" placeholder="TEAM NAME 6" v-on:blur="posttoapi($event, 15)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 15)"></b-form-input>

                          <span v-if="teamNameSpecialCharacters15 == '1'" class="specialCharacters">
                            Please dont use special characters
                          </span>

                        </b-col>

                        <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                          <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 15,clickedTeamName = teamName15"></b-icon>
                        </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove15 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 15" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>


                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime6 > '0' && playersAdded6 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(15);" size="sm" variant="link"><b>{{playersAdded6}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime6}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime6}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList5[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList5[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 5)" @change="deleteTeamPlayerSessionAfterReload1($event, 5)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList5[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list15" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 15, index)" @change="onDropReservation1($event, 15)" :disabled="!checkMove15">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list15" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list15[index].rfidState1 == '' || !list15[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list15[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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

                  <div v-if=" selected15 > 0 && selected15 == selected14">

                    <b-row>
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam15 > '0'" v-model="vsselected15" v-on:change="onChangeTeamVsTeam1($event, 15)">
                          <option> </option>
                          <option :value="teamName14" style="text-transform: capitalize;"> {{ teamName14 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName15" v-on:change="onChangeTeamVsTeam1($event, 15)">
                          <option :value="teamName14" style="text-transform: capitalize;" checked> {{ teamName14 }} </option>
                          <option value=""> </option>
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

                          <div v-if="removeWaitlist5 == false">
                            <b-button block v-if="disableButton5 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 15)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 5)">Remove Waitlist</b-button>
                          </div>

                        </b-col>
                      </b-row>
                    </div>
                  </b-row>

                  <br/>

                </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col> <!-- b-col that close for BOX 6 -->



            </b-row>

          </div> <!-- div that close for BOX 5 and BOX 6 -->







          <br/>

          <div class="bv-example-row"> <!-- div that open / close for Box 7 and Box 8 -->

            <b-row>

              <b-col > <!-- bc-col that OPENED for SIDE A BOX number 7 -->

                <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked16 }">

                  <b-row class="my-1">
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime4Data" disabled></b-form-input>
                      <!-- {{timeListText | fetchList1}} -->
                    </b-col>
                    <b-col sm="7">

                      <b-form-input size="md" v-model="teamName16" placeholder="TEAM NAME 7" v-on:blur="posttoapi($event, 16)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 16)"></b-form-input>

                      <span v-if="teamNameSpecialCharacters16 == '1'" class="specialCharacters">
                        Please dont use special characters
                      </span>

                    </b-col>

                    <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                      <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 16,clickedTeamName = teamName16"></b-icon>
                    </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove16 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 16" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime7 > '0' && playersAdded7 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(16);" size="sm" variant="link"><b>{{playersAdded7}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime7}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime7}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList6[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList6[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 6)" @change="deleteTeamPlayerSessionAfterReload1($event, 6)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList6[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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

                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list16" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 16, index)" @change="onDropReservation1($event, 16)" :disabled="!checkMove16">

                    <div class="list-group-item item" v-for="(element, index) in list16" :key="index">

                      <b-row>

                        <b-col sm="0">

                          <p v-if="list16[index].rfidState1 == '' || !list16[index].rfidState1 > '0'">&#10060;</p>
                          <p v-if="list16[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                        </b-col>

                        <b-col sm="9">
                          {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                        </b-col>

                        <b-col sm="0">
                          {{element.Person.minorsymbol}}
                        </b-col>

                        <b-col sm="0">
                          <p v-if="element.Person.Player.bomb_beater == '16'">&#128163;</p>
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
                  <b-col sm="3">
                    <label for="input-small">Mission</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-select v-model="selected16" v-on:change="onChangeMission1($event, 16)">
                      <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                    </b-form-select>
                  </b-col>
                </b-row>

                <br />


                <div v-if=" selected16 > 0 && selected16 == selected17">
                  <b-row>
                    <b-col sm="4">
                      <label for="input-small">Battle Mode <br> Opponent</label>
                    </b-col>
                    <b-col sm="8">

                      <b-form-select v-if="!teamVsTeam16 > '0'" v-model="vsselected16" v-on:change="onChangeTeamVsTeam1($event, 16)">
                        <option> </option>
                        <option :value="teamName17" style="text-transform: capitalize;"> {{ teamName17 }} </option>
                      </b-form-select>

                      <b-form-select v-else v-model="bothTeamName16" v-on:change="onChangeTeamVsTeam1($event, 16)">
                        <option :value="teamName17" style="text-transform: capitalize;" checked> {{ teamName17 }} </option>
                        <option value=""> </option>
                      </b-form-select>

                    </b-col>
                  </b-row>
                </div>

                <br />

                <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                  <p> You are going to update data for <b> {{teamName16}} </b> </p>
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
                            <b-button block v-b-modal.modal-center16 variant="info">Assign RFID</b-button>
                          </b-col>
                          <b-col>

                            <div v-if="removeWaitlist6 == false">
                              <b-button block v-if="disableButton6 == false" variant="primary" disabled>Send To Waitlist</b-button>
                              <b-button block v-else variant="primary" v-on:click="activateTeam($event, 16)">Send To Waitlist</b-button>
                              <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                            </div>
                            <div v-else>
                              <b-button block variant="warning" v-on:click="removeWaitingList($event, 6)">Remove Waitlist</b-button>
                            </div>

                          </b-col>
                        </b-row>
                      </div>
                    </b-row>

                    <br/>

                  </b-col>

                </b-col> <!-- END FOR BOX NUMBER 7 -->



                <!-- SIDE B BOX NUMBER 8 -->

                <b-col>
                  <!-- <p class="btbSideTitle"><b>SIDE B</b></p> -->

                  <!-- <form id="signup-form"> -->
                    <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked17 }">

                      <b-row class="my-1">
                        <b-col sm="4">
                          <b-form-input type="text" name="reservationTime1" v-model="dateTime4Data" disabled></b-form-input>
                          <!-- {{timeListText | fetchList1}} -->
                        </b-col>
                        <b-col sm="7">

                          <b-form-input size="md" v-model="teamName17" placeholder="TEAM NAME 8" v-on:blur="posttoapi($event, 17)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 17)"></b-form-input>

                          <span v-if="teamNameSpecialCharacters17 == '1'" class="specialCharacters">
                            Please dont use special characters
                          </span>

                        </b-col>

                        <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                          <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 17,clickedTeamName = teamName17"></b-icon>
                        </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove17 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 17" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>


                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime8 > '0' && playersAdded8 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(17);" size="sm" variant="link"><b>{{playersAdded8}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime8}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime8}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList7[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList7[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 7)" @change="deleteTeamPlayerSessionAfterReload1($event, 7)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList7[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="1">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list17" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 17, index)" @change="onDropReservation1($event, 17)" :disabled="!checkMove17">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list17" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list17[index].rfidState1 == '' || !list17[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list17[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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


                  <br/>

                  <b-row>
                    <b-col sm="3">
                      <label for="input-small">Mission</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-select v-model="selected17" v-on:change="onChangeMission1($event, 17)">
                        <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <br />

                  <div v-if=" selected17 > 0 && selected16 == selected17">
                    <b-row>
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam17 > '0'" v-model="vsselected17" v-on:change="onChangeTeamVsTeam1($event, 17)">
                          <option> </option>
                          <option :value="teamName16" style="text-transform: capitalize;"> {{ teamName16 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName17" v-on:change="onChangeTeamVsTeam1($event, 17)">
                          <option :value="teamName16" style="text-transform: capitalize;" checked> {{ teamName16 }} </option>
                          <option value=""> </option>
                        </b-form-select>

                      </b-col>
                    </b-row>
                  </div>

                  <br />

                  <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                    <p> You are going to update data for <b> {{teamName17}} </b> </p>
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
                          <b-button block v-b-modal.modal-center17 variant="info">Assign RFID</b-button>
                        </b-col>
                        <b-col>

                          <div v-if="removeWaitlist7 == false">
                            <b-button block v-if="disableButton7 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 17)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 7)">Remove Waitlist</b-button>
                          </div>

                        </b-col>
                      </b-row>
                    </div>
                  </b-row>

                  <br/>

                </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col> <!-- b-col that close for BOX 8 -->



            </b-row>

          </div> <!-- div that close for BOX 7 and BOX 8 -->





          <br/>

          <div class="bv-example-row"> <!-- div that open / close for Box 9 and Box 10 -->

            <b-row>

              <b-col> <!-- bc-col that OPENED for SIDE A BOX number 9 -->

                <b-col class="border border-info rounded" :class="{ red : sendToWishlistClicked18 }">

                  <b-row class="my-1">
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime5Data" disabled></b-form-input>
                      <!-- {{timeListText | fetchList1}} -->
                    </b-col>
                    <b-col sm="7">

                      <b-form-input size="md" v-model="teamName18" placeholder="TEAM NAME 9" v-on:blur="posttoapi($event, 18)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 18)"></b-form-input>

                      <span v-if="teamNameSpecialCharacters18 == '1'" class="specialCharacters">
                        Please dont use special characters
                      </span>

                    </b-col>

                    <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                      <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 18,clickedTeamName = teamName18"></b-icon>
                    </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove18 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 18" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>
                
                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime9 > '0' && playersAdded9 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(18);" size="sm" variant="link"><b>{{playersAdded9}}</b></b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime9}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime9}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList8[1] > '0'" class="capitalLetters" style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList8[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 8)" @change="deleteTeamPlayerSessionAfterReload1($event, 8)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList8[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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

                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list18" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 18, index)" @change="onDropReservation1($event, 18)" :disabled="!checkMove18">

                    <div class="list-group-item item" v-for="(element, index) in list18" :key="index">

                      <b-row>

                        <b-col sm="0">

                          <p v-if="list18[index].rfidState1 == '' || !list18[index].rfidState1 > '0'">&#10060;</p>
                          <p v-if="list18[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                        </b-col>

                        <b-col sm="9">
                          {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                        </b-col>

                        <b-col sm="0">
                          {{element.Person.minorsymbol}}
                        </b-col>

                        <b-col sm="0">
                          <p v-if="element.Person.Player.bomb_beater == '18'">&#128163;</p>
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
                  <b-col sm="3">
                    <label for="input-small">Mission</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-select v-model="selected18" v-on:change="onChangeMission1($event, 18)">
                      <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                    </b-form-select>
                  </b-col>
                </b-row>

                <br />


                <div v-if=" selected18 > 0 && selected18 == selected19">
                  <b-row>
                    <b-col sm="4">
                      <label for="input-small">Battle Mode <br> Opponent</label>
                    </b-col>
                    <b-col sm="8">

                      <b-form-select v-if="!teamVsTeam18 > '0'" v-model="vsselected18" v-on:change="onChangeTeamVsTeam1($event, 18)">
                        <option> </option>
                        <option :value="teamName19" style="text-transform: capitalize;"> {{ teamName19 }} </option>
                      </b-form-select>

                      <b-form-select v-else v-model="bothTeamName18" v-on:change="onChangeTeamVsTeam1($event, 18)">
                        <option :value="teamName19" style="text-transform: capitalize;" checked> {{ teamName19 }} </option>
                        <option value=""> </option>
                      </b-form-select>

                    </b-col>
                  </b-row>
                </div>

                <br />

                <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                  <p> You are going to update data for <b> {{teamName18}} </b> </p>
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
                            <b-button block v-b-modal.modal-center18 variant="info">Assign RFID</b-button>
                          </b-col>
                          <b-col>

                            <div v-if="removeWaitlist8 == false">
                              <b-button block v-if="disableButton8 == false" variant="primary" disabled>Send To Waitlist</b-button>
                              <b-button block v-else variant="primary" v-on:click="activateTeam($event, 18)">Send To Waitlist</b-button>
                              <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                            </div>
                            <div v-else>
                              <b-button block variant="warning" v-on:click="removeWaitingList($event, 8)">Remove Waitlist</b-button>
                            </div>

                          </b-col>
                        </b-row>
                      </div>
                    </b-row>

                    <br/>

                  </b-col>

                </b-col> <!-- END FOR BOX NUMBER 9 -->



                <!-- SIDE B BOX NUMBER 10 -->

                <b-col>
                  <!-- <p class="btbSideTitle"><b>SIDE B</b></p> -->

                  <!-- <form id="signup-form"> -->
                    <b-col  class="border border-info rounded" :class="{ red : sendToWishlistClicked19 }">

                      <b-row class="my-1">
                        <b-col sm="4">
                          <b-form-input type="text" name="reservationTime1" v-model="dateTime5Data" disabled></b-form-input>
                          <!-- {{timeListText | fetchList1}} -->
                        </b-col>
                        <b-col sm="7">

                          <b-form-input size="md" v-model="teamName19" placeholder="TEAM NAME 10" v-on:blur="posttoapi($event, 19)" style="text-transform: uppercase" maxlength="20" @keydown="teamNameSpecialCharacters($event, 19)"></b-form-input>

                          <span v-if="teamNameSpecialCharacters19 == '1'" class="specialCharacters">
                            Please dont use special characters
                          </span>

                        </b-col>

                        <b-col sm="1" style="margin-left: -3.3%; margin-top: 1.4%;">
                          <b-icon icon="trash-fill" font-scale="1.5" v-b-modal.modal-emptyBox @click="emptyBoxValue = 19,clickedTeamName = teamName10"></b-icon>
                        </b-col>

                  <!-- <b-col sm="1" class="checkMoveEditIcon">
                    <b-col v-if="checkMove19 == false">
                      <b-icon icon="pencil-square" v-b-modal.modal-checkMoveBox @click="checkMoveButtonValue = 19" font-scale="1.5"></b-icon>
                    </b-col>
                  </b-col> -->

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em;">
                  <b-col>
                    <b>Players Added</b>
                  </b-col>

                  <b-col>
                    <b>Xola Reservation</b>
                  </b-col>

                  <b-col>
                    <b>Onboarded Time</b>
                  </b-col>

                </b-row>

                <b-row class="my-6" style="font-size: 0.9em; margin-top: 0%;" v-if="onboardedCreatedTime10 > '0' && playersAdded10 > '0'">
                  <b-col>
                    <b-button v-on:click="playerDetailSession(19);" size="sm" variant="link"><b>{{playersAdded10}</b>}</b-button>
                  </b-col>

                  <!-- <b-col>
                    <p>Created Time: {{onboardedCreatedTime1}}</p>
                  </b-col> -->

                  <b-col>
                    <p>{{xolaReservationTime10}}</p>
                  </b-col>

                  <b-col>
                    <p>{{onboardedTime10}}</p>
                  </b-col>

                </b-row>

                <div v-if="fetchPlayerList9[1] > '0'" class="capitalLetters"  style="height: 440px;border-style: outset;">

                  <draggable id="first" data-source="juju" :list="fetchPlayerList9[1].Team_player_sessions" class="list-group myBoxValue" draggable=".item" group="a" 
                  @add="onDrop1AfterReload($event, 9)" @change="deleteTeamPlayerSessionAfterReload1($event, 9)">

                  <div class="list-group-item item" v-for="element in fetchPlayerList9[1].Team_player_sessions" :key="element.id">

                    <b-row>
                      <b-col sm="0">
                        <p v-if="element.rfid_id > 0 || !element.rfidState1 == '' " style='font-size:17px; color:green;'>&#9989;</p>
                        <p v-else>&#10060;</p>
                      </b-col>

                      <b-col sm="9" v-if="element.player_minor_id > '0'">
                        {{element.Player_minor.first_name}} {{element.Player_minor.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="9" v-else>
                        {{element.Person.first_name}} {{element.Person.last_name}} ( {{sideA1BookerNameFetched}} )
                      </b-col>

                      <b-col sm="0">
                        <p v-if="element.Person.Player.minor_tag == 'M'">{{element.Person.Player.minor_tag}}</p>
                        <p v-if="element.Person.minor == 'yes'">M</p>
                      </b-col>

                      <!-- checks on the minor or player first then displays beat_bomber logo -->
                      <b-col sm="0" v-if="element.player_minor_id > '0'">
                        <p v-if="element.Player_minor.bomb_beater > '0'">&#128163;</p>
                      </b-col>

                      <b-col v-else>
                        <p v-if="element.Person.Player.bomb_beater > '0'">&#128163;</p>
                      </b-col>
                      <!-- end of the bomb beater value for minor and players -->

                      <b-col sm="1">
                        <p v-if="element.Person.Player.player_count > '1' ">R</p>
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



                <div v-else class="capitalLetters" v-bind:class="{ 'disableBox' : disableDiv === '0'}">

                  <draggable id="first" data-source="juju" :list="list19" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDropPlayer($event, 19, index)" @change="onDropReservation1($event, 19)" :disabled="!checkMove19">

                    <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 440px; border-style: outset;" @add="onDrop1"> -->

                      <div class="list-group-item item" v-for="(element, index) in list19" :key="index">

                        <b-row>

                          <b-col sm="0">

                            <p v-if="list19[index].rfidState1 == '' || !list19[index].rfidState1 > '0'">&#10060;</p>
                            <p v-if="list19[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

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


                  <br/>

                  <b-row>
                    <b-col sm="3">
                      <label for="input-small">Mission</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-select v-model="selected19" v-on:change="onChangeMission1($event, 19)">
                        <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <br />

                  <div v-if=" selected19 > 0 && selected18 == selected19">

                    <b-row>
                      <b-col sm="4">
                        <label for="input-small">Battle Mode <br> Opponent</label>
                      </b-col>
                      <b-col sm="8">

                        <b-form-select v-if="!teamVsTeam19 > '0'" v-model="vsselected19" v-on:change="onChangeTeamVsTeam1($event, 19)">
                          <option> </option>
                          <option :value="teamName18" style="text-transform: capitalize;"> {{ teamName18 }} </option>
                        </b-form-select>

                        <b-form-select v-else v-model="bothTeamName19" v-on:change="onChangeTeamVsTeam1($event, 19)">
                          <option :value="teamName18" style="text-transform: capitalize;" checked> {{ teamName18 }} </option>
                          <option value=""> </option>
                        </b-form-select>

                      </b-col>
                    </b-row>

                  </div>

                  <br />

                  <b-modal id="modal-1" ref="my-modal-submit-id" title="BTB Onboarding " centered v-bind:hide-footer="true">
                    <p> You are going to update data for <b> {{teamName19}} </b> </p>
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
                          <b-button block v-b-modal.modal-center19 variant="info">Assign RFID</b-button>
                        </b-col>
                        <b-col>

                          <div v-if="removeWaitlist9 == false">
                            <b-button block v-if="disableButton9 == false" variant="primary" disabled>Send To Waitlist</b-button>
                            <b-button block v-else variant="primary" v-on:click="activateTeam($event, 19)">Send To Waitlist</b-button>
                            <!-- <b-button block v-else variant="primary">Send To Waitlist</b-button> -->
                          </div>
                          <div v-else>
                            <b-button block variant="warning" v-on:click="removeWaitingList($event, 9)">Remove Waitlist</b-button>
                          </div>

                        </b-col>
                      </b-row>
                    </div>
                  </b-row>

                  <br/>

                </b-col>

                <!-- </form> -->

                <!-- end of the form here -->

              </b-col> <!-- b-col that close for BOX 10 -->



            </b-row>

          </div> <!-- div that close for BOX 9 and BOX 10 -->

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

              <b v-if="reservation.Booker.Person.last_name == 'undefined' || reservation.Booker.Person.last_name == 'null'" style="text-transform: capitalize" >{{reservation.Booker.Person.first_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}}- <button  type="button" class="btn btn-outline-primary" v-on:click="reservationSessionId = reservation.id, reservationDetail($event,reservation.id)" v-b-modal.modal-reloadReservation style="margin-bottom: 2%;">&#10002;</button> </b>

              <b v-else style="text-transform: capitalize">{{reservation.Booker.Person.last_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}} 
                <span v-if="reservation.battlemode > '0' "> <br> Battle Mode </span> 

                <!-- <button  type="button" class="btn btn-outline-primary" v-on:click="reservationSessionId = reservation.id, reservationDetail($event,reservation.id)" v-b-modal.modal-reloadReservation style="margin-bottom: 2%;">&#10002;</button></b> -->
                <button  type="button" class="btn btn-outline-primary" v-on:click="reservationSessionId = reservation.id, reservationDetail($event,reservation.id)" v-b-modal.modal-reloadReservation style="margin-bottom: 2%;">Edit</button></b>

                <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1"> -->
                  <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" @add="onDragBackReservation(),onDragBackReservation()">
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


              <!-- <div slot="footer" class="btn-group list-group-item" role="group" aria-label="Basic example">

              </div> -->

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

  <br><br>

  <div class="bv-example-row" style="width:80%;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

    <b-row>
      <b-col><a href="/#/Onboardingtest">Onboarding Test</a></b-col>
      <b-col><a href="/#/Dashboard">Dashboard</a></b-col>
      <b-col><a href="/#/Teamwaiting">Waitlist</a></b-col>
      <b-col><a href="/#/controlroom">Control Room</a></b-col>
      <b-col><a href="/#/Rfid">Check Rfid</a></b-col>
      <b-col><a href="/#/Scanmedia">Photobomb Rfid</a></b-col>
      <b-col>Photo Bomb</b-col>
      <b-col><a href="/#/Customers">Update Profile</a></b-col>
      <b-col>Bomb Vision</b-col>
      <b-col>Support</b-col>
      <b-col><a href="https://docs.google.com/document/u/3/?tgif=c" target="_blank">EOD</a></b-col>
      <!-- <b-col> | </b-col> -->
      <b-col><a href="https://joinhomebase.com/" target="_blank">Homebase</a></b-col>
      <b-col><a href="https://xola.com/_public/login.html" target="_blank">Xola</a></b-col>
      <b-col><a href="https://squareup.com/login" target="_blank">Square</a></b-col>

    </b-row>

  </div>

  <br>

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

  axios.get(process.env.VUE_APP_DATABASE_MISSION).then(response => (this.missions = response.data ));

  axios.get(process.env.VUE_APP_DTB_ORGANIZATION).then(response => (this.organizationList = response.data));

  var currenttime = moment().format('h:mm A');
// console.log(currenttime);

const start = moment();
/** first time case **/
const remainder1 = 0 - (start.minute() % 30);
const dateTime1 = moment(start).add(remainder1, "minutes").format(" h:mm a");
this.fetchPlayerListDate = moment().format("YYYY-MM-DD");
this.fetchPlayerListDateTime1 = dateTime1;

this.reservationTimeHourly = moment(start).add(remainder1, "minutes").format("h");
this.reservationTimeQuaterly = moment(start).add(remainder1, "minutes").format("mm");
this.reservationAmPm = moment(start).format("A");
this.reservationStaticHour = moment(start).add(remainder1, "minutes").format("h");

const dateTime1B = moment(start).add(remainder1, "minutes").format(" h:mm a");

/** second time case **/
const remainder2 = 15 - (start.minute() % 30);
const dateTime2 = moment(start).add(remainder2, "minutes").format(" h:mm a");
const dateTime2A = moment(start).add(remainder2, "minutes").format(" h:mm a");
const dateTime2B = moment(start).add(remainder2, "minutes").format(" h:mm a");
// const dateTime1B = moment(start).add(remainder1, "minutes").format(" h:mm a");

/** third time case **/
const remainder3 = 30 - (start.minute() % 30);
const dateTime3 = moment(start).add(remainder3, "minutes").format(" h:mm a");

/** forth time case **/
const remainder4 = 45 - (start.minute() % 30);
const dateTime4 = moment(start).add(remainder4, "minutes").format(" h:mm a");

/** fifth time case **/
const remainder5 = 60 - (start.minute() % 30);
const dateTime5 = moment(start).add(remainder5, "minutes").format(" h:mm a");

/** sixth time case **/
const remainder6 = 75 - (start.minute() % 30);
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

this.sessionRow10DateTime = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD HH:mm:00");
this.sessionRow11DateTime = moment(start).add(remainder1, "minutes").format("YYYY-MM-DD HH:mm:00");
console.log(this.sessionRow10DateTime);

this.sessionRow12DateTime = moment(start).add(remainder2, "minutes").format("YYYY-MM-DD HH:mm:00");
this.sessionRow13DateTime = moment(start).add(remainder2, "minutes").format("YYYY-MM-DD HH:mm:00");
console.log(this.sessionRow12DateTime);

this.sessionRow14DateTime = moment(start).add(remainder3, "minutes").format("YYYY-MM-DD HH:mm:00");
this.sessionRow15DateTime = moment(start).add(remainder3, "minutes").format("YYYY-MM-DD HH:mm:00");
console.log(this.sessionRow14DateTime);

this.sessionRow16DateTime = moment(start).add(remainder4, "minutes").format("YYYY-MM-DD HH:mm:00");
this.sessionRow17DateTime = moment(start).add(remainder4, "minutes").format("YYYY-MM-DD HH:mm:00");
console.log(this.sessionRow16DateTime);

this.sessionRow18DateTime = moment(start).add(remainder5, "minutes").format("YYYY-MM-DD HH:mm:00");
this.sessionRow19DateTime = moment(start).add(remainder5, "minutes").format("YYYY-MM-DD HH:mm:00");
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
    // this["sessionRow"+i+"DateTime"] = dateTime1;
    // console.log(i);
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
      // this["sessionRow"+i+"DateTime"] = dateTime1;
    }
  }
  /** END of auto generate date/time based upon box **/

  var starttime='start';
  var endtime='end';


  // var currentdate = moment().subtract(6, 'days').format("YYYY-MM-DD");
  var currentdate = moment().format("YYYY-MM-DD");
  console.log(currentdate+ ' date used for reservation');

  var startCurrentDate = moment().format('YYYY-MM-DD');
  var startReservationTime = moment().subtract(2, 'hours').format('HH:mm:ss');
  var endReservationTime = moment().add(2, 'hours').format('HH:mm:ss');

  var getStartDateTime = moment().format('HHmm');
  console.log('get start time '+getStartDateTime);
  if(getStartDateTime > 200){
    console.log('time was greater than 2:00 AM. So no update on date.');
  // var startCurrentDate = moment()
}
else{
  console.log('time was greater than 12:00 AM and less than 2:00 AM. So update on current date.');
  startCurrentDate = moment().subtract(1,'days').format('YYYY-MM-DD');

  /** added the below line to display all times **/
  startReservationTime = moment().subtract(1,'days').subtract(2,'hours').format('HH:mm:ss');
  console.log('start reservation time after 12:00 AM was used as '+startReservationTime);

}

this.startReservationTime = startReservationTime;
this.endReservationTime = endReservationTime;
this.reservationDateUsed = currentdate;

console.log("START RESEVATION TIME "+startReservationTime);
console.log("END RESERVATION TIME "+endReservationTime);

console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+startCurrentDate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);

// axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T10:00:00'+'/'+endtime+'/'+currentdate+'T23:00:00',{ 
axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+startCurrentDate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

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




/** END OF FOR LOOP **/

this.changeOnboarding();
  // this.loadScreen = false;

},

data() {
  return {

    fetchPlayerListDate: '',
    fetchPlayerListDateTime1: '',
    reservationTimeHourly: '',
    reservationTimeQuaterly: '',
    reservationAmPm: '',
    reservationStaticHour: '',
    disableDiv: '',
    totalBoxes: '',

    previousTeamArrayValue: '',
    previousTeamEnableRfidModal: '',
    previousButtonLimitValue: 0, /** this value defines the limit part for get_all check in **/
    previousTeamPlayerSessionId: '', /** this will get updated when the user drag the player id out from a box **/
    previousRouteValue: '', /** this will route value for a team box when user will try to update value for RFID BOX **/

    playerDetailValue: '', /** this will store the value of list10sessionid before reload for modal-playersDetail **/
    playerDetailsArray: [], /** this will store the session id ARRAY value clicked on before reload **/
    playerDetailsName: [],
    
    fetchList: [],
    teamName: [],
    selected: [],
    playersAdded: [],
    onboardedTime: [],
    onboardedCreatedTime: [],
    xolaReservationTime: [],
    checkMove: [],

    draggedItemObjectId: '',

    reservationSessionId: '',
    clickedReservationId: [],
    displayTeamName: 'Team Name',

    loadScreen: false,

    playersAdded1: 0,
    playersAdded2: 0,
    playersAdded3: 0,
    playersAdded4: 0,
    playersAdded5: 0,
    playersAdded6: 0,
    playersAdded7: 0,
    playersAdded8: 0,
    playersAdded9: 0,
    playersAdded10: 0,

    onboardedTime1: 0,
    onboardedTime2: 0,
    onboardedTime3: 0,
    onboardedTime4: 0,
    onboardedTime5: 0,
    onboardedTime6: 0,
    onboardedTime7: 0,
    onboardedTime8: 0,
    onboardedTime9: 0,
    onboardedTime10: 0,

    onboardedCreatedTime1: 0,
    onboardedCreatedTime2: 0,
    onboardedCreatedTime3: 0,
    onboardedCreatedTime4: 0,
    onboardedCreatedTime5: 0,
    onboardedCreatedTime6: 0,
    onboardedCreatedTime7: 0,
    onboardedCreatedTime8: 0,
    onboardedCreatedTime9: 0,
    onboardedCreatedTime10: 0,

    xolaReservationTime1: 0,
    xolaReservationTime2: 0,
    xolaReservationTime3: 0,
    xolaReservationTime4: 0,
    xolaReservationTime5: 0,
    xolaReservationTime6: 0,
    xolaReservationTime7: 0,
    xolaReservationTime8: 0,
    xolaReservationTime9: 0,
    xolaReservationTime10: 0,

    checkReader:'',
    draggedTeamPlayerSessionId:'',

    emptyBoxValue: '',
    checkMoveButtonValue: '',
    sameRfidReader: false,

    startReservationTime: '',
    endReservationTime: '',
    reservationDateUsed: '',

    /** this will disable the push for more than 6 players **/
    checkMove10: true,
    checkMove11: true,
    checkMove12: true,
    checkMove13: true,
    checkMove14: true,
    checkMove15: true,
    checkMove16: true,
    checkMove17: true,
    checkMove18: true,
    checkMove19: true,

    /** this will stop duplicate values for reader**/
    checkRfidReader: 0,
    checkReaderArray: [],

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
    sessionRow5DateTime:'',

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

    clickedTeamName:'',
    clickedReservationLastName:'',

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

    disableButton0: false,
    disableButton1: false,
    disableButton2: false,
    disableButton3: false,
    disableButton4: false,
    disableButton5: false,
    disableButton6: false,
    disableButton7: false,
    disableButton8: false,
    disableButton9: false,
    // disableButton10: false,

    removeWaitlist0: false,
    removeWaitlist1: false,
    removeWaitlist2: false,
    removeWaitlist3: false,
    removeWaitlist4: false,
    removeWaitlist5: false,
    removeWaitlist6: false,
    removeWaitlist7: false,
    removeWaitlist8: false,
    removeWaitlist9: false,
    // removeWaitlist0: false,

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

    toListFetch0:'',
    toListFetch1:'',
    toListFetch2:'',
    toListFetch3:'',
    toListFetch4:'',
    toListFetch5:'',
    toListFetch6:'',
    toListFetch7:'',
    toListFetch8:'',
    toListFetch9:'',
    // toListFetch10:'',

    fetchPlayerList:[],

    fetchPlayerList0:[],
    fetchPlayerList1:[],
    fetchPlayerList2:[],
    fetchPlayerList3:[],
    fetchPlayerList4:[],
    fetchPlayerList5:[],
    fetchPlayerList6:[],
    fetchPlayerList7:[],
    fetchPlayerList8:[],
    fetchPlayerList9:[],
    // fetchPlayerList10:[],

    arrived0: '',
    arrived1: '',
    arrived2: '',
    arrived3: '',
    arrived4: '',
    arrived5: '',
    arrived6: '',
    arrived7: '',
    arrived8: '',
    arrived9: '',
    // arrived10: '',
    // arrived10: '',

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

    teamVsTeam10: '0',
    teamVsTeam11: '0',
    teamVsTeam12: '0',
    teamVsTeam13: '0',
    teamVsTeam14: '0',
    teamVsTeam15: '0',
    teamVsTeam16: '0',
    teamVsTeam17: '0',
    teamVsTeam18: '0',
    teamVsTeam19: '0',
    teamVsTeam20: '0',

    bothTeamName10: '',
    bothTeamName11: '',
    bothTeamName12: '',
    bothTeamName13: '',
    bothTeamName14: '',
    bothTeamName15: '',
    bothTeamName16: '',
    bothTeamName17: '',
    bothTeamName18: '',
    bothTeamName19: '',
    bothTeamName20: '',

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

    sessionGameScoreRoom1: '',
    sessionGameScoreRoom2: '',
    sessionGameScoreRoom3: '',
    sessionGameScoreRoom4: '',
    sessionGameScoreRoom5: '',

    sessionGameRoomName1: '',
    sessionGameRoomName2: '',
    sessionGameRoomName3: '',
    sessionGameRoomName4: '',
    sessionGameRoomName5: '',

    sessionGameId1: '',
    sessionGameId2: '',
    sessionGameId3: '',
    sessionGameId4: '',
    sessionGameId5: '',

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
    playerSessionDetail4:[],
    /* end of session id */

    /** team name special characters **/
    teamNameSpecialCharacters10:'',
    teamNameSpecialCharacters11:'',
    teamNameSpecialCharacters12:'',
    teamNameSpecialCharacters13:'',
    teamNameSpecialCharacters14:'',
    teamNameSpecialCharacters15:'',
    teamNameSpecialCharacters16:'',
    teamNameSpecialCharacters17:'',
    teamNameSpecialCharacters18:'',
    teamNameSpecialCharacters19:'',
    /** end of special characters **/

    // dataList1: [
    //    { name: "Sandes", id: 0 },
    //     { name: "Chuck", id: 1 },
    //     { name: "Tiffer", id: 2 },
    //   { name: "Jesse", id: 3 },
    // ]

    // reservationNameByTime: [],

    grabAllMostRecentTeam: []
  };
},

methods: {

  teamNameSpecialCharacters(e,value){
    console.log(e.which);

    if(e.which != 32){
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
        this['teamNameSpecialCharacters'+value] = '1';

        var v = this;
        setTimeout(function(){
          v['teamNameSpecialCharacters'+value]=0;
        }, 2500);

      }
      else{
        this['teamNameSpecialCharacters'+value] = 0;
      }
    }
  },

  playerDetailSession(colValue){
    console.log('col value is '+colValue);
    console.log(this['list'+colValue+'sessionid']);

    var newColValue = colValue-10;
    console.log(newColValue);

    this.playerDetailsArray.splice(this.playerDetailsArray);

    var sessionId = this['list'+colValue+'sessionid'];
    console.log('session id was '+sessionId);

    if(this['fetchPlayerList'+newColValue][1] == null){
      /** below axios will update the team_id on SESSION TABLE **/
      axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/session/'+sessionId,{
        // team_id: teamId
      })
      .then(response => {
        console.log(response);
        // this.playerDetailsArray = response.data;
        // this.playerDetailsName = response.data.Player.person_id;

        var playerDetailLength = response.data.length;

        for(let b=0; b < playerDetailLength; b++){
          console.log(playerDetailLength);
          console.log(response.data[b].Player.person_id);

          var checkMinor = response.data[b].player_minor_id;
          var rfidValue = response.data[b].rfid_id;

          console.log(rfidValue+ ' was the rfid value');

          if(checkMinor > '0'){
            console.log('minor hai solti');

            axios.get(process.env.VUE_APP_PLAYER_MINORS+checkMinor,{

            })
            .then(response => 
            {
              console.log(response);
              console.log(response.data.first_name);

              let playerArray = [{
                'player_name': response.data.first_name+ ' ' +response.data.last_name,
                'id': response.data.id,
                'rfid_id': rfidValue
              }];

              this.playerDetailsArray.push(playerArray);
                // this.playerDetailsArray.push(response.data.first_name+ ' ' +response.data.last_name);
              })
            .catch(function (error){
              console.log(error);
            });

          }
          else{
            console.log('not minor hai solta');

            console.log(rfidValue+ ' was the rfid value');

            var peopleId = response.data[b].Player.person_id;
            axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{

            })
            .then(response => 
            {
              console.log(response);
              console.log(response.data.first_name);

              let playerArray = [{
                'player_name': response.data.first_name+ ' ' +response.data.last_name,
                'id': response.data.id,
                'rfid_id': rfidValue
              }];

              this.playerDetailsArray.push(playerArray);

                // this.playerDetailsArray.push(response.data.first_name+ ' ' +response.data.last_name);
              })
            .catch(function (error){
              console.log(error);
            });
          }

          // this['playerDetailsName'].push(response.data[b].Player.person_id);

        }

      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of team_id update on SESSION TABLE **/
    }/** end of if loop **/
    
    else{
      console.log('reloaded click click');
      console.log(this['fetchPlayerList'+newColValue][1]);

      var playerDetailLength = this['fetchPlayerList'+newColValue][1].Team_player_sessions.length;

      for(let b=0; b < playerDetailLength; b++){
        console.log('player detail length');

        var first_name = this['fetchPlayerList'+newColValue][1].Team_player_sessions[b].Person.first_name;
        var last_name = this['fetchPlayerList'+newColValue][1].Team_player_sessions[b].Person.last_name;
        var rfid_id = this['fetchPlayerList'+newColValue][1].Team_player_sessions[b].rfid_id;
        var id = this['fetchPlayerList'+newColValue][1].Team_player_sessions[b].id;

        let playerArray = [{
          'player_name': first_name+' '+last_name,
          'id': id,
          'rfid_id': rfid_id
        }];

        this.playerDetailsArray.push(playerArray);
      }

    }

    this.$root.$emit('bv::show::modal', 'modal-playersDetail', '#btnShow');

  },

  previuosTeamArrayValueFunction(event,arrayValue){
    console.log(event);
    console.log(arrayValue);
    console.log(this.fetchPlayerList.length);

    this.previousTeamArrayValue = this.fetchPlayerList.length-1-arrayValue;
  },

  reverseBoxArray(value){
    console.log('inside reverse box array');
    return value.slice().reverse();
  },

  formatedReservationFor(date){
    // console.log(date);
    // console.log('inside formated reservation for');
    return moment(date).format('h:mm A');
    console.log(date);
  },

  formatTimeAddFour(date){
    return moment(date).format('h:mm A');
    // return moment(date).add('hours', 4).format('h:mm a');
  },

  previousTeamUpdate(event, arrayValue){

    console.log(arrayValue);
    console.log(event);

    var newArrayValue = this.fetchPlayerList.length-1-arrayValue;
    console.log(newArrayValue);

    var sessionId = this.fetchPlayerList[newArrayValue].id;
    console.log(sessionId);
    console.log('inside team previous');

    var teamName = event;
    // var sessionId = this.fetchPlayerList[arrayValue].id;

    axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{

    })
    .then(response => {
      console.log(response.data[0].id);

      var teamId = response.data[0].id;
      /** below axios will update the team_id on SESSION TABLE **/
      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
        team_id: teamId
      })
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of team_id update on SESSION TABLE **/

    })
    .catch(function (error) {
      console.log(error);
    });

  },

  previousButtonActivateTeam(event, arrayValue){

    console.log(event); /** this print out the selected values as 1,2,3 for cyberbot,blockmonster, promode**/

    console.log('array value '+arrayValue);

    var sessionId = this.fetchPlayerList[arrayValue].id;

    console.log(sessionId+ ' is session id');

    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
      active: 1
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.fetchPlayerList[arrayValue].active = '1';

  },

  previousButtonRemoveWaitlist(event, arrayValue){

    console.log(event); /** this print out the selected values as 1,2,3 for cyberbot,blockmonster, promode**/

    console.log('array value '+arrayValue);

    var sessionId = this.fetchPlayerList[arrayValue].id;

    console.log(sessionId+ ' is session id');

    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
      active: 0
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.fetchPlayerList[arrayValue].active = '0';

  },

  previousChangeMission(event, arrayValue, sessionId){

    var selectedMissionId = event;

    console.log("inside on change mission"+selectedMissionId+' '+ sessionId);

    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
      mission_id: selectedMissionId
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  deleteTeamRfidUpdate($event, arrayValue, deleteIndex){
    console.log(event);
    console.log(arrayValue);
    console.log(deleteIndex);
    console.log('inside delete');

    var updateOnTPS = this.fetchPlayerList[arrayValue].Team_player_sessions[deleteIndex].id;

    console.log(updateOnTPS);

    /** this changes the input field of 
    this.fetchPlayerList[arrayValue].Team_player_sessions[deleteIndex].rfid_id = '';

    /** updates rfid_id column on Team Player Session table **/
    axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
      rfid_id: 0
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  },

  previousTeamRfidUpdate(rfidValue,arrayValue,playerIndex){
    console.log('rfid value '+rfidValue);
    console.log('array value '+arrayValue);
    console.log('player object index value '+playerIndex);
    console.log('rfid length '+rfidValue.length);

    if(rfidValue.length > 7 && rfidValue.length < 9){ /** you need to right code to upload only 8 digits for rfid value **/

      axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfidValue.toUpperCase(),{
        tag: rfidValue.toUpperCase(),
      })
      .then(response => {
        console.log(response);
        console.log(response.data[0].id);

                /** this['fetchPlayerList'+col][1].Team_player_sessions[index].rfid_id = response.data[0].id; this will convert the RED CROSS SIGN into GREEN CHECKMARK AS
                the RFID_ID value will be added to fetchPlayerList depending on col and index of the column **/

                var rfidtag_id = response.data[0].id;

                var updateRfidOnTpsId = this.fetchPlayerList[arrayValue].Team_player_sessions[playerIndex].id;

                console.log(' updated rfid on TPS id '+updateRfidOnTpsId);

                this.fetchPlayerList[arrayValue].Team_player_sessions[playerIndex].rfid_id = response.data[0].id;

                console.log(' rfid input field change background color '+this.fetchPlayerList[arrayValue].Team_player_sessions[playerIndex].rfid_id);

                axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateRfidOnTpsId,{
                  rfid_id: rfidtag_id
                })
                .then(function (response) {
                  console.log(response);
                  /** delete if same reader update **/

                })

                .catch(function (error) {
                  console.log(error);
                });

                return

              })

      /** end of rfid update to team player session table **/
      .catch(function (error) {
        console.log(error);
      });

    }

    else{

    }

  },

  deletePlayerFromTeam(event, arrayValue){
    console.log(event);
    console.log(arrayValue);

    var newArrayValue = this.fetchPlayerList.length-1-arrayValue;
    console.log(newArrayValue);

    console.log(this.fetchPlayerList[newArrayValue].Team_player_sessions.length);

    if(event.removed.element.Person.first_name.length > '1'){
      // console.log(col);
      console.log(event.removed.element.Person.first_name);

      /** check if its player or minor case for Minor**/
      if(event.removed.element.Person.minor_tag == 'M' || event.removed.element.Person.minorsymbol == 'M'){
        console.log('YES MINOR');

        if(event.removed.element.player_id == undefined){
          var playerId = event.removed.element.Person.player_id;
          console.log('if player id just dragged '+ playerId);
        }
        else{
          var playerId = event.removed.element.player_id;
          console.log('else player id dragged before '+ playerId);
        }

        if(event.removed.element.Person.id == undefined){
          var personId = event.removed.element.Person.person_id;
          console.log('if person id '+personId);
        }
        else{
          var personId = event.removed.element.Person.id;
          console.log('else person id '+personId);
        }

        if(event.removed.element.reservation_id == undefined){
          var reservationId = event.removed.element.Person.reservation_id;
          console.log('if reservation id '+reservationId);
        }
        else{
          var reservationId = event.removed.element.reservation_id;
          console.log('else reservation id '+reservationId);
        }

        var sessionId = this.fetchPlayerList[newArrayValue].id;
        console.log('session id was '+sessionId);

        /** this will update session id column as 0 on RESERVATION MINOR table **/
        console.log(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+personId+'/reservation/'+reservationId);
        axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+personId+'/reservation/'+reservationId,{
          // session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
        })
        .then(response => {
          console.log(response);

          var reservationMinorId = response.data[0].id;

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationMinorId,{
            session_id: '0'
          })
          .then(response =>{
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will remove the row from TEAM PLAYER SESSION **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+personId+'/session/'+sessionId,{

        })
        .then(response => {
          console.log(response);

          var teamPlayerId = response.data[0].id; /** it will get the team player session id and then delete using the axios.delete below **/
          console.log('team Player session id was '+teamPlayerId);

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

          })
          .then(response => {
            console.log("Deleted Id "+teamPlayerId);
          })
          .catch(error => {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will update the player_count column on session table **/
        var countPlayers = this.fetchPlayerList[newArrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: countPlayers
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      }

      /** check if its player or minor case for Player **/
      if(event.removed.element.Person.minor_tag != 'M' && event.removed.element.Person.minorsymbol != 'M'){
        console.log('No Minor');

        if(event.removed.element.Person.player_id == undefined){
          var playerId = event.removed.element.Person.Player.id;
          console.log('if player id just dragged '+ playerId);
        }
        else{
          var playerId = event.removed.element.Person.player_id;
          console.log('else player id dragged before '+ playerId);
        }

        if(event.removed.element.Person.id == undefined){
          var personId = event.removed.element.Person.id;
          console.log('if person id '+personId);
        }
        else{
          var personId = event.removed.element.Person.id;
          console.log('else person id '+personId);
        }

        if(event.removed.element.Person.reservation_id == undefined){
          var reservationId = event.removed.element.reservation_id;
          console.log('if reservation id '+reservationId);
        }
        else{
          var reservationId = event.removed.element.Person.reservation_id;
          console.log('else reservation id '+reservationId);
        }

        var sessionId = this.fetchPlayerList[newArrayValue].id;
        console.log('session id was '+sessionId);

        /** this will update session id column as 0 on RESERVATION PEOPLE table **/
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+personId+'/reservation/'+reservationId,{
          session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will remove the row from TEAM PLAYER SESSION **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+playerId+'/session/'+sessionId,{

        })
        .then(response =>{
          console.log(response);
          console.log(response.data[0].id);

          var teamPlayerId = response.data[0].id;
          console.log('team Player session id was '+teamPlayerId);

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

          })
          .then(response => {
            console.log("Deleted Id "+teamPlayerId);
          })
          .catch(error => {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will update the player_count column on session table **/
        var countPlayers = this.fetchPlayerList[newArrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: countPlayers
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      }
    }

  },

  previousTeamAdd(event, arrayValue){
    console.log(event);
    console.log(arrayValue);

    console.log(event.newIndex+' that is the object of player dragged');

    console.log(this.fetchPlayerList.length);

    var newArrayValue = this.fetchPlayerList.length-1-arrayValue;
    console.log(newArrayValue);

    var sessionId = this.fetchPlayerList[newArrayValue].id;
    console.log(sessionId);
    console.log('inside team previous');

    var teamPlayerSessionArrayId = event.newIndex;
    console.log(teamPlayerSessionArrayId+ ' team players session array id');

    console.log(this.fetchPlayerList[newArrayValue].Team_player_sessions.length);

    if(this.fetchPlayerList[newArrayValue].Team_player_sessions.length < '7'){ /** check if TPS is greater than 6 player or not **/
      /** below if/else defines if its minor or not **/

      console.log('less than 6');

      if(this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].Person.minor != 'yes'){ /** its a >18 age player **/
        console.log('Player not minor');

        var reservationPeopleId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].id;
        console.log(reservationPeopleId);

        var personId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].person_id;
        console.log(personId);

        var reservationId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].reservation_id;
        console.log(reservationId);

        var teamId = this.fetchPlayerList[newArrayValue].Team.id;
        console.log(teamId);

        var playerId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].Person.Player.id;
        console.log(playerId);

        /** this will update on Reservation People table on column called session_id **/
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleId,{
          session_id: sessionId
        })
        .then(response =>{
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will update play_count on SESSION table **/
        var playerSize = this.fetchPlayerList[newArrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: playerSize
        })
        .then(response =>{
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will find/create column on team player session table **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+sessionId,{
          team_id: teamId,
          reservation_id: reservationId
        })
        .then(response =>{
          console.log(response);

          /** when the TPS is created , the id passed along was not correct so manually adding Team Player Session Id value to fetchPlayerList[array] **/
          this.fetchPlayerList[newArrayValue].Team_player_sessions[event.newIndex].id = response.data[0].id;

          console.log('team player session id passed as '+this.fetchPlayerList[newArrayValue].Team_player_sessions[event.newIndex].id);

        })
        .catch(function (error) {
          console.log(error);
        });

      }

      if(this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].Person.minor == 'yes'){
        console.log('Minor is a player');

        var reservationMinorId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].id;
        console.log(reservationMinorId);

        var personId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].person_id;
        console.log(personId);

        var reservationId = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].Person.reservation_id;
        console.log(reservationId);

        var personPlayerid = this.fetchPlayerList[newArrayValue].Team_player_sessions[teamPlayerSessionArrayId].Person.player_id;
        console.log(personPlayerid);

        var teamId = this.fetchPlayerList[newArrayValue].Team.id;
        console.log(teamId);

        console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationMinorId);

        /** this will update on Reservation Minor table on column called session_id **/
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationMinorId,{
          session_id: sessionId
        })
        .then(response =>{
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will update play_count on SESSION table **/
        var playerSize = this.fetchPlayerList[newArrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: playerSize
        })
        .then(response =>{
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** this will find/create column on team player session table **/
        axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+personPlayerid+'/player_minor/'+personId+'/session/'+sessionId,{
          team_id: teamId,
          reservation_id: reservationId
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });


      }

      /** end of if/else loop to check player or minor **/
    }
    else{
      console.log('greater than 6');

    }
  },

  checkPlayerIdModal(){
    this.$bvModal.hide('modal-checkPlayerId');
  },

  hideMoreThan6Players(){
    console.log('hide more than 6 player modal');
    // this.changeOnboarding();
    // this.splicePreviousList();
    // this.mostRecentTeams();
    this.$root.$emit('bv::hide::modal', 'modal-morethan6players', '#btnShow');
  },

  hidePreviousteamRfid(){
    this.$root.$emit('bv::hide::modal', 'modal-previousTeamRfid', '#btnShow');
  },

  changeTimeSubtract(){
    var reservationDateTime = this.fetchPlayerListDate+'%20'+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+this.reservationAmPm;

    if(this.reservationTimeHourly < 1){
      this.reservationTimeHourly = parseInt(12)-1;
      this.reservationAmPm = 'AM';
    }
    else{
      this.reservationTimeHourly = parseInt(this.reservationTimeHourly)-1;
      // this.reservationAmPm = 'AM';
    }

    console.log(this.reservationTimeHourly);
    console.log(reservationDateTime);

    if(this.reservationTimeHourly == this.reservationStaticHour){
      this.disableDiv = '1';

      this.checkMove10 = true;
      this.checkMove11 = true;
      this.checkMove12 = true;
      this.checkMove13 = true;
      this.checkMove14 = true;
      this.checkMove15 = true;
      this.checkMove16 = true;
      this.checkMove17 = true;
      this.checkMove18 = true;
      this.checkMove19 = true;
    }
    else{
      this.disableDiv = '0';
    }


    if(this.reservationTimeQuaterly%2 == 0){
      const start = parseInt(this.reservationTimeQuaterly);
      const remainder1 = 0 - (start % 30);
      var date1 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime1 = moment(date1).add(remainder1, "minutes").format("h:mm a");
      this.dateTime1Data = dateTime1;
      var sessionDateTime1 = moment(date1).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow10DateTime = sessionDateTime1;
      this.sessionRow11DateTime = sessionDateTime1;

      const remainder2 = 15 - (start % 30);
      var date2 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime2 = moment(date2).add(remainder2, "minutes").format("h:mm a");
      this.dateTime2Data = dateTime2;
      var sessionDateTime2 = moment(date2).add(remainder2, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow12DateTime = sessionDateTime2;
      this.sessionRow13DateTime = sessionDateTime2;

      const remainder3 = 30 - (start % 30);
      var date3 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime3 = moment(date3).add(remainder3, "minutes").format("h:mm a");
      this.dateTime3Data = dateTime3;
      this.sessionRow3DateTime = dateTime3;
      var sessionDateTime3 = moment(date3).add(remainder3, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow14DateTime = sessionDateTime3;
      this.sessionRow15DateTime = sessionDateTime3;

      const remainder4 = 45 - (start % 30);
      var date4 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime4 = moment(date4).add(remainder4, "minutes").format("h:mm a");
      this.dateTime4Data = dateTime4;
      this.sessionRow4DateTime = dateTime4;
      var sessionDateTime4 = moment(date4).add(remainder4, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow16DateTime = sessionDateTime4;
      this.sessionRow17DateTime = sessionDateTime4;

      const remainder5 = 60 - (start % 30);
      var date5 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime5 = moment(date5).add(remainder5, "minutes").format("h:mm a");
      this.dateTime5Data = dateTime5;
      this.sessionRow5DateTime = dateTime5;
      var sessionDateTime5 = moment(date5).add(remainder5, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow18DateTime = sessionDateTime5;
      this.sessionRow19DateTime = sessionDateTime5;
    }

    else{
      const start = parseInt(this.reservationTimeQuaterly);
      const remainder1 = 15 - (start % 30);
      var date1 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime1 = moment(date1).add(remainder1, "minutes").format("h:mm a");
      this.dateTime1Data = dateTime1;
      this.sessionRow1DateTime = dateTime1;
      var sessionDateTime1 = moment(date1).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow10DateTime = sessionDateTime1;
      this.sessionRow11DateTime = sessionDateTime1;

      const remainder2 = 30 - (start % 30);
      var date2 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime2 = moment(date2).add(remainder2, "minutes").format("h:mm a");
      this.dateTime2Data = dateTime2;
      this.sessionRow2DateTime = dateTime2;
      var sessionDateTime2 = moment(date2).add(remainder2, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow12DateTime = sessionDateTime2;
      this.sessionRow13DateTime = sessionDateTime2;

      const remainder3 = 45 - (start % 30);
      var date3 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime3 = moment(date3).add(remainder3, "minutes").format("h:mm a");
      this.dateTime3Data = dateTime3;
      this.sessionRow3DateTime = dateTime3;
      var sessionDateTime3 = moment(date3).add(remainder3, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow14DateTime = sessionDateTime3;
      this.sessionRow15DateTime = sessionDateTime3;

      const remainder4 = 60 - (start % 30);
      var date4 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime4 = moment(date4).add(remainder4, "minutes").format("h:mm a");
      this.dateTime4Data = dateTime4;
      this.sessionRow4DateTime = dateTime4;
      var sessionDateTime4 = moment(date4).add(remainder4, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow16DateTime = sessionDateTime4;
      this.sessionRow17DateTime = sessionDateTime4;

      const remainder5 = 75 - (start % 30);
      var date5 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime5 = moment(date5).add(remainder5, "minutes").format("h:mm a");
      this.dateTime5Data = dateTime5;
      this.sessionRow5DateTime = dateTime5;
      var sessionDateTime5 = moment(date5).add(remainder5, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow18DateTime = sessionDateTime5;
      this.sessionRow19DateTime = sessionDateTime5;
    }
    
    console.log('reservation date used on subtract '+this.dateTime1Data);

  },

  changeTimeAdd(){

    var convertHour = parseInt(this.reservationTimeHourly)+1;
    // this.reservationTimeHourly = moment(convertHour).format("h");

    if(convertHour > '11'){
      this.reservationAmPm = 'PM';
    }

    console.log(this.reservationAmPm);

    if(convertHour == this.reservationStaticHour){

      this.disableDiv = '1';

      this.checkMove10 = true;
      this.checkMove11 = true;
      this.checkMove12 = true;
      this.checkMove13 = true;
      this.checkMove14 = true;
      this.checkMove15 = true;
      this.checkMove16 = true;
      this.checkMove17 = true;
      this.checkMove18 = true;
      this.checkMove19 = true;

    }
    else{
      this.disableDiv = '0';
    }

    if(convertHour > '12'){
      console.log('in');
      this.reservationTimeHourly = convertHour-12;
      console.log('subtracted '+this.reservationTimeHourly);
      // this.reservationAmPm = 'pm';
    }
    else{
      var convertHour = parseInt(this.reservationTimeHourly)+1;
      this.reservationTimeHourly = convertHour;
    }

    console.log(convertHour);
    console.log(this.reservationTimeHourly);

    var reservationDateTime = this.fetchPlayerListDate+'%20'+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+this.reservationAmPm;

    if(this.reservationTimeQuaterly%2 == 0){
      const start = parseInt(this.reservationTimeQuaterly);
      const remainder1 = 0 - (start % 30);
      var date1 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime1 = moment(date1).add(remainder1, "minutes").format("h:mm A");
      this.dateTime1Data = dateTime1;
      var sessionDateTime1 = moment(date1).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow10DateTime = sessionDateTime1;
      this.sessionRow11DateTime = sessionDateTime1;

      const remainder2 = 15 - (start % 30);
      var date2 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime2 = moment(date2).add(remainder2, "minutes").format("h:mm A");
      this.dateTime2Data = dateTime2;
      var sessionDateTime2 = moment(date2).add(remainder2, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow12DateTime = sessionDateTime2;
      this.sessionRow13DateTime = sessionDateTime2;

      const remainder3 = 30 - (start % 30);
      var date3 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime3 = moment(date3).add(remainder3, "minutes").format("h:mm A");
      this.dateTime3Data = dateTime3;
      this.sessionRow3DateTime = dateTime3;
      var sessionDateTime3 = moment(date3).add(remainder3, "minutes").format("YYYY-MM-DD h:mm a"); /** updates the time for session time on session table**/
      this.sessionRow14DateTime = sessionDateTime3;
      this.sessionRow15DateTime = sessionDateTime3;

      const remainder4 = 45 - (start % 30);
      var date4 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime4 = moment(date4).add(remainder4, "minutes").format("h:mm A");
      this.dateTime4Data = dateTime4;
      this.sessionRow4DateTime = dateTime4;
      var sessionDateTime4 = moment(date4).add(remainder4, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow16DateTime = sessionDateTime4;
      this.sessionRow17DateTime = sessionDateTime4;

      const remainder5 = 60 - (start % 30);
      var date5 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime5 = moment(date5).add(remainder5, "minutes").format("h:mm A");
      this.dateTime5Data = dateTime5;
      this.sessionRow5DateTime = dateTime5;
      var sessionDateTime5 = moment(date5).add(remainder5, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow18DateTime = sessionDateTime5;
      this.sessionRow19DateTime = sessionDateTime5;
    }

    else{
      const start = parseInt(this.reservationTimeQuaterly);
      const remainder1 = 15 - (start % 30);
      var date1 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime1 = moment(date1).add(remainder1, "minutes").format("h:mm A");
      this.dateTime1Data = dateTime1;
      this.sessionRow1DateTime = dateTime1;
      var sessionDateTime1 = moment(date1).add(remainder1, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow10DateTime = sessionDateTime1;
      this.sessionRow11DateTime = sessionDateTime1;

      const remainder2 = 30 - (start % 30);
      var date2 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime2 = moment(date2).add(remainder2, "minutes").format("h:mm A");
      this.dateTime2Data = dateTime2;
      this.sessionRow2DateTime = dateTime2;
      var sessionDateTime2 = moment(date2).add(remainder2, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow12DateTime = sessionDateTime2;
      this.sessionRow13DateTime = sessionDateTime2;

      const remainder3 = 45 - (start % 30);
      var date3 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime3 = moment(date3).add(remainder3, "minutes").format("h:mm A");
      this.dateTime3Data = dateTime3;
      this.sessionRow3DateTime = dateTime3;
      var sessionDateTime3 = moment(date3).add(remainder3, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow14DateTime = sessionDateTime3;
      this.sessionRow15DateTime = sessionDateTime3;

      const remainder4 = 60 - (start % 30);
      var date4 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime4 = moment(date4).add(remainder4, "minutes").format("h:mm A");
      this.dateTime4Data = dateTime4;
      this.sessionRow4DateTime = dateTime4;
      var sessionDateTime4 = moment(date4).add(remainder4, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow16DateTime = sessionDateTime4;
      this.sessionRow17DateTime = sessionDateTime4;

      const remainder5 = 75 - (start % 30);
      var date5 = new Date(this.fetchPlayerListDate+' '+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+' '+this.reservationAmPm);
      const dateTime5 = moment(date5).add(remainder5, "minutes").format("h:mm A");
      this.dateTime5Data = dateTime5;
      this.sessionRow5DateTime = dateTime5;
      var sessionDateTime5 = moment(date5).add(remainder5, "minutes").format("YYYY-MM-DD h:mm a");/** updates the time for session time on session table**/
      this.sessionRow18DateTime = sessionDateTime5;
      this.sessionRow19DateTime = sessionDateTime5;
    }
    

    console.log('reservation date used on add '+this.fetchPlayerListDate+'%20'+this.reservationTimeHourly+':'+this.reservationTimeQuaterly+this.reservationAmPm);

  },

  splicePreviousList(){

    var totalBoxes = '10';

    for(let b=0; b < totalBoxes; b++){

      console.log(b);

      if (b%2 == 0){

        console.log('if vitra ' +b);
        var replyDataObj1 = b;
        var routeId = '1';
        replyDataObj1={
          // "first_name": b,
          "route_id" : routeId,
          // "team_drag_time" : boxTime
        }

        console.log(replyDataObj1);

        this['toListFetch'+b] = replyDataObj1;
        this['fetchPlayerList'+b].splice(this['toListFetch'+b]);

        var newTeamValue = parseInt(b)+10;
        this['teamName'+newTeamValue] = null; /** this will empty the team name once its changed **/
        this['playersAdded'+b] = 0; /** this will display the playersAdded value as 0 once its change **/
        this['checkMove'+newTeamValue] = false;

        if(this.disableDiv == '1'){
          this['checkMove'+newTeamValue] = true;
        }

      }
      else{

        console.log('else vitra ' +b);

        var replyDataObj1 = b;
        var routeId = '2';

        replyDataObj1={
          // "first_name": b,
          "route_id" : routeId,
          // "team_drag_time" : boxTime
        }

        console.log(replyDataObj1);

        this['toListFetch'+b] = replyDataObj1;
        this['fetchPlayerList'+b].splice(this['toListFetch'+b]);

        var newTeamValue = parseInt(b)+10;
        this['teamName'+newTeamValue] = null; /** this will empty the team name once its changed **/
        this['playersAdded'+b] = 0; /** this will display the playersAdded value as 0 once its change **/
        this['checkMove'+newTeamValue] = false;

        if(this.disableDiv == '1'){
          this['checkMove'+newTeamValue] = true;
        }

      }
    }
  },

  mostRecentTeams(){
    console.log(this.fetchPlayerListDateTime1);
    console.log(this.reservationTimeHourly+' '+this.reservationTimeQuaterly+' '+' '+this.reservationAmPm);

    this.previousButtonLimitValue += 2;
    var limitValue = parseInt(this.previousButtonLimitValue);

    if(limitValue > '2'){
      // console.log('greater than 2 bruh');
      // this.fetchPlayerList.splice('sam');
      console.log('greater than 2 value bruh');
      // this.fetchPlayerList.push('san');
      // this.grabAllMostRecentTeam.push('san');

      console.log(this.fetchPlayerList.length+ ' length of fpl');

      var fetchPlayerListLength = this.fetchPlayerList.length;

      for(let b=0; b < fetchPlayerListLength; b++){
        this.teamName.shift();
        this.fetchPlayerList.shift();
        this.grabAllMostRecentTeam.shift();
      }

      var useDate = moment().format('YYYY-MM-DD');
      // var useDate = moment().format('2020-10-31');
      var startTime = moment('09:00 AM', 'HH:mm A').format('T'+'HH:mm:00');

      console.log('session row date time used is '+this.sessionRow10DateTime);

      if(moment(this.sessionRow10DateTime).format('HH') > '18'){
        // var endTime = moment(this.sessionRow10DateTime).subtract('minutes',5).format('T'+'23:55:00');
        var endDate = moment().add('days',1).format('YYYY-MM-DD');
        var endTime = moment(this.sessionRow10DateTime).subtract('minutes',5).format('T'+'23:55:00');
        console.log('end time INISDE if loop is '+endTime);
      }
      else{
        var endTime = moment(this.sessionRow10DateTime).add('hours',5).subtract('minutes',5).format('T'+'HH:mm:00');
        var endDate = moment().format('YYYY-MM-DD');
        console.log('end time INISDE else loop is '+endTime);
      }

      // var endTime = moment(this.sessionRow10DateTime).add('hours',5).subtract('minutes',5).format('T'+'HH:mm:00');
      // var endTime = moment('18:00 PM', 'HH:mm A').format('T'+'HH:mm:00');

      console.log(startTime);
      console.log(endTime);

      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+useDate+startTime+'.000Z'+'/end/'+endDate+endTime+'.000Z'+'/limit/'+limitValue);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+useDate+startTime+'.000Z'+'/end/'+endDate+endTime+'.000Z'+'/limit/'+limitValue,{

      })
      .then(response => {
        console.log(response.data.length);
        console.log(response.data[0]);
        console.log('total herr solti');

        this.totalBoxes = response.data.length;

        this['grabAllMostRecentTeam'].push(response.data);
        this.grabRecentTeamData();
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    else{
      var useDate = moment().format('YYYY-MM-DD');
      // var useDate = moment().format('2020-10-31');
      var startTime = moment('09:00 AM', 'HH:mm A').format('T'+'HH:mm:00');

      console.log(moment(this.sessionRow10DateTime).format('HH'));

      if(moment(this.sessionRow10DateTime).format('HH') > '18'){
        // var endTime = moment(this.sessionRow10DateTime).subtract('minutes',5).format('T'+'23:55:00');
        var endDate = moment().add('days',1).format('YYYY-MM-DD');
        var endTime = moment(this.sessionRow10DateTime).subtract('minutes',5).format('T'+'23:55:00');
        console.log('end time INISDE if loop is '+endTime);

        /** add the start timeloop over here for previous team display before / after 12 AM **/

      }
      else{
        var endDate = moment().format('YYYY-MM-DD');
        var endTime = moment(this.sessionRow10DateTime).add('hours',5).subtract('minutes',5).format('T'+'HH:mm:00');
      }
      // var endTime = moment('18:00 PM', 'HH:mm A').format('T'+'HH:mm:00');

      console.log(startTime);
      console.log(endTime);

      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+useDate+startTime+'.000Z'+'/end/'+endDate+endTime+'.000Z'+'/limit/2');

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+useDate+startTime+'.000Z'+'/end/'+endDate+endTime+'.000Z'+'/limit/2',{

      })
      .then(response => {
        console.log(response.data.length);
        console.log(response.data[0]);
        console.log('total herr solti');

        this.totalBoxes = response.data.length;

        this['grabAllMostRecentTeam'].push(response.data);
        this.grabRecentTeamData();
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    

  },

  grabRecentTeamData(){

    console.log('Total Boxes '+this.totalBoxes);

    for(let b=0; b < this.totalBoxes; b++){
      console.log('b value '+b);

      var replyDataObj1 = parseInt(b);
      var teamNumber = b+10;
      var passthis = 'teamName'+b;
      this.$set(this.teamName, b, this['grabAllMostRecentTeam'][0][b].Team.name);

      this.$set(this.selected, b, this['grabAllMostRecentTeam'][0][b].mission_id);

      this.$set(this.playersAdded, b, this['grabAllMostRecentTeam'][0][b].Team_player_sessions.length);

      var formatOnboardedTime = moment(this['grabAllMostRecentTeam'][0][b].updatedAt).format("h:mm A");
      this.$set(this.onboardedTime, b, formatOnboardedTime);

      var formatOnboardedCreatedTime = moment(this['grabAllMostRecentTeam'][0][b].createdAt).format("h:mm A");
      this.$set(this.onboardedCreatedTime, b, formatOnboardedCreatedTime);

      var formatXolaReservationTime = moment(this['grabAllMostRecentTeam'][0][b].createdAt).format("h:mm A");
      this.$set(this.xolaReservationTime, b, formatXolaReservationTime);

      /** this if/else will convert the checkMove to true if there is a player **/
      if(this['playersAdded'][b] > '0' && this.disableDiv == '0'){
        this.$set(this.checkMove, b, true);
      }
      else{
        this.$set(this.checkMove, b, false);
      }

      var replyDataObj3 = this['grabAllMostRecentTeam'][0][b];

      for(let i=0; i < this['grabAllMostRecentTeam'][0][b].Team_player_sessions.length; i++){

        console.log( 'i i i ko value '+i);
        console.log('session id '+this['grabAllMostRecentTeam'][0][b].id);

        if(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].id > '0'){
          console.log('for each id ho yo '+this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].id);
        }

        /** this part will check if it was player or minor **/
        if(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor == null && !this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].player_minor_id > '0'){

          console.log("Player "+i);
            // if(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.last_name == null){
            //   var playerLastName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.last_name;
            // }
            // else{
            //   var playerLastName = 'Empty';
            // }

            if(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.last_name != null){
              var playerLastName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.last_name;
            }
            else{
              var playerLastName = 'Empty';
            }
            var playerLastName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.last_name;
            var playerFirstName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.first_name;
            var playerId = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.Person.id;
            var playerReservationID = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].reservation_id;
            var player_id = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.id;
            var teamPlayerSessionId = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].id;

            var bombBeater = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.bomb_beater;
            var playerCount = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.play_count;

            var sessionTime = this['grabAllMostRecentTeam'][0][b].session_time;

            // var booker_first_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name;
            if(this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name != null){
              var booker_first_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name;
            }
            else{
              var booker_first_name = 'Empty';
            }

            if(this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.last_name != null){
              var booker_last_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.last_name;
            }
            else{
              var booker_last_name = ' ';
            }

            var sessionId = this['grabAllMostRecentTeam'][0][b].id;
            // this.teamName[] = this['grabAllMostRecentTeam'][0][b].Team.name;
            // console.log(teamNameFetched);

            console.log(playerLastName);
            console.log(playerFirstName);
            console.log(playerId);
            console.log(playerReservationID);
            console.log(player_id);
            console.log(teamPlayerSessionId);
            console.log('bomb beater '+bombBeater);
            console.log('playere count '+playerCount);
            console.log(b+" that was B id");

            console.log('minor booker '+booker_first_name+' '+booker_last_name);

            // this['toListFetch'+b] = replyDataObj1;
            // var replyDataObj3 = b;
            console.log(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i]);

            // this.$set(this.fetchPlayerList, b,{
              replyDataObj3['Team_player_sessions'][i]['Person']={
                // "Playerrrr": 'ho',
                "booker_first_name": booker_first_name,
                "booker_last_name": booker_last_name,
                "first_name": playerFirstName,
                "last_name": playerLastName,
                "id": playerId,
                "reservation_id": playerReservationID,
                "player_id": player_id,
                "team_player_session": teamPlayerSessionId,
                "session_id": sessionId,
                "session_time": sessionTime,
                "Player":{
                  "bomb_beater": bombBeater,
                  "player_count": playerCount,
                  "person_id": playerId
                },
                "Bookerdetail":{
                  "firstName": booker_first_name,
                  "lastName": booker_last_name
                }
              }

            // this['fetchPlayerList'+b].push(this['toListFetch'+b]);
            // this.fetchPlayerList.push(replyDataObj3);

          } /** if claused closed after checking minor or not **/

          if(this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor != null && this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].player_minor_id > '0'){

            console.log("MINOR MINOR MINOR");
            // console.log(response.data[0]);

            var minorLastName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor.last_name;
            var minorFirstName = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor.first_name;
            var minorPersonId = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor.id;
            var minorPlayerSignedWaiverid = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor.player_id;
            var playerReservationID = this['grabAllMostRecentTeam'][0][b].reservation_id;
            var player_id = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player.person_id;
            var teamPlayerSessionId = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].id;
            var SessionId = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].session_id;

            var sessionTime = this['grabAllMostRecentTeam'][0][b].session_time;

            // var booker_first_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name;
            // var booker_last_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.last_name;

            if(this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name != null){
              var booker_first_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.first_name;
            }
            else{
              var booker_first_name = 'Empty';
            }

            if(this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.last_name != null){
              var booker_last_name = this['grabAllMostRecentTeam'][0][b].Reservation.Booker.Person.last_name;
            }
            else{
              var booker_last_name = ' ';
            }

            var sessionId = this['grabAllMostRecentTeam'][0][b].id;

            var bombBeater = this['grabAllMostRecentTeam'][0][b].Team_player_sessions[i].Player_minor.bomb_beater;
            console.log('BOMBBEATERRRRRRRRRRRRRRRRRRR '+bombBeater);
            console.log(minorFirstName + ' ' + minorLastName);
            console.log(minorPersonId);
            console.log(minorPlayerSignedWaiverid);
            console.log(playerReservationID);
            console.log(player_id);
            console.log(teamPlayerSessionId);
            console.log(SessionId);

            console.log(booker_first_name+' '+booker_last_name);

          // this['fetchPlayerList'+b].push(this['toListFetch'+b]);

          // var replyDataObj3 = b;

            // this.$set(this.fetchPlayerList, b,{
              replyDataObj3['Team_player_sessions'][i]['Person']={
              // "Playerrrr": 'haina',
              "booker_first_name": booker_first_name,
              "booker_last_name": booker_last_name,
              "first_name": minorFirstName,
              "last_name": minorLastName,
              "id": minorPersonId,
              "person_id": minorPersonId,
              "minor_tag": 'M',
              "reservation_id": playerReservationID,
              "player_id": player_id,
              "team_player_session": teamPlayerSessionId,
              "session_id": sessionId,
              "session_time": sessionTime,
              "Player":{
                "minor_tag": 'M',
                "bomb_beater": bombBeater,
                "player_count": 1,
                "minor": 'yes'
              },
              "Bookerdetail":{
                "firstName": booker_first_name,
                "lastName": booker_last_name
              }
            }

          } /** this closes IF loop for minor or not **/


        // this['teamName'+teamNumber] = this['grabAllMostRecentTeam'][0][b].Team.name; /** [0] in this case as its define using single objects **/

        
      } /** for loop closed for i **/

      // this.$set(this.fetchPlayerList, b, 'yahoo');
      // this.fetchPlayerList.sort((a, c) => c.session_time - a.session_time);
      // console.log(this.fetchPlayerList);
      
      // console.log(replyDataObj3.sort().reverse());

      // this.fetchPlayerList.reverse();
      this.fetchPlayerList.push(replyDataObj3);
      // this.fetchPlayerList.reverse(replyDataObj3);

    } /** b for loop closed **/

    console.log('out out');

  },

  changeOnboarding(){
    /** Auto Genrate Date / Time based upon totalBoxes define **/
    var totalBoxes = '10';
    var timeUsed = 15;

    var amPm = this.reservationAmPm;
    if(amPm == 'AM'){
      console.log('AM');
      var onboardingHour = parseInt(this.reservationTimeHourly);
      var onboardingMinutes = parseInt(this.reservationTimeQuaterly)-timeUsed;

      if(onboardingHour == 12){
        onboardingHour = 12;
      }

    }
    if(amPm == 'PM'){
      console.log( 'PM ');
      var onboardingMinutes = parseInt(this.reservationTimeQuaterly)-timeUsed;
      var onboardingHour = parseInt(this.reservationTimeHourly);

      if(onboardingHour == 12){
        onboardingHour = 0;
      }

      onboardingHour += 12;

    }

    /** end of input box time update **/

    for(let b=0; b < totalBoxes; b++){

      if (b%2 == 0){
        var x = 10;
        var routeId = '1';
        onboardingMinutes += 15; /** each time its 0 , 2 , 4, 6, 8 on array will add 15 minutes as for the time **/
          // console.log(timeUsed);
          console.log(onboardingMinutes);

          if(onboardingMinutes > 59){
            console.log('yes 60 minutes');
            var onboardingHour = 1+onboardingHour;
            var onboardingMinutes = 60-onboardingMinutes;
            var reservationDateTime = this.fetchPlayerListDate+'%20'+onboardingHour+':'+onboardingMinutes+':00';
            console.log(reservationDateTime);
          }
          else{
            var reservationDateTime = this.fetchPlayerListDate+'%20'+onboardingHour+':'+onboardingMinutes+':00';
            console.log(reservationDateTime);
          }

          // var timeFormatted = moment(reservationDateTime).format("YYYY-MM-DD H:mm:00");
          // console.log(timeFormatted);
          var boxTime = reservationDateTime;

          /** this begins the process to display all the fetchPlayerList data **/

          var replyDataObj1 = parseInt(b);

          replyDataObj1={
                    // "first_name": b,
                    "route_id" : routeId,
                    "team_drag_time" : boxTime
                  }

                  console.log(replyDataObj1);

                // this.toListFetchRouteA1 = replyDataObj1;

                this['toListFetch'+b] = replyDataObj1;

                // this.fetchPlayerList.push(this.toListFetchRouteA1);

                this['fetchPlayerList'+b].push(this['toListFetch'+b]);
                
                console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId);

                axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId)
                .then(response => {
                  console.log(response);

                  this.onDrop1FunctionLoaded = response.data.length;
                  console.log(this.onDrop1FunctionLoaded);

                  if(response.data.length > 0){
                    console.log("greater than 0" + b);

                    var teamNumber = b+10;
                    /** if/else checks if TEAM PLAYER SESSION LEngth is greater than 1 then only passes teamName value **/
                    if(response.data[0].Team_player_sessions.length > '0'){
                      this['teamName'+teamNumber] = response.data[0].Team.name;
                    }
                    else{
                      this['teamName'+teamNumber] = '';
                    }

                    this['selected'+teamNumber] = response.data[0].mission_id;

                    var playerValue = 1+b;
                    console.log( ' players value is is is is'+playerValue);
                    console.log(' team number value is is is '+teamNumber);

                    this['playersAdded'+playerValue] = response.data[0].Team_player_sessions.length;
                    this['onboardedTime'+playerValue] = moment(response.data[0].updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
                    this['onboardedCreatedTime'+playerValue] = moment(response.data[0].createdAt).format("h:mm A"); /** this passes the value for created time **/
                    this['xolaReservationTime'+playerValue] = moment(response.data[0].Reservation.reservation_for).format("h:mm A"); /** this passes the value for xola reservation time **/

                    /** this if/else will convert the checkMove to true if there is a player **/
                    if(response.data[0].Team_player_sessions.length > '0'){
                      if(this['playersAdded'+playerValue] > '0' && this.disableDiv == '0'){
                        this['checkMove'+teamNumber] = true;
                      }
                      else{
                        this['checkMove'+teamNumber] = false;
                      }
                    }
                    /** end of if/else loop for a player **/

                    this.sideA1BookerNameFetched = response.data[0].Reservation.Booker.Person.first_name +' '+ response.data[0].Reservation.Booker.Person.last_name;

                    console.log(response.data[0]);

                      // this.toListFetchRouteA1 = response.data[0];

                      var trackId = response.data[0].id;
                      console.log(trackId);

                      // console.log(this.toListFetchRouteA1);
                      
                      var replyDataObj3 = response.data[0];
                      var replyDataObj2 = response.data[0];

                      for(let i=0; i < response.data[0].Team_player_sessions.length; i++){


                        console.log(i);
                        console.log(response.data[0]);
                        console.log(response.data[0].Team_player_sessions[i]);

                        var ifPlayerMinor = response.data[0].Team_player_sessions[i].player_minor_id;

                        console.log(" IN SID EEEEE ");

                        var checkTeamActive = response.data[0].active;
                        console.log(checkTeamActive);
                        console.log('check team active value '+ checkTeamActive);

                        if(checkTeamActive > '0'){
                          this['removeWaitlist'+b] = true;
                          var newValue = b+10;
                          this['sendToWishlistClicked'+newValue] = true;
                        }
                        else{
                          this['disableButton'+b] = true;
                          // var newValue = b+10;
                          // this['sendToWishlistClicked'+newValue] = false;
                        }

                        /** this will check I for each value of rfid_id to enable/disable SEND TO WAITLIST button **/
                        var checkRfidValue = response.data[0].Team_player_sessions[i].rfid_id;
                        if(checkRfidValue > '0'){
                          console.log('ENABLE WAITLIST');
                        }
                        else{
                          console.log('DISABLE WAITLIST');
                          this['disableButton'+b]=false;
                        }
                        /** end of waitlist DISBALE BUTTON **/


                        /** if clause to pass along team vs team id **/
                        var checkTeamVsTeam = response.data[0].team_vs_team_id;
                        console.log(checkTeamVsTeam);
                        if(checkTeamVsTeam > '0'){
                          console.log("YES MANNNNNNNN GREATER RRRRRRRRRRRRRRR "+ b);

                          var newValue = b+10;
                          
                          var value = newValue+1; /** add one to get side B team name **/

                          this['teamVsTeam'+newValue] = '1';

                          console.log(this['teamName'+newValue]);
                          console.log(value);

                          console.log(this['teamName'+newValue]); /** side B team name **/

                          var getTeam = this['teamName'+newValue];

                          this['bothTeamName'+value] = getTeam;

                        }

                        else{
                          console.log(" NOY GREATERRRR");
                        }

                        /** end of team vs team id **/


                        if(response.data[0].Team_player_sessions[i].Player.Person.id > 0){

                          for(let j=0; j < response.data[0].Team_player_sessions.length; j++){
                            console.log("S ABA BA BAB ");

                            console.log(response.data[0]);
                            console.log(response.data[0].Team_player_sessions);
                            console.log(response.data[0].reservation_id);
                            console.log(i);

                            if(response.data[0].Team_player_sessions[j].Player_minor == null){
                              console.log("IT WAS NULL");

                              var playerLastName = response.data[0].Team_player_sessions[j].Player.Person.last_name;
                              var playerFirstName = response.data[0].Team_player_sessions[j].Player.Person.first_name;
                              var playerId = response.data[0].Team_player_sessions[j].Player.Person.id;
                              var playerReservationID = response.data[0].reservation_id;
                              var player_id = response.data[0].Team_player_sessions[j].Player.id;
                              var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;

                              var bombBeater = response.data[0].Team_player_sessions[j].Player.bomb_beater;
                              var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

                              // var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

                              console.log(bombBeater);
                              console.log(playerCount);

                              // this.teamName[] = response.data[0].Team.name;
                              // console.log(teamNameFetched);

                              console.log(playerLastName);
                              console.log(playerFirstName);
                              console.log(playerId);
                              
                              console.log(b+" that was B id");

                              replyDataObj3['Team_player_sessions'][j]['Person']={
                               "first_name": playerFirstName,
                               "last_name": playerLastName,
                               "id": playerId,
                               "reservation_id": playerReservationID,
                               "player_id": player_id,
                               "team_player_session": teamPlayerSessionId,
                               "Player":{
                                "bomb_beater": bombBeater,
                                "player_count": playerCount,
                                "person_id": playerId
                              }
                            }

                            console.log("90909090909990909");
                            console.log(replyDataObj1);

                              // this.toListFetchRouteA1 = replyDataObj3;
                              this['toListFetch'+b] = replyDataObj3;


                              var replyDataObj2 = response.data[0].Team_player_sessions[j].Person.team_player_session;
                              console.log(replyDataObj2);

                              replyDataObj2={
                               "team_player_session": teamPlayerSessionId
                             }
                             this.tolist2TPSafterReload = replyDataObj2;


                             var teamNameFetched = response.data[0].Team.name;
                             var teamIdFetch = response.data[0].Team.id;
                             var selectFetched = response.data[0].mission_id;

                             var teamObjectId = b+10;
                             console.log(teamObjectId);
                             console.log(selectFetched);
                              // var defineTeam = 'teamName'+teamObjectId;
                              // console.log(defineTeam);
                              // console.log(teamObjectId);

                              // this.(defineTeam) = teamNameFetched;
                              // this.teamName1 = response.data[0].Team.name;
                              // this.teamIdSideA1 = response.data[0].Team.id;
                              // this.selected1 = response.data[0].mission_id;
                              this["teamName"+teamObjectId] = teamNameFetched;
                              this["selected"+teamObjectId] = selectFetched; /** this passes the value of mission to selected(COLVALUE) **/
                              this["vsselected"+teamObjectId] = teamNameFetched;

                              this["arrived"+teamObjectId] = arrivedValue;

                              // if(response.data[0].Team_player_sessions[j].Rfid > '0'){
                              //   this['removeWaitlist'+teamObjectId] = true;
                              //   this["sendToWishlistClicked"+teamObjectId] = true;
                              // }
                              // else{
                              //   this['disableButton'+teamObjectId] = false;
                              // }

                              // var useThisObject = 10+teamObjectId;

                              // console.log(this["fetchPlayerList"+useThisObject]);

                            }

                            else{
                              console.log("on reload it was a minor data");
                              console.log(response.data[0]);

                              var minorLastName = response.data[0].Team_player_sessions[j].Player_minor.last_name;
                              var minorFirstName = response.data[0].Team_player_sessions[j].Player_minor.first_name;
                              var minorPersonId = response.data[0].Team_player_sessions[j].Player_minor.id;
                              var minorPlayerSignedWaiverid = response.data[0].Team_player_sessions[j].Player_minor.player_id;
                              var playerReservationID = response.data[0].reservation_id;
                              var player_id = response.data[0].Team_player_sessions[j].Player.id;
                              var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;
                              var SessionId = response.data[0].Team_player_sessions[j].session_id;

                              var bombBeater = response.data[0].Team_player_sessions[j].Player_minor.bomb_beater;
                              // console.log('BOMBBEATERRRRRRRRRRRRRRRRRRR '+bombBeater);
                              // var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

                              console.log(minorFirstName + ' ' + minorLastName);
                              console.log(minorPersonId);
                              console.log(minorPlayerSignedWaiverid);

                              replyDataObj3['Team_player_sessions'][j]['Person']={ /** made changes here at 06/17/2021, it used to be [i] not [j] **/
                               "first_name": minorFirstName,
                               "last_name": minorLastName,
                               "id": minorPersonId,
                               "person_id": minorPersonId,
                               "minor_tag": 'M',
                               "reservation_id": playerReservationID,
                               "player_id": player_id,
                               "team_player_session": teamPlayerSessionId,
                               "Player":{
                                "minor_tag": 'M',
                                "bomb_beater": bombBeater,
                                "player_count": 1,
                                "minor": 'yes'
                              }
                            }

                              // this.toListFetchRouteA1 = replyDataObj3;
                              this['toListFetch'+b] = replyDataObj3;

                              var replyDataObj2 = response.data[0].Team_player_sessions[j].id;
                              console.log(replyDataObj2);

                              replyDataObj2={
                               "team_player_session": teamPlayerSessionId
                             }
                             this.tolist2TPSafterReload = replyDataObj2;

                             var teamNameFetched = response.data[0].Team.name;
                             var teamIdFetch = response.data[0].Team.id;
                             var selectFetched = response.data[0].mission_id;
                             var arrivedValue = response.data[0].active;

                             console.log(response.data[0]);
                             console.log(arrivedValue);


                             var teamObjectId = b+10;
                             console.log(teamObjectId);
                              // var defineTeam = 'teamName'+teamObjectId;
                              // console.log(defineTeam);
                              // console.log(teamObjectId);

                              // this.(defineTeam) = teamNameFetched;
                              // this.teamName1 = response.data[0].Team.name;
                              // this.teamIdSideA1 = response.data[0].Team.id;
                              // this.selected1 = response.data[0].mission_id;
                              this["list"+teamObjectId+"sessionid"] = SessionId;
                              this["teamName"+teamObjectId] = teamNameFetched;
                              this["teamIdBox"+teamObjectId] = teamIdFetch;
                              this["selected"+teamObjectId] = selectFetched;
                              this["vsselected"+teamObjectId] = teamNameFetched;

                              this["arrived"+teamObjectId] = arrivedValue;



                              // if(arrivedValue == '1'){
                              //   this['removeWaitlist'+teamObjectId] = true;
                              //   this["sendToWishlistClicked"+teamObjectId] = true;
                              // }
                              // else{
                              //   this['disableButton'+teamObjectId] = true;
                              // }

                              // if(response.data[0].Team_player_sessions[j].Rfid > '0'){
                              //   this['removeWaitlist'+teamObjectId] = true;
                              //   this["sendToWishlistClicked"+teamObjectId] = true;
                              // }
                              // else{
                              //   this['disableButton'+teamObjectId] = false;
                              // }

                            }

                          }

                        }

                        /** below code pushes the whole value to fetchPlayerList **/
                        this['fetchPlayerList'+b].push(this['toListFetch'+b]);

                        /** if clause display button EDIT 6 PLAYERS **/
                        // if(this['fetchPlayerList'+b][1].Team_player_sessions.length == '6'){
                        //   var newValue = 10+b;
                        //   this['checkMove'+newValue] = false;
                        // }

                      }

                      // if (trackId > 0) { 

                          // console.log("SAAAAAAA");
                      // }

                    }

                    else{
                      console.log("less");
                    }


                  })

.catch(function (error) {
  console.log(error);
});

console.log( " B KO VALUE "+ b);


/** END OF Fetch Player List Processs for IF LOOP **/

}
else{
  var x = 10;
  var i = x+b;

  if(onboardingMinutes > 59){
    console.log('yes 60 minutes');
    var onboardingHour = 1+onboardingHour;
    var onboardingMinutes = 60-onboardingMinutes;
    var reservationDateTime = this.fetchPlayerListDate+'%20'+onboardingHour+':'+onboardingMinutes+':00';
    console.log(reservationDateTime);
  }
  else{
    var reservationDateTime = this.fetchPlayerListDate+'%20'+onboardingHour+':'+onboardingMinutes+':00';
    console.log(reservationDateTime);
  }

          // var timeFormatted = moment(reservationDateTime).format("YYYY-MM-DD H:mm:00");
          // console.log(timeFormatted);
          var boxTime = reservationDateTime;


          /** this begins the process to fetchPlayerList1 inside else loop **/

          var routeId = '2';
                // const remainderRoute1 = timeFormatted;
                // const routeDateTime = moment(start).add(remainderRoute1, "minutes").format("HH:mm:00");
                // var boxTime = moment(reservationDateTime).format("YYYY-MM-DD"+'%20'+"H:mm:00");

                console.log(boxTime);
                console.log(routeId);

                var replyDataObj1 = b;

                replyDataObj1={
                    // "first_name": b,
                    "route_id" : routeId,
                    "team_drag_time" : boxTime
                  }

                  console.log(replyDataObj1);

                  this['toListFetch'+b] = replyDataObj1;

                  this['fetchPlayerList'+b].push(this['toListFetch'+b]);

                  console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId);

                  axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+boxTime+'/route_id/'+routeId)
                  .then(response => {
                    console.log(response);

                    this.onDrop1FunctionLoaded = response.data.length;
                    console.log(this.onDrop1FunctionLoaded);

                    if(response.data.length > 0){
                      console.log("greater than 0" + b);

                      var teamNumber = b+10;
                      var teamNumber = b+10;
                      /** if/else checks if TEAM PLAYER SESSION LEngth is greater than 1 then only passes teamName value **/
                      if(response.data[0].Team_player_sessions.length > '0'){
                        this['teamName'+teamNumber] = response.data[0].Team.name;
                      }
                      else{
                        this['teamName'+teamNumber] = '';
                      }

                      this['selected'+teamNumber] = response.data[0].mission_id;

                      var playerValue = 1+b;
                      console.log( ' players value is is is is'+playerValue);
                      this['playersAdded'+playerValue] = response.data[0].Team_player_sessions.length;
                      this['onboardedTime'+playerValue] = moment(response.data[0].updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
                      this['onboardedCreatedTime'+playerValue] = moment(response.data[0].createdAt).format("h:mm A"); /** this passes the value for created time **/ 
                      this['xolaReservationTime'+playerValue] = moment(response.data[0].Reservation.reservation_for).format("h:mm A"); /** this passes the value for xola reservation time **/

                      /** this if/else will convert the checkMove to true if there is a player **/
                      if(response.data[0].Team_player_sessions.length > '0'){
                        if(this['playersAdded'+playerValue] > '0' && this.disableDiv == '0'){
                          this['checkMove'+teamNumber] = true;
                        }
                        else{
                          this['checkMove'+teamNumber] = false;
                        }
                      }
                      /** end of if/else loop for a player **/

                      this.sideA1BookerNameFetched = response.data[0].Reservation.Booker.Person.first_name +' '+ response.data[0].Reservation.Booker.Person.last_name;

                      console.log(response.data[0]);

                                  // this['toListFetch'+b] = response.data[0];

                                  var trackId = response.data[0].id;
                                  console.log(trackId);

                                  console.log(this['toListFetch'+b]);
                                  
                                  var replyDataObj3 = response.data[0];
                                  var replyDataObj2 = response.data[0];

                                  for(let i=0; i < response.data[0].Team_player_sessions.length; i++){


                                    console.log(i);
                                    console.log(response.data[0]);
                                    var ifPlayerMinor = response.data[0].Team_player_sessions[i].player_minor_id;

                                    console.log(" IN SID EEEEE "); 

                                    /** this part checks the team was activated or not **/
                                    var checkTeamActive = response.data[0].active;

                                    console.log('track active ' +response.data[0].active);
                                    console.log('CHECK TEAMMMMMMMMMMMMMMMMMMMM ACTIVEEEEEEEEEEEEEEEEEE '+ checkTeamActive);
                                    if(checkTeamActive > '0'){
                                      console.log('IN IN IN');

                                      this['removeWaitlist'+b] = true;
                                      var newValue = b+10;
                                      this['sendToWishlistClicked'+newValue] = true;
                                    }

                                    else{

                                      console.log(b);

                                      this['disableButton'+b] = false;

                                        // this['sendToWishlistClicked'+newValue] = false;
                                        
                                        console.log(this['sendToWishlistClicked'+newValue]);

                                        console.log("OUT OUT OUT");
                                        // var newValue = b+10;
                                        // this['sendToWishlistClicked'+newValue] = false;
                                      }
                                      /** end of Team Activation Function **/


                                      /** if clause to pass along team vs team id **/
                                      var checkTeamVsTeam = response.data[0].team_vs_team_id;
                                      console.log(checkTeamVsTeam);
                                      if(checkTeamVsTeam > '0'){
                                        console.log("YES MANNNNNNNN GREATER RRRRRRRRRRRRRRR "+ b);

                                        var newValue = b+10;
                                        
                                        var value = newValue-1; /** add one to get side B team name **/

                                        this['teamVsTeam'+newValue] = '1';

                                        /** side B team name **/
                                        var getTeam = this['teamName'+newValue];

                                        this['bothTeamName'+value] = getTeam;

                                      }

                                      else{
                                        console.log(" NOY GREATERRRR");
                                      }

                                      /** end of team vs team id **/



                                      if(response.data[0].Team_player_sessions[i].Player.Person.id > 0){

                                        for(let j=0; j < response.data[0].Team_player_sessions.length; j++){
                                          console.log("S ABA BA BAB ");

                                          console.log(response.data[0]);
                                          console.log(response.data[0].Team_player_sessions);
                                          console.log(response.data[0].reservation_id);
                                          console.log(i);

                                          if(response.data[0].Team_player_sessions[j].Player_minor == null){
                                            console.log("IT WAS NULL");

                                            var playerLastName = response.data[0].Team_player_sessions[j].Player.Person.last_name;
                                            var playerFirstName = response.data[0].Team_player_sessions[j].Player.Person.first_name;
                                            var playerId = response.data[0].Team_player_sessions[j].Player.Person.id;
                                            var playerReservationID = response.data[0].reservation_id;
                                            var player_id = response.data[0].Team_player_sessions[j].Player.id;
                                            var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;

                                            var bombBeater = response.data[0].Team_player_sessions[j].Player.bomb_beater;
                                            var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

                                            console.log(bombBeater);
                                            console.log(playerCount);

                                          // this.teamName[] = response.data[0].Team.name;
                                          // console.log(teamNameFetched);

                                          console.log(playerLastName);
                                          console.log(playerFirstName);
                                          console.log(playerId);
                                          
                                          console.log(b+" that was B id");

                                          replyDataObj3['Team_player_sessions'][j]['Person']={
                                           "first_name": playerFirstName,
                                           "last_name": playerLastName,
                                           "id": playerId,
                                           "reservation_id": playerReservationID,
                                           "player_id": player_id,
                                           "team_player_session": teamPlayerSessionId,
                                           "Player":{
                                            "bomb_beater": bombBeater,
                                            "player_count": playerCount,
                                            "person_id": playerId
                                          }
                                        }

                                        console.log("90909090909990909");
                                        console.log(replyDataObj1);

                                        this['toListFetch'+b] = replyDataObj3;


                                        var replyDataObj2 = response.data[0].Team_player_sessions[j].Person.team_player_session;
                                        console.log(replyDataObj2);

                                        replyDataObj2={
                                         "team_player_session": teamPlayerSessionId
                                       }
                                       this.tolist2TPSafterReload = replyDataObj2;


                                       var teamNameFetched = response.data[0].Team.name;
                                       var teamIdFetch = response.data[0].Team.id;
                                       var selectFetched = response.data[0].mission_id;

                                       var teamObjectId = b+10;
                                       console.log(teamObjectId);
                                       console.log(selectFetched);
                                          // var defineTeam = 'teamName'+teamObjectId;
                                          // console.log(defineTeam);
                                          // console.log(teamObjectId);

                                          // this.(defineTeam) = teamNameFetched;
                                          // this.teamName1 = response.data[0].Team.name;
                                          // this.teamIdSideA1 = response.data[0].Team.id;
                                          // this.selected1 = response.data[0].mission_id;
                                          this["teamName"+teamObjectId] = teamNameFetched;
                                          this["selected"+teamObjectId] = selectFetched; /** this passes the value of mission to selected(COLVALUE) **/
                                          this["vsselected"+teamObjectId] = teamNameFetched;

                                          this["arrived"+teamObjectId] = arrivedValue;

                                          // if(response.data[0].Team_player_sessions[j].Rfid > '0'){
                                          //   this['removeWaitlist'+teamObjectId] = true;
                                          //   // this["sendToWishlistClicked"+teamObjectId] = true;
                                          // }
                                          // else{
                                          //   this['disableButton'+teamObjectId] = false;
                                          // }

                                          // var useThisObject = 10+teamObjectId;

                                          // console.log(this["fetchPlayerList"+useThisObject]);

                                        }

                                        else{
                                          console.log(" P OPO PO PO NULL");
                                          console.log(response.data[0]);

                                          var minorLastName = response.data[0].Team_player_sessions[j].Player_minor.last_name;
                                          var minorFirstName = response.data[0].Team_player_sessions[j].Player_minor.first_name;
                                          var minorPersonId = response.data[0].Team_player_sessions[j].Player_minor.id;
                                          var minorPlayerSignedWaiverid = response.data[0].Team_player_sessions[j].Player_minor.player_id;
                                          var playerReservationID = response.data[0].reservation_id;
                                          var player_id = response.data[0].Team_player_sessions[j].Player.id;
                                          var teamPlayerSessionId = response.data[0].Team_player_sessions[j].id;
                                          var SessionId = response.data[0].Team_player_sessions[j].session_id;

                                          // var bombBeater = response.data[0].Team_player_sessions[j].Player_minor.bomb_beater;


                                          if(response.data[0].Team_player_sessions[j].Player.bomb_beater == null){
                                            var bombBeater = '0';
                                          }
                                          else{
                                            var bombBeater = response.data[0].Team_player_sessions[j].Player.bomb_beater;
                                          }
                                          // var playerCount = response.data[0].Team_player_sessions[j].Player.play_count;

                                          console.log(minorFirstName + ' ' + minorLastName);
                                          console.log(minorPersonId);
                                          console.log(minorPlayerSignedWaiverid);


                                          replyDataObj3['Team_player_sessions'][j]['Person']={ /** made changes here at 06/18/2021 **/
                                           "first_name": minorFirstName,
                                           "last_name": minorLastName,
                                           "id": minorPersonId,
                                           "person_id": minorPersonId,
                                           "minor_tag": 'M',
                                           "reservation_id": playerReservationID,
                                           "player_id": player_id,
                                           "team_player_session": teamPlayerSessionId,
                                           "Player":{
                                            "minor_tag": 'M',
                                            "bomb_beater": bombBeater,
                                            "player_count": 1,
                                            "minor": 'yes'
                                          }
                                        }

                                        this['toListFetch'+b] = replyDataObj3;

                                        var replyDataObj2 = response.data[0].Team_player_sessions[j].id;
                                        console.log(replyDataObj2);

                                        replyDataObj2={
                                         "team_player_session": teamPlayerSessionId
                                       }
                                       this.tolist2TPSafterReload = replyDataObj2;

                                       var teamNameFetched = response.data[0].Team.name;
                                       var teamIdFetch = response.data[0].Team.id;
                                       var selectFetched = response.data[0].mission_id;
                                       var arrivedValue = response.data[0].active;

                                       console.log(response.data[0]);
                                       console.log(arrivedValue);


                                       var teamObjectId = b+10;
                                       console.log(teamObjectId);
                                          // var defineTeam = 'teamName'+teamObjectId;
                                          // console.log(defineTeam);
                                          // console.log(teamObjectId);

                                          // this.(defineTeam) = teamNameFetched;
                                          // this.teamName1 = response.data[0].Team.name;
                                          // this.teamIdSideA1 = response.data[0].Team.id;
                                          // this.selected1 = response.data[0].mission_id;
                                          this["list"+teamObjectId+"sessionid"] = SessionId;
                                          this["teamName"+teamObjectId] = teamNameFetched;
                                          this["teamIdBox"+teamObjectId] = teamIdFetch;
                                          this["selected"+teamObjectId] = selectFetched;
                                          this["vsselected"+teamObjectId] = teamNameFetched;

                                          this["arrived"+teamObjectId] = arrivedValue;

                                          // if(arrivedValue == '1'){
                                          //   this['removeWaitlist'+teamObjectId] = true;
                                          //   this["sendToWishlistClicked"+teamObjectId] = true;
                                          // }
                                          // else{
                                          //   this['disableButton'+teamObjectId] = true;
                                          // }

                                          // if(response.data[0].Team_player_sessions[j].Rfid > '0'){
                                          //   this['removeWaitlist'+teamObjectId] = true;
                                          //   this["sendToWishlistClicked"+teamObjectId] = true;
                                          // }
                                          // else{
                                          //   this['disableButton'+teamObjectId] = false;
                                          // }

                                        }

                                      }

                                    }



                                  }

                                  // if (trackId > 0) { 

                                    console.log('B KO VALUE FOR ELSE '+ b);
                                    
                                    this['fetchPlayerList'+b].push(this['toListFetch'+b]);

                                    /** if clause display button EDIT 6 PLAYERS **/
                                        // if(this['fetchPlayerList'+b][1].Team_player_sessions.length == '6'){
                                        //   var newValue = 10+b;
                                        //   this['checkMove'+newValue] = false;
                                        // }

                                      }

                                      else{
                                        console.log("less");
                                      }


                                    })

.catch(function (error) {
  console.log(error);
});

} /** END OF ELSE LOOP **/


/** END of fetchPlayerList1 loop for ELSE **/

}
/** END of auto generate date/time based upon box **/
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

reservationDetail(event,reservationId){
  console.log(reservationId);
  axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{

  })
  .then(response =>
  {
    console.log(response);
    this.clickedReservationLastName = response.data.Booker.Person.last_name[0].toUpperCase()+response.data.Booker.Person.last_name.slice(1).toLowerCase()+' Reservation';
    // string[0].toUpperCase() + string.slice(1).toLowerCase();
    if(response.data.Booker.Person.last_name.length < 1){
      this.clickedReservationLastName = response.data.Booker.Person.first_name[0].toUpperCase()+response.data.Booker.Person.first_name.slice(1).toLowerCase()+' Reservation';
    }
    this.clickedReservationId = response.data;
  })
  .catch(function (error){
    console.log(error);
  });

},

onDragBackReservation(){

  console.log('Inside drop back reservation function');

  console.log("START RESEVATION TIME "+this.startReservationTime);
  console.log("END RESERVATION TIME "+this.endReservationTime);

  var starttime='start';
  var endtime='end';

  var startReservationTime = this.startReservationTime;
  var endReservationTime = this.endReservationTime;
  var currentdate = this.reservationDateUsed;

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
            /** if the main booker and person is dragged. The code below displays the minors later on **/

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

}, /** end of Drag Back Reservation **/

checkMoveButton(event,col){
  console.log(event);
  console.log(col);
  this['checkMove'+col] = true;
},

activateTeam(event, value){
  console.log("team activated");
  console.log(value);

  var newValue = value;
  console.log('new value '+newValue);

  console.log(this["list"+newValue+"sessionid"]);

  var sessionid = this["list"+newValue+"sessionid"];

  if(sessionid == undefined || !sessionid > '0'){ /** if undefined it will check on fetchRoute col name rather than on list col value **/
    console.log('YES');
    var deductValue = value-10;
    console.log('deducted value '+deductValue);
    var sessionid = this['fetchPlayerList'+deductValue][1].id; /** session id is defined using id **/
  }

  else{
    console.log('No');
  }

  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
    active: 1
  })
  .then(response => {
    console.log(response);
    this["sendToWishlistClicked"+newValue] = true;
    var deductValue = value-10;
    this["removeWaitlist"+deductValue] = true;
  })
  .catch(function (error) {
    console.log(error);
  });


},

removeWaitingList(event, value){

  console.log(event);
  console.log(value);

  var newValueSession = value+10;

  var sessionid = this["list"+newValueSession+"sessionid"];
  console.log(sessionid);

  if(sessionid == undefined || !sessionid > '0'){ /** if undefined it will check on fetchRoute col name rather than on list col value **/
    console.log('YES');

    var sessionid = this['fetchPlayerList'+value][1].id; /** session id is defined using id **/

  }

  else{
    console.log('No');
  }

  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionid,{
    active: 0
  })
  .then(response => {
    console.log(response);
    var newValue = value+10;
    this["sendToWishlistClicked"+newValue] = false;
    this["removeWaitlist"+value] = false;
    this["disableButton"+value] = true;
    console.log(" Deactivated Waitlist for Box "+ value);
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

  hideEmptyBoxModal(){
    this.$root.$emit('bv::hide::modal', 'modal-emptyBox', '#btnShow');
  },

  previousDeleteBoxModal(){
    this.$root.$emit('bv::hide::modal', 'modal-previousDeleteBox', '#btnShow');
  },

  hideReloadReservationModal(){
    this.$root.$emit('bv::hide::modal', 'modal-reloadReservation', '#btnShow');
  },

  posttorfidapiAfterReload(event, col , index){
    console.log(event);
    console.log(col);
    console.log(index);
    console.log('san man dhan');

    if(event.length > 7 && event.length < 9){ /** you need to right code to upload only 8 digits for rfid value **/

      var teamPlayerLength = this['fetchPlayerList'+col][1].Team_player_sessions.length;

      var xx = 0;

      for(var i=0; i < teamPlayerLength; i++){

        console.log('i ='+teamPlayerLength);

        var rfidValue = this['fetchPlayerList'+col][1].Team_player_sessions[i].rfidState1;

        if(event != rfidValue){
          console.log('different value used');
                // break;
              }
              else{
                console.log('same value used');
                xx++;
              }
            }
            /** END of FOR loop to check RFID VALUE **/
            console.log(xx);

            if(xx > 1){
              console.log('do not insert');
              console.log(col);
              console.log(index+ ' index');
              this["fetchPlayerList"+col][1].Team_player_sessions[index].rfidState1 = null;
          // this['fetchPlayerList'+newCol][1].Team_player_sessions[index].rfidState1 = null; 
          this.$root.$emit('bv::show::modal', 'modal-sameReader', '#btnShow'); /** displays the modal saying same value used **/
          // this["fetchPlayerList"+col][1].Team_player_sessions[index].rfidState1 = "";
        }
        else{
          console.log('insert rfid value to database');
          /** this below part will check the rfid for unique values **/
          var totalPlayers = this["fetchPlayerList"+col][1].Team_player_sessions.length;
          console.log(totalPlayers);

          /** end of RFID unique values **/

          console.log(event);
          var arr = this['fetchPlayerList'+col];

          console.log(arr);

          console.log(this['fetchPlayerList'+col][1].Team_player_sessions[index].id);

          var number = this.countfunction++;

          console.log(number);


          var rfid_tag = event;
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag.toUpperCase(),{
            tag: rfid_tag.toUpperCase(),
          })
          .then(response => {
            console.log(response);
            console.log(response.data[0].id);

                /** this['fetchPlayerList'+col][1].Team_player_sessions[index].rfid_id = response.data[0].id; this will convert the RED CROSS SIGN into GREEN CHECKMARK AS
                the RFID_ID value will be added to fetchPlayerList depending on col and index of the column **/

                var rfidtag_id = response.data[0].id;

                var updateOnTPS = this['fetchPlayerList'+col][1].Team_player_sessions[index].id;

                this["fetchPlayerList"+col][1].Team_player_sessions[index].rfid_id = response.data[0].id;

                axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                          // player_id: playerid,
                          rfid_id: rfidtag_id
                        })
                .then(function (response) {
                  console.log(response);
                  /** delete if same reader update **/

                })

                .catch(function (error) {
                  console.log(error);
                });

                return

              })

          /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });


          var newValue = col-10;
          var totalPlayers = this["fetchPlayerList"+col][1].Team_player_sessions.length;
          console.log(totalPlayers);

          for(var i=0; i < totalPlayers; i++){

            console.log(' i value' + i);

                // if(this["fetchPlayerList"+col][1].Team_player_sessions[i].rfidState1 == ''){
                //   console.log('111111');
                //   this["disableButton"+newValue] = false;
                //   break;
                // }
                // else{

                //   if(this["fetchPlayerList"+col][1].Team_player_sessions[i].rfidState1 > '0'){
                //     console.log('2222222');
                //     this["disableButton"+newValue] = true;
                //   }
                //   else{
                //     console.log('333333');
                //     this["disableButton"+newValue] = false;
                //     break;
                //   }

                // }

                if(!this["fetchPlayerList"+col][1].Team_player_sessions[i].rfidState1 == ''){
                  console.log(i + ' 111111');

                  this["disableButton"+col] = true;

                  console.log(this["disableButton"+col]);

                  // this["disableButton"+newValue] = false;
                }
                else{
                  console.log(i + ' 222222');

                  this["disableButton"+col] = false;

                  console.log(this["disableButton"+col]);

                }

              } /** close out the FOR LOOP **/

              

              const nextIndex = index + 1;
              console.log(nextIndex);
              // console.log(this.list2.length);

              
              this.$refs.todosAfterReload[nextIndex].focus();
              console.log("SWITH TO NEXT");

            }

          } /** end of IF LOOP for event.length **/

        },

        deleteRfidBeforeReload(event, index , col){

          console.log(event);
          console.log(index);
          console.log(col);

          this["list"+col][index].rfidState1 = ''; /** this will make input field blank on UI part **/

          var newValue = col-10;

          this["disableButton"+newValue] = false; /** this will disable the SEND TO WAITLIST BUTTON **/

          // var teamPlayerSessionId = this["list"+col+"teamplayersessionid"][index];

          // axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerSessionId,{
          //   rfid_id: ''
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

          var playerId = this["list"+col][index].Person.Player.id;
              // var minorId = null;

              if(this["list"+col][index].Person.minor == 'yes'){ /** this is for minor **/

                playerId = this["list"+col][index].Person.player_id; /** serves the ADULT PLAYER ID value if minor **/
                var minorId = this["list"+col][index].Person.person_id; /** this is the minor id value **/

                axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+playerId+'/minor/'+minorId

                  )
                .then(response => {
                  console.log(response);
                  var usethisTPSId = response.data[0].id;
                  console.log(usethisTPSId);

                  console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId);

                  axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId,{
                    rfid_id: 0
                  })
                  .then(function (response) {
                    console.log(response);
                  })

                  .catch(function (error) {
                    console.log(error);
                  });


                })
                .catch(function (error) {
                  console.log(error);
                });

              }/** end of if minor **/

              else{ /** its player not minor **/

                console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_data_only/'+playerId);

                axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_data_only/'+playerId

                  )
                .then(response => {
                  console.log(response);
                  var usethisTPSId = response.data[0].id;

                  console.log(usethisTPSId);

                  // console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId);

                  axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId,{
                    rfid_id: 0
                  })
                  .then(function (response) {
                    console.log(response);
                  })

                  .catch(function (error) {
                    console.log(error);
                  });


                })
                .catch(function (error) {
                  console.log(error);
                });
              }

            },

            deleterfidonclick(event, col, index){
              console.log(event);
              console.log(index);

              console.log("delete rfid side A after reload");
              if(col > '9'){
                var newCol = col-10;
              }
              else{
                var newCol = col;
              }      


              var updateOnTPS = this['fetchPlayerList'+newCol][1].Team_player_sessions[index].id;

              console.log(updateOnTPS);

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateOnTPS,{
                  // player_id: playerid,
                  rfid_id: 0
                })
              .then(function (response) {
                console.log(response);

                console.log(newCol);
                console.log(col);

                    // console.log("papa");
                    // this.list2teamplayersessionid = response.data[0].id;
                  })

              .catch(function (error) {
                console.log(error);
              });

              this["disableButton"+newCol] = false; /** this will de-activate the SEND TO WAITLIST button **/
              console.log(this["disableButton"+newCol]);

        this['fetchPlayerList'+newCol][1].Team_player_sessions[index].rfid_id = 0; /** this will convert the RED CROSS SIGN into GREEN CHECKMARK AS
        the RFID_ID value will be added to fetchPlayerList depending on col and index of the column **/
        this['fetchPlayerList'+newCol][1].Team_player_sessions[index].rfidState1 = null; 

      },

      posttorfidapiAfterReload2(event, index){

        if(event.length > 7 && event.length < 9){

         var arr = this.toListFetchRouteB1;


         var number = this.countfunction2++;

         var rfid_tag = event;
         console.log(rfid_tag);

         axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag.toUpperCase(),{
          tag: rfid_tag.toUpperCase(),
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

      console.log(event);
      console.log('col '+col);
      console.log('index '+index);

      var teamPlayerLength = this["list"+col].length;
      console.log(teamPlayerLength);

      console.log(this["list"+col]);
      console.log(this["list"+col][index]);
      console.log(this["list"+col][index].Person.first_name);

      
      if(event.length > 7 && event.length < 9){

        /** this will compare the event value with all the value of TEAM BOX FOR RFID **/
        var xx = 0;
        for(var i=0; i < teamPlayerLength; i++){

          console.log('i ='+teamPlayerLength);
          
          var rfidValue = this['list'+col][i].rfidState1;

          console.log('rfid value was '+rfidValue);

          if(event != rfidValue){
            console.log('different value used');
            // break;
          }
          else{
            console.log('same value used');
            xx++;
          }
        }
        /** END of FOR loop to check RFID VALUE **/
        console.log(xx);

        if(xx > 1){
          console.log('do not insert');
          this["list"+col][index].rfidState1 = null;
          this.$root.$emit('bv::show::modal', 'modal-sameReader', '#btnShow'); /** displays the modal saying same value used **/
        }

        else{

          var number = this.countfunction++;

          var rfid_tag = this["list"+col][index].rfidState1;

          console.log('rfid tag was '+rfid_tag.toUpperCase());

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag.toUpperCase(),{
            tag: rfid_tag.toUpperCase(),
          })
          .then(response => {
            console.log(response.data[0].id);
            this["list"+col+"rfidcontainer"] = response.data[0].id;

            var rfidtag_id = response.data[0].id;

            var playerId = this["list"+col][index].Person.Player.id;
              // var minorId = null;

              if(this["list"+col][index].Person.minor == 'yes'){ /** this is for minor **/

                playerId = this["list"+col][index].Person.player_id; /** serves the ADULT PLAYER ID value if minor **/
                var minorId = this["list"+col][index].Person.person_id; /** this is the minor id value **/

                axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+playerId+'/minor/'+minorId

                  )
                .then(response => {
                  console.log(response);
                  var usethisTPSId = response.data[0].id;
                  console.log(usethisTPSId);

                  console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId);

                  axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId,{
                    rfid_id: rfidtag_id
                  })
                  .then(function (response) {
                    console.log(response);
                  })

                  .catch(function (error) {
                    console.log(error);
                  });


                })
                .catch(function (error) {
                  console.log(error);
                });

              }/** end of if minor **/

              else{ /** its player not minor **/

                console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_data_only/'+playerId);

                axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_data_only/'+playerId

                  )
                .then(response => {
                  console.log(response);
                  var usethisTPSId = response.data[0].id;

                  console.log(usethisTPSId);

                  // console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId);

                  axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+usethisTPSId,{
                    rfid_id: rfidtag_id
                  })
                  .then(function (response) {
                    console.log(response);
                  })

                  .catch(function (error) {
                    console.log(error);
                  });


                })
                .catch(function (error) {
                  console.log(error);
                });
              }

            })

          /** end of rfid update to team player session table **/
          .catch(function (error) {
            console.log(error);
          });

          var totalPlayers = this["list"+col].length;
          console.log(totalPlayers);

          for(var i=0; i < totalPlayers; i++){

            var newValue = col-10;

            if(this["list"+col][i].rfidState1 == ''){
              this["disableButton"+newValue] = false;
              break;
            }
            else{

              if(this["list"+col][i].rfidState1 > '0'){
                this["disableButton"+newValue] = true;
              }
              else{
                this["disableButton"+newValue] = false;
                break;
              }

            }
          }

          const nextIndex = index + 1;


          this.$refs.todos[nextIndex].focus();

          console.log('inserted wristband detail');
        }

      } /** end of IF for event.length **/

      else{
        console.log("RFID TAG WAS LESS THAN 8 characters scanned/used");
      } 

    },

    hideSameReaderModal(){
      this.$root.$emit('bv::hide::modal', 'modal-sameReader', '#btnShow');
      this.checkRfidReader = 0;
    },

    rfidreset(index,col){
      this["list"+col][index].rfidState1 = '';
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

    // console.log(this['vsselected'+colvalue].length);

    if(!event.length > '0'){

      console.log("LESS OR NULL VALUES");

      if(colvalue%2 != '0'){
        var colvalue1 = colvalue-1;
        var colvalue2 = colvalue+0;
      }
      if(colvalue%2 == '0'){
        var colvalue1 = colvalue+0;
        var colvalue2 = colvalue+1;
      }

      var getSessionIdFirstTeam = this['list'+colvalue1+'sessionid'];
      var getSessionIdSecondTeam = this['list'+colvalue2+'sessionid'];

      var teamName1 = this['teamName'+colvalue1];
      var teamName2 = this['teamName'+colvalue2];

      console.log(teamName1);
      console.log(teamName2);

      if(!this['list'+colvalue1+'sessionid'] > '0'){
        console.log('YES NUll');
        console.log(colvalue2);

        var newValue1 = colvalue1-10;
        var newValue2 = colvalue2-10;

        console.log(newValue1);
        console.log(newValue2);

        var getSessionIdFirstTeam = this['fetchPlayerList'+newValue1][1].id;
        var getSessionIdSecondTeam = this['fetchPlayerList'+newValue2][1].id;
      }

      else{
        console.log('no null');
      }

      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionIdFirstTeam,{
        team_vs_team_id : null
      })
      .then(response => {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
      /** end of SIDE A 1 session id update on team vs team id **/


      /**this will update session id on team_vs_team_id for SIDE B 1 **/

      axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionIdSecondTeam,{
        team_vs_team_id : null
      })

      .then(response => {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });

      this['bothTeamName'+colvalue1] = ''; /** this updates the team name auto on SIDE B 1 **/
      this['bothTeamName'+colvalue2] = ''; /** this updates the team name auto on SIDE B 1 **/

    } /** END OF IF FOR TEAM PLAYER SESSION **/

    else{
      console.log("MORE VALUESSSSSSSSSSSSSSSSSSSSSS");

      if(colvalue%2 != '0'){
        var colvalue1 = colvalue-1;
        var colvalue2 = colvalue+0;
      }
      if(colvalue%2 == '0'){
        var colvalue1 = colvalue+0;
        var colvalue2 = colvalue+1;
      }

      var getSessionIdFirstTeam = this['list'+colvalue1+'sessionid'];
      var getSessionIdSecondTeam = this['list'+colvalue2+'sessionid'];

      var teamName1 = this['teamName'+colvalue1];
      var teamName2 = this['teamName'+colvalue2];

      console.log(teamName1);
      console.log(teamName2);

      if(!this['list'+colvalue1+'sessionid'] > '0'){
        console.log('YES NUll');
        console.log(colvalue2);

        var newValue1 = colvalue1-10;
        var newValue2 = colvalue2-10;

        console.log(newValue1);
        console.log(newValue2);

        var getSessionIdFirstTeam = this['fetchPlayerList'+newValue1][1].id;
        var getSessionIdSecondTeam = this['fetchPlayerList'+newValue2][1].id;
      }

      else{
        console.log('no null');
      }

      console.log(getSessionIdFirstTeam);
      console.log(getSessionIdSecondTeam);

      axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName1,{

      })
      .then(response => {
        console.log(response);
        console.log(response.data[0].id);
        var teamNameId = response.data[0].id;
        console.log(teamNameId);

        console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionIdSecondTeam);

        /** this will update session id on team_vs_team_id for SIDE A 1 **/
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionIdSecondTeam,{
          team_vs_team_id : getSessionIdFirstTeam
        })
        .then(response => {
          console.log(response);
        })

        .catch(function (error) {
          console.log(error);
        });
        /** end of SIDE A 1 session id update on team vs team id **/


        /**this will update session id on team_vs_team_id for SIDE B 1 **/

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+getSessionIdFirstTeam,{
          team_vs_team_id : getSessionIdSecondTeam
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

      this['bothTeamName'+colvalue1] = this['teamName'+colvalue2];
      this['bothTeamName'+colvalue2] = this['teamName'+colvalue1];

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
          // name: this.vsselected2
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

  previousEmptyBox(event, arrayValue){
    console.log(event);
    console.log(arrayValue);
    console.log('do something');
    console.log(this.fetchPlayerList[arrayValue].Team_player_sessions.length);

    var sessionId = this.fetchPlayerList[arrayValue].id;

    var teamPlayerSessionLength = this.fetchPlayerList[arrayValue].Team_player_sessions.length;

    console.log('session id '+sessionId);
    console.log(teamPlayerSessionLength);

    for(var i=0; i < teamPlayerSessionLength; i++){

      /** check if its minor or player **/
      if(this.fetchPlayerList[arrayValue].Team_player_sessions[i].Person.minor_tag == 'M'){
        console.log('player '+i+ ' is minor');

        var getReservationId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].Person.reservation_id; /** this is reservation id **/
        var getPersonId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].Person.person_id; /** this is player minor id **/
        console.log(getReservationId);
        console.log(getPersonId);

        console.log(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+getPersonId+'/reservation/'+getReservationId);

        axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+getPersonId+'/reservation/'+getReservationId,{
              // session_id: 0
            })
        .then(response => {
          console.log(response);
          console.log(response.data);

          var reservationPeopleId = response.data[0].id;

          /** this will update the reservation people id , column name session_id into 0 **/
          console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleId);

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleId,{
            session_id: 0
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of session id update on RESERVATION PEOPLE TABLE **/

        })
        .catch(function (error) {
          console.log(error);
        });

        /** the below will delete particular minor row from TEAM PLAYER SESSION table **/
        var teamPlayerSessionId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].id;
        /** this will remove the row from TEAM PLAYER SESSION **/
        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerSessionId,{

        })
        .then(response => {
          console.log("Deleted Id "+teamPlayerSessionId);
        })
        .catch(error => {
          console.log(error);
        });

        /** this will update the player_count column on session table **/
        var countPlayers = this.fetchPlayerList[arrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: countPlayers
        })
        .then(response => {
          console.log(response);
          // console.log(response.data.session_id);
        })
        .catch(error => {
          console.log(error);
        });

        /** checks if the Team Player Session is 0 and deletes the session column **/
        // if(!countPlayers > '0'){
        //   console.log('inside session delete function');
        //   axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{

        //   })
        //   .then(response => {
        //     console.log(response);
        //     console.log('session deleted when TPS was 0');
        //     console.log(response.data.session_id);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        // }
        


      } /** end of if loop to check if its minor ot not **/

      /** check else for player or minor **/
      else{
        console.log('player '+i+ ' is not a minor');

        var getReservationId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].reservation_id; /** this is reservation id **/
        var getPersonId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].Person.id; /** this is player minor id **/
        console.log(getReservationId);
        console.log(getPersonId);

        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+getPersonId+'/reservation/'+getReservationId);

        axios.post(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+getPersonId+'/reservation/'+getReservationId,{
              // session_id: 0
            })
        .then(response => {
          console.log(response);
          console.log(response.data);

          var reservationPeopleId = response.data[0].id;

          /** this will update the reservation people id , column name session_id into 0 **/
          console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleId);

          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleId,{
            session_id: 0
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of session id update on RESERVATION PEOPLE TABLE **/

        })
        .catch(function (error) {
          console.log(error);
        });

        /** the below will delete particular minor row from TEAM PLAYER SESSION table **/
        var teamPlayerSessionId = this.fetchPlayerList[arrayValue].Team_player_sessions[i].id;
        /** this will remove the row from TEAM PLAYER SESSION **/
        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerSessionId,{

        })
        .then(response => {
          console.log("Deleted Id "+teamPlayerSessionId);
        })
        .catch(error => {
          console.log(error);
        });

        /** this will update the player_count column on session table **/
        var countPlayers = this.fetchPlayerList[arrayValue].Team_player_sessions.length;
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          player_count: countPlayers
        })
        .then(response => {
          console.log(response);
          // console.log(response.data.session_id);
        })
        .catch(error => {
          console.log(error);
        });

        /** checks if the Team Player Session is 0 and deletes the session column **/
        // if(countPlayers == '0'){
        //   console.log('inside session delete function');
        //   axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{

        //   })
        //   .then(response => {
        //     console.log(response);
        //     console.log('session deleted when TPS was 0');
        //     console.log(response.data.session_id);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        // }

      } /** end of ELSE Loop to check ifs minor or player**/

    }/** END of for Loop **/

    axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{

    })
    .then(response => {
     console.log(response);
     console.log('session deleted when TPS was 0');
     console.log(response.data.session_id);
   })
    .catch(error => {
      console.log(error);
    });

  },

  emptyBox(event, col){
    console.log(event);
    console.log(col);

    if(this['list'+col].length > '0'){

      console.log('before reload code');

      /** below code will empty session_id column into null for reservation minor/players **/

      console.log(this['list'+col]);
      console.log(this['list'+col].length);

      var teamPlayerSessionLength = this['list'+col].length;
      console.log('length '+teamPlayerSessionLength);

      for(var i=0; i < teamPlayerSessionLength; i++){
        console.log(i);

        console.log(this['list'+col][i].Person.minor);

        if(this['list'+col][i].Person.minor == 'yes'){ /** teamPlayerSession[i] is minor **/

          var getReservationId = this['list'+col][i].Person.reservation_id;
          var getPersonId = this['list'+col][i].Person.person_id;
          console.log(getReservationId);
          console.log(getPersonId);

          axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+getPersonId+'/reservation/'+getReservationId,{
                // session_id: 0
              })
          .then(response => {
            console.log(response);
            console.log(response.data);

            var reservationPeopleId = response.data[0].id;

            /** this will update the reservation people id , column name session_id into 0 **/
            axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleId,{
              session_id: 0
            })
            .then(response => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of session id update on RESERVATION PEOPLE TABLE **/

          })
          .catch(function (error) {
            console.log(error);
          });


        }/** end of minor IF clause **/

        /** else is for player **/
        else{
          var getReservationId = this['list'+col][i].reservation_id;
          var getPersonId = this['list'+col][i].person_id;
          console.log(getReservationId);
          console.log(getPersonId);

          axios.post(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+getPersonId+'/reservation/'+getReservationId,{
                // session_id: 0
              })
          .then(response => {
            console.log(response);
            console.log(response.data);

            var reservationPeopleId = response.data[0].id;

            /** this will update the reservation people id , column name session_id into 0 **/
            axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleId,{
              session_id: 0
            })
            .then(response => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of session id update on RESERVATION PEOPLE TABLE **/

          })
          .catch(function (error) {
            console.log(error);
          });
        }/** end of else clause for players only **/

        var tallyLoop = i+1;
        var deleteSessionId = this['list'+col+'sessionid'];
        var getPersonId = this['list'+col][i].Person.Player.id;

        if(tallyLoop==teamPlayerSessionLength){
          console.log('if i value was '+i+'and team player sessin length was '+teamPlayerSessionLength);
          console.log('reload page here');
          console.log('player id '+getPersonId);
          console.log('session id '+deleteSessionId);

          if(this['list'+col][i].Person.minor == 'yes'){
            console.log('if i value '+i+' is minor');

            var getMainPersonId = this['list'+col][i].Person.player_id;
            var getMinorPersonId = this['list'+col][i].person_id;

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+getMainPersonId+'/player_minor/'+getMinorPersonId+'/session/'+deleteSessionId,{

            })
            .then(response => {

              console.log(response);

              var teamPlayerId = response.data[0].id;
              console.log(teamPlayerId);

              axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

              })
              .then(response =>{
                console.log('deleted');
                console.log(response);
              })
              .catch(function(error){
                console.log(error);
              })

            })
            .catch(error => {
              console.log(error);
            });
          }
          else{
            console.log('else i value '+i+' is not minor');
            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+getPersonId+'/session/'+deleteSessionId,{

            })
            .then(response => {

              console.log(response);

              var teamPlayerId = response.data[0].id;
              console.log(teamPlayerId);

              axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

              })
              .then(response =>{
                console.log('deleted');
                console.log(response);
              })
              .catch(function(error){
                console.log(error);
              })

            })
            .catch(error => {
              console.log(error);
            });
          }

          axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+deleteSessionId,{

          })
          .then(response => {
            console.log("Deleted Id from BOX "+col+ 'session id was' + deleteSessionId);
            this.reloadPageEvent();
          })
          .catch(error => {
            console.log(error);
          });

        }
        else{
          console.log('else i value was '+i+'and team player sessin length was '+teamPlayerSessionLength);
          console.log('player id '+getPersonId);
          console.log('session id '+deleteSessionId);
          
          /** check if its minor or not **/

          if(this['list'+col][i].Person.minor == 'yes'){
            console.log('if i value '+i+' is minor');

            var getMinorPersonId = this['list'+col][i].person_id;
            var getMainPersonId = this['list'+col][i].Person.player_id;

            console.log(getMinorPersonId);
            console.log(getMainPersonId);

            console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+getMainPersonId+'/player_minor/'+getMinorPersonId+'/session/'+deleteSessionId);

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+getMainPersonId+'/player_minor/'+getMinorPersonId+'/session/'+deleteSessionId,{

            })
            .then(response => {

              console.log(response);

              var teamPlayerId = response.data[0].id;
              console.log(teamPlayerId);

              axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

              })
              .then(response =>{
                console.log('deleted');
                console.log(response);
              })
              .catch(function(error){
                console.log(error);
              })

            })
            .catch(error => {
              console.log(error);
            });

            
          }
          else{
            console.log('else i value '+i+' is not minor');
            console.log(getPersonId);

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+getPersonId+'/session/'+deleteSessionId,{

            })
            .then(response => {

              console.log(response);

              var teamPlayerId = response.data[0].id;
              console.log(teamPlayerId);

              axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

              })
              .then(response =>{
                console.log('deleted');
                console.log(response);
              })
              .catch(function(error){
                console.log(error);
              })

            })
            .catch(error => {
              console.log(error);
            });

            
          }


          /** end of if/else for minor or not **/

        }

      }

      /** end of session id empty **/


      // this.emptyBoxReload();

    } /** if clause closed **/

    else{ /** else the player are on fetchPlayerList **/

      var newCol = col-10;
      console.log(newCol);

      /** below code will update the reservation_minor and reservation_people session id into NULL **/

      var teamPlayerSessionLength = this['fetchPlayerList'+newCol][1].Team_player_sessions.length;
      console.log('length '+teamPlayerSessionLength);

      for(var i=0; i < teamPlayerSessionLength; i++){

        console.log(i);
        console.log('player minor id ' + this['fetchPlayerList'+newCol][1].Team_player_sessions[i].Person.person_id);
        console.log('team player session minor id ' + this['fetchPlayerList'+newCol][1].Team_player_sessions[i].id);
        console.log('reservation id  for minor ' + this['fetchPlayerList'+newCol][1].Team_player_sessions[i].reservation_id);

        /** the loop below will check the MINOR/PLAYER and update reservation minors **/
        if(this['fetchPlayerList'+newCol][1].Team_player_sessions[i].Person.Player.minor == 'yes'){

          var getReservationId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].reservation_id; /** this is reservation id **/
          var getPersonId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].player_minor_id; /** this is player minor id **/
          console.log('minor reservation id '+getReservationId);
          console.log(getPersonId);
          console.log ( ' i i i i i i '+i);

          console.log(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+getPersonId+'/reservation/'+getReservationId);

          axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+getPersonId+'/reservation/'+getReservationId,{
              // session_id: 0
            })
          .then(response => {
            console.log(i);
            console.log(response);
            console.log(response.data);

            var reservationPeopleId = response.data[0].id;

            /** this will update the reservation people id , column name session_id into 0 **/
            console.log(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleId);

            axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleId,{
              session_id: 0
            })
            .then(response => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of session id update on RESERVATION PEOPLE TABLE **/

          })
          .catch(function (error) {
            console.log(error);
          });

        }

        else{
         var getReservationId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].reservation_id;
         var getPersonId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].Person.Player.person_id;
         console.log('player reservation id '+getReservationId);
         console.log(getPersonId);

         axios.post(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+getPersonId+'/reservation/'+getReservationId,{
              // session_id: 0
            })
         .then(response => {
          console.log(response);
          console.log(response.data);

          var reservationPeopleId = response.data[0].id;

          /** this will update the reservation people id , column name session_id into 0 **/
          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleId,{
            session_id: 0
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of session id update on RESERVATION PEOPLE TABLE **/

        })
         .catch(function (error) {
          console.log(error);
        });

       }
       /** END OF RESERVATION MINOR/PLAYER UPDATE **/

       /** below will delete the team player session values for MINORS **/
       var reloadedTallyLoop = i+1;

       if(reloadedTallyLoop == teamPlayerSessionLength){
        console.log('if /  minor / reloaded array');
        console.log(reloadedTallyLoop+' and i is '+i);
        console.log(teamPlayerSessionLength);
        console.log('team player session id '+this['fetchPlayerList'+newCol][1].Team_player_sessions[i].id);

        var reloadTeamPlayerId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].id;
        var reloadDeleteSessionId = this['fetchPlayerList'+newCol][1].session_id;

        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+reloadTeamPlayerId,{

        })
        .then(response =>{
          console.log('deleted');
          console.log(response);

          axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+reloadDeleteSessionId,{

          })
          .then(response => {
            console.log(response);
            this.reloadPageEvent();
          })
          .catch(error => {
            console.log(error);
          });

        })
        .catch(function(error){
          console.log(error);
        });

      }

      else{
        console.log('else / minor / reloaded array');
        console.log(reloadedTallyLoop+' and i is '+i);
        console.log(teamPlayerSessionLength);
        console.log('team player session id '+this['fetchPlayerList'+newCol][1].Team_player_sessions[i].id);

        var reloadTeamPlayerId = this['fetchPlayerList'+newCol][1].Team_player_sessions[i].id;
        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+reloadTeamPlayerId,{

        })
        .then(response =>{
          console.log('deleted');
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        });

      }
      /** END OF team player session delete for minors **/

    }

    /** end of session id empty **/

    var deleteSessionId = this['fetchPlayerList'+newCol][1].id;

    axios.delete(process.env.VUE_APP_DATABASE_SESSIONS+'/'+deleteSessionId,{

    })
    .then(response => {
      console.log(response);
        // this.emptyBoxReload();
      })
    .catch(error => {
      console.log(error);
    });

      // this.emptyBoxReload();

    } /** else clause closed **/

    // return this.emptyBoxReload();

  },

  emptyBoxReload(){
    // let results = await emptyBox();
    // console.log('maya in in');
    window.location.reload(true);
    // console.log(' SANDU MANDU');
  },

  posttoapi(event, col){

    console.log(col);
    console.log(event);

    // var teamIdSide = this["teamIdSide"+col];
    var teamName = this["teamName"+col];
    // console.log(teamIdSide);
    // console.log(teamName);

    var newCol = col-10;

    // console.log();

    axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
          // name: teamName
        })
    .then(response => {

      console.log(response);

      this["teamname"+col+"id"] = response.data;
      this["teamIdSide"+col] = response.data[0].id;

      console.log(response.data);
      console.log(response.data[0].id);

      if(this['list'+col+'sessionid'] > 0){

        var sessionId = this['list'+col+'sessionid'];
        var newTeamId = this["teamIdSide"+col];
        console.log(sessionId+' as '+newTeamId);

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          team_id: newTeamId
        })
        .then(response => {
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
        });
      }

      if(this['fetchPlayerList'+newCol][1].team_id > 0){

        var sessionId = this['fetchPlayerList'+newCol][1].Team_player_sessions[0].session_id;
        var newTeamId = this["teamIdSide"+col];

        console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId);

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
          team_id: newTeamId
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      } 

    })

    .catch(function (error) {
      console.log(error);
    });

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

      console.log(this['fetchPlayerList'+boxObjectId]);

      var deleteId = this['fetchPlayerList'+boxObjectId];

      var updateNullOnReservationPeople = event.removed.element.id;
      console.log(updateNullOnReservationPeople);

      var deleteTeamPlayerSessionId = event.removed.element.Person.team_player_session;
      console.log(deleteTeamPlayerSessionId);

      var countLastPlayerDragged = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions.length;
      console.log(countLastPlayerDragged);

      var sessionID = event.removed.element.session_id;

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

        /** if/else to check team player session id on drag and delete **/
        if(event.removed.element.id == undefined){
          var teamPlayerSessionId = event.removed.element.id;
          console.log(' if team player session was '+teamPlayerSessionId);
        }
        else{
          var teamPlayerSessionId = event.removed.element.id;
          console.log(' else team player session was '+teamPlayerSessionId);
        }

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

        /** if/else to check team player session id on drag and delete **/
        if(event.removed.element.id == undefined){
          var teamPlayerSessionId = event.removed.element.id;
          console.log(' if team player session was '+teamPlayerSessionId);
        }
        else{
          var teamPlayerSessionId = event.removed.element.id;
          console.log(' else team player session was '+teamPlayerSessionId);
        }

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


      }

      /** below code will update PLAYERS ADDED text **/
      var playerValue = 1+col;
      this['playersAdded'+playerValue] = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions.length;
      /** end of PLAYERS ADDED text **/

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
      })
      .then(response => {
        console.log(response);
        console.log(response.data.player_count);

        var count_total_player = response.data.player_count;

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
          player_count: countLastPlayerDragged
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


  // deleteTeamPlayerSessionAfterReload2(e){

  //   console.log(e);

  //   var fetchIndex = e.draggedContext.index;

  //   var deleteId = this.fetchPlayerList2[fetchIndex];

  //   var updateNullOnReservationPeople = e.draggedContext.element.id;
  //   console.log(updateNullOnReservationPeople);

  //   var deleteTeamPlayerSessionId = e.draggedContext.element.id;



  //   axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteTeamPlayerSessionId,{

  //   })
  //   .then(response => {
  //     console.log("Deleted Id "+deleteTeamPlayerSessionId);
  //     console.log(fetchIndex);
  //     this.fetchPlayerList2.splice(fetchIndex,1);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  //   if(e.draggedContext.element.player_minor_id > "0"){

  //     console.log(" YESSSSSSSS MINOOOOORRRS ");

  //     var minorId = e.draggedContext.element.Person.id;
  //     var minorReservationId = e.draggedContext.element.reservation_id;

  //     console.log(minorId);
  //     console.log(minorReservationId);

  //     axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorId+'/reservation/'+minorReservationId,{
  //           session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
  //         })
  //         .then(response => {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  //   }

  //   else{

  //     console.log(" NOTTTTT MINOOOOORRRS ");

  //     var playerId = e.draggedContext.element.Person.id;
  //     var playerReservationId = e.draggedContext.element.reservation_id;

  //     axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+playerId+'/reservation/'+playerReservationId,{
  //           session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
  //         })
  //         .then(response => {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  //         /** end of reservation-people update for SESSION_ID **/
  //   }


  // },


  onDropReservation1(event, col){

    console.log(event);

    // if(!event.removed == undefined || !event.removed == null){
    //   console.log('DRAGGED PLAYER NAME WAS NOT NULL');

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


          /** this will derrived value to drag and drop **/
          var listPlayerSize = this['list'+col].length;
          console.log(listPlayerSize);
          var playerValue = col-9;
          this['playersAdded'+playerValue] = listPlayerSize;
          /** end of derrived value for player number **/


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

              var teamSize = this['list'+col].length;
              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
                player_count: teamSize /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
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

        // console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople);

        if(event.removed.element.Person.minor == "yes"){

          axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+updateNullOnReservationPeople,{
            session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
          })
          .then(response => {

          })
          .catch(function (error) {
            console.log(error);
          });

          /** this will get the team player session id using person_id and session_id then delete using axios.post **/
          var draggedPlayerId = event.removed.element.Person.player_id;
          var draggedMinorId = event.removed.element.Person.person_id;
          var sessionId = this['list'+col+'sessionid'];

          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/player_minor/'+draggedMinorId+'/session/'+sessionId,{

          })
          .then(response => {
            var teamPlayerId = response.data[0].id;

            axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

            })
            .then(response =>{
              console.log('deleted');
              console.log(response);
            })
            .catch(function(error){
              console.log(error);
            })

            /** this will get teamSize value for listNumber and update on session id **/
            var teamSize = this['list'+col].length;

            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
              player_count: teamSize /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
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

        else{

          axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+updateNullOnReservationPeople,{
            session_id: '0' /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
          })
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          /** end of reservation-people update for SESSION_ID **/

          /** this will get the team player session id using person_id and session_id then delete using axios.post **/
          var draggedPlayerId = event.removed.element.person_id;
          var sessionId = this['list'+col+'sessionid'];
          
          axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+draggedPlayerId+'/session/'+sessionId,{

          })
          .then(response =>{
            console.log(response);

            var teamPlayerId = response.data[0].id;

            axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamPlayerId,{

            })
            .then(response =>{
              console.log('deleted');
              console.log(response);
            })
            .catch(function(error){
              console.log(error);
            })

            /** this will get teamSize value for listNumber and update on session id **/
            var teamSize = this['list'+col].length;
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdDragged,{
              player_count: teamSize /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
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

        }

        // let removed = myFish.splice(3, 1)

      }

    // } /** end of if for loop **/



    // else{
    //   console.log(" DRAGGED PLAYER NAME WAS NOT NULL");
    // }

    

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

  onDropPlayer(event,col){
    console.log('inside drop player function');
    console.log('column value was '+col);
    console.log(event);
    console.log("INDEX VALUE "+event.newIndex);
    console.log(this["teamName"+col].length);

    if(this["teamName"+col].length > '2'){

      var teamName = this["teamName"+col];
      var teamNameId = this["teamIdSide"+col];
      var draggedReservationId = this["list"+col][event.newIndex].reservation_id;

      if(event.newIndex == '0'){ /** team name check value and update on session id **/
        console.log('team name created');

        axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
        // name: teamName
      })
        .then(response => {
          // console.log(response);
          this["teamname"+col+"id"] = response.data;
          this["teamIdSide"+col] = response.data[0].id; /** this defines the team name id **/
          console.log('team name id was '+this["teamIdSide"+col]);
        })
        .catch(error => {
          console.log(error);
        });


        if(this["list"+col][event.newIndex].Person.minorsymbol == "M"){
          var reservationid = this["list"+col][event.newIndex].Person.reservation_id;
        }
        else{
          var reservationid = this["list"+col][event.newIndex].reservation_id; 
        }


        axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationid)
        .then(response => {
          console.log('received the reservation detail by id');
          console.log(response);
          // console.log(this["selected"+col]);
          this["selected"+col] = response.data.mission_id; /** made changes here at 06/17/2021, it used to be above line code **/
          var reservationMissionId = response.data.mission_id;
        })
        .catch(error => {
          console.log(error);
        });


      } /** end of team name check value **/

      console.log('team name not created');
      console.log('team name id was '+this["teamIdSide"+col]);

      /** check if the dragged player is minor or adult **/
      if(this["list"+col][event.newIndex].Person.minorsymbol == "M"){
        var playerWas = 'minor';
        var selectedReservationId = this["list"+col][event.newIndex].Person.reservation_id;
      }
      else{
        playerWas = 'adult';
        selectedReservationId = this["list"+col][event.newIndex].reservation_id;
      }
      /** end of check for adult player and minor **/

      console.log('player was '+playerWas);
      this.updateSessionTable(event.newIndex,col,this["teamIdSide"+col],playerWas,this["selected"+col],selectedReservationId);



    } /** if closed after teamName has been checked **/
    else{
      console.log('Please write down the team name or team name should be more than 3 characters');
      this['list'+col] = [];
      this.onDragBackReservation(); /** this will refresh the dragged player on the reservation right section **/
      this.$bvModal.show('modal-checkTeamName');
    }

  },

  closeCheckTeamName(){
    this.$bvModal.hide('modal-checkTeamName');
    // window.location.reload(true);
  },

  updateSessionTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId){
    console.log('updateSessionTable / dragged index was '+draggedIndex);
    console.log('updateSessionTable / column id was '+col);
    console.log('updateSessionTable / team id was '+teamId);
    console.log('updateSessionTable / player was '+playerWas);

    /** check if the mission is empty **/
    if(missionId == '' || missionId == undefined || missionId == null){
      console.log('updateSessionTable / check mission id for session table');
      missionId = '1';
    }
    /** closed the mission id value **/

    console.log('updateSessionTable / mission id was '+missionId);
    
    /** check the route id **/
    if (col%2 == 0){
      var routeId = 1;
    }
    else{
      var routeId = 2;
    }
    /** end of check for the route id **/
    console.log('updateSessionTable / route id was '+routeId);

    console.log('updateSessionTable / selected reservation id was '+selectedReservationId);

    var sessionDateTime = this["sessionRow"+col+"DateTime"];

    console.log('updateSessionTable / session date time was '+sessionDateTime);

    console.log('updateSessionTable / player length was '+this["list"+col].length);

    console.log('updateSessionTable / location id was '+process.env.VUE_APP_LOCATION_ID);

    console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+selectedReservationId+'/team/'+teamId+'/route/'+routeId);

    axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+selectedReservationId+'/team/'+teamId+'/route/'+routeId,{
      team_id: teamId,
      route_id: routeId,
      mission_id: missionId,
      session_time: this["sessionRow"+col+"DateTime"],
      location_id: process.env.VUE_APP_LOCATION_ID, /** this fethces the location id from .env file **/
      // player_count: this["list"+col].length
    })
    .then(response => {
      console.log(response.data);

      this.list2sessionid = response.data[0].id; /** this pass session id to list2sessionid **/
      this["list"+col+"sessionid"] = response.data[0].id;
      this.playerSessionDetail2 = response.data[0].id;

      var fetchSessionId = response.data[0].id;

      this.updateTPSTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId);

    })
    .catch(error => {
      console.log(error);
    });

  },

  updateTPSTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId){

    console.log('updateTPSTable / dragged index was '+draggedIndex);
    console.log('updateTPSTable / column id was '+col);
    console.log('updateTPSTable / team id was '+teamId);
    console.log('updateTPSTable / player was '+playerWas);

    console.log('updateTPSTable / mission id was '+missionId);
    
    // console.log('updateTPSTable / route id was '+routeId);

    console.log('updateTPSTable / selected reservation id was '+selectedReservationId);

    console.log('updateTPSTable / player length was '+this["list"+col].length);

    if(playerWas == 'adult'){
      var playerId = this['list'+col][draggedIndex].Person.Player.id;
      var reservationPeopleOrMinorId = this['list'+col][draggedIndex].id;

      console.log('updateTPSTable / player was adult');
      console.log('updateTPSTable / player id was '+this['list'+col][draggedIndex].Person.Player.id);
      console.log('updateTPSTable / people id was '+this['list'+col][draggedIndex].Person.id);
      console.log('updateTPSTable / reservation people id was '+this['list'+col][draggedIndex].id);

      this.updatePlayerTpsTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId);
    }
    else{
      var reservationPeopleOrMinorId = this['list'+col][draggedIndex].Person.Player.id;
      var playerMinorId = this['list'+col][draggedIndex].Person.person_id;
      playerId = this['list'+col][draggedIndex].Person.player_id; /** adult player id **/
      console.log('updateTPSTable / player was minor');
      console.log('updateTPSTable / reseravtion minor id was '+reservationPeopleOrMinorId);
      console.log('updateTPSTable / player minor id was '+playerMinorId);
      console.log('updateTPSTable / player id was '+playerId);

      console.log('updateTPSTable / dragged index was '+draggedIndex);

      this.updatePlayerMinorTpsTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId,playerMinorId);

    }


  },

  updatePlayerTpsTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId){
    console.log('updatePlayerTpsTable / draggedIndex was '+draggedIndex);
    console.log('updatePlayerTpsTable / col was '+col);
    console.log('updatePlayerTpsTable / teamId was '+teamId);
    console.log('updatePlayerTpsTable / playerWas was '+playerWas);
    console.log('updatePlayerTpsTable / missionId was '+missionId);
    console.log('updatePlayerTpsTable / selectedReservationId was '+selectedReservationId);
    console.log('updatePlayerTpsTable / fetchSessionId was '+fetchSessionId);
    console.log('updatePlayerTpsTable / playerId was '+playerId);
    console.log('updatePlayerTpsTable / reservationPeopleOrMinorId was '+reservationPeopleOrMinorId);

    axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/session/'+fetchSessionId,{
      team_id: teamId,
      reservation_id: selectedReservationId,
      player_id: playerId /** player id as player_id dont get added from endpoint at the top **/
    })
    .then(response => {
      console.log(response.data);

      this["tolist"+col+"teamplayersessionid"] = response.data[0].id;
      if (this["tolist"+col+"teamplayersessionid"] > 0) { 
        this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
      }


      /** this part will update reservation time , onboarded time and created time if dragged minor **/
      var getResId = response.data[0].reservation_id;
      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId);
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId,{

      })
      .then(response => {
        console.log(response);
        var newValue = 1+(col-10);
        this['xolaReservationTime'+newValue] = moment(response.data.reservation_for).format("h:mm A"); /** this passes the value for XOLA RESERVATiON time **/
        console.log('xola reservation time was '+this['xolaReservationTime'+newValue]);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+response.data[0].id,{

      })
      .then(response => {
        console.log(response);
        var newValue = 1+(col-10);
        // console.log(newValue);
        this['onboardedTime'+newValue] = moment(response.data.updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
        this['onboardedCreatedTime'+newValue] = moment(response.data.createdAt).format("h:mm A"); /** this passes the value for created time **/

      })
      .catch(error => {
        console.log(error);
      });
      /** END of reservation time , onboarded time and created time **/


      this.updateReservationPeopleTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId);


    })
    .catch(error => {
      console.log(error);
    });

  },


  updatePlayerMinorTpsTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId,playerMinorId){
    console.log('updatePlayerMinorTpsTable / draggedIndex was '+draggedIndex);
    console.log('updatePlayerMinorTpsTable / col was '+col);
    console.log('updatePlayerMinorTpsTable / teamId was '+teamId);
    console.log('updatePlayerMinorTpsTable / playerWas was '+playerWas);
    console.log('updatePlayerMinorTpsTable / missionId was '+missionId);
    console.log('updatePlayerMinorTpsTable / selectedReservationId was '+selectedReservationId);
    console.log('updatePlayerMinorTpsTable / fetchSessionId was '+fetchSessionId);
    console.log('updatePlayerMinorTpsTable / playerId was '+playerId);
    console.log('updatePlayerMinorTpsTable / reservationPeopleOrMinorId was '+reservationPeopleOrMinorId);
    console.log('updatePlayerMinorTpsTable / playerMinorId was '+playerMinorId);


    axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+playerMinorId+'/session/'+fetchSessionId,{
      team_id: teamId,
      reservation_id: selectedReservationId,
      player_id: playerId,
      player_minor_id: playerMinorId
    })
    .then(response => {
      console.log(response.data);

      this["tolist"+col+"teamplayersessionid"] = response.data[0].id;
      if (this["tolist"+col+"teamplayersessionid"] > 0) { 
        this["list"+col+"teamplayersessionid"].push(this["tolist"+col+"teamplayersessionid"]);
      }


      /** this part will update reservation time , onboarded time and created time if dragged minor **/
      var getResId = response.data[0].reservation_id;
      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId);
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId,{

      })
      .then(response => {
        console.log(response);
        var newValue = 1+(col-10);
        this['xolaReservationTime'+newValue] = moment(response.data.reservation_for).format("h:mm A"); /** this passes the value for XOLA RESERVATiON time **/
      })
      .catch(error => {
        console.log(error);
      });

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+response.data[0].id,{

      })
      .then(response => {
        console.log(response);
        var newValue = 1+(col-10);
        // console.log(newValue);
        this['onboardedTime'+newValue] = moment(response.data.updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
        this['onboardedCreatedTime'+newValue] = moment(response.data.createdAt).format("h:mm A"); /** this passes the value for created time **/

      })
      .catch(error => {
        console.log(error);
      });
      /** END of reservation time , onboarded time and created time **/

      this.updateReservationMinorTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId,playerMinorId);

    })
    .catch(error => {
      console.log(error);
    });


  },

  updateReservationPeopleTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId){
    console.log('inside reservation people table function');

    console.log('updateReservationPeopleTable / draggedIndex was '+draggedIndex);
    console.log('updateReservationPeopleTable / col was '+col);
    console.log('updateReservationPeopleTable / teamId was '+teamId);
    console.log('updateReservationPeopleTable / playerWas was '+playerWas);
    console.log('updateReservationPeopleTable / missionId was '+missionId);
    console.log('updateReservationPeopleTable / selectedReservationId was '+selectedReservationId);
    console.log('updateReservationPeopleTable / fetchSessionId was '+fetchSessionId);
    console.log('updateReservationPeopleTable / playerId was '+playerId);
    console.log('updateReservationPeopleTable / reservationPeopleOrMinorId was '+reservationPeopleOrMinorId);


    axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationPeopleOrMinorId,{
      session_id: fetchSessionId
    })
    .then(response => {
      console.log(response);
      console.log('updateReservationPeopleTable / session id update on reservation people table');
      this.updateSessionPlayerCount(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId);
    })
    .catch(function (error) {
      console.log(error);
    });

  },

  updateReservationMinorTable(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId,playerMinorId){
    console.log('inside reservation minor function');

    console.log('updateReservationMinorTable / draggedIndex was '+draggedIndex);
    console.log('updateReservationMinorTable / col was '+col);
    console.log('updateReservationMinorTable / teamId was '+teamId);
    console.log('updateReservationMinorTable / playerWas was '+playerWas);
    console.log('updateReservationMinorTable / missionId was '+missionId);
    console.log('updateReservationMinorTable / selectedReservationId was '+selectedReservationId);
    console.log('updateReservationMinorTable / fetchSessionId was '+fetchSessionId);
    console.log('updateReservationMinorTable / playerId was '+playerId);
    console.log('updateReservationMinorTable / reservationPeopleOrMinorId was '+reservationPeopleOrMinorId);
    console.log('updateReservationMinorTable / playerMinorId was '+playerMinorId);

    axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationPeopleOrMinorId,{
      session_id: fetchSessionId 
    })
    .then(response => {
      console.log(response);
      console.log('updateReservationMinorTable / session id update on reservation minor table');
      this.updateSessionPlayerCount(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId);
    })
    .catch(function (error) {
      console.log(error);
    });

  },

  updateSessionPlayerCount(draggedIndex,col,teamId,playerWas,missionId,selectedReservationId,fetchSessionId,playerId,reservationPeopleOrMinorId){

    console.log('inside session player count function');

    console.log('updateSessionPlayerCount / draggedIndex was '+draggedIndex);
    console.log('updateSessionPlayerCount / col was '+col);
    console.log('updateSessionPlayerCount / teamId was '+teamId);
    console.log('updateSessionPlayerCount / playerWas was '+playerWas);
    console.log('updateSessionPlayerCount / missionId was '+missionId);
    console.log('updateSessionPlayerCount / selectedReservationId was '+selectedReservationId);
    console.log('updateSessionPlayerCount / fetchSessionId was '+fetchSessionId);
    console.log('updateSessionPlayerCount / playerId was '+playerId);
    console.log('updateSessionPlayerCount / reservationPeopleOrMinorId was '+reservationPeopleOrMinorId);

    var totalPlayerCount = this['list'+col].length;

    axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+fetchSessionId,{
      player_count: totalPlayerCount
    })
    .then(response => {
      console.log(response);
      console.log('Succesfully dragged a player into the box');
      var columnDefined = 1+(col-10);
      this['playersAdded'+columnDefined] = totalPlayerCount;
      // this.playersAdded1 = totalPlayerCount;
    })
    .catch(function (error) {
      console.log(error);
    });

  },

  // onDrop for Team Name 1 table it will post to session table and team_player_session table
  onDrop1(event, col){

    console.log("INDEX VALUE "+event.newIndex);
    console.log(col);
    console.log(event);
    var index = event.newIndex;
    console.log(index);


    /** this will derrived value to drag and drop **/
    var listPlayerSize = this['list'+col].length;
    console.log(listPlayerSize);
    var playerValue = col-9;
    this['playersAdded'+playerValue] = listPlayerSize;
    /** end of derrived value for player number **/


    if(this['list'+col].length < 7){ /** later on change this to '5' so that it will disable for 6 players **/

      console.log('Insert Player');
    console.log(this["teamName"+col]);

      /** this part code will insert player until its less than 7 ** /
      
      var teamName = this["teamName"+col];
    var teamNameId = this["teamIdSide"+col];

    console.log(teamName);
    console.log(teamNameId);

    this["disableButton"+col] = false;

    console.log('Team name length '+this["teamName"+col]);

    **/

    if(this["teamName"+col] == ''){
      console.log('YES EMPTY');
      var newTeamValue = col-9;
      console.log(newTeamValue);
      this["teamName"+col] = 'TEAM NAME '+newTeamValue;
    }
    else{
      console.log('NOT EMPTY');
      console.log(this['teamName'+col]);
    }

    /** this if and ELSE statement is for the TEAM NAME update before and after dropping player name **/
    if(this["teamName"+col].length > 1){

      // console.log("/pop op o po po ");

      var teamName = this["teamName"+col];
      var teamNameId = this["teamIdSide"+col];

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
      //   console.log(response);sss
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      
      axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
        // name: teamName
      })
      .then(response => {
        console.log(response);

        this["teamname"+col+"id"] = response.data;
        // this["teamIdSide"+col]teamIdSideA1 = response.data[0].id;
        this["teamIdSide"+col] = response.data[0].id;
        console.log(this["teamIdSide"+col]);

        /** delete the code below **/

        // var missionid = this.teamByTime2[0].mission_id;
        // console.log('using mission id value as '+missionid);

        // console.log(this.teamByTime2[0].mission_id);

        var countondrop = this["onDrop"+col+"FunctionLoaded"]++;
        console.log(countondrop);

        console.log("below is the dragged id as person id");
        console.log(this["list"+col][countondrop]);

        if(this["list"+col][countondrop].Person.Player == null){
          console.log('load the function here');
          this.checkPlayerIdFunction();
        }

        // console.log('mission id mission id mission id was '+this.missions[missionid].id);
        // console.log('mission name mission name mission name was '+this.missions[missionid].name);
        // console.log('actual mission id mission id was '+missionid+ ' as in our database it starts at 0');

        // this["selected"+col] = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        // console.log(this["selected"+col]);

    // var draggedPlayerId = this.list2[this.list2.length - 1].id; /* this will always select the last player id dragged */
    var listLength = this["list"+col].length;
    console.log(index);

    var newIndex = index;
    console.log(newIndex);

    console.log(this["list"+col][newIndex]);
    // console.log(listLength);

    /************* DRAGGED PLAYER ID MIGHT MESS UP FOR *********************************** MINORS ***********************/

    console.log("DRAGGED INDEX "+newIndex);
    console.log(this["list"+col]);
    console.log(this["list"+col][newIndex]);

    var draggedPlayerId = this["list"+col][index].Person.Player.id; /* this will always select the last player id dragged */
    console.log(draggedPlayerId);

    if(this["list"+col][newIndex].Person.minorsymbol == "M"){
      var reservationid = this["list"+col][newIndex].Person.reservation_id;
    }
    else{
      var reservationid = this["list"+col][newIndex].reservation_id; 
    }

    console.log("RESERVATION ID "+reservationid);

    // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationid);

    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationid)
    .then(response => {
      console.log('received the reservation detail by id');
      console.log(response);
        // console.log(this["selected"+col]);
        this["selected"+col] = response.data.mission_id; /** made changes here at 06/17/2021, it used to be above line code **/
      })
    .catch(error => {
      console.log(error);
    });

    // var teamId = this.teamname1id[0].id;
    
    console.log(col);
    console.log(this.teamname11id);
    console.log(this["teamname"+col+"id"]);

    var teamId = this["teamname"+col+"id"][0].id;

    if(this["teamName"+col] == ''){
      console.log('UNDEFINED');

    }
    else{
      console.log('DEFINED');
    }

    // if(this["teamname"+col+"id"][0].id == 'undefined'){
    //   console.log('YES UNDEFINED');
    // }
    // else{
    //   console.log('DEFINED TEAM NAME');
    // }

    console.log(teamId);

    /**** if BOX even then 1 or else 2 **/
    if (col%2 == 0){
      var routeId = 1;
    }
    else{
      var routeId = 2;
    }

    console.log("ROUTE ID ==== "+routeId);

    var reservationIdForSessionUpdate = this["list"+col][index].id;
    console.log(reservationIdForSessionUpdate);

    console.log(reservationid);

    // console.log(reservationid);

    /** statement that checks if the dragged item is MONOR or NOT **/

    console.log(this["list"+col][countondrop].Person.minor);

    if(this["list"+col][countondrop].Person.minor == 'yes'){ /** check if its MINOR or NOT **/

      var peopleidused = this["list"+col][index].person_id;

      console.log('YES MINOR');
        // console.log(this.list2[countondrop2].Person.Player.id);
        // console.log(this.list2[countondrop2].Person.player_id);
        console.log(countondrop);
        console.log(peopleidused);

        var draggedPlayerIdMinor = this["list"+col][index].Person.player_id;

        // var id_of_player = draggedPlayerId;

        // console.log(this.list2[0].Person.player_id);
        // console.log(id_of_player);

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
                player_count: listLength /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });

              // console.log('grab mission id as '+this["selected"+col]);
              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                mission_id: this["selected"+col]
              })
              .then(response => {
                console.log("Update mission value as "+this["selected"+col]+" using session ID as "+sessionIdInserted+ " for minors");
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
                  // player_minor_id: minor_id,
                  // reservation_id: id_of_reservation
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

                console.log("1st team player session");

                  // console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerIdMinor+'/player_minor_id/'peopleidused+'/session/'+sessionIdInserted);

                  axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerIdMinor+'/player_minor/'+peopleidused+'/session/'+sessionIdInserted,{
                  // session_id: sessionIdInserted,
                  team_id: teamId,
                  // player_id: id_of_player,
                  player_minor_id: peopleidused,
                  reservation_id: id_of_reservation
                })
                  .then(response => {

                    /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                    /* multiple objects is passed to array called list2teamplayersession*/
                    console.log("inside solti");
                    console.log(response);

                    /** this part will update reservation time , onboarded time and created time if dragged minor **/
                    var getResId = response.data[0].reservation_id;

                    console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId);
                    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId,{

                    })
                    .then(response => {
                      console.log(response);
                      var newValue = 1+(col-10);
                      this['xolaReservationTime'+newValue] = moment(response.data.reservation_for).format("h:mm A"); /** this passes the value for XOLA RESERVATiON time **/
                    })
                    .catch(error => {
                      console.log(error);
                    });


                    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+response.data[0].id,{

                    })
                    .then(response => {
                      console.log(response);
                      var newValue = 1+(col-10);
                      console.log(newValue);
                      this['onboardedTime'+newValue] = moment(response.data.updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
                      this['onboardedCreatedTime'+newValue] = moment(response.data.createdAt).format("h:mm A"); /** this passes the value for created time **/

                    })
                    .catch(error => {
                      console.log(error);
                    });

                    /** END of reservation time , onboarded time and created time **/



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

  var peopleidused = this["list"+col][index].person_id;

  console.log('YES MINOR 2');
          // console.log(this.list2[countondrop2].Person.Player.id);
          // console.log(this.list2[countondrop2].Person.player_id);
          console.log(countondrop);
          console.log(peopleidused);

          var draggedPlayerIdMinor = this["list"+col][index].Person.player_id;

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
            player_count: listLength /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
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
                  // player_minor_id: minor_id,
                  // reservation_id: id_of_reservation
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

            console.log("2nd team player session");
            console.log("draggedPlayerIdMinor "+ draggedPlayerIdMinor);
            console.log("minor id "+ minor_id);



            if(this["list"+col][index].Person.minor == "yes"){
              console.log("2nd TPS , its minor");
              var draggedPlayerId = this["list"+col][index].Person.player_id; /** this will change the minor updates **/

              console.log("dragged player id "+draggedPlayerId);
              console.log("people id used "+peopleidused);

              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/player_minor/'+peopleidused+'/session/'+sessionIdInserted,{
                    // session_id: sessionIdInserted,
                    team_id: teamId,
                    player_minor_id: peopleidused,
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


              axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate,{
                session_id: sessionIdInserted, /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      // player_minor_id: peopleidused,
                      // reservation_id: id_of_reservation
                    })
              .then(response => {
                console.log("INSERTED MINOR VALUE");
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

            }

            else{
              console.log("2nd TPS , Not minor");

              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                    // session_id: sessionIdInserted,
                    team_id: teamId,
                    // player_id: peopleidused,
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

              /** this will update the reservation_people **/
              var reservation_people_id = this["list"+col][index].id;
              console.log("WALA WALA WALA 34");
              console.log(reservation_people_id);

              axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_people_id,{
                session_id: sessionIdInserted /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of reservation-people update for SESSION_ID **/

            }


            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
              player_count: listLength /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

            })
            .catch(function (error) {
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


        var peopleidused = this["list"+col][index].Person.Player.id;
        console.log(peopleidused);

        if(peopleidused > '0'){
          console.log('player id was greater than 0');


          if(teamId > 0){

            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            var sessionDateTime = this["sessionRow"+col+"DateTime"];
            console.log("SESSION DATE TIME "+sessionDateTime);

            if(!this["list"+col+"sessionid"] > '0' ){

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

                var getResId = response.data[0].reservation_id;

                console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId);
                axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+getResId,{

                })
                .then(response => {
                  console.log(response);
                  var newValue = 1+(col-10);
                  this['xolaReservationTime'+newValue] = moment(response.data.reservation_for).format("h:mm A"); /** this passes the value for XOLA RESERVATiON time **/
                })
                .catch(error => {
                  console.log(error);
                });


                axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+response.data[0].id,{

                })
                .then(response => {
                  console.log(response);
                  var newValue = 1+(col-10);
                  console.log(newValue);
                  this['onboardedTime'+newValue] = moment(response.data.updatedAt).format("h:mm A"); /** this passes the value for onboarded time **/
                  this['onboardedCreatedTime'+newValue] = moment(response.data.createdAt).format("h:mm A"); /** this passes the value for created time **/

                })
                .catch(error => {
                  console.log(error);
                });


                /** checks the session id and post again using axios.post for team player session table **/
                if(sessionIdInserted > 0){

                  console.log("3rd team player session");

                  axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                      team_id: teamId,
                      // player_id: peopleidused,
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

                  console.log("RESERVARION ID UPDATE "+reservationIdForSessionUpdate);


                  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                    player_count: listLength /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {
                    console.log("Inside 3rd team player sessions update on sessions");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                  console.log('grab mission id as '+this["selected"+col]);

                  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                    mission_id: this["selected"+col]
                  })
                  .then(response => {
                    console.log("Update mission value as "+this["selected"+col]+" using session ID as "+sessionIdInserted);
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
                    console.log("Update 3rd TPS on reservation people");
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

    console.log("4th team player session");

    if(this["list"+col][index].Person.minor == "yes"){
      console.log("4th TPS , its minor");
      var draggedPlayerId = this["list"+col][index].Person.player_id; /** this will change the minor updates **/
      var draggedMinorId = this["list"+col][index].person_id;
                    // var draggedMinorId = this["list"+col][countondrop].person_id;

                    console.log("dragged player id "+draggedPlayerId);
                    console.log("minor id used "+draggedMinorId);

                    axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/player_minor/'+draggedMinorId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                      team_id: teamId,
                      // player_minor_id: draggedMinorId,
                      // reservation_id: id_of_reservation
                      reservation_id: reservationid
                    })
                    .then(response => {

                      console.log(response.data);
                      // console.log(reservationid);

                      // var reservationMinorId = response.data.id;
                      console.log("RESERVATION MINOR ID "+reservationIdForSessionUpdate);

                      axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationIdForSessionUpdate,{
                        session_id: sessionIdInserted, /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                          // player_minor_id: peopleidused,
                          // reservation_id: id_of_reservation
                        })
                      .then(response => {
                        console.log("INSERTED MINOR VALUE");
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                      /** the above code will update reservation_minor data with session **/

                      // axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservationMinorId,{
                      //   session_id: sessionIdInserted /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                      // })
                      // .then(response => {
                      //   console.log("Update 4th TPS on reservation minor table");
                      // })
                      // .catch(function (error) {
                      //   console.log(error);
                      // });

                      /** END of updating reservation_minor session update **/


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

                  else{
                    console.log("4th TPS , Not minor");

                    axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                      // session_id: sessionIdInserted,
                      team_id: teamId,
                      // player_id: peopleidused,
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

                    /** this will update the reservation_people **/

                    console.log("WALA WALA WALA");
                    console.log("reservation id for session update "+reservationIdForSessionUpdate);
                    console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationIdForSessionUpdate);

                    axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservationIdForSessionUpdate,{
                      session_id: sessionIdInserted /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                    })
                    .then(response => {
                      console.log(response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                    /** end of reservation-people update for SESSION_ID **/

                  }

                  axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                    player_count: listLength /** countondrop is length of an array so if its 0 by adding it 1 it will be 1 **/
                  })
                  .then(response => {

                  })
                  .catch(function (error) {
                    console.log(error);
                  });


                }
                /** ends axios post on team player sessions **/

              }


            }



          } /** end of id for player id check **/
          else{
            console.log('player id was not greater than 0');
            this.$bvModal.show('modal-checkPlayerId');

          }





        }


        /** till here **/

      })
.catch(function (error) {
  console.log('player id was not greater than 0');  
  console.log(error);
  // this.$root.$emit('bv::show::modal', 'modal-checkPlayerId', '#btnShow');
  // this.$bvModal.show('modal-checkPlayerId');
});

} /** END of insert code for LESS THAN 7 **/

}/** end of if for this['list'+col].length < 7 **/

/** if the drag more than 6 player on same box it will ignore by this ELSE and reload the div for reservation **/
else{
  console.log('Wont Insert Player');
  this.reloadPageEvent();
}

/** end of MINOR CHECK STATEMENT **/
},

checkPlayerIdFunction(){
  console.log('inside check player id function');
  this.$bvModal.show('modal-checkPlayerId');
},

reloadPageEvent: function(){
  console.log("INSIDE RELOAD FUNCTION");
  window.location.reload(true);
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
      console.log(col);

      console.log(this['fetchPlayerList'+boxObjectId]);

      /** this will enable the button **/
      if(col < 10){

        var newCol = 10+col;

        console.log('inside');

        if(this['fetchPlayerList'+boxObjectId][1].Team_player_sessions.length > '5'){
          console.log(newCol);
          console.log('Dont Insert player');
          this.reloadPageEvent();
        }

        else{
          console.log('Insert Player');

          /** below code will update PLAYERS ADDED text **/
          var playerValue = 1+col;
          this['playersAdded'+playerValue] = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions.length;
          /** end of PLAYERS ADDED text **/


          /** the below code will insert the player value if its less than 6 players **/

          var countLastPlayerDragged = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions.length;
          console.log(countLastPlayerDragged);

        // console.log(this['fetchPlayerList'+boxObjectId].Team_player_sessions[countLastPlayerDragged]);

        // var lastPlayerDraggedId = this['fetchPlayerList'+boxObjectId].Team_player_sessions[countLastPlayerDragged].Person.Player.id;
        // console.log(lastPlayerDraggedId);

        var sessionIdAfterReload1 = this['fetchPlayerList'+boxObjectId][1].id; /** this is the session id **/
        console.log(sessionIdAfterReload1);

        var newIndex = event.newIndex;

        var checkReservationId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].reservation_id;
        console.log(checkReservationId);

        var teamIdFetched = this['fetchPlayerList'+boxObjectId][1].team_id;
        console.log(teamIdFetched);

        var reservationIdToUpdateSession = this['fetchPlayerList'+boxObjectId][1].reservation_id;
        console.log(reservationIdToUpdateSession);

        console.log("used the drag event");
        // console.log(event);
        console.log(this.onDrop1FunctionLoaded);
        console.log(this['fetchPlayerList'+boxObjectId][1].mission_id);
        console.log(this['fetchPlayerList'+boxObjectId][1].reservation_id);
        console.log(this['fetchPlayerList'+boxObjectId][1].team_id);
        console.log(this['fetchPlayerList'+boxObjectId][1].route_id);
        console.log(this['fetchPlayerList'+boxObjectId][1].team_vs_team_id);
        console.log(this['fetchPlayerList'+boxObjectId][1].id);

        var checkIfMinor = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.minor;
        console.log(checkIfMinor);

        if(checkIfMinor == "yes"){
          console.log(" 09 ");
          var lastPlayerDraggedId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.Player.id;
          console.log(lastPlayerDraggedId);

          console.log(lastPlayerDraggedId);

          var checkPlayerIdforMinor = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.player_id;
          console.log(checkPlayerIdforMinor);

          var checkDraggedMinorId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.person_id;
          console.log(checkDraggedMinorId);

          var checkReservationMinorId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].id;
          console.log(checkReservationMinorId);

          var checkMReservationId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.reservation_id;
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

                // this['fetchPlayerList'+boxObjectId].push(this['fetchPlayerList'+boxObjectId][countLastPlayerDragged].team_player_session_id);


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
                     // player_count: totalPlayer+1
                     player_count: countLastPlayerDragged
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

            var lastPlayerDraggedId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].Person.Player.id;
            console.log(lastPlayerDraggedId);

            var checkReservationPlayerId = this['fetchPlayerList'+boxObjectId][1].Team_player_sessions[newIndex].id;

            console.log(checkReservationPlayerId);

            axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
              team_id: teamIdFetched,
              player_id: lastPlayerDraggedId,
              session_id: sessionIdAfterReload1,
              reservation_id: checkReservationId
            })
            .then(response => {

              console.log(response.data);

              console.log("LA YO HO HAI COUNT"+newIndex);

              var team_player_session_id = response.data.id;
              console.log(team_player_session_id);

              this.tolist2TPSafterReload = response.data.id;

              if (this.tolist2TPSafterReload > 0) { 
                this.list2TPSafterReload.push(this.tolist2TPSafterReload);
                console.log("LA YO HO HAI COUNT"+newIndex);
              }

                    // this['fetchPlayerList'+boxObjectId].push(this['fetchPlayerList'+boxObjectId][newIndex].team_player_session_id);


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
                     // player_count: totalPlayer+1
                     player_count: countLastPlayerDragged
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

          /** end of add player for less than 6 **/
        }

      } /** end of if clause for checkMove update **/


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

    console.log(getSessionId);

    if(getSessionId == undefined || !getSessionId > '0'){
      console.log(' YES undefined');
      var newColValue = colvalue-10;
      console.log('new col value for session id '+ newColValue);
      var getSessionId = this['fetchPlayerList'+newColValue][1].id;
      console.log(getSessionId);
    }
    else{
      console.log('Defined');
    }

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

  // submitFirstNameList(){

  //   var teamname = this.teamName10;

  //   axios.post(process.env.VUE_APP_DATABASE_TEAMS,{
  //   name: this.teamName10,
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })

  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   var filterPlayerId1 = this.lastTeamIdOne[0];
  //   var lastTeamId = filterPlayerId1['id'];

  //   /** starting of axios post for SESSION TABLE **/
  //   axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
  //     mission_id: this.selected1,
  //     team_id: lastTeamId + 1
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })

  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   /** end of session table post **/

  //   var arr = this.list2;

  //   for(var i=0; i < arr.length; i++){

  //     var teamId = lastTeamId + 1;
  //     var playerId = arr[i]['id'];

  //     axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{

  //       team_id: lastTeamId + 1,
  //       player_id: arr[i]['id'],
  //       rfid_id: arr[i]['rfidState1']

  //     });
  //   }
  // },


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
  width: auto;
  background-color: yellow;
}

.myBoxValue{
  height: 440px;
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

.capitalLetters{
  text-transform: capitalize;
}

.playerModalText{
  margin-left: 5%;
}

.checkMoveEditIcon{
  margin-left: -1.7%; margin-top: 1.4%; color: #2c3e50;
}

.disableBox{
  /*background-color: yellow;*/
  pointer-events: none; /** this will disable the box to be disabled **/
  background-image: url('../src/assets/lock8.png');
  background-repeat: no-repeat;
  height: auto;
  width: auto;
  /*background-color: grey;*/
}

.previousDivColor{
  background-color: #90ee90;
  /*margin-top: -2% !important;*/
  /*color: yellow;*/
}

.specialCharacters{
  font-size: 0.9em;
  color:red;
  font-style:italic;
}

.btn-group .list-group-item{
  display: none;
  background-color: yellow !important;
}


</style>
