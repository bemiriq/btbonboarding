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
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="#">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Social Tagging</b-list-group-item>
            <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">

          <b-col>
            <h2 style="color: #007BFF;">ONSITE PLAYERS</h2>
            <!-- <hr/> -->

            <!-- <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Reservation Name</th>
                  <th scope="col">Cellnumber</th>
                  <th scope="col">Waiver Signed At</th>
                  <th scope="col">Mission</th>
                  <th scope="col">Status</th>
                  <th scope="col">Arrived</th>
                </tr>
              </thead>
              <tbody v-for="mainlist in clickedPlayerList" v-bind:key="mainlist.id" >
                  <tr id="my-table" v-for="item in mainlist.Reservation_people" v-bind:key="item.id" :items="mainlist"  :fields="fields" :current-page="currentPage" :per-page="0">
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
                </tr>
              </tbody>
            </table>
 -->

<!--             <b-pagination
    :total-rows="totalRows"
    v-model="currentPage"
    :per-page="perPage"
    align="fill"
    class="my-0"
    aria-controls="my-table"
    ></b-pagination> -->

<!--   <b-table
    id="my-table"
    show-empty
    striped
    hover
    sticky-header="true" :fields="fields"
    :items="item.Reservation_people"
    :per-page="perPage"
    :current-page="currentPage"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc">
  </b-table> -->



            <!-- <div id="app"> -->
              <!-- <div v-for="mainlist in clickedPlayerList" v-bind:key="mainlist.id"> -->
                <!-- <b-table show-empty v-for="mainlist in clickedPlayerList" v-bind:key="mainlist.id" :items="mainlist.Reservation_people"  :fields="fields" :current-page="currentPage" :per-page="0"></b-table> -->

                <b-table
      :current-page="currentPage"
      :per-page="perPage"
      :items="clickedPlayerList[0].Reservation_people"
      :fields="fields"
    >
    </b-table>

                <b-pagination size="md" align="center" id="my-table" :total-rows="totalRows" v-model="currentPage" :per-page="perPage" aria-controls="my-table"></b-pagination>
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
      perPage: 5,
      currentPage: 1,

      countClikcedPlayerListLength:'',

      fields: [{
          key: 'full_name',
          label: 'Full Name'
        },
        {
          key: 'booker_full_name',
          label: 'Reservation Name'
        },
        {
          key: 'phone_number',
          label: 'Cellnumber'
        },
        {
          key: 'waiver_signed',
          label: 'Waiver Signed At'
        },
        {
          key: 'mission_name',
          label: 'Mission'
        },
        {
          key: 'minors_tag',
          label: 'Status'
        },
        {
          key: 'arrived',
          label: 'Arrived'
        }
      ],
    }
  },

  computed: {
    totalRows() {
      return this.countClikcedPlayerListLength+2
    }
  },

  methods: {
     async fetchData() {
      this.clickedPlayerList = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${this.currentPage}&_limit=${this.perPage}`)
        .then(res => {
          this.totalItems = parseInt(res.headers.get('x-total-count'), 1)

          return res.json()
        })
        .then(items => items)
    },
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
    var endReservationTime = '23:45:00';

    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

      })
    .then(response => 
      {
        console.log(response);
        this.posts = response.data;
        // console.log(response.data.)
        console.log(response.data.length);

        // /** Beginning of ARRIVED counting part **/
         var countPostArray = response.data.length-1;


        this.clickedPlayerList = response.data;

        var replyDataObj1 = this.clickedPlayerList;

        for(let i=0; i <= countPostArray; i++){

          var countReservationPeopleLength = this.clickedPlayerList[i].Reservation_people.length;
          console.log(countReservationPeopleLength);

          var length = this.clickedPlayerList[0].Reservation_people.length;

          if(i > '0'){
            var totalLength = this.clickedPlayerList[i].Reservation_people.length+length;
            console.log('total length'+totalLength);
          }
          else{
            totalLength = length;
            console.log('total length'+totalLength);
          }
          
          console.log("BEFORE I"+ totalLength);

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
            var missionname = this.clickedPlayerList[i].Mission.name;

            var createdAt = this.clickedPlayerList[i].Reservation_people[j].Person.createdAt;
            var date = moment.utc(createdAt).subtract('hours',4).format('hh:mm A MM-DD-YYYY');


            var booker_first_name = this.clickedPlayerList[i].Booker.Person.first_name;
            var booker_last_name = this.clickedPlayerList[i].Booker.Person.last_name;
            var booker_id = this.clickedPlayerList[i].Booker.Person.id;

            var clickedPlayerListLength = this.clickedPlayerList[0].Reservation_people.length;
            console.log(clickedPlayerListLength+" 1  LENGTH HO HAI");

            if(i == '0'){

              replyDataObj1[0]['Reservation_people'][j]={
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
                "arrived": arrived,
                "mission_name": missionname
              }
              console.log(totalLength);
              console.log(first_name);

              // this.clickedPlayerList = replyDataObj1;
              // console.log(replyDataObj1);

              this.clickedPlayerList = replyDataObj1;
            }

            else{
                replyDataObj1[0]['Reservation_people'][j+clickedPlayerListLength]={
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
                "arrived": arrived,
                "mission_name": missionname
              }
              console.log(totalLength);
              console.log(first_name);

              this.clickedPlayerList = replyDataObj1;
              console.log(replyDataObj1);
            }
            

            this.countClikcedPlayerListLength = j;

          }

          console.log(this.clickedPlayerList);

          var countReservationMinorLength = this.clickedPlayerList[i].Reservation_minors.length;
          console.log(countReservationMinorLength);

          var countNewMinor = countReservationMinorLength-1;

          for (let j=0; j <= countNewMinor; j++){
            console.log(i);
            console.log(clickedPlayerListLength); 
            console.log('MIN O N O rerere ');
            console.log(j);
            console.log(j+i+clickedPlayerListLength);

            var clickMinorPlayerListLength = this.clickedPlayerList[0].Reservation_people.length;
            var f_name = this.clickedPlayerList[i].Reservation_minors[j].Player_minor.first_name;
            var l_name = this.clickedPlayerList[i].Reservation_minors[j].Player_minor.last_name;
            var phoneNumber = phone;
            var waiverSigned = date;
            var arrivedMinor = this.clickedPlayerList[i].Reservation_minors[j].arrived;
            var missionname1 = this.clickedPlayerList[i].Mission.name;

            console.log(clickedPlayerListLength+" 2 LENGTH HO HAI");

            replyDataObj1[0]['Reservation_people'][clickMinorPlayerListLength]={
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
              "arrived": arrivedMinor,
              "mission_name": missionname1
            }

            this.countClikcedPlayerListLength = j+totalLength;

          }

        }        

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
