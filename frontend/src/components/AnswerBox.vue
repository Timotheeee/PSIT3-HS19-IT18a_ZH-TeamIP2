<template>
  <div>
      <p class="speech-bubble answer float-right" v-if="answer">{{ resultMessage }}</p>
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
        return this.answer;
      }
    }
});
</script>

<style lang="scss">
  @import "../css/colors";
  @import "../css/speech-bubble";
</style>
