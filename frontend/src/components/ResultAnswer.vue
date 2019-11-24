<template>
  <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
    <button id="goToResultPage"
            class="possible-answer"
            v-for="answer in possibleAnswers"
            :key="answer.id"
            type="submit"
            :value="answer"
            v-on:click="onButtonClick()"
    >{{answer.answer}}</button>
  </b-button-group>
</template>

<script lang="ts">
  import Vue from "vue";
  import { EventBus } from "../event-bus";
  import { Answer } from "./../model/Answer";

  export default Vue.extend({
    name: "ResultAnswer",
    data() {
      return {
        showAnswer: true
      };
    },
    props: {
      possibleAnswers: {
        type: Array,
        required: true
      }
    },
    methods: {
      onButtonClick() {
        // redirects user to the result site
        EventBus.$emit("goToResultSite");
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import "../css/colors";
  @import "../css/speech-bubble";
</style>
