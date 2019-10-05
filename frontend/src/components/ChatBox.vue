<template>
  <div>
    <question-box :question="this.question.getQuestion()" :possibleAnswers="this.question.getPossibleAnswers()"
     @answerGiven="setPickedAnswer" :givenAnswer=pickedAnswer  />
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
         question: new Question(1, "How much did you sleep?"),
         pickedAnswer: ''
      }
    },
    created() {
      this.question.addPossibleAnswer(new Answer(1, 'below 6 hours'));
      this.question.addPossibleAnswer(new Answer(2, '6 to 8 hours'));
      this.question.addPossibleAnswer(new Answer(3, 'over 8 hours'));
    },
    methods: {
      setPickedAnswer(givenAnswer: string) {
        this.pickedAnswer = givenAnswer;
        console.log("You chose the following answer: " + this.pickedAnswer);
      }
    },
    components: {
      QuestionBox
    }
});
</script>
