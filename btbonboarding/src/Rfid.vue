<template>
	<div id="rfidapp" style="min-width: 100%;min-height: 100vh;margin-top: -7%;">
		<br><br>

		<table style="width: auto; margin:auto;" v-if="teamName.length < '1'">
			<tr>

				<td class="fontStyle">
					<p class="adjustTitle2 blink_me" v-if="activateError != '1' " style="font-size: 200px; margin-top: -6%;">{{suitUpZoneText}}</p>
				</td>

			</tr>
		</table>

		<table style="width: auto; margin-top:-5%; margin-left:2%;" v-if="teamName.length < '1'">
			<tr>

				<td class="fontStyle">
					<p class="adjustTitle1 blink_me" v-if="activateError != '1' ">{{scanWristbandText}}</p>
				</td>
				<td><b-form-input id="input-large-define" size="sm" placeholder="Tap the wristband ... " v-on:input="tappedWristband($event)" autofocus></b-form-input></td>
			</tr>
		</table>

		<br><br><br>

		<table style="margin:auto;margin-top: 6%;" v-if="teamName.length > '0'">
			<tr>
				<td class="playerDetailStyle blink_me" id="leftRightAnimation">{{teamName}} / </td>
				<td class="playerDetailStyle blink_me" id="leftRightAnimation" style="padding-left: 10%;">{{teamSize}}</td>
			</tr>
			<br><br>
		</table>

		<br>

		<table style="margin:auto;">
			<tr>
				<td class="playerDetailStyle2 blink_me">{{playerName}}</td>
			</tr>
		</table>


		<br><br>

		<table style="margin-left:-29%; margin-top:2%; width:100%;" v-if="activateError > '0'">
			<tr>
				<td class="playerDetailStyle blink_me" style="text-align:right;">Details Not Found !!</td>
			</tr>
		</table>

	</div>
</template>

<script>
import axios from 'axios';

// var moment = require('moment');
export default {

	name: 'App',
	components: {
    // HelloWorld
  },

  data(){
return{
	scanWristbandText:'Scan your wristband',
	suitUpZoneText:'Suit Up Zone',
	rfidTag:'',
	teamName:'',
	playerName:'',
	teamSize:'',
	activateError:''
}
  },

  mounted: function(){
console.log('inside mounted function');
  },

  methods:{

tappedWristband(event){
	console.log('inside tapped wristband function');
	console.log(event);

	setTimeout(location.reload.bind(location), 3500);

	if(event.length == '8'){
		console.log('rfid length was 8');

		/** convert rfid tag into id **/
		axios.get(process.env.VUE_APP_DATABASE_RFIDS+'tag/'+event,{

		})
		.then(response => 
		{
			console.log(response);

			var fetchedRfidId = response.data.id; /** gets rfid id **/


			/** gets latest rfid tag used from team player session table **/
			if(fetchedRfidId > '0'){
				axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/rfid_id/'+fetchedRfidId,{

				})
				.then(response => 
				{
					console.log(response);
					var player_minor_id = response.data[0].player_minor_id;

					/** team name following session id **/
					var sessionId = response.data[0].session_id;

					console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId);

					axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{

					})
					.then(response => 
					{
						console.log(response.data.Team.name);
						this.teamName = response.data.Team.name;
					})
					.catch(function (error) {
						console.log(error);
					});
					/** end of team name following session id **/

						// this.teamName = response.data[0].Team.name;
						this.teamSize = response.data[0].Session.player_count;

						if(player_minor_id > '0'){
							console.log('yes it was minor ');
							var lastName = response.data[0].Player_minor.last_name.charAt(0);
							this.playerName = response.data[0].Player_minor.first_name+' '+lastName;
						}
						else{
							var lastPlayerName = response.data[0].Player.Person.last_name.charAt(0);
							this.playerName = response.data[0].Player.Person.first_name+' '+lastPlayerName;
						}

						var v = this;
						v.activateError ='';
						setTimeout(function(){
							v.rfidTag='';
							v.teamName='';
							v.playerName='';
							v.teamSize='';
						}, 3500);

					})
				.catch(function (error) {
					console.log(error);
				});
			}
			/** end of team player session table **/

		})
		.catch(function (error) {
			console.log(error);
		});

		/** end of rfid tag into id **/
	}

	else{
				this.activateError = 1;
				setTimeout(location.reload.bind(location), 3000);
			}

		// else{
		// 	console.log('Rfid tag more/less than 8');
		// 			this.activateError = 1;

		// 			var v = this;
		// 				setTimeout(function(){
		// 					v.rfidTag='';
		// 					v.teamName='';
		// 					v.playerName='';
		// 					v.teamSize='';
		// 					v.activateError='';
		// 				}, 3500);
		// }
	},

}

}; /** close the eport default bracket **/

</script>

<style>
@import url(//db.onlinewebfonts.com/c/4f0c82bb2e8fb2d03bd14a1137235ef3?family=Pixel+Digivolve+Cyrillic);

#rfidapp{
	background-color: black;
}
.fontStyle{
	font-family: 'Pixel Digivolve Cyrillic', sans-serif;
	font-size: 130px;
	color:#00FFBC;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/*margin: auto;*/
	/*padding: auto;*/
}
.playerDetailStyle{
	/*margin:auto;*/
	width:auto;
	font-family: 'Pixel Digivolve Cyrillic', sans-serif;
	font-size: 140px;
	color:#00FFBC;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/*text-align: center;*/
}

.playerDetailStyle2{
	/*margin:auto;*/
	width:auto;
	font-family: 'Pixel Digivolve Cyrillic', sans-serif;
	font-size: 150px;
	color:#00FFBC;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin-left: 25%;
	/*margin:auto;*/
	/*text-align: right;*/
	/*text-align: center;*/
}

#input-large-define{
	background-color: black;
	width:0.01%;
	border-color:black;
}

.adjustTitle2{
	margin-top: 18%;
	/*margin-right: -9%;*/
}

.adjustTitle1{
	/*margin-top: 18%;*/
	margin-right: -12%;
}

.blink_me {
	animation: blinker 1.2s linear infinite;
}

@keyframes blinker {
	50% {
		opacity: 0.3;
	}
}

#leftRightAnimation{
	position: relative;
	animation: mymove 4s infinite;
}
@keyframes mymove {
	from {left: -200px;}
	to {left: 0px;}
}
</style>