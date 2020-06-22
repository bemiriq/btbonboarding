<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <input type="text" placeholder="input field for RFID reader" @blur="focusOutPostRfid" :value=""/> -->
    <!-- <input type="text"/> -->

    <div class="bv-example-row" id="mainContainer">

      <b-row>

        <!-- list for all rfid b-modal -->

        <!-- <b-modal id="modal-center" ref="sideArfidModalUpdate" centered title="Side A" v-bind:hide-footer="true"> -->
        <b-modal id="modal-center" ref="sideArfidModalUpdate" centered v-bind:hide-footer="true">
                            <b><p>Side A {{dateTime1Data}}</p></b>
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <div v-for="(listings, index) in list2" :key="index">
                                    <br/>
                                    <b-row>
                                      <b-col>
                                        <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>
                                        <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                      </b-col>
                                      <b-col>
                                        <b-form-input v-model="listings.rfidState1" ref="todos" v-on:change="posttorfidapi($event, index)" :style="listings.rfidState1 ? { 'background-color': '#33FF90' } : null"></b-form-input>
                                      <!-- <b-form-input v-model="listings.rfidState1" v-on:blur="focusOutPostRfid" placeholder="San 99"></b-form-input> -->
                                      </b-col>
                                    </b-row>
                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClicked(); updateRfid();">COMPLETE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                              <!-- this displays the fetch data from mounted -->
                              <b-row class="my-1">
                                <b-col sm="12">
                                  <div class="list-group-item item" v-for="teamfetch in toListFetchRouteA1" :key="teamfetch.id">
                                    <div v-for="personame in teamfetch.Team_player_sessions" :key="personame.id">

                                      <b-form-input id="input-live" :value="personame.Player.Person.first_name +' '+personame.Player.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>

                                      <b-form-input style="background-color:#33FF90" v-model="personame.Rfid.tag">{{personame.Rfid.tag}}</b-form-input>
                                      <input type="text" disabled :value="personame.Rfid.id" style="display: none;"/>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->


                            </b-modal>

        <!-- end oof b-modal for rfid list -->


        <!-- sibe B 1 .. rfid update -->

                <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered v-bind:hide-footer="true">
                            <b><p>{{teamName2}} on Side B for {{dataTime1BData}}</p></b>
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <div v-for="(listings, index) in list4" :key="index">
                                    <br/>
                                    <b-row>
                                      <b-col sm="6">
                                        <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" placeholder="PLAYER NAME" disabled></b-form-input>
                                        <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                      </b-col>
                                      <b-col sm="6">
                                        <b-form-input v-model="listings.rfidState2" ref="todos2" v-on:change="posttorfidapi2($event, index)" :style="listings.rfidState2 ? { 'background-color': '#33FF90' } : null"></b-form-input>
                                      </b-col>
                                      <b-col>
                                        <!-- <p v-if="listings[index].rfidState2 > 3 ">RFID Checked</p> -->
                                      </b-col>
                                    </b-row>
                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClickedSideB1(); updateRfid2();">COMPLETE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                              <!-- this displays the fetch data from mounted -->
                              <b-row class="my-1">
                                <b-col sm="12">
                                  <div class="list-group-item item" v-for="teamfetch in toListFetchRouteA2" :key="teamfetch.id">
                                    <div v-for="personame in teamfetch.Team_player_sessions" :key="personame.id">

                                      <b-form-input id="input-live" :value="personame.Player.Person.first_name +' '+personame.Player.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>

                                      <b-form-input style="background-color:#33FF90" v-model="personame.Rfid.tag">{{personame.Rfid.tag}}</b-form-input>
                                      <input type="text" disabled :value="personame.Rfid.id" style="display: none;"/>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->


                            </b-modal>

        <!-- end of side b 1 .. rfid update -->



        <!-- <b-modal id="modal-centersideB_one" ref="sideB1rfidModalUpdate" centered title="Side B 1" v-bind:hide-footer="true"> -->
                <b-modal id="modal-centersideA_two" ref="sideA2rfidModalUpdate" centered v-bind:hide-footer="true">
                            <b><p>{{teamName3}} on Side A for {{dateTime2Data}}</p></b>
                              <b-row class="my-1">
                                <b-col sm="11">
                                  <div v-for="(listings, index) in list5" :key="index">
                                    <br/>
                                    <b-row>
                                      <b-col sm="6">
                                        <b-form-input id="input-live" :value="listings.Person.first_name +' ' + listings.Person.last_name" placeholder="PLAYER NAME" disabled></b-form-input>
                                        <input type="text" v-model="listings.id" disabled style="display:none;"/>
                                      </b-col>
                                      <b-col sm="6">
                                        <b-form-input v-model="listings.rfidState3" ref="todos3" v-on:change="posttorfidapi3($event, index)" :style="listings.rfidState3 ? { 'background-color': '#33FF90' } : null"></b-form-input>
                                      </b-col>
                                      <b-col>
                                        <!-- <p v-if="listings[index].rfidState2 > 3 ">RFID Checked</p> -->
                                      </b-col>
                                    </b-row>
                                  </div>
                                </b-col>
                              </b-row>
                              <br/>
                              <b-row>
                                <b-col><b-button block variant="info" v-on:click="hideModalRfidClickedSideA2(); updateRfid3();">COMPLETE</b-button></b-col>
                                <br/>
                              </b-row>
                              <br/>

                              <!-- this displays the fetch data from mounted -->
                              <b-row class="my-1">
                                <b-col sm="12">
                                  <div class="list-group-item item" v-for="teamfetch in toListFetchRouteA3" :key="teamfetch.id">
                                    <div v-for="personame in teamfetch.Team_player_sessions" :key="personame.id">

                                      <b-form-input id="input-live" :value="personame.Player.Person.first_name +' '+personame.Player.Person.last_name" disabled placeholder="PLAYER NAME"></b-form-input>

                                      <b-form-input style="background-color:#33FF90" v-model="personame.Rfid.tag">{{personame.Rfid.tag}}</b-form-input>
                                      <input type="text" disabled :value="personame.Rfid.id" style="display: none;"/>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>

                              <!-- end of row that displays fetch data from mounted -->


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
                        <!-- {{timeListText | fetchList1}} -->
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName1" placeholder="TEAM NAME 1" v-on:change="posttoapi($event)"></b-form-input>
                      </b-col>
                    </b-row>

                    <!-- group="a" style="height: 300px; border-style: outset;" @add="onDrop" @start="getpersonDetails1" -->

                    <!-- <draggable id="first" data-source="juju" :list="toListFetchRouteA1" class="list-group" draggable=".item" group="a">
                        <div class="list-group-item item" v-for="(teamfetch,index) in toListFetchRouteA1" :key="index">
                          <input id="input-live" v-model="teamfetch.id" type="text" disabled>
                        </div>
                    </draggable> -->
                    
                      
                        <!-- <b-form-input id="input-live" disabled v-model="fetchPlayerList" v-if="fetchPlayerList"></b-form-input> -->




                    <div v-if="this.teamName1.length > 1"> <!-- checks at first if the team name is inserted or not / if not it will disable drag -->

                        <div v-if="toListFetchRouteA1.length > '0'">
                          <p>GREATER THAN 0 </p>
                          <div v-for="teamfetch in toListFetchRouteA1" :key="teamfetch.id">
                            <draggable id="first" data-source="juju" :list="teamfetch.Team_player_sessions" class="list-group" draggable=".item" group="a"  style="height: 300px; border-style: outset; background-color: yellow;">
                              <div class="list-group-item item" v-for="personame in teamfetch.Team_player_sessions" :key="personame.id">
                                {{personame.Player.Person.first_name}} {{personame.Player.Person.last_name}} 
                              </div>
                            </draggable>
                          </div>
                        </div>





                      <!-- </draggable> -->
                    <!-- </div> -->

                    <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="getpersonDetails1">
                      <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                      </div>
                    </draggable -->

                          <div v-else>
                            <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 300px; border-style: outset;" @add="onDrop1" :move="onDropReservation1">

                            <!-- <draggable id="first" data-source="juju" :list="list2" class="list-group" draggable=".item" group="a" style="height: 300px; border-style: outset;" @add="onDrop1"> -->

                              <div class="list-group-item item" v-for="(element, index) in list2" :key="index">

                                  <!-- <insput v-model="element.id" type="text" disabled style="display: none;"> -->

                                  <!-- <b-form-input id="input-live" :value="element.Person.first_name + ' ' + element.Person.last_name" disabled @input="inputEvent"></b-form-input> -->

                                  <b-row>
                                    <b-col sm="2">
                                       <p v-if="list2[index].rfidState1 > 3" style='font-size:17px; color:green;'>&#9989;</p> 
                                    </b-col>
                                    <b-col sm="7">
                                        {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                    </b-col>
                                    <b-col>
                                      {{element.Person.minorsymbol}}
                                    </b-col>
                                  </b-row>

                                  <!-- <b-form-input id="input-live" :value="element.Person.first_name + ' ' + element.Person.last_name + ' / ' + reservationNameDragged1" disabled @input="inputEvent" v-model="element.fetchPlayerList" ></b-form-input> -->
                                  <!-- <b-form-input id="input-live" :value="element.Person.first_name + ' ' + element.Person.last_name" disabled @input="inputEvent" v-model="element.fetchPlayerList" ></b-form-input> -->
                                  <!-- <input v-model="element.first_name" disabled> -->
                              </div>
                             <!--    <input type="text" :value="item.name" @input="changeList($event, item.id, 'name')" v-model="element.name">
                                  {{ element.name }}
                                </div> -->

                                   <!-- <button class="btn btn-secondary" @click="add">Add</button> -->
                                  <!-- <button class="btn btn-secondary" @click="replace">Replace</button> 
                                </div> -->
                              </draggable>
                            </div>

                    </div> <!-- end of v-if teamname1 check -->

                    <div v-else> <!-- v-else if teamname not inserted display differnt div with **INSERT TEAM** text -->
                        <div style="height: 300px; border-style: outset;">
                          <p id="insertTeamFirst"> ** Add a team name first ** </p>
                        </div>
                    </div>


                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select v-model="selected1" v-on:change="onChangeMission1">
                              <!-- <option disabled value="">Please select one</option> -->
                              <!-- <option v-for="item in missions" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</option> -->
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                              <!-- <option>Blockmonster</option> -->
                              <!-- <option>C</option> -->
                            </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <!--  <div v-if="selected1 == selected2">
                        Sorry
                      </div>
                      <div v-else>
                        Not sorry
                      </div> -->

                      <!-- <div v-if="">
                            Sorry
                          </div>
                          <div v-else>
                            Not sorry
                          </div> -->

                      <div v-if=" selected1 > 0 && selected1 == selected2">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Vs</label>
                          </b-col>
                          <b-col sm="9">

                            <!-- <b-form-select v-model="vsselected1">
                              <option v-for="option in allTeamList" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
                            </b-form-select> -->

                                     <!--  <b-form-input v-model="vsselected1" list="my-list-id" v-on:focus="getAllTeamName" v-on:change="onChangeTeamVsTeam1"></b-form-input>
                                      <datalist id="my-list-id">
                                        <option v-for="option in allTeamList" v-bind:value="option.name" :key="option.id"> {{ option.name }} </option>
                                      </datalist> -->

                            <b-form-select v-model="vsselected1" v-on:change="onChangeTeamVsTeam1">
                              <!-- <option value=""></option> -->
                              <option :value="teamName2"> {{ teamName2 }} </option>
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
                        <p> You are going to update data for <b> {{teamName1}} </b> </p>
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
                        <div style="width: 50%;margin:auto;">
                            <b-button block v-b-modal.modal-center variant="info">Assign RFID</b-button>
                          </div>
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
                        <b-form-input type="text" name="reservationTime2" v-model="dateTime1Data" disabled></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName2" placeholder="TEAM NAME 2" v-on:change="posttoapi2($event)"></b-form-input>
                      </b-col>
                    </b-row>

                    <!-- <draggable
                        id="first"
                        data-source="juju"
                        :list="list4"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;" @add="onDrop2"
                      > -->

                    <div v-if="teamName2.length > 2">
                      <draggable
                          id="first"
                          data-source="juju"
                          :list="list4"
                          class="list-group"
                          draggable=".item"
                          group="a" style="height: 300px; border-style: outset;" @add="onDrop2" :move="onDropReservation2">

                       <!--  <draggable
                          id="first"
                          data-source="juju"
                          :list="list4"
                          class="list-group"
                          draggable=".item"
                          group="a" style="height: 300px; border-style: outset;" @add="onDrop2" :move="movingItemFrom2"> -->

                        <div
                          class="list-group-item item"
                          v-for="(element2, index) in list4"
                          :key="index">

                          <input v-model="element2.id" type="text" disabled style="display: none;"/>
                          <!-- <b-form-input id="input-live" v-model="element2.Person.last_name" disabled @input="inputEvent2">{{element2.Person.last_name}} {{element2.Person.first_name}}</b-form-input> -->
                          <!-- :value="element.Person.first_name + ' ' + element.Person.last_name" -->
                          <!-- <b-form-input id="input-live" :value="element2.Person.first_name + ' ' + element2.Person.last_name + ' ( ' + element2.Person.Bookerdetail.lastName +' )'" disabled @input="inputEvent2"> -->

                          <!-- <b-form-input id="input-live" :value="element2.Person.first_name + ' ' + element2.Person.last_name" disabled @input="inputEvent2" > -->

                          <!-- </b-form-input> -->
                          <!-- <input type="text" :value="element2.Person.first_name + ' ' + element2.Person.last_name" disabled @input="inputEvent2"/> -->
                          <!-- <span class="glyphicon glyphicon-envelope"></span> -->
                          <!-- <p>&#10004;</p> -->
                          <div> 
                            <!-- <p>I will display &#9986;</p> -->
                            <b-row>
                              <b-col sm="2">
                                 <p v-if="list4[index].rfidState2 > 3" style='font-size:17px; color:green;'>&#9989;</p>

                                 <input type="text" :value="index" style="display:none;">

                                 <!-- <b-form-input v-model="element2.fetchIndex" :value="index"></b-form-input> -->

                                 <!-- <b-form-input v-model=".index" ref="todos2" v-on:input="index"></b-form-input> -->

                              </b-col>
                              <b-col sm="7">
                                  {{element2.Person.first_name}} {{element2.Person.last_name}} ({{element2.Person.Bookerdetail.firstName}} {{element2.Person.Bookerdetail.lastName}})
                              </b-col>
                              <b-col>
                                {{element2.Person.minorsymbol}}
                              </b-col>
                            </b-row>
                          </div>
                            

                          <!-- </input> -->
                          <!-- <p v-if="list4.rfidState2.length > 4">S</p> -->

                        </div>
                        </draggable>
                    </div>

                      <!-- if the team.length is less than 2 it will display text -->
                      <div v-else>
                        <div style="height: 300px; border-style: outset;">
                          <p id="insertTeamFirst"> ** Add a team name first ** </p>
                        </div>
                      </div>
                      <!-- <br/> -->

                      <br/>

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                          <!-- <b-form-select v-model="selected1"> -->
                          <b-form-select v-model="selected2" v-on:change="sortBy">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected2 > 0 && selected1 == selected2">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Vs</label>
                          </b-col>
                          <b-col sm="9">
                            <!-- <b-form-select v-model="vsselected2" v-on:click="getAllTeamName2">
                              <option v-for="option in allTeamList2" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
                            </b-form-select> -->
                           

                            <!-- <b-form-input v-model="vsselected2" list="my-list-id1" v-on:focus="getAllTeamName2" v-on:change="onChangeTeamVsTeam2"></b-form-input>
                                <datalist id="my-list-id1">
                                    <option v-for="option in allTeamList2" v-bind:value="option.name" :key="option.id"> {{ option.name }} </option>
                                </datalist> -->

                            <b-form-select v-model="vsselected2" v-on:change="onChangeTeamVsTeam2">
                              <!-- <option value=""></option> -->
                              <!-- <option v-bind:value="teamIdSideA1"> {{ teamName1 }} </option> -->
                              <option :value="teamName1"> {{ teamName1 }} </option>
                            </b-form-select>

                          </b-col>
                        </b-row>
                      </div>

                      <!-- <div v-if="vsselected1 == selected2">
                          <p> SAME TEAM DUDE</p>                        
                      </div> -->



                      <!-- <br/>
                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                         <b-col sm="9">
                          <b-form-select v-model="organizationselected2" @change="onChange2($event)">
                            <option v-for="option in organizationList" v-bind:value="option.id" :key="option.id"> {{ option.name }} </option>
                          </b-form-select>
                        </b-col>
                      </b-row> -->

                      <br />

                    <b-modal id="modal-2" ref="my-modal-submit-id2" title="BTB Onboarding " centered v-bind:hide-footer="true">
                      <p> You are going to update data for <b> {{teamName2}} </b> </p>

                      <br>

                        <b-button variant="primary" v-on:click="submitFirstNameList2(); hideModal2();">SUBMIT</b-button>
                      <br>

                    </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-2 v-on:click="checkPlayerId2();">Update</b-button>
                        </b-col>
                        <!-- <b-col sm="3"> -->
                          <!-- <b-button variant="info">RFID</b-button> -->
                         <!--  <div>
                            <b-button v-b-modal.modal-centersideB_one variant="info">RFID</b-button>
                          </div> -->
                          <div style="width: 50%;margin:auto;">
                            <b-button block v-b-modal.modal-centersideB_one variant="info">Assign RFID</b-button>
                          </div>
                        <!-- </b-col> -->
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
                <!-- <p class="btbSideTitle"><b>SIDE A 2</b></p> -->

                <!-- start the form here -->
                <!-- <form id="signup-form" @submit.prevent="processForm"> -->
                  <b-col  class="border border-info rounded">

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-input type="text" name="reservationTime3" v-model="dateTime2Data" disabled></b-form-input>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input id="input-small" size="md" v-model="teamName3" placeholder="TEAM NAME 3" v-on:change="posttoapi3($event)"></b-form-input>
                      </b-col>
                    </b-row>

                    <!-- <draggable
                        id="first"
                        data-source="juju"
                        :list="list4"
                        class="list-group"
                        draggable=".item"
                        group="a" style="height: 300px; border-style: outset;" @add="onDrop2"
                      > -->

                    <div v-if="teamName3.length > 1">
                      <draggable
                          id="first"
                          data-source="juju"
                          :list="list5"
                          class="list-group"
                          draggable=".item"
                          group="a" style="height: 300px; border-style: outset;" @add="onDrop3" :move="onDropReservation3">

                        <div
                          class="list-group-item item"
                          v-for="(element3, index) in list5"
                          :key="index">

                          <input v-model="element3.id" type="text" disabled style="display: none;"/>

                          <div> 
                            <!-- <p>I will display &#9986;</p> -->
                            <b-row>
                              <b-col sm="2">
                                 <p v-if="list5[index].rfidState3 > 3" style='font-size:17px; color:green;'>&#9989;</p>

                                 <input type="text" :value="index" style="display:none;">

                              </b-col>
                              <b-col sm="7">
                                  {{element3.Person.first_name}} {{element3.Person.last_name}} ({{element3.Person.Bookerdetail.firstName}} {{element3.Person.Bookerdetail.lastName}})
                              </b-col>
                              <b-col>
                                {{element3.Person.minorsymbol}}
                              </b-col>
                            </b-row>
                          </div>
                            

                        </div>
                        </draggable>
                      <br>
                    </div>

                      <!-- if the team.length is less than 2 it will display text -->
                      <div v-else>
                        <div style="height: 300px; border-style: outset;">
                          <p id="insertTeamFirst"> ** Add a team name first ** </p>
                        </div>
                      </div>
                      <br/>

                      <!-- <br/> -->

                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Mission</label>
                        </b-col>
                        <b-col sm="9">
                          <!-- <b-form-select v-model="selected1"> -->
                          <b-form-select v-model="selected3" v-on:change="sortBy">
                              <option v-for="item in missions" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                          </b-form-select>
                        </b-col>
                      </b-row>

                      <br />

                      <div v-if=" selected3 > 0 && selected3 == selected4">
                        <b-row>
                          <b-col sm="3">
                          <label for="input-small">Vs</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-input v-model="vsselected3" list="my-list-id1" v-on:focus="getAllTeamName3" v-on:change="onChangeTeamVsTeam3"></b-form-input>
                                <datalist id="my-list-id1">
                                    <option v-for="option in allTeamList3" v-bind:value="option.name" :key="option.id"> {{ option.name }} </option>
                                </datalist>
                          </b-col>
                        </b-row>
                      </div>

                      <br />

                    <b-modal id="modal-3" ref="my-modal-submit-id2" title="BTB Onboarding " centered v-bind:hide-footer="true">
                      <p> You are going to update data for <b> {{teamName2}} </b> </p>

                      <br>

                        <b-button variant="primary" v-on:click="submitFirstNameList3(); hideModal3();">SUBMIT</b-button>
                      <br>

                    </b-modal>

                      <b-row>
                        <b-col sm="3" style="display: none;">
                          <b-button variant="primary" v-b-modal.modal-3 v-on:click="checkPlayerId3();">Update</b-button>
                        </b-col>
                        <!-- <b-col sm="3"> -->
                          <!-- <b-button variant="info">RFID</b-button> -->
                         <!--  <div>
                            <b-button v-b-modal.modal-centersideB_one variant="info">RFID</b-button>
                          </div> -->
                          <div style="width: 50%;margin:auto;">
                            <b-button block v-b-modal.modal-centersideA_two variant="info">Assign RFID</b-button>
                          </div>
                        <!-- </b-col> -->
                      </b-row>

                      <br/>

                  </b-col>

              </b-col>

              <!--              END OF SIDE A 2                     -->



              <!--         THIS IS SIDE B 2                    -->


              <b-col>


                <b-col  class="border border-info rounded">

                  <b-row class="my-1">
                    <b-col sm="4">
                      <b-form-input type="text" name="reservationTime1" v-model="dateTime2Data" disabled></b-form-input>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input id="input-small" size="md" placeholder="TEAM NAME 4"></b-form-input>
                    </b-col>
                  </b-row>

                  <div v-if="teamName3.length > 1">
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
                    </div>

                    <div v-else>
                      <div style="height: 300px; border-style: outset;">
                          <p id="insertTeamFirst"> ** Add a team name first ** </p>
                        </div>
                    </div>



                     <br/>

                    <b-row>
                      <b-col sm="3">
                      <label for="input-small">Mission</label>
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

                   <!--  <br />


                      <b-row>
                        <b-col sm="3">
                        <label for="input-small">Organization</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-select v-model="organizationselected4">
                            <option>Organization 1 </option>
                            <option>Organization 2</option>
                            <option>Organization 3</option>
                          </b-form-select>
                        </b-col>
                      </b-row> -->

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
                      <label for="input-small">Mission</label>
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
                      <label for="input-small">Mission</label>
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

                <p class="filters">{{reservation.reservation_for | moment}}</p>

                <b>{{reservation.Booker.Person.last_name}} Reservation - {{reservation.size}} - {{reservation.Mission.name}}</b>

                <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="getpersonDetails1"> -->
                <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a">
                  <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                      <p>{{element.Person.first_name}}  {{ element.Person.last_name }}</p>
                      <!-- <p>S</p> -->
                  </div>
                </draggable>


                <div slot="footer" class="btn-group list-group-item" role="group" aria-label="Basic example">
                  
                  </div>

              </div>

              <!-- <div v-for="minorreservation in teamByTime2" v-bind:key="minorreservation.id">

                <div v-for="minorname in minorreservation.Reservation_people" :key="minorname.name">
                  <draggable :list="minorreservation.Reservation_people.Minors" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="getpersonDetails1">
                        <div  class="list-group-item item" v-for="element in minorname.Minors" :key="element.id">
                            {{minorname.Minors.first_name}} {{minorname.Minors.last_name}}
                        </div>
                </draggable>
                </div>


              </div> -->

              <!-- <div v-for="reservation in teamByTime2" v-bind:key="reservation.id">
                <p>SAN</p>
              </div> -->

                <!-- <draggable :list="reservation.Reservation_people" class="list-group" draggable=".item" group="a" :move="checkMove1" @add="onDropReservation">
                  <div class="list-group-item item" v-for="element in reservation.Reservation_people" :key="element.name">
                  <p v-for="player_minor in element.Person.Player.Player_minors" :key="player_minor.name">
                      {{player_minor.first_name}}
                  </p>
                </div>
                </draggable> -->

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
              <!-- </div>   -->
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
    this.dataTime1BData = dateTime1B;

    this.dateTime2Data = dateTime2;
    this.dateTime2AData = dateTime2A;

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
    var currentdate = moment().subtract(1, 'days').format("YYYY-MM-DD");
    // var currentdate = moment().format("YYYY-MM-DD");

    var startReservationTime = moment().subtract(8, 'hours').format('HH:mm:ss');
    var endReservationTime = moment().add(2, 'hours').format('HH:mm:ss');

    console.log(startReservationTime);
    console.log(endReservationTime);
    console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);

    // axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T10:00:00'+'/'+endtime+'/'+currentdate+'T23:00:00').then(response => 
    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
      .then(response => 
      {
        // this.teamByTime2 = response.data;

        var booker_last_name = response.data[0].Booker.Person.last_name;
        var booker_first_name = response.data[0].Booker.Person.first_name;
        var booker_id = response.data[0].Booker.Person.id;

        console.log(booker_first_name +' '+ booker_last_name);

        var replyDataObj = response.data;
        console.log(replyDataObj);

        // var ccEmailId = "sandeshchiryo";

        // replyDataObj[0]['Reservation_people'][0]['Person']['Bookerdetail']={
        //      "id" : booker_id,
        //      "firstName" : booker_first_name,
        //      "lastName" : booker_last_name
        //   }

        console.log(replyDataObj);


        for(let i=0; i < response.data.length; i++){
          // console.log("090");
          // console.log(i);

          var booker_last_name = response.data[i].Booker.Person.last_name;
          var booker_first_name = response.data[i].Booker.Person.first_name;
          var booker_id = response.data[i].Booker.Person.id;

          console.log(booker_first_name +' '+ booker_last_name);

          var replyDataObj1 = response.data;
          console.log(replyDataObj1);

          var reservationID = response.data[i].Reservation_people[i].reservation_id;

          // var ccEmailId = "sandeshchiryo";

          console.log(response.data[0].Reservation_people.length);

          var countSubtract = response.data[0].Reservation_people.length;

          console.log(countSubtract);

          for(let j=0; j < response.data[0].Reservation_people.length; j++){

            console.log(i);
            console.log(response.data[i].Reservation_people[j].Person.first_name+' '+response.data[i].Reservation_people[j].Person.last_name);

          // console.log(response.data[0].Reservation_people[0].Person.Player.Player_minors.length);

          replyDataObj1[i]['Reservation_people'][j]['Person']['Bookerdetail']={
               // "address": [
               //   ccEmailId
               //  ]
               "id" : booker_id, /** this is the person id for the booker **/
               "firstName" : booker_first_name,
               "lastName" : booker_last_name
            }

            console.log(replyDataObj1);
            this.teamByTime2 = replyDataObj1;

            for(let k=0; k < response.data[i].Reservation_people[j].Person.Player.Player_minors.length; k++){
              // console.log(k);
              console.log(i);
              console.log(j);
              console.log(k);
              console.log(response.data[i].Reservation_people[j].Person.Player.Player_minors[k].last_name);

              var minorLastName = response.data[i].Reservation_people[j].Person.Player.Player_minors[k].last_name;
              var minorFirstName = response.data[i].Reservation_people[j].Person.Player.Player_minors[k].first_name;

              var minorPlayerMinorId = response.data[i].Reservation_people[j].Person.Player.Player_minors[k].id;
              var personSignedWaiverId = response.data[i].Reservation_people[j].Person.Player.Player_minors[k].player_id;

              console.log(minorLastName+' '+minorFirstName);
              var incrementObject = countSubtract++;
              // var definePerson = 'Person';

              // replyDataObj1[i]['Reservation_people'][j]['Person'][k]={
              replyDataObj1[i]['Reservation_people'][incrementObject]={
                 // "id" : booker_id,
                 "id": minorPlayerMinorId,
                 "Person":
                    {
                      "Player":{
                        "id" : minorPlayerMinorId,
                        "minor": 'yes'
                      },
                      "first_name" : minorFirstName,
                      "last_name" : minorLastName,
                      "id" : minorPlayerMinorId,
                      "minor" : 'yes',
                      "minorsymbol" : 'M',
                      "player_id" : personSignedWaiverId,
                      "reservation_id": reservationID,
                      "Bookerdetail":{
                        "id" : booker_id, /** this is the person id for the booker **/
                        "firstName" : booker_first_name,
                        "lastName" : booker_last_name
                      }
                  }

              }

              console.log(replyDataObj1);
              this.teamByTime2 = replyDataObj1;

            }

          }

          // console.log(response.data[0].Reservation_people[0].Person.Player.Player_minors.length);

          // for(let k=0; k < response.data[0].Reservation_people.Person.Player.Player_minors.length)

          // this.teamByTime2 = replyDataObj;
          // console.log(replyDataObj1);
          // console.log(i++);
        }

        // this.teamByTime2 = replyDataObj1; /** this pushes the changed array/objects data **/

        // this.teamByTime1.push(replyDataObj1);

      })
      .catch(function (error){
        console.log(error);
      });


    // var sideA1route='1';
    // var sideA1time= '2020-06-03%2004:13:42.000000';

    console.log(sideA1time);
    // console.log(moment().format('YYYY-MM-DD')+'%20'+dateTime1);

    if(dateTime1 != null){

      console.log(dateTime1);
      const remainderRoute1 = -15 - (start.minute() % 30);
      const routeDateTime = moment(start).add(remainderRoute1, "minutes").subtract(5,'hours').format("HH:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      // const routeDateTime = moment(start).add(remainderRoute1, "minutes").format("HH:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      console.log(routeDateTime);

      var sideA1route='1';
      var sideA1time = moment().format('YYYY-MM-DD')+'%20'+routeDateTime;
      console.log(sideA1time);

      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+sideA1time+'/route_id/'+sideA1route);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+sideA1time+'/route_id/'+sideA1route,{
                      // team_vs_team_id : teamSessionId2
                      })

                      .then(response => {
                        console.log(response);
                        // console.log(response.data[0].id);
                        if(response.data.length > 0){
                          console.log("greater than 0");
                          this.teamName1 = response.data[0].Team.name;
                          this.selected1 = response.data[0].mission_id;

                          var first_name = response.data[0].Team_player_sessions[0].Player.Person.first_name;
                          var last_name = response.data[0].Team_player_sessions[0].Player.Person.last_name;

                          this.toListFetchRouteA1 = response.data;
                          // this.toListFetchRouteA1 = response.data[0].Team_player_sessions[0].Player.Person.first_name;

                          if (this.toListFetchRouteA1 > 0) { 
                              this.fetchPlayerList.push(this.toListFetchRouteA1);
                          }

                          // this.list2 = "SAN";
                          // this.fetchPlayerList = first_name+' '+last_name;

                          // this.tolist2teamplayersessionid = response.data[];
                          // this.list2[0].Person.last_name = last_name;

                        }
                        else{
                          console.log("less");
                        }
                      })

                      .catch(function (error) {
                        console.log(error);
                      });
    }


    if(dateTime1B != null){

      console.log(dateTime1B);
      const remainderRoute1 = -15 - (start.minute() % 30);
      const routeDateTime = moment(start).add(remainderRoute1, "minutes").subtract(5,'hours').format("HH:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      var sideB1route='2';
      var sideB1time = moment().format('YYYY-MM-DD')+'%20'+routeDateTime;
      console.log(sideB1time);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+sideB1time+'/route_id/'+sideB1route,{
                      // team_vs_team_id : teamSessionId2
                      })

                      .then(response => {
                        console.log(response);
                        // console.log(response.data[0].id);
                        if(response.data.length > 0){
                          console.log("greater than 0");
                          this.teamName2 = response.data[0].Team.name;
                          this.selected2 = response.data[0].mission_id;

                          var first_name = response.data[0].Team_player_sessions[0].Player.Person.first_name;
                          var last_name = response.data[0].Team_player_sessions[0].Player.Person.last_name;

                          this.toListFetchRouteA2 = response.data ;
                          // this.toListFetchRouteA2 = response.data[0].Team_player_sessions[0].Player.Person.first_name;

                          if (this.toListFetchRouteA2 > 0) { 
                              this.fetchPlayerList2.push(this.toListFetchRouteA2);
                          }

                          // this.list2 = "SAN";
                          // this.fetchPlayerList = first_name+' '+last_name;

                          // this.tolist2teamplayersessionid = response.data[];
                          // this.list2[0].Person.last_name = last_name;

                        }
                        else{
                          console.log("less");
                        }
                      })

                      .catch(function (error) {
                        console.log(error);
                      });
    }


    if(dateTime2A != null){

      console.log(dateTime2A);
      const remainderRoute1 = -15 - (start.minute() % 30);
      const routeDateTime = moment(start).add(remainderRoute1, "minutes").subtract(5,'hours').format("HH:mm:00"); /** subtractiing 5 hour as my local database MYSQL runs on different timezone **/

      var sideA2route='1';
      var sideA2time = moment().format('YYYY-MM-DD')+'%20'+routeDateTime;
      console.log(sideA2time);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/session_time/'+sideA2time+'/route_id/'+sideA2route,{
                      // team_vs_team_id : teamSessionId2
                      })

                      .then(response => {
                        console.log(response);
                        // console.log(response.data[0].id);
                        if(response.data.length > 0){
                          console.log("greater than 0");
                          this.teamName3 = response.data[0].Team.name;
                          this.selected3 = response.data[0].mission_id;

                          var first_name = response.data[0].Team_player_sessions[0].Player.Person.first_name;
                          var last_name = response.data[0].Team_player_sessions[0].Player.Person.last_name;

                          this.toListFetchRouteA3 = response.data ;
                          // this.toListFetchRouteA2 = response.data[0].Team_player_sessions[0].Player.Person.first_name;

                          if (this.toListFetchRouteA3 > 0) { 
                              this.fetchPlayerList3.push(this.toListFetchRouteA3);
                          }

                          // this.list2 = "SAN";
                          // this.fetchPlayerList = first_name+' '+last_name;

                          // this.tolist2teamplayersessionid = response.data[];
                          // this.list2[0].Person.last_name = last_name;

                        }
                        else{
                          console.log("less");
                        }
                      })

                      .catch(function (error) {
                        console.log(error);
                      });
    }

      

    // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T01:00:00'+'/'+endtime+'/'+currentdate+'T23:45:00');

  },

  data() {
      return {
        checkReader:'',
        draggedTeamPlayerSessionId:'',
        teamIdSideA1: '',
        teamIdSideB1: '',

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

        // isChanged:false,

        timeListText:'Time',
        toListFetchRouteA1:'',
        fetchPlayerList:[],

        toListFetchRouteA2:'',
        fetchPlayerList2:[],
        dataTime1BData: '',

        teamByTime2FormattedTime:[],

        list2SelectedPlayerId:'',

        list2sessionid: '', /* this submits the session id as an variable to update rfid reader **/
        list2teamplayersessionid: [], /* this is the team player session table id to update data for rfid reader */
        tolist2teamplayersessionid: '',
        list2rfidcontainerarray: [],
        list2rfidcontainer: '',

        countfunction: '0',
        countfunction2: '0',

        playerSessionDetail2:'',

        playerCheckList2:[], /** this saves dragged item from main div **/

        missions:[],
        filterPlayerId1:[],

        lastTeamIdOne: [],
        lastTeamIdTwo: [],

        onDrop1FunctionLoaded: '0',
        onDrop2FunctionLoaded:'0',

        // reservationNameByTime: [],

        teamName1: '',
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
          /** end of pre select dropdown for game name **/

        /** end of objects for second form list side A 2 **/



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
        selected10: '',
        // selected6: '',


        vsselected1: null,
        vsselected2: null,
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

      hideModalRfidClickedSideA2() {
        this.$refs['sideA2rfidModalUpdate'].hide()
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

      focusOutPostRfid(e){
        console.log('inside focus out');
        console.log('blur', e.target.value);
      },

      posttorfidapi(event, index){
        console.log("inside update rfid side A");
         var arr = this.list2;

         console.log(this.list2);

         var number = this.countfunction++;

         console.log(this.list2[number].rfidState1);

          var rfid_tag = this.list2[number].rfidState1;

          console.log(arr);
          console.log(number);
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            console.log(response.data[0].id);
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



          // const nextIndex = index + 1;
          // if (nextIndex < this.list2.length && rfid_tag.length > 7) {
          //   this.$refs.todos[nextIndex].focus()
          // }

          const nextIndex = index + 1;
          console.log(nextIndex);
          console.log(this.list2.length);

          if (nextIndex < this.list2.length) {
            this.$refs.todos[nextIndex].focus();
            console.log("next index switch");
          }

      },

      posttorfidapi2(event, index){
        console.log("inside update rfid side b 1");
         var arr = this.list4;

         console.log(this.list4);
         // console.log(this.list4[number].rfidState2);

         var number = this.countfunction2++;

         
         console.log(this.list4[number].rfidState2);

          var rfid_tag = this.list4[number].rfidState2;

          console.log(this.list4[this.list4.length-1].rfidState2);
          // console.log(this.list4[1].rfidState2);

          console.log(rfid_tag);
          console.log(arr);
          console.log(number);
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            this.list4rfidcontainer  = response.data[0].id;
            var rfidId = this.list4rfidcontainer;
            console.log(response.data[0].id);

            // this.list4rfidcontainer = response.data[0].id;

            //       if (this.list4rfidcontainer > 0) { 
            //             this.list4rfidcontainerarray.push(this.list4rfidcontainer);
            //         }

            // })

            var teamplayertableid = this.list4teamplayersessionid[number];
            var rfidtag_id = this.list4rfidcontainerarray[number];
            var playerid = this.list4[number].id;
            var sessionid = this.list4sessionid;
            console.log(teamplayertableid);
            console.log(rfidtag_id);
            console.log(playerid);
            console.log(sessionid);

            axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
                // player_id: playerid,
                rfid_id: rfidId,
                team_id: this.teamname2id[0].id,
                session_id: sessionid
              })
                .then(function (response) {
                  console.log(response);
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
          console.log(this.list4.length);

          if (nextIndex < this.list4.length) {
            this.$refs.todos2[nextIndex].focus();
            console.log("next index switch");
          }

      },

      posttorfidapi3(event, index){
        console.log("inside update rfid side A 2");
         var arr = this.list5;

         console.log(this.list5);
         // console.log(this.list4[number].rfidState2);

         var number = this.countfunction3++;

         
         console.log(this.list5[number].rfidState3);

          var rfid_tag = this.list5[number].rfidState3;

          console.log(this.list5[this.list5.length-1].rfidState3);
          // console.log(this.list4[1].rfidState2);

          console.log(rfid_tag);
          console.log(arr);
          console.log(number);
          console.log(rfid_tag);

          axios.post(process.env.VUE_APP_DATABASE_RFIDS+'find_or_create/'+rfid_tag,{
            tag: rfid_tag,
          })
          .then(response => {
            this.list5rfidcontainer  = response.data[0].id;
            var rfidId = this.list5rfidcontainer;
            console.log(response.data[0].id);

            // this.list4rfidcontainer = response.data[0].id;

            //       if (this.list4rfidcontainer > 0) { 
            //             this.list4rfidcontainerarray.push(this.list4rfidcontainer);
            //         }

            // })

            var teamplayertableid = this.list5teamplayersessionid[number];
            var rfidtag_id = this.list5rfidcontainerarray[number];
            var playerid = this.list5[number].id;
            var sessionid = this.list5sessionid;
            console.log(teamplayertableid);
            console.log(rfidtag_id);
            console.log(playerid);
            console.log(sessionid);

            axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+teamplayertableid,{
                // player_id: playerid,
                rfid_id: rfidId,
                team_id: this.teamname3id[0].id,
                session_id: sessionid
              })
                .then(function (response) {
                  console.log(response);
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
          console.log(this.list5.length);

          if (nextIndex < this.list5.length) {
            this.$refs.todos3[nextIndex].focus();
            console.log("next index switch");
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

      onChangeTeamVsTeam1(){
        console.log(this.list2sessionid);
        console.log(this.vsselected1);
        // http://localhost:9090/team_vs_teams
        console.log(this.allTeamList.id);
        console.log("inside on change team vs team 1");

        var teamName = this.vsselected1;
        var teamSessionId = this.list2sessionid;
        var teamSessionId2 = this.list4sessionid;

        console.log(teamName);
        console.log(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName);

        axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+teamName,{
              name: this.vsselected1
            })
              .then(response => {
                console.log(response);
                console.log(response.data[0].id);
                var teamNameId = response.data[0].id;
                console.log(teamNameId);

                console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId);

                /** this will update session id on team_vs_team_id for SIDE A 1 **/
                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+teamSessionId,{
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
                      team_vs_team_id : teamSessionId
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
        
        this.vsselected2 = this.teamName1; /** this updates the team name auto on SIDE B 1 **/   

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

      posttoapi(event){
          axios.post(process.env.VUE_APP_FC_TEAMS+'/'+this.teamName1,{
          name: this.teamName1,
          })
          .then(response => {
            this.teamname1id = response.data;
            this.teamIdSideA1 = response.data[0].id;
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
          .then(response => {this.teamname3id = response.data})
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

      onDropReservation1(e){

        console.log("0909090");
        console.log(e);
        console.log(e.draggedContext.element.Person.first_name);
        console.log(e.draggedContext.element.Person.last_name);
        console.log(e.draggedContext.element.Person.id); /** this is waiver id **/
        console.log(e.draggedContext.element.reservation_id);
        console.log(e.draggedContext.element.Person.player_id);
        console.log(e.draggedContext.element.Person.reservation_id);
        console.log(e.draggedContext.index);

        var fetchIndex = e.draggedContext.index;

        console.log(this.list2teamplayersessionid[fetchIndex]);

        var deleteId = this.list2teamplayersessionid[fetchIndex];

        axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+deleteId,{

        })
        .then(response => {
          console.log("Deleted Id "+deleteId);
          console.log(fetchIndex);
          this.list2teamplayersessionid.splice(fetchIndex,1);

          this.onDrop1FunctionLoaded--;
          if(this.onDrop1FunctionLoaded > 0){
            console.log('yes greater than 0');
          }
          else{
            console.log('equal to 0');
          }

        })
        .catch(error => {
          console.log(error);
        });

        // let removed = myFish.splice(3, 1)

      },

      onDropReservation2(e){

        console.log("0909090");
        console.log(e);
        console.log(e.draggedContext.element.Person.first_name);
        console.log(e.draggedContext.element.Person.last_name);
        console.log(e.draggedContext.element.Person.id); /** this is waiver id **/
        console.log(e.draggedContext.element.reservation_id);
        console.log(e.draggedContext.element.Person.player_id);
        console.log(e.draggedContext.element.Person.reservation_id);
        console.log(e.draggedContext.index);

        var fetchIndex = e.draggedContext.index;

        console.log(this.list4teamplayersessionid[fetchIndex]);

        var deleteId = this.list4teamplayersessionid[fetchIndex];

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
        })
        .catch(error => {
          console.log(error);
        });

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

        var fetchIndex = e.draggedContext.index;

        console.log(this.list5teamplayersessionid[fetchIndex]);

        var deleteId = this.list5teamplayersessionid[fetchIndex];

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

        // let removed = myFish.splice(3, 1)

      },


      // onDrop for Team Name 1 table it will post to session table and team_player_session table
      onDrop1(e){

        // console.log("0909090");
        // console.log(e);
        // // var index = e.draggedContext.index;
        // console.log(this.draggedTeamPlayerSessionId);


        // console.log(e);
        // console.log(e.added);

        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList1 = response.data));

        // console.log(this.teamByTime1.data);

        var missionid = this.teamByTime2[0].mission_id;

        console.log(this.teamByTime2[0].mission_id);

        var countondrop1 = this.onDrop1FunctionLoaded++;
        // this.onDrop2FunctionLoaded++;
        console.log(countondrop1);

        console.log("below is the dragged id as person id");
        console.log(this.list2[countondrop1].Person.Player.id);


        var peopleidused = this.list2[countondrop1].Person.Player.id;

        this.selected1 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        var draggedPlayerId = this.list2[this.list2.length - 1].id; /* this will always select the last player id dragged */

        var reservationid = this.list2[countondrop1].reservation_id;
        var teamId = this.teamname1id[0].id;
        var routeId = 1;

        // console.log(reservationid);

        /** statement that checks if the dragged item is MONOR or NOT **/

          if(this.list2[countondrop1].Person.Player.minor == 'yes'){

            console.log('YES MINOR');
            // console.log(this.list2[countondrop2].Person.Player.id);
            // console.log(this.list2[countondrop2].Person.player_id);
            console.log(countondrop1);
            var id_of_player = this.list2[countondrop1].Person.player_id;
            console.log(this.list2[0].Person.player_id);
            console.log(id_of_player);

            var minor_id = this.list2[countondrop1].Person.Player.id;
            var id_of_reservation = this.list2[countondrop1].Person.reservation_id;
            console.log(id_of_reservation);
            // console.log(id_of_player+'/'+minor_id);

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: id_of_reservation
            // player_count: countondrop1+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

              console.log(response.data);

              this.list2sessionid = response.data[0].id; /** this pass session id to list2sessionid **/

              this.playerSessionDetail2 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;


              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                player_count: countondrop1+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
              })
              .then(response => {

              })
              .catch(function (error) {
                console.log(error);
              });



              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId,
                player_id: id_of_player,
                player_minor_id: minor_id
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list2teamplayersession*/
                  this.tolist2teamplayersessionid = response.data[0].id;

                  if (this.tolist2teamplayersessionid > 0) { 
                        this.list2teamplayersessionid.push(this.tolist2teamplayersessionid);
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

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: reservationid
            // player_count: countondrop1+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

              console.log(response.data);

              this.list2sessionid = response.data[0].id; /** this pass session id to list2sessionid **/

              this.playerSessionDetail2 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId,
                player_id: peopleidused
                // reservation_id: reservationid
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist2teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list2teamplayersession*/
                  this.tolist2teamplayersessionid = response.data[0].id;

                  if (this.tolist2teamplayersessionid > 0) { 
                        this.list2teamplayersessionid.push(this.tolist2teamplayersessionid);
                    }
                })

                .catch(error => {
                  console.log(error);
                });


                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                  player_count: countondrop1+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {

                })
                .catch(function (error) {
                  console.log(error);
                });

              }
              /** ends axios post on team player sessions **/

            })

            .catch(function (error) {
              console.log(error);
            });


            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
              player_count: countondrop1+1 /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
            })
            .then(response => {

            })
            .catch(function (error) {
              console.log(error);
            });

          }

          }

        /** end of MINOR CHECK STATEMENT **/


        // console.log(this.list2[countondrop2].Person.Minor_Player_id);

        // if(this.list2[countondrop2].Person.Player.id === 'undefined'){
        //   console.log("undefined");
        // }
      },

      onDrop2(e){

        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList2 = response.data));

        var missionid = this.teamByTime2[0].mission_id;

        console.log(this.teamByTime2[0].mission_id);

        var countondrop2 = this.onDrop2FunctionLoaded++;
        // this.onDrop2FunctionLoaded++;
        console.log(countondrop2);

        console.log("below is the dragged id as person id");
        console.log(this.list4[countondrop2].Person.Player.id);


        var peopleidused = this.list4[countondrop2].Person.Player.id;

        this.selected2 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        var draggedPlayerId = this.list4[this.list4.length - 1].id; /* this will always select the last player id dragged */

        var reservationid = this.list4[countondrop2].reservation_id;
        var teamId = this.teamname2id[0].id;
        var routeId = 2;

        // console.log(reservationid);

        /** statement that checks if the dragged item is MONOR or NOT **/

          if(this.list4[countondrop2].Person.Player.minor == 'yes'){

            console.log('YES MINOR');
            // console.log(this.list4[countondrop2].Person.Player.id);
            // console.log(this.list4[countondrop2].Person.player_id);
            console.log(countondrop2);
            var id_of_player = this.list4[countondrop2].Person.player_id;
            console.log(this.list4[0].Person.player_id);
            console.log(id_of_player);

            var minor_id = this.list4[countondrop2].Person.Player.id;
            var id_of_reservation = this.list4[countondrop2].Person.reservation_id;
            console.log(id_of_reservation);
            // console.log(id_of_player+'/'+minor_id);

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: id_of_reservation
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
                team_id: teamId,
                player_id: id_of_player,
                player_minor_id: minor_id
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


                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                  player_count: countondrop2+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {

                })
                .catch(function (error) {
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

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: reservationid
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
                team_id: teamId,
                player_id: peopleidused
                // reservation_id: reservationid
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


                axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionIdInserted,{
                  player_count: countondrop2+1 /** countondrop2 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {

                })
                .catch(function (error) {
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

        /** end of MINOR CHECK STATEMENT **/


        // console.log(this.list4[countondrop2].Person.Minor_Player_id);

        // if(this.list4[countondrop2].Person.Player.id === 'undefined'){
        //   console.log("undefined");
        // }
      },


      onDrop3(e){

        axios.get(process.env.VUE_APP_DATABASE_TEAMS).then(response => (this.allTeamList3 = response.data));

        var missionid = this.teamByTime2[0].mission_id;

        // console.log(this.teamByTime2[0].mission_id);

        var countondrop3 = this.onDrop3FunctionLoaded++;
        // this.onDrop2FunctionLoaded++;
        console.log(countondrop3);

        console.log("below is the dragged id as person id");
        console.log(this.list5[countondrop3].Person.Player.id);


        var peopleidused = this.list5[countondrop3].Person.Player.id;

        this.selected3 = this.missions[missionid-1].id; /** negative one is to match the array . Array start from 0,1,2 and our data id is 1,2,3 **/

        var draggedPlayerId = this.list5[this.list5.length - 1].id; /* this will always select the last player id dragged */

        var reservationid = this.list5[countondrop3].reservation_id;
        var teamId = this.teamname3id[0].id;
        var routeId = 1;

        // console.log(reservationid);

        /** statement that checks if the dragged item is MONOR or NOT **/

          if(this.list5[countondrop3].Person.Player.minor == 'yes'){

            console.log('YES MINOR');
            // console.log(this.list4[countondrop2].Person.Player.id);
            // console.log(this.list4[countondrop2].Person.player_id);
            console.log(countondrop3);
            var id_of_player = this.list5[countondrop3].Person.player_id;
            console.log(this.list5[0].Person.player_id);
            console.log(id_of_player);

            var minor_id = this.list5[countondrop3].Person.Player.id;
            var id_of_reservation = this.list5[countondrop3].Person.reservation_id;
            console.log(id_of_reservation);
            // console.log(id_of_player+'/'+minor_id);

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+id_of_reservation+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: id_of_reservation
            })
            .then(response => {

              console.log(response.data);

              this.list4sessionid = response.data[0].id; /** this pass session id to list4sessionid **/

              this.playerSessionDetail5 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId,
                player_id: id_of_player,
                player_minor_id: minor_id
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist4teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list4teamplayersession*/
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

            if(teamId > 0){
            console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId,{
            team_id: teamId,
            route_id: routeId,
            mission_id: this.teamByTime2[0].mission_id,
            reservation_id: reservationid
            })
            .then(response => {

              console.log(response.data);

              this.list5sessionid = response.data[0].id; /** this pass session id to list4sessionid **/

              this.playerSessionDetail5 = response.data[0].id;
              var sessionIdInserted = response.data[0].id;

              /** checks the session id and post again using axios.post for team player session table **/
              if(sessionIdInserted > 0){

                axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
                // session_id: sessionIdInserted,
                team_id: teamId,
                player_id: peopleidused
                // reservation_id: reservationid
                })
                .then(response => {

                  /* this grabs the data from response pass it to tolist4teamplyersession which is an object , stores the multiple objects*/
                  /* multiple objects is passed to array called list4teamplayersession*/
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

        /** end of MINOR CHECK STATEMENT **/


        // console.log(this.list4[countondrop2].Person.Minor_Player_id);

        // if(this.list4[countondrop2].Person.Player.id === 'undefined'){
        //   console.log("undefined");
        // }
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

      onChangeMission1(event){
        console.log(this.list2sessionid);
        console.log("inside on change mission");

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
        var missionid = this.selected1;

        console.log(this.selected1);

        var routeId = 1;
        // console.log(this.list2);

          if(teamId > 0){
            // console.log('greater than 0');
            // console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationid+'/team/'+teamId+'/route/'+routeId);
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionID,{
            // team_id: teamId,
            // route_id: routeId,

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
        console.log(this.teamName1.length);
        // console.log(sortKey);

        if(this.teamName1.length > 1){
          return true;
          // return this.list1Move(evt);
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

      // getpersonDetails1(){ /** right now it only selects list2 or list 4 **/

      //   console.log("Inside person details 1");

      //   // console.log(this.list2[0].id);

      //   // console.log(this.list4[0].id);

      //   // this.playerSessionDetail4 = response.data[0].id;
      //         var draggedPlayerId = this.list2[0].id;
      //         var sessionIdInserted = this.playerSessionDetail1;

      //         console.log(this.playerSessionDetail1);

      //         /** checks the session id and post again using axios.post for team player session table **/
      //         // if(this.list2[0].id > 0){
      //         //   console.log("first");
      //         // }
      //         // if(this.list2[1].id > 0){
      //         //   console.log("second");
      //         // }

      //         if(sessionIdInserted > 0){

      //           console.log("inside man");

      //           axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+draggedPlayerId+'/session/'+sessionIdInserted,{
      //           // session_id: sessionIdInserted,
      //           // team_id: teamId
      //           // player_id: draggedPlayerId
      //           })
      //           .then(response => {
      //             var getTeamPlayerSessionId1 = response.data[0].id;
      //             console.log(getTeamPlayerSessionId1);

      //             axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+getTeamPlayerSessionId1);

      //           })
      // }

    // },

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

      // teambytimeRepeat() {
      //     const grouped = this.teamByTime2.reduce((map, { text, time }) => {
      //       let group = map.get(time) || map.set(time, []).get(time)
      //       group.push(text)
      //       return map
      //     }, new Map())

      //     return Array.from(grouped, ([ time, texts ]) => ({ time, texts }))
      //   }

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

</style>
