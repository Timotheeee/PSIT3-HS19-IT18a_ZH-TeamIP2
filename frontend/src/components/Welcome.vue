<template>
  <div class="container" style="background-color: white; border:1px solid black">
    <div class="jumbotron text-center" style="background-color: white;">
      <div>
        <the-header />
        <br />
        <br />
        <h2>Welcome to StudentScore!</h2>
        <br />
        <br />
        <span>our goal is to... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
        <br />
        <br />
        <br />
        <button @click="goToQuestionnaire" id="start">Start!</button>
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
      logo: "./images/logo.png"
    };
  },
  components: {
    TheHeader
  },
  created() {},
  methods: {
    goToQuestionnaire(): void {
      this.$router.push("/questionnaire");
    }
  }
});
</script>
