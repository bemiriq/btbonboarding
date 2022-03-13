<template>
  <div id="usersapp" style="width: 80%; margin:auto;">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js usersApp"/> -->
    <!-- <p>USERS</p> -->


    <b-modal id="modal-minorWaiverSignedBy" centered size="lg" v-bind:hide-footer="true" title="Waiver Signed By">
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

    <!-- modal team details -->
    <b-modal id="modal-bookerTeamDetail" centered size="lg" title="Team Detail" v-bind:hide-footer="true">
      <table class="table">
      <tr>
        <th>Team Name</th>
        <th>Bomb Time</th>
        <th>Total Score</th>
        <!-- <th>Rfid</th> -->
        <th>Winners</th>
        <th>Mission</th>
        <th>Group Size</th>
        <th>Date Played</th>                
      </tr>
      <!-- <p>{{bookerReservationTeamDetail.id}}</p> -->
      <tr>
        <td style="text-transform:capitalize;">
          <a href="#/Dashboard" @click="provideReservationDetail(clickedBookerTeamIndex)">{{bookerReservationTeamName}}</a></td>
          <td>{{bookerReservationBombTime}}</td>
          <td>{{bookerReservationTotalScore}}</td>
          <!-- <td>{{bookerReservationRfidId}}</td> -->
          <td>
            <p v-if="bookerReservationWinners > '0'">&#128163;</p>
            <p v-else>NO</p>
          </td>
          <td>
            <p v-if="bookerReservationBattleMode > '0'"><b>Battle Mode</b></p>
            <p v-if="bookerReservationMissionId == '1'">Cyberbot</p>
            <p v-if="bookerReservationMissionId == '2'">Block Monster</p>
            <p v-if="bookerReservationMissionId == '3'">Cyberbot Pro</p>
            <p v-if="bookerReservationMissionId == '4'">Cyberbot Halloween</p>
          </td>
          <td>{{bookerReservationPlayCount}}</td>
          <td>{{bookerReservationSessionTime| convertDateTime(bookerReservationSessionTime)}}</td>
        </tr>
      </table>
    </b-modal>

    <!-- booker reservation player details -->
    <b-modal id="modal-bookerReservationPlayerDetails" centered size="lg" title="Player Details" v-bind:hide-footer="true">
      <table class="table table-borderless">
        <tr>
          <th>Player Name</th>
          <th>Adult/Minor</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Instagram</th>

          <!-- <th>Instagram</th> -->
        </tr>

        <tr v-for="item in bookerReservationPlayerDetails" :key="item.id">
          <td style="text-transform:capitalize;">{{item.first_name}} {{item.last_name}}</td>
          <td>{{item.status}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.instagram}}</td>
        </tr>

      </table>
    </b-modal>

    <!-- booker profile detail-->
    <b-modal id="modal-bookerProfileDetail" centered size="xl" title="Booker Profile" v-bind:hide-footer="true">
      <table class="table table-borderless">
        <tr>
          <th>Player Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Repeat Count</th>
          <th>Last Purchase Date</th>

          <!-- <th>Instagram</th> -->
        </tr>

        <tr>
          <td style="text-transform:capitalize;">{{clickedBookerFullName}}</td>
          <td>{{clickedBookerEmail}}</td>
          <td>{{clickedBookerPhone}}</td>
          <td>{{clickedBookerPlayCount}}</td>
          <td>{{clickedBookerLastPlayDate| convertDateTime(clickedBookerLastPlayDate)}}</td>
          <!-- <td>{{clickedBookerInstagram}}</td> -->
        </tr>
      </table>
      <br>
      <p class="h5">Purchase Details</p>
      <table class="table table-borderless">
        <tr>
          <th>Reservation Date</th>
          <th>Reservation Size</th>
          <th>Reservation Value</th>
          <th>Mission</th>
        </tr>
        <tr v-for="(item,index) in bookerReservationDetail" :key="item.id">
          <td><a href="/#/Dashboard" @click="provideTeamDetails(index)">{{item.reservation_for | convertReservationFor(item.reservation_for)}}</a></td>
          <td>{{item.size}}</td>
          <td>$ {{item.final_dollar_amount | roundDollarAmount(item.final_dollar_amount)}}</td>
          <td>{{item.mission_id | convertMission(item.mission_id)}}</td>
        </tr>
      </table>
    </b-modal>
    <!-- end of profile detail -->


    <b-modal id="modal-playerProfileDetail" centered size="xl" title="Player Profile" v-bind:hide-footer="true">
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
          <a href="#/Dashboard" @click="clickedTeamName(index)">{{item.team_name}}</a></td>
          <td>{{item.bomb_time}}</td>
          <td>{{item.total_score}}</td>
          <td>{{item.rfid_id}}</td>
          <td>
            <p v-if="item.winners > '0'">&#128163;</p>
            <p v-else>NO</p>
          </td>
          <td>
            <p v-if="item.battle_mode > '0'"><b>Battle Mode</b></p>
            <!-- <p v-if="item.mission_id == '1'">Cyberbot</p>
            <p v-if="item.mission_id == '2'">Block Monster</p>
            <p v-if="item.mission_id == '3'">Cyberbot Pro</p>
            <p v-if="item.mission_id == '4'">Cyberbot Halloween</p> -->
            <p>{{item.mission_id | convertMission(item.mission_id)}}</p>
          </td>
          <td>{{item.size}}</td>
          <td>{{item.date_played}}</td>
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
              <a href="#/Dashboard" @click="dashboardMinorNameClicked(index)" style="text-transform:capitalize;">{{item.fullName}}</a>
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
    </table>

      <br>

    
  </b-modal>

    <b-modal id="modal-date" centered size="md" title="Select date and convert" v-bind:hide-footer="true">
      <table class="table" >
        <tr>
          <td style="border: none;"><b>Start Date</b></td>
          <td style="border: none;">
            <b-input-group>
              <b-form-input id="example-input" v-model="startDateUsed" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
              <b-input-group-append>
                <b-form-datepicker v-model="startDateUsed" button-only right locale="en-US" aria-controls="example-input"></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </td>
        </tr>

        <tr>
          <td style="border: none;"><b>End Date</b></td>
          <td style="border: none;">
            <b-input-group>
              <b-form-input id="example-input" v-model="endDateUsed" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
              <b-input-group-append>
                <b-form-datepicker v-model="endDateUsed" button-only right locale="en-US" aria-controls="example-input"></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </td>
        </tr>
        <tr>
          <td style="border: none;"></td>
          <td style="border: none;">
            <b-button variant="info" v-on:click="dateSelected($event,2)">View Data</b-button>
          </td>
        </tr>
      </table>


    </b-modal>

    <div style="margin-top: 1%;">

      <!-- first part b-row -->
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <div style="margin-top: 10%;">
            <b-button variant="primary" v-on:click="activateWeekList()">Weekly List 
              <span v-if="weeklyList == '0'">&#187;</span> <!-- point right -->
              <span v-if="weeklyList == '1'">&#8659;</span> <!-- point down -->
            </b-button>
          </div>
          <div v-if="weeklyList == '1'">
            <div v-for="element in newDateUse.slice().reverse()" :key="element.id">
             <b-button variant="info" v-on:click="dateSelected(element,1);" style="margin-top: 2%;">{{element}}</b-button>
           </div>
         </div>

       </b-col>
       <!-- end of navigation menu on left side -->



       <!-- start of right div which consists of table with all details -->
       <b-col lg="10" style="background-color:#fafafa;">
        <br>
        <br>
        <b-row>
          <b-col>

            <!-- <p style="font-weight:bold;font-size:25px;">{{startDateUsed}} to {{endDateUsed}}</p> -->

            <b-row style="margin-top: 1%;">
            <!-- <b-col lg="1">
              <p style="margin-top: 3%; font-size: 1.1em;"><b>Date</b></p>
            </b-col> -->

            <b-button variant="outline-primary" v-on:click="selectDate()" style="margin-left:2%;">Select Date</b-button>

            <b-col lg="2">
              <b-input-group class="mb-1">

                <b-form-input
                id="example-input"
                v-model="dateClicked"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off" 
                disabled></b-form-input>

              </b-input-group>
            </b-col>

            <b-col lg="2">
              <b-input-group class="mb-1">

                <b-form-input
                id="example-input"
                v-model="endDateClicked"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off" 
                disabled></b-form-input>

              </b-input-group>
            </b-col>

            <!-- pageload OVERALL buttons -->
            <!-- <b-col lg="2" v-if="pageLoad=='1'">
              <b-button variant="info" v-on:click="pageLoad='1'" size="md">OVERALL</b-button>
            </b-col>
            <b-col lg="2" v-else>
              <b-button variant="outline-info" v-on:click="pageLoad='1'" size="md">OVERALL</b-button>
            </b-col> -->
            <!-- end of PAGE LOAD OVERALL BUtton -->

            <!-- pageload REPEATERS button -->
            <!-- <b-col lg="2" v-if="pageLoad=='1'">
              <b-button variant="outline-info" v-on:click="pageLoad='2'" size="md">REPEATERS</b-button>
            </b-col>
            <b-col lg="2" v-else>
              <b-button variant="info" v-on:click="pageLoad='2'" size="md">REPEATERS</b-button>
            </b-col> -->
            <!-- END of Pageload Repeaters button -->
            <b-col cols="1">
              <b-button variant="outline-info" v-on:click="pageLoad='1'" size="md">Overall</b-button>
            </b-col>
            <b-col cols="2">
              <b-button variant="outline-info" v-on:click="pageLoad='2'" size="md" @click="clickedRepeatersButton()">Repeater Dashboard</b-button>
            </b-col>
            <b-col cols="2">
              <b-button variant="outline-info" @click="clickedPlayCount()" size="md">Repeater List</b-button>
            </b-col>
           <!--  <b-col cols="1">
              <b-button variant="outline-info" @click="clickedGraph()" size="md">Graph</b-button>
            </b-col> -->

          </b-row>

          <hr>
          <br>

          <!-- OVERALL DASHBOARD DEFINED -->
          <div v-if="pageLoad=='1'">


            <!-- below b-row generates the third table -->
            <b-row>
              <b-col>
                <table class="table table-hover">
                  <thead>
                    <p class="theadStyle">Reservation / Booker Breakdown</p>
                  </thead>

                  <tr>
                    <td class="tdStyle">Total Bookers</td>
                    <td>{{totalBooker}}</td>
                  </tr>

                  <tr>
                    <td class="tdStyle">Total Reserved Players</td>
                    <td>{{xolaReserevedPlayer}}</td>
                  </tr>

                  <tr>
                    <td class="tdStyle">Total Player</td>
                    <td>{{totalPlayers}}</td>
                  </tr>

                  <tr>
                    <td class="tdStyle">No Shows</td>
                    <td>{{noShowCustomers}}</td>
                  </tr>

                    <!-- <tr>
                      <td class="tdStyle">Average Booker
                        <p style="font-style:italic;">
                          Total Bookers/Total Players
                        </p>
                      </td>
                      <td>{{totalAverageBooker}}</td>
                    </tr> -->

                    <tr>
                      <td class="tdStyle">Average Reservation Size</td>
                      <td>{{averageReservationSizeByXola}}</td>
                    </tr>


                  </table>
                </b-col>

                <b-col>
                  <table class="table table-hover">
                    <thead>
                      <p class="theadStyle">Operational Performance</p>
                    </thead>
                    <!-- <tr>
                      <td class="tdStyle">Total Teams</td>
                      <td>{{totalTeams}}</td>
                    </tr> -->
                    <tr>
                      <td class="tdStyle">Average Time to play Beat The Bomb</td>
                      <td>{{averageSessionTime}} minutes</td>
                    </tr>  
                  </table>
                </b-col>
              </b-row>
              <!-- end of b-row for third table -->

              <br>

              <b-row>
                <b-col>
                  <table class="table table-hover">
                    <thead>
                      <p class="theadStyle">Player Breakdown</p>
                    </thead>
                    <tr>
                      <td class="tdStyle">Total</td>
                      <td>{{totalPlayers}}</td>
                    </tr>
                    <tr>
                      <td class="tdStyle">Mission 1 Classic Mode</td>
                      <td>{{mission1total}}</td>
                    </tr> 
                    <tr>
                      <td class="tdStyle">Mission 2 Classic Mode</td>
                      <td>{{mission2total}}</td>
                    </tr>

                    <tr>
                      <td class="tdStyle">Mission 1 Battle Mode</td>
                      <td>{{battleModePlayersMission1}}</td>
                    </tr> 
                    <tr>
                      <td class="tdStyle">Mission 2 Battle Mode</td>
                      <td>{{battleModePlayersMission2}}</td>
                    </tr> 

                    <tr>
                      <td class="tdStyle">Discrepancy</td>
                      <td>{{checkPlayerMissionDiscrepancy}}</td> <!-- here it calls the COMPUTED PROPERTY FUNCTION -->
                    </tr>  
                  </table>
                </b-col>

                <b-col>

                  <table class="table table-hover">
                    <thead>
                      <p class="theadStyle">Team Breakdown</p>
                    </thead>
                    <tr>
                      <td class="tdStyle">Total Teams</td>
                      <td>{{totalTeams}}</td>
                    </tr> 
                    <tr>
                      <td class="tdStyle">Mission 1 Classic Mode</td>
                      <td>{{mission1TotalTeams}}</td>
                    </tr> 
                    <tr>
                      <td class="tdStyle">Mission 2 Classic Mode</td>
                      <td>{{mission2TotalTeams}}</td>
                    </tr>
                    <tr>
                      <td class="tdStyle">Mission 1 Battle Mode</td>
                      <td>{{battleModeMission1TotalTeams}}</td>
                    </tr> 
                    <tr>
                      <td class="tdStyle">Mission 2 Battle Mode</td>
                      <td>{{battleModeMission2TotalTeams}}</td>
                    </tr> 
                  <!-- <tr>
                    <td class="tdStyle">Calculated Team Size</td>
                    <td>{{calculatedTeamSize}}</td>
                  </tr> -->
                  <tr>
                    <td class="tdStyle">Avg Team Size</td>
                    <td>{{averageTeamSizeFunction}}</td> <!-- here it calls the COMPUTED PROPERTY FUNCTION -->
                  </tr> 
                  <tr>
                    <td class="tdStyle">Discrepancy</td>
                    <td>{{teamSizeDiscrepancy}}</td>
                  </tr>  
                </table>
              </b-col>
            </b-row>

            <!-- <hr> -->
            <br>

            <!-- below b-row generates the second table -->
            <b-row>
              <b-col>
                <table class="table table-hover">
                  <thead>
                    <p class="theadStyle">Age Breakdown</p>
                  </thead>
                  <tr>
                    <td class="tdStyle">Total Players</td>
                    <td>{{totalPlayers}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Total Adults</td>
                    <td>{{totalAdults}}</td>
                  </tr> 
                  <tr>
                    <td class="tdStyle">Total Minors</td>
                    <td>{{totalMinors}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Discrepancy</td>
                    <td>{{minorsDiscrepancy}}</td>
                  </tr>  
                </table>
              </b-col>

              <b-col>

                <table class="table table-hover">
                  <thead>
                    <p class="theadStyle">Gender Breakdown</p>
                  </thead>
                  <tr>
                    <td class="tdStyle">Female</td>
                    <td>{{totalFemale}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Male</td>
                    <td>{{totalMale}}</td>
                  </tr> 
                  <tr>
                    <td class="tdStyle">Non Binary</td>
                    <td>{{totalNonBinary}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Prefer not to answer</td>
                    <td>{{totalPreferNotToAnswer}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Sum</td>
                    <td>{{totalGender}}</td>
                  </tr> 
                  <tr>
                    <td class="tdStyle">Female Percentage</td>
                    <td>{{femalePercentage}}</td>
                  </tr>  
                </table>
              </b-col>
            </b-row>
            <!-- end of b-row for second table -->

            <!-- <hr> -->
            <br>

            <!-- below b-row generates the third table -->
            <b-row>
              <b-col>
                <table class="table table-hover">
                  <thead>
                    <p class="theadStyle">Bomb Beaters</p>
                  </thead>

                  <tr>
                    <td class="tdStyle">Total Winning Teams</td>
                    <td>{{bombBeatersTotalTeamsFunction}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Mission 1 Winning Teams</td>
                    <td>{{bombBeatersMission1TotalTeams}}</td>
                  </tr>

                  <tr>
                    <td class="tdStyle">Mission 2 Winning Teams</td>
                    <td>{{bombBeatersMission2TotalTeams}}</td>
                  </tr>

                  <tr>
                    <td class="tdStyle">Total Winning Players</td>
                    <td>{{bombBeatersTotalPlayers}}</td>
                  </tr>
                  <tr>
                    <td class="tdStyle">Mission 1 Winning Players</td>
                    <td>{{bombBeatersMission1Players}}</td>
                  </tr> 
                  <tr>
                    <td class="tdStyle">Mission 2 Winning Players</td>
                    <td>{{bombBeatersMission2Players}}</td>
                  </tr>

                    <!-- <tr>
                      <td class="tdStyle">Discrepancy</td>
                      <td>{{bombBeatersDiscrepancy}}</td>
                    </tr>   -->
                  </table>
                </b-col>

                <!-- <b-col> -->

                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Battle mode</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Reservations Database
                          <!-- <p style="font-style:italic;">Customer might cancel after booking from xola</p> -->
                        </td>
                        <td>{{totalBattleModeReservations}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Total Reservations that played</td>
                        <td>{{totalPlayedBattleModeReservations}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Total Teams</td>
                        <td>{{totalBattleModeTeams}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Total Players</td>
                        <td>{{totalBattleModePlayersFunction}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Average Reservation</td>
                        <td>{{averageBattleModeReservations}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Average Team
                          <!-- <br>
                          <p style="font-style:italic;">total players / total teams
                          </p> -->
                        </td>
                        <td>{{averageBattleModeTeamsFunctions}}
                        </td>
                      </tr>
                    </table>
                  </b-col>

                  <!-- </b-col> -->

                </b-row>
                <!-- end of b-row for third table -->

                <!-- <hr> -->
                <br>

                <!-- below b-row generates the third table -->
                <b-row>

                  <!-- drop here -->

                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">How did you hear about us?</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Heard about it directly from a friend, family or colleague</td>
                        <td>{{answer2}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Saw it on a friend's social media</td>
                        <td>{{answer3}}</td>
                      </tr> 
                      <tr>
                        <td class="tdStyle">Google search</td>
                        <td>{{answer4}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Trip Advisor, Yelp or other Review site</td>
                        <td>{{answer5}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Others</td>
                        <td>{{answer6}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Instagram</td>
                        <td>{{answer7}}</td>
                      </tr> 
                      <tr>
                        <td class="tdStyle">TikTok</td>
                        <td>{{answer8}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Total</td>
                        <td><b>{{totalAnswer}}</b></td>
                      </tr>  
                    </table>
                  </b-col>

                <!-- <b-col>
                  <table class="table table-hover">
                    <thead>
                      <p class="theadStyle">Bookers</p>
                    </thead>
                    <tr>
                      <td class="tdStyle">Total Bookers</td>
                      <td>{{totalBooker}}</td>
                    </tr>
                    <tr>
                      <td class="tdStyle">Average Bookers
                        <p style="font-style:italic;">
                          Total Bookers/Total Players
                        </p>
                      </td>
                      <td>{{totalAverageBooker}}</td>
                    </tr>
                  </table>
                </b-col> -->
                <!-- </b-row> -->
                <!-- end of b-row for third table -->

                <!-- below b-row forth table HOW DID YOU ARRIVE AT BEAT THE BOMB -->
                <!-- <b-row> -->
                  <!-- <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">How did you arrive at Beat The Bomb?</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Uber/Lyft or other ride share service</td>
                        <td>{{answer11}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">NYC Taxi</td>
                        <td>{{answer12}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">NYC Subway</td>
                        <td>{{answer13}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">NYC Bus</td>
                        <td>{{answer14}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Got a car ride with friends or family</td>
                        <td>{{answer15}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Drove my own car (includes gave a ride to others)</td>
                        <td>{{answer16}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;padding-left:10%;font-style:italic;">I parked my car on the street</td>
                        <td style="font-style:italic;text-align:left;">{{answer16answer1}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;padding-left:10%;font-style:italic;">I parked in a paid parking garage</td>
                        <td style="font-style:italic; text-align:left;">{{answer16answer2}}</td>
                      </tr>


                      <tr>
                        <td class="tdStyle">Total</td>
                        <td><b>{{totalHowYouArrive}}</b></td>
                      </tr>
                    </table>
                  </b-col> -->

                  <!-- this will display marketing data -->
                    <b-col>
                      <table class="table table-hover">
                        <thead>
                          <p class="theadStyle">Marketing Data</p>
                        </thead>
                        <tr>
                          <td class="tdStyle">Instagram</td>
                          <td>{{countInstagram}}</td>
                        </tr>
                        <tr>
                          <td class="tdStyle">Marketing Consent</td>
                          <td>{{countMarketingConsent}}</td>
                        </tr>
                      </table>
                    </b-col> <!-- end of marketing data -->
                  </b-row>
                <!-- end of b-row for forth table -->

                <br>
                <!-- <br>
                <b-row>
                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Marketing Data</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Instagram</td>
                        <td>{{countInstagram}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Marketing Consent</td>
                        <td>{{countMarketingConsent}}</td>
                      </tr>
                    </table>
                  </b-col>

                  <b-col>
                    <table class="table table-hover">

                    </table>
                  </b-col>
                </b-row> -->
                <br>

              </div>
              <!-- END OF OVERALL DASHBOARD -->

              <!-- REPEATERS DASHBOARD DIV -->
              <div v-if="pageLoad == '2'">
                <span style="font-size: 1.7em;text-decoration: underline;"><b> BOOKER DATA </b></span>
                <br><br>
                <b-row>
                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Purchaser/Booker Data</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Purchasers</td>
                        <td>{{uniqueBookers}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Purchases</td>
                        <td>{{totalBookers}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Unique Purchasers Since Beginning</td>
                        <td>{{allTimeUniqueBookers}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Purchases Since Beginning</td>
                        <td>{{allTimeTotalBookers}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Unique Purchasers Rolling 12 Months</td>
                        <td>{{uniquePurchaser12months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Purchases in last 12 Months</td>
                        <td>{{purchaseVolume12months}}</td>
                      </tr> 
                    </table>
                  </b-col>

                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Repeat Purchaser Data</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Repeat Purchasers Since Beginning</td>
                        <td>{{purchaseVolumeByEndDate}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Aggregate Volume of Unique Repeat Purchasers Since Beginning</td>
                        <td>{{aggregatePurchaseVolume12months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Repeat Purchasers rolling 12-Month</td>
                        <td>{{uniquePurchaseVolume12months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Aggregate Volume of Unique Repeat Purchasers rolling 12 Months</td>
                        <td>{{aggregateUniquePurchaseVolume12months}}</td>
                      </tr>  
                    </table>
                  </b-col>
                </b-row>
                <br>
                <b-row>
                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Repeat Purchaser Ratios</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Monthly Repeat Rate Full</td>
                        <td>{{monthlyRepeatRate}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Monthly Repeat Rate 12 Months</td>
                        <td>{{monthlyRepeatRate12months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">All Time Repeat Rate</td>
                        <td>{{allTimeRepeatRate}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Rolling 12 Month Repeat Rate</td>
                        <td>{{rolling12monthRepeatRate}}</td>
                      </tr>  
                    </table>
                  </b-col>
                  <b-col>
                  </b-col>
                </b-row>

                <hr>

                <span style="font-size: 1.7em;text-decoration: underline;"><b> PLAYER DATA </b></span>
                <br><br>
                <b-row>
                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Player Data (No Player Minors)</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Players</td>
                        <td>{{volumeInMonthUniquePlayers}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Plays</td>
                        <td>{{volumeInMonthPlays}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Unique Players Since Beginning</td>
                        <td>{{uniquePlayersSinceBeginning}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Plays Since Beginning</td>
                        <td>{{volumePlaysSinceBeginning}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Unique Players Rolling 12 Months</td>
                        <td>{{uniquePlayersRolling12Months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of Plays in last 12 Months</td>
                        <td>{{last12MonthsVolumePlay}}</td>
                      </tr> 
                    </table>
                  </b-col>

                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Repeat Player Data</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Repeat Players Since Beginning</td>
                        <td>{{inMonthUniquePlayerRepeaters}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Aggregate Volume of Unique Repeat Players Since Beginning</td>
                        <td>{{aggregateVolumeUniquePlayerRepeaters}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Volume of In-Month Unique Repeat Players Rolling 12-Month</td>
                        <td>{{playersMonthUniqueRepeaters}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Aggregate Volume of Unique Repeat Players Rolling 12 Months</td>
                        <td>{{aggregateUniquePlayerRepeaters12months}}</td>
                      </tr>  
                    </table>
                  </b-col>
                </b-row>
                <br>
                <b-row>
                  <b-col>
                    <table class="table table-hover">
                      <thead>
                        <p class="theadStyle">Repeat Player Ratios</p>
                      </thead>
                      <tr>
                        <td class="tdStyle">Monthly Repeat Rate Full</td>
                        <td>{{playersMonthlyRepeatRate}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Monthly Repeat Rate 12 Months</td>
                        <td>{{playersMonthlyRepeatRate12months}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">All Time Repeat Rate</td>
                        <td>{{playersAllTimeRepeatRate}}</td>
                      </tr>
                      <tr>
                        <td class="tdStyle">Rolling 12 Month Repeat Rate</td>
                        <td>{{playersRolling12monthRepeatRate}}</td>
                      </tr>  
                    </table>
                  </b-col>
                  <b-col>
                  </b-col>
                </b-row>

              </div>
              <!-- END OF REPEATERS DASHBOARD -->


              <!-- start PLAY COUNT dashboard -->

              <div v-if="pageLoad == '3'">

                <b-row>
                  <b-col>
                    <a href="#/Dashboard" style="text-transform:capitalize;" @click="playCountPlayers()"><p class="h5">Players</p></a>
                  </b-col>
                  <b-col>
                    <h4 align="center" v-if="playCountPlayersValue == '1' ">Players Play Count</h4>
                    <h4 align="center" v-if="playCountBookersValue == '1' ">Bookers Repeat Count</h4>
                  </b-col>
                  <b-col>
                    <a href="#/Dashboard" style="text-transform:capitalize;" @click="playCountBookers()"><p class="h5">Bookers</p></a>
                  </b-col>
                </b-row>

                <div v-if="playCountPlayersValue == '1'">

                  <table class="table">
                    <tr>
                      <th style="text-align:left;">Full Name</th>
                      <th>Play Count</th>
                      <th>Phone Number</th>
                      <th style="text-align:center;padding-right:10%;">Email</th>
                      <th>Last Date</th>
                    </tr>

                    <tr v-for="(item,index) in playCountPlayersData" v-bind:key="item.id">
                      <td style="text-transform:capitalize; text-align:left;"><a href="/#/Dashboard" @click="playerProfileClicked(item.Player.id,index)">{{item.Player.Person.first_name}} {{item.Player.Person.last_name}}</a></td>
                      <td>{{item.total_times_played}}</td>
                      <td>{{item.Player.Person.phone}}</td>
                      <td style="text-align:left;padding-left:5%;">{{item.Player.Person.email}}</td>
                      <td>{{item.updatedAt | convertDateTime(item.updatedAt) }}</td>
                    </tr>

                  </table>

                </div>

                <div v-if="playCountBookersValue == '1' ">

                  <table class="table">
                    <tr>
                      <th style="text-align:left;">Full Name</th>
                      <th>Purchase Count</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Last Date</th>
                    </tr>

                    <tr v-for="(itemlist,index) in playCountBookersData" v-bind:key="itemlist.id">
                      <td style="text-transform:capitalize;text-align:left;"><a href="/#/Dashboard" @click="bookerProfileClicked(itemlist.Booker.Person.Player.id,index)">{{itemlist.Booker.Person.first_name}} {{itemlist.Booker.Person.last_name}}</a></td>
                      <!-- <td style="text-transform:capitalize;text-align:left;">{{itemlist.Booker.Person.first_name}} {{itemlist.Booker.Person.last_name}}</td> -->
                      <td>{{itemlist.total_times_booked}}</td>
                      <td>{{itemlist.Booker.Person.phone}}</td>
                      <td>{{itemlist.Booker.Person.email}}</td>
                      <td>{{itemlist.updatedAt | convertDateTime(itemlist.updatedAt) }}</td>
                    </tr>

                  </table>

                </div>

              </div>

              <!-- end of PLAY COUNT dashboard -->

              <!-- start of graph div -->
             <!--  <div v-if="pageLoad == '4'">
                <b-row>
                  <b-col><p class="h2" style="padding-left:10%;"><u>Graph Representation</u></p></b-col>
                  <b-col lg="2">
                    <b-form-select v-model="selectedRange" class="mb-1" v-on:change="clickedGraph()">
                      <b-form-select-option value="1">Day</b-form-select-option>
                      <b-form-select-option value="2">Week</b-form-select-option>
                      <b-form-select-option value="3">Month</b-form-select-option>
                      <b-form-select-option value="4">Year</b-form-select-option>
                    </b-form-select>
                  </b-col>
                </b-row>
                <br><br>
                <b-row>
                  <b-col>
                    <p class="h5">Total Players</p>
                    <br>
                    <apexchart width="500" type="bar" :options="totalPlayerBar" :series="totalPlayerBarSeries"></apexchart>
                  </b-col>

                  <b-col>
                    <p class="h5">Gender</p>
                    <br>
                    <apexchart width="380" type="pie" :options="genderOptions" :series="genderSeries"></apexchart>
                  </b-col>
                </b-row>
                <br><br>
                <b-row>
                  <b-col>
                    <p class="h5">Mission 1 Players</p>
                    <br>
                    <apexchart width="500" type="line" :options="totalMission1Options" :series="totalMission1Series"></apexchart>
                  </b-col>

                  <b-col>
                    <p class="h5">Mission 2 Players</p>
                    <br>
                    <apexchart width="500" type="line" :options="totalMission1Options" :series="totalMission2Series"></apexchart>
                  </b-col>
                </b-row>
              </div> -->
              <!-- end of graph div -->

            </b-col>

            <br>

          </b-row>
          <!-- end of right div which all table -->

        </b-col>
      </b-row>



    </div>

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




  </div>
</template>

<script src="moment.js"></script>
<script src="moment-range.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> -->

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
  import Moment from 'moment';

  /** this is for the graphical chart **/
  import VueApexCharts from 'vue-apexcharts';
  Vue.use(VueApexCharts);
  Vue.component('apexchart', VueApexCharts);
  /** end of apex chart **/

  // import Moment from 'moment';
  // import Moment from 'moment';
  import { extendMoment } from 'moment-range';

  const moment = extendMoment(Moment);

  import vSelect from "vue-select";
  // import DateDropdown from 'vue-date-dropdown'; // this for the date dropdown

  // import { namesRef } from './firebase';

  export default {
    name: 'App',
    components: {
    // HelloWorld,
    // ChildComponent
    vSelect
  },

  data(){
    return{
      // url: process.env.VUE_APP_URL,
      // title: process.env.VUE_APP_TITLE,

      /** repeaters dashboard obejcts **/
      uniqueBookers:'',
      totalBookers:'',
      allTimeTotalBookers:'',
      allTimeUniqueBookers:'',
      uniquePurchaser12months:'',
      purchaseVolume12months:'',
      totalAverageBooker:'',

      battleModePlayersMission1:'',
      battleModePlayersMission2:'',

      mission1TotalTeams:'',
      mission2TotalTeams:'',
      battleModeMission1TotalTeams:'',
      battleModeMission2TotalTeams:'',

      purchaseVolumeByEndDate:'',
      aggregatePurchaseVolume12months:'',
      uniquePurchaseVolume12months:'',
      aggregateUniquePurchaseVolume12months:'',

      monthlyRepeatRate: '',
      monthlyRepeatRate12months: '',
      allTimeRepeatRate:'',
      rolling12monthRepeatRate:'',

      /** players repeaters object **/

      volumeInMonthUniquePlayers:'',
      volumeInMonthPlays:'',
      uniquePlayersSinceBeginning:'',
      volumePlaysSinceBeginning:'',
      uniquePlayersRolling12Months:'',
      last12MonthsVolumePlay:'',

      inMonthUniquePlayerRepeaters:'0',
      aggregateVolumeUniquePlayerRepeaters:'0',
      playersMonthUniqueRepeaters:'0',
      aggregateUniquePlayerRepeaters12months:'0',

      playersMonthlyRepeatRate:'0',
      playersMonthlyRepeatRate12months:'0',
      playersAllTimeRepeatRate:'0',
      playersRolling12monthRepeatRate:'0',
      /** end of players repeaters objects **/

      /** end of repeaters dashboard objects **/

      /** battle mode team details **/
      // battleModeTotalPlayers:'',
      // battleModeTotalTeam:'',
      /** end of battle mode details **/

      pageLoad:'1',

      xolaReserevedPlayer:'',
      countInstagram:'',
      countMarketingConsent:'',

      endDateClicked: '',
      // dateClicked: '',

      startDate: '2020-12-06',
      endDate: moment().format('YYYY-MM-DD'),
      allDates: [],
      startDateUsed:'',
      endDateUsed: '',

      newDateUse:[],
      totalBooker:'',

      totalPlayers:'',
      totalTeams:'',
      mission1total:'',
      mission2total:'',
      missionDiscrepancy:'',
      avgTeamSize:'',
      avgTeamSizeDiscrepancy:'',
      calculatedTeamSize:'',
      totalMinors:'',
      totalAdults:'',
      totalFemale:'',
      totalMale:'',
      totalNonBinary:'',
      totalPreferNotToAnswer:'',
      totalGender: '',
      minorsDiscrepancy:'',
      femalePercentage:'',

      bombbeaters:'',
      bombbeatersMission1:'',
      bombbeatersMission2:'',

      bombBeatersMission1TotalTeams:'',
      bombBeatersMission2TotalTeams:'',

      bombBeatersTotalPlayers:'',
      bombBeatersMission1Players:'',
      bombBeatersMission2Players:'',

      bombBeatersDiscrepancy:'',

      /** data for battle mode **/
      totalBattleModeReservations:'',
      totalBattleModePlayers:'',
      totalBattleModeTeams:'',
      averageBattleModeTeams:'',
      averageBattleModeReservations:'',
      totalPlayedBattleModeReservations:'',
      /** end of battle mode data **/

      answer2:'',
      answer3:'',
      answer4:'',
      answer5:'',
      answer6:'',
      answer7:'',
      answer8:'',
      totalAnswer:'',
      averageReservationSizeByXola:'',

      averageSessionTime:'',

      weeklyList:'0',
      buttonDisplay:'',
      pageReload:'1',

      value:'',
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

      searchedText:'',

      waiverLists: [],
      waiverListsMinor: [],
      reservationLists: [],
      updateReservationId: '',
      limitReservationList: '5',

      voucherReservationName:'',
      voucherReservationSize:'',
      voucherReservationTime:'',
      voucherEmail: '',
      voucherPhoneNumber: '',
      voucherNumberSelected: '',
      voucherCodeGenrated: '',
      voucherSendEmailButtonActivate: '0',
      voucherSizeDisable: '0',
      
      organizationType:'',

      selectedCustomerName: '',
      selectedDate:'',
      selectedTime:'',
      mission_name:'',
      teamSize:'',
      clickedPlayerList:[],
      personPhoneNumber:'',
      currentTime:'',

      /** player profile detail **/
      playerName: '',
      playerEmail:'',
      playerPhone:'',
      playerInstagram:'',
      playerGender:'', 
      playerDateOfBirth:'',
      playerWaiverId:'',
      playerPlayCount:'',
      playerBombBeater:'', 
      playerTeamPlayerSessionDetail:[],

      playerProfile:[],
      /** end of player profile detail **/

      /** booker profile detail **/
      brookerProfileReservationId:[],
      bookerReservationDetail:[],
      bookerReservationPlayerDetails:[],
      bookerReservationTeamDetail:[],

      clickedBookerTeamIndex:'',

      bookerReservationTeamName:'',
      bookerReservationSessionId:'',
      bookerReservationSessionId:'',
      bookerReservationRfidId:'',
      bookerReservationWinners:'',
      bookerReservationBattleMode:'',
      bookerReservationMissionId:'',
      bookerReservationTotalScore:'',
      bookerReservationPlayCount:'',
      bookerReservationSessionTime:'',
      bookerReservationBombTime:'',
      /** end of booker profile detail **/

      /** photobomb assets**/
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
      teamMedia10:'',

      /** minor waiver signed details **/
      minorWaiverSigned : [],
      waiverSignedFirstName : '',
      waiverSignedLastName : '',
      waiverSignedEmail : '',
      waiverSignedPhone : '',
      waiverSignedInstagram : '',
      waiverSignedWaiverId : '',

      // displayModal: true,
      timeList: [],
      convertedTimeList: '',

      reservationIdForOrganization: '', /* this stores data to update organization_id on reservation table */
      organizationNameList: [], /* list our all the organization name as for dropdown part */
      organizationNameTyped: '',
      organizationTypeSelected: '',
      organizationTypeSelectedNew: '', /** this will create new organization type name **/
      newOrganizationTypeId: '', /** new organization type id **/

      selectedReservationDate:'',
      formatted:'',
      dateClicked: moment().format('YYYY-MM-DD'),

      /** below is to add new reservation **/
      addBookerFirstName: '',
      addBookerLastName: '',
      addBookerEmail: '',
      addBookerPhoneNumber: '',
      addBookerMission: '',
      addBookerTeamSize:'',
      addReservationDate: moment().format('YYYY-MM-DD'),
      reservationTimeHourly: '',
      reservationTimeQuaterly: '',
      reservationAmPm:'',

      /** clicked on booker detail **/
      clickedBookerFirstName:'',
      clickedBookerLastName:'',
      clickedBookerFullName:'',
      clickedBookerEmail:'',
      clickedBookerPhone:'',
      clickedBookerPlayCount:'',
      clickedBookerLastPlayDate:'',

      addBookerXolaOrderId: '',
      addBookerXolaTravelerId: '',
      addBookerXolaItemId: '',
      addXolaBookerId: '',

      clickedPeopleDetail:[],
      teamBookerFirstName:'',
      teamBookerLastName:'',
      teamBookerPhone:'',
      teamBookerInstagram:'',
      teamBookerEmail:'',
      teamClikedName:'',
      /** end of new reservation detail **/

      /** arrive at beat the bomb **/
      answer11:'',
      answer12:'',
      answer13:'',
      answer14:'',
      answer15:'',
      answer16:'',
      answer16answer1:'',
      answer16answer2:'',
      totalHowYouArrive:'',
      /** end of arrive at beat the bomb **/

      playCountBookersValue:'',
      playCountPlayersValue:'',

      playCountPlayersData:[],
      playCountBookersData:[],

      /** used on firebase **/
      // username: '',
      // email: '',
      // name: '',
      /** end of firebase array **/

      readyCheckedCategories:[],
      lateCheckedCategories:[],
      getAllReservationList:[],

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
      ],

      /** this for apexchart day , month and year track **/
      eachDay:[],
      numberOfWeeks:'',
      selectedRange:'1',

      // timelist: 1500

      /** below is for apex chart **/
      // totalPlayerBar: {
      //   chart: {
      //     id: 'vuechart-example'
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      //   }
      // },
      totalPlayerBar: [],
      totalPlayerBarSeries: [{
        data:[],
      }],

      totalMission1Options: [],
      totalMission1Series: [{
        data:[],
      }],

      totalMission2Options: [],
      totalMission2Series: [{
        data:[],
      }],

      genderOptions:{ labels:["Female", "Male", "Non-binary", "Prefer not to say"]},
      genderSeries:[],
      genderLabel:['Female','Male','Non-binary','Prefer not to say'],
      // totalPlayerBarSeries: [{
      //   name: 'series-1',
      //   data: [30, 40, 45, 50, 49, 60, 70]
      // }],

    }
  },

  filters:{
    convertDateTime:function(data){
      return moment(data).format('MM-DD-YYYY HH:mm A');
    },

    convertReservationFor:function(data){
      return moment(data).format('MM-DD-YYYY HH:mm A');
    },

    roundDollarAmount:function(data){
      return Math.round(data);
    },

    convertMission:function(data){
      if(data == '1'){
        return 'Cyberbot';
      }
      if(data == '2'){
        return 'Block Monster';
      }
      if(data == '3'){
        return 'Cyberbot Pro';
      }
      if(data == '4'){
        return 'Cyberbot Halloween';
      }
      if(data == '5'){
        return 'Game Bay Mini Mission';
      }
      if(data == '6'){
        return 'Game Bay Floor grid bonanza';
      }
      if(data == '7'){
        return 'Game Bay No RFID games';
      }
      if(data == '8'){
        return 'Block Monster 5min Qualifier';
      }
      if(data == '9'){
        return 'Block Monster 5min Semi Final';
      }
      if(data == '10'){
        return 'Block Monster 5min Final';
      }
    },

  },

  computed: {

    teamSizeDiscrepancy: function(){
      var x = this.totalTeams-(this.mission1TotalTeams+this.mission2TotalTeams+this.battleModeMission1TotalTeams+this.battleModeMission2TotalTeams);
      return x;
    },

    noShowCustomers: function(){

      var x = this.xolaReserevedPlayer-this.totalPlayers;
      return x;
    },

    checkPlayerMissionDiscrepancy: function(){

      var x = this.totalPlayers-(this.mission1total+this.mission2total+this.battleModePlayersMission1+this.battleModePlayersMission2);
      return x;
    },

    averageTeamSizeFunction(){

      var x = parseFloat(this.totalPlayers/this.totalTeams).toFixed(2);
      return x;
    },

    bombBeatersTotalTeamsFunction(){
      var x = this.bombBeatersMission1TotalTeams+this.bombBeatersMission2TotalTeams;
      return x;
    },

    totalBattleModePlayersFunction(){
      var x = this.battleModePlayersMission1+this.battleModePlayersMission2;
      return x;
    },

    averageBattleModeTeamsFunctions(){
      var x = parseFloat((this.battleModePlayersMission1+this.battleModePlayersMission2)/(this.battleModeMission1TotalTeams+this.battleModeMission2TotalTeams)).toFixed(2);
      return x;
    },

    // addOrganization: function(){
    //   this.$bvModal.show('modal-center');
    // },

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
    },

    checkStatus: function(){
      var currentTime = moment().format('HHmm');
      var totalLength = this.clickedPlayerList.length;

      var replyDataObj1 = this.clickedPlayerList;

      for(let i=0; i <= totalLength; i++){
        var reservationTime = this.clickedPlayerList[i].late_status_time;
        var status = currentTime-reservationTime;
        
        replyDataObj1[i]['time_status']=status;
      }

      return status;

    },

    checkLateTime: function(){

      var length = this.posts.length;

      var totalLength = length-1;

      var replyDataObj1 = this.posts;

      var currentTime = moment().format("HHmm");

      for(let i=0; i <= totalLength; i++){
        console.log(i);
        var late_by =  this.posts[i].late_status_time - currentTime;
        // return late_by;
        console.log(late_by+'value');
        replyDataObj1[i]['late_by']=late_by;
      }

      return late_by;

    },

    checkNoShows: function(){

      var length = this.posts.length;

      var totalLength = length;
      
      console.log(totalLength);

      var replyDataObj1 = this.posts;

      for(let i=0; i <= totalLength; i++){
        console.log(i);
        
        console.log(this.posts[i].size);
        
        console.log(this.posts[0]);
        console.log(this.posts[1]);

        console.log(this.posts[i].total_arrived);

        var no_shows = this.posts[i].size - this.posts[i].total_arrived;
        // return no_shows;
        console.log(no_shows+'value');
        replyDataObj1[i]['no_shows']=no_shows;
      }
      console.log(replyDataObj1);

      return no_shows;

      // var noShows = this.posts[0].size - this.posts[0].total_arrived.arrived;
      // return noShows;
    }

  },


  mounted: function(){

    console.log(this.startDate+' that was start date');
    console.log(this.endDate+' that was end date');

    /** this will give us the date range as for link **/
    var dates = [];

    var currDate = moment(this.startDate).startOf('day');
    var lastDate = moment(this.endDate).startOf('day');

    while(currDate.add(7, 'days').diff(lastDate) < 0) {
      console.log(currDate.toDate());
      var getDate = currDate.toDate();
      var convertDate = moment(getDate).format('YYYY-MM-DD');
      console.log(convertDate);
          // console.log('san');
          dates.push(convertDate);
          this.newDateUse.push(convertDate);
          console.log(dates);
          // console.log(this.allDates.length);
          // console.log(this.allDates[this.allDates.length-1]);

          // console.log(dates[dates.length-1]);
          // this.allDates.push(dates[dates.length-1]);
          // console.log(this.allDates);
        }
        /** end of DATE RANGE link **/
  // var lastDateElement1 = this.newDateUse.slice(-1).pop();

  var lastDateElement = this.allDates.slice(-1).pop();
  this.startDateUsed = moment(lastDateElement).add('days',1).format('YYYY-MM-DD');
  this.endDateUsed = moment(this.startDateUsed).add('days',7).format('YYYY-MM-DD');
  this.currentTime = moment().format('HH:mm');

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

  this.dateClicked = moment(this.newDateUse[this.newDateUse.length-1]).format('YYYY-MM-DD');
  this.endDateClicked = moment(this.dateClicked).add('days',7).format('YYYY-MM-DD');

  var starttime='start';
  var endtime='end';

  var currentdate = moment().format("YYYY-MM-DD");
    // var currentdate = moment().subtract(6, 'days').format("YYYY-MM-DD");

    var startReservationTime = '08:45:00';
    // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
    var endReservationTime = '23:45:00';
    var currentTime = moment().format("HHmm");
    console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);
    axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

    })
    .then(response => 
    {
      console.log(response);
      this.posts = response.data;

      /** Beginning of ARRIVED counting part **/
      var countPostArray = response.data.length-1;
        // console.log(countPostArray);
        var replyDataObj1 = this.posts;

        console.log(this.posts);

        for(let i=0; i <= countPostArray; i++){

            // console.log(response.data[i].Reservation_minors.length);

            var countReservationPeople = replyDataObj1[i].Reservation_people.length;
            var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
            var reservationForConvert = replyDataObj1[i].reservation_for;

            var date = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A MM-DD-YYYY');

            var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A');

            console.log(reservationForConvert);
            console.log(date);
            console.log(reservationOnlyTime);

            replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

            var lateStatus = moment.utc(reservationForConvert).subtract('hours',5).format('HHmm');
            var lateBy = lateStatus-currentTime;

            var arrivedPerson = 0;
            var arrivedNonPlayer = 0;
            var arrivedPlayer = 0;

            for(let j=0; j < countReservationPeople; j++){

              arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

              /** this will count total non player arrived **/
              if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
              }

              /** this will count total player arrived excluding minors for non-player 0 as false **/
              if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
              }

            }

            var arrivedMinor = 0;
            var arrivedMinorNonPlayer = 0;
            var arrivedMinorPlayer = 0;

            for(let k=0; k < countReservationMinors; k++){

              arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

              if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
              }

              /** this will count total player arrived for minors for non-player 0 as false **/
              if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
              }

            }

            console.log(arrivedPerson+' arrived person');
            console.log(arrivedMinor+' arrived minor');

            var arrived = arrivedPerson + arrivedMinor;

            console.log(arrivedNonPlayer+' arrived non player person');
            console.log(arrivedMinorNonPlayer+' arrived non player minor');
            var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
            console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

            console.log(arrivedPlayer+' arrived  player person');
            console.log(arrivedMinorPlayer+' arrived  player minor');
            var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
            console.log("TOTAL  PLAYER = "+totalPlayerArrived);

            // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
            // console.log(arrived);

            replyDataObj1[i]['total_arrived']=arrived;


            replyDataObj1[i]['late_status_time']=lateStatus;
            replyDataObj1[i]['late_by']=lateBy;
            replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
            replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

            console.log(currentTime);
            console.log(lateStatus);
            console.log("ARRIVED VALUE"+arrived);

            var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
            replyDataObj1[i]['reservation_id']=reservationId;
          }
          /** END of ARRIVED counting PART **/

        })
.catch(function (error){
  console.log(error);
});

/** this will get us ORGANIZATION TYPE list **/
axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                // arrived: arrivedValue
              })
.then(response => 
{
  console.log(response);
  this.organizationTypeList = response.data;
})

.catch(function (error){
  console.log(error);
});
/** END OF organization type list **/

    // axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{

    // })
    // .then(response => 
    //   {
    //     console.log(response);
    //     this.organizationDetail = response.data;
    //   })
    // .catch(function (error){
    //     console.log(error);
    //   });

    this.dateSelected();
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

    clickedRepeatersButton(){
      
      console.log('repeaters button clicked');

      /** Repeat Purchaser **/
        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_bookers_repeaters/purchase_volume_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.purchaseVolumeByEndDate = response.data[0].purchase_volume_12months;
          this.monthlyRepeatRate = parseFloat(this.purchaseVolumeByEndDate/this.uniqueBookers*100).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/aggregate_purchase_volume_12months/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.aggregatePurchaseVolume12months = response.data[0].aggregate_purchase_volume_12months;
          this.allTimeRepeatRate = parseFloat(this.aggregatePurchaseVolume12months/this.allTimeUniqueBookers*100).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_purchase_volume_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.uniquePurchaseVolume12months = response.data[0].unique_purchase_volume_12months;
          this.monthlyRepeatRate12months = parseFloat(this.uniquePurchaseVolume12months/this.uniqueBookers*100).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/aggregate_unique_purchase_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.aggregateUniquePurchaseVolume12months = response.data[0].aggregate_unique_purchase_12months;
          this.rolling12monthRepeatRate = parseFloat(this.aggregateUniquePurchaseVolume12months/this.uniquePurchaser12months*100).toFixed(2);

        })
        .catch(function (error) {
          console.log(error);
        });
        /** End of Purchaser **/


        /** BEGIN of PLAYER REPEATERS DATA **/

        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_players_by_month/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.volumeInMonthUniquePlayers = response.data[0].unique_players_by_month;

        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/volume_in_month_plays/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.volumeInMonthPlays = response.data[0].volume_in_month_plays;

        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_players_since_beginning/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.uniquePlayersSinceBeginning = response.data[0].unique_players_since_beginning;

        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/volume_plays_since_beginning/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.volumePlaysSinceBeginning = response.data[0].volume_plays_since_beginning;

        })
        .catch(function (error) {
          console.log(error);
        });

        console.log(process.env.VUE_APP_RAW_QUERIES+'/unique_players_rolling_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        // axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_players_rolling_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        // })
        // .then(response => 
        // {
        //   console.log(response);
        //   this.uniquePlayersRolling12Months = response.data[0].unique_players_rolling_12months;

        // })
        // .catch(function (error) {
        //   console.log(error);
        // });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/last_12months_volume_play/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.last12MonthsVolumePlay = response.data[0].last_12months_volume_play;

        })
        .catch(function (error) {
          console.log(error);
        });


        console.log(process.env.VUE_APP_RAW_QUERIES+'/in_month_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        // axios.get(process.env.VUE_APP_RAW_QUERIES+'/in_month_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        // })
        // .then(response => 
        // {
        //   console.log(response);
        //   this.inMonthUniquePlayerRepeaters = response.data[0].in_month_unique_repeaters;

        //   this.playersMonthlyRepeatRate = parseFloat(this.inMonthUniquePlayerRepeaters/this.volumeInMonthUniquePlayers*100).toFixed(2);


        // })
        // .catch(function (error) {
        //   console.log(error);
        // });

        console.log(process.env.VUE_APP_RAW_QUERIES+'/aggregate_volume_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        // axios.get(process.env.VUE_APP_RAW_QUERIES+'/aggregate_volume_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        // })
        // .then(response => 
        // {
        //   console.log(response);
        //   this.aggregateVolumeUniquePlayerRepeaters = response.data[0].aggregate_volume_unique_repeaters;

        //   this.playersAllTimeRepeatRate = parseFloat(this.aggregateVolumeUniquePlayerRepeaters/this.uniquePlayersSinceBeginning*100).toFixed(2);


        // })
        // .catch(function (error) {
        //   console.log(error);
        // });


        console.log(process.env.VUE_APP_RAW_QUERIES+'/players_month_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        // axios.get(process.env.VUE_APP_RAW_QUERIES+'/players_month_unique_repeaters/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        // })
        // .then(response => 
        // {
        //   console.log(response);
        //   this.playersMonthUniqueRepeaters = response.data[0].players_month_unique_repeaters;

        //   this.playersMonthlyRepeatRate12months = parseFloat(this.playersMonthUniqueRepeaters/this.volumeInMonthUniquePlayers*100).toFixed(2);


        // })
        // .catch(function (error) {
        //   console.log(error);
        // });


        console.log(process.env.VUE_APP_RAW_QUERIES+'/aggregate_unique_player_repeaters_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        // axios.get(process.env.VUE_APP_RAW_QUERIES+'/aggregate_unique_player_repeaters_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        // })
        // .then(response => 
        // {
        //   console.log(response);
        //   this.aggregateUniquePlayerRepeaters12months = response.data[0].aggregate_unique_player_repeaters_12months;

        //   this.playersRolling12monthRepeatRate = parseFloat(this.aggregateUniquePlayerRepeaters12months/this.uniquePlayersRolling12Months*100).toFixed(2);


        // })
        // .catch(function (error) {
        //   console.log(error);
        // });



        /** END OF PLAYERS REPEATERS DATA **/
      },

    dashboardMinorNameClicked(index){
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

        this.$bvModal.show('modal-minorWaiverSignedBy');

      })
      .catch(function (error) {
        console.log(error);
      });

    },

    provideTeamDetails(index){
      this.clickedBookerTeamIndex = index;

      this.bookerReservationPlayerDetails = [];
      this.bookerReservationTeamDetail = [];
      this.bookerReservationTeamName = [];
      this.bookerReservationSessionId = [];
      this.bookerReservationWinners = [];
      this.bookerReservationBattleMode = [];
      this.bookerReservationMissionId = [];
      this.bookerReservationPlayCount = [];
      this.bookerReservationSessionTime = [];

      var teamDetail = this.bookerReservationDetail[index];

      console.log(teamDetail);

      if(teamDetail.Reservation_people.length > '0'){
        var sessionId = teamDetail.Reservation_people[0].session_id;
      }
      if(teamDetail.Reservation_minors.length > '0'){
        sessionId = teamDetail.Reservation_minors[0].session_id;
      }

      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{

      })
      .then(response => 
      {
        console.log(response);
        this.bookerReservationTeamDetail = response.data;
        this.bookerReservationTeamName = response.data.Team.name;
        this.bookerReservationSessionId = response.data.sessionId;
        // this.bookerReservationRfidId = response.data.rfid_id;
        this.bookerReservationWinners = response.data.winners;
        this.bookerReservationBattleMode = response.data.team_vs_team_id;
        this.bookerReservationMissionId = response.data.mission_id;
        this.bookerReservationPlayCount = response.data.player_count;
        this.bookerReservationSessionTime = response.data.session_time;
        this.bookerReservationBombTime = response.data.bomb_time;
        this.bookerReservationTotalScore = response.data.total_score;

        this.$bvModal.show('modal-bookerTeamDetail');

      })
      .catch(function (error) {
            console.log(error);
      });

    },


    provideReservationDetail(index){
      console.log(this.bookerReservationDetail[index]);

      this.bookerReservationPlayerDetails = [];

      var totalReservationPlayers = this.bookerReservationDetail[index].Reservation_people.length;
      var totalReservationMinors = this.bookerReservationDetail[index].Reservation_minors.length;

      /** for loop for reservation people **/
      for (var i = 0; i < totalReservationPlayers; i++) {
    
        var firstName = this.bookerReservationDetail[index].Reservation_people[i].Person.first_name;
        var lastName = this.bookerReservationDetail[index].Reservation_people[i].Person.last_name;
        var email = this.bookerReservationDetail[index].Reservation_people[i].Person.email;
        var phone = this.bookerReservationDetail[index].Reservation_people[i].Person.phone;
        var instagram = this.bookerReservationDetail[index].Reservation_people[i].Person.instagram;
        var gender = this.bookerReservationDetail[index].Reservation_people[i].Person.gender_id;
        var dob = this.bookerReservationDetail[index].Reservation_people[i].Person.dob;
        var session_id = this.bookerReservationDetail[index].Reservation_people[i].Person.dob;
        var reservation_id = this.bookerReservationDetail[index].Reservation_people[i].Person.dob;
        var player_id = this.bookerReservationDetail[index].Reservation_people[i].Person.Player.id;
        var person_id = this.bookerReservationDetail[index].Reservation_people[i].Person.person_id;

        var playerTPSdetails = {
                      "first_name" : firstName,
                      "last_name": lastName,
                      "email": email,
                      "phone": phone,
                      "instagram":instagram,
                      "gender_id":gender,
                      "date_of_birth":dob,
                      "status": 'Adult',
                      "player_id":player_id,
                      "player_minor_id":'',
                      "session_id":session_id,
                      "reservation_id":reservation_id,
                      "person_id":person_id
                    };

        this.bookerReservationPlayerDetails.push(playerTPSdetails);

      }/** end of reservation loop **/


      /** for loop for reservation minor **/
      for (var i = 0; i < totalReservationMinors; i++) {
    
        var firstName = this.bookerReservationDetail[index].Reservation_minors[i].Player_minor.first_name;
        var lastName = this.bookerReservationDetail[index].Reservation_minors[i].Player_minor.last_name;
        var player_id = this.bookerReservationDetail[index].Reservation_minors[i].Player_minor.player_id;
        var player_minor_id = this.bookerReservationDetail[index].Reservation_minors[i].player_minor_id;

        var playerTPSdetails = {
                      "first_name" : firstName,
                      "last_name": lastName,
                      "email": '',
                      "phone": '',
                      "instagram":'',
                      "gender_id":'',
                      "date_of_birth":'',
                      "status": 'Minor',
                      "player_id":player_id,
                      "player_minor_id":player_minor_id,
                      "session_id":'',
                      "reservation_id":'',
                      "person_id":''
                    };

        this.bookerReservationPlayerDetails.push(playerTPSdetails);

      }/** end of reservation minor loop **/

      this.$bvModal.show('modal-bookerReservationPlayerDetails');

    },

    bookerProfileClicked(playerId,index){
      console.log(index);
      console.log(playerId);

      this.playerTeamPlayerSessionDetail = [];
      this.playerProfile = [];
      this.brookerProfileReservationId = [];
      this.bookerReservationDetail = [];

      console.log(this.playCountBookersData[index].Booker.Person);

      this.clickedBookerFirstName = this.playCountBookersData[index].Booker.Person.first_name;
      this.clickedBookerLastName = this.playCountBookersData[index].Booker.Person.last_name;
      this.clickedBookerFullName = this.playCountBookersData[index].Booker.Person.first_name+' '+this.playCountBookersData[index].Booker.Person.last_name;
      this.clickedBookerEmail = this.playCountBookersData[index].Booker.Person.email;
      // this.clickedInstagramDetail = this.playCountBookersData[index].Booker.Person.instagram;
      this.clickedBookerPhone = this.playCountBookersData[index].Booker.Person.phone;
      this.clickedBookerPlayCount = this.playCountBookersData[index].total_times_booked;
      this.clickedBookerLastPlayDate = this.playCountBookersData[index].updatedAt;

      var bookerPlayerId = this.playCountBookersData[index].Booker.Person.Player.id;

      axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+bookerPlayerId,{

      })
      .then(response => 
      { 
        console.log(response.data);
        // this.searchedTeamPlayerSession.push(response.data);

        var playerProfileLength = response.data.length;

        this.playerName = this.playCountPlayersData[index].Player.Person.first_name+' '+this.playCountPlayersData[index].Player.Person.last_name;
        this.playerPhone = this.playCountPlayersData[index].Player.Person.phone;
        this.playerEmail = this.playCountPlayersData[index].Player.Person.email;
        this.playerInstagram = this.playCountPlayersData[index].Player.Person.instagram;
        this.playerGender = this.playCountPlayersData[index].Player.Person.gender;
        this.playerDateOfBirth = this.playCountPlayersData[index].Player.Person.date_of_birth;
        this.playerWaiverId = this.playCountPlayersData[index].Player.Person.waiver_id;
        this.playerBombBeater = this.playCountPlayersData[index].Player.Person.bomb_beater;
        this.playerPlayCount = this.playCountPlayersData[index].Player.Person.play_count;

        for (var i = 0; i < playerProfileLength; i++) {

          var brookerProfileReservationId = response.data[i].reservation_id;
          this.brookerProfileReservationId.push(brookerProfileReservationId);

          axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+brookerProfileReservationId,{

          })
          .then(response => 
          {
            console.log(response);

            // var mission_id = response.data[i].mission_id;
            // var reservation_date = moment(response.data[i].reservation_date).format("YYYY-MM-DD hh:mm A");
            // var reservation_size = response.data[i].size;
            // var reservation_value = response.data[i].final_dollar_amount;
            this.bookerReservationDetail.push(response.data);

          })
          .catch(function (error) {
            console.log(error);
          });

                      

                    if(i+1 == playerProfileLength){
                      setTimeout(
                        this.$bvModal.show('modal-bookerProfileDetail'),1000
                        );
                      // this.$bvModal.show('modal-profileDetail');
                    }

                  }

                  })
      .catch(function (error) {
        console.log(error);
      });
    },

    playerProfileClicked(playerId,index){
      console.log('clicked on player profile');
      console.log(playerId);

      this.brookerProfileReservationId = [];
      this.bookerReservationDetail = [];
      this.playerTeamPlayerSessionDetail = [];
      this.playerProfile = [];

      var getPlayerId = playerId;

      axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/player_id/'+getPlayerId,{

      })
      .then(response => 
      { 
        console.log(response.data);
        // this.searchedTeamPlayerSession.push(response.data);

        var playerProfileLength = response.data.length;

        this.playerName = this.playCountPlayersData[index].Player.Person.first_name+' '+this.playCountPlayersData[index].Player.Person.last_name;
        this.playerPhone = this.playCountPlayersData[index].Player.Person.phone;
        this.playerEmail = this.playCountPlayersData[index].Player.Person.email;
        this.playerInstagram = this.playCountPlayersData[index].Player.Person.instagram;
        this.playerGender = this.playCountPlayersData[index].Player.Person.gender;
        this.playerDateOfBirth = this.playCountPlayersData[index].Player.Person.date_of_birth;
        this.playerWaiverId = this.playCountPlayersData[index].Player.Person.waiver_id;
        this.playerBombBeater = this.playCountPlayersData[index].Player.Person.bomb_beater;
        this.playerPlayCount = this.playCountPlayersData[index].Player.Person.play_count;

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
                        this.$bvModal.show('modal-playerProfileDetail'),1000
                        );
                      // this.$bvModal.show('modal-profileDetail');
                    }

                  }


                    // v.playerProfile = v.searchedTeamPlayerSession[index];

                    // v.playerName = v.teamList[index].name;
                    // v.playerPhone = v.teamList[index].phone;
                    // v.playerEmail = v.teamList[index].email;
                    // v.playerInstagram = v.teamList[index].instagram;
                    // v.playerGender = v.teamList[index].gender;
                    // v.playerDateOfBirth = v.teamList[index].date_of_birth;
                    // v.playerWaiverId = v.teamList[index].waiver_id;
                    // v.playerBombBeater = v.teamList[index].bomb_beater;
                    // v.playerPlayCount = v.teamList[index].play_count;

                  })
      .catch(function (error) {
        console.log(error);
      });

    },

    clickedTeamName(index,sessionId){

      console.log('clicked on team name');
      console.log('index '+index);
      console.log('session id '+sessionId);

      this.teamMedia = [];
      this.teamMedia0 = '';
      this.teamMedia1 = '';
      this.teamMedia2 = '';
      this.teamMedia3 = '';
      this.teamMedia4 = '';
      this.teamMedia5 = '';
      this.teamMedia6 = '';
      this.teamMedia7 = '';
      this.teamMedia8 = '';
      this.teamMedia9 = '';
      this.teamMedia10 = '';

      this.clickedPeopleDetail = [];
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

    clickedPlayCount(){
      this.pageLoad = '3';
      this.playCountPlayers();
    },

    clickedGraph(){

      /** clear all the array **/
      // this.totalMission1Options = [];
      // this.totalMission1Series = [];
      // this.totalMission2Series = [];
      // this.totalPlayerBarSeries[0].data = [];
      this.genderSeries = [];

      // chart.render();
      console.log(this.selectedRange);
      console.log(this.startDateUsed);
      console.log(this.endDateUsed);

      if(this.selectedRange == '1'){
        console.log('each day data');

        var getValue = 0;
        for (var m = moment(this.startDateUsed); m.isBefore(this.endDateUsed); m.add(1, 'days')) {
            // console.log(m.format('YYYY-MM-DD'));
            this.eachDay.push(m.format('DD/MM'));

            var dateStarted = m.format('YYYY-MM-DD');
            var dateEnded = m.format('YYYY-MM-DD');

            /** this for total players **/
            axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/start/'+dateStarted+'/end/'+dateEnded,{

            })
            .then(response => 
            {
              console.log(response);
              this.totalPlayerBarSeries[0].data.push(response.data);
              getValue++;
              // console.log(this.eachDay.length);
              if(getValue == this.eachDay.length){
                console.log('equal value');
                this.pageLoad = '4';
              }

            })
            .catch(function (error) {
              console.log(error);
            });

            this.totalPlayerBar = {
              chart: {
                id: 'vuechart-example'
              },
              xaxis: {
                categories: this.eachDay /** date **/
              }
            };
            /** end of total players **/


            /** mission 1 total players line graph **/
            axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+dateStarted+'/end/'+dateEnded+'/mission/1',{

            })
            .then(response => 
            {
              console.log(response);
              this.totalMission1Series[0].data.push(response.data);

            })
            .catch(function (error) {
              console.log(error);
            });

            this.totalMission1Options = {
              chart: {
                id: 'vuechart-example'
              },
              xaxis: {
                categories: this.eachDay /** date **/
              }
            };

            axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+dateStarted+'/end/'+dateEnded+'/mission/2',{

            })
            .then(response => 
            {
              console.log(response);
              this.totalMission2Series[0].data.push(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
            /** mission 1 total players line graph **/

        }


        /** this if for gender **/

          /** below axios is for total female gender **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/1',{

          })
          .then(response => 
          {
            console.log(response);
            // this.totalFemale = response.data.count;
            this.genderSeries.push(response.data.count);
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of female gender endpoint detail **/

          /** below axios is for total Male gender **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/2',{

          })
          .then(response => 
          {
            console.log(response);
            // this.totalMale = response.data.count;
            this.genderSeries.push(response.data.count);

          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of Male gender endpoint detail **/

          /** below axios is for total NonBinary gender **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/3',{

          })
          .then(response => 
          {
            console.log(response);
            // this.totalNonBinary = response.data.count;
            this.genderSeries.push(response.data.count);
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of NonBinary gender endpoint detail **/

          /** below axios is for total prefer not to answer gender **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/4',{

          })
          .then(response => 
          {
            console.log(response);
            // this.totalPreferNotToAnswer = response.data.count;
            this.genderSeries.push(response.data.count);
            // this.totalGender = this.totalFemale+this.totalMale+this.totalNonBinary+this.totalPreferNotToAnswer;
            })
          .catch(function (error) {
            console.log(error);
          });
          /** end of total prefer not to answer endpoint detail **/

        /** gender options **/

        

      }

      if(this.selectedRange == '2'){
        console.log('weekly data');
      }
      if(this.selectedRange == '3'){
        console.log('monthly data');
      }
      if(this.selectedRange == '4'){
        console.log('yearly data');
        var weekStartDate = moment(this.startDateUsed, 'DD-MM-YYYY'); 
        var weekEndDate = moment(this.endDateUsed, 'DD-MM-YYYY');
        this.numberOfWeeks = weekEndDate.diff(weekStartDate, 'weeks');

        console.log(this.numberOfWeeks);

        // for (var i = 0; i < this.numberOfWeeks; i++) {
        //   this.weekRange =     
        // }
      }


      // var totalPlayerArray = [];
    },

    playCountPlayers(){

      this.playCountBookersValue = '0';
      this.playCountPlayersValue = '1';

      console.log(this.startDateUsed);
      console.log(this.endDateUsed);

      // console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/desc_play_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed);

      axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/desc_play_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response);
        this.playCountPlayersData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log('inside play count players');
    },

    playCountBookers(){

      this.playCountPlayersValue = '0';
      this.playCountBookersValue = '1';

      console.log(this.startDateUsed);
      console.log(this.endDateUsed);

      axios.get(process.env.VUE_APP_RESERVATIONS+'desc_repeat_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response);
        this.playCountBookersData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log('inside play count bookers');
    },

    selectDate(){
      console.log('select date');
      this.$bvModal.show('modal-date');
    },

    activateWeekList(){
      this.buttonDisplay++;
      if(this.buttonDisplay%2 == 0){
        // console.log(this.buttonDisplay+' even');
        this.weeklyList = 0;
      }
      else{
        // console.log(this.buttonDisplay+' odd');
        this.weeklyList = 1;
      }
    },

    dateSelected(element,value){

      console.log(element);
      console.log(value);

      console.log('in in in in in');

      if(this.pageLoad == '4'){
        this.clickedGraph();
      }

      if(this.pageReload == '1'){
        console.log('page loaded');
        var element = this.allDates.pop(); /** this will select the Last Element FROM DATE LINK **/

        // var startDate = moment(element).add('days',1).format('YYYY-MM-DD');
        // var endDate = moment(element).add('days',7).format('YYYY-MM-DD');

        var startDate = this.dateClicked;
        var endDate = this.endDateClicked;

        this.startDateUsed = startDate;
        this.endDateUsed = endDate;

        console.log('start date is '+this.startDateUsed);
        console.log('end date is '+this.endDateUsed);

        // this.dateClicked = startDate;
        // this.endDateClicked = endDate;

        this.pageReload = 0;
      }

      if(value == 1){
        console.log('yes link');

        var endDate = moment(element).add('days',1).format('YYYY-MM-DD');
        var startDate = moment(element).subtract('days',6).format('YYYY-MM-DD');

        console.log('start date was '+startDate);
        console.log('end adate was '+endDate);

        this.startDateUsed = startDate;
        this.endDateUsed = endDate;

        this.dateClicked = startDate;
        this.endDateClicked = endDate;

        this.pageReload = 0;

        this.loadData();
      }
      else{
        console.log('no link');

        this.dateClicked = this.startDateUsed;
        this.endDateClicked = this.endDateUsed;

        console.log(this.startDateUsed);
        console.log(this.endDateUsed);

        this.pageReload = 0;
        
        this.$bvModal.hide('modal-date');

        this.loadData();
      }

      // if(pageReload == '4'){
      //   this.clickedGraph();
      // }

    },

    loadData(){
      console.log(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
      axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response);
        this.totalPlayers = response.data;

        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/1',{

        })
        .then(response => 
        {
          console.log(response);
          this.mission1total = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/2',{

        })
        .then(response => 
        {
          console.log(response);
          this.mission2total = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** battle mode mission 1 total players **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/battle_mode_total_players/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/1',{

        })
        .then(response => 
        {
          console.log('battle mode players mission 1 '+response.data);
          this.battleModePlayersMission1 = response.data;
            // this.missionDiscrepancy = parseInt(this.totalPlayers)-(parseInt(this.mission1total)+parseInt(this.mission2total));
          })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/battle_mode_total_players/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/2',{

        })
        .then(response => 
        {
          console.log('battle mode players mission 2 '+response.data);
          this.battleModePlayersMission2 = response.data;
            // this.missionDiscrepancy = parseInt(this.totalPlayers)-(parseInt(this.mission1total)+parseInt(this.mission2total)+parseInt(this.battleModePlayersMission1)+response.data);
          })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/battle_mode_total_players/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/1',{

        })
        .then(response => 
        {
          console.log(response);
          this.totalBattleModePlayers = response.data;
          var ss = response.data;

          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/battle_mode_team/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

          })
          .then(response => 
          {
            console.log(response);
            var tt = response.data;
            this.totalBattleModeTeams = response.data;
            this.totalPlayedBattleModeReservations = tt/2;
              // this.averageBattleModeTeams = this.battleModeTotalPlayers/response.data;

              // console.log(this.totalBattleModeTeams);
              // console.log(response.data);

              if(ss == '0' || tt == '0'){
                this.averageBattleModeTeams = '0';
              }
              else{
                // console.log('battle mode team was '+battleModeTotalTeams);
                // console.log('battle mode player size was '+this.totalBattleModePlayers);
                this.averageBattleModeTeams = parseFloat(ss/tt).toFixed(2);
              }
              // this.average
            })
          .catch(function (error) {
            console.log(error);
          });

        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          var totalTeams = response.data;
          this.totalTeams = totalTeams;
          this.avgTeamSize = parseFloat(this.totalPlayers/this.totalTeams).toFixed(2);

            // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/battle_mode_team/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

            // })
            // .then(response => 
            // {
            //   console.log(response);
            //   var tt = response.data;

            //     axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/average_session_player_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

            //     })
            //     .then(response => 
            //     {
            //       console.log(response);
            //       this.avgTeamSize = parseFloat(response.data[0].player_count).toFixed(2);
            //       var x = this.totalPlayers;
            //       var y = this.totalTeams;
            //       var z = x/y;

            //       this.calculatedTeamSize = parseFloat(this.totalPlayers/this.totalTeams).toFixed(2);
            //       this.avgTeamSizeDiscrepancy = parseFloat(this.avgTeamSize-this.calculatedTeamSize).toFixed(2);

            //       if(this.avgTeamSizeDiscrepancy < 0 || this.avgTeamSizeDiscrepancy > 0){
            //         this.avgTeamSizeDiscrepancy = parseFloat(this.avgTeamSize-this.calculatedTeamSize).toFixed(2);
            //       }
            //       else{
            //         this.avgTeamSizeDiscrepancy = this.avgTeamSize-this.calculatedTeamSize;
            //       }
            //     })
            //     .catch(function (error) {
            //       console.log(error);
            //     });

            // })
            // .catch(function (error) {
            //   console.log(error);
            // });


          })
        .catch(function (error) {
          console.log(error);
        });

        /** XOLA total reserved player **/
        console.log(process.env.VUE_APP_RESERVATIONS+'dashboard/reservation_size_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
        
        axios.get(process.env.VUE_APP_RESERVATIONS+'dashboard/reservation_size_count/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.xolaReserevedPlayer = response.data.rows[0].reservation_size_count;
        })
        .catch(function (error) {
          console.log(error);
        });


        /** Instagram Count **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'dashboard/count_instagram/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.countInstagram = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });


        /** Marketing consent count **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'dashboard/count_marketing_consent/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.countMarketingConsent = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });



        /** mision 1 total teams **/
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/1',{

        })
        .then(response => 
        {
          console.log(response);
          this.mission1TotalTeams = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** mision 2 total teams **/
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/2',{

        })
        .then(response => 
        {
          console.log(response);
          this.mission2TotalTeams = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });


        /** battle mode mision 1 total teams **/
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/battle_mode_team/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/1',{

        })
        .then(response => 
        {
          console.log(response);
          this.battleModeMission1TotalTeams = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** battle mode mision 2 total teams **/
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/battle_mode_team/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/mission/2',{

        })
        .then(response => 
        {
          console.log(response);
          this.battleModeMission2TotalTeams = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** below axios is for the total adults **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/total_adults/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.totalAdults = response.data.count;

          /** below axios is for the minors **/
          axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/total_minors/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

          })
          .then(response => 
          {
            console.log(response);
            this.totalMinors = response.data.count;
            this.minorsDiscrepancy = this.totalPlayers-this.totalAdults-this.totalMinors;
          })
          .catch(function (error) {
            console.log(error);
          });
          /** end of minors endpoint detail **/

        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of minors endpoint detail **/


        /** below axios is for total female gender **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/1',{

        })
        .then(response => 
        {
          console.log(response);
          this.totalFemale = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of female gender endpoint detail **/

        /** below axios is for total Male gender **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/2',{

        })
        .then(response => 
        {
          console.log(response);
          this.totalMale = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of Male gender endpoint detail **/

        /** below axios is for total NonBinary gender **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/3',{

        })
        .then(response => 
        {
          console.log(response);
          this.totalNonBinary = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of NonBinary gender endpoint detail **/

        /** below axios is for total prefer not to answer gender **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/4',{

        })
        .then(response => 
        {
          console.log(response);
          this.totalPreferNotToAnswer = response.data.count;
          this.totalGender = this.totalFemale+this.totalMale+this.totalNonBinary+this.totalPreferNotToAnswer;
            // this.minorsDiscrepancy = this.totalPlayers-(this.totalMinors+this.totalGender);
          })
        .catch(function (error) {
          console.log(error);
        });
        /** end of total prefer not to answer endpoint detail **/


        /** female percentage **/
        axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/gender/',{

        })
        .then(response => 
        {
          console.log(response);
          this.femalePercentage = response.data.percentFemale;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of female percentage **/


        /** the below axios post are for REPEATERS DASHBOARD **/

        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_bookers/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.uniqueBookers = response.data[0].unique_bookers;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/total_bookers/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.totalBookers = response.data[0].total_bookers;
          this.totalAverageBooker = parseFloat(response.data[0].total_bookers/this.totalPlayers).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });


        /** battle mode data **/


        axios.get(process.env.VUE_APP_RESERVATIONS+'dashboard/battle_mode_average_reservation_size/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response.data[0]);
          var space = 'average size';
          console.log(response.data[0].average_size);
          var x = response.data[0].average_size;
          this.averageBattleModeReservations = parseFloat(x).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_RESERVATIONS+'dashboard/battle_mode_reservation_size/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          this.totalBattleModeReservations = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** end of battle mode data **/



        axios.get(process.env.VUE_APP_RAW_QUERIES+'/alltime_unique_bookers/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.allTimeUniqueBookers = response.data[0].alltime_unique_bookers;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/alltime_total_bookers/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.allTimeTotalBookers = response.data[0].alltime_total_bookers;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/unique_purchaser_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.uniquePurchaser12months = response.data[0].unique_purchaser_12months;
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.get(process.env.VUE_APP_RAW_QUERIES+'/purchase_volume_12months/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
          this.purchaseVolume12months = response.data[0].purchase_volume_12months;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** END OF REPEATERS DASHBOARD **/

      })
.catch(function (error) {
  console.log(error);
});

/** BOMB BEATERS BOTH MISSION TOTAL PLAYERS **/
axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/winners_player_count_session/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

})
.then(response => 
{
  console.log(response.data);
  this.bombBeatersTotalPlayers = response.data[0].player_count;
})
.catch(function (error) {
  console.log(error);
});

/** BOMB BEATERS MISSION 1 TOTAL PLAYERS **/
axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/bombbeaters/1',{

})
.then(response => 
{
  console.log(response.data);
  this.bombBeatersMission1Players = response.data;
})
.catch(function (error) {
  console.log(error);
});

/** BOMB BEATERS MISSION 2 TOTAL PLAYERS **/
axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/bombbeaters/2',{

})
.then(response => 
{
  console.log(response.data);
  this.bombBeatersMission2Players = response.data;
})
.catch(function (error) {
  console.log(error);
});


/** BOMB BEATERS mission 1 teams **/
axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/winners/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/1',{

})
.then(response => 
{
  console.log(response.data);
  this.bombBeatersMission1TotalTeams = response.data;
})
.catch(function (error) {
  console.log(error);
});

/** BOMB BEATERS mission 2 teams **/
axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/dashboard/winners/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/2',{

})
.then(response => 
{
  console.log(response.data);
  this.bombBeatersMission2TotalTeams = response.data;
})
.catch(function (error) {
  console.log(error);
});


/** How did you hear about us for Heard about it directly from a friend, family or colleague **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/2');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/2',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer2 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us for Heard about it directly from a friend, family or colleague **/


      /** How did you hear about us Friends Social Media **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/3');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/3',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer3 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us Friends Social Media **/

      /** How did you hear about us Google Search **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/4');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/4',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer4 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us Google Search **/

      /** How did you hear about us Trip Advisor **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/5');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/5',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer5 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us Trip Advisor **/

      /** How did you hear about us from OTHERS **/
      console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/6');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/6',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer6 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us from OTHERS **/

      /** How did you hear about us from INSTAGRAM **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/7');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/7',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer7 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us from INSTAGRAM **/

      /** How did you hear about us from TIK TOK **/
      // console.log(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/8');
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/8',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer8 = response.data.count;
        this.totalAnswer = this.answer2+this.answer3+this.answer4+this.answer5+this.answer6+this.answer7+this.answer8;
      })
      .catch(function (error) {
        console.log(error);
      });
      /** end of How did you hear about us from TIK TOK **/


      /** How did you arrive at beat the bomb **/

      /** Uber/Lyft **/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/11',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer11 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });

      /** NYC TAXI **/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/12',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer12 = response.data.count;

      })
      .catch(function (error) {
        console.log(error);
      });

      /** NYC Subway **/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/13',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer13 = response.data.count;

      })
      .catch(function (error) {
        console.log(error);
      });

      /** NYC BUS **/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/14',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer14 = response.data.count;

      })
      .catch(function (error) {
        console.log(error);
      });

      /** got a car ride from friends and family **/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/15',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer15 = response.data.count;

      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/answer/16',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer16 = response.data.count;
        this.totalHowYouArrive = this.answer11+this.answer12+this.answer13+this.answer14+this.answer15+this.answer16;

      })
      .catch(function (error) {
        console.log(error);
      });

      /** drove my own car  open text 1 as I parked my car on the street**/
      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/open_text/1',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer16answer1 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get(process.env.VUE_APP_PERSON_SURVEY_ANSWER+'/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed+'/open_text/2',{

      })
      .then(response => 
      {
        console.log(response.data.count);
        this.answer16answer2 = response.data.count;
      })
      .catch(function (error) {
        console.log(error);
      });

      /** end of How did you arrive at beat the bomb **/


      /** AVERAGE RESERVATION SIZE **/
      axios.get(process.env.VUE_APP_RESERVATIONS+'dashboard/average_group_size/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response.data[0]);
        var space = 'average size';
        console.log(response.data[0].average_size);
          // var y = 
          this.averageReservationSizeByXola = parseFloat(response.data[0].average_size).toFixed(2);
        })
      .catch(function (error) {
        console.log(error);
      });
      /** end of AVERAGE RESERVATION SIZE **/

      /** AVERAGE Game Time from SESSION TABLE **/
      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/average_team_time/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response);

          // console.log(response.data.avgTimePlayed);
          if(response.data.length > '0'){
            var formatAverageTime = Math.round(response.data[0].avgTimePlayed/60);
          }
          else{
            formatAverageTime = '0';
          }
          // console.log(formatAverageTime);
          // var momentFormatAverageTime = moment(formatAverageTime).format('HH:mm');
          // console.log(momentFormatAverageTime);
          this.averageSessionTime = formatAverageTime;
          // var space = 'average size';
          // console.log(response.data[0].average_size);
          // this.averageReservationSizeByXola = parseFloat(response.data[0].average_size).toFixed(2);
        })
      .catch(function (error) {
        console.log(error);
      });
      /** end of AVERAGE Game Time from Session table **/

      // http://20.17.0.4:9090/people/booker/dashboard/start/2020-9-11/end/2020-10-11
      /** Total Number of bookers **/
      axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'booker/dashboard/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

      })
      .then(response => 
      {
        console.log(response);
        console.log(response.data.count);

        this.totalBooker = response.data.count;
          // this.averageSessionTime = response.data.avgTimePlayed;
          // var space = 'average size';
          // console.log(response.data[0].average_size);
          // this.averageReservationSizeByXola = parseFloat(response.data[0].average_size).toFixed(2);
        })
      .catch(function (error) {
        console.log(error);
      });
      /** ENd of Booker description **/
    },

    changedReservation(event,index,checkPlayer){
      console.log(event);
      console.log(index);
      console.log(checkPlayer);
      if(checkPlayer == 'minor'){
        console.log('Yes Minor');

        var reservationId = event;
        var player_minor_id = this.waiverListsMinor[index].id;

        console.log(reservationId);
        console.log(player_minor_id);

        axios.post(process.env.VUE_APP_RESERVATION_MINORS+'/find_or_create/player_minor/'+player_minor_id+'/reservation/'+reservationId,{
          // session_id: 0
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
      else{
        console.log('Player');
        var reservationId = event;
        var personId = this.waiverLists[index].id;

        console.log(reservationId);
        console.log(personId);

        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+personId+'/reservation/'+reservationId);

        axios.post(process.env.VUE_APP_RESERVATION_PEOPLE+'/find_or_create/person/'+personId+'/reservation/'+reservationId,{
              // session_id: 0
            })
        .then(response => {
          console.log(response);
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    },

    waiverList(){

      this.dateClicked = moment().format('YYYY-MM-DD');
      this.endDateClicked = moment().add('days',7).format('YYYY-MM-DD');

      var starttime='start';
      var endtime='end';

      var currentdate = moment().format("YYYY-MM-DD");
      // var currentdate = moment("2020-11-01").format("YYYY-MM-DD");

      var startPeopleTime = '08:45:00';
      var endPeopleTime = '23:55:00';
      var currentTime = moment().format("HHmm");

      var listLimit = this.limitReservationList;

      // console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime);
      // axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime,{

      //   })
      console.log(process.env.VUE_APP_DATABASE_PEOPLE+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit);
      axios.get(process.env.VUE_APP_DATABASE_PEOPLE+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit,{

      })
      .then(response => 
      {
        console.log(response);

        this.waiverLists = response.data;

      })
      .catch(function (error){
        console.log(error);
      });


      /** the below code is for the MINORS LIST **/
      console.log(process.env.VUE_APP_PLAYER_MINORS+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit);
      axios.get(process.env.VUE_APP_PLAYER_MINORS+starttime+'/'+currentdate+'T'+startPeopleTime+'/'+endtime+'/'+currentdate+'T'+endPeopleTime+'/limit/'+listLimit,{

      })
      .then(response => 
      {
        console.log(response);

        this.waiverListsMinor = response.data;

      })
      .catch(function (error){
        console.log(error);
      });


      var startReservationtime = moment().subtract(1, 'hours').format("HH:mm:00");
      var endResevationtime = moment().add(1, 'hours').format("HH:mm:00");

      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationtime+'/'+endtime+'/'+currentdate+'T'+endResevationtime);
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+starttime+'/'+currentdate+'T'+startReservationtime+'/'+endtime+'/'+currentdate+'T'+endResevationtime,{

      })
      .then(response => 
      {
        console.log(response);

        this.reservationLists = response.data;

      })
      .catch(function (error){
        console.log(error);
      });

      /** END of MINORS LIST **/

      this.$bvModal.show('modal-waiverList');
    },

    convertReservationTime(date){
      return moment(date).format('h:mm A');
      console.log(date);
    },

    hideVoucherModal(){
      this.$bvModal.hide('modal-vouchers');
    },

    getVoucherCode(event, totalVoucher){
      console.log(event);
      console.log('size of vouchers '+totalVoucher);
      if(totalVoucher > '0'){
        this.voucherSendEmailButtonActivate = '1';
        this.voucherCodeGenrated = 'axios get code for size '+' '+totalVoucher;
      }
      else{
        this.voucherCodeGenrated = ' ';
      }
      
    },

    forwardedEmailVouchers(event,reservationId){
      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{

      })
      .then(response => {
        console.log(response);
        var firstName = response.data.Booker.Person.first_name;
        var lastName = response.data.Booker.Person.last_name;

        if(firstName == null || firstName == 'undefined'){
          var firstName = ' ';
        }
        if(lastName == null || lastName == 'undefined'){
          var lastName = ' ';
        }

        this.voucherReservationName = firstName+' '+lastName;
        this.voucherReservationTime = response.data.reservation_for;
        this.voucherReservationSize = response.data.size;

        var peopleId = response.data.Booker.Person.id;
        /** this will get the booker email and phone number using its person_id **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{

        })
        .then(response => {
          console.log(response);
          this.voucherSizeDisable = '1'; /** this will disable dropdown once the voucher email was sent **/

          this.voucherEmail = response.data.email;
          this.voucherPhoneNumber = response.data.phone;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of get for person_id **/

        /**  this will get us the detail for voucher ID used **/
        this.voucherNumberSelected = '3';
        this.voucherCodeGenrated = 'XAH89U';
        this.voucherSendEmailButtonActivate = '1';
        /** end of get voucher detail **/

      })
      .catch(function (error) {
        console.log(error);
      });

      this.$bvModal.show('modal-vouchers');
    },

    noShowsVoucher(event, reservationId){
      console.log(event);
      console.log('reservation id is '+reservationId);

      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{

      })
      .then(response => {
        console.log(response);
        var firstName = response.data.Booker.Person.first_name;
        var lastName = response.data.Booker.Person.last_name;

        if(firstName == null || firstName == 'undefined'){
          var firstName = ' ';
        }
        if(lastName == null || lastName == 'undefined'){
          var lastName = ' ';
        }

        this.voucherReservationName = firstName+' '+lastName;
        this.voucherReservationTime = response.data.reservation_for;
        this.voucherReservationSize = response.data.size;

        var peopleId = response.data.Booker.Person.id;
        /** this will get the booker email and phone number using its person_id **/
        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+peopleId,{

        })
        .then(response => {
          console.log(response);
          this.voucherEmail = response.data.email;
          this.voucherPhoneNumber = response.data.phone;
        })
        .catch(function (error) {
          console.log(error);
        });
        /** end of get for person_id **/

      })
      .catch(function (error) {
        console.log(error);
      });

      this.$bvModal.show('modal-vouchers');
    },

    updateReservationCreated(event,reservationId,updateValue){
      console.log(event);
      console.log(reservationId);
      console.log(updateValue);
      axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
        reservation_cancelled: updateValue
      })
      .then(response => {
        console.log(response);
        // this.reloadPageEvent();
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getDetailByEmail(){
      console.log('inside email function');

      console.log(this.addBookerEmail.length);
      console.log('value' + this.addBookerEmail);

      if(this.addBookerEmail.length > '10'){
        console.log('email used was greater than 10');

        var email = this.addBookerEmail;

        axios.post(process.env.VUE_APP_DATABASE_PEOPLE+'find_or_create/'+email,{

        })
        .then(response => {
          console.log(response);
          console.log(response.data[0].id);

          this.addBookerFirstName = response.data[0].first_name;
          this.addBookerLastName = response.data[0].last_name;
          this.addBookerPhoneNumber = response.data[0].phone;

        })


      }
      else{
        console.log('Email field was empty or less than 10');
      }
    },

    clickedSubmitReservation(){
      console.log('submitted reservation');

      var firstName = this.addBookerFirstName.toLowerCase();
      var lastName = this.addBookerLastName.toLowerCase();
      var phoneNumber = this.addBookerPhoneNumber;
      var bookerEmail = this.addBookerEmail.toLowerCase();
      var mission = this.addBookerMission;
      var teamSize = this.addBookerTeamSize;

      var amPm = this.reservationAmPm;
      if(amPm == 'AM'){
        console.log('AM');
        var b = this.reservationTimeHourly;
      }
      if(amPm == 'PM'){
        console.log( 'PM ');
        var b = parseInt(this.reservationTimeHourly);
        b += 12;
      }

      var reservationDateTime = this.addReservationDate+' '+b+':'+parseInt(this.reservationTimeQuaterly)+':00';
      console.log(reservationDateTime);

      /** find or create person **/
      console.log(firstName);
      console.log(lastName);
      console.log(bookerEmail);

      axios.post(process.env.VUE_APP_DATABASE_PEOPLE+'find_or_create/email/'+bookerEmail+'/first_name/'+firstName+'/last_name/'+lastName,{
        phone: phoneNumber
      })
      .then(response => {
        console.log("Added to people table on url loaded with value");
        console.log(response);
        console.log(response.data[0].id); 

        var peopleId = response.data[0].id;

        /** axios post to PLAYERS TABLE **/
        axios.post(process.env.VUE_APP_DATABASE_PLAYERS+'find_or_create/'+peopleId,{

        })
        .then(response => {
          console.log(response);
          console.log(response.data[0].id);

          var personId = response.data[0].id;

          /** find or create booker **/
            // var xolaBookerId = this.addXolaBookerId;
            var defaultId = 'btbdefaultid'+this.addBookerPhoneNumber;
            var xolaBookerId = defaultId;
            axios.post(process.env.VUE_APP_BOOKERS+'find_or_create/'+xolaBookerId,{
              person_id: peopleId /** this will update people id from people table not person id **/
            })
            .then(response => {
              console.log("Xola Booker Id response below");
              console.log(response);
              

              var bookerId = response.data[0].id;

              /** find or create reservation **/

              // var xolaOrderId = this.addBookerXolaOrderId;
              // var xolaItemId = this.addBookerXolaItemId;
              // var xolaExperienceItemId = this.addBookerXolaTravelerId;
              var xolaOrderId = defaultId;
              var xolaItemId = defaultId;
              var xolaExperienceItemId = defaultId;
              var totalAmount = parseInt(teamSize)*44.95;

              axios.post(process.env.VUE_APP_RESERVATIONS+'find_or_create/xola_order_id/'+xolaOrderId+'/xola_item_id/'+xolaItemId,{
                size: teamSize,
                booker_id: bookerId,
                final_dollar_amount: totalAmount,
                reservation_for: reservationDateTime,
                location_id: 1,
                mission_id: mission,
                experience_item_id: xolaItemId
              })
              .then(response => {
                console.log(response);

                this.reloadPageEvent();

              })
              .catch(function (error) {
                console.log(error);
              });

              /** end of find or create reservation **/


            })
            .catch(function (error) {
              console.log(error);
            });
            /** end of find or create booker **/


          })
        .catch(function (error) {
          console.log(error);
        });
        /** END OF axios post PLAYER detail **/

      })
      .catch(function (error) {
        console.log(error);
      });

      /** end of find or create person **/


    },

    searchPlayers(){
      console.log('san search search');
      console.log(this.searchedText);

      var searchThisText = this.searchedText;
      console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/search/'+searchThisText);

      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/search/'+searchThisText,{

      })
      .then(response => 
      {
        console.log(response);
        this.posts = response.data;

        /** Beginning of ARRIVED counting part **/
        var countPostArray = response.data.length-1;
              // console.log(countPostArray);
              var replyDataObj1 = this.posts;

              console.log(this.posts);

              for(let i=0; i <= countPostArray; i++){

                  // console.log(response.data[i].Reservation_minors.length);

                  var countReservationPeople = replyDataObj1[i].Reservation_people.length;
                  var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
                  var reservationForConvert = replyDataObj1[i].reservation_for;

                  var date = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A MM-DD-YYYY');

                  var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A');

                  console.log(reservationForConvert);
                  console.log(date);
                  console.log(reservationOnlyTime);

                  replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

                  var lateStatus = moment.utc(reservationForConvert).subtract('hours',5).format('HHmm');
                  console.log(lateStatus);

                  var currentTime = moment(response.data.createdAt).subtract('hours',5).format("HHmm");
                  console.log('current time '+currentTime);

                  var lateBy = lateStatus-currentTime;

                  var arrivedPerson = 0;
                  var arrivedNonPlayer = 0;
                  var arrivedPlayer = 0;

                  for(let j=0; j < countReservationPeople; j++){

                    arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

                    /** this will count total non player arrived **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                      arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
                    }

                    /** this will count total player arrived excluding minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                      arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
                    }

                  }

                  var arrivedMinor = 0;
                  var arrivedMinorNonPlayer = 0;
                  var arrivedMinorPlayer = 0;

                  for(let k=0; k < countReservationMinors; k++){

                    arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

                    if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                      arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
                    }

                    /** this will count total player arrived for minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                      arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
                    }

                  }

                  console.log(arrivedPerson+' arrived person');
                  console.log(arrivedMinor+' arrived minor');

                  var arrived = arrivedPerson + arrivedMinor;

                  console.log(arrivedNonPlayer+' arrived non player person');
                  console.log(arrivedMinorNonPlayer+' arrived non player minor');
                  var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
                  console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

                  console.log(arrivedPlayer+' arrived  player person');
                  console.log(arrivedMinorPlayer+' arrived  player minor');
                  var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
                  console.log("TOTAL  PLAYER = "+totalPlayerArrived);

                  // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
                  // console.log(arrived);

                  replyDataObj1[i]['total_arrived']=arrived;


                  replyDataObj1[i]['late_status_time']=lateStatus;
                  replyDataObj1[i]['late_by']=lateBy;
                  replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
                  replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

                  console.log(currentTime);
                  console.log(lateStatus);
                  console.log("ARRIVED VALUE"+arrived);

                  var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
                  replyDataObj1[i]['reservation_id']=reservationId;
                }
                /** END of ARRIVED counting PART **/

              })
.catch(function (error){
  console.log(error);
});

/** this will get us ORGANIZATION TYPE list **/
axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                      // arrived: arrivedValue
                    })
.then(response => 
{
  console.log(response);
  this.organizationTypeList = response.data;
})

.catch(function (error){
  console.log(error);
});
/** END OF organization type list **/
},

onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted;
        // The following will be an empty string until a valid date is entered
        this.selectedReservationDate = ctx.selectedYMD;

        console.log("CHANGED DATE");
        console.log(this.selectedReservationDate);
        console.log(this.formatted);


        /** this will now change the check in list following the date **/

        var starttime='start';
        var endtime='end';

          // var currentdate = moment().format("YYYY-MM-DD");
          var convertDate = this.selectedReservationDate;

          var currentdate = moment(convertDate).format("YYYY-MM-DD");

          console.log(currentdate+ ' was the current date format');

          var startReservationTime = '08:45:00';
          // var endReservationTime = moment().add(1, 'hours').format('HH:mm:ss');
          var endReservationTime = '23:45:00';
          var currentTime = moment().format("HHmm");
          console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime);
          axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'checkin/'+starttime+'/'+currentdate+'T'+startReservationTime+'/'+endtime+'/'+currentdate+'T'+endReservationTime,{

          })
          .then(response => 
          {
            console.log(response);
            this.posts = response.data;

            /** Beginning of ARRIVED counting part **/
            var countPostArray = response.data.length-1;
              // console.log(countPostArray);
              var replyDataObj1 = this.posts;

              console.log(this.posts);

              for(let i=0; i <= countPostArray; i++){

                  // console.log(response.data[i].Reservation_minors.length);

                  var countReservationPeople = replyDataObj1[i].Reservation_people.length;
                  var countReservationMinors = replyDataObj1[i].Reservation_minors.length;
                  var reservationForConvert = replyDataObj1[i].reservation_for;

                  var date = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A MM-DD-YYYY');

                  var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A');

                  console.log(reservationForConvert);
                  console.log(date);
                  console.log(reservationOnlyTime);

                  replyDataObj1[i]['reservation_time']=reservationOnlyTime; /** single data posted to this.posts **/

                  var lateStatus = moment.utc(reservationForConvert).subtract('hours',5).format('HHmm');
                  var lateBy = lateStatus-currentTime;

                  var arrivedPerson = 0;
                  var arrivedNonPlayer = 0;
                  var arrivedPlayer = 0;

                  for(let j=0; j < countReservationPeople; j++){

                    arrivedPerson += replyDataObj1[i].Reservation_people[j].arrived;

                    /** this will count total non player arrived **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1'){
                      arrivedNonPlayer += replyDataObj1[i].Reservation_people[j].non_player;
                    }

                    /** this will count total player arrived excluding minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_people[j].arrived == '1' && replyDataObj1[i].Reservation_people[j].non_player == '0'){
                      arrivedPlayer += replyDataObj1[i].Reservation_people[j].arrived;
                    }

                  }

                  var arrivedMinor = 0;
                  var arrivedMinorNonPlayer = 0;
                  var arrivedMinorPlayer = 0;

                  for(let k=0; k < countReservationMinors; k++){

                    arrivedMinor += replyDataObj1[i].Reservation_minors[k].arrived;

                    if(replyDataObj1[i].Reservation_minors[k].arrived == '1'){
                      arrivedMinorNonPlayer += replyDataObj1[i].Reservation_minors[k].non_player;
                    }

                    /** this will count total player arrived for minors for non-player 0 as false **/
                    if(replyDataObj1[i].Reservation_minors[k].arrived == '1' && replyDataObj1[i].Reservation_minors[k].non_player == '0'){
                      arrivedMinorPlayer += replyDataObj1[i].Reservation_minors[k].arrived;
                    }

                  }

                  console.log(arrivedPerson+' arrived person');
                  console.log(arrivedMinor+' arrived minor');

                  var arrived = arrivedPerson + arrivedMinor;

                  console.log(arrivedNonPlayer+' arrived non player person');
                  console.log(arrivedMinorNonPlayer+' arrived non player minor');
                  var totalNonPlayerArrived = arrivedNonPlayer + arrivedMinorNonPlayer;
                  console.log("TOTAL NON PLAYER = "+totalNonPlayerArrived);

                  console.log(arrivedPlayer+' arrived  player person');
                  console.log(arrivedMinorPlayer+' arrived  player minor');
                  var totalPlayerArrived = arrivedPlayer + arrivedMinorPlayer;
                  console.log("TOTAL  PLAYER = "+totalPlayerArrived);

                  // var arrived = replyDataObj1[i].Reservation_minors.length+replyDataObj1[i].Reservation_people.length;
                  // console.log(arrived);

                  replyDataObj1[i]['total_arrived']=arrived;


                  replyDataObj1[i]['late_status_time']=lateStatus;
                  replyDataObj1[i]['late_by']=lateBy;
                  replyDataObj1[i]['total_non_player_arrived']=totalNonPlayerArrived;
                  replyDataObj1[i]['total_player_arrived']=totalPlayerArrived;

                  console.log(currentTime);
                  console.log(lateStatus);
                  console.log("ARRIVED VALUE"+arrived);

                  var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
                  replyDataObj1[i]['reservation_id']=reservationId;
                }
                /** END of ARRIVED counting PART **/

              })
