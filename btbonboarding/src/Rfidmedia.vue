<template>
  <div id="rfidapp" style="min-width: 100%;min-height: 100vh;margin-top: -7%;">

<b-modal id="modal-teamMedia" centered size="xl" v-bind:hide-footer="true">
	<figure v-if="clickedMediaCharacter == 'jpg' || clickedMediaCharacter == 'gif'">
        <img v-bind:src="(clickedZoomMedia)" style="height:100%;width:100%;">
    </figure>

    <figure v-if="clickedMediaCharacter == 'mp4'">
        <video style="height:100%;width:100%;" controls>
		<source :src="(clickedZoomMedia)" type="video/mp4">
        </video>
    </figure>

</b-modal>

	<br><br>
	<table style="width: auto; margin:auto;" v-if="teamName.length < '1' && activateError < '1'">
		<tr>
			<td class="fontStyle">
				<p class="adjustTitle1 blink_me" style="font-size: 0.43em;">{{scanWristbandText}}</p>
			</td>
			<td><b-form-input id="input-large-define" size="sm" placeholder="Tap the wristband ... " v-on:input="tappedWristband($event)" autofocus></b-form-input></td>
		</tr>
	</table>

	<br><br><br>

	<table style="margin:auto;margin-top: -5%;" v-if="teamName.length > '0'">
		<tr>
			<td class="playerDetailStyle" style="width:65%;font-size: 1.6em;text-align:left;">Team Name</td>
			<td class="playerDetailStyle" style="font-size: 1.6em;text-transform:capitalize; text-align:left;">
				Scan QR CODE for your photos/videos 
			</td>
		</tr>
		<br>
		<tr>
			<td class="playerDetailStyle blink_me" style="width:70%;text-align:left;">{{teamName}}</td>
			<td>
				<vue-qrcode :value="teamMedia10" style="width:auto; height: 60%; margin:auto;" />
			</td>
			<!-- <td class="playerDetailStyle blink_me" id="leftRightAnimation" style="padding-left: 10%;">{{teamSize}}</td> -->
		</tr>
		<br><br>
	</table>

	<!-- <br>

	<table style="margin:auto;">
		<tr>
			<td class="playerDetailStyle2 blink_me">{{playerName}}</td>
		</tr>
	</table> -->


	<br><br>

	<table style="margin-left:-20%; margin-top:2%; width:100%;" v-if="activateError > '0'">
		<tr>
			<td class="playerDetailStyle blink_me" style="text-align:right;">Team Not Found !!</td>
		</tr>
	</table>

	<table class="table table-borderless" v-if="displaySessionBox == '1'" style="margin-top: -2%;background-color:blue black;">
		<!-- <h5 align="center" style="text-transform: capitalize;" v-if="teamMedia10.length > '0'">
      <a :href="(teamMedia10)" target="_blank">
        Photobomb Photos/Videos
      </a>
    </h5>
    <h5 align="center" style="text-transform: capitalize;" v-else>
        Photobomb Photos/Videos
    </h5> -->

      <tr>
        <td class="text-right">
          <figure class="container" v-on:click="zoomMedia(teamMedia8)" v-if="teamMedia8.slice(-3) == 'png' || teamMedia8.slice(-3) == 'jpg' || teamMedia8.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia8)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia8)" v-if="teamMedia8.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia8)" type="video/mp4">
          </video>
          </figure>

          <!-- <button v-on:click="clickedDownload(teamMedia8)">Download Image</button> -->
        </td>

        <td>
          <figure class="container" v-on:click="zoomMedia(teamMedia3)" v-if="teamMedia3.slice(-3) == 'png' || teamMedia3.slice(-3) == 'jpg' || teamMedia3.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia3)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia3)" v-if="teamMedia3.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia3)" type="video/mp4">
          </video>
          </figure>

        </td>

        <td class="text-left">
          <figure class="container" v-on:click="zoomMedia(teamMedia4)" v-if="teamMedia4.slice(-3) == 'png' || teamMedia4.slice(-3) == 'jpg' || teamMedia4.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia4)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia4)" v-if="teamMedia4.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia4)" type="video/mp4">
          </video>
          </figure>
        </td>
    </tr>

    <tr>
	<td class="text-right">
          <figure class="container" v-on:click="zoomMedia(teamMedia5)" v-if="teamMedia5.slice(-3) == 'png' || teamMedia5.slice(-3) == 'jpg' || teamMedia5.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia5)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia5)" v-if="teamMedia5.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia5)" type="video/mp4">
          </video>
          </figure>
        </td>

        <td>
          <figure class="container" v-on:click="zoomMedia(teamMedia6)" v-if="teamMedia6.slice(-3) == 'png' || teamMedia6.slice(-3) == 'jpg' || teamMedia6.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia6)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia6)" v-if="teamMedia6.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia6)" type="video/mp4">
          </video>
          </figure>
        </td>

        <td class="text-left">
          <figure class="container" v-on:click="zoomMedia(teamMedia7)" v-if="teamMedia7.slice(-3) == 'png' || teamMedia7.slice(-3) == 'jpg' || teamMedia7.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia7)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia7)" v-if="teamMedia7.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia7)" type="video/mp4">
          </video>
          </figure>
        </td>
    </tr>

