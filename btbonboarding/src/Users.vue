<template>
  <div id="usersapp" style="width: 80%; margin:auto;">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js usersApp"/> -->
    <!-- <p>USERS</p> -->

    <b-container class="bv-example-row" id="searchId">
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <b-row>

          <b-col cols="10" md="8"></b-col>

          <!-- <b-col sm="4">
            <b-form-input v-model="searchQuery" id="input-large" size="lg" placeholder="Search here ... "></b-form-input>
          </b-col> -->

        </b-row>

      </b-container>

      <!-- the modal display all the recent waiver list -->
      <b-modal id="modal-waiverList" centered size="lg" title="Waiver List" v-bind:hide-footer="true" v-bind:hide-header="true">
        <!-- <p style="margin:auto;">List of People</p> -->
        <b-row>
          <b-col><h3>WAIVER LIST</h3></b-col>
          <b-col lg="2">
            <b-form-select v-model="limitReservationList" :options="options" class="mb-3" v-on:change="waiverList();">
                        <!-- <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option> -->
                        <b-form-select-option value="5">10</b-form-select-option>
                        <b-form-select-option value="10">20</b-form-select-option>
                        <b-form-select-option value="15">30</b-form-select-option>
                        <b-form-select-option value="20">40</b-form-select-option>
                      </b-form-select>
          </b-col>
        </b-row>
        <hr>
        <div id="modalScrollable">
          <table class="table table-borderless">
            <thead>
                  <tr>
                    <!-- <th scope="col">#</th> -->
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Reservation Name</th>
                  </tr>
            </thead>

              <tbody v-for="(element,index) in waiverLists" :key="element.id" style="text-transform: capitalize;">
                <td>{{element.first_name}}</td>
                <td>
                  <p v-if="element.last_name == 'null'">  </p>
                  <p v-else>{{element.last_name}}</p>
                </td>
                <td>A</td>
                <td>
                  <b-col>
                    <b-form-select style="text-transform:capitalize;" v-on:change="changedReservation($event,index,'player')">
                      <option v-for="elementDropdown in reservationLists" :value="elementDropdown.id" v-bind:key="elementDropdown.id">{{elementDropdown.Booker.Person.first_name}} {{elementDropdown.Booker.Person.last_name}}</option>
                    </b-form-select>
                  </b-col>
                </td>
              </tbody>

              <tbody v-for="(elementMinor,index) in waiverListsMinor" :key="elementMinor.id" style="text-transform: capitalize;">
                <td>{{elementMinor.first_name}}</td>
                <td>
                  <p v-if="elementMinor.last_name == 'null'">  </p>
                  <p v-else>{{elementMinor.last_name}}</p></td>
                  <td>M</td>
                  <td>
                    <b-col>
                    <b-form-select style="text-transform:capitalize;" v-on:change="changedReservation($event,index,'minor')">
                      <option v-for="elementDropdown in reservationLists" :value="elementDropdown.id" v-bind:key="elementDropdown.id">{{elementDropdown.Booker.Person.first_name}} {{elementDropdown.Booker.Person.last_name}}</option>
                    </b-form-select>
                  </b-col>
                  </td>
              </tbody>

          </table>

        </div>

        <!-- <table class="table table-hover">
          <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                </tr>
          </thead>
            <tbody v-for="element in waiverListsMinor" :key="element.id" style="text-transform: capitalize;">
              <td>{{element.first_name}}</td>
              <td>{{element.last_name}}</td>
            </tbody>
        </table> -->

        <b-row class="my-1">
          <b-col><b-button variant="info" v-on:click="reloadPageEvent()">Submit</b-button></b-col>
          <!-- <b-col v-on:click="hideVoucherModal"><b-button variant="warning">Cancel</b-button></b-col> -->
        </b-row>

      </b-modal>
      <!-- end of WAIVER LIST modal -->

      <!-- the modal below is for the VOUCHERS -->
      <b-modal id="modal-vouchers" centered size="lg" title="Email Vouchers" v-bind:hide-footer="true">
        <p style="text-transform: capitalize; font-weight: bold;">{{voucherReservationName}} Reservation / {{convertReservationTime(voucherReservationTime)}} / Size {{voucherReservationSize}}</p>
        <br>
        <div><p style="line-height: 35px;"> You are going to send out voucher for 

          <select v-model="voucherNumberSelected" v-on:change="getVoucherCode($event,voucherNumberSelected)" v-if="voucherSizeDisable == '1'" disabled>
            <option disabled value=""> </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>10</option>
          </select>

          <select v-model="voucherNumberSelected" v-on:change="getVoucherCode($event,voucherNumberSelected)" v-else>
            <option disabled value=""> </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>10</option>
          </select>

         people. Using the code <input type="text" v-model="voucherCodeGenrated" disabled> and email as <b>{{voucherEmail}}</b> or via phone <b>{{voucherPhoneNumber}}</b>.
       </p>
        </div>
        <br>
        <b-row class="my-1">
          <b-col v-if="voucherSendEmailButtonActivate == '1'"><b-button variant="info">Send Email</b-button></b-col>
          <b-col v-else><b-button variant="info" disabled>Send Email</b-button></b-col>
          <!-- <b-col v-on:click="hideVoucherModal"><b-button variant="warning">Cancel</b-button></b-col> -->
        </b-row>

      </b-modal>
      <!-- end of VOUCHERS modal -->

      <!-- this modal will hide/unhide reservation name -->

        <b-modal id="modal-updateReservation" centered size="md" title="Update Reservation" v-bind:hide-footer="true" v-bind:hide-header="true">

            <!-- <b-row v-for="item in (index,posts)" v-bind:key="fetchlist1.id" style="margin-top: 1%;">
              <b-col sm="4">
                <b-col style="text-transform: capitalize;">{{fetchlist1.player_first_name}}</b-col>
              </b-col>
            </b-row> -->
          <table class="table">
            <tr>
              <th>Reservation Time</th>
              <th>Reservation Name</th>
              <th>Cancel</th>
            </tr>

            <tr v-for="item in getAllReservationList" v-bind:key="item.id">
              <td class="covertedtime">
                {{item.reservation_time}}
              </td>
              <td style="text-transform:capitalize;">
                {{item.Booker.Person.first_name}} {{item.Booker.Person.last_name}}
              </td>
              <td>
                <input type="checkbox" checked v-if="!item.reservation_cancelled > '0'" @click="updateReservationCreated($event,item.id,1)"/>
                <input type="checkbox" v-else  @click="updateReservationCreated($event,item.id,0)"/>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td><b-button variant="info" @click="reloadPageEvent()">Update</b-button></td>
            </tr>

          </table>
            <!-- <b-row class="my-1">
              <b-col sm="4">
                <b>Email-id</b>
              </b-col>
              <b-col sm="6">
                <b-form-input v-model="addBookerEmail" id="input-large" placeholder="Enter Email-id" v-on:keyup.enter="getDetailByEmail"></b-form-input>
              </b-col>
            </b-row> -->
            <!-- <b-button v-on:click="reloadPageEvent()">OK</b-button> -->

            <!-- <b-button v-on:click="hideUpdateReservationModal()">Cancel</b-button> -->

        </b-modal>

      <!-- end of modal to hide/unhide reservation -->

          <!-- this modal will add the reservation that did not show up from xola to our database -->
          <b-modal id="modal-addReservation" centered size="md" title="Add Reservation">

            <b-row class="my-1">
              <b-col sm="4">
                <b>Email-id</b>
              </b-col>
              <b-col sm="6">
                <b-form-input v-model="addBookerEmail" id="input-large" placeholder="Enter Email-id" v-on:keyup.enter="getDetailByEmail"></b-form-input>
              </b-col>
              <b-col sm="1">
                <b-input-group-prepend is-text>
                  <b-icon icon="search" v-on:click="getDetailByEmail"></b-icon>
                </b-input-group-prepend>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>First Name</b>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="addBookerFirstName" id="input-large" placeholder="Enter First Name"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Last Name</b>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="addBookerLastName" id="input-large" placeholder="Enter Last Name"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Cellphone</b>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="addBookerPhoneNumber" id="input-large" placeholder="Enter Phone Number"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Team Size</b>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="addBookerTeamSize" id="input-large" placeholder="Enter Team Size"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Reservation Date</b>
              </b-col>
              <b-col sm="8">
                <b-input-group class="mb-1">

                <b-form-input
                  id="example-input"
                  v-model="addReservationDate"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                ></b-form-input>

                <b-input-group-append>
                  <b-form-datepicker
                    v-model="addReservationDate"
                    button-only
                    right
                    locale="en-US"
                    aria-controls="example-input"
                    @context="onContext"
                  ></b-form-datepicker>
                </b-input-group-append>

              </b-input-group>

              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Reservation Time</b>
              </b-col>
              <b-col sm="8">
                <b-row>

                  <b-col sm="4">
                    <b-form-select v-model="reservationTimeHourly" class="mb-3">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </b-form-select>
                  </b-col>

                  <b-col sm="4">
                    <b-form-select v-model="reservationTimeQuaterly" class="mb-3">
                      <option value="00"> 00 </option>
                      <option value="15"> 15 </option>
                      <option value="30"> 30 </option>
                      <option value="45"> 45 </option>
                    </b-form-select>
                  </b-col>

                  <b-col sm="4">
                    <b-form-select v-model="reservationAmPm" class="mb-3">
                      <option value="AM"> AM </option>
                      <option value="PM"> PM </option>
                    </b-form-select>
                  </b-col>

                </b-row>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="4">
                <b>Mission</b>
              </b-col>
              <b-col sm="8">
                <b-form-select v-model="addBookerMission" class="mb-3">
                  <option value="1"> Cyberbot </option>
                  <option value="2"> Block Monster </option>
                  <option value="3"> Cyberbot Pro </option>
                  <option value="4"> Cyberbot Halloween </option>
                </b-form-select>
              </b-col>
            </b-row>

            <br>

            <b-row class="my-1">

              <b-col>

              </b-col>


              <b-col v-if="addBookerFirstName.length == 0 || addBookerEmail.length == 0 || addBookerPhoneNumber.length == 0 || addBookerTeamSize.length == 0  
              || reservationTimeQuaterly.length == 0 || reservationTimeHourly.length == 0 || reservationAmPm.length == 0 || addBookerMission.length == 0">
                <b-button variant="primary" v-on:click="clickedSubmitReservation" disabled>Submit Reservation</b-button>
              </b-col>
              <b-col v-else>
                <b-button variant="primary" v-on:click="clickedSubmitReservation">Submit Reservation</b-button>
              </b-col>

            </b-row>

            <br>

          </b-modal>
          <!-- end of Add Reservation Modal -->



          <b-modal id="modal-organization" centered size="md" title="Organization">
            
            <!-- <p>  </p> -->

            <!-- <p> {{reservationIdForOrganization}}</p> -->

            

            <!-- <select v-model="organizationTypeList" id="input-large" size="lg" style="text-transform: lowercase">
              
            </select> -->

            <br/>
            <b-row class="my-1">
              <b-col sm="5">
                <b>Organization Name</b>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="organizationNameTyped" id="input-large" placeholder="Enter Organization Name" style="text-transform: lowercase"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-row class="my-1">
              <b-col sm="5">
                <b>Organization Type</b>
              </b-col>
              <b-col sm="7">
                <b-form-select v-model="organizationTypeSelected">
                  <option v-for="item in organizationTypeList" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                  <!-- <option value="createNewOrganization">Create New</option> -->
                </b-form-select>
              </b-col>
            </b-row>

            <br>

            <b-row class="my-1" v-if="organizationTypeSelected == 'createNewOrganization'">
              <b-col sm="5">
                <b>Type Name</b>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="organizationTypeSelectedNew" id="input-large" placeholder="new organization type name" style="text-transform: lowercase"></b-form-input>
              </b-col>
            </b-row>

            <br> 

            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal-xs" @click="organizationnNameUpdate($event, organizationNameTyped)">SUBMIT</button>
            </div>

          </b-modal>

          <b-modal id="modal-xl" centered size="xl" title="TEAM" @click="reloadPageEvent">
                                <p  style="text-transform: capitalize;">{{selectedCustomerName}} / {{selectedDate}} / {{selectedTime}} / {{mission_name}} / {{teamSize}}</p>
                                <!-- <p> Booker Name = <u style="font-weight:bold;">{{timeList}}</u> </p> -->
                              <br/>
                              <b-container class="bv-example-row">
                                  <b-row style="font-weight:bold;">
                                    <b-col><p>F Name</p></b-col>
                                    <b-col><p>L Name</p></b-col>
                                    <b-col><p>Cell number</p></b-col>
                                    <b-col><p>Waiver</p></b-col>
                                    <b-col><p>Arrived</p></b-col>
                                    <!-- <b-col><p>Waiver</p></b-col> -->
                                    <b-col><p>Adult/Minor</p></b-col>
                                    <b-col><p>Player</p></b-col>
                                    <b-col><p>Tags</p></b-col>
                                    <b-col><p>Assigned</p></b-col>
                                  </b-row>

                                  <!-- <div v-for="fetchlist1 in clickedPlayerList.Reservation_people" v-bind:key="fetchlist1.id">
                                    <p>{{fetchlist1.player_name}}</p>
                                    <p>S</p>
                                  </div> -->

                                  <b-row v-for="fetchlist1 in clickedPlayerList.Reservation_people" v-bind:key="fetchlist1.id" style="margin-top: 1%;">
                                    <b-col style="text-transform: capitalize;">{{fetchlist1.player_first_name}}</b-col>
                                    <b-col style="text-transform: capitalize;">{{fetchlist1.player_last_name}}</b-col>
                                    <b-col>{{fetchlist1.player_cell_number}}</b-col>
                                    <b-col>YES</b-col>
                                    <!-- <b-col><input type="checkbox" v-model="subchildArrived"/></b-col> -->
                                    <b-col>
                                      <!-- <p v-if="fetchlist1.arrived == '1'">YES</p>
                                      <p v-else>NO</p> -->
                                      <!-- {{fetchlist1.arrived}} -->
                                      <p v-if="fetchlist1.arrived == '1'"><input type="checkbox" id="jack" value="fetchlist1.player_first_name" v-on:click="arrivedCheckbox($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)" checked></p>
                                      <p v-else><input type="checkbox" value="fetchlist1.player_first_name" v-on:click="arrivedCheckbox($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)"></p>
                                    </b-col>

                                    <!-- <b-col>{{fetchlist1.minor_tag}} {{fetchlist1.mission_name}} {{fetchlist1.play_count}}</b-col> -->
                                    <b-col v-if="fetchlist1.minor_tag == 'M'">Minor</b-col>
                                    <b-col v-else>Adult</b-col>

                                    <b-col>

                                      <p v-if="fetchlist1.non_player == '0'"><input type="checkbox" id="jack" value="fetchlist1.player_first_name" v-on:click="nonPlayerCheckbox($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)" checked></p>
                                      <p v-else><input type="checkbox" value="fetchlist1.player_first_name" v-on:click="nonPlayerCheckbox($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)"></p>

                                    </b-col>

                                    <!-- this code works for bomb_beater -->
                                    <b-col>
                                      <span v-if="fetchlist1.player_repeaters > '1'">R{{fetchlist1.player_repeaters}}</span>
                                      <span v-if="fetchlist1.player_bomb_beater_status > '0'">&nbsp; &#128163;</span>
                                    </b-col>
                                    <!-- end of working bomb beater -->

                                    <!-- reservation people and minor session update -->
                                    <b-col>

                                      <p v-if="fetchlist1.reservation_session_id > '0'"><input type="checkbox" id="jule" value="fetchlist1.player_first_name" v-on:click="updateReservationSession($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)" checked></p>
                                      <p v-else><input type="checkbox" value="fetchlist1.player_first_name" v-on:click="updateReservationSession($event, fetchlist1.reservation_people_minor_table_id, fetchlist1.minor_tag)"></p>

                                    </b-col>

                                    <!-- end of reservation people/minor update -->
                                    <!-- player_bomb_beater_status -->


                                  </b-row>

                                </b-container>

                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal-xs" @click="reloadPageEvent">OK</button>
                                </div>


                          <!-- <b-table :fields="fields">
                            <p>{{post.customerName}}</p>
                            <template v-slot:table-caption>This is a table caption.</template>
                            }
                          </b-table>  -->
                      </b-modal>



    <div>
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users" active>Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa;">

          <b-row style="margin-top: 1%;">
            <b-col lg="2">
              <p style="margin-top: 3%; font-size: 1.1em;"><b>Reservation Date</b></p>
            </b-col>

            <b-col lg="2">
              <b-input-group class="mb-1">

                <b-form-input
                  id="example-input"
                  v-model="dateClicked"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                ></b-form-input>

                <b-input-group-append>
                  <b-form-datepicker
                    v-model="dateClicked"
                    button-only
                    right
                    locale="en-US"
                    aria-controls="example-input"
                    @context="onContext"
                  ></b-form-datepicker>
                </b-input-group-append>

              </b-input-group>
            </b-col>

            <b-col lg="2">
              <b-button variant="outline-primary" v-on:click="addReservation();"> Add Reservation </b-button>
            </b-col>

            <b-col lg="2">
              <b-button variant="outline-primary" v-on:click="updateReservation();"> Update Reservation </b-button>
            </b-col>

            <b-col lg="1">
              <b-button variant="outline-primary" v-on:click="waiverList();"> Waivers </b-button>
            </b-col>

            <!-- <b-col lg="2">
              <b-form-input id="input-large" size="md" placeholder="Search here ... " v-on:change="searchPlayers()" v-model="searchedText"></b-form-input>
            </b-col> -->
            <b-col lg="3">
              <b-input-group size="md">
                <b-form-input id="input-large" size="md" placeholder="Search here ... " v-on:change="searchPlayers()" v-model="searchedText"></b-form-input>
                <b-input-group-prepend>
                  <span class="input-group-text" v-on:click="searchPlayers()" v-if="searchedText.length > '1'">&#128270;</span>
                  <span class="input-group-text" v-else disabled>&#128270;</span>
                </b-input-group-prepend>
              </b-input-group>
            </b-col>

          </b-row>

          <br>

          <table class="table table-hover">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Time</th>
                  <th scope="col">Reservation</th>
                  <th scope="col" style="font-size: 2em;">#</th>
                  <th scope="col">Mission</th>
                  <th scope="col">Organization</th> <!-- changed it from GROUP to ORGANIZATION as asked by CHUCK -->
                  <th scope="col">Players Arrived</th>
                  <th scope="col">Spectators Arrived</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Late</th>
                  <th scope="col">No Shows</th>
                  <th scope="col">Release</th>
                </tr>
              </thead>
                <tr v-for="(item, index) in posts" v-bind:key="item.id">
                  <td class="covertedtime">
                    {{item.reservation_time}}
                  </td>

                  <td v-on:click="selectItem ($event, posts, item, index)">
                    <!-- <b-button pill variant="outline-info">{{item.Booker.Person.first_name}} {{item.Booker.Person.last_name}}</b-button> -->

                    <b-button block pill variant="outline-info" style="text-transform: capitalize;" v-if="item.Booker.Person.last_name == 'null' || item.Booker.Person.last_name == 'undefined' ">
                      {{item.Booker.Person.first_name}}
                    </b-button>

                    <b-button block pill variant="outline-info" v-else style="text-transform: capitalize;">
                      {{item.Booker.Person.first_name}} {{item.Booker.Person.last_name}}
                    </b-button>

                  </td>

                  <td>
                    {{item.size}}
                  </td>

                  <td>
                    {{item.Mission.name}}
                    <!-- <span v-if="item.battlemode > '0' " style="color:black; font-size: 1.5em;"> | &#9755; &#9756; </span> -->
                    <p v-if="item.battlemode > '0'"><b> Battle Mode</b></p>

                  </td>

                  

                  <td>
                    <!-- <select v-model="organizationType">
                      <option value=""> </option>
                      <option v-for="organization in organizationDetail" v-bind:key="organization.id">{{organization.name}}</option>
                    </select>
                    <p v-if="organizationType == 'Other'">
                      <input type="text">
                    </p> -->

                    <!-- it uses the organization_id from RESERVATION TABLE ONLY -->

                    <p v-if="item.organization_id > '0'"> {{item.Organization.name}} </p>
                    <p v-else>
                      <b-button variant="outline-primary" v-on:click="addOrganization($event, index)">ADD</b-button>
                    </p>

                  </td>

                  <!-- <td>
                    {{item.Reservation_people.length+item.Reservation_minors.length}}
                  </td> -->

                  <td>
                    <p v-if="item.size-item.total_player_arrived < '0'" style="color:red;font-size: 1.1em;"><b>{{item.total_player_arrived}}</b></p>
                    <p v-else>{{item.total_player_arrived}}</p>
                  </td>

                  <td>
                    <!-- {{item.Reservation_people.length}} --> <!-- arrived non player -->
                    {{item.total_non_player_arrived}}
                  </td>

                  <td>
                    <!-- <p v-if="item.paid_amount == item.final_dollar_amount" style="color:green;">&#10004;&#65039;</p>
                    <p v-if="item.paid_amount != item.final_dollar_amount">&#10060;</p> -->
                    <p v-if="item.balance == '0'" style="color:green;">&#10004;&#65039;</p>
                    <p v-if="item.balance > '0'">&#10060;</p>
                  </td>

                  <td>
                    <p v-if="item.late_by < '15' || item.size != item.total_arrived">
                      <b v-if="!item.released == '1' && item.late_by < '10'">&#10060;</b>
                      <b v-else> </b>
                    </p>
                  </td>

                  <td>
                    <!-- <p v-if="item.size - item.total_arrived => '0'">{{item.size - item.total_arrived}}</p> -->
                    <!-- {{item.size - item.total_player_arrived}} -->

                    <!-- <p v-if="item.size-item.total_player_arrived < '0'">{{item.size}}+{{item.total_player_arrived-item.size}}</p>
                    <p v-else>{{item.size - item.total_player_arrived}}</p> -->
                    <div v-if="item.vouchers > '0'" style="margin-top: -13%;">

                      <span style="font-size: 30px; color:#007bff;" v-on:click="forwardedEmailVouchers($event, item.reservation_id)">&#9993;</span>

                    </div>

                    <div v-else>
                      <!-- <p v-if="item.size-item.total_player_arrived > '0'"><a v-on:click="noShowsVoucher($event, item.reservation_id)" style="color: #007bff;font-weight: bold;">{{item.size-item.total_player_arrived}}</a></p> -->
                      <p v-if="item.size-item.total_player_arrived > '0'">{{item.size-item.total_player_arrived}}</p>
                      <p v-else>0</p>
                    </div>

                  </td>

                  <td>
                    <p v-if="item.released == '1'"><input type="checkbox" id="jack" value="item.player_first_name" v-on:click="teamReleasedCheckbox($event, item.reservation_id)" checked></p>
                    <p v-else><input type="checkbox" value="item.player_first_name" v-on:click="teamReleasedCheckbox($event, item.reservation_id)"></p>
                  </td>

                </tr>
            </table>

        </b-col>
        <!-- end of right div which all table -->
      </b-row>
    </div>

    <br/>

    <div class="bv-example-row" style="width:auto;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

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

     


  </div>
