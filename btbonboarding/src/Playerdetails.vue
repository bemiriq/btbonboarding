<template>
	<div id="app" style="width: 80%; margin:auto;">

		<br><br>

		<div>
			<b-row>
				<b-col lg="2">
					<!-- start of the left div which has navigation menu -->
					<b-list-group class="leftMenuDiv">
						<b-list-group-item href="/#/users">Check-In</b-list-group-item>
						<!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
						<b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
						<b-list-group-item href="/#/Waiting" active>Teams On Deck</b-list-group-item>
						<b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
						<b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
						<b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
						<!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
						<!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
					</b-list-group>
					<!-- end of navigation menu on left side -->
				</b-col>

				<b-col lg="10">
					<b-row>
						<b-col lg="3">
							<b-input-group class="mb-1">
								<b-form-input id="example-input" v-model="dateClicked" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
								<b-input-group-append>
									<b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
								</b-input-group-append>
							</b-input-group>
						</b-col>

						<b-col lg="5">
							<p class="teamTitle1">PLAYERS DETAIL</p>
						</b-col>
					</b-row>

					<table class="table">
						<thead>
							<tr>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Minor/Adult</th>
								<th scope="col">Handle</th>
								<th scope="col">Team Name</th>
								<th scope="col">Date of Birth</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col">Gender</th>
							</tr>
						</thead>
						<tbody v-for="item in teamList" v-bind:key="item.id">
							<tr v-for="detail in item.Team_player_sessions" v-bind:key="detail.id">
								<!-- <th scope="row">1</th> -->
								<td style="text-transform:capitalize;">
									<p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.first_name}}</p>
									<p v-else>{{detail.Player_minor.first_name}}</p>
								</td>
								<td style="text-transform:capitalize;">
									<p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.last_name}}</p>
									<p v-else>{{detail.Player_minor.last_name}}</p>
								</td>
								<td style="text-transform:capitalize;">
									<p v-if="!detail.player_minor_id > 0">Adult</p>
									<p v-else>Minor</p>
								</td>
								<td>
									<p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.instagram}}</p>
									<p v-else></p></td>
								<td style="text-transform:capitalize;">{{item.Team.name}}</td>
								<td>
									<p v-if="!detail.player_minor_id > 0" style="
											display:inline-block;
											white-space: nowrap;
											overflow: hidden;
											text-overflow: ellipsis;
											max-width: 11ch;">{{detail.Player.Person.date_of_birth}}</p>
									<p v-else>{{detail.Player_minor.date_of_birth}}</p>
									</td>
								<td>{{detail.Player.Person.email}}</td>
								<td>{{detail.Player.Person.phone}}</td>
								<td>
									<div v-if="!detail.player_minor_id > 0">
										<p v-if="detail.Player.Person.gender_id == '1'">Female</p>
										<p v-if="detail.Player.Person.gender_id == '2'">Male</p>
										<p v-if="detail.Player.Person.gender_id == '3'">Nonbinary</p>
										<p v-if="detail.Player.Person.gender_id == '4'">Not to say</p>
									</div>
									<div v-else>Minor</div>
								</td>
								</tr>
								</tbody>
							</table>

						</b-col>
					</b-row>

				</div>


				<br/>
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

				<br/>


			</div>
		</template>

<script>
import axios from 'axios';
var moment = require('moment');
export default {
	name: 'App',
	components: {
    // HelloWorld
},

data(){
    return{
teamname: [],
teamList: [],
dateClicked: '',
selectedReservationDate: '',
formatted: ''
}
},

  mounted: function(){

console.log(moment().format('YYYY-MM-DD'));

    // var startDate = moment().subtract('days',7).format('YYYY-MM-DD');
    // var endDate = moment().add('days',6).format('YYYY-MM-DD');

    var startDate = moment().format('YYYY-MM-DD');
    var endDate = moment().add('days',1).format('YYYY-MM-DD');
    this.dateClicked = startDate;

    console.log(axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500'));

    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500',{
      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

      })
    .then(response => {
  console.log(response);
  this.teamList = response.data;
    })
    .catch(function (error) {
  console.log(error);
    });
},

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

        // var starttime='start';
        // var endtime='end';

          // var currentdate = moment().format("YYYY-MM-DD");
          var convertDate = this.selectedReservationDate;

          var startDate = moment(convertDate).format("YYYY-MM-DD");

          console.log(startDate+ ' was the current date.');

          var endDate = moment(convertDate).add('days',1).format('YYYY-MM-DD');

          // var startReservationTime = '08:45:00';
          // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
          // var endReservationTime = '23:45:00';
          // var currentTime = moment().format("HHmm");
          // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);


         // var startDate = moment().format('YYYY-MM-DD');
// var endDate = moment().add('days',1).format('YYYY-MM-DD');
// this.dateClicked = this.selectedReservationDate;

console.log(axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500'));

axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500',{
  // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

  })
.then(response => {
console.log(response);
this.teamList = response.data;
})
.catch(function (error) {
console.log(error);
});

/** end of changing reservation date **/ 


	},
}

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
	text-align: center;
	font-size: 2em;
}

.teamList{
	color: black;
	font-family: 'Pixel Digivolve Cyrillic', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	font-size: 0.4em;
}
</style>
