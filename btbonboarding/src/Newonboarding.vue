<template>
  <div id="app" style="width: 95%; margin:auto;">

    <br><br>

    <b-modal id="missionChange">San</b-modal>
    <div>
      <b-row>
        <b-col lg="2">
          <!-- start of the left div which has navigation menu -->
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
          <!-- end of navigation menu on left side -->
        </b-col>

        <!-- onboarding box list b-col -->
        <b-col lg="7" style="background-color:#fafafa;">

          <b-row>

            <table class="table">
              <tr>

                <td><p class="teamTitle1"> ONBOARDING </p></td>
                
                <td>
                  <tr>
                    <td>
                      <b-button @click="deleteBoxValueFunction()">&#8722;</b-button>
                    </td>
                    <td>
                      <p style="padding-top:3%;" class="h5">Box Value</p>
                    </td>
                    <td>
                      <b-button @click="boxValueFunction()">&#43;</b-button>
                    </td>
                  </tr>
                </td>

              </tr>
            </table>



            <table class="table">
              <tr v-for="item in boxValues" v-bind:key='item.value'>
                <td>
                  {{item.value-1}}
                  <template>
                    <BoxComponent :boxid="item.value-1" :boxDateTime="item.time"></BoxComponent>
                  </template>
                </td>
                <td>
                  {{item.value}}
                  <template>
                    <BoxComponent :boxid="item.value" :boxDateTime="item.time"></BoxComponent>
                  </template>
                </td>
              </tr>
            </table>

          </b-row>

        </b-col>

        <!-- reservation list b-col -->
        <b-col lg="3" style="background-color:#f0f0f0; height: 60vh; overflow:scroll;">
          <b-col lg="6"><p class="teamTitle1"> RESERVATION </p></b-col>
          <div v-for="reservation in teamByTime2" v-bind:key="reservation.id">
            <br>
            <p class="filters">{{reservation.reservation_for | convertReservationDate}}</p>

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

              </div>
            </b-col>
          </b-row>
        </div>


        <br/>
        <br/>

        <div class="bv-example-row" style="width:auto;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

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

        <br/>


      </div>
    </template>

    <script>

// import axios from 'axios';
// import moment from 'moment';
import BoxComponent from './Box.vue';
import draggable from "vuedraggable";
import axios from 'axios';

var moment = require('moment');

export default {
  name: 'App',
  components: {
    BoxComponent,
    draggable
  },

  data(){
    return{
      teamname: [],
      boxValues:[
      // {value:2},
      // {value:4},
      // {value:6},
      ],
      clickedBoxValue:'',
      sanvalue: '1',
      sanvalue2:'',
      box1:'1',
      box2:'2',

      startReservationTime:'',
      endReservationTime:'',
      reservationDateUsed:'',

      teamByTime2:[],

    }
  },

  mounted: function(){


    var starttime='start';
    var endtime='end';

    /** passing the date time value for box **/
    const start = moment();
    const remainder1 = 0 - (start.minute() % 30);
    const dateTime1 = moment(start).add(remainder1, "minutes").format(" h:mm a");

    /** second time case **/
    const remainder2 = 15 - (start.minute() % 30);
    const dateTime2 = moment(start).add(remainder2, "minutes").format(" h:mm a");

    /** third time case **/
    const remainder3 = 30 - (start.minute() % 30);
    const dateTime3 = moment(start).add(remainder3, "minutes").format(" h:mm a");

    this.boxValues = [{value:2,time:dateTime1},{value:4,time:dateTime2},{value:6,time:dateTime3}]

    /** end of date time value for box **/


      // var currentdate = moment().subtract(6, 'days').format("YYYY-MM-DD");
      var currentdate = moment().format("YYYY-MM-DD");
      console.log(currentdate+ ' date used for reservation');

      var startCurrentDate = moment().subtract(13,'days').format('YYYY-MM-DD');
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

// axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T10:00:00'+'/'+endtime+'/'+currentdate+'T23:00:00').then(response => 
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
            incrementObject = countReservationPeople++;
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

          booker_last_name = response.data[i].Booker.Person.last_name;
          booker_first_name = response.data[i].Booker.Person.first_name;
          booker_id = response.data[i].Booker.Person.id;

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
                incrementObject = countReservationPeople1++;
                console.log(incrementObject);

                console.log("Troo oooooo");
                console.log(j);
                console.log(i);

                minorReservationsMinorId = response.data[i].Reservation_minors[j].id;
                console.log(minorReservationsMinorId);

                console.log(response.data[i]);

                minorPlayerMinorId = response.data[i].Reservation_minors[j].Player_minor.id;
                console.log(minorPlayerMinorId);

                personSignedWaiverId = response.data[i].Reservation_minors[j].Player_minor.player_id;
                console.log(personSignedWaiverId);

                minorLastName = response.data[i].Reservation_minors[j].Player_minor.last_name;
                minorFirstName = response.data[i].Reservation_minors[j].Player_minor.first_name;

                missionName = response.data[0].Mission.name;
                missionId = response.data[0].Mission.id;

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
  console.log(error);
});

},

