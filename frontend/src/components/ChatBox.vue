<template>
  <div>
    <question-box :question="this.question.getQuestion()"
                  :possibleAnswers="this.question.getPossibleAnswers()"
                  @answerPicked="updateAnswer" />
    <answer-box :answer="this.pickedAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"
import QuestionBox from './QuestionBox.vue';
import AnswerBox from './AnswerBox.vue';


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
      updateAnswer(givenAnswer: string) {
        this.pickedAnswer = givenAnswer;
       }
    },
    components: {
      QuestionBox,
      AnswerBox
    }
});
</script>
