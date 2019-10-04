<template>
  <div>
    <h2 id="question">{{question}}</h2>
    <div v-for="answer in possibleAnswers" :key=answer.id>
      <input type="radio" name="answer" :value="answer.getId()" v-model="pickedAnswer" >
      <label :for="answer.getId()">{{answer.answer}} </label>
    </div>
    <button @click="onButtonClick">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
    data() {
      return {
        question: '',
        possibleAnswers: [] as Answer[],
        pickedAnswer: ''
      }
    },
    methods: {
      onButtonClick() {
        console.log("send to JSON, value: " + this.pickedAnswer);
      },
    },
    created() {
      // fetch data json file
      this.question = "How long did you sleep last night?";
      this.possibleAnswers.push(new Answer(1, "below 6 hours"));
      this.possibleAnswers.push(new Answer(2, "between 6 and 8 hours"));
      this.possibleAnswers.push(new Answer(3, "over 8 hours"));
    }
});

class Answer {
  id: number;
  answer: string;

  constructor(id: number, answer: string) {
    this.id = id;
    this.answer = answer;
  }

  getId() : number {
    return this.id;
  }
}

</script>

