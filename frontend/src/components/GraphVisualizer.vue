<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h3>Graph Visualization:</h3>
      <div id="questions"></div>
      <div class="question-block"
           v-for="question in questions"
           :key="question.id"
           :id="question.id"
           :class='{"highlighted": selected == question.id}'>
        <p class="m-1">{{question.id}}: {{question.metadata.title}}</p>
        <hr class="m-2">
        <p class="m-1">Answers ({{question.metadata.answerType}}):</p>
        <div class="answer-block"
             v-for="answer in question.answers"
             @mouseover="selected = answer.target"
             @mouseleave="selected = ''"
             :key="answer.id">
          <p class="m-1">{{answer.metadata.answer}}</p>
          <p class="m-1">Target: {{answer.target}} | Score:{{answer.metadata.score}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { GraphService } from "./../services/GraphService";
  import {EdgeJSON} from "../model/Graph/Edge";

  export default Vue.extend({
    name: "GraphVisualizer",
    data() {
      return {
        graphService: new GraphService(),
        questions: {},
        answers: {},
        selected: ""
      };
    },
    methods: {
      downloadGraph() {
        this.graphService.getJSON()
          .then(res => {
            var data = JSON.parse(res);

            for (var i = 0; i < data.nodes.length; i++) {
              data.nodes[i].answers = [];
            }

            for (var i = 0; i < data.edges.length; i++) {
              data.edges[i].id = i;
              let answers: EdgeJSON = data.edges[i];
              //make sure fn1 is at the end!
              let questionNumber: number = Number.parseInt(answers.source.replace("q", "").replace("fn1", data.nodes.length));
              if (questionNumber) {
                data.nodes[questionNumber - 1].answers.push(answers);
              }
            }
            this.$data.questions = data.nodes;
            this.$data.answers = data.edges;
          })
          .catch(rej => {
            console.log("ERROR: " + rej);
          });
      }
    },
    beforeMount() {
      this.downloadGraph();
    }
  });
</script>

<style lang="scss" scoped>
  .question-block {
    margin-bottom: 30px;
    border: 1px solid black;
  }

  .answer-block {
    margin-bottom: 10px;
    margin-left:10px;
    border: 1px solid red;
    display: inline-block;
  }

  .highlighted {
    background: yellow
  }
</style>

