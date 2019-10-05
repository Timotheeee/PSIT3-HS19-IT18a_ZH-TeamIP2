<template>
  <div>
    <h2 id="question">{{question}}</h2>
    <div v-for="answer in possibleAnswers" :key=answer.getId()>
      <input type="radio" name="answer" :value="answer.id" v-model="pickedAnswer" >
      <label :for="answer.getId()">{{answer.getAnswer()}} </label>
    </div>
    <button @click="onButtonClick">Submit</button>

    <b-row>
      <b-col>TEST1</b-col>
      <b-col>TEST2</b-col>
      <b-col>TEST3</b-col>
      <b-col>TEST4</b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Answer} from "./../Answer";


export default Vue.extend({
    data() {
      return {
        pickedAnswer: ''
      }
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
        this.$emit("answerGiven", this.pickedAnswer);
      },
    },
    created() {
    }
});
</script>
