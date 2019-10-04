<template>
  <div>
    <question-box :question="this.question.getQuestion()" :possibleAnswers="this.question.getPossibleAnswers()" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"
import QuestionBox from './QuestionBox.vue';


export default Vue.extend({
    data() {
      return {
         question: new Question(1, "How much did you sleep?")
      }
    },
    created() {
      this.question.addPossibleAnswer(new Answer(1, 'below 6 hours'));
      this.question.addPossibleAnswer(new Answer(1, '6 to 8 hours'));
      this.question.addPossibleAnswer(new Answer(1, 'over 8 hours'));
      console.log("Question looks like: " + this.question);
    },
    components: {
      QuestionBox
    }
});
</script>
