<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input id="file" type="file" ref="file" class="btn btn-secondary btn-lg" @change="handleFileUpload"/>
      </label>
      <button id="submitFile" type="button" class="btn btn-secondary btn-lg" @click="submitFile">Submit</button><br>
      <button id="logout" type="button" class="btn btn-secondary btn-lg" @click="logout">Logout</button><br>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { GraphService } from './../services/GraphService';

export default Vue.extend({
  name: 'UploadBox',
  data() {
    return {
      file: new Blob([""]),
      graphService: new GraphService()
    }
  },
  methods: {
    handleFileUpload() {
      // get file from input field
      let inputElement: HTMLInputElement = (<HTMLInputElement>this.$refs.file);

      if(inputElement.files) {
        this.file = inputElement.files[0];
      } else {
        this.$emit("errorWithFile");
      }
    },
    submitFile() {
      // transform file to json format
      var reader = new FileReader();
      reader.readAsText(this.file, "UTF-8");
      reader.onload = evt => {
        const graphString: string = evt.target!.result!.toString();
        this.graphService.post(graphString)
        .then(result => {

          if(result) {
            this.$emit("successfullUpload");
          } else {
            this.$emit("errorWithFile");
          }
        })
        .catch(error => {
          this.$emit("errorWithFile");
        })
      }
      reader.onerror = evt => {
        this.$emit("errorWithFile");
      }
    },
    logout() {
      this.$emit("logout");
    }
  }
})
</script>

<style lang="scss" scoped>

.btn {
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>

