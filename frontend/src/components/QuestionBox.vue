<template>
  <div>
    <h2 id="question" >{{question}}</h2>
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
      createFieldSetId(questionId: number): string {
        return 'question' + questionId;
      }
    }
});
</script>

<style lang="sass">
  $primary-color: #0066cc
</style>
