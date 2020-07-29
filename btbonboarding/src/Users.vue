<template>
  <div id="usersapp" style="width: 80%; margin:auto;">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js usersApp"/> -->
    <!-- <p>USERS</p> -->


    <b-container class="bv-example-row" id="searchId">
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <b-row>

          <b-col cols="10" md="8"></b-col>

          <b-col sm="4">
            <b-form-input v-model="searchQuery" id="input-large" size="lg" placeholder="Search here ... "></b-form-input>
          </b-col>

          <!-- <b-col cols="6" md="4">
            
            <input v-model="searchQuery" placeholder="Search here ... " />

          </b-col> -->
        </b-row>

      </b-container>

    <div>
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users" active>Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
          </b-list-group>

        

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">
          
          <b-container class="bv-example-row">
            <b-row class="rightHeader">
              <b-col md="1">Time</b-col>
              <b-col md="2">Reservation</b-col>
              <b-col md="1">Mission</b-col>
              <b-col md="1">Size</b-col>
              <b-col md="1">Group</b-col>
              <b-col md="1">Waivers</b-col>
              <b-col md="1">Arrived</b-col>
              <b-col md="1">Paid</b-col>
              <b-col md="1">Release</b-col>
              <b-col md="1">Late</b-col>
              <b-col md="1">NoShows</b-col>
            </b-row>
          </b-container>
          <hr>
          <b-container class="bv-example-row">

            <!-- <td><input type='text' v-model='blog.username'></td>
            <td><input type='text' v-model='blog.name'></td>
            <td><input type='text' v-model='blog.email'></td>
            <td><button v-on:click.prevent="postfirebase">POST TO FIREBASE</button></td> -->

            <!-- <div>
              <label>Name : </label>
              <input type="text" v-model="name" placeholder="full name" required>
              <input type="text" v-model="username" placeholder="username"  required>
              <input type="text" v-model="email" placeholder="email" required>
              <button @click="submitName()">Add </button>
            </div> -->

          <b-modal id="modal-xl" centered size="xl" title="TEAM">
                              <!-- <p class="my-4">Vertically centered modal!</p> -->
                            <!--   <b-row class="my-1" style="background-color: green;">
                                <b-col style="width:auto;">
                                   <b-form-input id="input-live" type="checkbox"></b-form-input>
                                  {{post.customerName}}
                                  <input type="checkbox" name="">
                                  <input type="checkbox" name="">
                                  <input type="checkbox" name="">
                                  <! <b-form-input id="input-small" size="sm" placeholder="RFID 1"></b-form-input> -->
                                  <!-- <b-form-input id="input-live" v-model="rfid1" :state="rfidState1" aria-describedby="input-live-help input-live-feedback" placeholder="SCAN WRISTBAND 1" trim></b-form-input>
                                </b-col>
                              </b-row>-->
                              
                                <!-- <b-row>
                                  <b-col>{{selectedCustomerName}}</b-col>
                                  <b-col>{{selectedDate}}</b-col>
                                </b-row> -->
                                <p>{{selectedCustomerName}} / {{selectedDate}} / {{selectedTime}} / {{mission_name}} / {{teamSize}}</p>
                                <!-- <p> Booker Name = <u style="font-weight:bold;">{{timeList}}</u> </p> -->
                              <br/>
                              <b-container class="bv-example-row">
                                  <b-row style="font-weight:bold;">
                                    <b-col><p>F Name</p></b-col>
                                    <b-col><p>L Name</p></b-col>
                                    <b-col><p>Text Number</p></b-col>
                                    <b-col><p>Arrival</p></b-col>
                                    <!-- <b-col><p>Waiver</p></b-col> -->
                                    <b-col><p>Status</p></b-col>
                                    <b-col><p>Non-Player</p></b-col>
                                  </b-row>

                                  <!-- <div v-for="fetchlist1 in clickedPlayerList.Reservation_people" v-bind:key="fetchlist1.id">
                                    <p>{{fetchlist1.player_name}}</p>
                                    <p>S</p>
                                  </div> -->

                                  <b-row v-for="fetchlist1 in clickedPlayerList.Reservation_people" v-bind:key="fetchlist1.id" style="margin-top: 1%;">
                                    <b-col>{{fetchlist1.player_first_name}}</b-col>
                                    <b-col>{{fetchlist1.player_last_name}}</b-col>
                                    <b-col>{{fetchlist1.player_cell_number}}</b-col>
                                    <b-col><input type="checkbox" v-model="subchildArrived"/></b-col>
                                    <!-- <b-col><input type="checkbox" v-model="subchildWaiver"/></b-col> -->
                                    <b-col>{{fetchlist1.minor_tag}} {{fetchlist1.mission_name}} {{fetchlist1.play_count}}</b-col>
                                    <b-col><input type="checkbox" v-model="subchildWaiver"/></b-col>
                                  </b-row>

                                </b-container>
                          <!-- <b-table :fields="fields">
                            <p>{{post.customerName}}</p>
                            <template v-slot:table-caption>This is a table caption.</template>
                            }
                          </b-table>  -->
                      </b-modal>
          
