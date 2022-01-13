<template>
	<div id="app" style="width: 80%; margin:auto;">

		<br><br>

		<b-modal id="modal-downloadedSuccesfully" centered size="md" title="Success" v-bind:hide-footer="true">
			<p style="color:#138496;"> Downloaded players detail from <b>{{downloadPeopleStartDate}}</b> till <b>{{downloadPeopleEndDate}}</b>. </p>
		</b-modal>

		<b-modal id="modal-playerDetailEmpty" centered size="md" v-bind:hide-footer="true" title="No Details">
			We have no details for this player as
			<br><br>
			&#8226; This player might be an adult who signed waiver as spectator for minor.
			<br>
			&#8226; This player might be a booker who used different emails to book and sign waiver.
			<br>
			&#8226; Signed the waiver but did not play.
			<br>
			&#8226; This player might be really old player before 2019 and missing out some data.
			<br><br>
			If you see multiple names for this player. Please click on cancel and try out the other link.
			<br>
			<br>
			<button type="button" class="btn btn-info" v-on:click="hidePlayerDetailEmpty()" style="margin-left:2%;">Cancel</button>
		</b-modal>

		<b-modal id="modal-playerNameNotFound" centered size="md" v-bind:hide-footer="true" title="Message">
			<p class="paragraph">Cannot find player of that name. Please use the correct first name, last name or email.
        </p>
        <br>
        <b-button variant="primary" v-on:click="hidePlayerNameNotFound()">Ok</b-button>
		</b-modal>

		<b-modal id="modal-minorBookerDetailsModal" centered size="lg" v-bind:hide-footer="true" title="Waiver Signed By">
			<table class="table table-borderless" style="text-transform:capitalize; border: none;">
				<tr style="font-weight:bold;">
					<td>Name</td>
					<td>Email</td>
					<td>Phone Number</td>
					<td>Instagram</td>
					<td>Waiver Id</td>
				</tr>
				<tr>
					<td style="text-transform:capitalize;">{{waiverSignedFirstName}} {{waiverSignedLastName}}</td>
					<td>{{waiverSignedEmail}}</td>

					<td>{{waiverSignedPhone}}</td>

					<td>{{waiverSignedInstagram}}</td>
					<td>{{waiverSignedWaiverId}}</td>
				</tr>
			</table>
		</b-modal>

		<b-modal id="modal-teamPlayerDetails" centered size="lg" :title="teamClikedName" v-bind:hide-footer="true">
			<h6 align="center" style="text-transform: capitalize;">Players Detail</h6>
			<br>
			<table class="table" style="text-transform:capitalize; font-size: 0.8rem;">
				<tr style="font-weight:bold;">
					<td>Player Name</td>
					<td>Email</td>
					<td>Phone Number</td>
					<td>Instagram</td>
					<td>Detail</td>
					<td>Date of birth</td>
					<td>Tag</td>
					<!-- <td>Played Date</td> -->
					<!-- <td>Played Time</td> -->

				</tr>
				<tr v-for="(item,index) in clickedPeopleDetail" v-bind:key="item.id">
					<td>
						<p v-if="item.minor == 'Minor'">
							<a href="#/Playerdetails" @click="minorNameClicked(index)" style="text-transform:capitalize;">{{item.fullName}}</a>
						</p>
						<p v-else>{{item.fullName}}</p>
					</td>
					<td>{{item.email}}</td>
					<td>{{item.phone}}</td>
					<td>{{item.instagram}}</td>
					<td>{{item.minor}}</td>
					<td>{{item.date_of_birth}}</td>
					<td>
						<span v-if="item.play_count > '0'">R{{item.play_count}}</span>
						<span v-if="item.bomb_beater > '0'">&nbsp; &#128163;</span>
					</td>
					<!-- <td>{{item.date_played}}</td> -->
					<!-- <td>{{item.time_played_at}}</td> -->
				</tr>
			</table>
			<h6 align="center" style="text-transform: capitalize;">Booker Detail</h6>
			<br>
			<table class="table" style=" font-size: 0.8rem;">
				<tr style="font-weight:bold;">
					<td>Booker Name</td>
					<td>Email</td>
					<td>Phone Number</td>
					<td>Instagram</td>
				</tr>
				<tr>
					<td style="text-transform:capitalize;">{{teamBookerFirstName}} {{teamBookerLastName}}</td>
					<td>{{teamBookerEmail}}</td>

					<td>{{teamBookerPhone}}</td>

					<td>{{teamBookerInstagram}}</td>

				</tr>
			</table>

			<br>
			<h5 align="center" style="text-transform: capitalize;" v-if="teamMedia10.length > '0'">
				<a :href="(teamMedia10)" target="_blank">
					Photobomb Photos/Videos
				</a>
			</h5>
			<h5 align="center" style="text-transform: capitalize;" v-else>
				Photobomb Photos/Videos
			</h5>
			<table class="table">
      <!-- <tr>
        <td style="width:10%;">{{teamMedia0}}</td>
        <figure class="media"><iframe v-bind:src="(teamMedia0)"></iframe></figure>
      </tr> -->
      <tr>
    <td>
      <figure class="container media">
      <img v-bind:src="(teamMedia8)" style="height:100%;width:100%;">
     </figure>

     <!-- <button v-on:click="clickedDownload(teamMedia8)">Download Image</button> -->
   </td>

   <td>
     <figure class="container media">
      <img v-bind:src="(teamMedia3)" style="height:100%;width:100%;">
     </figure>

   </td>

   <td>
     <figure class="container media">
      <img v-bind:src="(teamMedia4)" style="height:100%;width:100%;">
     </figure>
   </td>
      </tr>

      <tr>
   <td>
     <figure class="container media">
      <img v-bind:src="(teamMedia5)" style="height:100%;width:100%;">
     </figure>
   </td>

   <td>
     <figure class="container media">
      <img v-bind:src="(teamMedia6)" style="height:100%;width:100%;">
     </figure>
   </td>

   <td>
     <figure class="container media">
      <img v-bind:src="(teamMedia7)" style="height:100%;width:100%;">
     </figure>
   </td>
      </tr>

      <tr>

   <td>
     <figure class="container media">
      <video style="height:100%;width:100%;" controls>
      <source :src="(teamMedia1)" type="video/mp4">
      </video>
  </figure>
     </td>

     <td>
  <figure class="container media">
      <video style="height:100%;width:100%;" controls>
      <source :src="(teamMedia9)" type="video/mp4">
      </video>
  </figure>
  </td>

  <td>
  <figure class="container media">
      <img v-bind:src="(teamMedia2)" style="height:100%;width:100%;">
  </figure>
  </td>
     </tr>

     <tr>
  <h5>
  <a :href="(teamMedia0)" target="_blank">Download Scoresheet</a>
  </h5>
     </tr>

     <!--  <tr>
        <td style="width:10%;">{{teamMedia4}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia5}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia6}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia7}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia8}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia9}}</td>
      </tr> -->
    </table>
    
  </b-modal>

  <b-modal id="modal-password" centered size="md" title="Player Details Download" v-bind:hide-footer="true">
  <b-row v-if="loginPage == '1' ">
 <b-col lg="8">
 <b-form-input id="example-input" v-model="passwordDetail" type="password" placeholder="Please Enter Password" autocomplete="off" v-on:keypress="checkPassword($event)"></b-form-input>
 </b-col>

 <b-col lg="2">
 <b-button variant="info" v-on:click="checkPassword($event)">Submit</b-button>
 </b-col>
  </b-row>

  <br>

  <b-row v-if="emptyPassword == '1'">
 <b-col>
 <p style="color:red;font-family:italic;">Please enter password and click submit.</p>
 </b-col>
  </b-row>

  <b-row v-if="incorrectPassword == '1'">
 <b-col>
 <p style="color:red;font-family:italic;">Incorrect Password.</p>
 </b-col>
  </b-row>

  <table class="table" v-if="correctPassword == '1'">
 <tr>
 <td><b>Start Date</b></td>
 <td>
 <b-input-group>
  <b-form-input id="example-input" v-model="downloadPeopleStartDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
  <b-input-group-append>
  <b-form-datepicker v-model="downloadPeopleStartDate" button-only right locale="en-US" aria-controls="example-input" @context="onContextDownload"></b-form-datepicker>
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
  <b-form-datepicker v-model="downloadPeopleEndDate" button-only right locale="en-US" aria-controls="example-input" @context="onContextDownload"></b-form-datepicker>
 </b-input-group-append>
 </b-input-group>
 </td>
 </tr>
 <tr>
 <td>
 <b-button variant="info" v-on:click="convertData($event)">File Download</b-button>
 </td>
 </tr>
  </table>

  <table class="dataTable" style="display:none;">
 <tr style="font-weight:bold;">
 <th>Name</th>
 <th>Email</th>
 <th>Instagram</th>
 <th>Phone Number</th>
 <th>Team Name</th>
 <th>Date of birth</th>
 <th>Adult/Minor</th>
 <!-- <th>Tags</th> -->
 <th>Date Played</th>
 <th>Time Played</th>
 </tr>
 <tr v-for="item in downloadPlayerSearched" :key="item.id">
 <td>{{item.player_name}}</td>
 <td>{{item.player_email}}</td>
 <td>{{item.player_instagram}}</td>
 <td>{{item.player_phone}}</td>
 <td style="text-transform:capitalize;">{{item.player_team_name}}</td>
 <td>{{item.player_dob}}</td>
 <td>{{item.player_adult_minor}}</td>
 <!-- <td>R</td> -->
 <td>{{item.player_session_date}}</td>
 <td>{{item.player_session_time}}</td>
 </tr>
  </table>

  </b-modal>

  <b-modal id="modal-profileDetail" centered size="xl" title="Profile" v-bind:hide-footer="true">
  <table class="table table-borderless">
 <tr>
 <th>Player Name</th>
 <th>Email</th>
 <th>Phone Number</th>
 <th>Instagram</th>
 <th>Gender</th>
 <th>Date of birth</th>
 <th>Tags</th>
 <!-- <th>Organization</th> -->
 <th>Waiver Id</th>
 </tr>

 <tr>
 <td style="text-transform:capitalize;">{{playerName}}</td>
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
 <!-- <td>Toodle</td> -->
 <td>
 <b-row>
 <b-col cols="2" v-if="playerPlayCount > '0' ">R{{playerPlayCount}}</b-col>
 <b-col v-if="playerBombBeater > '0' "> &#128163; </b-col>
 </b-row>
 </td>
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
 <tr v-for="(item,index) in playerTeamPlayerSessionDetail" :key="item.id">
 <td style="text-transform:capitalize;">
 <a href="#/Playerdetails" @click="clickedTeamName(index)">{{item.team_name}}</a></td>
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

  <div id="disablePage" v-if="loadingBar == '1'">

  </div>

  <div v-if="loadingBar == '1' " >
 <button class="btn btn-primary btn-lg" type="button" disabled>
 <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
 Loading Data ...
 </button>
  </div>

  <div>
 <b-row>
 <b-col lg="2">
 <!-- start of the left div which has navigation menu -->
 <b-list-group class="leftMenuDiv">
 <b-list-group-item href="/#/users">Check-In</b-list-group-item>
 <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
 <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
 <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
 <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
 <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
 <b-list-group-item href="/#/Playerdetails" active>Player Details</b-list-group-item>
 <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
 <b-list-group-item href="/#/Social">Team Summary</b-list-group-item>
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
  <b-button variant="info" v-on:click="clickedDownload()">Download</b-button>
 </b-col>
 </b-row>
 <br>
 <b-row>
 <b-col lg="2">
  <p class="h6" style="margin-top:5%;"><b>Search By Date</b></p>
 </b-col>
 <b-col lg="3" style="margin-left: -2%;">
  <b-input-group class="mb-1">
  <b-form-input id="example-input" v-model="dateClicked" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
  <b-input-group-append>
  <!-- <b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker> -->
  <b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" v-on:input="onContext(dateClicked)"></b-form-datepicker>
 </b-input-group-append>
 </b-input-group>
 </b-col>

