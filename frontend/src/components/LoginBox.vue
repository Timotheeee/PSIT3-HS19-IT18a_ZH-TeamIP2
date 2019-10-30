<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input id="password" ref="password" type="password" placeholder="password" class="btn btn-secondary btn-lg"/>
      </label>
      <button id="passwordsubmit" type="button" class="btn btn-secondary btn-lg" @click="submitPass">Submit</button><br>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { LoginService } from './../services/LoginService';

export default Vue.extend({
  name: 'LoginBox',
  data() {
    return {
      password: ''
    }
  },
  methods: {
    submitPass(): void {
      let inputElement: HTMLInputElement = <HTMLInputElement>this.$refs.password;
      if(inputElement.value) {
        this.password=inputElement.value;
        var loginService: LoginService = new LoginService();
        loginService.checkPassword(this.password)
        .then(result => {
          var loggedin = result;
          this.$emit('answerFromServer', loggedin);
        })
        .catch(reject => {
          // password could not be checked from the server
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>

.btn {
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
