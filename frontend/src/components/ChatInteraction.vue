import {AnswerType} from "../model/Graph/Node";
<template>
  <div class="w-100 min-vh-100 background">
    <div class="container chat p-0 shadow-lg">
      <the-header />
      <div id="chat-box">
        <question-pack class="questionPack"
              v-for="question in this.questions" v-bind:key="question.getId()"
              :question="question"
              @processNextQuestion="processQuestion" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { EventBus } from '../event-bus';
import QuestionPack from './QuestionPack.vue';
import {Question} from './../model/Question';
import {Answer} from './../model/Answer';
import {Result} from "../model/Result";
import TheHeader from './TheHeader.vue';
import { GraphFactory } from '../model/Graph/GraphFactory';
import { GraphIteratorInterface, GraphIterator, createIterator } from '../model/Graph/GraphIterator';
import { Node, AnswerType} from '../model/Graph/Node';
import { PathService } from '../services/PathService'
import { GraphService } from '../services/GraphService'

export default Vue.extend({
    data() {
      return {
          questions: [new Question("q0", "is typing...", AnswerType.RegularAnswer)],
          result: new Result(0, []),
          pathService: new PathService(),
          graphIterator: createIterator(GraphIterator, GraphFactory.createTestGraph()),
          username: ""
      }
    },
    methods: {
        processQuestion(edgeId: string) {
            this.graphIterator.choose(edgeId);
            this.questions.push(this.getNextQuestion());
        },
        getNextQuestion(): Question {
          const currentNode:Node = this.graphIterator.currentNode;
          const nextQuestion: Question = new Question(
              currentNode.id,
              this.insertUsernameInQuestion(currentNode.text),
              currentNode.answerType);
          let i = 1;
          for(let currentAnswer of this.graphIterator.answersForCurrentNode()){
            nextQuestion.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.edgeId));
          }

          return nextQuestion;
        },
        insertUsernameInQuestion(question: string): string {
            let result = question.replace("%username%", this.$data.username);
            return result;
        }
    },
    created() {
      EventBus.$on("setUsername", (username: String) => {
        this.$data.username = username;
      });

      EventBus.$on("goToResultSite", () => {

          // TODO: ryan write this code -> use new classes for recommendations etc.
          this.result.setScore(404);
          // TODO: add recommendations
          this.$router.push({name: 'Results', params: {result: JSON.stringify(this.result)}});
      });

      let graphService = new GraphService();
      graphService.get()
        .then(result => {
            let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, result);
            this.$data.graphIterator = graphIterator;

            var firstQuestion = new Question('1', graphIterator.currentNode.text, graphIterator.currentNode.answerType);

            // TODO: ryan duplicate code smell
            const currentNode:Node = graphIterator.currentNode;
            firstQuestion = new Question(currentNode.id, currentNode.text, currentNode.answerType);
            let i = 1;
            for(let currentAnswer of graphIterator.answersForCurrentNode()){
                firstQuestion.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.edgeId));
            }

            this.$data.questions = [];
            this.$data.questions.push(firstQuestion);
        })
        .catch(error => {
            alert('Please upload a file first in the adminpanel');
            this.$router.push('/welcome')
        });
    },
    updated() {
      var chatBox = this.$el.querySelector("#chat-box");
      if(chatBox != null) {

        chatBox.scrollTop = chatBox.clientHeight;
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