<!-- <b-col lg="3">
<b-input-group class="mb-1">
<b-form-input id="example-input" v-model="dateClickedEndDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
<b-input-group-append>
<b-form-datepicker v-model="dateClickedEndDate" button-only right locale="en-US" aria-controls="example-input"  v-on:input="onContext(dateClickedEndDate)"></b-form-datepicker>
</b-input-group-append>
</b-input-group>
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
<a href="/#/Playerdetails" @click="playerNameClicked(data.value,data.index)" style="text-transform:capitalize;">{{data.value}}</a>
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
 searchedPeopleId:[],	searchedPersonId:[],	searchedTeamPlayerSession:[],	teamNameTPSIndex:[],	searchedIndexClicked:0,	playerValue:0,
 dateClicked: '',	dateClickedEndDate:'',	selectedReservationDate: '',	formatted: '',	perPage: 20,	currentPage: 1,	searchedText:'',
 /** player profile detail **/	playerName: '',	playerEmail:'',	playerPhone:'',	playerInstagram:'',	playerGender:'',	playerDateOfBirth:'',	playerWaiverId:'',	playerPlayCount:'',	playerBombBeater:'',	playerTeamPlayerSessionDetail:[],	/** end of player profile detail **/
 /** player/booker/team details once the team name is clicked **/	teamBookerFirstName:'',	teamBookerLastName:'',	teamBookerEmail:'',	teamBookerPhone:'',	teamBookerInstagram:'',	teamClikedName:'',	clickedPeopleDetail:[],
 minorWaiverSigned : [],	waiverSignedFirstName : '',	waiverSignedLastName : '',	waiverSignedEmail : '',	waiverSignedPhone : '',	waiverSignedInstagram : '',	waiverSignedWaiverId : '',
 teamMedia:[],	teamMedia0:'',	teamMedia1:'',	teamMedia2:'',	teamMedia3:'',	teamMedia4:'',	teamMedia5:'',	teamMedia6:'',	teamMedia7:'',	teamMedia8:'',	teamMedia9:'',	teamMedia10:'', /** gets pthobomb url from session_media_assets 14 **/
 /** end of player/booker/team details**/
 /** below is for password security **/	passwordDetail:'',	loginPage:1,	emptyPassword:0,	security:'btbsecure2017',	incorrectPassword:0,	correctPassword:0,	downloadPeopleStartDate:moment().subtract('days',1).format('YYYY-MM-DD'),	downloadPeopleEndDate:moment().format('YYYY-MM-DD'),	/** end of password security **/
 /** download player detail **/	downloadPlayerSearched:[],	covertButtonValue:0,	/** end of player download **/
 loadingBar: '',
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
		// this.teamList = [];
		this.playerTeamPlayerSessionDetail = [];
		/** end of array reset **/

		console.log(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate);

		axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate,{

		})
		.then(response => 
		{
			// console.log(response.data[0].id);

			console.log('total player ' +response.data.length);

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;

				console.log(response.data[i].id);
				console.log(peopleId);

				this.searchedPeopleId.push(peopleId);

				if(i+1 == totalSearchedText){
					console.log('ul');
					var v = this;
					// console.log(this.searchedPeopleId);
					setTimeout(function(){
						// console.log(v.searchedPeopleId);
						v.getPersonDetail();
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

		hidePlayerNameNotFound(){
			this.$bvModal.hide('modal-playerNameNotFound');
		},

		hidePlayerDetailEmpty(){
			this.$bvModal.hide('modal-playerDetailEmpty');
		},

		clickedTeamName(index){

			this.clickedPeopleDetail = [];

			console.log('clicked on team name');
			console.log(this.playerProfile[index]);

			var clickedSessionId = this.playerProfile[index];
			/** booker details **/
			axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/booker_detail/'+clickedSessionId,{

			})
			.then(response => 
			{
				console.log(response);
        // this.bookerDetail = response.data[0];

        this.teamBookerFirstName = response.data[0].Reservation.Booker.Person.first_name;
        this.teamBookerLastName = response.data[0].Reservation.Booker.Person.last_name;
        this.teamBookerEmail = response.data[0].Reservation.Booker.Person.email;
        this.teamBookerInstagram = response.data[0].Reservation.Booker.Person.instagram;
        this.teamBookerPhone = response.data[0].Reservation.Booker.Person.phone;
        this.teamClikedName = response.data[0].Team.name;

        this.$bvModal.show('modal-teamPlayerDetails');

        var tpsLength = response.data[0].Team_player_sessions.length;

        for (var i = 0; i < tpsLength; i++) {

     var checkMinor = response.data[0].Team_player_sessions[i].Player_minor;

     if(checkMinor == null){

       console.log('not minor');

       var player_first_name = response.data[0].Team_player_sessions[i].Player.Person.first_name;
       var player_last_name = response.data[0].Team_player_sessions[i].Player.Person.last_name;
       var player_email = response.data[0].Team_player_sessions[i].Player.Person.email;
       var player_phone = response.data[0].Team_player_sessions[i].Player.Person.phone;
       var player_date_of_birth = response.data[0].Team_player_sessions[i].Player.Person.date_of_birth;
       var player_instagram = response.data[0].Team_player_sessions[i].Player.Person.instagram;
       var player_play_count = response.data[0].Team_player_sessions[i].Player.play_count;
       var player_bomb_beater = response.data[0].Team_player_sessions[i].Player.bomb_beater;
       var last_played_date = moment(response.data[0].Team_player_sessions[i].updatedAt).format('MM-DD-YYYY');
       var last_played_time = moment(response.data[0].Team_player_sessions[i].updatedAt).format('H:mm A');

       var playerDetail = {
    "fullName" : player_first_name+' '+player_last_name,
    "date_of_birth" : player_date_of_birth,
    "play_count" : player_play_count,
    "bomb_beater" : player_bomb_beater,
    "date_played" : last_played_date,
    "time_played_at" : last_played_time,
    "instagram" : player_instagram,
    "phone" : player_phone,
    "email" : player_email,
    "minor" : 'Adult'
       }

       this.clickedPeopleDetail.push(playerDetail);


     }
     else{

       console.log('it was minor');

       var minor_first_name = response.data[0].Team_player_sessions[i].Player_minor.first_name;
       var minor_last_name = response.data[0].Team_player_sessions[i].Player_minor.last_name;
       var minor_date_of_birth = response.data[0].Team_player_sessions[i].Player_minor.date_of_birth;
       var minor_play_count = response.data[0].Team_player_sessions[i].Player_minor.play_count;
       var minor_last_played_date = moment(response.data[0].Team_player_sessions[i].Player_minor.updatedAt).format('MM-DD-YYYY');
       var minor_last_played_time = moment(response.data[0].Team_player_sessions[i].Player_minor.updatedAt).format('H:mm A');
       var minor_id = response.data[0].Team_player_sessions[i].Player_minor.id;
       var signed_player_id = response.data[0].Team_player_sessions[i].Player_minor.player_id;

       var minorDetail = {
    "fullName" : minor_first_name+' '+minor_last_name,
    "date_of_birth" : minor_date_of_birth,
    "play_count" : minor_play_count,
    "date_played" : minor_last_played_date,
    "time_played_at" : minor_last_played_time,
    "instagram" : ' ',
    "phone" : ' ',
    "email" : ' ',
    "minor" : 'Minor',
    "player_minor_id": minor_id,
    "player_id": signed_player_id
       }

       this.clickedPeopleDetail.push(minorDetail);

     }
        }
      })
			.catch(function (error) {
				console.log(error);
			});

			/** session media assets **/

			axios.get(process.env.VUE_APP_SESSION_MEDIA_ASSETS+'/session/'+clickedSessionId,{

			})
			.then(response => 
			{
				console.log(response);
				console.log(response.data.length);

				var clickedSessionIdLength = response.data.length;

				for (var i = 0; i < clickedSessionIdLength; i++) {

              // valueName[i] == response.data[i].s3_url;

              this['teamMedia'+i] = response.data[i].s3_url;

              if(response.data[i].session_media_item_id == '14'){
           this.teamMedia10 = response.data[i].s3_url;
              }

            }
          })
			.catch(function (error) {
				console.log(error);
			});



			
		},

		minorNameClicked(index){
			console.log('minor name clicked');
			this.minorWaiverSigned = [];

			console.log(this.clickedPeopleDetail[index]);
			var playerId = this.clickedPeopleDetail[index].player_id;

			axios.get(process.env.VUE_APP_DATABASE_PLAYERS+playerId,{

			})
			.then(response => 
			{
				console.log(response);
				this.minorWaiverSigned = response.data;

				this.waiverSignedFirstName = response.data.Person.first_name;
				this.waiverSignedLastName = response.data.Person.last_name;
				this.waiverSignedEmail = response.data.Person.email;
				this.waiverSignedPhone = response.data.Person.phone;
				this.waiverSignedInstagram = response.data.Person.instagram;
				this.waiverSignedWaiverId = response.data.Person.waiver_id;

				this.$bvModal.show('modal-minorBookerDetailsModal');

			})
			.catch(function (error) {
				console.log(error);
			});

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

	convertData(){

		console.log('inside convert player download file ');

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
		this.$bvModal.hide('modal-password');
		this.$bvModal.show('modal-downloadedSuccesfully');

	},

	searchPlayers(){

		/** resetting the array **/
		this.searchedPeopleId = [];
		this.searchedPersonId = [];
		this.searchedTeamPlayerSession = [];
		this.teamList = [];
		this.playerTeamPlayerSessionDetail = [];
		this.clickedPeopleDetail = [];
		/** end of array reset **/
		// this.loadingBar ='1';

		var searchText = this.searchedText;

		console.log(process.env.VUE_APP_DATABASE_PEOPLE+'searchText/'+searchText);

		axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'searchText/'+searchText,{

		})
		.then(response => 
		{
			// console.log(response.data[0].id);

			// console.log(response.data.length);

			console.log(response.data.length);

			if(response.data.length < '1'){
				this.$bvModal.show('modal-playerNameNotFound');
			}

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;

				// console.log(peopleId);

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
//// console.log(response.data[i].id);

//var teamPlayerSessionLength = response.data[i].Team_player_sessions.length;
//console.log('team player session length '+teamPlayerSessionLength);

//for (var j = 0; j < teamPlayerSessionLength; j++) { /** for loop to get each player detail from Team_player_sessions **/


//	if(response.data[i].Team_player_sessions[j].player_minor_id > '0'){ /** checks if its minor **/
//		var minorLastName = response.data[i].Team_player_sessions[j].Player_minor.last_name;
//		var minorFirstName = response.data[i].Team_player_sessions[j].Player_minor.first_name;
//		var minorId = response.data[i].Team_player_sessions[j].Player_minor.id;
//		var minorDOB =  response.data[i].Team_player_sessions[j].Player_minor.date_of_birth;
//		// var minorBombBeater =  response.data[i].Team_player_sessions[j].Player_minor.bomb_beater;
//		// var minorPlayCount =  response.data[i].Team_player_sessions[j].Player_minor.play_count;
//		// var minorTeamName = response.data[i].Team.name;
//		// var minorBookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
//		// var minorBookerLastName = response.data[i].Reservation.Booker.Person.last_name;

//		let playerArray = {
//			'id' : minorId,
//			'name': minorFirstName+ ' ' +minorLastName,
//			'date_of_birth': minorDOB,
//			// 'team_name' : minorTeamName,
//			'bomb_beater': ' ',
//			'play_count' : ' ',
//			'adult/minor' : 'Minor'
//		}

//		this.teamList.push(playerArray);
//	}/** end of minor IF loop **/

//	else{/** this is player not minor **/

//		var playerLastName = response.data[i].Team_player_sessions[j].Player.Person.last_name;
//		var playerFirstName = response.data[i].Team_player_sessions[j].Player.Person.first_name;
//		var playerId = response.data[i].Team_player_sessions[j].Player.Person.id;
//		var playerDOB =  response.data[i].Team_player_sessions[j].Player.Person.date_of_birth;
//		// var playerEmail =  response.data[i].Team_player_sessions[j].Player.Person.email;
//		// var playerInsta =  response.data[i].Team_player_sessions[j].Player.Person.instagram;
//		var bombBeater =  response.data[i].Team_player_sessions[j].Player.bomb_beater;

//		if(response.data[i].Team_player_sessions[j].Player.play_count > 0){
//			var playCount = 'R'+response.data[i].Team_player_sessions[j].Player.play_count;
//		}
//		else{
//			playCount = response.data[i].Team_player_sessions[j].Player.play_count;
//		}

//		// if(response.data[i].Team_player_sessions[j].Player.bomb_beater > 0){
//		// 	var bombBeater = "1";
//		// }
//		// else{
//		// 	bombBeater = response.data[i].Team_player_sessions[j].Player.bomb_beater;
//		// }

//		// var playCount =  response.data[i].Team_player_sessions[j].Player.play_count;
//		// var teamName = response.data[i].Team.name;
//		// var bookerFirstName = response.data[i].Reservation.Booker.Person.first_name;
//		// var bookerLastName = response.data[i].Reservation.Booker.Person.last_name;

//		let playerArray = {
//			'id' : playerId,
//			'name': playerFirstName+ ' ' +playerLastName,
//			'date_of_birth': playerDOB,
//			// 'team_name' : teamName,
//			// 'email' : playerEmail,
//			// 'instagram' : playerInsta,
//			'adult/minor' : 'Adult',
//			'bomb_beater': bombBeater,
//			'play_count' : playCount
//		}

//		this.teamList.push(playerArray);

//	}/** end of Player Else loop **/


//}/** end of for loop for each player detail from Team_player_sessions **/

// 	}/** end of for loop for SESSION **/

// })
// .catch(function (error) {
// console.log(error);
// });

/** end of changing reservation date **/ 

},

getPersonDetail(){
	console.log('use this function now');
	console.log(this.searchedPeopleId.length);
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

			// console.log(this.teamList.length);

			this.getTeamPlayerSessionDetail();

			console.log('inside 799');
			var v = this;
			setTimeout(function(){v.getTeamPlayerSessionDetail(); }, 2700); /** setting up 1 sec delay to pass person detail **/
		}
	}
},

getTeamPlayerSessionDetail(){

	console.log(this.teamList); 
	console.log(this.teamList.length);

	console.log('searched person length '+this.teamList.length);

							// var v = this;
							// setTimeout(function(){
							// 	console.log('inside 1068');
							// 	v.loadingBar = '0';
							// 	console.log(v.loadingBar);
							// }, 3100);

							for (var i = 0; i < this.teamList.length; i++) {
								console.log(this.teamList[i].id);
								var getPlayerId = this.teamList[i].id;

								console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId);

								if(getPlayerId > '0'){
									axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId,{

									})
									.then(response => 
									{	
										console.log(response.data);
										this.searchedTeamPlayerSession.push(response.data);
									})
									.catch(function (error) {
										console.log(error);
										// this.searchedTeamPlayerSession.push('0');
									});
								}
								else{
									var value='0';
									console.log('player id was null');
									this.searchedTeamPlayerSession.push(value);
								}

								if(i+1 == this.teamList.length){
									console.log('got done loading 1072');

									// this.loadingBar = '0';
								}

							}
						},

						playerNameClicked(value,clickedIndex){

							this.playerProfile = [];
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

		var getPlayerId = this.teamList[index].id;

		console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId);

		if(getPlayerId > '0'){
			axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId,{

			})
			.then(response => 
			{	
				console.log(response.data);

				this.searchedTeamPlayerSession.push(response.data);

				var playerProfileLength = response.data.length;

				if(response.data.length > 0){
					console.log('got some values');
					this.playerName = this.teamList[index].name;
					this.playerPhone = this.teamList[index].phone;
					this.playerEmail = this.teamList[index].email;
					this.playerInstagram = this.teamList[index].instagram;
					this.playerGender = this.teamList[index].gender;
					this.playerDateOfBirth = this.teamList[index].date_of_birth;
					this.playerWaiverId = this.teamList[index].waiver_id;
					this.playerBombBeater = this.teamList[index].bomb_beater;
					this.playerPlayCount = this.teamList[index].play_count;

					for (var i = 0; i < playerProfileLength; i++) {

						var playerProfileSession = response.data[i].Session.id;
						this.playerProfile.push(playerProfileSession);

// this.playerProfile = response.data[i].Session.id;
// console.log(this.playerProfile);
console.log('i value was this as '+i);
var playerRfid = response.data[i].rfid_id;

var bomb_time_minute = Math.floor(response.data[i].Session.bomb_time/60);
var bomb_time_seconds = Math.floor(response.data[i].Session.bomb_time) - bomb_time_minute * 60;

var bomb_time = bomb_time_minute+':'+bomb_time_seconds;

										// var bomb_time = response.data[i].Session.bomb_time;
										var mission_id = response.data[i].Session.mission_id;
										var total_score = response.data[i].Session.total_score;
										var player_count = response.data[i].Session.player_count;
										var winners = response.data[i].Session.winners;
										var playedAt = moment(response.data[i].Session.createdAt).format("YYYY-MM-DD hh:mm A");
										var battleMode = response.data[i].Session.team_vs_team_id;
										var team_name = response.data[i].Team.name;

										console.log(playerRfid);

										if(battleMode > '0'){
battleMode = '1';
										}

										var teamId =response.data[i].Session.team_id;

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

										this.playerTeamPlayerSessionDetail.push(playerTPSdetails);

										if(i+1 == response.data.length){
setTimeout(
this.$bvModal.show('modal-profileDetail'),1200
);
											// this.$bvModal.show('modal-profileDetail');
										}

									}

								} /** end of if statement **/

								else{ 
									console.log('empty values');
									this.$bvModal.show('modal-playerDetailEmpty');
								} /** end of else statement **/


							})
			.catch(function (error) {
				console.log(error);
			});
		}
		else{
			var checkValue='0';
			console.log('player id was null');
			this.searchedTeamPlayerSession.push(checkValue);
		}
	},

	onContextDownload(ctx){
		console.log('download now');

		this.formatted = ctx.selectedFormatted;
        // The following will be an empty string until a valid date is entered
        this.selectedReservationDate = ctx.selectedYMD;

        // console.log("CHANGED DATE");
        console.log(this.dateClicked);
        console.log(this.formatted);

        console.log(this.downloadPeopleStartDate);
        console.log(this.downloadPeopleEndDate);

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
					// this.getPersonDetail();
					// console.log(this.searchedPersonId.length);

				}
			}

		})
        .catch(function (error) {
     console.log(error);
        });

      },

      onContext(ctx) {

		// console.log('play count was '+this.searchedPersonId[0].play_count);

		// this.loadingBar = '1';

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

          var endDate = moment(startDate).add(1,'days').format('YYYY-MM-DD');

          console.log(endDate);


          /** resetting the array **/
          this.searchedPeopleId = [];
          console.log(this.searchedPeopleId);
          this.searchedPersonId = [];
          this.searchedTeamPlayerSession = [];
          this.teamList = [];
          this.playerTeamPlayerSessionDetail = [];
          /** end of array reset **/

          console.log(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate);

          axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+startDate+'/end/'+endDate,{

          })
          .then(response => 
          {
			// console.log(response.data[0].id);

			console.log(response.data.length);

			var totalSearchedText = response.data.length;

			for (var i = 0; i < totalSearchedText; i++) {
				var peopleId = response.data[i].id;
				
				console.log(peopleId);

				this.searchedPeopleId.push(peopleId);

				if(i+1 == totalSearchedText){
					console.log('yes yes');
					// var v = this;
					// setTimeout(function(){
					// 	v.getPersonDetail();
					// }, 2000);

					this.getPersonDetail();

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
//// console.log(response.data[i].id);

//var teamPlayerSessionLength = response.data[i].Team_player_sessions.length;
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

#disablePage {
	background-color:#f9f9f9;
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 1000;
	top: 0px;
	left: 0px;
	opacity: .5; /* in FireFox */ 
	filter: alpha(opacity=50); /* in IE */
}
</style>
