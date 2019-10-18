<template>
  <div class="container" style="background-color: white; border:1px solid black">
    <div class="jumbotron text-center" style="background-color: white;">
      <div>
        <the-header />
        <input type="file" id="graphfile" @change="getFile" />
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
      axios({
        method: "post",
        url: "/api",
        data: {
          graph: "lol",
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
