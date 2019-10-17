<template>
  <div class="px-5 py-3">
    <question-box :question="this.question.getQuestion()"
                  :possibleAnswers="this.question.getPossibleAnswers()"
                  @answerPicked="updateAnswer" />
    <answer-box :answer="this.pickedAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Question} from "./../model/Question";
import {Answer} from "./../model/Answer"
import QuestionBox from './QuestionBox.vue';
import AnswerBox from './AnswerBox.vue';
export default Vue.extend({
    data() {
      return {
         pickedAnswer: ''
      }
    },
    props: {
      question: {
        type: Question,
        required: true
      }
    },
    methods: {
      updateAnswer(givenAnswer: Answer) {
        this.$data.pickedAnswer = givenAnswer.getAnswer();
        this.$emit("displayNextQuestion", givenAnswer.getId());
       }
    },
    components: {
      QuestionBox,
      AnswerBox
    }
});
</script>
