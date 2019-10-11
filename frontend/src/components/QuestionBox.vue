<template>
  <div>
    <h2 id="question" >{{question}}</h2>
    <div v-for="answer in possibleAnswers" :key=answer.id>
      <input v-if="showAnswer" type="radio" name="answer" :value="answer.getId()" v-model="pickedAnswer" >
      <label v-if="showAnswer" :for="answer.getId()">{{answer.answer}} </label>
    </div>
    <button v-if="showAnswer" @click="onButtonClick">Submit</button>
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
      }
    }
});
</script>

<style lang="sass">
  $primary-color: #0066cc
</style>
