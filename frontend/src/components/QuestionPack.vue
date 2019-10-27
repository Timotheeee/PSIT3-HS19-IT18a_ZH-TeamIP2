<template>
  <div class="px-5 py-3">
    <question-box
      :question="this.question.getQuestion()"
      :possibleAnswers="this.question.getPossibleAnswers()"
      :lastQuestion="this.question.isLastQuestion()"
      @answerPicked="updateAnswer"
    />
    <answer-box :answer="this.pickedAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "./../model/Question";
import { Answer } from "./../model/Answer";
import QuestionBox from "./QuestionBox.vue";
import AnswerBox from "./AnswerBox.vue";
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
    updateAnswer(id: Number, text: String) {
      this.$data.pickedAnswer = text;
      this.$emit("processNextQuestion", this.$props.question.getId(), id);
    }
  },
  components: {
    QuestionBox,
    AnswerBox
  }
});
</script>
