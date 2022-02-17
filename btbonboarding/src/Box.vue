<!-- <template>
       <div> This is a Reusable Box Component </div>
</template> -->

<template>
       

       <div id='BoxComponent' style="border-style:solid; height:650px;" @click="clickedOn(boxid)">
              <!-- Box value is {{boxTeamName}} -->
              <b-row>
                     <b-col>{{boxDateTime}}</b-col>
                     <b-col>
                            <b-form-input size="md" v-model="boxTeamName" placeholder="TEAM NAME" style="text-transform: uppercase" maxlength="20" @change="teamNameValue()"></b-form-input>
                     </b-col>
                     <b-col>Delete Team</b-col>
              </b-row>
              <b-row>
                     <draggable class="list-group-item item" draggable=".item" group="a" style="height: 440px; width:94%;margin:auto; border-style: outset;" @add="playerAdded($event,boxid)" :list="list">

                            <div class="list-group-item item" v-for="(element, index) in list" :key="index">

                                   <b-row>

                                          <b-col sm="0">

                                                 <p v-if="list[index].rfidState1 == '' || !list[index].rfidState1 > '0'">&#10060;</p>
                                                 <p v-if="list[index].rfidState1 > '0'" style='color:green;'>&#9989;</p>

                                          </b-col>

                                          <b-col sm="9" style="text-transform:capitalize;">
                                                 {{element.Person.first_name}} {{element.Person.last_name}} ({{element.Person.Bookerdetail.firstName}} {{element.Person.Bookerdetail.lastName}})
                                          </b-col>

                                          <b-col sm="0">
                                                 {{element.Person.minorsymbol}}
                                          </b-col>

                                          <b-col sm="0">
                                                 <p v-if="element.Person.Player.bomb_beater == '1'">&#128163;</p>
                                          </b-col>

                                          <b-col sm="1">
                                                 <p v-if="element.Person.Player.play_count > '1' ">R</p>
                                          </b-col>


                                   </b-row>
                            </div>


                     </draggable>
              </b-row>
              <br>
               <!-- b-row for mission drop down -->
              <b-row style="margin:auto;">
                     <b-col sm="3">
                            <label for="input-small">Mission</label>
                    </b-col>
                    <b-col sm="9">
                            <b-form-select v-on:change="changeMission()">
                                   <option v-for="item in missionList" :value="item.id" v-bind:key="item.id">{{item.name}}</option>
                            </b-form-select>
                    </b-col>
              </b-row>
              <!-- end of mission b-row -->

              <br>
              <b-row style="margin:auto;">
                     <b-col lg="5">
                            <b-button variant="info" block @click="assignRfidValue()" v-bind:key="boxid">Assign RFID {{boxid}}</b-button>
                     </b-col>
                     <b-col lg="5">
                            <b-button variant="primary" block @click="sendTeamToWaitlist()">Send to waitlist</b-button>
                     </b-col>
              </b-row>

       <!-- <b-button variant="info" @click="buttonClicked">Click</b-button> -->

      <missionClickedWithoutPlayer v-if="noPlayerMission == '1'" /> <!-- b-modal for mission is selected without a player -->

      <assignRfidToPlayer v-if="clickOnAssignRfid == '1' " :world="val" :playerList="sendPlayerListValue"/>
      <!-- <assignRfidToPlayer v-if="clickOnAssignRfid == '0'" :playerList='sendPlayerListValue'/> -->
</div>

</template>

<script>

import draggable from "vuedraggable";
import axios from 'axios';
import missionClickedWithoutPlayer from '@/onboardingModal/missionModal.vue';
import assignRfidToPlayer from '@/components/assignRfidModal.vue';


var moment = require('moment');


