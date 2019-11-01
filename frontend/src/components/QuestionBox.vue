<template>
  <div>
    <p class="speech-bubble question">{{question}}</p>

    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
      <b-button v-for="answer in possibleAnswers"
        :key="answer.id"
        class="answer-button"
        v-on:click="onButtonClick(answer)"
        :name="question"
        :value="answer"
        v-if="!lastQuestion"
      >{{answer.answer}}</b-button>
      <b-button id="goToResultPage"
        class="answer-button"
        v-for="answer in possibleAnswers"
        :key="answer.id"
        type="submit"
        :name="question"
        :value="answer"
        v-else
      >{{answer.answer}}</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Answer } from "./../model/Answer";
export default Vue.extend({
  name: "QuestionBox",
  data() {
    return {
      showAnswer: true
    };
  },
  props: {
    question: {
      type: String,
      required: true
    },
    possibleAnswers: {
      type: Array,
      required: true
    },
    lastQuestion: {
      type: Boolean,
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

<style lang="scss">
@import "../css/colors";
@import "../css/speech-bubble";

.possible-answer > button {
  background-color: $secondary-color;
  margin: 10px 0px;
  border: none;
  border-radius: 0px;
}

.possible-answer > button:hover {
  background-color: $surface;
  color: $secondary-color;
  border: none;
}
</style>
