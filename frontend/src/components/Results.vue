<template>
  <div>
    <div>
      <img :src="logo" class="smallLogo" />
      <b id="studentscore">StudentScore</b>
    </div>
    <br />
    <br />
    <div id="resultsbox">
      <div id="youare">You are...</div>
      <br>
      <img :src="circle" id="circle" />
      <span id="hardworker">{{hardworker}}</span>
      <span id="clueless">{{clueless}}</span>
    </div>
    <div id="tiltedredbox"></div>
    <div id="suggestions">
      <h3>Suggestions:</h3>
      <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</b>

    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "./../Question";
import { Answer } from "./../Answer";

export default Vue.extend({
  data() {
    return {
      logo: "./images/logo.png",
      circle: "./images/circle.png",
      hardworker: "40% Hard Worker",
      clueless: "60% Clueless"
    };
  },
  components: {},
  created() {}
});
</script>
