<template>
  <div class="px-5 py-3">
    <p class="speech-bubble question">{{question}}</p>

    <question-box
      :question="this.question.getQuestion()"
      :possibleAnswers="this.question.getPossibleAnswers()"
      :lastQuestion="this.question.isLastQuestion()"
      @answerPicked="updateAnswer"
    />
    <inputfield-answer/>
    <choice-answer/>
    <result-site-answer/>
    
    <answer-box :answer="this.pickedAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "./../model/Question";
import { Answer } from "./../model/Answer";
import QuestionBox from "./QuestionBox.vue";
import AnswerBox from "./AnswerBox.vue";
import InputfieldAnswer from "./InputfieldAnswer";
import ChoiceAnswer from "./ChoiceAnswer";
import ResultSiteAnswer from "./ResultSiteAnswer";

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
        console.log(this.$props);
      //this.$data.pickedAnswer = targetdId;
      this.$emit("processNextQuestion", event.getTargetId());
    }
  },
  components: {
    QuestionBox,
    AnswerBox,
    InputfieldAnswer,
    ChoiceAnswer,
    ResultSiteAnswer
  }
});
</script>
