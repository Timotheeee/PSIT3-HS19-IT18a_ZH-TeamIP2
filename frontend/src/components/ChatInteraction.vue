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
import { GraphFactory } from '../model/GraphFactory';
import { MyGraphIterator, GraphIterator } from '../model/MyGraphIterator';
import { Node } from '../model/Node';
import { PathService } from '../services/PathService'
import { GraphService } from '../services/GraphService'

export default Vue.extend({
    data() {
      let graphService = new GraphService();
      let graphIterator: MyGraphIterator = new MyGraphIterator(GraphFactory.createTestGraph());
      graphService.getGraphIterator()
      .then(result => {
        graphIterator = result;
      })
      .catch(error => {
        alert('Please upload a file first in the adminpanel');
        this.$router.push('/welcome')
      })

      var question1 = new Question('1', graphIterator.getCurrentNode().getTitle(), graphIterator.getCurrentNode().getAnswerType());

      // TODO: ryan duplicate code smell
      const currentNode:Node = graphIterator.getCurrentNode();
        question1 = new Question(currentNode.getId(), currentNode.getTitle(), currentNode.getAnswerType());
        let i = 1;
        for(let currentAnswer of graphIterator.answersForCurrentNode()){
          question1.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.targetId));
        }

      return {
          questions: [
            question1
          ],
          result: new Result(0, []),
          pathService: new PathService(),
          graphIterator: graphIterator
      }
    },
    methods: {
        processQuestion(targetId: string) {
            this.graphIterator.choose(targetId);
            this.questions.push(this.getNextQuestion());
            this.scrollToBottom();
        },
        getNextQuestion(): Question {
          const currentNode:Node = this.graphIterator.getCurrentNode();
          const nextQuestion: Question = new Question(currentNode.getId(), currentNode.getTitle(), currentNode.getAnswerType());
          let i = 1;
          for(let currentAnswer of this.graphIterator.answersForCurrentNode()){
            nextQuestion.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.targetId));
          }

          return nextQuestion;
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

            // TODO: Get answers from user
            this.pathService.postPath([1])
            .then(result => {
              this.result = result;
            })
            .catch(error => {
              alert('error while sending the user path');
            })

            console.log(this.graphIterator.getPathScore());
            this.result.setScore(this.graphIterator.getPathScore());
            // TODO: add recommendations
            this.$router.push({name: 'Results', params: {result: JSON.stringify(this.result)}});
        },
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
