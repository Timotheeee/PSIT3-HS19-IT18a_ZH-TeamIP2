<template>
  <div>
    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer">
      <button v-for="answer in possibleAnswers"
        :key="answer.id"
        class="possible-answer"
        v-on:click="onButtonClick(answer)"
        :name="question"
        :value="answer.getAnswer()"
        v-if="!lastQuestion"
      >{{answer.answer}}</button>
      <button id="goToResultPage"
        class="possible-answer"
        v-for="answer in possibleAnswers"
        :key="answer.id"
        type="submit"
        :name="question"
        :value="answer"
        v-else
      >{{answer.answer}}</button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Answer } from "./../model/Answer";
import { Username } from "./../model/Username";
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
    },
    username: {
      type: String,
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
