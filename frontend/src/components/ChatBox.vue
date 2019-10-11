<template>
    <div class="w-100 min-vh-100 background">
        <div class="container chat min-vh-100 p-0">
            <the-header />
            <div class="p-3">
                <question-box :question="this.question.getQuestion()"
                              :possibleAnswers="this.question.getPossibleAnswers()"
                              @answerPicked="updateAnswer" />
                <answer-box :answer="this.pickedAnswer" />
            </div>
            <the-footer />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"
import QuestionBox from './QuestionBox.vue';
import AnswerBox from './AnswerBox.vue';
import TheHeader from './TheHeader.vue';


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
      AnswerBox,
      TheHeader
    }
});
</script>

<style lang="scss">
    $primary-color: #18aec7;

    .background {
        background-color: $primary-color;
    }

    .chat {
        background-color: white;
    }
</style>
