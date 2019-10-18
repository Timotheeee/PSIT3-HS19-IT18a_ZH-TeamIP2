<template>
  <div class="container" style="background-color: white; border:1px solid black">
    <div class="jumbotron text-center" style="background-color: white;">
      <div>
        <the-header />
        <input type="file" id="graphfile" @change="getFile" />
        <h2>Example file:</h2>
        <pre style="text-align:left">{
    "questions": [{
            "id":0,
            "title": "how much do you sleep ?",
            "answers": [
                {
                    "title": "8 hours",
                    "score": "1"
                }, {
                    "title": "5 hours",
                    "score": "-1"
                }
            ]
        },{
            "id":1,
            "title": "Do you write summaries ?",
            "answers": [
                {
                    "title": "yes",
                    "score": "1"
                }, {
                    "title": "no",
                    "score": "-1"
                }
            ]
        },{
            "id":2,
            "title": "How many hobbies do you have ?",
            "answers": [
                {
                    "title": "0",
                    "score": "1"
                }, {
                    "title": "1",
                    "score": "1",
                    "next": "3"
                }
            ]
        },{
            "id":3,
            "title": "How much time do you invest in other hobbies ?",
            "min": 0,
            "max": 20,
            "step": 0.5
        }]
      }
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "./TheHeader.vue";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      logo: "./images/logo.png",
      circle: "./images/circle.png",
      hardworker: "40% Hard Worker",
      clueless: "60% Clueless"
    };
  },
  methods: {
    getFile() {
      var input = <HTMLInputElement>document.getElementById("graphfile");
      var files = input.files;
      var file: File = files[0];
      var this2 = this;
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
          console.log(evt.target.result);
          this2.post(JSON.stringify(evt.target.result));
        };
        reader.onerror = function(evt) {
          console.log("error");
        };
      }
    },
    post(graph: any) {
      console.log("graph: " + graph);
      axios({
        method: "post",
        url: "/api",
        data: {
          graph: "lol"
        }
      })
        .then(r => {
          console.log(r);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: {
    TheHeader
  },
  created() {}
});
</script>