<!--           <ul id="example-2">
  <li v-for="item in timeList" v-bind:key="item">
   {{ item }}
  </li>
</ul> -->

          <!-- filteritems is used as it searches only for customerName and filter out the data -->
          <!-- <div v-for="post in filterItems(posts)" v-bind:key="post.createdAt"> -->

          <!-- <div v-for="post in sortedArray" v-bind:key="post.createdAt"> -->

          <!-- <div > -->
            <b-row v-for="item in posts" v-bind:key="item.id" >
                <b-col class="covertedtime" col lg="1">
                      {{item.reservation_for}}
                </b-col>

                <b-col col lg="2">
                    <div v-on:click="selectItem (posts, item)">
                      <b-button pill variant="outline-info">{{item.Booker.Person.first_name}} {{item.Booker.Person.last_name}}</b-button>
                    </div>

                      <!-- <b-button v-b-modal.modal-xl variant="outline-info">{{post.customerName}}</b-button> -->

                    <!-- </div> -->

                  <!-- </div> -->
                    <!-- <br> -->
                  

                      <!-- div that the display the sub child detail -->
                      <!-- <div v-if="!item.id" style="width: 900px; margin-left:-35%; border-style: outset; border-color: #138496;">  {{item.arrivalTime}} -->

                        <!-- <div class="row" style="font-weight: bold;">
                          <b-col md="2">
                            First Name
                          </b-col>

                          <b-col md="1">
                            Last
                          </b-col>

                          <b-col md="3">
                            Text Number
                          </b-col>


                          <b-col md="1">
                            Arrived
                          </b-col>

                          <b-col md="1">
                            Waiver
                          </b-col>

                          <b-col md="2">
                            No Show
                          </b-col>

                        </div>

                       
                        <div class="row">

                          <b-col md="2">
                            <! {{post.customerName}}
                          </b-col>

                          <b-col md="1">
                            P
                          </b-col>

                          <b-col md="3">
                            976 034 7896
                          </b-col>

                          <b-col md="1">
                            <input type="checkbox" id="checkbox" v-model="subchildArrived">
                          </b-col>

                          <b-col md="1">
                            <input type="checkbox" id="checkbox" v-model="subchildWaiver">
                          </b-col>

                          <b-col md="2">
                             <input type="checkbox" id="checkbox" v-model="subchildNoShow">
                          </b-col>
                          
                        </div>

                        <hr/>

                        <div class="row">
                          <b-col sm="3">
                            <label for="input-small">Game Playing</label>
                            </b-col>
                            <b-col sm="9">
                              <b-form-select v-model="selected2">
                                <! <option disabled value="">Please select one</option>
                                <option>Cyberbot</option>
                                <option>Blockmonster</option>
                                <! <option>C</option>
                              </b-form-select>
                            </b-col> 
                            <br/>
                        </div> -->

                      <!-- </div> -->
                      
                        <!-- <div v-if="!item.id" class="row" style="background-color:green; width: 380%;">
                          <div class="row" style="width: 300%;">
                            <div class="col">
                              F Name
                            </div>
                            <div class="col">
                              L Name
                            </div>
                            <div class="col">
                              Cellphone
                            </div>
                            <div class="col">
                              Arrived
                            </div>

                            <div class="col">
                              Waiver
                            </div>
                            <div class="col">
                              No Show
                            </div>
                            
                          </div>

                          <div class="row" style="width: 300%;">
                            <div class="col">
                              <p>Jr Jack</p>
                            </div>

                            <div class="col">
                              <p> S </p>
                            </div>

                            <div class="col">
                              <p>8175678901</p>
                            </div>

                            <div class="col">
                              <input type="checkbox" id="subchildArrived" v-model="subchildArrived">
                            </div>

                            <div class="col">
                              <input type="checkbox" id="subchildWaiver" v-model="subchildWaiver">
                            </div>

                            <div class="col">
                              <input type="checkbox" id="subchildNoShow" v-model="subchildNoShow">
                            </div>
                            
                          </div> -->
                        <!-- </div> -->
                      
                      <!-- end of sub child idv -->

                    <!-- </div> -->

                </b-col>

                <b-col col lg="1">
                  <div>
                    {{item.Mission.name}}
                  </div>
                </b-col>

                <!-- this represents the RESERVATION SIZE -->
                <b-col col lg="1">
                    {{item.size}}
                </b-col>

                 <!-- this represents the GROUP Name or organization name -->
                <b-col lg="1">
                  <!-- <select v-for="organization in organizationDetail" v-bind:key="organization.id"> -->
                    <div>
                  <select>
                    <option value=""> </option>
                    <option v-for="organization in organizationDetail" v-bind:key="organization.id">{{organization.name}}</option>
                    <!-- <option>B</option> -->
                    <!-- <option>C</option> -->
                  </select>
                </div>
                </b-col>

                <!-- TOTAL WAIVERS SIGNED -->
                <b-col col lg="1">
                  <div>
                    {{item.Reservation_people.length+item.Reservation_minors.length}}
                  </div>
                </b-col>
                
                <!-- below defines the ARRIVED VALUE -->
                <b-col col lg="1">
                  <div>
                    {{item.size}}
                  </div>
                </b-col>

                

                <!-- below defines the Paid or Not data -->
                <b-col col lg="1">
                  <!-- {{item.Reservation_people.length+item.Reservation_minors.length}} -->
                  <div v-if="item.paid_amount == item.final_dollar_amount" style="color:green;">&#10004;&#65039;</div>
                  <div v-if="item.paid_amount != item.final_dollar_amount">&#10060;</div>
                </b-col>

                <!-- below defines READY -->
                <b-col col lg="1"><input type="checkbox" :value="readyChecked.id"/></b-col>

                <!-- below defines LATE -->
                <b-col col lg="1"><input type="checkbox" :value="lateChecked.id"/></b-col>


                <!-- defines NO SHOWS -->
                <b-col col lg="1">No Shows</b-col>

                <!-- <b-col md="1">
                    <div v-for="readyChecked in post.items" v-bind:key="readyChecked.id">
                      <input type="checkbox" :value="readyChecked.id" v-model="readyCheckedCategories" @click="readycheck($event)">
                    </div>
                </b-col>

                <b-col md="1">
                  <div v-for="lateChecked in post.items" v-bind:key="lateChecked.id">
                    <input type="checkbox" :value="lateChecked.id" v-model="lateCheckedCategories" @click="latecheck($event)">
                  </div>
                </b-col> -->  

            </b-row>

            <!-- <b-row cols="8" v-show="!onDetailDiv">
              <b-col md="2">
                FIRST NAME
              </b-col>

              <b-col md="1">
                Initial
              </b-col>

              <b-col md="2">
                Cell Number
              </b-col>

            </b-row> -->


            
          <!-- </div> -->


          


          <!-- end of filter items search div -->


            <!-- <b-row cols="8" class="bottomRightData">
              <b-col md="2"> 
                <div v-for="post in posts"  v-bind:key="post.id">
                   
                        <div v-for="item in post.items" v-bind:key="item.arrival">
                            {{item.arrivalTime}}
                        </div>
                    </div>
              </b-col> 
              <b-col md="3">
                <div class="col-md-3" v-for="preset in filterItems(posts)" :key="preset.customerName">
                  <div :id="preset.id">
                    {{ preset.customerName }}
                  </div>
                </div>
              </b-col>
              <b-col md="1">5</b-col>
              <b-col md="2">Alexander P</b-col>
              <b-col md="1">5</b-col>
              <b-col md="1">5</b-col>
              <b-col md="1">
                <input type="checkbox" id="checkbox" v-model="readyChecked">
              </b-col>
              <b-col md="1">
                <input type="checkbox" id="checkbox" v-model="lateChecked">
              </b-col>
            </b-row> -->



            <!-- table to sort out the data 
             <div>
        <b-table striped hover :items="posts" :fields="fieldstable">
           <template v-slot:cell(posts.post)="data">{{ data.items }}</template>

          <template v-for="post in posts" >    -->

          <!-- <td v-for="item in post.items" v-bind:key="item.arrival">{{ item.arrivalTime }}</td> dont uncomment this    -->

        <!--   <td v-for="item in post.items"  v-bind:key="item.arrival" >
                      {{item.arrivalTime}}
                    </td>        
        </template>
        </b-table>
      </div> -->

          </b-container>

        </b-col>
        <!-- end of right div which all table -->





      </b-row>
    </div>

    <br/>

    <div class="bv-example-row" style="width:auto;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

      <b-row>
        <!-- <b-col>Front Desk</b-col> -->
        <b-col>On Deck</b-col>
        <!-- <b-col>Room Status</b-col> -->
        <b-col>CCTV</b-col>
        <b-col><a href="/#/controlroom">Control Room</a></b-col>
        <b-col>Photo Bomb</b-col>
        <b-col>Bomb Vision</b-col>
        <b-col>Stats</b-col>
        <b-col>Support</b-col>
        <b-col>EOD</b-col>
        <b-col>Photo Bomb</b-col>
        <!-- <b-col> | </b-col> -->
        <b-col>Homebase</b-col>
        <b-col>Xola</b-col>
        <b-col>Square</b-col>

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
  // import DateDropdown from 'vue-date-dropdown'; // this for the date dropdown

  // import { namesRef } from './firebase';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // ChildComponent
  },

  data(){
    return{
      // url: process.env.VUE_APP_URL,
      // title: process.env.VUE_APP_TITLE,
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
      

      selectedCustomerName: '',
      selectedDate:'',
      selectedTime:'',
      mission_name:'',
      teamSize:'',
      clickedPlayerList:[],
      personPhoneNumber:'',

      // displayModal: true,
      timeList: [],
      convertedTimeList: '',

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
    }
  },


