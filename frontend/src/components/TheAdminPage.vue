<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
        <div class="container">
          <div class="large-12 medium-12 small-12 cell">
            <label>
              <input type="file" id="file" ref="file" class="btn btn-secondary btn-lg" v-on:change="handleFileUpload()"/>
            </label>
            <button type="button" class="btn btn-secondary btn-lg" v-on:click="submitFile()">Submit</button>
          </div>
        </div>
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
      file: ''
    };
  },
  methods: {
    handleFileUpload() {
      // get file from input field
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      // transform file to json format
      var reader = new FileReader();
      reader.readAsText(this.file, "UTF-8");
      reader.onload = evt => {
        this.post(evt.target!.result);
      }
      reader.onerror = evt => {
        alert('error while loading the file');
      }
    },
    post(graph: any) {
      axios({
        method: "post",
        url: "/api",
        data: {
          graph: graph
        }
      }).then(resolve => {
          console.log(resolve);
        })
        .catch(error => {
          alert('error while uploading the file')
        });
    },
    downloadExampleFile() {

    }
  },
  components: {
    TheHeader
  }
});
</script>
