<template>
  <div class="container" style="background-color: white; border:1px solid black">
    <div class="jumbotron text-center" style="background-color: white;">
      <div>
        <the-header />
        <input type="file" id="graphfile" onchange="read()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "./../Question";
import { Answer } from "./../Answer";
import TheHeader from "./TheHeader.vue";

export default Vue.extend({
  data() {
    return {
      logo: "./images/logo.png",
      circle: "./images/circle.png",
      hardworker: "40% Hard Worker",
      clueless: "60% Clueless"
    };
  },
  components: {
    TheHeader
  },
  created() {}
});
</script>
