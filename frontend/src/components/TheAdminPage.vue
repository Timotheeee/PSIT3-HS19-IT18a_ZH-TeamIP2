<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <div class="jumbotron text-center jumbotron-fluid">
        <the-header />
        <login-box v-if="!loggedin" @answerFromServer="updateViewToUpload" />
        <upload-box v-else />
        <button
          id="goToWelcomePage"
          @click="goTo('/welcome')"
          type="button"
          class="btn btn-secondary btn-lg">Go to Welcome page</button><br>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './TheHeader.vue';
import LoginBox from './LoginBox.vue';
import UploadBox from './UploadBox.vue';

export default Vue.extend({
  name: 'AdminPage',
  data() {
    return {
      loggedin:false,
    };
  },
  methods: {
    updateViewToUpload(loggedin: boolean) {
      this.loggedin = loggedin;
    },
    goTo(route: string): void {
      this.$router.push(route);
    }
  },
  components: {
    TheHeader,
    LoginBox,
    UploadBox
  }
});
</script>


<style lang="scss" scoped>

#password::placeholder {
  color: white;
}

</style>

