<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
        <h1 class="display-4">This is your score:</h1>
        <h1 id="score" class="display-4">
          <b>{{ this.score }}</b>
        </h1>

        <transition-group name="fade" mode="out-in">
          <h3 key="1" v-if="showadvice">StudentScore's advices for you are:</h3>
          <div key="2" v-if="showadvice">
            <div v-for="advice in advices" :key="advice">
              <p class="lead advice">{{advice}}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './TheHeader.vue';
import {Result} from './../model/Result';

export default Vue.extend({
  data() {
    // v-if={}
    if(this.$route) {
      var resultJSON = JSON.parse(this.$route.params.result);
      var result = new Result(resultJSON.score, resultJSON.recommendations);
    } else {
      result = new Result(1, []);
    }

    return {
      score: 0,
      finalscore: Number(result.getScore()),
      showadvice: false,
      advices: [""],
      advices2: result.getRecommendations()
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
        } else {
          if (!this2.showadvice) {
            this2.showadvice = true;
            var i = -1;
            setInterval(function() {
              if (this2.advices2 != null && i < this2.advices2.length && i >= 0) {
                this2.advices.push(this2.advices2[i]);
              }
              i++;
            }, 600);
          }
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
@import '../css/colors';

#jumbotron {
  overflow-y: scroll;
  height: calc(100vh - 100px);
  display: grid;
  background-color: $surface;
}

#score {
  margin-bottom: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s;
}

.fade-enter,
.fade-leave-to {
  opacity: 1;
  transform: scale(3);
}
</style>

