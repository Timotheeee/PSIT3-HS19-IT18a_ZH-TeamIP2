<template>
  <div>
      <h2>{{answer}}</h2>
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
    
    data() {
      return {
        answer: ""
      };
    }
});
</script>