<tr>
<td class="text-right">
          <figure class="container" v-on:click="zoomMedia(teamMedia1)" v-if="teamMedia1.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia1)" type="video/mp4">
          </video>
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia1)" v-if="teamMedia1.slice(-3) == 'png' || teamMedia1.slice(-3) == 'jpg' || teamMedia1.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia8)" style="height:50%;width:50%;">
          </figure>

        </td>

        <td>
          <figure class="container" v-on:click="zoomMedia(teamMedia9)" v-if="teamMedia9.slice(-3) == 'mp4'">
            <video style="height:50%;width:50%;" controls>
            <source :src="(teamMedia9)" type="video/mp4">
          </video>
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia9)" v-if="teamMedia1.slice(-3) == 'png' || teamMedia1.slice(-3) == 'jpg' || teamMedia1.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia9)" style="height:50%;width:50%;">
          </figure>
        </td>

        <td class="text-left">
          <figure class="container" v-on:click="zoomMedia(teamMedia2)">
            <img v-bind:src="(teamMedia2)" style="height:50%;width:50%;">
          </figure>

          <figure class="container" v-on:click="zoomMedia(teamMedia2)" v-if="teamMedia1.slice(-3) == 'png' || teamMedia1.slice(-3) == 'jpg' || teamMedia1.slice(-3) == 'gif'">
            <img v-bind:src="(teamMedia2)" style="height:50%;width:50%;">
          </figure>
        </td>

        <!-- <td>
		<h5>
			<a :href="(teamMedia0)" target="_blank">Download Scoresheet</a>
		</h5>
		</td> -->
      </tr>
	</table>

  </div>
</template>

<script>
	import axios from 'axios';
	import VueQrcode from 'vue-qrcode';

