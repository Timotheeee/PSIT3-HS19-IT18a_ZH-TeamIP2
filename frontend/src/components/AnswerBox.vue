<template>
  <div>
      <h2 v-if="answer">{{ resultMessage }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "AnswerBox",
    props: {
        answer: {
            type:String
        }
    },
    computed: {
      resultMessage: function(): string {
        return "Your answer was: " + this.answer;
      }
    }
});
</script>