.catch(function (error){
  console.log(error);
});

/** this will get us ORGANIZATION TYPE list **/
axios.get(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
                      // arrived: arrivedValue
                    })
.then(response => 
{
  console.log(response);
  this.organizationTypeList = response.data;
})

.catch(function (error){
  console.log(error);
});
/** END OF organization type list **/


/** end of changing reservation date **/ 


},

    // dateDisabled(ymd, date) {
    //     const weekday = date.getDay();
    //     const day = date.getDate();
    //     return weekday === 0 || weekday === 6 || day === 13;
    //   },

    organizationnNameUpdate: function(event, organizationNameTyped){
      console.log("Inside add organization name");
      console.log(event);
      var orgName = organizationNameTyped.toLowerCase().trim();
      // console.log('org name lower case '+orgName);

      var reservationId = this.reservationIdForOrganization;
      var orgTypeName = this.organizationTypeSelected;

      console.log('organization type id '+ orgTypeName);

      console.log(orgName.length);

      if(orgName.length > '1'){
        console.log('yes greater than 1');

        if(orgTypeName == 'createNewOrganization'){ /** if they click on create new input field for organization type **/
          var orgTypeName = this.organizationTypeSelectedNew;
          console.log('Org Type Name was '+orgTypeName);
          axios.post(process.env.VUE_APP_DTB_ORGANIZATION_TYPE,{
            name: orgTypeName
          })
          .then(response => {
            console.log(response);
            console.log(response.data.id);
            this.newOrganizationTypeId = response.data.id;
          })
          .catch(function (error) {
            console.log(error);
          });

            // var orgName = this.newOrganizationTypeId;
          }
          else{
            this.newOrganizationTypeId = this.organizationTypeSelected;
            console.log('Old Organication Type '+ this.newOrganizationTypeId);
          }

          console.log('Organization ID '+this.newOrganizationTypeId);

          /** this will give the ORGANIZATION ID **/
          axios.post(process.env.VUE_APP_DTB_ORGANIZATION+'/find_or_create/organization_name/'+orgName,{
                // arrived: arrivedValue
                organization_type_id: this.newOrganizationTypeId
              })

          .then(response => 
          {
            console.log(response);
            console.log(response.data);
            console.log(response.data[0].id);

            var organizationId = response.data[0].id;

            /** NOW UPDATE ORGANIZATION ID on RESERVATION ID **/
            axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
              organization_id: organizationId
            })
            .then(response => {
              console.log(response);

              window.location.reload(true);

            })
            .catch(function (error) {
              console.log(error);
            });
            /** END OF UPDATE of ORGANIZATION ID on RESERVATION ID **/

          })
          .catch(function (error) {
            console.log(error);
          });
          /** END OF ORGANIZATION ID **/

        }

        else{
          console.log('null organization name');
        }




      },

      reloadPageEvent: function(){
        console.log("INSIDE RELOAD FUNCTION");
        window.location.reload(true);
      },

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

      teamReleasedCheckbox(event, reservation_id){

        console.log(event);
        console.log(reservation_id);

        if(event.target.checked == true){
          var realeasedValue = '1';
        }
        if(event.target.checked == false){
          var realeasedValue = '0';
        }

        console.log(realeasedValue);

        console.log(process.env.VUE_APP_DATABASE_RESERVATIONS+reservation_id);
        axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservation_id,{
          released: realeasedValue
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      },

      arrivedCheckbox(event, res_people_or_minor_table_id, minor_tag){
        console.log(event);
        console.log(res_people_or_minor_table_id);
        console.log(minor_tag);
      // console.log(value);

      console.log(event.target.checked);

      if(event.target.checked == true){
        var arrivedValue = '1';
      }
      if(event.target.checked == false){
        var arrivedValue = '0';
      }

      console.log(arrivedValue);

      var reservation_table_id = res_people_or_minor_table_id;
      if(minor_tag == 'M'){
        console.log('YES MINOR'+arrivedValue);
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservation_table_id,{
          arrived: arrivedValue
        })

        .then(response => 
        {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      else{
        console.log('NOT MINOR'+arrivedValue);
        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id);
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id,{
          arrived: arrivedValue
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },

    updateReservationSession(event, res_people_or_minor_table_id, minor_tag){
      console.log(event);
      console.log(res_people_or_minor_table_id);
      console.log(minor_tag);
      console.log(event.target.checked);

      if(minor_tag == 'M'){
        console.log('Minors as player');
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+res_people_or_minor_table_id,{
          session_id: 0
        })

        .then(response => 
        {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      else{
        console.log('Player not minor');

        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+res_people_or_minor_table_id,{
          session_id: 0
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    },

    nonPlayerCheckbox(event, res_people_or_minor_table_id, minor_tag){
      console.log(event);
      console.log(res_people_or_minor_table_id);
      console.log(minor_tag);
      // console.log(value);

      console.log(event.target.checked);

      if(event.target.checked == true){
        var non_player_value = '0';
      }
      if(event.target.checked == false){
        var non_player_value = '1';
      }

      console.log(non_player_value);

      var reservation_table_id = res_people_or_minor_table_id;
      if(minor_tag == 'M'){
        console.log('YES MINOR'+non_player_value);
        axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/'+reservation_table_id,{
          non_player: non_player_value
        })

        .then(response => 
        {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      else{
        console.log('NOT MINOR'+non_player_value);
        console.log(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id);
        axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/'+reservation_table_id,{
          non_player: non_player_value
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
    selectItem (event, posts, item, index) {

      console.log(event);
      console.log(posts);
      console.log(item);
      console.log(index);

      if(this.posts[index].Booker.Person.last_name == 'undefined'){
        var bookerLastName = ' ';
      }
      else{
        var bookerLastName = this.posts[index].Booker.Person.last_name;
      }


      if(this.posts[index].Booker.Person.first_name == 'undefined'){
       var bookerFirstName = ' ';
     }
     else{
      var bookerFirstName = this.posts[index].Booker.Person.first_name;
    }


    if(this.posts[index].Mission.name == 'undefined'){
     var missionName = ' ';
   }
   else{
    var missionName = this.posts[index].Mission.name;
  }


  if(this.posts[index].reservation_for == 'undefined'){
    var date = ' ';
  }
  else{
    var date = this.posts[index].reservation_for;
  }


  if(this.posts[index].size == 'undefined'){
    var teamSizeItem = ' ';
  }
  else{
    var teamSizeItem = this.posts[index].size;
  }


  var bookerName = bookerFirstName+' '+bookerLastName;
      // var missionName = this.posts[index].Mission.name;
      // var teamSizeItem = this.posts[index].size;
      
      /** conversion of date and time for second part **/
        // var date = this.posts[index].reservation_for;

        var reservation_for_converted = moment.utc(date).subtract('hours',5).format('hh:mm A MM-DD-YYYY');
        var onlyDate = moment.utc(date).format('MM-DD-YYYY');
        var timeConverted = moment.utc(date).subtract('hours',5).format('hh:mm A');

        console.log(reservation_for_converted);
        console.log(index);
        console.log(this.posts[index]);

        // var arr = reservation_for.split("T");
        // var onlyDate = arr.splice(0,1).join("");
        // console.log(onlyDate);

        // var onlyTime = arr.join("T");
        // console.log(onlyTime);

        // var twoDigits = onlyTime.substring(0, 2);
        // console.log(twoDigits);
        // var time1 = twoDigits-4;
        // console.log(time1);

        // var time2 = time1-12;
        // console.log(time2);

        // if(time1 >= 12){
        //   console.log("PM");
        //   var ampm = "PM";
        // }
        // else{
        //   console.log("AM");
        //   var ampm = "AM";
        // }

        // var posNegTime = Math.abs(time1);
        // var onlyTime = arr.join("T");
        // var twoDigits = onlyTime.substring(3, 5);
        // console.log(twoDigits);

        // var timeConverted = posNegTime+':'+twoDigits+' '+ampm;
        // var timeConvertedWithoutAMPM = posNegTime+':'+twoDigits;
        // console.log(timeConverted);
        /** end of date and time converted for second part **/


        /** create object which grabs both MINOR and NON-MINOR in the same column **/

        if(this.posts[index].Reservation_people[0].loop_value == undefined){
        // console.log("undefined cha hai");
        var countReservationPeople = this.posts[index].Reservation_people.length;
        console.log(countReservationPeople);

        var replyDataObj1 = item;
        for(let i=0; i < countReservationPeople; i++){

          console.log(i);
        // console.log(item);
        // console.log(this.posts[index].Reservation_people);
        // console.log(this.posts[index].Reservation_people[i]);
        // console.log(this.posts[index].Reservation_people[i].Person.first_name);



        if(this.posts[index].Reservation_people[i].Person.Player.bomb_beater == 'undefined'){
          var bomb_beater = '0';
        }
        else{
          var bomb_beater = this.posts[index].Reservation_people[i].Person.Player.bomb_beater;
        }

        /** below code is for the REPEATERS **/
        if(this.posts[index].Reservation_people[i].Person.Player.play_count == 'undefined'){
          var repeated_players = '0';
        }
        else{
          var repeated_players = this.posts[index].Reservation_people[i].Person.Player.play_count;
        }



        if(this.posts[index].Reservation_people[i].Person.first_name == 'undefined'){
          var player_first_name = ' ';
        }
        else{
          var player_first_name = this.posts[index].Reservation_people[i].Person.first_name;
        }

        if(this.posts[index].Reservation_people[i].Person.last_name == 'undefined'){
          var player_last_name = ' ';
        }
        else{
          var player_last_name = this.posts[index].Reservation_people[i].Person.last_name;
        }

        if(this.posts[index].Reservation_people[i].Person.phone == 'undefined'){
          var player_cell_number = ' ';
        }
        else{
          var player_cell_number = this.posts[index].Reservation_people[i].Person.phone;
        }

        if(this.posts[index].Reservation_people[i].Person.id == 'undefined'){
          var player_person_id = ' ';
        }
        else{
          var player_person_id = this.posts[index].Reservation_people[i].Person.id;
        }

        if(this.posts[index].Mission.name == 'undefined'){
          var missionName = ' ';
        }
        else{
          var missionName = this.posts[index].Mission.name;
        }

        if(this.posts[index].Mission.id == 'undefined'){
          var missionId = ' ';
        }
        else{
          var missionId = this.posts[index].Mission.id;
        }


        if(this.posts[index].Reservation_people[i].arrived == 'undefined'){
          var arrived = ' ';
        }
        else{
          var arrived = this.posts[index].Reservation_people[i].arrived;
        }


        if(this.posts[index].Reservation_people[i].non_player == 'undefined'){
          var non_player_value = ' ';
        }
        else{
          var non_player_value = this.posts[index].Reservation_people[i].non_player;
        }


        if(this.posts[index].Reservation_people[i].id == 'undefined'){
          var reservation_people_minor_table_id = ' ';
          var reservation_people_minor_only_id = ' ';
        }
        else{
          var reservation_people_minor_table_id = this.posts[index].Reservation_people[i].id;
          var reservation_people_minor_only_id = ' ';
        }

        // console.log(this.posts[index].Reservation_people[i].session_id);

        if(this.posts[index].Reservation_people[i].session_id == 'undefined'){
          var reservation_people_session_id = ' ';
        }
        else{
          var reservation_people_session_id = this.posts[index].Reservation_people[i].session_id;
        }


        // var player_first_name = this.posts[index].Reservation_people[i].Person.first_name;
        // var player_last_name = this.posts[index].Reservation_people[i].Person.last_name;
        // var player_cell_number = this.posts[index].Reservation_people[i].Person.phone;
        var player_full_name = player_first_name+' '+player_last_name;

        // var player_person_id = this.posts[index].Reservation_people[i].Person.id;

        // var missionName = this.posts[index].Mission.name;
        // var missionId = this.posts[index].Mission.id;

        // var arrived = this.posts[index].Reservation_people[i].arrived;
        // var non_player_value = this.posts[index].Reservation_people[i].non_player;

        // var reservation_people_minor_table_id = this.posts[index].Reservation_people[i].id;
        var reservation_for = reservation_for_converted;
        console.log(player_full_name);
        console.log(player_person_id);
        // var booker_id = response.data[i].Booker.Person.id;
        // var objectValue = i++;
        console.log(i);
            // var namebana = 'NameMe';

            replyDataObj1['Reservation_people'][i]={
              "person_id": player_person_id,
              // "player_id": player_id,
              "reservation_people_minor_table_id": reservation_people_minor_table_id,
              "player_first_name": player_first_name,
              "player_last_name": player_last_name,
              "player_full_name": player_full_name,
              "player_cell_number": player_cell_number,
              "minor_tag": "",
              // "play_count": playCount,
              "mission_name": missionName,
              "mission_id": missionId,
              "loop_value": 1,
              "arrived": arrived,
              "reservation_for": reservation_for,
              "non_player": non_player_value,
              "reservation_session_id": reservation_people_session_id,
              "player_bomb_beater_status": bomb_beater,
              "player_repeaters": repeated_players
            }

            this.clickedPlayerList = replyDataObj1;
            console.log(replyDataObj1);

            this.personPhoneNumber = player_cell_number;
            // if(this.posts[index].Reseservation_people)

          }

          

          console.log(this.clickedPlayerList.Reservation_people.length);
          var replyDataObj1 = item;
          var reservationPeopleLength = this.clickedPlayerList.Reservation_people.length;
          var countReservationMinor = this.posts[index].Reservation_minors.length;
          console.log(countReservationMinor);

          for(let i=0; i < countReservationMinor; i++){

            console.log(item);
            var nonMinorPhone = this.personPhoneNumber;



            // console.log(this.posts[index].Reservation_minors[i].Player_minor.bomb_beater);

            if(this.posts[index].Reservation_minors[i].Player_minor.bomb_beater == 'undefined'){
              var minor_bomb_beater = 0;
            }
            else{
              var minor_bomb_beater = this.posts[index].Reservation_minors[i].Player_minor.bomb_beater;
            }




            if(this.posts[index].Reservation_minors[i].Player_minor.first_name == 'undefined'){
              var minor_first_name = ' ';
            }
            else{
              var minor_first_name = this.posts[index].Reservation_minors[i].Player_minor.first_name;
            }


            if(this.posts[index].Reservation_minors[i].Player_minor.last_name == 'undefined'){
              var minor_last_name = ' ';
            }
            else{
              var minor_last_name = this.posts[index].Reservation_minors[i].Player_minor.last_name;
            }


            if(this.posts[index].Reservation_minors[i].Player_minor.id == 'undefined'){
              var minor_person_id = ' ';
            }
            else{
              var minor_person_id = this.posts[index].Reservation_minors[i].Player_minor.id;
            }


            if(this.posts[index].Reservation_minors[i].Player_minor.player_id == 'undefined'){
              var minor_player_id = ' ';
            }
            else{
              var minor_player_id = this.posts[index].Reservation_minors[i].Player_minor.player_id;
            }


            if(this.posts[index].Mission.name == 'undefined'){
              var missionName = ' ';
            }
            else{
              var missionName = this.posts[index].Mission.name;
            }


            if(this.posts[index].Mission.id == 'undefined'){
              var missionId = ' ';
            }
            else{
              var missionId = this.posts[index].Mission.id;
            }


            if(this.posts[index].Reservation_minors[i].arrived == 'undefined'){
              var minorArrived = ' ';
            }
            else{
              var minorArrived = this.posts[index].Reservation_minors[i].arrived;
            }


            if(this.posts[index].Reservation_minors[i].non_player == 'undefined'){
              var non_player_minor_value = ' ';
            }
            else{
              var non_player_minor_value = this.posts[index].Reservation_minors[i].non_player;
            }


            if(this.posts[index].Reservation_minors[i].id == 'undefined'){
              var reservation_people_minor_table_id = ' ';
            }
            else{
              var reservation_people_minor_table_id = this.posts[index].Reservation_minors[i].id;
            }

            console.log(this.posts[index].Reservation_minors[i]);

            if(this.posts[index].Reservation_minors[i].session_id == 'undefined'){
              var reservation_people_session_id = ' ';
            }
            else{
              var reservation_people_session_id = this.posts[index].Reservation_minors[i].session_id;
            }


            // var minor_first_name = this.posts[index].Reservation_minors[i].Player_minor.first_name;
            // var minor_last_name = this.posts[index].Reservation_minors[i].Player_minor.last_name;
            var player_cell_number = nonMinorPhone;
            var minor_full_name = minor_first_name+' '+minor_last_name;
            // var minor_person_id = this.posts[index].Reservation_minors[i].Player_minor.id;
            // var minor_player_id = this.posts[index].Reservation_minors[i].Player_minor.player_id;
            // var missionName = this.posts[index].Mission.name;
            // var missionId = this.posts[index].Mission.id;
            // var minorArrived = this.posts[index].Reservation_minors[i].arrived;
            // var non_player_minor_value = this.posts[index].Reservation_minors[i].non_player;
            // var reservation_people_minor_table_id = this.posts[index].Reservation_minors[i].id;
            var reservation_for = reservation_for_converted;

            console.log(i);
            
            console.log(minorArrived);
            console.log(this.posts[index].Reservation_minors);

            var objectValue = reservationPeopleLength + i;
            console.log(objectValue);

            replyDataObj1['Reservation_people'][objectValue]={
              "person_id": minor_person_id,
              "player_id": minor_player_id,
              "reservation_people_minor_table_id": reservation_people_minor_table_id,
              "player_first_name": minor_first_name,
              "player_last_name": minor_last_name,
              "player_full_name": minor_full_name,
              "player_cell_number": player_cell_number,
              "minor_tag": "M",
              "play_count": "1",
              "mission_name": missionName,
              "mission_id": missionId,
              "arrived": minorArrived,
              "reservation_for": reservation_for,
              "non_player": non_player_minor_value,
              "reservation_session_id": reservation_people_session_id,
              "player_bomb_beater_status": minor_bomb_beater
            }

            // this.clickedPlayerList = replyDataObj1;
            // console.log(replyDataObj1);

          }

        }

        /** end of MINOR and NON-MINOR same column **/


        this.selectedCustomerName = bookerName;
        this.selectedDate = onlyDate;
        this.selectedTime = timeConverted;
        this.mission_name = missionName;
        this.teamSize = teamSizeItem;

        console.log(bookerName);
      // console.log(reservation_for);
      // this.selectedCustomerName = 
      // console.log(this.posts);
      // this.selectedCustomerName = posts.customerName /*this.selectedCustomerName pass the value to data return() */
      // var bookerName = this.selectedCustomerName
      this.$bvModal.show('modal-xl');

      /** this function should reload the page **/
      
      /** end of reload function **/

    },

    addOrganization(event, index) {

      console.log("event "+event+" index "+ index);

      console.log(this.posts[index]);

      var reservationIdForOrganization = this.posts[index].reservation_id;

      console.log(reservationIdForOrganization);

      this.reservationIdForOrganization = reservationIdForOrganization;

      axios.get(process.env.VUE_APP_DTB_ORGANIZATION,{

      })
      .then(response => 
      {
        console.log(response);
        this.organizationNameList = response.data;
      }
      )
      .catch(function (error){
        console.log(error);
      });

      console.log("inside add organization");

      this.$bvModal.show('modal-organization');

    },


    addReservation(){
      console.log('Add Reservation Bruh');
      this.$bvModal.show('modal-addReservation');
    },

    updateReservation(){

      console.log(this.dateClicked);
      var currentdate = this.dateClicked;
      var startReservationtime = '08:45:00';
      var endResevationtime = '23:50:00';

      axios.get(process.env.VUE_APP_DATABASE_RESERVATIONS+'getall_checkin/start/'+currentdate+'T'+startReservationtime+'/end/'+currentdate+'T'+endResevationtime,{

      })
      .then(response => 
      {
        console.log(response);

        console.log(response);
        this.getAllReservationList = response.data;

        /** Beginning of ARRIVED counting part **/
        var countPostArray = response.data.length-1;
        // console.log(countPostArray);
        var replyDataObj1 = this.getAllReservationList;

        console.log(this.getAllReservationList);

        for(let i=0; i <= countPostArray; i++){

            // console.log(response.data[i].Reservation_minors.length);

            
            var reservationForConvert = replyDataObj1[i].reservation_for;
            var date = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A MM-DD-YYYY');
            var reservationOnlyTime = moment.utc(reservationForConvert).subtract('hours',5).format('hh:mm A');

            console.log(reservationForConvert);
            console.log(date);
            console.log(reservationOnlyTime);

            var reservationId = replyDataObj1[i].id; /** id is the reservation id **/
            replyDataObj1[i]['reservation_id']=reservationId;
            replyDataObj1[i]['reservation_time']=reservationOnlyTime;
          }
          /** END of ARRIVED counting PART **/

        })
      .catch(function (error){
        console.log(error);
      });

      this.$bvModal.show('modal-updateReservation');

    },

    hideUpdateReservationModal(){
      this.$bvModal.hide('modal-updateReservation');
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

#modal-xl___BV_modal_footer_{
  display: none;
}

#modal-organization___BV_modal_footer_{
  display: none;
}

#modal-addReservation___BV_modal_footer_{
  display: none;
}

#modalScrollable{
  height: 500px;
  overflow-y: auto;
  /*background-color: red;*/
}

.tdStyle{
  text-align:left;font-weight: bold;
}

.theadStyle{
  font-weight:bold;font-size: 19px; margin:auto;
}

#chart {
  max-width: 650px;
  margin: 35px auto;
}


</style>
