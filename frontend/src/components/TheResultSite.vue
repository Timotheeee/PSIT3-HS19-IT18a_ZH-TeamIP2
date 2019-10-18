<template>
   <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
          <h1 class="display-4">This is your score:</h1>
          <h1 id="score" class="display-4"><b>{{ this.score }}</b></h1>

          <h3>StudentScore's advices for you are:</h3>
          <div v-for="advice in advices">
            <p class="lead">{{advice}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "./TheHeader.vue";
import ICountUp from 'vue-countup-v2'

export default Vue.extend({
  data() {
    return {
      score: 70,
      advices: [
        "your such a bad student", "holy are you a bad student", "flextape can't fix your student habits"
      ]
    };
  },
  components: {
    TheHeader
  }
});
</script>

<style lang="scss">
  @import "../css/colors";

#jumbotron {
    overflow-y: scroll;
    height: calc(100vh - 100px);
    display: grid;
    background-color: $surface;
  }

#score {
  margin-bottom: 60px;
}

</style>
