<template>
  <div class="px-5 pt-3 pb-5">
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
      updateAnswer(givenAnswer: string) {
        this.$data.pickedAnswer = givenAnswer;
       }
    },
    components: {
      QuestionBox,
      AnswerBox
    }
});
</script>

<style lang="scss">
  @import "../css/styles";
  .background {
    background-color: $primary-color;
  }
  .chat {
    background-color: $surface;
  }
</style>
