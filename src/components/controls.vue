<template>
	<div class="controls-list">
		<div v-for="list in controls">
			<h3 class="controls-classify-name">{{list.label}}</h3>
			<vddl-list :list="list.norm" :allowed-types="list.norm">
				<vddl-draggable v-for="(norm, index) in list.norm" :key="norm.type"
				  :draggable="norm"
				  :wrapper="list.norm"
				  :index="index"
				  effect-allowed="copy">
				  	<!-- <i :class="norm.icon"></i> -->
	          		<span>{{norm.type}}</span>
				</vddl-draggable>
			</vddl-list>
		</div>
	</div>
</div>
</template>
<script>
import Vue from 'vue'
import Vddl from 'vddl';
import { mapGetters, mapActions } from 'vuex';
Vue.use(Vddl);
export default {
  computed: {
    ...mapGetters({
      controls:'controls',
    }),
  },
  created(){
    this.$store.dispatch('controls')
  },
  methods: {},
  components:{}
}
</script>

