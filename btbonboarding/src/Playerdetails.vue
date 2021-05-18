<template>
	<div id="app" style="width: 80%; margin:auto;">

		<br><br>

		<b-modal id="modal-password" centered size="md" title="Log-in" v-bind:hide-footer="true">
			<b-row v-if="loginPage == '1' ">
				<b-col lg="8">
						<b-form-input id="example-input" v-model="passwordDetail" type="password" placeholder="Please Enter Password" autocomplete="off" v-on:keypress="checkPassword($event)"></b-form-input>
				</b-col>

				<b-col lg="2">
					<b-button variant="info" v-on:click="checkPassword($event)">Submit</b-button>
				</b-col>
			</b-row>

			<b-row v-if="emptyPassword == '1'">
				<b-col>
					<p>Please enter password and then press submit.</p>
				</b-col>
			</b-row>

			<b-row v-if="incorrectPassword == '1'">
				<b-col>
					<p>Incorrect Password.</p>
				</b-col>
			</b-row>

			<table class="table" v-if="correctPassword == '1'">
				<tr>
					<td><b>Start Date</b></td>
					<td>
						<b-input-group>
							<b-form-input id="example-input" v-model="downloadPeopleStartDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
								<b-input-group-append>
									<b-form-datepicker v-model="downloadPeopleStartDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
								</b-input-group-append>
						</b-input-group>
					</td>
				</tr>

				<tr>
					<td><b>End Date</b></td>
					<td>
						<b-input-group>
							<b-form-input id="example-input" v-model="downloadPeopleEndDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
								<b-input-group-append>
									<b-form-datepicker v-model="downloadPeopleEndDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
								</b-input-group-append>
						</b-input-group>
					</td>
				</tr>
				<tr>
					<td>
						<b-button variant="info" v-on:click="convertData($event)">Convert</b-button>
					</td>
				</tr>
			</table>

			<table class="dataTable" style="display:none;">
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Instagram</th>
					<th>Cellnumber</th>
					<th>Team Name</th>
					<th>Date of birth</th>
					<th>Adult/Minor</th>
					<th>Date Played</th>
					<th>Time Played</th>

				</tr>
				<tr v-for="item in downloadPlayerSearched" :key="item.id">
					<td>{{item.player_name}}</td>
					<td>{{item.player_email}}</td>
					<td>{{item.player_instagram}}</td>
					<td>{{item.player_phone}}</td>
					<td>{{item.player_team_name}}</td>
					<td>{{item.player_dob}}</td>
					<td>{{item.player_adult_minor}}</td>
					<td>{{item.player_session_date}}</td>
					<td>{{item.player_session_time}}</td>
				</tr>
			</table>

		</b-modal>

		<b-modal id="modal-profileDetail" centered size="xl" title="Profile" v-bind:hide-footer="true">
			<table class="table">
            <tr>
              <th>Player Name</th>
              <th>Email</th>
              <th>Cellnumber</th>
              <th>Instagram</th>
              <th>Gender</th>
              <th>Date of birth</th>
              <th>Waiver Id</th>
            </tr>

            <tr>
           <td>{{playerName}}</td>
            <td>{{playerEmail}}</td>
            <td>{{playerPhone}}</td>
            <td>{{playerInstagram}}</td>
            <td>
				<p v-if="playerGender == 1">Female</p>
				<p v-if="playerGender == 2">Male</p>
				<p v-if="playerGender == 3">Others</p>
				<p v-if="playerGender == 4">No answer</p>
            </td>
            <td>{{playerDateOfBirth}}</td>
            <td>
				<p v-if="playerWaiverId > '0'">{{playerWaiverId}}</p>
				<p v-else>Old Waiver</p>
            </td>
            </tr>
          </table>

          <table class="table">
				<h5> Game Play Details </h5>
				<tr>
					<th>Team Name</th>
					<th>Bomb Time</th>
					<th>Total Score</th>
					<th>Rfid</th>
					<th>Winners</th>
					<th>Mission</th>
					<th>Group Size</th>
					<th>Date Played</th>	              
				</tr>
				<tr v-for="item in playerTeamPlayerSessionDetail" :key="item.id">
					<td>{{item.team_name}}</td>
					<td>{{item.bomb_time}}</td>
					<td>{{item.total_score}}</td>
					<td>{{item.rfid_id}}</td>
					<td>
						<p v-if="item.winners > '0'">&#128163;</p>
						<p v-else>NO</p>
					</td>
					<td>
						<p v-if="item.battle_mode > '0'"><b>Battle Mode</b></p>
						<p v-if="item.mission_id == '1'">Cyberbot</p>
						<p v-if="item.mission_id == '2'">Block Monster</p>
						<p v-if="item.mission_id == '3'">Cyberbot Pro</p>
						<p v-if="item.mission_id == '4'">Cyberbot Halloween</p>
					</td>
					<td>{{item.size}}</td>
					<td>{{item.date_played}}</td>
				</tr>
          </table>

		</b-modal>
		<div>
			<b-row>
				<b-col lg="2">
					<!-- start of the left div which has navigation menu -->
					<b-list-group class="leftMenuDiv">
						<b-list-group-item href="/#/users">Check-In</b-list-group-item>
						<!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
						<b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
						<b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
						<b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
						<b-list-group-item href="/#/Playerdetails" active>Player Details</b-list-group-item>
						<b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
						<b-list-group-item href="/#/Social">Social Tagging</b-list-group-item>
						<!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
						<!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
					</b-list-group>
					<!-- end of navigation menu on left side -->
				</b-col>

				<b-col lg="10">
					<b-row>
						<b-col>
							<p class="teamTitle1">PLAYER DETAILS</p>
						</b-col>
						<b-col>
							<button v-on:click="clickedDownload()">Download</button>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col lg="3">
							<b-input-group class="mb-1">
								<b-form-input id="example-input" v-model="dateClicked" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
								<b-input-group-append>
									<b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
								</b-input-group-append>
							</b-input-group>
						</b-col>

						<b-col lg="3">
							<b-input-group class="mb-1">
								<b-form-input id="example-input" v-model="dateClickedEndDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
								<b-input-group-append>
									<b-form-datepicker v-model="dateClickedEndDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
								</b-input-group-append>
							</b-input-group>
						</b-col>

						
					<b-col lg="3">
						<b-input-group size="md">
						<b-form-input id="input-large" size="md" placeholder="Search here ... " v-on:change="searchPlayers()" v-model="searchedText"></b-form-input>
						<b-input-group-prepend>
						<span class="input-group-text" v-on:click="searchPlayers()" v-if="searchedText.length > '1'">&#128270;</span>
						<span class="input-group-text" v-else disabled>&#128270;</span>
						</b-input-group-prepend>
						</b-input-group>
					</b-col>

						<b-col lg="3">
							<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
						</b-col>
					</b-row>


					<b-col>
							<!-- opended pagination div -->
							<div class="overflow-auto">
								<!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->
								<b-table id="my-table" :items="teamList" :per-page="perPage" :current-page="currentPage" medium :fields="fields" style="text-align:left;">
									
									<template #cell(name)="data">
										<a href="#" @click="playerNameClicked(data.value,data.index)" style="text-transform:capitalize;">{{data.value}}</a>
									</template>
									
									<template #cell(adult_minor)="data2">
										<div v-if="data2.value > 0">Adult</div>
										<div v-else>Adult</div>
									</template>

									<template #cell(bomb_beater)="data1">
										<div v-if="data1.value > 0">&#128163;</div>
										<div v-else></div>
									</template>
									
								</b-table>
							</div>
							<!-- end of pagination div -->
						</b-col>

					<!-- try pagination -->


					<!-- <table class="table">
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
								<th scope="col">Waiver ID</th>
							</tr>
						</thead>
						<tbody v-for="item in teamList" v-bind:key="item.id">
							<tr v-for="detail in item.Team_player_sessions" v-bind:key="detail.id">
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
								<td>{{detail.Player.Person.waiver_id}}</td>
								</tr>
								</tbody>
							</table> -->

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
// import { mdbDatatable } from 'mdbvue';

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
	fields:['name','date_of_birth','adult_minor','play_count','bomb_beater'],

	playerProfile:[],
	searchedPeopleId:[],
	searchedPersonId:[],
	searchedTeamPlayerSession:[],
	teamNameTPSIndex:[],
	searchedIndexClicked:0,
	playerValue:0,

	dateClicked: '',
	dateClickedEndDate:'',
	selectedReservationDate: '',
	formatted: '',
	perPage: 20,
	currentPage: 1,
	searchedText:'',

	/** player profile detail **/
	playerName: '',
	playerEmail:'',
	playerPhone:'',
	playerInstagram:'',
	playerGender:'',
	playerDateOfBirth:'',
	playerWaiverId:'',
	playerTeamPlayerSessionDetail:[],
	/** end of player profile detail **/

	/** below is for password security **/
	passwordDetail:'',
	loginPage:1,
	emptyPassword:0,
	security:'btbsecure2017',
	incorrectPassword:0,
	correctPassword:0,
	downloadPeopleStartDate:moment().subtract('days',1).format('YYYY-MM-DD'),
	downloadPeopleEndDate:moment().format('YYYY-MM-DD'),
	/** end of password security **/

	/** download player detail **/
	downloadPlayerSearched:[],
	covertButtonValue:0,
	/** end of player download **/

	}
},

  mounted: function(){

console.log(moment().format('YYYY-MM-DD'));

    // var startDate = moment().subtract('days',7).format('YYYY-MM-DD');
    // var endDate = moment().add('days',6).format('YYYY-MM-DD');

    var startDate = moment().format('YYYY-MM-DD');
    var endDate = moment().add('days',1).format('YYYY-MM-DD');
    this.dateClicked = startDate;
    this.dateClickedEndDate = endDate;

            this.teamList = []; /** if it contained any value it will remove it first **/

        /** this will now change the check in list following the date **/

        // var starttime='start';
        // var endtime='end';

          // var currentdate = moment().format("YYYY-MM-DD");
          // var convertDate = this.dateClicked;

          // var startDate = moment(this.dateClicked).format("YYYY-MM-DD");

          // console.log(startDate+ ' was the current date.');

          // var endDate = moment(this.dateClickedEndDate).format('YYYY-MM-DD');

          // console.log(endDate);


        /** resetting the array **/
		this.searchedPeopleId = [];
		this.searchedPersonId = [];
		this.searchedTeamPlayerSession = [];
		this.teamList = [];
		this.playerTeamPlayerSessionDetail = [];
		/** end of array reset **/

		console.log(axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate));

		axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate,{

		})
		.then(response => 
		{
			// console.log(response.data[0].id);

			// console.log(response.data.length);

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;

				this.searchedPeopleId.push(peopleId);

				if(i+1 == totalSearchedText){
					// console.log('yes yes');
					// console.log(this.searchedPeopleId);
					var v = this;
					// setTimeout(function(){v.getPersonDetail(); }, 3000);
					console.log(this.searchedPeopleId);
					setTimeout(function(){
						console.log(v.searchedPeopleId);
						console.log(v.getPersonDetail());
						console.log('yes yes'); }, 1000);

				}
			}

		})
		.catch(function (error) {
			console.log(error);
		});
},

