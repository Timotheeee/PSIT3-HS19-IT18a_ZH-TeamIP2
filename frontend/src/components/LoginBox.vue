<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input id="name"
               ref="name"
               type="text"
               placeholder="name"
               class="btn btn-secondary btn-lg"
               v-on:keyup.enter="submitUserdata"/>
        <input id="password"
               ref="password"
               type="password"
               placeholder="password"
               class="btn btn-secondary btn-lg"
               v-on:keyup.enter="submitUserdata"/>
      </label>
      <button id="userDataSubmit"
              type="button"
              class="btn btn-secondary btn-lg mt-3 mb-3"
              @click="submitUserdata">Submit</button><br>
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
        name: '',
        password: '',
      }
    },
    props: {
      loginService: {
        type: LoginService,
        required: true
      }
    },
    methods: {
      submitUserdata(): void {
        let inputElementPassword: HTMLInputElement = <HTMLInputElement>this.$refs.password;
        let inputElementName: HTMLInputElement = <HTMLInputElement>this.$refs.name;
        this.password = inputElementPassword.value;
        this.name = inputElementName.value;

        this.loginService.verifyLoginData(this.name, this.password)
          .then(result => {
            let loggedin: boolean = result;
            this.$emit('loginOK', loggedin);
          })
          .catch(reject => {
            this.$emit('errorWithLogin');
          })
      }
    }
  })
</script>

<style lang="scss" scoped>
  .btn::placeholder {
    color: white;
  }
</style>
