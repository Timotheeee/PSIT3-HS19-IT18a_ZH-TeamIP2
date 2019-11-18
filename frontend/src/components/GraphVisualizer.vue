<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <div>graph visualization:</div>
      <!-- <div id="graph">{{this.graph}}</div> -->
      <div id="questions"></div>
      <!-- <div id="graph">{{this.graph}}</div> -->
      <div class="questionblock" v-for="question in questions" :key="question.id" :id="question.id" :class='{"highlighted": selected == question.id}'>
        {{question.id}}: {{question.metadata.title}}
        <br />answers ({{question.metadata.answerType}}):
        <br />
        <div
          class="answerblock"
          v-for="answer in question.answers"
          @mouseover="selected = answer.target"
          @mouseleave="selected = ''"
          :key="answer.id"
        >{{answer.metadata.answer}}: {{answer.target}}, score:{{answer.metadata.score}}</div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { GraphService } from "./../services/GraphService";

export default Vue.extend({
  name: "GraphVisualizer",
  data() {
    return {
      graphService: new GraphService(),
      questions: {},
      answers: {},
      selected:""
    };
  },
  methods: {
    downloadGraph() {
      var this2 = this;
      this.graphService
        .getJSON()
        .then(res => {
          var data = JSON.parse(res);

          for (var i = 0; i < data.nodes.length; i++) {
            data.nodes[i].answers = [];
          }

          for (var i = 0; i < data.edges.length; i++) {
            data.edges[i].id = i;
            var an = data.edges[i];
            var q = Number.parseInt(an.source.replace("q", "").replace("fn1", data.nodes.length));//make sure fn1 is at the end!
            if (q) {
              data.nodes[q - 1].answers.push(an);
            }
          }
          this2.questions = data.nodes;
          this2.answers = data.edges;
        })
        .catch(rej => {
          console.log("ERROR: " + rej);
        });
    },
    visualize() {
      console.log("d");
    }
  },

  beforeMount() {
    this.downloadGraph();
  }
});
</script>

<style lang="scss" scoped>
.questionblock {
  margin-bottom: 30px;
  border: 1px solid black;
}
.answerblock {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 80%;

  border: 1px solid red;
}
.highlighted {
  background: yellow
}
</style>

