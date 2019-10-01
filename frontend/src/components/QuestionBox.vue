<template>
  <div>
    <h2>{{question}}</h2>
    <div v-for="answer in answers" :key=answer.id>
      <input type="radio" name="answer" :value="answer.getId()" ><span :id="answer.getId()">{{answer.answer}}</span><br>
    </div>
    <button @click="send">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
    data() {
      return {
        question: '',
        answers: [] as Answer[]
      }
    },
    methods: {
      send() {

        // send chosen answer to graphlogic
        let checked = $("input[name='answer']:checked").val();
        console.log("send to JSON, value: " + checked);
      },
    },
    mounted() {
      // fetch data json file
      this.question = "How long did you sleep last night?";
      this.answers.push(new Answer(1, "below 6 hours"));
      this.answers.push(new Answer(2, "between 6 and 8 hours"));
      this.answers.push(new Answer(3, "over 8 hours"));
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

