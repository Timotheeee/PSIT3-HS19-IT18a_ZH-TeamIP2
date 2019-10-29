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
import TheHeader from './TheHeader.vue';
import axios from "axios";
import {Result} from "../model/Result";
import { GraphFactory } from '../model/GraphFactory';
import { MyGraphIterator } from '../model/MyGraphIterator';
import { Node } from '../model/Node';

export default Vue.extend({
    data() {
        let graphIterator = new MyGraphIterator(GraphFactory.createTestGraph());
        var question1 = new Question('1', graphIterator.getCurrentNode().getTitle(), false);

        // TODO: ryan duplicate code smell
        const currentNode:Node = graphIterator.getCurrentNode();          
          question1 = new Question(currentNode.getId(), currentNode.getTitle(), currentNode.getIsFinalNode());
          let i = 1;
          for(let currentAnswer of graphIterator.answersForCurrentNode()){
            // TODO: ryan change return of getAnswers to {title : blah, target: q2} ...
            question1.addPossibleAnswer(new Answer(i++, currentAnswer));
          }

        var counter = 0;

        return {
            graphIterator: graphIterator,
            questions: [
                question1
            ]
        }
    },
    methods: {
        processQuestion(questionId: number, answerId: string) {
            //TODO: ryan has no idea what he is doing
            console.log(`answerId: ${answerId}`)
            this.graphIterator.choose(answerId);
            this.questions.push(this.getNextQuestion());
            this.scrollToBottom();
        },
        getNextQuestion() {     
          console.log('inside of getNextQuestion');
          
          const currentNode:Node = this.graphIterator.getCurrentNode();          
          const nextQuestion: Question = new Question(currentNode.getId(), currentNode.getTitle(), currentNode.getIsFinalNode());
          let i = 1;
          for(let currentAnswer of this.graphIterator.answersForCurrentNode()){
            nextQuestion.addPossibleAnswer(new Answer(i++, currentAnswer));
          }

            return nextQuestion;
        },
        scrollToBottom() {
            var chatBox = this.$el.querySelector("#chat-box");
            if(chatBox != null) {

                chatBox.scrollTop = chatBox.scrollHeight;
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
