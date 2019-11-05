<template>
  <div>
    <p class="speech-bubble question">{{question}}</p>

    <b-button-group vertical class="speech-bubble possible-answer text-left" v-if="showAnswer" @keyup='selectAnswer'>
      <button v-for="answer in possibleAnswers"
        :key="answer.id"
        class="possible-answer"
        :class='{"active-item": currentItem == answer.id}'
        v-on:click="onButtonClick(answer)"
        :name="question"
        ref="asdf"
        :value="answer.getAnswer()"
        v-if="!lastQuestion"
      >{{answer.answer}}</button>
      <button id="goToResultPage"
        class="possible-answer"
        v-for="answer in possibleAnswers"
        :key="answer.id"
        type="submit"
        :name="question"
        :value="answer"
        v-else
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
      currentItem: 0,
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
    }
  },
  methods: {
    onButtonClick(event: Answer) {
      this.$emit("answerPicked", event);
      this.showAnswer = false;
      document.removeEventListener("keyup", this.selectAnswer);
    },
    selectAnswer(e: KeyboardEvent) {
      if(e.key == "ArrowUp" && this.currentItem > 1) {
        this.currentItem--;
      }
      else if(e.key == "ArrowDown" && this.currentItem < this.possibleAnswers.length) {
        this.currentItem++;
      }
      else if((e.key == "Enter" || e.key == "ArrowRight") && this.currentItem != 0) {
          /*
        var activeItem = document.getElementsByClassName("active-item")[0];
        (activeItem as HTMLElement).click();
           */
        var answer = this.possibleAnswers[0];
        console.log("!!!!!!!!!");
        console.log(answer);
        console.log(answer as Answer);
        this.onButtonClick(answer as Answer);
      }
    }
  },
  mounted () {
    document.addEventListener("keyup", this.selectAnswer);
  },
  destroyed () {
    // to avoid memory leaks
    document.removeEventListener("keyup", this.selectAnswer)
  }
});
</script>

<style lang="scss" scoped>
@import "../css/colors";
@import "../css/speech-bubble";
</style>
