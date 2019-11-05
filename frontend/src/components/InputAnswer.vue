<template>
    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
      <input type="text" value="bla" placeholder="Bob">
      <button v-for="answer in possibleAnswers"
              :key="answer.id"
              class="possible-answer"
              v-on:click="onButtonClick(answer)"
              :value="answer.getAnswer()"
      >{{answer.answer}}</button>
    </b-button-group>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Answer } from "./../model/Answer";

  export default Vue.extend({
    name: "InputAnswer",
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
      onButtonClick(event: Answer) {
        this.$emit("answerPicked", event);
        this.showAnswer = false;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import "../css/colors";
  @import "../css/speech-bubble";
</style>