computed: {
    rows() {
       return this.teamList.length
    },
},

methods:{

	clickedDownload(){
		console.log('clicked download');
		this.$bvModal.show('modal-password');
	},

	checkPassword(event){

		// console.log(event);
		// console.log(event.key);
		// console.log(event.type);

		if(event.key == 'Enter' || event.type == 'click'){

			if(this.passwordDetail.length <'1'){
				this.incorrectPassword = '0';
				this.correctPassword = '0';
				this.loginPage = '1';
				this.emptyPassword = '1';
			}

			if(this.passwordDetail.length > '0'){
				this.loginPage = '1';
				this.emptyPassword = '0'; /** first it turn off empty password notification **/

				if(this.passwordDetail == this.security){
					console.log('password correct');
					this.loginPage = '0'; /** correct password close out login page **/
					this.incorrectPassword = '0';
					this.emptyPassword = '0'; /** first it turn off empty password notification **/
					this.correctPassword = '1';
				}
				else{
					this.loginPage = '1';
					this.incorrectPassword = '1';
					console.log('incorrect password ');
				}
			}
		}

	},

	convertData(event){

		console.log*(event);

		this.downloadPlayerSearched = []; /** this will empty the array first and load the new one again **/

		var startDownloadDate = this.downloadPeopleStartDate;
		var endDownloadDate = this.downloadPeopleEndDate;

		console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/start/'+startDownloadDate+'/end/'+endDownloadDate);

		axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/start/'+startDownloadDate+'/end/'+endDownloadDate,{

		})
		.then(response => 
		{
			console.log(response.data);

			// console.log(response.data[0].id);

			// console.log(response.data.length);

			var totalPlayerSearchedDownload = response.data.length;
			console.log(totalPlayerSearchedDownload);

			for (var i = 0; i < totalPlayerSearchedDownload; i++) {

				var session_id = response.data[i].id;
				var player_session_date = moment(response.data[i].session_time).format('YYYY-MM-DD');
				var player_session_time = moment(response.data[i].session_time).format('H:mm A');
				// var player_first_name = response.data[i].first_name;
				// var player_last_name = response.data[i].last_name;
				// var player_instagram = response.data[i].instagram;
				// var player_email = response.data[i].email;
				// var player_phone = response.data[i].phone;
				// var player_dob = response.data[i],date_of_birth;
				var player_team_name = response.data[i].Team.name;
				// var player_gender = response.data[i].gender;

				console.log(response.data[i].Team_player_sessions.length);

				for (var j = 0; j < response.data[i].Team_player_sessions.length; j++) {

					if(response.data[i].Team_player_sessions[j].player_minor_id > '0'){
						// console.log('yes minor');

						var player_first_name = response.data[i].Team_player_sessions[j].Player_minor.first_name;
						var player_last_name = response.data[i].Team_player_sessions[j].Player_minor.last_name;
						var player_dob = moment(response.data[i].Team_player_sessions[j].Player_minor.date_of_birth).format('YYYY-MM-DD');
						var player_email = ' ';
						var player_instagram = ' ';
						var player_phone = ' ';
						var player_adult_minor = 'Minor';

					}
					else{
						// console.log('adult');

						player_first_name = response.data[i].Team_player_sessions[j].Player.Person.first_name;
						player_last_name = response.data[i].Team_player_sessions[j].Player.Person.last_name;
						player_email = response.data[i].Team_player_sessions[j].Player.Person.email;
						player_dob = moment(response.data[i].Team_player_sessions[j].Player.Person.date_of_birth).format('YYYY-MM-DD');
						player_phone = response.data[i].Team_player_sessions[j].Player.Person.phone;
						player_instagram = response.data[i].Team_player_sessions[j].Player.Person.instagram;
						player_adult_minor = 'Adult';

					}

					let playerDownloadArray = {
						'id' : session_id,
						'player_team_name': player_team_name,
						'player_name': player_first_name+' '+player_last_name,
						'player_dob': player_dob,
						'player_email': player_email,
						'player_instagram': player_instagram,
						'player_phone': player_phone,
						'player_adult_minor' : player_adult_minor,
						'player_session_time' : player_session_time,
						'player_session_date' : player_session_date
					}

					this.downloadPlayerSearched.push(playerDownloadArray);
				}

				if(i+1 == totalPlayerSearchedDownload){
					console.log('yes last session id download part');

					this.covertButtonValue = '1';
					this.convertPlayerDownloadFile();
					// this.getPersonDetail();
					// console.log(this.searchedPersonId.length);

				}
			}

		})
		.catch(function (error) {
			console.log(error);
		});
	},

	convertPlayerDownloadFile(){
		console.log('inside cinvert player download file ');

		var csv = [];
		var rows = document.querySelectorAll("table.dataTable tr");

		console.log(rows.length);

		for (var i = 0; i < rows.length; i++) {
			var row = [], cols = rows[i].querySelectorAll("td, th");
			
			for (var j = 0; j < cols.length; j++) 
				row.push(cols[j].innerText);
			
			csv.push(row.join(","));        
		}

		// var filename = 'playersDetail'+moment().format('YYYY-MM-DD H:mm A');
		var filename = 'players'+moment().format('YYYY-MM-DD H:mm A')+'.csv';
		// Download CSV file
		this.downloadCSV(csv.join("\n"), filename);
	},

	downloadCSV(csv,filename){
		var csvFile;
		var downloadLink;

		// CSV file
		csvFile = new Blob([csv], {type: "text/csv"});

		// Download link
		downloadLink = document.createElement("a");

		// File name
		downloadLink.download = filename;

		// Create a link to the file
		downloadLink.href = window.URL.createObjectURL(csvFile);

		// Hide download link
		downloadLink.style.display = "none";

		// Add the link to DOM
		document.body.appendChild(downloadLink);

		// Click download link
		downloadLink.click();
		//    var v = this;
		// setTimeout(function(){v.getTeamPlayerSessionDetail(); }, 2000);
	},

	searchPlayers(){

		/** resetting the array **/
		this.searchedPeopleId = [];
		this.searchedPersonId = [];
		this.searchedTeamPlayerSession = [];
		this.teamList = [];
		this.playerTeamPlayerSessionDetail = [];
		/** end of array reset **/

		var searchText = this.searchedText;

		console.log(axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'searchText/'+searchText));

		axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'searchText/'+searchText,{

		})
		.then(response => 
		{
			// console.log(response.data[0].id);

			// console.log(response.data.length);

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;

				this.searchedPeopleId.push(peopleId);

				if(i+1 == totalSearchedText){
					console.log('yes yes');
					this.getPersonDetail();
					// console.log(this.searchedPersonId.length);

				}
			}

		})
		.catch(function (error) {
			console.log(error);
		});

// axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/searchText/'+searchText,{
//   // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

//   })
// .then(response => {
// console.log(response);
// // this.teamList = response.data;
// console.log(response.data.length);
	
// 	for (var i = 0; i < response.data.length; i++) { /** this for loop started for each session **/
// 		// console.log(response.data[i].id);

// 		var teamPlayerSessionLength = response.data[i].Team_player_sessions.length;
// 		console.log('team player session length '+teamPlayerSessionLength);

// 		for (var j = 0; j < teamPlayerSessionLength; j++) { /** for loop to get each player detail from Team_player_sessions **/


// 			if(response.data[i].Team_player_sessions[j].player_minor_id > '0'){ /** checks if its minor **/
// 				var minorLastName = response.data[i].Team_player_sessions[j].Player_minor.last_name;
// 				var minorFirstName = response.data[i].Team_player_sessions[j].Player_minor.first_name;
// 				var minorId = response.data[i].Team_player_sessions[j].Player_minor.id;
// 				var minorDOB =  response.data[i].Team_player_sessions[j].Player_minor.date_of_birth;
// 				// var minorBombBeater =  response.data[i].Team_player_sessions[j].Player_minor.bomb_beater;
// 				// var minorPlayCount =  response.data[i].Team_player_sessions[j].Player_minor.play_count;
// 				// var minorTeamName = response.data[i].Team.name;
// 				// var minorBookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
// 				// var minorBookerLastName = response.data[i].Reservation.Booker.Person.last_name;

