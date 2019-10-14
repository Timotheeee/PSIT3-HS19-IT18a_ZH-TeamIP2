<template>
  <div class="w-100 min-vh-100 background">
    <div class="container chat min-vh-100 p-0 shadow-lg">
      <the-header />
        <chat-box class="chatbox" :question="this.question1" />
        <chat-box class="chatbox" :question="this.question2" />
      </div>
    <the-footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatBox from "./ChatBox.vue";
import {Question} from "./../Question";
import {Answer} from "./../Answer"
import TheHeader from './TheHeader.vue';


export default Vue.extend({
    data() {
      return {
        question1: new Question(1, "How much did you sleep?"),
        question2: new Question(2, "Hello?")
      }
    },
    components: {
      ChatBox,
      TheHeader
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
