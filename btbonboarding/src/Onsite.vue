<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <b-container class="bv-example-row">
      <b-row class="rowchange">
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite" active>Onsite Players</b-list-group-item>
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">

          <b-col>
            <h2 style="color: #007BFF;">ONSITE PLAYERS</h2>
            <!-- <hr/> -->

            <table class="table table-hover">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Full Name</th>
                  <th scope="col">Reservation Name</th>
                  <th scope="col">Cellnumber</th>
                  <th scope="col">Waiver Signed At</th>
                  <th scope="col">Mission</th>
                  <th scope="col">Status</th>
                  <th scope="col">Arrived</th>
                </tr>
              </thead>
              <tbody v-for="mainlist in clickedPlayerList" v-bind:key="mainlist.id" :items="clickedPlayerList" :current-page="currentPage" :per-page="0">
                  <tr v-for="item in mainlist.Reservation_people" v-bind:key="item.id">
                  <td>
                    <p>{{item.full_name}}</p>
                  </td>
                  <td>
                    <b-form-input type="text" v-model="item.booker_full_name" disabled></b-form-input>
                  </td>
                  <td>{{item.phone_number}}</td>
                  <td>{{item.waiver_signed}}</td>
                  <td>Cybebrot</td>
                  <td>{{item.minors_tag}}</td>
                  <td>
                    <p v-if="item.arrived == '1'">&#10004;&#65039;</p>
                    <p v-else>&#10060;</p>
                  </td>
                  <!-- <td>{{item.id}}</td> -->
                </tr>
              </tbody>
            </table>


            <!-- <div id="app"> -->
                <!-- <b-table show-empty v-for="mainlist in clickedPlayerList" v-bind:key="mainlist.id" :items="mainlist.Reservation_people" :fields="fields" :current-page="currentPage" :per-page="0"></b-table> -->
                <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
              <!-- </div> -->

          </b-col>

        </b-col>

      </b-row>
    </b-container>

  </div>
</template>

<script>

  import axios from 'axios';
  import moment from 'moment';


