<template>
  <div>
    <p id="question" class="speech-bubble question">{{question}}</p>

    <b-button-group vertical class="speech-bubble possible-answer float-right">
      <b-button
        id="btn"
        v-if="showAnswer"
        v-for="answer in possibleAnswers"
        :key="answer.id"
        v-on:click="onButtonClick(answer.id,answer.answer)"
        :name="question"
        :value="answer"
        v-model="pickedAnswer"
      >
        <fieldset :id="question">
          <label :for="answer.getAnswer()">{{answer.answer}}</label>
        </fieldset>
      </b-button>
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
      pickedAnswer: "",
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
    }
  },
  methods: {
    onButtonClick(id: any, text: any) {
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
