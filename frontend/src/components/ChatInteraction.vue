<template>
  <div class="w-100 min-vh-100 background">
    <div class="container chat p-0 shadow-lg">
      <the-header />
      <div class="chatbox">
        <question-pack class="questionPack"
                  v-for="question in this.questions"
                  :question="question"
                  @displayNextQuestion="getNextQuestion" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QuestionPack from "./QuestionPack.vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"
import TheHeader from './TheHeader.vue';
export default Vue.extend({
    data() {
        var question1 = new Question(1, "How much did you sleep?");
        question1.addPossibleAnswer(new Answer(1, 'below 6 hours'));
        question1.addPossibleAnswer(new Answer(2, '6 to 8 hours'));
        question1.addPossibleAnswer(new Answer(3, 'over 8 hours'));

        return {
            questions: [
                question1
            ]
        }
    },
    methods: {
        getNextQuestion(answerId: string) {
            // should get next question with the answerId

            var question2 = new Question(2, "How much wood could a woodchuck chuck if a woodchuck could chuck wood?");
            question2.addPossibleAnswer(new Answer(1, 'None because they are not vegan'));
            question2.addPossibleAnswer(new Answer(2, 'Maybe 4'));
            question2.addPossibleAnswer(new Answer(3, 'New York state wildlife expert Richard ' +
                'Thomas found that a woodchuck could (and does) chuck around 35 cubic feet of ' +
                'dirt in the course of digging a burrow. Thomas reasoned that if a woodchuck ' +
                'could chuck wood, he would chuck an amount equivalent to the weight of the ' +
                'dirt, or 700 pounds.'));

            this.questions.push(question2);
            var element = document.getElementById("chat-space");
            if(element != null) {

                element.scrollTop = element.scrollHeight + 100;
            }
        }
    },
    components: {
        TheHeader,
        QuestionPack
    }
});
</script>

<style lang="scss">
  @import "../css/styles";

  .chatbox {
    overflow-y: scroll;
    height: calc(100vh - 100px);
    display: grid;
  }

  // scrollbar design
  // not supported by FF, IE or Edge
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $surface;
  }

  ::-webkit-scrollbar-track:hover {
    background: $surface-dark;
  }

  ::-webkit-scrollbar-thumb {
    background: $primary-color;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
</style>
