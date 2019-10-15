<template>
  <div>
    <h2>Welcome to</h2>
    <h1>StudentScore</h1>
    <img class="biglogo" :src="logo"><br>
    <span>our goal is to... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br><br><br><button @click="goToQuestionnaire" id="start">Start!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"


export default Vue.extend({
    data() {
      return {
        logo:"./images/logo.png"
      }
    },
    components: {

    },
    created() {

    },
    methods: {
      goToQuestionnaire(): void {
        this.$router.push('/questionnaire');
      }
    }
});
</script>
