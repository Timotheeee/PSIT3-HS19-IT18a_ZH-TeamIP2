<template>
  <div class="w-100 min-vh-100 background">
    <div class="container p-0 shadow-lg">
      <the-header />
      <div class="jumbotron text-center jumbotron-fluid">
          <h1 class="display-3">Welcome to StudentScore!</h1>
          <p class="lead">{{this.textStudentScore}}</p>

          <button @click="goTo('/questionnaire')" type="button" class="btn btn-secondary btn-lg">Start StudentScore!</button>
          <button @click="goTo('/adminpage')" type="button" class="btn btn-secondary btn-lg">Go to Adminpanel</button>

          <h5>StudentScore Members</h5>
              <ul class="list-inline">
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
import Vue from "vue";
import TheHeader from "./TheHeader.vue";

export default Vue.extend({
  data() {
    return {
      textStudentScore: "Our goal is to rethink surveys with a chat-like interface."
    };
  },
  components: {
    TheHeader
  },
  created() {},
  methods: {
    goTo(route: string): void {
      this.$router.push(route);
    }
  }
});
</script>

<style lang="scss">
.lead {
  margin-bottom: 60px;
}

.btn {
  margin-bottom: 60px;
}


</style>