mounted: function(){

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

    var starttime='start';
    var endtime='end';
    var currentdate = moment().format("YYYY-MM-DD");
    var startReservationTime = '10:00:00';
    // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
    var endReservationTime = '22:00:00';

    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
    .then(response => 
      {
        console.log(response);
        this.posts = response.data;
      })
    .catch(function (error){
        console.log(error);
      });

    axios.get(process.env.VUE_APP_DTB_ORGANIZATION,{

    })
    .then(response => 
      {
        console.log(response);
        this.organizationDetail = response.data;
      })
    .catch(function (error){
        console.log(error);
      });

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
    selectItem (posts, item) {

      console.log(item);

      var bookerName = item.Booker.Person.first_name+' '+item.Booker.Person.last_name;
      var missionName = item.Mission.name;
      var teamSizeItem = item.size;
      
      /** conversion of date and time for second part **/
        var reservation_for = item.reservation_for;

        var arr = reservation_for.split("T");
        var onlyDate = arr.splice(0,1).join("");
        console.log(onlyDate);

        var onlyTime = arr.join("T");
        console.log(onlyTime);

        var twoDigits = onlyTime.substring(0, 2);
        var time1 = twoDigits-12;
        console.log(time1);

        if(time1 > 0){
          console.log("PM");
          var ampm = "PM";
        }
        else{
          console.log("AM");
          var ampm = "AM";
        }

        var posNegTime = Math.abs(time1);
        var onlyTime = arr.join("T");
        var twoDigits = onlyTime.substring(3, 5);
        console.log(twoDigits);

        var timeConverted = posNegTime+':'+twoDigits+' '+ampm;
        console.log(timeConverted);
      /** end of date and time converted for second part **/


      /** create object which grabs both MINOR and NON-MINOR in the same column **/
      var countReservationPeople = item.Reservation_people.length;
      console.log(countReservationPeople);

      var replyDataObj1 = item;

      for(let i=0; i < countReservationPeople; i++){
        
        console.log(i);
        var player_first_name = item.Reservation_people[i].Person.last_name;
        var player_last_name = item.Reservation_people[i].Person.first_name;
        var player_cell_number = item.Reservation_people[i].Person.phone;
        var player_full_name = player_first_name+' '+player_last_name;
        var player_person_id = item.Reservation_people[i].Person.Player.person_id;
        var player_id = item.Reservation_people[i].Person.Player.id;
        var missionName = item.Mission.name;
        var missionId = item.Mission.id;
        var playCount = item.Reservation_people[i].Person.Player.play_count;
        console.log(player_full_name);
        // var booker_id = response.data[i].Booker.Person.id;
        // var objectValue = i++;
        console.log(i);
        // var namebana = 'NameMe';

        replyDataObj1['Reservation_people'][i]={
          "person_id": player_person_id,
          "player_id": player_id,
          "player_first_name": player_first_name,
          "player_last_name": player_last_name,
          "player_full_name": player_full_name,
          "player_cell_number": player_cell_number,
          "minor_tag": "",
          "play_count": playCount,
          "mission_name": missionName,
          "mission_id": missionId
        }

        this.clickedPlayerList = replyDataObj1;
        console.log(replyDataObj1);

        this.personPhoneNumber = player_cell_number;
        // if(item.Reseservation_people)

      }

      console.log(this.clickedPlayerList.Reservation_people.length);
      var replyDataObj1 = item;
      var reservationPeopleLength = this.clickedPlayerList.Reservation_people.length;
      var countReservationMinor = item.Reservation_minors.length;
      console.log(countReservationMinor);

      for(let i=0; i < countReservationMinor; i++){
        
        console.log(item);
        var nonMinorPhone = this.personPhoneNumber;

        var minor_first_name = item.Reservation_minors[i].Player_minor.last_name;
        var minor_last_name = item.Reservation_minors[i].Player_minor.first_name;
        var player_cell_number = nonMinorPhone;
        var minor_full_name = minor_first_name+' '+minor_last_name;
        var minor_person_id = item.Reservation_minors[i].Player_minor.id;
        var minor_player_id = item.Reservation_minors[i].Player_minor.player_id;
        var missionName = item.Mission.name;
        var missionId = item.Mission.id;
        // var booker_id = response.data[i].Booker.Person.id;
        // var objectValue = i++;
        console.log(i);
        // var namebana = 'NameMe';
        var objectValue = reservationPeopleLength + i;
        console.log(objectValue);

        replyDataObj1['Reservation_people'][objectValue]={
          "person_id": minor_person_id,
          "player_id": minor_player_id,
          "player_first_name": minor_first_name,
          "player_last_name": minor_last_name,
          "player_full_name": minor_full_name,
          "player_cell_number": player_cell_number,
          "minor_tag": "M",
          "play_count": "1",
          "mission_name": missionName,
          "mission_id": missionId
        }

        this.clickedPlayerList = replyDataObj1;
        console.log(replyDataObj1);

      }
      /** end of MINOR and NON-MINOR same column **/


      this.selectedCustomerName = bookerName;
      this.selectedDate = onlyDate;
      this.selectedTime = timeConverted;
      this.mission_name = missionName;
      this.teamSize = teamSizeItem;

      console.log(bookerName);
      console.log(reservation_for);
      // this.selectedCustomerName = 
      // console.log(this.posts);
      // this.selectedCustomerName = posts.customerName /*this.selectedCustomerName pass the value to data return() */
      // var bookerName = this.selectedCustomerName
      this.$bvModal.show('modal-xl')
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
</style>
