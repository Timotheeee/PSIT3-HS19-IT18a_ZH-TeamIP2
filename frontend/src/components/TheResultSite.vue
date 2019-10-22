<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
        <h1 class="display-4">This is your score:</h1>
        <h1 id="score" class="display-4">
          <b>{{ this.score }}</b>
        </h1>

        <h3>StudentScore's advices for you are:</h3>
        <div v-for="advice in advices">
          <p class="lead" v-if="showadvice">{{advice}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "./TheHeader.vue";

export default Vue.extend({
  data() {// v-if={}
    return {
      score: 0,
      finalscore: 30,
      showadvice:false,
      advices: [
        "your such a bad student",
        "holy are you a bad student",
        "flextape can't fix your student habits"
      ]
    };
  },
  components: {
    TheHeader
  },
  methods: {
    countDown() {
      var this2 = this;
      setInterval(function() {
        if (this2.score * 4 < this2.finalscore) {
          this2.score++;
        }
        if (this2.score * 2 < this2.finalscore) {
          this2.score++;
        }
        if (this2.score < this2.finalscore) {
          this2.score++;
        } else{
          this2.showadvice=true;
        }
      }, 50);
    }
  },
  beforeMount() {
    this.countDown();
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
