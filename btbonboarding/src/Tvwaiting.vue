<template>
  <div id="app">
    <p class="teamTitle">TEAMS ON DECK</p>
    <hr class="lineCross">
    <!-- <b-container class="bv-example-row"> -->
      <b-row class="teamName" v-for="team in teamList" v-bind:key="team.id">
        <b-col>
          <p v-if="team.Session_game_scores == '' ">{{team.Team.name}}</p>
        </b-col>
      </b-row>
    <!-- </b-container> -->

  </div>
</template>

<script>

 import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  data(){
    return{
      teamname: [],
      teamList: []
    }
  },

  mounted: function(){
    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10+'/active',{

    })
    .then(response => {
      console.log(response);
      this.teamList = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

};
</script>

<style>

@media (min-width: 2000px) {

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99%;
  }
  /*.container{
    display: none;
  }*/

  .teamTitle{
    font-size: 4em;
    color: #007BFF;
    margin-top: -2%;
  }

  .teamName{
    font-size: 3.5em;
  }

  img{
    width: 40%;
  }

  .lineCross{
    width: 65%;
  }

}

@media (min-width: 992px) {

    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99%;
  }
  /*.container{
    display: none;
  }*/

  .teamTitle{
    font-size: 3em;
    color: #007BFF;
    margin-top: -2%;
  }

  .teamName{
    font-size: 2.5em;
  }

  img{
    width: 30%;
  }

  .lineCross{
    width: 50%;
  }

}



</style>
