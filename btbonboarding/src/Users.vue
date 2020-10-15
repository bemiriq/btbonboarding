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
                                    <b-col><p>Text Number</p></b-col>
                                    <b-col><p>Waiver</p></b-col>
                                    <b-col><p>Arrived</p></b-col>
                                    <!-- <b-col><p>Waiver</p></b-col> -->
                                    <b-col><p>Adult/Minor</p></b-col>
                                    <b-col><p>Player</p></b-col>
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
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa;">

          <b-row>
            <b-col lg="3">
              <p style="margin-top: 3%; font-size: 1.2em;"><b>Reservation Date</b></p>
            </b-col>

            <b-col lg="3">
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

                    <b-button block pill variant="outline-info" v-if="item.Booker.Person.last_name == 'undefined'">
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
                    {{item.total_player_arrived}}
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
                    <p v-if="item.late_by < 10 || item.size != item.total_arrived">
                      <b v-if="item.released != '1' || !item.late_by > '60'">&#10060; {{item.late_by}}</b>
                      <b v-else> {{item.late_by}} </b>
                    </p>
                  </td>

                  <td>
                    <!-- <p v-if="item.size - item.total_arrived => '0'">{{item.size - item.total_arrived}}</p> -->
                    {{item.size - item.total_player_arrived}}
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

      /** used on firebase **/
      // username: '',
      // email: '',
      // name: '',
      /** end of firebase array **/

      readyCheckedCategories:[],
      lateCheckedCategories:[],

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
    var endReservationTime = '23:45:00';
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
          var endReservationTime = '23:45:00';
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
        }
        else{
          var reservation_people_minor_table_id = this.posts[index].Reservation_people[i].id;
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
              "non_player": non_player_value
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
              "non_player": non_player_minor_value
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

</style>
