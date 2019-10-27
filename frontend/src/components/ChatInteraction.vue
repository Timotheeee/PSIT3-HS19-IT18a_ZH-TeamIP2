<template>
  <div class="w-100 min-vh-100 background">
    <div class="container chat p-0 shadow-lg">
      <the-header />
      <div id="chat-box">
        <form @submit="onSubmit"
          method="post">
          <question-pack class="questionPack"
                    v-for="question in this.questions" v-bind:key="question.getId()"
                    :question="question"
                    @processNextQuestion="processQuestion" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import QuestionPack from './QuestionPack.vue';
import {Question} from './../model/Question';
import {Answer} from './../model/Answer';
import {Result} from "../model/Result";
import TheHeader from './TheHeader.vue';
import axios from "axios";

export default Vue.extend({
    data() {
        var question1 = new Question(1, "How much did you sleep?", false);
        question1.addPossibleAnswer(new Answer(1, 'below 6 hours'));
        question1.addPossibleAnswer(new Answer(2, '6 to 8 hours'));
        question1.addPossibleAnswer(new Answer(3, 'over 8 hours'));

        var counter = 0;

        return {
            questions: [
                question1
            ],
            chosenAnswers: [] as number[],
            result: new Result(0, ["Couldn't load result"]),
            counter
        }
    },
    methods: {
        processQuestion(questionId: number, answerId: number) {

            this.chosenAnswers.push(questionId, answerId);
            this.questions.push(this.getNextQuestion(answerId));
            this.scrollToBottom();
        },
        getNextQuestion(answerId: number) {
            // should get next question with the answerId

            var nextQuestion;

            // only temp so the program will stop
            this.counter += 1;
            if(this.counter <= 3) {

                nextQuestion = new Question(2 + this.counter, "How much wood could a woodchuck chuck if a woodchuck could chuck wood?", false);
                nextQuestion.addPossibleAnswer(new Answer(1, 'None because they are not vegan'));
                nextQuestion.addPossibleAnswer(new Answer(2, 'Maybe 4'));
                nextQuestion.addPossibleAnswer(new Answer(3, 'New York state wildlife expert Richard ' +
                    'Thomas found that a woodchuck could (and does) chuck around 35 cubic feet of ' +
                    'dirt in the course of digging a burrow. Thomas reasoned that if a woodchuck ' +
                    'could chuck wood, he would chuck an amount equivalent to the weight of the ' +
                    'dirt, or 700 pounds.'));
            }
            else {

                nextQuestion = new Question(100, "Great! We are finished! It was nice talking to you ;)", true);
                nextQuestion.addPossibleAnswer(new Answer(1, "Nice! Let me see the result"));
                this.calculatedResult();
            }
            return nextQuestion;
        },
        calculatedResult() {
            axios({
                method: "post",
                url: "/score",
                data: {
                    result: this.chosenAnswers
                }
            }).then(resolve => {
                this.result = resolve.data.result;
            })
                .catch(error => {
                    alert('error while sending the answers');
                });
        },
        scrollToBottom() {
            var chatBox = this.$el.querySelector("#chat-box");
            if(chatBox != null) {

                chatBox.scrollTop = chatBox.scrollHeight;
            }
        },
        onSubmit(event: Event) {
            // prevents form from reloading the page
            event.preventDefault();

            // go to the next result page
            this.$router.push({name: 'Results', params: {result: JSON.stringify(this.result)}});
        }
    },
    components: {
        TheHeader,
        QuestionPack
    }
});
</script>

<style lang="scss">
  @import '../css/colors';

  .background {
    background-color: $primary-color;
  }

  #chat-box {
    overflow-y: scroll;
    height: calc(100vh - 100px);
    text-align: right;
    background-color: $surface;
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