</template>

<script src="moment.js"></script>
<script>
  moment().format();  
</script>


  <script src="vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<!-- <script src="/__/firebase/7.14.0/firebase-app.js"></script> -->

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<!-- <script src="/__/firebase/7.14.0/firebase-analytics.js"></script> -->

<!-- Initialize Firebase -->
<!-- <script src="/__/firebase/init.js"></script> -->

<script>
// import HelloWorld from './components/HelloWorld.vue'
  import axios from 'axios';
  // import VueSignature from "vue-signature-pad";
  // import App from "./App";
  import Vue from 'vue';
  import moment from 'moment';

  import vSelect from "vue-select";
  // import DateDropdown from 'vue-date-dropdown'; // this for the date dropdown

  // import { namesRef } from './firebase';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // ChildComponent
    vSelect
  },

  data(){
    return{
      // url: process.env.VUE_APP_URL,
      // title: process.env.VUE_APP_TITLE,
      value:'',
      searchQuery: '',
      posts: [],
      organizationDetail: [],
      todaydate: moment().format('YYYY-MM-DD'),
      currenttime: moment().format('h:mm A'),
      readyChecked: [],
      lateChecked: [],
      subchildArrived: [],
      subchildWaiver: [],
      subchildNoShow: [],
      selected2: '',

      searchedText:'',

      waiverLists: [],
      waiverListsMinor: [],
      reservationLists: [],
      updateReservationId: '',
      limitReservationList: '5',

      voucherReservationName:'',
      voucherReservationSize:'',
      voucherReservationTime:'',
      voucherEmail: '',
      voucherPhoneNumber: '',
      voucherNumberSelected: '',
      voucherCodeGenrated: '',
      voucherSendEmailButtonActivate: '0',
      voucherSizeDisable: '0',
      
      organizationType:'',

      selectedCustomerName: '',
      selectedDate:'',
      selectedTime:'',
      mission_name:'',
      teamSize:'',
      clickedPlayerList:[],
      personPhoneNumber:'',
      currentTime:'',

      // displayModal: true,
      timeList: [],
      convertedTimeList: '',

      reservationIdForOrganization: '', /* this stores data to update organization_id on reservation table */
      organizationNameList: [], /* list our all the organization name as for dropdown part */
      organizationNameTyped: '',
      organizationTypeSelected: '',
      organizationTypeSelectedNew: '', /** this will create new organization type name **/
      newOrganizationTypeId: '', /** new organization type id **/

      selectedReservationDate:'',
      formatted:'',
      dateClicked: moment().format('YYYY-MM-DD'),

      /** below is to add new reservation **/
      addBookerFirstName: '',
      addBookerLastName: '',
      addBookerEmail: '',
      addBookerPhoneNumber: '',
      addBookerMission: '',
      addBookerTeamSize:'',
      addReservationDate: moment().format('YYYY-MM-DD'),
      reservationTimeHourly: '',
      reservationTimeQuaterly: '',
      reservationAmPm:'',

      addBookerXolaOrderId: '',
      addBookerXolaTravelerId: '',
      addBookerXolaItemId: '',
      addXolaBookerId: '',
      /** end of new reservation detail **/

      /** used on firebase **/
      // username: '',
      // email: '',
      // name: '',
      /** end of firebase array **/

      readyCheckedCategories:[],
      lateCheckedCategories:[],
      getAllReservationList:[],

      onDetailDiv: true,
      itemId: true,

       fieldstable: [
          {
            key: 'customerName',
            sortable: true
          },
          {
            key: 'createdAt',
            sortable: true
          }
        ]
      // timelist: 1500
    }
  },

  computed: {

    // addOrganization: function(){
    //   this.$bvModal.show('modal-center');
    // },

    sortedArray: function() {

      function compare(a, b) {

        // var currentTimeUse = moment().format('h:mm A');

        var subtracttime = moment().subtract(45 , 'minutes');

        var currentTimeUse = moment(subtracttime).format('h:mm A');

        // console.log(currentTimeUse);

        
        b.items[0].arrivalTime =  moment(b.items[0].arrivalTime,"h:mm A").format("h:mm A");
        a.items[0].arrivalTime =  moment(a.items[0].arrivalTime,"h:mm A").format("h:mm A");

        /* in the function below -1 is dont display , 1 true and 0 is false */
        // console.log(currentTimeUse);
        if (b.items[0].arrivalTime > currentTimeUse)
          return 1; /** returening false -1 from both function reverse the time and displays in order */
          if( a.items[0].arrivalTime > currentTimeUse)
          return -1;
          // console.log(b.items[0].arrivalTime);
       
        return 0;
      }

      console.log(compare);
      // console.log(arrivalTime);

      return this.posts.sort(compare);
      // console.log(this.posts);
      console.log("S");
    },

    checkStatus: function(){
      var currentTime = moment().format('HHmm');
      var totalLength = this.clickedPlayerList.length;

      var replyDataObj1 = this.clickedPlayerList;

      for(let i=0; i <= totalLength; i++){
        var reservationTime = this.clickedPlayerList[i].late_status_time;
        var status = currentTime-reservationTime;
        
        replyDataObj1[i]['time_status']=status;
      }

      return status;

    },

    checkLateTime: function(){

      var length = this.posts.length;

      var totalLength = length-1;

      var replyDataObj1 = this.posts;

      var currentTime = moment().format("HHmm");

      for(let i=0; i <= totalLength; i++){
        console.log(i);
        var late_by =  this.posts[i].late_status_time - currentTime;
        // return late_by;
        console.log(late_by+'value');
        replyDataObj1[i]['late_by']=late_by;
      }

      return late_by;

    },

    checkNoShows: function(){

      var length = this.posts.length;

      var totalLength = length;
      
      console.log(totalLength);

      var replyDataObj1 = this.posts;

      for(let i=0; i <= totalLength; i++){
        console.log(i);
        
        console.log(this.posts[i].size);
        
        console.log(this.posts[0]);
        console.log(this.posts[1]);

        console.log(this.posts[i].total_arrived);

        var no_shows = this.posts[i].size - this.posts[i].total_arrived;
        // return no_shows;
        console.log(no_shows+'value');
        replyDataObj1[i]['no_shows']=no_shows;
      }
      console.log(replyDataObj1);

      return no_shows;

      // var noShows = this.posts[0].size - this.posts[0].total_arrived.arrived;
      // return noShows;
    }

  },


