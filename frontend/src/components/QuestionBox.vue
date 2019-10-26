<template>
  <div>
    <p class="speech-bubble question">{{question}}</p>

    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
      <b-button
        v-for="answer in possibleAnswers"
        :key="answer.id"
        class="btn"
        v-on:click="onButtonClick(answer.getId(),answer.getAnswer())"
        :name="question"
        :value="answer"
        v-if="!lastQuestion"
      >{{answer.answer}}</b-button>
      <b-button
        class="btn"
        id="goToResultPage"
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
    onButtonClick(id: number, text: String) {
      this.$emit("answerPicked", id, text);
      this.showAnswer = false;
    }
  }
});
</script>

<style lang="scss">
@import "../css/colors";
@import "../css/speech-bubble";
</style>
