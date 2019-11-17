<template>
  <div class="px-5 py-3">
    <p class="speech-bubble question">{{question.getQuestion()}}</p>

    <input-answer
      :possibleAnswers="this.question.getPossibleAnswers()"
      @answerPicked="updateAnswer"
      v-if="question.getAnswerType() == 'input'"/>
    <result-answer
      :possibleAnswers="this.question.getPossibleAnswers()"
      @answerPicked="updateAnswer"
      v-else-if="question.isFinalQuestion()"/>
    <choice-answer
      :possibleAnswers="this.question.getPossibleAnswers()"
      @answerPicked="updateAnswer"
      v-else/>

    <answer-box :answer="this.pickedAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "./../model/Question";
import { Answer } from "./../model/Answer";
import AnswerBox from "./AnswerBox.vue";
import InputAnswer from "./InputAnswer.vue";
import ChoiceAnswer from "./ChoiceAnswer.vue";
import ResultAnswer from "./ResultAnswer.vue";

export default Vue.extend({
  data() {
    return {
      pickedAnswer: ""
    };
  },
  props: {
    question: {
      type: Question,
      required: true
    }
  },
  methods: {
    updateAnswer(event: Answer) {
      this.$data.pickedAnswer = event.getAnswer();
      this.$emit("processNextQuestion", event.getTargetId());
    }
  },
  components: {
    AnswerBox,
    InputAnswer,
    ChoiceAnswer,
    ResultAnswer
  }
});
</script>

<style lang="scss" scoped>
  @import "../css/colors";
  @import "../css/speech-bubble";
</style>