mounted: function(){

  this.currentTime = moment().format('HH:mm');

  //   var currentDate = moment().format('YYYY-MM-DD');

  //   const current = new moment().format("hh:mm");


  //  let next15Minutes = moment().add(15, 'minutes');

   

  //  next15Minutes.minutes(Math.floor(next15Minutes.minutes() / 15) * 15);

  // this.timeList.push(next15Minutes.format('h:mm A'));
  //  const timetest = next15Minutes;
  //  const timetest1 = next15Minutes;

  //  for(let i=0;i<5;i++){

  //   if(i<1){
  //         timetest1.subtract(15, 'minutes');
  //          timetest1.minutes(Math.floor(timetest1.minutes() / 15) * 15);
  //          this.timeList.push(timetest1.format('h:mm A'));

  //        }
  //        else{
  //           timetest.add(15, 'minutes');
  //         timetest.minutes(Math.floor(timetest.minutes() / 15) * 15);
  //         this.timeList.push(timetest.format('h:mm A'));


  //      }

  //    }

  //    this.timeList = [ ...new Set(this.timeList) ];
  //    this.timeList.sort(); //this will sort out the time from ascending to descending
  //    this.timeList.reverse(); //used reverse to change asc/desc to desc/asc

  //      axios.get("https://sandbox.xola.com/api/orders?seller=5e1f43c0c697353cf12979e7&items.arrival="+currentDate,
  //       {headers: {'X-API-KEY': 'Af144hp8uKL3ESKoSDlsDR1btaMM4nO1cbdsT8rWvKo'}})
  //    .then(response => (this.posts = response.data.data));

    this.dateClicked = moment().format('YYYY-MM-DD');

    var starttime='start';
    var endtime='end';

    var currentdate = moment().format("YYYY-MM-DD");
    // var currentdate = moment().subtract(6, 'days').format("YYYY-MM-DD");

    var startReservationTime = '08:45:00';
    // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
    var endReservationTime = '23:57:00';
    var currentTime = moment().format("HHmm");
    console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);
    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
    .then(response => 
      {
        console.log(response);
        this.posts = response.data;

        /** Beginning of ARRIVED counting part **/
         var countPostArray = response.data.length-1;
        // console.log(countPostArray);
          var replyDataObj1 = this.posts;

          console.log(this.posts);

          for(let i=0; i <= countPostArray; i++){
            
            // console.log(response.data[i].Reservation_minors.length);
             
            var countReservationPeople = replyDataObj1[i].Reservation_people.length;
            var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
            var reservationForConvert = replyDataObj1[i].reservation_for;

            var date = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A MM-DD-YYYY');

            var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A');

            console.log(reservationForConvert);
            console.log(date);
            console.log(reservationOnlyTime);

            replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

            var lateStatus = moment.utc(reservationForConvert).subtract('hours',4).format('HHmm');
            var lateBy = lateStatus-currentTime;

            var arrivedPerson = 0;
            var arrivedNonPlayer = 0;
            var arrivedPlayer = 0;

            for(let j=0; j < countReservationPeople; j++){

              arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

              /** this will count total non player arrived **/
              if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
              }

              /** this will count total player arrived excluding minors for non-player 0 as false **/
              if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
              }

            }

            var arrivedMinor = 0;
            var arrivedMinorNonPlayer = 0;
            var arrivedMinorPlayer = 0;

            for(let k=0; k < countReservationMinors; k++){

                arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

                if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                  arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
                }

                /** this will count total player arrived for minors for non-player 0 as false **/
                if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                  arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
                }

            }

            console.log(arrivedPerson+' arrived person');
            console.log(arrivedMinor+' arrived minor');

            var arrived = arrivedPerson + arrivedMinor;

            console.log(arrivedNonPlayer+' arrived non player person');
            console.log(arrivedMinorNonPlayer+' arrived non player minor');
            var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
            console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

            console.log(arrivedPlayer+' arrived  player person');
            console.log(arrivedMinorPlayer+' arrived  player minor');
            var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
            console.log("TOTAL  PLAYER = "+totalPlayerArrived);

            // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
            // console.log(arrived);

            replyDataObj1[i]['total_arrived']=arrived;

          
            replyDataObj1[i]['late_status_time']=lateStatus;
            replyDataObj1[i]['late_by']=lateBy;
            replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
            replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

            console.log(currentTime);
            console.log(lateStatus);
            console.log("ARRIVED VALUE"+arrived);

            var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
            replyDataObj1[i]['reservation_id']=reservationId;
          }
          /** END of ARRIVED counting PART **/

      })
    .catch(function (error){
        console.log(error);
      });

        /** this will get us ORGANIZATION TYPE list **/
          axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                // arrived: arrivedValue
              })
              .then(response => 
                {
                  console.log(response);
                  this.organizationTypeList = response.data;
              })

            .catch(function (error){
              console.log(error);
            });
        /** END OF organization type list **/

    // axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{

    // })
    // .then(response => 
    //   {
    //     console.log(response);
    //     this.organizationDetail = response.data;
    //   })
    // .catch(function (error){
    //     console.log(error);
    //   });
  },