filters: {
  convertReservationDate: function (date) {
    // return moment(date).add(2, 'hours').add(30, 'minutes').format('h:mm A');
    return moment(date).format('h:mm A');
  }
},

methods:{

  boxValueFunction(){
    console.log('inside box value function');
        // console.log(this.clickedBoxValue);
        var lastArrayOfBox = this.boxValues[this.boxValues.length-1];
        var lastValueOfBox = lastArrayOfBox.value;
        console.log(lastValueOfBox);
        console.log(lastValueOfBox+1);
        console.log(lastValueOfBox+2);

        // var addBoxOnSideA = lastValueOfBox+1;
        var addBoxOnSideB = lastValueOfBox+2;

        /** this will grab only minutes from HH:mm a format **/
        const start = moment();
        var lastTimeOfBox = lastArrayOfBox.time;
        var splitTime = lastTimeOfBox.split(':', 2);
        var lastBoxMinute = splitTime[1].slice(0, 2);
        var useMinute = +lastBoxMinute+15;
        /** end of time defined as mm function **/


        if(addBoxOnSideB > '0'){

          /** add time to box value **/
          const remainder = useMinute - (start.minute() % 30);
          const dateTime = moment(start).add(remainder, "minutes").format(" h:mm a");
          /** end of time description of box value **/

          var objectBoxValue = {value:addBoxOnSideB,time:dateTime};
          this.boxValues.push(objectBoxValue);

        }
        // if(lastValueOfBox > 0){

        //   for (var i = 0; i < lastValueOfBox; i++) {
        //     var endpointData = {value:i};
        //     this.boxValues.push(endpointData);
        //   }
        // }
      },

      deleteBoxValueFunction(){
        console.log('inside delete box value function');
        var lastArrayOfBox = this.boxValues[this.boxValues.length-1];
        var lastValueOfBox = lastArrayOfBox.value;
        console.log(lastValueOfBox);
        console.log(lastValueOfBox-1);
        console.log(lastValueOfBox-2);

        // var addBoxOnSideB = lastValueOfBox-2;

        this.boxValues.splice(-1);

      },


    },/** method close bracket **/


  };

  </script>

  <style>

  @import url(//db.onlinewebfonts.com/c/4f0c82bb2e8fb2d03bd14a1137235ef3?family=Pixel+Digivolve+Cyrillic);

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .teamTitle1{
    color: black;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: right;
    font-size: 2em;
  }

  .teamList{
    color: black;
    text-align: center;
    font-size: 0.4em;
  }

  .detailsText{
    color: black;
    font-size: 17px;
    padding-left: 20%;
    text-transform:uppercase;
    text-align:left;
  }

  .borderless tr td {
    border: none !important;
    padding: 0px !important;
  }

  </style>