// 				let playerArray = {
// 					'id' : minorId,
// 					'name': minorFirstName+ ' ' +minorLastName,
// 					'date_of_birth': minorDOB,
// 					// 'team_name' : minorTeamName,
// 					'bomb_beater': ' ',
// 					'play_count' : ' ',
// 					'adult/minor' : 'Minor'
// 				}

// 				this.teamList.push(playerArray);
// 			}/** end of minor IF loop **/

// 			else{/** this is player not minor **/

// 				var playerLastName = response.data[i].Team_player_sessions[j].Player.Person.last_name;
// 				var playerFirstName = response.data[i].Team_player_sessions[j].Player.Person.first_name;
// 				var playerId = response.data[i].Team_player_sessions[j].Player.Person.id;
// 				var playerDOB =  response.data[i].Team_player_sessions[j].Player.Person.date_of_birth;
// 				// var playerEmail =  response.data[i].Team_player_sessions[j].Player.Person.email;
// 				// var playerInsta =  response.data[i].Team_player_sessions[j].Player.Person.instagram;
// 				var bombBeater =  response.data[i].Team_player_sessions[j].Player.bomb_beater;

// 				if(response.data[i].Team_player_sessions[j].Player.play_count > 0){
// 					var playCount = 'R'+response.data[i].Team_player_sessions[j].Player.play_count;
// 				}
// 				else{
// 					playCount = response.data[i].Team_player_sessions[j].Player.play_count;
// 				}

