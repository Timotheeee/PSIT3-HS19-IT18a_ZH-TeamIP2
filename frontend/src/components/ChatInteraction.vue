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
import { EventBus } from '../event-bus';
import QuestionPack from './QuestionPack.vue';
import {Question} from './../model/Question';
import {Answer} from './../model/Answer';
import {Result} from "../model/Result";
import TheHeader from './TheHeader.vue';
import { GraphFactory } from '../model/Graph/GraphFactory';
import { GraphIteratorInterface, GraphIterator, createIterator } from '../model/Graph/MyGraphIterator';
import { Node } from '../model/Graph/Node';
import { PathService } from '../services/PathService'
import { GraphService } from '../services/GraphService'

export default Vue.extend({
    data() {
      let graphService = new GraphService();
      let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, GraphFactory.createTestGraph());
      graphService.get()
      .then(result => {
        createIterator(GraphIterator, result);
      })
      .catch(error => {
        alert('Please upload a file first in the adminpanel');
        this.$router.push('/welcome')
      })

      var question1 = new Question('1', graphIterator.currentNode.getTitle(), graphIterator.currentNode.getAnswerType());

      // TODO: ryan duplicate code smell
      const currentNode:Node = graphIterator.currentNode;
        question1 = new Question(currentNode.getId(), currentNode.getTitle(), currentNode.getAnswerType());
        let i = 1;
        for(let currentAnswer of graphIterator.answersForCurrentNode()){
          question1.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.edgeId));
        }

      return {
          questions: [
            question1
          ],
          result: new Result(0, []),
          pathService: new PathService(),
          graphIterator: graphIterator,
          username: ""
      }
    },
    methods: {
        processQuestion(edgeId: string) {
            this.graphIterator.choose(edgeId);

            if(this.graphIterator.currentNode.getIsFinalNode()){
              this.questions.push(this.getLastQuestion());
            } else {
              this.questions.push(this.getNextQuestion());
            }            
        },
        getNextQuestion(): Question {
          const currentNode:Node = this.graphIterator.currentNode;
          const nextQuestion: Question = new Question(
              currentNode.getId(),
              this.insertUsernameInQuestion(currentNode.getTitle()),
              currentNode.getAnswerType());
          let i = 1;
          for(let currentAnswer of this.graphIterator.answersForCurrentNode()){
            nextQuestion.addPossibleAnswer(new Answer(i++, currentAnswer.answer, currentAnswer.edgeId));
          }

          return nextQuestion;
        },
        getLastQuestion() : Question {
          const lastQuestion = new Question('fn999', 'Would you like to see how you did?', 'result');
          lastQuestion.addPossibleAnswer(new Answer(999, 'Yes', 'fn999+1'));
          return lastQuestion;

        },
        insertUsernameInQuestion(question: string): string {
            let result = question.replace("%username%", this.$data.username);
            return result;
        },

        onSubmit(event: Event) {
            // prevents form from reloading the page
            event.preventDefault();

            // TODO: ryan write this code -> use new classes for recommendations etc.
            this.result.setScore(404);
            // TODO: add recommendations
            this.$router.push({name: 'Results', params: {result: JSON.stringify(this.result)}});
        }
    },
    created() {
      EventBus.$on("setUsername", (username: String) => {
        this.$data.username = username;
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
