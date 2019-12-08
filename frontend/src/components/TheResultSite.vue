<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
        <h1 class="display-4">This is your score:</h1>
        <h1 id="score" class="display-4">
          <b>{{ this.result.getScore() }}</b>
        </h1>

        <transition-group name="fade" mode="out-in">
          <h3 key="1" v-if="showAdvice">We recommend</h3>
          <div key="2" v-if="showAdvice">
            <div v-for="advice in recommendations" :key="advice">
              <div v-html="advice"></div>
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
      return {
        result: new Result(1, []),
        score: 0,
        showAdvice: false,
        recommendations: [""],
      }
    },
    created() {
      if(this.$route && this.$route.params.result) {
          let resultJSON = JSON.parse(this.$route.params.result);
          this.result = new Result(resultJSON.score, resultJSON.recommendations);
      }
      if(this.result.getRecommendations().length == 1
        || (this.result.getRecommendations().length == 1 && this.result.getRecommendations()[0] == "")) {
        this.result.getRecommendations().push("No recommendations available");
      }
    },
    components: {
      TheHeader
    },
    methods: {
      countDown() {
        var this2 = this;
        setInterval(function() {
          if (this2.score * 4 < this2.result.getScore()) {
            this2.score++;
          }
          if (this2.score * 2 < this2.result.getScore()) {
            this2.score++;
          }
          if (this2.score < this2.result.getScore()) {
            this2.score++;
          }
          else {
            if (!this2.showAdvice) {
              this2.showAdvice = true;
              var i = -1;

              setInterval(function() {
                if (this2.recommendations != null
                    && i < this2.recommendations.length
                    && i >= 0) {
                  this2.recommendations.push(this2.result.getRecommendations()[i]);
                }
                i++;
              }, 600);
            }
          }
        }, 10);
      }
    },
    beforeMount() {
      this.countDown();
    }
  });
</script>

<style lang="scss" scoped>
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
