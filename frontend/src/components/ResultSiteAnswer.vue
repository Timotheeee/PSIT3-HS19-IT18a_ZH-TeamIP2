<template>
  <div>
    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
    <button id="goToResultPage"
            class="possible-answer"
            v-for="answer in possibleAnswers"
            :key="answer.id"
            type="submit"
            :name="question"
            :value="answer"
    >{{answer.answer}}</button>
    </b-button-group>
  </div>
    
</template>

<script lang="ts">
  import Vue from "vue";
  import { Answer } from "./../model/Answer";

  export default Vue.extend({
    name: "ResultSiteAnswer",
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
