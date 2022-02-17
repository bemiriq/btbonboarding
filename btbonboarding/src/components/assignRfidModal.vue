<template>

	<!-- display modal of assign to rfid -->
	<div id='assignRfidToPlayer'>
		<!-- <b-button v-on:click="closeModal()" v-if="displayText == '1' ">CLOSE NOW</b-button> -->
		<br>
		<!-- <div v-if="clickedCloseModal == '0'"> -->
		<b-modal id="modal-assignRfidToPlayer" title="Assign RFID" centered>
			<b-row v-for="(item,index) in playerList" v-bind:key='item.id'>
				<!-- <b-col>{{item.minor}}</b-col> -->
				<b-col>{{item.tpsId}}</b-col>
				<b-col>{{item.playerName}} {{item.index}}</b-col>
				<b-col>
					<b-form-input v-model="rfidValueUsed" @input="scannedRfid(index,item.tpsId)" ref="rfidInput" :style="rfidValueUsed.index ? { 'background-color': '#33FF90', color:'#33FF90' } : null" ></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-button block variant="primary" v-on:click="closeModal()">Ok</b-button>
			</b-row>
		</b-modal>
		<!-- </div> -->
		
	</div>
	<!-- end of modal to assign rfid -->


</template>

<script>
	// import { BootstrapVueIcons } from 'bootstrap-vue'
	import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

	export default {
	
	name:'my-component',
	props: [
		'playerList','world'
	],

	data() {
		return {
				// playerList: [],
				clickedCloseModal: '',
				displayText:'',
				rfidValueUsed:'',
		}
	},

	mounted:function(){
		this.displayText = '0';
		this.clickedCloseModal = '0';
		console.log(this.playerList);
        // this.$bvModal.show('modal-assignRfidToPlayer'); /** adding this code here , displays modal on the first click **/
        this.hello();
	},

	// watch: {
 //    world() {
 //      if (this.world) this.hello()
 //    }
  // },

	methods:{
		closeModal(){
			console.log('clicked on close modal');
			this.displayText = '0';
			this.clickedCloseModal = '1';
			console.log('display text is '+this.displayText);
			
			console.log(this.playerList);

			this.sendPlayerListValue = [];
			// this.$refs['modal-assignRfidToPlayer'].hide();
			// this.closeModal
		},

		scannedRfid(playerIndex,tpsId){
			console.log('player index was '+playerIndex);
			console.log('tps id was '+tpsId);

			this.rfidValueUsed = ''; /** this will make the input field background green to white **/

			/** the code below will focus on next input field **/
			const nextPlayerIndex = playerIndex + 1;
			this.$refs.rfidInput[nextPlayerIndex].focus();
			console.log('inserted wristband detail');
			/** end of next input field focus **/

		},

		hello(){
			this.displayText = '1';
			console.log('display text value is '+this.displayText);
			console.log('inside child component hello function');
			console.log('clickedCloseModal value was '+this.clickedCloseModal);
			// this.$refs['modal-assignRfidToPlayer'].show();
			if(this.displayText > '0'){
				console.log('I am greater than 0');
				this.clickedCloseModal = '0';
				// this.$bvModal.show('modal-assignRfidToPlayer');
				this.$root.$emit('bv::show::modal', 'modal-assignRfidToPlayer', '#btnShow');

			}
		}
	},

}

</script>