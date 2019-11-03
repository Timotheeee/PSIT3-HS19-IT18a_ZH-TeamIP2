<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
          <h1 id="title" class="display-3">Welcome to StudentScore!</h1>
          <p class="lead">{{this.textStudentScore}}</p>

          <h5 class="text">Before we start, type in a username!</h5>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-col sm="3" class="formInput" >
          <b-form-input
            v-model="form.username"
            placeholder="Enter username"
          ></b-form-input>
          </b-col>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>

        </b-form>

          <button id="goToQuestionnaire" @click="goTo('/questionnaire')" type="button" class="btn btn-secondary btn-lg">Start StudentScore!</button>
          <button id="goToAdminPage" @click="goTo('/adminpage')" type="button" class="btn btn-secondary btn-lg">Go to Adminpanel</button>

          <h5>StudentScore Members</h5>
              <ul id="teammembers" class="list-inline">
                <li class="list-inline-item">Semanur Cerkez</li>
                <li class="list-inline-item">Lars Höhener</li>
                <li class="list-inline-item">Timothé Laborie</li>
                <li class="list-inline-item">Michael Schlaubitz</li>
                <li class="list-inline-item">Patric (Ryan) Steiger</li>
                <li class="list-inline-item">Erwin Tran</li>
              </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './TheHeader.vue';
import {Username} from "../model/Username";

export default Vue.extend({
  name: 'WelcomeSite',
  data() {
    return {
      textStudentScore: "Our goal is to rethink surveys with a chat-like interface.",
      textUsername: "Before we start, type in a username!",
      form: {
        username: ''
    },
    show: true
  }
  },
  components: {
    TheHeader
  },
  created() {},
  methods: {
    goTo(route: string): void {
      this.$router.push(route);
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert("You chose " + this.form.username + " as your username.\nNow click on the button down there ↓ to start StudentScore!")
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.username = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
});
</script>

<style lang="scss" scoped>
.lead {
  margin-bottom: 60px;
}

.btn {
  margin-bottom: 60px;
}

.text {
  margin-bottom: 30px;
}

.formInput {
  margin: 0 auto 20px;
  float: none;
}

</style>
