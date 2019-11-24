<template>
  <div vertical class="speech-bubble possible-answer d-inline-flex text-left" v-if="showAnswer">
    <div v-for="answer in possibleAnswers">
      <input type="text" v-model="userInput" :placeholder="[[answer.getAnswer()]]" class="text">
      <button :key="answer.id"
              class="possible-answer"
              v-on:click="onButtonClick(answer)"
      >Enter</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { EventBus } from "../event-bus";
  import { Answer } from "./../model/Answer";

  export default Vue.extend({
    name: "InputAnswer",
    data() {
      return {
        showAnswer: true,
        userInput: ""
      };
    },
    props: {
      possibleAnswers: {
        type: Array,
        required: true
      }
    },
    methods: {
      onButtonClick(event: Answer) {

        let username = this.$data.userInput;
        if(username != "") {
            event.setAnswer(username);
        }

        // set the username for the questions
        EventBus.$emit("setUsername", event.getAnswer());

        this.$emit("answerPicked", event);
        this.showAnswer = false;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import "../css/colors";
  @import "../css/speech-bubble";

.text {
  margin-left: 15px;
  border-color: transparent;
}

  ::placeholder {
    color: lightgrey;
    text-align: center;
  }
</style>
