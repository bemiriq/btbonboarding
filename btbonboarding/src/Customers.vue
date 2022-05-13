<template>
  <div id="usersapp" style="width: 80%; margin:auto;">


    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true" title="Message">
      Updating data and reloading the page.
    </b-modal>
    
    <b-modal id="modal-passwordDetails" centered size="md" v-bind:hide-footer="true" title="Log-in">
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

    </b-modal>

    <b-modal id="modal-updateCustomerDetail" centered size="md" v-bind:hide-footer="true" title="Profile Update">
      <table class="table">
        <tr>
          <th>First Name</th>
          <td>
            <b-form-input type="text" v-model="customerFirstName" placeholder="Update customer first name">{{customerFirstName}}</b-form-input>
          </td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>
            <b-form-input type="text" v-model="customerLastName" placeholder="Update customer last name">{{customerLastName}}</b-form-input>
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <b-form-input type="text" v-model="customerEmail" placeholder="Update customer email" @input="validateCustomerEmail()">{{customerEmail}}</b-form-input>
          </td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>
            <b-form-input type="text" v-model="customerPhone" placeholder="Update customer phone" @input="klaviyoSmsConsent()">{{customerPhone}}</b-form-input>
          </td>
        </tr>
        <tr>
          <th>Instagram</th>
          <td>
            <b-form-input type="text" v-model="customerInstagram" placeholder="Update customer instagram">{{customerInstagram}}</b-form-input>
          </td>
        </tr>

        <tr>
          <th>Zip Code</th>
          <td>
            <b-form-input type="text" v-model="customerZipCode" placeholder="Update customer zipcode">{{customerZipCode}}</b-form-input>
          </td>
        </tr>

        <tr>
          <th>Date of Birth</th>
          <td>
            <b-form-input type="date" format="MM-DD-YYYY" v-model="customerDateOfBirth" placeholder="Update customer date of birth">{{customerDateOfBirth}}</b-form-input>
          </td>
        </tr>

        <tr>
          <td>
            <button type="button" class="btn btn-primary" v-on:click="submitCustomerDetail()" style="margin-left:1%;margin-top:5%;" v-if="validatePhone == true && validateEmail == true ">Submit</button>
            <button type="button" class="btn btn-primary" v-on:click="submitCustomerDetail()" style="margin-left:1%;margin-top:5%;" v-else disabled>Submit</button>
            <button type="button" class="btn btn-info" v-on:click="cancelCustomerDetail()" style="margin-left:5%;margin-top:5%;">Cancel</button>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </b-modal>



    <div>
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social">Team Summary</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>



        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa;">

          <div style="margin-top: 2%;">
            <p style="font-size: 1.5rem; margin-left:-5%;">Customer Details</p>
          </div>
          <hr>
          <b-row style="margin-top: 2%;">
            <b-col lg="2">
              <p style="margin-top: 3%; font-size: 1.1em;"><b>Date Played</b></p>
            </b-col>

            <b-col lg="2">
              <b-input-group class="mb-1">

                <b-form-input
                id="example-input"
                v-model="dateClicked"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
                ></b-form-input>

                <b-input-group-append>
                  <b-form-datepicker
                  v-model="dateClicked"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="example-input"
                  v-on:input="onContext(dateClicked)"
                  ></b-form-datepicker>
                </b-input-group-append>

              </b-input-group>
            </b-col>

            <b-col lg="4">
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="right"></b-pagination>
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

          </b-row>

          <br>

         <!--  <div>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="right"></b-pagination>
          </div> -->
          <b-col>
            <!-- opended pagination div -->
            <div class="overflow-auto">
              <b-table id="my-table" :items="posts" :per-page="perPage" :current-page="currentPage" medium :fields="fields" style="text-align:left;">

                <template #cell(fullName)="data">
                  <span style="text-transform:capitalize;">{{data.item.fullName}}</span>
                </template>

                <template #cell(update)="data">
                  <button type="button" class="btn btn-info" v-on:click="customerClicked(data.item.id)">Edit</button>
                </template>


              </b-table>
            </div>
            <!-- end of pagination div -->
          </b-col>

        </b-col>
        <!-- end of right div which all table -->
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
<script>
moment().format();  
</script>


<script src="vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';