export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  data(){
    return{
      posts: [],
      clickedPlayerList: [],
      personPhoneNumber: '',
      currentPage: 0,
      perPage: 2,
      totalItems: 0,

      fields: [{
          key: 'full_name',
          label: 'Full Name'
        },
        {
          key: 'reservation_name',
          label: 'Reservation Name'
        },
        {
          key: 'cellnumber',
          label: 'Cellnumber'
        },
        {
          key: 'waiverSignedAt',
          label: 'Waiver Signed At'
        },
        {
          key: 'mission',
          label: 'Mission'
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: 'arrived',
          label: 'Arrived'
        }
      ],
    }
  },

  methods: {
     async fetchData() {
      this.clickedPlayerList = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${this.currentPage}&_limit=${this.perPage}`)
        .then(res => {
          this.totalItems = parseInt(res.headers.get('x-total-count'), 2)

          return res.json()
        })
        .then(items => items)
    }
  },

  mounted: function(){

    this.fetchData().catch(error => {
      console.error(error)
    });

    var starttime='start';
    var endtime='end';
    var currentdate = moment().format("YYYY-MM-DD");
    var startReservationTime = '10:00:00';
    // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
    var endReservationTime = '22:00:00';

    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
    .then(response => 
      {
        console.log(response);
        this.posts = response.data;
        // console.log(response.data.)
        console.log(response.data.length);

        // /** Beginning of ARRIVED counting part **/
         var countPostArray = response.data.length;
        // // console.log(countPostArray);
        //   var replyDataObj1 = this.posts;

        this.clickedPlayerList = response.data;

        var replyDataObj1 = this.clickedPlayerList;

        for(let i=0; i <= countPostArray; i++){

          // console.log(response.data[i].Reservation_people[j].Person.first_name);
          // console.log(response.data[i].Reservation_people[j].Person.last_name);
          // console.log(response.data[i].Reservation_people[j].Person.phone);
          // console.log(response.data[i].Reservation_people[j].Person.createdAt);

          // var replyDataObj1 = this.clickedPlayerList[i];

          var countReservationPeopleLength = this.clickedPlayerList[i].Reservation_people.length;
          console.log(countReservationPeopleLength);

          var countNew = countReservationPeopleLength-1;

          for (let j=0; j <= countNew; j++){
            console.log(j);

            console.log('MIN O N O ');


            console.log(this.clickedPlayerList[i].Reservation_people[j].Person.first_name);
            console.log(this.clickedPlayerList[i].Reservation_people[j].Person.last_name);
            console.log(this.clickedPlayerList[i].Reservation_people[j].Person.phone);
            console.log(this.clickedPlayerList[i].Reservation_people[j].Person.createdAt);

            var first_name = this.clickedPlayerList[i].Reservation_people[j].Person.first_name;
            var last_name = this.clickedPlayerList[i].Reservation_people[j].Person.last_name;
            var phone = this.clickedPlayerList[i].Reservation_people[j].Person.phone;
            var arrived = this.clickedPlayerList[i].Reservation_people[j].arrived;

            var createdAt = this.clickedPlayerList[i].Reservation_people[j].Person.createdAt;
            var date = moment.utc(createdAt).subtract('hours',4).format('hh:mm A MM-DD-YYYY');


            var booker_first_name = this.clickedPlayerList[i].Booker.Person.first_name;
            var booker_last_name = this.clickedPlayerList[i].Booker.Person.last_name;
            var booker_id = this.clickedPlayerList[i].Booker.Person.id;

            replyDataObj1[i]['Reservation_people'][j]={
              "f_name": first_name,
              "l_name": last_name,
              "full_name": first_name+' '+last_name,
              "phone_number": phone,
              "waiver_signed": date,
              "booker_first_name": booker_first_name,
              "booker_last_name": booker_last_name,
              "booker_id": booker_id,
              "booker_full_name": booker_first_name+' '+booker_last_name,
              "minors_tag": '',
              "arrived": arrived
            }

            // this.clickedPlayerList = replyDataObj1;
            // console.log(replyDataObj1);

          }

          console.log(this.clickedPlayerList);

          var countReservationMinorLength = this.clickedPlayerList[i].Reservation_minors.length;
          console.log(countReservationMinorLength);

          var countNewMinor = countReservationMinorLength-1;

          for (let j=0; j <= countNewMinor; j++){

            console.log('MIN O N O rerere ');
            console.log(j);
            var f_name = this.clickedPlayerList[i].Reservation_minors[j].Player_minor.first_name;
            var l_name = this.clickedPlayerList[i].Reservation_minors[j].Player_minor.last_name;
            var phoneNumber = phone;
            var waiverSigned = date;
            var arrivedMinor = this.clickedPlayerList[i].Reservation_minors[j].arrived;

            replyDataObj1[i]['Reservation_people'][j+countReservationPeopleLength]={
              "f_name": f_name,
              "l_name": l_name,
              "full_name": f_name+' '+l_name,
              "phone_number": phoneNumber,
              "waiver_signed": waiverSigned,
              "booker_first_name": booker_first_name,
              "booker_last_name": booker_last_name,
              "booker_id": booker_id,
              "booker_full_name": booker_first_name+' '+booker_last_name,
              "minors_tag": 'M',
              "arrived": arrivedMinor
            }

            // this.clickedPlayerList = replyDataObj1;
            // console.log(replyDataObj1);


          }

        }        

        // for(let i=0; i <= countPostArray; i++){
              
        //     var player_first_name = item.Reservation_people[i].Person.first_name;
        //     var player_last_name = item.Reservation_people[i].Person.last_name;
        //     var player_cell_number = item.Reservation_people[i].Person.phone;
        //     var player_full_name = player_first_name+' '+player_last_name;
        //     var player_person_id = item.Reservation_people[i].Person.Player.person_id;
        //     var player_id = item.Reservation_people[i].Person.Player.id;
        //     var missionName = item.Mission.name;
        //     var missionId = item.Mission.id;
        //     var playCount = item.Reservation_people[i].Person.Player.play_count;
        //     var arrived = item.Reservation_people[i].arrived;
        //     var reservation_people_minor_table_id = item.Reservation_people[i].id;
        //     var reservation_for = timeConvertedWithoutAMPM;
        //     console.log(player_full_name);
        //     // var booker_id = response.data[i].Booker.Person.id;
        //     // var objectValue = i++;
        //         console.log(i);
        //         // var namebana = 'NameMe';

        //         replyDataObj1['Reservation_people'][i]={
        //           "person_id": player_person_id,
        //           "player_id": player_id,
        //           "reservation_people_minor_table_id": reservation_people_minor_table_id,
        //           "player_first_name": player_first_name,
        //           "player_last_name": player_last_name,
        //           "player_full_name": player_full_name,
        //           "player_cell_number": player_cell_number,
        //           "minor_tag": "",
        //           "play_count": playCount,
        //           "mission_name": missionName,
        //           "mission_id": missionId,
        //           "loop_value": 1,
        //           "arrived": arrived,
        //           "reservation_for": reservation_for
        //         }

        //         this.clickedPlayerList = replyDataObj1;
        //         console.log(replyDataObj1);

        //   }

        //     console.log(this.clickedPlayerList.Reservation_people.length);
        //     var replyDataObj1 = item;
        //     var reservationPeopleLength = this.clickedPlayerList.Reservation_people.length;
        //     var countReservationMinor = item.Reservation_minors.length;
        //     console.log(countReservationMinor);

        //     for(let i=0; i < countReservationMinor; i++){
              
        //       console.log(item);
        //       var nonMinorPhone = this.personPhoneNumber;

        //       var minor_first_name = item.Reservation_minors[i].Player_minor.last_name;
        //       var minor_last_name = item.Reservation_minors[i].Player_minor.first_name;
        //       var player_cell_number = nonMinorPhone;
        //       var minor_full_name = minor_first_name+' '+minor_last_name;
        //       var minor_person_id = item.Reservation_minors[i].Player_minor.id;
        //       var minor_player_id = item.Reservation_minors[i].Player_minor.player_id;
        //       var missionName = item.Mission.name;
        //       var missionId = item.Mission.id;
        //       var minorArrived = item.Reservation_minors[i].arrived;
        //       var reservation_people_minor_table_id = item.Reservation_minors[i].id;
        //       var reservation_for = timeConvertedWithoutAMPM;
        //       // var booker_id = response.data[i].Booker.Person.id;
        //       // var objectValue = i++;
        //       console.log(i);
              
        //       console.log(minorArrived);
        //       console.log(item.Reservation_minors);

        //       // var namebana = 'NameMe';
        //       var objectValue = reservationPeopleLength + i;
        //       console.log(objectValue);

        //       replyDataObj1['Reservation_people'][objectValue]={
        //         "person_id": minor_person_id,
        //         "player_id": minor_player_id,
        //         "reservation_people_minor_table_id": reservation_people_minor_table_id,
        //         "player_first_name": minor_first_name,
        //         "player_last_name": minor_last_name,
        //         "player_full_name": minor_full_name,
        //         "player_cell_number": player_cell_number,
        //         "minor_tag": "M",
        //         "play_count": "1",
        //         "mission_name": missionName,
        //         "mission_id": missionId,
        //         "arrived": minorArrived,
        //         "reservation_for": reservation_for
        //       }

        //       this.clickedPlayerList = replyDataObj1;
        //       console.log(replyDataObj1);

        //     }
          /** END of ARRIVED counting PART **/

      })
    .catch(function (error){
        console.log(error);
      });
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
  margin-top: 60px;
}

.rowchange{
  width: 110%;
}
</style>
