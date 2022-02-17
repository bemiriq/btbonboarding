<template>


	<!-- display message for mission without player -->
	<div id='missionClickedWithoutPlayer'>
		<b-modal ref="modal-missionSelect" title="Warning !!">
			Box should contain at least one player to change mission.
		</b-modal>
	</div>
	<!-- end of mission message without player -->

</template>

<script>
	// import { BootstrapVueIcons } from 'bootstrap-vue'
	import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

	export default {
		name: 'App',

	mounted:function(){
		this.$refs['modal-missionSelect'].show();
	}
}

</script>