<template>
  <div class="header container-fluid">
    <b-img rounded="circle" @click="goTo('/welcome')" src="images/projectLogo.jpg" class="p-2 logo"></b-img>
    <span class="h1 align-middle">StudentScore</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TheHeader",
  methods: {
    goTo(route: string): void {
      this.$router.push(route);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../css/colors";
.logo {
  width: 100px;
  height: 100px;
}
.header {
  background-color: $surface-dark;
}
</style>
