<template>
  <div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Answer } from "./../model/Answer";
export default Vue.extend({
  name: "QuestionBox",
  data() {
    return {
      showAnswer: true
    };
  },
  props: {
    question: {
      type: String,
      required: true
    },
    possibleAnswers: {
      type: Array,
      required: true
    },
    lastQuestion: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    onButtonClick(event: Answer) {
      this.$emit("answerPicked", event);
      this.showAnswer = false;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../css/colors";
@import "../css/speech-bubble";
</style>