import vSelect from "vue-select";

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // ChildComponent
    vSelect
  },

  data(){
    return{
      posts:[],
      dateClicked:'',
      searchedText:'',
      startDateUsed:'',
      endDateUsed:'',
      searchedText: '',
      perPage: 20,
      currentPage: 1,
      fields:['fullName','instagram','email','phone','Update'],
      searchedText:'',
      updateCustomerDetail:[],
      dateClicked:'',
      
      /** password detail **/
      passwordDetail:'',
      incorrectPassword:'',
      correctPassword:'',
      loginPage:'1',
      emptyPassword:'',
      security:'btbsiteops2017',
      /** end of password protection **/

      /** customer details update **/
      customerFirstName:'',
      customerLastName:'',
      customerEmail:'',
      customerPhone:'',
      customerInstagram:'',
      customerId:'',
      customerZipCode:'',
      customerDateOfBirth: '',
      /** end of customer details update **/

      /** load data by selecting date **/
      loadingBar:'',
      formatted:'',
      /** end of load data by date objects **/

      /** phone and email validation **/
      validatePhone:true,
      validateEmail:true,
      /** end of phone and email validation **/

    }
  },

  mounted: function(){
    console.log('san');
    // this.startDateUsed = moment().subtract(37,'days').format('YYYY-MM-DD');
    // this.endDateUsed = moment().subtract(36,'days').format('YYYY-MM-DD');
    console.log(this.startDateUsed);
    console.log(this.endDateUsed);

    // this.dateClicked = this.startDateUsed;
    this.dateClicked = moment().format('YYYY-MM-DD');
    this.startDateUsed = this.dateClicked;
    this.endDateUsed = moment(this.dateClicked).add(1,'days').format('YYYY-MM-DD');

    console.log(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+this.startDateUsed+'/end/'+this.endDateUsed);
    axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

    })
    .then(response => 
    {
      console.log(response);
      // var posts = [];
      for (var i = 0; i < response.data.length; i++) {

        if(response.data[i].first_name == null || response.data[i].first_name == 'undefined'){
          var first_name = '';
        }
        else{
          var first_name = response.data[i].first_name;
        }

        if(response.data[i].last_name == null || response.data[i].last_name == 'undefined'){
          var last_name = '';
        }
        else{
          var last_name = response.data[i].last_name;
        }

        if(response.data[i].email == null || response.data[i].email == 'undefined'){
          var email = 'N/A';
        }
        else{
          var email = response.data[i].email;
        }

        if(response.data[i].instagram == null || response.data[i].instagram == 'undefined'){
          var instagram = 'N/A';
        }
        else{
          var instagram = response.data[i].instagram;
        }

        if(response.data[i].phone == null || response.data[i].phone == 'undefined'){
          var phone = 'N/A';
        }
        else{
          var phone = response.data[i].phone;
        }

        var fullName = first_name+' '+last_name;
        var id = response.data[i].id;

        // console.log(fullName);
        var customerDetails = {
          "fullName":fullName,
          "first_name":first_name,
          "last_name":last_name,
          "instagram":instagram,
          "email": email,
          "phone":phone,
          "id":id,
        }

        this.posts.push(customerDetails);

      }

    })
    .catch(function (error) {
      console.log(error);
    });
    this.onContext();
  },

  computed: {
    rows() {
      return this.posts.length
    },
  }, 


  methods:{

    submitCustomerDetail(){
      console.log('submit customer');
      console.log(process.env.VUE_APP_DATABASE_PEOPLE+this.customerId);
      axios.put(process.env.VUE_APP_DATABASE_PEOPLE+this.customerId,{
        first_name: this.customerFirstName,
        last_name: this.customerLastName,
        instagram: this.customerInstagram,
        email: this.customerEmail,
        phone: this.customerPhone,
        postal_code: this.customerZipCode,
        date_of_birth: this.customerDateOfBirth
      })
      .then(response => 
      {
        console.log(response);
        this.$bvModal.hide('modal-updateCustomerDetail');
        this.$bvModal.show('modal-success');
        this.reloadFuntion();
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
          // this.passwordDetail='';

          axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'clicked_people_id/'+this.customerId,{

          })
          .then(response => 
          {
            console.log(response);
            this.customerFirstName = response.data[0].first_name;
            this.customerLastName = response.data[0].last_name;
            this.customerPhone = response.data[0].phone;
            this.customerEmail = response.data[0].email;
            this.customerInstagram = response.data[0].instagram;
            this.customerId = response.data[0].id;
            this.customerZipCode = response.data[0].postal_code;
            this.customerDateOfBirth = response.data[0].date_of_birth;


            this.updateCustomerDetail = response.data;
            
            this.$bvModal.hide('modal-passwordDetails');            
            this.$bvModal.show('modal-updateCustomerDetail');
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        else{
          this.passwordDetail='';
          this.loginPage = '1';
          this.incorrectPassword = '1';
          console.log('incorrect password ');
        }
      }
    }
  },

  reloadFuntion(){
    setTimeout(function(){
     window.location.reload(true);
   }, 2500);
  },

  klaviyoSmsConsent: function(){

    console.log('inside klaviyoSmsConsent');
    // console.log(this.phoneCheckbox);

    // var z = phone(this.customerPhone, {country: 'USA'}); /** formats the value got from npm package phone as +18173602704 **/

    if(!/^[0-9]+$/.test(this.customerPhone)){
      console.log('alphabet');
      this.validatePhone = false;
    }
    else{
      console.log('no alphabet');
      this.validatePhone = true;

      if(this.customerPhone.length > 9){
        this.validatePhone = true;
        console.log('valid number');
      }
      else{
        this.validatePhone = false;
      }
    }
  },

  validateCustomerEmail(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.customerEmail.match(mailformat))
    {
      // this.validateEmail = true;
      if(this.customerEmail.length > '10'){
        console.log('email > 9');
        this.validateEmail = true;
      }
      else{
        console.log('email < 9');
        this.validateEmail = false;
      }
    }
    else
    {
      console.log('invalid email');
      this.validateEmail = false;
    }
  },

  cancelCustomerDetail(){
    console.log('cancel customer');
    this.$bvModal.hide('modal-updateCustomerDetail');
  },

  customerClicked(peopleId){
    this.customerId = peopleId;
    this.$bvModal.show('modal-passwordDetails');

    if(this.passwordDetail == this.security){
      console.log('password already set');

      axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'clicked_people_id/'+this.customerId,{

      })
      .then(response => 
      {
        console.log(response);
        this.customerFirstName = response.data[0].first_name;
        this.customerLastName = response.data[0].last_name;
        this.customerPhone = response.data[0].phone;
        this.customerEmail = response.data[0].email;
        this.customerInstagram = response.data[0].instagram;
        this.customerId = response.data[0].id;
        this.customerZipCode = response.data[0].postal_code;
        this.customerDateOfBirth = response.data[0].date_of_birth;



        this.updateCustomerDetail = response.data;

        this.$bvModal.hide('modal-passwordDetails');            
        this.$bvModal.show('modal-updateCustomerDetail');
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  },

  searchPlayers(){
    console.log(this.searchedText);
    // this.startDateUsed = '';
    // this.endDateUsed = '';
    // this.dateClicked = '';

    axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'searchText/'+this.searchedText,{

    })
    .then(response => 
    {
      console.log(response);
      this.posts = [];
      for (var i = 0; i < response.data.length; i++) {

        if(response.data[i].first_name == null || response.data[i].first_name == 'undefined'){
          var first_name = '';
        }
        else{
          var first_name = response.data[i].first_name;
        }

        if(response.data[i].last_name == null || response.data[i].last_name == 'undefined'){
          var last_name = '';
        }
        else{
          var last_name = response.data[i].last_name;
        }

        if(response.data[i].email == null || response.data[i].email == 'undefined'){
          var email = 'N/A';
        }
        else{
          var email = response.data[i].email;
        }

        if(response.data[i].instagram == null || response.data[i].instagram == 'undefined'){
          var instagram = 'N/A';
        }
        else{
          var instagram = response.data[i].instagram;
        }

        if(response.data[i].phone == null || response.data[i].phone == 'undefined'){
          var phone = 'N/A';
        }
        else{
          var phone = response.data[i].phone;
        }

        var fullName = first_name+' '+last_name;
        var id = response.data[i].id;

        // console.log(fullName);
        var customerDetails = {
          "fullName":fullName,
          "first_name":first_name,
          "last_name":last_name,
          "instagram":instagram,
          "email": email,
          "phone":phone,
          "id":id,
        }

        this.posts.push(customerDetails);

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  onContext(ctx) {

    // console.log('play count was '+this.searchedPersonId[0].play_count);

    this.loadingBar = '1';

        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted;
        // The following will be an empty string until a valid date is entered
        // this.startDateUsed = ctx.selectedYMD;

        console.log("CHANGED DATE");
        console.log(this.dateClicked);
        console.log(this.formatted);

        this.startDateUsed = this.dateClicked;
        this.endDateUsed = moment(this.dateClicked).add(1,'days').format('YYYY-MM-DD');

        this.posts = []; /** if it contained any value it will remove it first **/
        this.searchedText = '';

        console.log(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+this.startDateUsed+'/end/'+this.endDateUsed);

        axios.get(process.env.VUE_APP_DATABASE_PEOPLE+'playersDetail/start/'+this.startDateUsed+'/end/'+this.endDateUsed,{

        })
        .then(response => 
        {
          console.log(response);
      // var posts = [];
      for (var i = 0; i < response.data.length; i++) {

        if(response.data[i].first_name == null || response.data[i].first_name == 'undefined'){
          var first_name = '';
        }
        else{
          var first_name = response.data[i].first_name;
        }

        if(response.data[i].last_name == null || response.data[i].last_name == 'undefined'){
          var last_name = '';
        }
        else{
          var last_name = response.data[i].last_name;
        }

        if(response.data[i].email == null || response.data[i].email == 'undefined'){
          var email = 'N/A';
        }
        else{
          var email = response.data[i].email;
        }

        if(response.data[i].instagram == null || response.data[i].instagram == 'undefined'){
          var instagram = 'N/A';
        }
        else{
          var instagram = response.data[i].instagram;
        }

        if(response.data[i].phone == null || response.data[i].phone == 'undefined'){
          var phone = 'N/A';
        }
        else{
          var phone = response.data[i].phone;
        }

        var fullName = first_name+' '+last_name;
        var id = response.data[i].id;

        // console.log(fullName);
        var customerDetails = {
          "fullName":fullName,
          "first_name":first_name,
          "last_name":last_name,
          "instagram":instagram,
          "email": email,
          "phone":phone,
          "id":id,
        }

        this.posts.push(customerDetails);

        if(i+1 == response.data.length){
          this.loadingBar = '0';
        }

      }

    })
        .catch(function (error) {
          console.log(error);
        });

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

  </style>