export default {
 props: [
       'boxid','boxDateTime','world'
],
 components:{
       draggable,
       missionClickedWithoutPlayer,
       assignRfidToPlayer
},
 // teamName1: 'san'

 data() {
  return {
    // fetchPlayerListDate: '',
    clickedOnBox: '',
    list:[],
    boxTeamName:'',
    missionList:[],
    noPlayerMission: '',
    clickOnAssignRfid:'',
    sendPlayerListValue:[],
    val: '',

}
},

mounted: function(){

       axios.get(process.env.VUE_APP_DATABASE_MISSION,{

       })
       .then(response => {
              this.missionList = response.data; 
       })
       .catch(function (error) {
              console.log(error);
       });

},

methods:{

       buttonClicked(){
              this.val = true;
              setTimeout(() => {this.val = false},0);
       },

       teamNameValue(){
              console.log('team name');
       },

       assignRfidValue(){
              console.log('clicked assign rfid button for '+this.clickedOnBox);

              console.log(this.list);

              this.sendPlayerListValue = [];

              // this.sendPlayerListValue = this.list[0].id;

              for (var i = 0; i < this.list.length; i++) {
                     var allPlayerId = this.list[i].id;
                     console.log(allPlayerId);
                     if(this.list[i].Person.minor != 'yes'){ /** this was player **/

                            console.log('Inside Player for tps');

                            var playerMinor = 'no';
                            var tpsPlayerId = this.list[i].Person.Player.id; /** player id for tps table **/
                            var tpsPlayerMinorId = ''; /** minor player id for tps table **/
                            var playerName = this.list[i].Person.first_name+' '+this.list[i].Person.last_name;

                            axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/tps_id_from_player_id/'+tpsPlayerId,{

                            })
                            .then(response => {
                                   console.log(response.data[0].id);
                                   var tpsId = response.data[0].id;

                                   let playerDetails = {
                                       'minor': playerMinor,
                                       'tpsPlayerId': tpsPlayerId,
                                       'tpsPlayerMinorId': tpsPlayerMinorId,
                                       'tpsId': tpsId,
                                       'playerName': playerName
                                       // 'playerFullname': playerMinorFullname

                                   };

                                   this.sendPlayerListValue.push(playerDetails);
                                   console.log(this.sendPlayerListValue);
                            })
                            .catch(function (error) {
                                   console.log(error);
                            });
                     }

                     else{ /** this was minor **/

                            console.log('Inside Minor for tps');


                            var minor = 'yes';
                            var tpsMinorPlayerId = this.list[i].Person.player_id; /** player id for tps table **/
                            console.log(tpsMinorPlayerId);
                            var tpsMinorId = this.list[i].person_id; /** minor player id for tps table **/
                            var minorPlayerName = this.list[i].Person.first_name+' '+this.list[i].Person.last_name;

                            axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/tps_id_from_player_minor_id/'+tpsMinorId,{

                            })
                            .then(response => {
                                   // console.log(response);
                                   console.log(response.data[0].id);
                                   // console.log(playerFullName);

                                   var tpsId = response.data[0].id;


                                   let minorPlayerDetails = {
                                       'minor': minor,
                                       'tpsPlayerId': tpsMinorId,
                                       'tpsPlayerMinorId': tpsMinorId,
                                       'tpsId': tpsId,
                                       'playerName': minorPlayerName,
                                       // 'playerFullName': playerFullName
                                   };

                                   this.sendPlayerListValue.push(minorPlayerDetails);

                                   console.log(this.sendPlayerListValue);


                            })
                            .catch(function (error) {
                                   console.log(error);
                            });
                     }

                     /** once it loads the for/if else loop , it send out the value using i+1 **/
                     if(i+1 == this.list.length){
                            if(this.list.length > '0'){
                            this.clickOnAssignRfid = '1';
                            
                            this.val = true;
                            setTimeout(() => {this.val = false},0);
                            console.log('box page this.value was '+this.val);
                            console.log(this.sendPlayerListValue);
                            }
                            else{
                                   console.log('clicked on assign rfid without dragging player');
                            }
                     }
              }

              
       },

       sendTeamToWaitlist(){
              console.log('clicked send to waitlist button for '+this.clickedOnBox);
       },

       changeMission(){
              console.log('mission change for box '+this.clickedOnBox);
              console.log(this.list);

              if(this.list.length > '0'){
                     console.log('update session table with mission');
              }
              else{
                     this.noPlayerMission = '1';
              }
       },

       clickedOn(boxid){
              this.clickedOnBox = boxid;
              console.log('clickedOn '+this.clickedOnBox);
              // console.log(this.list);
              // console.log(this.boxDateTime);
       },

       playerAdded(event,boxid){
              console.log('player added');
              this.clickedOnBox = boxid;
              
              var playerListIndex = event.newIndex;

              console.log(this.list);
              console.log(this.clickedOnBox);
              console.log(this.boxDateTime);

              console.log(this.boxTeamName+' team name');

              var reservationId = this.list[0].reservation_id; /** this grabs first player data from list and use the reservation id **/
              if(reservationId == undefined || reservationId < '0'){
                     reservationId = this.list[0].Person.reservation_id;
                     console.log('fetched reservation id from minor player');

                     // for (var i = 0; i < Things.length; i++) {
                     //        Things[i]
                     // }
              }

              if(this.clickedOnBox%2 != 0){
                     console.log('route was side A');
                     var routeId = '1';
              }
              else{
                     console.log('route was side B');
                     routeId = '2';
              }

              /** team name add on team table **/

              if(this.boxTeamName.length < '1'){
                     this.boxTeamName = 'TEAM NAME';
              }

              axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+this.boxTeamName,{
                      // name: teamName
              })
              .then(response => {
                     var teamId = response.data[0].id;
                     this.missionIdFetchFromReservation(teamId,routeId,this.boxDateTime,reservationId,playerListIndex);
              })
              .catch(function (error) {
                 console.log(error);
              });
       },

       missionIdFetchFromReservation(teamId,routeId,sessionTime,reservationId,playerListIndex){

              axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
              })
              .then(response => {
                     console.log(response);
                     var missionId = response.data.mission_id;
                     this.addDetailsOnSession(teamId,routeId,sessionTime,reservationId,missionId,playerListIndex);
              })
              .catch(function (error) {
                 console.log(error);
              });

       },

       addDetailsOnSession(teamId,routeId,sessionTime,reservationId,missionId,playerListIndex){
              console.log('team id was '+teamId);
              console.log('route id was '+routeId);
              console.log('session time was '+sessionTime);
              console.log('reservation id was '+reservationId);
              console.log('mission id was '+missionId);
              
              /** converting session date time for session table **/
              var splitTime = sessionTime.split(':', 2);
              var sessionTimeHour = splitTime[0];
              var sessionTimeMinute = splitTime[1].replace(/[^0-9]/g,'');
              var getTimeAlphabet = sessionTime.replace(/[^A-Za-z]/g, '');
              if(getTimeAlphabet == 'pm'){
                     sessionTimeHour = parseInt(12)+parseInt(sessionTimeHour);
              }
              var convertSessionDateTime = moment().format('YYYY-MM-DD '+sessionTimeHour+':'+sessionTimeMinute);
              var sessionDateTime = moment(convertSessionDateTime).format('YYYY-MM-DD H:mm:00');
              /** end of converting session date time for session table **/

              console.log('session date time was '+sessionDateTime);

              console.log(this.list);

              console.log('player count is '+this.list.length);

              var playerCount = this.list.length;

              // var bookerId = this.list[0].Person.Bookerdetail.id;

              // console.log(bookerId+ 'was booker id');

              if(teamId > '0' && routeId > '0' && reservationId > '0' && missionId > '0' && playerCount > '0'){
                     console.log('received all the values from sessions');

                     axios.post(process.env.VUE_APP_DATABASE_SESSIONS+'/find_or_create/reservation/'+reservationId+'/team/'+teamId+'/route/'+routeId,{
                            mission_id: missionId,
                            session_time: sessionDateTime,
                            location_id: 1,
                            player_count: playerCount
                     })
                     .then(response => {
                            console.log(response);

                            var sessionId = response.data[0].id;

                            this.updatePlayerCountInSession(teamId,routeId,sessionTime,reservationId,missionId,sessionId,playerCount,playerListIndex);

                     })
                     .catch(function (error) {
                        console.log(error);
                     });
              }
              else{
                     console.log('missing some value ');
                     console.log('Display modal saying mission values.')
              }

       },

       updatePlayerCountInSession(teamId,routeId,sessionTime,reservationId,missionId,sessionId,playerCount,playerListIndex){

              if(teamId > '0' && routeId > '0' && reservationId > '0' && missionId > '0' && sessionId > '0' && playerCount > '0'){
                     console.log('update player count value in session');
                     axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
                            player_count: playerCount
                     })
                     .then(response => {
                            console.log(response);
                            this.addPlayerOnTps(teamId,reservationId,sessionId,playerListIndex);
                     })
                     .catch(function (error) {
                        console.log(error);
                     });
              }
              else{
                     console.log('mission some values');
              }
       },



       addPlayerOnTps(teamId,reservationId,sessionId,playerListIndex){
              console.log('team id was '+teamId);
              console.log('reservation id was '+reservationId);
              console.log('session id was '+sessionId);
              console.log('player index was '+playerListIndex);

              if(this.list[playerListIndex].Person.minor != 'yes'){ /** post value as player in tps table **/

                     console.log('its player');

                     var playerId = this.list[playerListIndex].Person.Player.id;

                     axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_only/find_or_create/player/'+playerId+'/session/'+sessionId,{
                           team_id: teamId,
                           reservation_id: reservationId
                         })
                     .then(response => {
                            console.log('player data added to team player session table ');
                            console.log(response.data);

                            this.updateReservationPeople(reservationId,playerId,sessionId,playerListIndex);
                     })
                     .catch(error => {
                       console.log(error);
                     });

              }
              else{
                     console.log('minor player');

                     playerId = this.list[playerListIndex].Person.player_id; /** player id for tps table **/
                     var playerMinorId = this.list[playerListIndex].person_id; /** minor player id for tps table **/

                     axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/find_or_create/player/'+playerId+'/player_minor/'+playerMinorId+'/session/'+sessionId,{

                         team_id: teamId,
                         reservation_id: reservationId

                     })
                     .then(response => {
                            console.log('minor player data added to team player session table ');
                            console.log(response.data);

                            this.updateReservationMinor(reservationId,playerMinorId,sessionId);
                     })
                     .catch(error => {
                       console.log(error);
                     });

              }

       },

       updateReservationPeople(reservationId,playerId,sessionId,playerListIndex){
              console.log('inside update reservation people');

              console.log('reservation id was '+reservationId+' playerId was '+playerId+' and session id was '+sessionId+' player list index was '+playerListIndex);

              // var peopleId = this.list[playerListIndex].person_id;

              // axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+peopleId+'/reservation/'+reservationId,{
              //     session_id: sessionId 
              // })
              // .then(response => {
              //        console.log('Reservation People table updated with session');
              //        console.log(response);
              //        console.log('Succesfully added player data');
              // })
              // .catch(function (error) {
              //     console.log(error);
              // });

       },

       updateReservationMinor(reservationId,playerMinorId,sessionId){
              console.log('inside update reservation minor');
              console.log('reservation id was '+reservationId+' playerMinorId was '+playerMinorId+' and session id was '+sessionId);

              // axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+playerMinorId+'/reservation/'+reservationId,{
              //        session_id: sessionId,
              // })
              // .then(response => {
              //        console.log('Reservation Minor table updated with session');
              //        console.log(response);
              //        console.log('Succesfully added minor data');
              // })
              // .catch(function (error) {
              //      console.log(error);
              // });
       },

       // addDetailOnTPS(teamId,routeId){
       //        console.log('team id was '+teamId);
       //        console.log('route id was '+routeId);
       //        console.log(this.list);
       // },



}

}/** closes the export default **/

</script>