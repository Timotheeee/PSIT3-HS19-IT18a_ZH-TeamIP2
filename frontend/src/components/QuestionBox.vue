<template>
  <div>
    <p id="question" class="speech-bubble question">{{question}}</p>
    <div class="speech-bubble possible-answer mr-5 mb-3 float-left" v-if="showAnswer" v-for="answer in possibleAnswers" :key=answer.id>
      <fieldset :id="question" v-if="!lastQuestion">
        <input type="radio" :name="question" :value="answer" v-model="pickedAnswer" >
        <label :for="answer.getAnswer()">{{answer.answer}} </label>
      </fieldset>
      <button class="linkToResult" v-if="lastQuestion" @click="goToResultSite">{{answer.answer}}</button>
    </div>
    <button id="emitEvent" @click="onButtonClick">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Answer} from './../model/Answer';

export default Vue.extend({
    name: "QuestionBox",
    data() {
      return {
        pickedAnswer: '',
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
      onButtonClick() {
        this.$emit("answerPicked", this.pickedAnswer);
        this.pickedAnswer = "";
        this.showAnswer = false;
      },
      goToResultSite(): void {
          this.$router.push("/results");
      }
    }
});
</script>

<style lang="scss">
  @import "../css/colors";
  @import "../css/speech-bubble";

  .linkToResult {
    border: none;
    background-color: $secondary-color !important;
    color: $surface !important;
  }
</style>