/* the function below grabs the time fro axios.get(API) and converts to military time */
updated() {
var arrows = document.getElementsByClassName("covertedtime");

    for(var i = 0; i < arrows.length; i++){
      arrows[i].innerText =  moment(arrows[i].innerText,"h:mm A").format("h:mm A");
    }
},
/*end of the updated function which converts time*/


  methods:{

    changedReservation(event,index,checkPlayer){
      console.log(event);
      console.log(index);
      console.log(checkPlayer);
      if(checkPlayer == 'minor'){
        console.log('Yes Minor');

        var reservationId = event;
        var player_minor_id = this.waiverListsMinor[index].id;

        console.log(reservationId);
        console.log(player_minor_id);

        axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+player_minor_id+'/reservation/'+reservationId,{
          // session_id: 0
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
      else{
        console.log('Player');
        var reservationId = event;
        var personId = this.waiverLists[index].id;

        console.log(reservationId);
        console.log(personId);

        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+personId+'/reservation/'+reservationId);

        axios.post(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+personId+'/reservation/'+reservationId,{
              // session_id: 0
            })
        .then(response => {
          console.log(response);
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    },

    waiverList(){

      this.dateClicked = moment().format('YYYY-MM-DD');

      var starttime='start';
      var endtime='end';

      var currentdate = moment().format("YYYY-MM-DD");
      // var currentdate = moment("2020-11-01").format("YYYY-MM-DD");

      var startPeopleTime = '08:45:00';
      var endPeopleTime = '23:55:00';
      var currentTime = moment().format("HHmm");

      var listLimit = this.limitReservationList;

      // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime);
      // axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime,{

      //   })
      console.log(process.env.VUE_APP_DATABASE_PEOPLE+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit);
      axios.get(process.env.VUE_APP_DATABASE_PEOPLE+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit,{

        })
      .then(response => 
        {
          console.log(response);

          this.waiverLists = response.data;

        })
      .catch(function (error){
          console.log(error);
        });


        /** the below code is for the MINORS LIST **/
      console.log(process.env.VUE_APP_PLAYER_MINORS+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit);
      axios.get(process.env.VUE_APP_PLAYER_MINORS+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit,{

        })
      .then(response => 
        {
          console.log(response);

          this.waiverListsMinor = response.data;

        })
      .catch(function (error){
          console.log(error);
        });


      var startReservationtime = moment().subtract(1, 'hours').format("HH:mm:00");
      var endResevationtime = moment().add(1, 'hours').format("HH:mm:00");

      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationtime+'/'+endtime+'/'+currentdate+'T'+endResevationtime);
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationtime+'/'+endtime+'/'+currentdate+'T'+endResevationtime,{

        })
      .then(response => 
        {
          console.log(response);

          this.reservationLists = response.data;

        })
      .catch(function (error){
          console.log(error);
        });

        /** END of MINORS LIST **/

      this.$bvModal.show('modal-waiverList');
    },

    convertReservationTime(date){
      return moment(date).format('h:mm A');
      console.log(date);
    },

    hideVoucherModal(){
      this.$bvModal.hide('modal-vouchers');
    },

    getVoucherCode(event, totalVoucher){
      console.log(event);
      console.log('size of vouchers '+totalVoucher);
      if(totalVoucher > '0'){
        this.voucherSendEmailButtonActivate = '1';
        this.voucherCodeGenrated = 'axios get code for size '+' '+totalVoucher;
      }
      else{
        this.voucherCodeGenrated = ' ';
      }
      
    },

    forwardedEmailVouchers(event,reservationId){
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
        
      })
      .then(response => {
        console.log(response);
        var firstName = response.data.Booker.Person.first_name;
        var lastName = response.data.Booker.Person.last_name;

        if(firstName == null || firstName == 'undefined'){
          var firstName = ' ';
        }
        if(lastName == null || lastName == 'undefined'){
          var lastName = ' ';
        }

        this.voucherReservationName = firstName+' '+lastName;
        this.voucherReservationTime = response.data.reservation_for;
        this.voucherReservationSize = response.data.size;

        var peopleId = response.data.Booker.Person.id;
        /** this will get the booker email and phone number using its person_id **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{
        
        })
        .then(response => {
          console.log(response);
          this.voucherSizeDisable = '1'; /** this will disable dropdown once the voucher email was sent **/

          this.voucherEmail = response.data.email;
          this.voucherPhoneNumber = response.data.phone;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of get for person_id **/

        /**  this will get us the detail for voucher ID used **/
        this.voucherNumberSelected = '3';
        this.voucherCodeGenrated = 'XAH89U';
        this.voucherSendEmailButtonActivate = '1';
        /** end of get voucher detail **/

      })
      .catch(function (error) {
        console.log(error);
      });

      this.$bvModal.show('modal-vouchers');
    },

    noShowsVoucher(event, reservationId){
      console.log(event);
      console.log('reservation id is '+reservationId);

      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
        
      })
      .then(response => {
        console.log(response);
        var firstName = response.data.Booker.Person.first_name;
        var lastName = response.data.Booker.Person.last_name;

        if(firstName == null || firstName == 'undefined'){
          var firstName = ' ';
        }
        if(lastName == null || lastName == 'undefined'){
          var lastName = ' ';
        }

        this.voucherReservationName = firstName+' '+lastName;
        this.voucherReservationTime = response.data.reservation_for;
        this.voucherReservationSize = response.data.size;

        var peopleId = response.data.Booker.Person.id;
        /** this will get the booker email and phone number using its person_id **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{
        
        })
        .then(response => {
          console.log(response);
          this.voucherEmail = response.data.email;
          this.voucherPhoneNumber = response.data.phone;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of get for person_id **/

      })
      .catch(function (error) {
        console.log(error);
      });

      this.$bvModal.show('modal-vouchers');
    },

    updateReservationCreated(event,reservationId,updateValue){
      console.log(event);
      console.log(reservationId);
      console.log(updateValue);
      axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
        reservation_cancelled: updateValue
      })
      .then(response => {
        console.log(response);
        // this.reloadPageEvent();
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getDetailByEmail(){
      console.log('inside email function');

      console.log(this.addBookerEmail.length);
      console.log('value' + this.addBookerEmail);

      if(this.addBookerEmail.length > '10'){
        console.log('email used was greater than 10');

        var email = this.addBookerEmail;

        axios.post(process.env.VUE_APP_DATABASE_PEOPLE+'find_or_create/'+email,{

        })
        .then(response => {
          console.log(response);
          console.log(response.data[0].id);

          this.addBookerFirstName = response.data[0].first_name;
          this.addBookerLastName = response.data[0].last_name;
          this.addBookerPhoneNumber = response.data[0].phone;

        })


      }
      else{
        console.log('Email field was empty or less than 10');
      }
    },

    clickedSubmitReservation(){
      console.log('submitted reservation');

      var firstName = this.addBookerFirstName.toLowerCase();
      var lastName = this.addBookerLastName.toLowerCase();
      var phoneNumber = this.addBookerPhoneNumber;
      var bookerEmail = this.addBookerEmail.toLowerCase();
      var mission = this.addBookerMission;
      var teamSize = this.addBookerTeamSize;
      var battleMode = 0;
      var onlineReservation = 0;

      var amPm = this.reservationAmPm;
      if(amPm == 'AM'){
        console.log('AM');
        var b = this.reservationTimeHourly;
        console.log(b);
      }
      if(amPm == 'PM'){
        console.log( 'PM ');
        var b = parseInt(this.reservationTimeHourly);

        if(b == 12){
          console.log('it was 12 '+ b);
          var b = 12;
        }
        else{
          console.log('not 12 '+b);
          b += 12;
        }

      }

      console.log('date was '+this.addReservationDate);
      console.log('hour value as b was '+b);
      console.log('reservation time quaterly '+this.reservationTimeQuaterly);

      var reservationDateTime = this.addReservationDate+' '+b+':'+parseInt(this.reservationTimeQuaterly)+':00';
      console.log(reservationDateTime);

      /** find or create person **/
      console.log(firstName);
      console.log(lastName);
      console.log(bookerEmail);

        axios.post(process.env.VUE_APP_DATABASE_PEOPLE+'find_or_create/email/'+bookerEmail+'/first_name/'+firstName+'/last_name/'+lastName,{
          phone: phoneNumber
        })
        .then(response => {
          console.log("Added to people table on url loaded with value");
          console.log(response);
          console.log(response.data[0].id); 

          var peopleId = response.data[0].id;

            console.log(process.env.VUE_APP_DATABASE_PLAYERS+'find_or_create/'+peopleId);

            axios.post(process.env.VUE_APP_DATABASE_PLAYERS+'find_or_create/'+peopleId,{
              // person_id: peopleId /** this will update people id from people table not person id **/
            })
            .then(response => {
              console.log(response);
              console.log("Create player id");
            })


            axios.post(process.env.VUE_APP_BOOKERS+'find_or_create/person/'+peopleId,{
              // person_id: peopleId /** this will update people id from people table not person id **/
            })
            .then(response => {
              console.log("Xola Booker Id response below");
              console.log(response);

              var xolaBookerId = response.data.xola_booker_id;
              var bookerId = response.data.id;

              var xolaOrderId = 'addedreservation'+phoneNumber;
              var xolaItemId = 'addedreservation'+phoneNumber;

              axios.post(process.env.VUE_APP_RESERVATIONS+'find_or_create/booker/'+bookerId,{
              // person_id: peopleId /** this will update people id from people table not person id **/
                // location_id: 1,
                // size: this.addBookerTeamSize,
                // mission_id: this.addBookerMission,
                // reservation_for: reservationDateTime
                // battlemode: 0,
                // online_reservation: 0,
                // xola_order_id: xolaOrderId,
                // xola_item_id: xolaItemId
              })
              .then(response => {
                console.log("Xola Reservation detail is below");
                console.log(response);
                console.log("this was the reservation id "+response.data[0].id);
               
                // this.reloadPageEvent();

              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of find or create reservation **/

            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of find or create booker **/


          // var peopleId = response.data[0].id;

          // /** axios post to PLAYERS TABLE **/
          // axios.post(process.env.VUE_APP_DATABASE_PLAYERS+'find_or_create/'+peopleId,{

          // })
          // .then(response => {
          //   console.log(response);
          //   console.log(response.data[0].id);

          //   var personId = response.data[0].id;

          //   /** find or create booker **/
          //   // var xolaBookerId = this.addXolaBookerId;
          //   var defaultId = 'btbdefaultid'+this.addBookerPhoneNumber;
          //   var xolaBookerId = defaultId;
          //   axios.post(process.env.VUE_APP_BOOKERS+'find_or_create/'+xolaBookerId,{
          //     person_id: peopleId /** this will update people id from people table not person id **/
          //   })
          //   .then(response => {
          //     console.log("Xola Booker Id response below");
          //     console.log(response);
              

          //     var bookerId = response.data[0].id;

          //     /** find or create reservation **/

          //     // var xolaOrderId = this.addBookerXolaOrderId;
          //     // var xolaItemId = this.addBookerXolaItemId;
          //     // var xolaExperienceItemId = this.addBookerXolaTravelerId;
          //     var xolaOrderId = defaultId;
          //     var xolaItemId = defaultId;
          //     var xolaExperienceItemId = defaultId;
          //     var totalAmount = parseInt(teamSize)*44.95;

          //     axios.post(process.env.VUE_APP_RESERVATIONS+'find_or_create/xola_order_id/'+xolaOrderId+'/xola_item_id/'+xolaItemId,{
          //       size: teamSize,
          //       booker_id: bookerId,
          //       final_dollar_amount: totalAmount,
          //       reservation_for: reservationDateTime,
          //       location_id: 1,
          //       mission_id: mission,
          //       experience_item_id: xolaItemId
          //     })
          //     .then(response => {
          //       console.log(response);

          //       this.reloadPageEvent();

          //     })
          //     .catch(function (error) {
          //       console.log(error);
          //     });

          //     /** end of find or create reservation **/


          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          //   /** end of find or create booker **/


          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          // /** END OF axios post PLAYER detail **/

        })
        .catch(function (error) {
          console.log(error);
        });

      /** end of find or create person **/


    },

    searchPlayers(){
      console.log('san search search');
      console.log(this.searchedText);

      var searchThisText = this.searchedText;
      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/search/'+searchThisText);

          axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/search/'+searchThisText,{

            })
          .then(response => 
            {
              console.log(response);
              this.posts = response.data;

              /** Beginning of ARRIVED counting part **/
               var countPostArray = response.data.length-1;
              // console.log(countPostArray);
                var replyDataObj1 = this.posts;

                console.log(this.posts);

                for(let i=0; i <= countPostArray; i++){
                  
                  // console.log(response.data[i].Reservation_minors.length);
                   
                  var countReservationPeople = replyDataObj1[i].Reservation_people.length;
                  var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
                  var reservationForConvert = replyDataObj1[i].reservation_for;

                  var date = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A MM-DD-YYYY');

                  var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A');

                  console.log(reservationForConvert);
                  console.log(date);
                  console.log(reservationOnlyTime);

                  replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

                  var lateStatus = moment.utc(reservationForConvert).subtract('hours',4).format('HHmm');
                  console.log(lateStatus);

                  var currentTime = moment(response.data.createdAt).subtract('hours',4).format("HHmm");
                  console.log('current time '+currentTime);

                  var lateBy = lateStatus-currentTime;

                  var arrivedPerson = 0;
                  var arrivedNonPlayer = 0;
                  var arrivedPlayer = 0;

                  for(let j=0; j < countReservationPeople; j++){

                    arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

                    /** this will count total non player arrived **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                      arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
                    }

                    /** this will count total player arrived excluding minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                      arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
                    }

                  }

                  var arrivedMinor = 0;
                  var arrivedMinorNonPlayer = 0;
                  var arrivedMinorPlayer = 0;

                  for(let k=0; k < countReservationMinors; k++){

                      arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

                      if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                        arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
                      }

                      /** this will count total player arrived for minors for non-player 0 as false **/
                      if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                        arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
                      }

                  }

                  console.log(arrivedPerson+' arrived person');
                  console.log(arrivedMinor+' arrived minor');

                  var arrived = arrivedPerson + arrivedMinor;

                  console.log(arrivedNonPlayer+' arrived non player person');
                  console.log(arrivedMinorNonPlayer+' arrived non player minor');
                  var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
                  console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

                  console.log(arrivedPlayer+' arrived  player person');
                  console.log(arrivedMinorPlayer+' arrived  player minor');
                  var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
                  console.log("TOTAL  PLAYER = "+totalPlayerArrived);

                  // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
                  // console.log(arrived);

                  replyDataObj1[i]['total_arrived']=arrived;

                
                  replyDataObj1[i]['late_status_time']=lateStatus;
                  replyDataObj1[i]['late_by']=lateBy;
                  replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
                  replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

                  console.log(currentTime);
                  console.log(lateStatus);
                  console.log("ARRIVED VALUE"+arrived);

                  var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
                  replyDataObj1[i]['reservation_id']=reservationId;
                }
                /** END of ARRIVED counting PART **/

            })
          .catch(function (error){
              console.log(error);
            });

              /** this will get us ORGANIZATION TYPE list **/
                axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                      // arrived: arrivedValue
                    })
                    .then(response => 
                      {
                        console.log(response);
                        this.organizationTypeList = response.data;
                    })

                  .catch(function (error){
                    console.log(error);
                  });
        /** END OF organization type list **/
    },

    onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted;
        // The following will be an empty string until a valid date is entered
        this.selectedReservationDate = ctx.selectedYMD;

        console.log("CHANGED DATE");
        console.log(this.selectedReservationDate);
        console.log(this.formatted);


    /** this will now change the check in list following the date **/

          var starttime='start';
          var endtime='end';

          // var currentdate = moment().format("YYYY-MM-DD");
          var convertDate = this.selectedReservationDate;

          var currentdate = moment(convertDate).format("YYYY-MM-DD");

          console.log(currentdate+ ' was the current date format');

          var startReservationTime = '08:45:00';
          // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
          var endReservationTime = '23:57:00';
          var currentTime = moment().format("HHmm");
          console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);
          axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

            })
          .then(response => 
            {
              console.log(response);
              this.posts = response.data;

              /** Beginning of ARRIVED counting part **/
               var countPostArray = response.data.length-1;
              // console.log(countPostArray);
                var replyDataObj1 = this.posts;

                console.log(this.posts);

                for(let i=0; i <= countPostArray; i++){
                  
                  // console.log(response.data[i].Reservation_minors.length);
                   
                  var countReservationPeople = replyDataObj1[i].Reservation_people.length;
                  var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
                  var reservationForConvert = replyDataObj1[i].reservation_for;

                  var date = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A MM-DD-YYYY');

                  var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A');

                  console.log(reservationForConvert);
                  console.log(date);
                  console.log(reservationOnlyTime);

                  replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

                  var lateStatus = moment.utc(reservationForConvert).subtract('hours',4).format('HHmm');
                  var lateBy = lateStatus-currentTime;

                  var arrivedPerson = 0;
                  var arrivedNonPlayer = 0;
                  var arrivedPlayer = 0;

                  for(let j=0; j < countReservationPeople; j++){

                    arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

                    /** this will count total non player arrived **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                      arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
                    }

                    /** this will count total player arrived excluding minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                      arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
                    }

                  }

                  var arrivedMinor = 0;
                  var arrivedMinorNonPlayer = 0;
                  var arrivedMinorPlayer = 0;

                  for(let k=0; k < countReservationMinors; k++){

                      arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

                      if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                        arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
                      }

                      /** this will count total player arrived for minors for non-player 0 as false **/
                      if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                        arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
                      }

                  }

                  console.log(arrivedPerson+' arrived person');
                  console.log(arrivedMinor+' arrived minor');

                  var arrived = arrivedPerson + arrivedMinor;

                  console.log(arrivedNonPlayer+' arrived non player person');
                  console.log(arrivedMinorNonPlayer+' arrived non player minor');
                  var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
                  console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

                  console.log(arrivedPlayer+' arrived  player person');
                  console.log(arrivedMinorPlayer+' arrived  player minor');
                  var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
                  console.log("TOTAL  PLAYER = "+totalPlayerArrived);

                  // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
                  // console.log(arrived);

                  replyDataObj1[i]['total_arrived']=arrived;

                
                  replyDataObj1[i]['late_status_time']=lateStatus;
                  replyDataObj1[i]['late_by']=lateBy;
                  replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
                  replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

                  console.log(currentTime);
                  console.log(lateStatus);
                  console.log("ARRIVED VALUE"+arrived);

                  var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
                  replyDataObj1[i]['reservation_id']=reservationId;
                }
                /** END of ARRIVED counting PART **/

            })
          .catch(function (error){
              console.log(error);
            });

              /** this will get us ORGANIZATION TYPE list **/
                axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                      // arrived: arrivedValue
                    })
                    .then(response => 
                      {
                        console.log(response);
                        this.organizationTypeList = response.data;
                    })

                  .catch(function (error){
                    console.log(error);
                  });
        /** END OF organization type list **/


    /** end of changing reservation date **/ 


      },

    // dateDisabled(ymd, date) {
    //     const weekday = date.getDay();
    //     const day = date.getDate();
    //     return weekday === 0 || weekday === 6 || day === 13;
    //   },

    organizationnNameUpdate: function(event, organizationNameTyped){
      console.log("Inside add organization name");
      console.log(event);
      var orgName = organizationNameTyped.toLowerCase().trim();
      // console.log('org name lower case '+orgName);

      var reservationId = this.reservationIdForOrganization;
      var orgTypeName = this.organizationTypeSelected;

      console.log('organization type id '+ orgTypeName);

      console.log(orgName.length);

      if(orgName.length > '1'){
        console.log('yes greater than 1');

          if(orgTypeName == 'createNewOrganization'){ /** if they click on create new input field for organization type **/
            var orgTypeName = this.organizationTypeSelectedNew;
            console.log('Org Type Name was '+orgTypeName);
            axios.post(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                    name: orgTypeName
                  })
                  .then(response => {
                    console.log(response);
                    console.log(response.data.id);
                    this.newOrganizationTypeId = response.data.id;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

            // var orgName = this.newOrganizationTypeId;
          }
          else{
            this.newOrganizationTypeId = this.organizationTypeSelected;
            console.log('Old Organication Type '+ this.newOrganizationTypeId);
          }

          console.log('Organization ID '+this.newOrganizationTypeId);

          /** this will give the ORGANIZATION ID **/
          axios.post(process.env.VUE_APP_DTB_ORGANIZATION+'/find_or_create/organization_name/'+orgName,{
                // arrived: arrivedValue
                organization_type_id: this.newOrganizationTypeId
              })

              .then(response => 
                {
                  console.log(response);
                  console.log(response.data);
                  console.log(response.data[0].id);

                  var organizationId = response.data[0].id;

                  /** NOW UPDATE ORGANIZATION ID on RESERVATION ID **/
                    axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
                      organization_id: organizationId
                    })
                    .then(response => {
                      console.log(response);

                      window.location.reload(true);

                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  /** END OF UPDATE of ORGANIZATION ID on RESERVATION ID **/

                })
              .catch(function (error) {
                  console.log(error);
              });
          /** END OF ORGANIZATION ID **/

      }

      else{
        console.log('null organization name');
      }


      

    },

    reloadPageEvent: function(){
      console.log("INSIDE RELOAD FUNCTION");
      window.location.reload(true);
    },

    filterItems: function(posts) {
      var app = this;

      return posts.filter(function(post) {
        let regex = new RegExp('(' + app.searchQuery + ')', 'i');
        return post.customerName.match(regex);
   
      })
    },

    submitName(){
      namesRef.push({ name: this.name, email: this.email, username: this.username});
      console.log("DATA INSERTED");
      console.log(this.name +' thank you for submitting');
    },

    readycheck: function(e) {
      if (e.target.checked) {
        console.log(e.target.value)
      }
    },

    latecheck: function(e) {
      if (e.target.checked) {
        console.log(e.target.value)
      }
    },

    teamReleasedCheckbox(event, reservation_id){

      console.log(event);
      console.log(reservation_id);

      if(event.target.checked == true){
        var realeasedValue = '1';
      }
      if(event.target.checked == false){
        var realeasedValue = '0';
      }

      console.log(realeasedValue);

        console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+reservation_id);
        axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservation_id,{
                released: realeasedValue
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
      
    },

    arrivedCheckbox(event, res_people_or_minor_table_id, minor_tag){
      console.log(event);
      console.log(res_people_or_minor_table_id);
      console.log(minor_tag);
      // console.log(value);

      console.log(event.target.checked);

      if(event.target.checked == true){
        var arrivedValue = '1';
      }
      if(event.target.checked == false){
        var arrivedValue = '0';
      }

      console.log(arrivedValue);

      var reservation_table_id = res_people_or_minor_table_id;
      if(minor_tag == 'M'){
        console.log('YES MINOR'+arrivedValue);
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservation_table_id,{
            arrived: arrivedValue
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
        console.log('NOT MINOR'+arrivedValue);
        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id);
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id,{
                arrived: arrivedValue
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
      }
    },

    updateReservationSession(event, res_people_or_minor_table_id, minor_tag){
      console.log(event);
      console.log(res_people_or_minor_table_id);
      console.log(minor_tag);
      console.log(event.target.checked);

      if(minor_tag == 'M'){
        console.log('Minors as player');
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+res_people_or_minor_table_id,{
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

        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+res_people_or_minor_table_id,{
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

    nonPlayerCheckbox(event, res_people_or_minor_table_id, minor_tag){
      console.log(event);
      console.log(res_people_or_minor_table_id);
      console.log(minor_tag);
      // console.log(value);

      console.log(event.target.checked);

      if(event.target.checked == true){
        var non_player_value = '0';
      }
      if(event.target.checked == false){
        var non_player_value = '1';
      }

      console.log(non_player_value);

      var reservation_table_id = res_people_or_minor_table_id;
      if(minor_tag == 'M'){
        console.log('YES MINOR'+non_player_value);
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservation_table_id,{
            non_player: non_player_value
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
        console.log('NOT MINOR'+non_player_value);
        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id);
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id,{
                non_player: non_player_value
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
      }
    },

   //  addRecord: function(){

   //   if(this.username != '' && this.name != '' && this.email != ''){
   //     axios.post('./assets/config.php', {
   //       request: 2,
   //       username: this.username,
   //       name: this.name,
   //       email: this.email
   //     })
   //     .then(function (response) {

   //       // Fetch records
   //       app.allRecords();

   //       // Empty values
   //       app.username = '';
   //       app.name = '';
   //       app.email = '';
 
   //       alert(response.data);
   //     })
   //     .catch(function (error) {
   //       console.log(error);
   //     });
   //   }else{
   //     alert('Fill all fields.');
   //   }
 
   // },

    // postfirebase:function(){
    //   this.$http.post('https://vueonboard.firebaseio.com/posts.json',this.blog).then(function(data){
    //     // console.log(data);
    //     // console.log(username);
    //     this.submitted = true;
    //   });
    // },

    /* the function below displays only one modal for particular customer clicked */
    selectItem (event, posts, item, index) {

      console.log(event);
      console.log(posts);
      console.log(item);
      console.log(index);

      if(this.posts[index].Booker.Person.last_name == 'undefined'){
        var bookerLastName = ' ';
      }
      else{
        var bookerLastName = this.posts[index].Booker.Person.last_name;
      }


      if(this.posts[index].Booker.Person.first_name == 'undefined'){
         var bookerFirstName = ' ';
      }
      else{
        var bookerFirstName = this.posts[index].Booker.Person.first_name;
      }


      if(this.posts[index].Mission.name == 'undefined'){
         var missionName = ' ';
      }
      else{
        var missionName = this.posts[index].Mission.name;
      }


      if(this.posts[index].reservation_for == 'undefined'){
        var date = ' ';
      }
      else{
        var date = this.posts[index].reservation_for;
      }


      if(this.posts[index].size == 'undefined'){
        var teamSizeItem = ' ';
      }
      else{
        var teamSizeItem = this.posts[index].size;
      }


      var bookerName = bookerFirstName+' '+bookerLastName;
      // var missionName = this.posts[index].Mission.name;
      // var teamSizeItem = this.posts[index].size;
      
      /** conversion of date and time for second part **/
        // var date = this.posts[index].reservation_for;

        var reservation_for_converted = moment.utc(date).subtract('hours',4).format('hh:mm A MM-DD-YYYY');
        var onlyDate = moment.utc(date).format('MM-DD-YYYY');
        var timeConverted = moment.utc(date).subtract('hours',4).format('hh:mm A');

        console.log(reservation_for_converted);
        console.log(index);
        console.log(this.posts[index]);

        // var arr = reservation_for.split("T");
        // var onlyDate = arr.splice(0,1).join("");
        // console.log(onlyDate);

        // var onlyTime = arr.join("T");
        // console.log(onlyTime);

        // var twoDigits = onlyTime.substring(0, 2);
        // console.log(twoDigits);
        // var time1 = twoDigits-4;
        // console.log(time1);

        // var time2 = time1-12;
        // console.log(time2);

        // if(time1 >= 12){
        //   console.log("PM");
        //   var ampm = "PM";
        // }
        // else{
        //   console.log("AM");
        //   var ampm = "AM";
        // }

        // var posNegTime = Math.abs(time1);
        // var onlyTime = arr.join("T");
        // var twoDigits = onlyTime.substring(3, 5);
        // console.log(twoDigits);

        // var timeConverted = posNegTime+':'+twoDigits+' '+ampm;
        // var timeConvertedWithoutAMPM = posNegTime+':'+twoDigits;
        // console.log(timeConverted);
      /** end of date and time converted for second part **/


      /** create object which grabs both MINOR and NON-MINOR in the same column **/
      
      if(this.posts[index].Reservation_people[0].loop_value == undefined){
        // console.log("undefined cha hai");
        var countReservationPeople = this.posts[index].Reservation_people.length;
        console.log(countReservationPeople);

        var replyDataObj1 = item;
        for(let i=0; i < countReservationPeople; i++){
        
        console.log(i);
        // console.log(item);
        // console.log(this.posts[index].Reservation_people);
        // console.log(this.posts[index].Reservation_people[i]);
        // console.log(this.posts[index].Reservation_people[i].Person.first_name);



        if(this.posts[index].Reservation_people[i].Person.Player.bomb_beater == 'undefined'){
          var bomb_beater = '0';
        }
        else{
          var bomb_beater = this.posts[index].Reservation_people[i].Person.Player.bomb_beater;
        }

        /** below code is for the REPEATERS **/
        if(this.posts[index].Reservation_people[i].Person.Player.play_count == 'undefined'){
          var repeated_players = '0';
        }
        else{
          var repeated_players = this.posts[index].Reservation_people[i].Person.Player.play_count;
        }



        if(this.posts[index].Reservation_people[i].Person.first_name == 'undefined'){
          var player_first_name = ' ';
        }
        else{
          var player_first_name = this.posts[index].Reservation_people[i].Person.first_name;
        }

        if(this.posts[index].Reservation_people[i].Person.last_name == 'undefined'){
          var player_last_name = ' ';
        }
        else{
          var player_last_name = this.posts[index].Reservation_people[i].Person.last_name;
        }

        if(this.posts[index].Reservation_people[i].Person.phone == 'undefined'){
          var player_cell_number = ' ';
        }
        else{
          var player_cell_number = this.posts[index].Reservation_people[i].Person.phone;
        }

        if(this.posts[index].Reservation_people[i].Person.id == 'undefined'){
          var player_person_id = ' ';
        }
        else{
          var player_person_id = this.posts[index].Reservation_people[i].Person.id;
        }

        if(this.posts[index].Mission.name == 'undefined'){
          var missionName = ' ';
        }
        else{
          var missionName = this.posts[index].Mission.name;
        }

        if(this.posts[index].Mission.id == 'undefined'){
          var missionId = ' ';
        }
        else{
          var missionId = this.posts[index].Mission.id;
        }


        if(this.posts[index].Reservation_people[i].arrived == 'undefined'){
          var arrived = ' ';
        }
        else{
          var arrived = this.posts[index].Reservation_people[i].arrived;
        }


        if(this.posts[index].Reservation_people[i].non_player == 'undefined'){
          var non_player_value = ' ';
        }
        else{
          var non_player_value = this.posts[index].Reservation_people[i].non_player;
        }


        if(this.posts[index].Reservation_people[i].id == 'undefined'){
          var reservation_people_minor_table_id = ' ';
          var reservation_people_minor_only_id = ' ';
        }
        else{
          var reservation_people_minor_table_id = this.posts[index].Reservation_people[i].id;
          var reservation_people_minor_only_id = ' ';
        }

        // console.log(this.posts[index].Reservation_people[i].session_id);

        if(this.posts[index].Reservation_people[i].session_id == 'undefined'){
          var reservation_people_session_id = ' ';
        }
        else{
          var reservation_people_session_id = this.posts[index].Reservation_people[i].session_id;
        }


        // var player_first_name = this.posts[index].Reservation_people[i].Person.first_name;
        // var player_last_name = this.posts[index].Reservation_people[i].Person.last_name;
        // var player_cell_number = this.posts[index].Reservation_people[i].Person.phone;
        var player_full_name = player_first_name+' '+player_last_name;

        // var player_person_id = this.posts[index].Reservation_people[i].Person.id;

        // var missionName = this.posts[index].Mission.name;
        // var missionId = this.posts[index].Mission.id;

        // var arrived = this.posts[index].Reservation_people[i].arrived;
        // var non_player_value = this.posts[index].Reservation_people[i].non_player;

        // var reservation_people_minor_table_id = this.posts[index].Reservation_people[i].id;
        var reservation_for = reservation_for_converted;
        console.log(player_full_name);
        console.log(player_person_id);
        // var booker_id = response.data[i].Booker.Person.id;
        // var objectValue = i++;
            console.log(i);
            // var namebana = 'NameMe';

            replyDataObj1['Reservation_people'][i]={
              "person_id": player_person_id,
              // "player_id": player_id,
              "reservation_people_minor_table_id": reservation_people_minor_table_id,
              "player_first_name": player_first_name,
              "player_last_name": player_last_name,
              "player_full_name": player_full_name,
              "player_cell_number": player_cell_number,
              "minor_tag": "",
              // "play_count": playCount,
              "mission_name": missionName,
              "mission_id": missionId,
              "loop_value": 1,
              "arrived": arrived,
              "reservation_for": reservation_for,
              "non_player": non_player_value,
              "reservation_session_id": reservation_people_session_id,
              "player_bomb_beater_status": bomb_beater,
              "player_repeaters": repeated_players
            }

            this.clickedPlayerList = replyDataObj1;
            console.log(replyDataObj1);

            this.personPhoneNumber = player_cell_number;
            // if(this.posts[index].Reseservation_people)

          }

          

          console.log(this.clickedPlayerList.Reservation_people.length);
          var replyDataObj1 = item;
          var reservationPeopleLength = this.clickedPlayerList.Reservation_people.length;
          var countReservationMinor = this.posts[index].Reservation_minors.length;
          console.log(countReservationMinor);

          for(let i=0; i < countReservationMinor; i++){
            
            console.log(item);
            var nonMinorPhone = this.personPhoneNumber;



            // console.log(this.posts[index].Reservation_minors[i].Player_minor.bomb_beater);

            if(this.posts[index].Reservation_minors[i].Player_minor.bomb_beater == 'undefined'){
                var minor_bomb_beater = 0;
              }
              else{
                var minor_bomb_beater = this.posts[index].Reservation_minors[i].Player_minor.bomb_beater;
              }




              if(this.posts[index].Reservation_minors[i].Player_minor.first_name == 'undefined'){
                var minor_first_name = ' ';
              }
              else{
                var minor_first_name = this.posts[index].Reservation_minors[i].Player_minor.first_name;
              }


              if(this.posts[index].Reservation_minors[i].Player_minor.last_name == 'undefined'){
                var minor_last_name = ' ';
              }
              else{
                var minor_last_name = this.posts[index].Reservation_minors[i].Player_minor.last_name;
              }


              if(this.posts[index].Reservation_minors[i].Player_minor.id == 'undefined'){
                var minor_person_id = ' ';
              }
              else{
                var minor_person_id = this.posts[index].Reservation_minors[i].Player_minor.id;
              }


              if(this.posts[index].Reservation_minors[i].Player_minor.player_id == 'undefined'){
                var minor_player_id = ' ';
              }
              else{
                var minor_player_id = this.posts[index].Reservation_minors[i].Player_minor.player_id;
              }


              if(this.posts[index].Mission.name == 'undefined'){
                var missionName = ' ';
              }
              else{
                var missionName = this.posts[index].Mission.name;
              }


              if(this.posts[index].Mission.id == 'undefined'){
                var missionId = ' ';
              }
              else{
                var missionId = this.posts[index].Mission.id;
              }


              if(this.posts[index].Reservation_minors[i].arrived == 'undefined'){
                var minorArrived = ' ';
              }
              else{
                var minorArrived = this.posts[index].Reservation_minors[i].arrived;
              }


              if(this.posts[index].Reservation_minors[i].non_player == 'undefined'){
                var non_player_minor_value = ' ';
              }
              else{
                var non_player_minor_value = this.posts[index].Reservation_minors[i].non_player;
              }


              if(this.posts[index].Reservation_minors[i].id == 'undefined'){
                var reservation_people_minor_table_id = ' ';
              }
              else{
                var reservation_people_minor_table_id = this.posts[index].Reservation_minors[i].id;
              }

              console.log(this.posts[index].Reservation_minors[i]);

              if(this.posts[index].Reservation_minors[i].session_id == 'undefined'){
                var reservation_people_session_id = ' ';
              }
              else{
                var reservation_people_session_id = this.posts[index].Reservation_minors[i].session_id;
              }


            // var minor_first_name = this.posts[index].Reservation_minors[i].Player_minor.first_name;
            // var minor_last_name = this.posts[index].Reservation_minors[i].Player_minor.last_name;
            var player_cell_number = nonMinorPhone;
            var minor_full_name = minor_first_name+' '+minor_last_name;
            // var minor_person_id = this.posts[index].Reservation_minors[i].Player_minor.id;
            // var minor_player_id = this.posts[index].Reservation_minors[i].Player_minor.player_id;
            // var missionName = this.posts[index].Mission.name;
            // var missionId = this.posts[index].Mission.id;
            // var minorArrived = this.posts[index].Reservation_minors[i].arrived;
            // var non_player_minor_value = this.posts[index].Reservation_minors[i].non_player;
            // var reservation_people_minor_table_id = this.posts[index].Reservation_minors[i].id;
            var reservation_for = reservation_for_converted;

            console.log(i);
            
            console.log(minorArrived);
            console.log(this.posts[index].Reservation_minors);

            var objectValue = reservationPeopleLength + i;
            console.log(objectValue);

            replyDataObj1['Reservation_people'][objectValue]={
              "person_id": minor_person_id,
              "player_id": minor_player_id,
              "reservation_people_minor_table_id": reservation_people_minor_table_id,
              "player_first_name": minor_first_name,
              "player_last_name": minor_last_name,
              "player_full_name": minor_full_name,
              "player_cell_number": player_cell_number,
              "minor_tag": "M",
              "play_count": "1",
              "mission_name": missionName,
              "mission_id": missionId,
              "arrived": minorArrived,
              "reservation_for": reservation_for,
              "non_player": non_player_minor_value,
              "reservation_session_id": reservation_people_session_id,
              "player_bomb_beater_status": minor_bomb_beater
            }

            // this.clickedPlayerList = replyDataObj1;
            // console.log(replyDataObj1);

          }
      
      }

      /** end of MINOR and NON-MINOR same column **/


      this.selectedCustomerName = bookerName;
      this.selectedDate = onlyDate;
      this.selectedTime = timeConverted;
      this.mission_name = missionName;
      this.teamSize = teamSizeItem;

      console.log(bookerName);
      // console.log(reservation_for);
      // this.selectedCustomerName = 
      // console.log(this.posts);
      // this.selectedCustomerName = posts.customerName /*this.selectedCustomerName pass the value to data return() */
      // var bookerName = this.selectedCustomerName
      this.$bvModal.show('modal-xl');

      /** this function should reload the page **/
      
      /** end of reload function **/

     },

     addOrganization(event, index) {

      console.log("event "+event+" index "+ index);

      console.log(this.posts[index]);

      var reservationIdForOrganization = this.posts[index].reservation_id;

      console.log(reservationIdForOrganization);

      this.reservationIdForOrganization = reservationIdForOrganization;

      axios.get(process.env.VUE_APP_DTB_ORGANIZATION,{

        })
      .then(response => 
        {
          console.log(response);
          this.organizationNameList = response.data;
        }
      )
      .catch(function (error){
        console.log(error);
      });

      console.log("inside add organization");

      this.$bvModal.show('modal-organization');

     },


     addReservation(){
      console.log('Add Reservation Bruh');
      this.$bvModal.show('modal-addReservation');
     },

     updateReservation(){

      console.log(this.dateClicked);
      var currentdate = this.dateClicked;
      var startReservationtime = '08:45:00';
      var endResevationtime = '23:50:00';

      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'getall_checkin/start/'+currentdate+'T'+startReservationtime+'/end/'+currentdate+'T'+endResevationtime,{

      })
      .then(response => 
        {
          console.log(response);

          console.log(response);
        this.getAllReservationList = response.data;

        /** Beginning of ARRIVED counting part **/
         var countPostArray = response.data.length-1;
        // console.log(countPostArray);
          var replyDataObj1 = this.getAllReservationList;

          console.log(this.getAllReservationList);

          for(let i=0; i <= countPostArray; i++){
            
            // console.log(response.data[i].Reservation_minors.length);
             
            
            var reservationForConvert = replyDataObj1[i].reservation_for;
            var date = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A MM-DD-YYYY');
            var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',4).format('hh:mm A');

            console.log(reservationForConvert);
            console.log(date);
            console.log(reservationOnlyTime);

            var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
            replyDataObj1[i]['reservation_id']=reservationId;
            replyDataObj1[i]['reservation_time']=reservationOnlyTime;
          }
          /** END of ARRIVED counting PART **/

        })
      .catch(function (error){
        console.log(error);
      });

      this.$bvModal.show('modal-updateReservation');

     },

     hideUpdateReservationModal(){
      this.$bvModal.hide('modal-updateReservation');
     },

  removeDuplicates () {
    this.timeList = [ ...new Set(this.timeList) ]
  }

  }

};
</script>

<style>
#usersapp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.rightHeader{
  text-align: center;
  margin-top: 1.5%;
  font-size: 1.2em;
  font-weight: bold;
}

.leftMenuDiv{
  font-size: 1.0em;
  font-weight: bold;
}

.bottomRightData{
  text-align: center;
  font-size: 1.1em;
  /*margin-top: 2%;*/
  /*margin-right: 5%;*/
}

#dateTimeDiv{
  font-size: 1.2em;
  background-color: #fafafa;
}

#searchId{
  margin-top: 1%;
  margin-bottom: 1%;
}

#modal-xl___BV_modal_footer_{
  display: none;
}

#modal-organization___BV_modal_footer_{
  display: none;
}

#modal-addReservation___BV_modal_footer_{
  display: none;
}

#modalScrollable{
  height: 500px;
  overflow-y: auto;
  /*background-color: red;*/
}

</style>
