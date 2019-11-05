<template>
    <div class="speech-bubble possible-answer text-left" v-if="showAnswer">
      <b-col sm="3" class="formInput" >
        <b-form-input
          v-model="form.username"
          placeholder="Enter username"
        ></b-form-input>

      </b-col>
        <b-button-group vertical>
          <button v-for="answer in possibleAnswers"
                  :key="answer.id"
                  class="possible-answer"
                  v-on:click="onButtonClick(answer)"
                  :name="question"
                  :value="answer.getAnswer()"
          >{{answer.answer}}</button>
        </b-button-group>
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
      possibleAnswers: {
        type: Array,
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
