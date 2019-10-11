<template>
  <div>
    <chat-box />
    <chat-box />
    <chat-box />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatBox from "./ChatBox.vue";


export default Vue.extend({
    components: {
      ChatBox
    }
});
</script>
