<template>
  <div id="app">

 <VueTwitchPlayer
    :channel="channel" width="90%" height="500px"
  ></VueTwitchPlayer>

  </div>


</template>

<script>

// import axios from 'axios';
import VueTwitchPlayer from 'vue-twitch-player';


export default {
  name: 'App',
  components: {
    // HelloWorld
    // VueTwitchPlayer
    // VueTwitchVideoControlles,
    // Loadscript,
    VueTwitchPlayer
  },

  data(){
    return{
      // teamname: [],
      teamList: [],
      channel: 'beatthebomb1000',
      // channel: 'tserkov',
    }
  },

  mounted: function(){

    // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

    // })
    // .then(response => {
    //   console.log(response);
    //   this.teamList = response.data;
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

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


  .main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    /*height: 1078px;*/
    height: 100vh;
    /*background-color: black;*/
    /*margin-top: -10%;*/
    overflow-y: hidden;
    overflow-x: hidden;

  }



  </style>
