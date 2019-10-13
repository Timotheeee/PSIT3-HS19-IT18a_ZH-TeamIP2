<template>
  <div class="px-5 py-3">
    <p id="question" class="speech-bubble question shadow p-3">{{question}}</p>
    <div v-if="showAnswer" v-for="answer in possibleAnswers" :key=answer.id>
      <fieldset :id="question">
      <input type="radio" :name="question" :value="answer.getAnswer()" v-model="pickedAnswer" >
      <label :for="answer.getAnswer()">{{answer.answer}} </label>
      </fieldset>
    </div>
    <button @click="onButtonClick">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Answer} from './../Answer';


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
        type: [],
        required: true
      }
    },
    methods: {
      onButtonClick() {
        this.$emit("answerPicked", this.pickedAnswer);
        this.pickedAnswer = "";
        this.showAnswer = false;
      },
    }
});
</script>

<style lang="scss">
  $primary-color: #18aec7;

  .question {
    color: white;
    font-size: 18px;
    background: $primary-color;
  }

  .speech-bubble {
    position: relative;
    border-radius: .4em;
    width: fit-content;
    max-width: 50%;
  }

  .question:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 25px solid transparent;
    border-right-color: $primary-color;
    border-left: 0;
    border-top: 0;
    margin-top: -10px;
    margin-left: -25px;
  }
</style>
