<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
        <login-box v-if="!loggedin"
        :loginService="this.loginService"
        @loginOK="updateViewToUpload"
        @errorWithLogin="makeToast('warning', loginErrorTitle, loginErrorBody)" />
        <upload-box v-else
        @successfullUpload="makeToast('success', fileUploadSuccessTitle, fileUploadSuccessBody)"
        @errorWithFile="makeToast('warning', fileUploadErrorTitle, fileUploadErrorBody)"
        @logout="logout" />

        <graph-visualizer v-if="loggedin"></graph-visualizer>

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
import GraphVisualizer from './GraphVisualizer.vue';
import { LoginService } from '../services/LoginService';

export default Vue.extend({
  name: 'AdminPage',
  data() {
    return {
      loggedin:false,
      loginService: new LoginService(),
      loginSuccessfulTitle: "Success!",
      loginNotSuccessfulTitle: "Something went wrong!",
      loginSuccessfulBody: "You're logged in.",
      loginNotSuccessfulBody: "Password or username was wrong.",
      loginErrorTitle: "Error with login.",
      loginErrorBody: "There was an error with the login. Please try again",
      fileUploadSuccessTitle: "File upload successfully!",
      fileUploadSuccessBody: "File was uploaded to the server and saved.",
      fileUploadErrorTitle: "File coulnd't be uploaded!",
      fileUploadErrorBody: "There was an error with the file upload. Please try again."
    };
  },
  methods: {
    updateViewToUpload(loggedin: boolean) {
      this.loggedin = loggedin;
      loggedin ? this.makeToast('success', this.loginSuccessfulTitle, this.loginSuccessfulBody) :
                 this.makeToast('danger', this.loginNotSuccessfulTitle, this.loginNotSuccessfulBody);
    },
    goTo(route: string): void {
      this.$router.push(route);
    },
    makeToast(variant: string, title: string, bodyContent: string) {
        this.$bvToast.toast(bodyContent, {
          title: title,
          variant: variant,
          solid: true
        })
    },
    logout() {
      this.loggedin = false;
      this.loginService.logout();
    },
    checkIfTokenStillValid() {
      console.log("check");
      this.loginService.checkIfTokenStillValid()
      .then(result => {
      this.loggedin = result;
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  created() {
    this.checkIfTokenStillValid();
  },
  components: {
    TheHeader,
    LoginBox,
    UploadBox,
    GraphVisualizer
  }
});
</script>


<style lang="scss" scoped>

#password::placeholder {
  color: white;
}

</style>