// 				// if(response.data[i].Team_player_sessions[j].Player.bomb_beater > 0){
// 				// 	var bombBeater = "1";
// 				// }
// 				// else{
// 				// 	bombBeater = response.data[i].Team_player_sessions[j].Player.bomb_beater;
// 				// }

// 				// var playCount =  response.data[i].Team_player_sessions[j].Player.play_count;
// 				// var teamName = response.data[i].Team.name;
// 				// var bookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
// 				// var bookerLastName = response.data[i].Reservation.Booker.Person.last_name;

// 				let playerArray = {
// 					'id' : playerId,
// 					'name': playerFirstName+ ' ' +playerLastName,
// 					'date_of_birth': playerDOB,
// 					// 'team_name' : teamName,
// 					// 'email' : playerEmail,
// 					// 'instagram' : playerInsta,
// 					'adult/minor' : 'Adult',
// 					'bomb_beater': bombBeater,
// 					'play_count' : playCount
// 				}

// 				this.teamList.push(playerArray);

// 			}/** end of Player Else loop **/


// 		}/** end of for loop for each player detail from Team_player_sessions **/

// 	}/** end of for loop for SESSION **/

// })
// .catch(function (error) {
// console.log(error);
// });

/** end of changing reservation date **/ 

	},

	getPersonDetail(){
		console.log('use this function now');
		for (var k = 0; k < this.searchedPeopleId.length; k++) {

			axios.get(process.env.VUE_APP_DATABASE_PLAYERS+'person/'+this.searchedPeopleId[k],{

			})
			.then(response => 
				{	
					console.log(response.data[0]);

						if(response.data[0].id > '0'){


							var bomb_beater = response.data[0].bomb_beater;
							var play_count = response.data[0].play_count;
							var player_id = response.data[0].id;
							var people_id = response.data[0].person_id;

							axios.get(process.env.VUE_APP_DATABASE_PEOPLE+people_id,{

							})
							.then(response => 
							{
								// console.log(response.data);

								var personDetail = {
									"bomb_beater":bomb_beater,
									"play_count":play_count,
									"id":player_id, /** this is player id **/
									"person_id":people_id, /** this is person/people id **/
									"name":response.data.first_name+' '+response.data.last_name,
									"email":response.data.email,
									"instagram":response.data.instagram,
									"phone":response.data.phone,
									"date_of_birth":response.data.date_of_birth,
									"gender": response.data.gender_id,
									"waiver_id":response.data.waiver_id
								}

								this.teamList.push(personDetail);

							})
							.catch(function (error) {
								console.log(error);
							});

						}

				})
				.catch(function (error) {
					console.log(error);
				});


			if(k+1 == this.searchedPeopleId.length){
				var v = this;
				setTimeout(function(){v.getTeamPlayerSessionDetail(); }, 2000); /** setting up 1 sec delay to pass person detail **/
			}
				
		}
	},

	getTeamPlayerSessionDetail(){
		console.log('searched person length '+this.teamList.length);
		for (var i = 0; i < this.teamList.length; i++) {
			// console.log(this.teamList[i].person_id);
			var getPlayerId = this.teamList[i].id;

			axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId,{

			})
			.then(response => 
			{	
				console.log(response.data);
				this.searchedTeamPlayerSession.push(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},

	playerNameClicked(value,clickedIndex){

		this.playerTeamPlayerSessionDetail = [];

		var index = this.currentPage*this.perPage+clickedIndex-this.perPage;

		console.log('index '+index);
		console.log('current page value '+this.currentPage);
		console.log('per page value '+this.perPage);
		console.log('clicked index was '+clickedIndex);

		this.searchedIndexClicked = index;

		// alert(this.teamList[index].id);
		// var peopleId = this.teamList[index].id;

		console.log(this.teamList[index]);
		// console.log(this.searchedTeamPlayerSession);

		var v = this;
		setTimeout(function(){
			v.searchedTeamPlayerSession[index];
			console.log(v.searchedTeamPlayerSession[index]);

			v.playerProfile = v.searchedTeamPlayerSession[index];

			v.playerName = v.teamList[index].name;
			v.playerPhone = v.teamList[index].phone;
			v.playerEmail = v.teamList[index].email;
			v.playerInstagram = v.teamList[index].instagram;
			v.playerGender = v.teamList[index].gender;
			v.playerDateOfBirth = v.teamList[index].date_of_birth;
			v.playerWaiverId = v.teamList[index].waiver_id;

			
			for (var i = 0; i < v.playerProfile.length; i++) {

				// console.log(v.playerProfile.length);
				// console.log('index value was '+index);
				console.log('i value was this as '+i);
				// console.log(v.searchedTeamPlayerSession[index]);

				// var arrayNumber = i;

				var playerRfid = v.searchedTeamPlayerSession[index][i].rfid_id;

				var bomb_time_minute = Math.floor(v.searchedTeamPlayerSession[index][i].Session.bomb_time/60);
				var bomb_time_seconds = Math.floor(v.searchedTeamPlayerSession[index][i].Session.bomb_time) - bomb_time_minute * 60;

				var bomb_time = bomb_time_minute+':'+bomb_time_seconds;

				// var bomb_time = v.searchedTeamPlayerSession[index][i].Session.bomb_time;
				var mission_id = v.searchedTeamPlayerSession[index][i].Session.mission_id;
				var total_score = v.searchedTeamPlayerSession[index][i].Session.total_score;
				var player_count = v.searchedTeamPlayerSession[index][i].Session.player_count;
				var winners = v.searchedTeamPlayerSession[index][i].Session.winners;
				var playedAt = moment(v.searchedTeamPlayerSession[index][i].Session.createdAt).format("YYYY-MM-DD hh:mm A");
				var battleMode = v.searchedTeamPlayerSession[index][i].Session.team_vs_team_id;
				var team_name = v.searchedTeamPlayerSession[index][i].Team.name;

				console.log(playerRfid);

				if(battleMode > '0'){
					battleMode = '1';
				}

				var teamId =v.searchedTeamPlayerSession[index][i].Session.team_id;

				// axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/'+teamId,{

				// })
				// .then(response => 
				// {	

				// 	console.log(response);

				// console.log('i value was this as '+i);


				// })
				// .catch(function (error) {
				// 	console.log(error);
				// });

				var playerTPSdetails = {
						"rfid_id" : playerRfid,
						"total_score": total_score,
						"mission_id": mission_id,
						"bomb_time": bomb_time,
						"size":player_count,
						"winners":winners,
						"date_played":playedAt,
						"team_id": teamId,
						"battle_mode": battleMode,
						"team_name":team_name
					};

				v.playerTeamPlayerSessionDetail.push(playerTPSdetails);

			}

			v.$bvModal.show('modal-profileDetail');
			}
			, 1000); /** setting up 1 sec delay to pass person detail **/
		// console.log(this.searchedTeamPlayerSession[index]);

		// axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{
		
		// })
		// .then(response => 
		// {
		// console.log(response);
		// this.playerProfile = response.data;
		// // console.log(this.playerProfile.first_name);
		// if(response.data.id > 0){
		// 	console.log('greater');
		// 	this.$bvModal.show('modal-profileDetail');
		// }
		
		// })
		// .catch(function (error){
		// 	console.log(error);
		// });
			// alert(value);
	},

	onContext(ctx) {

		// console.log('play count was '+this.searchedPersonId[0].play_count);

        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted;
        // The following will be an empty string until a valid date is entered
        this.selectedReservationDate = ctx.selectedYMD;

        console.log("CHANGED DATE");
        console.log(this.dateClicked);
        console.log(this.formatted);

        this.teamList = []; /** if it contained any value it will remove it first **/

        /** this will now change the check in list following the date **/

        // var starttime='start';
        // var endtime='end';

          // var currentdate = moment().format("YYYY-MM-DD");
          // var convertDate = this.dateClicked;

          var startDate = moment(this.dateClicked).format("YYYY-MM-DD");

          console.log(startDate+ ' was the current date.');

          var endDate = moment(this.dateClickedEndDate).format('YYYY-MM-DD');

          console.log(endDate);


        /** resetting the array **/
		this.searchedPeopleId = [];
		this.searchedPersonId = [];
		this.searchedTeamPlayerSession = [];
		this.teamList = [];
		this.playerTeamPlayerSessionDetail = [];
		/** end of array reset **/

		console.log(axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate));

		axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate,{

		})
		.then(response => 
		{
			// console.log(response.data[0].id);

			// console.log(response.data.length);

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;

				this.searchedPeopleId.push(peopleId);

				if(i+1 == totalSearchedText){
					// console.log('yes yes');
					// console.log(this.searchedPeopleId);
					var v = this;
					// setTimeout(function(){v.getPersonDetail(); }, 3000);
					console.log(this.searchedPeopleId);
					setTimeout(function(){
						console.log(v.searchedPeopleId);
						console.log(v.getPersonDetail());
						console.log('yes yes'); }, 1000);

				}
			}

		})
		.catch(function (error) {
			console.log(error);
		});



// console.log(axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500'));

// axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_team_for_players/start/'+startDate+'/end/'+endDate+'/limit/500',{
//   // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

//   })
// .then(response => {
// console.log(response);
// // this.teamList = response.data;
// console.log(response.data.length);
	
// 	for (var i = 0; i < response.data.length; i++) { /** this for loop started for each session **/
// 		// console.log(response.data[i].id);

// 		var teamPlayerSessionLength = response.data[i].Team_player_sessions.length;
// 		console.log('team player session length '+teamPlayerSessionLength);

// 		for (var j = 0; j < teamPlayerSessionLength; j++) { /** for loop to get each player detail from Team_player_sessions **/


// 			if(response.data[i].Team_player_sessions[j].player_minor_id > '0'){ /** checks if its minor **/
// 				var minorLastName = response.data[i].Team_player_sessions[j].Player_minor.last_name;
// 				var minorFirstName = response.data[i].Team_player_sessions[j].Player_minor.first_name;
// 				var minorId = response.data[i].Team_player_sessions[j].Player_minor.id;
// 				var minorDOB =  response.data[i].Team_player_sessions[j].Player_minor.date_of_birth;
// 				// var minorBombBeater =  response.data[i].Team_player_sessions[j].Player_minor.bomb_beater;
// 				// var minorPlayCount =  response.data[i].Team_player_sessions[j].Player_minor.play_count;
// 				// var minorTeamName = response.data[i].Team.name;
// 				// var minorBookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
// 				// var minorBookerLastName = response.data[i].Reservation.Booker.Person.last_name;

// 				let playerArray = {
// 					'id' : minorId,
// 					'name': minorFirstName+ ' ' +minorLastName,
// 					'date_of_birth': minorDOB,
// 					// 'team_name' : minorTeamName,
// 					'bomb_beater': ' ',
// 					'play_count' : ' ',
// 					'adult/minor' : 'Minor'
// 				}

// 				this.teamList.push(playerArray);
// 			}* end of minor IF loop *

// 			else{/** this is player not minor **/

// 				var playerLastName = response.data[i].Team_player_sessions[j].Player.Person.last_name;
// 				var playerFirstName = response.data[i].Team_player_sessions[j].Player.Person.first_name;
// 				var playerId = response.data[i].Team_player_sessions[j].Player.Person.id;
// 				var playerDOB =  response.data[i].Team_player_sessions[j].Player.Person.date_of_birth;
// 				// var playerEmail =  response.data[i].Team_player_sessions[j].Player.Person.email;
// 				// var playerInsta =  response.data[i].Team_player_sessions[j].Player.Person.instagram;
// 				var bombBeater =  response.data[i].Team_player_sessions[j].Player.bomb_beater;

// 				if(response.data[i].Team_player_sessions[j].Player.play_count > 0){
// 					var playCount = 'R'+response.data[i].Team_player_sessions[j].Player.play_count;
// 				}
// 				else{
// 					playCount = response.data[i].Team_player_sessions[j].Player.play_count;
// 				}

// 				// if(response.data[i].Team_player_sessions[j].Player.bomb_beater > 0){
// 				// 	var bombBeater = "1";
// 				// }
// 				// else{
// 				// 	bombBeater = response.data[i].Team_player_sessions[j].Player.bomb_beater;
// 				// }

// 				// var playCount =  response.data[i].Team_player_sessions[j].Player.play_count;
// 				// var teamName = response.data[i].Team.name;
// 				// var bookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
// 				// var bookerLastName = response.data[i].Reservation.Booker.Person.last_name;

// 				let playerArray = {
// 					'id' : playerId,
// 					'name': playerFirstName+ ' ' +playerLastName,
// 					'date_of_birth': playerDOB,
// 					// 'team_name' : teamName,
// 					// 'email' : playerEmail,
// 					// 'instagram' : playerInsta,
// 					'adult/minor' : 'Adult',
// 					'bomb_beater': bombBeater,
// 					'play_count' : playCount
// 				}

// 				this.teamList.push(playerArray);

// 			}/** end of Player Else loop **/


// 		}/** end of for loop for each player detail from Team_player_sessions **/

// 	}/** end of for loop for SESSION **/

// })
// .catch(function (error) {
// console.log(error);
// });

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
