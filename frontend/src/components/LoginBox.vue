<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input id="name" ref="name" type="text" placeholder="name" class="btn btn-secondary btn-lg" v-on:keyup.enter="submitPass"/>
        <input id="password" ref="password" type="password" placeholder="password" class="btn btn-secondary btn-lg" v-on:keyup.enter="submitPass"/>
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
    submitPass(): void {
      let inputElement: HTMLInputElement = <HTMLInputElement>this.$refs.password;
      let inputElementname: HTMLInputElement = <HTMLInputElement>this.$refs.name;
      if(inputElement.value) {
        this.password=inputElement.value;
        this.name=inputElementname.value;
        this.loginService.verifyLoginData(this.name,this.password)
        .then(result => {
          var loggedin = result;
          this.$emit('loginOK', loggedin);
        })
        .catch(reject => {
          this.$emit('errorWithLogin');
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
.btn::placeholder {
  color:white;
}

</style>