// var moment = require('moment');
export default {

	name: 'App',
	components: {
		VueQrcode
    // HelloWorld
},

data(){
  return{
		scanWristbandText:'Scan your wristband to view your photos / videos.',
		rfidTag:'',
		teamName:'',
		playerName:'',
		teamSize:'',
		activateError:'',
		scannedSessionId:'',
		displaySessionBox:0,

		teamMedia:[],
		teamMedia0:'',
		teamMedia1:'',
		teamMedia2:'',
		teamMedia3:'',
		teamMedia4:'',
		teamMedia5:'',
		teamMedia6:'',
		teamMedia7:'',
		teamMedia8:'',
		teamMedia9:'',
		teamMedia10:'', /** gets pthobomb url from session_media_assets 14 **/

		clickedMediaCharacter:'',
		clickedZoomMedia:'',

		timeFormat: 10000
	}
},

mounted: function(){
	console.log('inside mounted function');
	this.reloadPageFunction();
},

computed:{

	reloadPageFunction: function (){
		var timer;

            window.onload = timerReset;
            document.onkeypress = timerReset;
            document.onmousemove = timerReset;
            document.onmousedown = timerReset; 
            document.ontouchstart = timerReset;
            document.onclick = timerReset;
            document.onscroll = timerReset;
            document.onkeypress = timerReset;

	function timerElapsed() {
		console.log("Timer elapsed");
		location.reload();
	}

	function timerReset() {
		console.log("Reseting timer");
		clearTimeout(timer);
		timer = setTimeout(timerElapsed, 0.5 * 60 * 1000); // 5 mins
	}
	
	return 1; /** just to solve the value issue **/
	}
},

methods:{

	zoomMedia(value){
		console.log('value value');
		console.log(value);

		this.$bvModal.show('modal-teamMedia');
		this.clickedZoomMedia = value;
		this.clickedMediaCharacter = value.slice(-3);
		this.timeFormat = this.timeFormat+8000;
	},

	tappedWristband(event){
		console.log('inside tapped wristband function');
		console.log(event);


		if(event.length == '8'){
			console.log('rfid lenght was 8');

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
						console.log('session id was '+response.data[0].Session.id);
						var player_minor_id = response.data[0].player_minor_id;

						this.scannedSessionId = response.data[0].Session.id;

						this.teamName = response.data[0].Team.name;
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
						setTimeout(function(){
							v.rfidTag='';
							v.teamName='';
							v.playerName='';
							v.teamSize='';
							v.displaySessionBox=0; /** this will close the modal box after 16 seconds **/
							v.scannedSessionId='';
							v.teamMedia=[];
							v.teamMedia0='';
							v.teamMedia1='';
							v.teamMedia2='';
							v.teamMedia3='';
							v.teamMedia4='';
							v.teamMedia5='';
							v.teamMedia6='';
							v.teamMedia7='';
							v.teamMedia8='';
							v.teamMedia9='';
							v.teamMedia10='';
							v.$bvModal.hide('modal-teamMedia');
						}, v.timeFormat);

						this.displaySessionBox = '1'; /** activate the box or modal **/

						// this.scannedSessionId = response.data.Team_player_sessions.session_id;


						/** uses the scanned session id and pass the data to teamMedia details **/
						console.log('scanned rfid session id was '+this.scannedSessionId);
						axios.get(process.env.VUE_APP_SESSION_MEDIA_ASSETS+'/session/'+this.scannedSessionId,{

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
						/** end of scanned session id teamMedia **/

					})
					.catch(function (error) {
						console.log(error);
					});
				}
				else{
					console.log('Cannot find the rfid id');
					this.activateError = 1;

					var v = this;
						setTimeout(function(){
							v.rfidTag='';
							v.teamName='';
							v.playerName='';
							v.teamSize='';
							v.displaySessionBox=0; /** this will close the modal box after 16 seconds **/
							v.scannedSessionId='';
							v.teamMedia=[];
							v.teamMedia0='';
							v.teamMedia1='';
							v.teamMedia2='';
							v.teamMedia3='';
							v.teamMedia4='';
							v.teamMedia5='';
							v.teamMedia6='';
							v.teamMedia7='';
							v.teamMedia8='';
							v.teamMedia9='';
							v.teamMedia10='';
						}, 3500);
				}
				/** end of team player session table **/

			})
			.catch(function (error) {
				console.log(error);
			});

			/** end of rfid tag into id **/
		}
		else{
			// console.log('Cannot find team for that wristband');
					this.activateError = 1;

					var v = this;
						setTimeout(function(){
							v.rfidTag='';
							v.teamName='';
							v.playerName='';
							v.teamSize='';
							v.activateError='';
						}, 3500);
		}
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
		font-size: 100px;
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

	.adjustTitle1{
		margin-top: 18%;
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