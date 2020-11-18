<template>

  <div id="app">

    <div class="main">
      <p class="teamTitle">TEAMS ON DECK</p>
      <hr class="colorHr">
      <hr class="lineCross">
        <b-row class="teamName" v-for="(team, index) in teamList" v-bind:key="index.id">
          <b-col>
            <p v-if="team.Session_game_scores == '' " v-bind:class="'changeColor'+index">{{team.Team.name}}</p>
          </b-col>
        </b-row>
    </div>

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
      // teamname: [],
      teamList: []
    }
  },

  mounted: function(){
    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

    })
    .then(response => {
      console.log(response);
      this.teamList = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    setTimeout(location.reload.bind(location), 8200);

  }

};
</script>

<style>
@import url(//db.onlinewebfonts.com/c/4f0c82bb2e8fb2d03bd14a1137235ef3?family=Pixel+Digivolve+Cyrillic);

/*@media (min-width: 2000px) {

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99%;
  }

  .main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99%;
    background-color: black;

  }
  .container{
    display: none;
  }

  .teamTitle{
    font-size: 4em;
    /*color: #007BFF;
    color: #00ff89;
    margin-top: -2%;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  .teamName{
    font-size: 3.5em;
    color: #00ff89;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  img{
    width: 40%;
  }

  .lineCross{
    width: 65%;
    background-color: #00ff89;
    margin-top: 1%;
    margin-bottom: 3%;
    color: #00ff89;
    height: 7px;
  }

  .container{
    display: none;
  }

}*/

@media (min-width: 992px) { /** this defines the css for the BIGGER TV AS WELL **/

    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99.99%;
    margin: auto;
  }

  .main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: auto;
    height: 1078px;
    background-color: black;
    margin-top: -10%;

  }
  /*.container{
    display: none;
  }*/

  .teamTitle{
    font-size: 5em;
    /*color: #007BFF;*/
    color: #00ff89;
    margin-top: -2%;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  .teamName{
    font-size: 3.7em;
    color: #00ff89;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  img{
    width: 30%;
  }

  .lineCross{
    width: 95%;
    background-color: #00ff89;
    color: #00ff89;
    height: 7px;
    margin-top: 1%;
    margin-bottom: 3%;
  }

  .colorHr{
    color: #00ff89;
  }


  .changeColor0{
    /*color:red;*/
    -webkit-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Safari 4+ */
    -moz-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Fx 5+ */
    -o-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Opera 12+ */
    animation: NAME-YOUR-ANIMATION 1s infinite;  /* IE 10+, Fx 29+ */
  }

  @-webkit-keyframes NAME-YOUR-ANIMATION {
    0%, 49% {
      background-color: #00ff89;  /** green **/
      color: black;
      /*border: 3px solid #e50000;*/
    }
    50%, 100% {
      background-color: black;
      color: #00ff89;
      /*border: 3px solid rgb(117, 209, 63);*/
    }
  }

}


@media (min-width: 2000px) {

    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99.99%; /** width: auto; **/
    /*margin-left: 0.1%;*/
  }

  .main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: auto;
    height: 1700px;
    background-color: black;
    margin-top: -10%;
    margin-left: -1%;

  }
  /*.container{
    display: none;
  }*/

  .teamTitle{
    font-size: 8em;
    /*color: #007BFF;*/
    color: #00ff89;
    margin-top: 4%;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  .teamName{
    font-size: 5em;
    color: #00ff89;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  }

  img{
    width: 30%;
  }

  .lineCross{
    width: auto;
    background-color: #00ff89;
    color: #00ff89;
    height: 7px;
    margin-top: 1%;
    margin-bottom: 3%;
  }

  .colorHr{
    color: #00ff89;
  }


  .changeColor0{
    /*color:red;*/
    -webkit-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Safari 4+ */
    -moz-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Fx 5+ */
    -o-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Opera 12+ */
    animation: NAME-YOUR-ANIMATION 1s infinite;  /* IE 10+, Fx 29+ */
  }

  @-webkit-keyframes NAME-YOUR-ANIMATION {
    0%, 49% {
      background-color: #00ff89;  /** green **/
      color: black;
      /*border: 3px solid #e50000;*/
    }
    50%, 100% {
      background-color: black;
      color: #00ff89;
      /*border: 3px solid rgb(117, 209, 63);*/
    }
  }

}



</style>
