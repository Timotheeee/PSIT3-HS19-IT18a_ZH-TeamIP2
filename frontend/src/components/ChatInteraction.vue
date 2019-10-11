<template>
  <div>
    <chat-box :question="this.question1" />
    <chat-box :question="this.question2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatBox from "./ChatBox.vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"


export default Vue.extend({
    data() {
      return {
        question1: new Question(1, "How much did you sleep?"),
        question2: new Question(2, "Hello?")
      }
    },
    components: {
      ChatBox
    },
    created() {
      this.question1.addPossibleAnswer(new Answer(1, 'below 6 hours'));
      this.question1.addPossibleAnswer(new Answer(2, '6 to 8 hours'));
      this.question1.addPossibleAnswer(new Answer(3, 'over 8 hours'));

      this.question2.addPossibleAnswer(new Answer(1, 'yes'));
      this.question2.addPossibleAnswer(new Answer(2, 'no'));
      this.question2.addPossibleAnswer(new Answer(3, 'ok'));
    }
});
</script>
