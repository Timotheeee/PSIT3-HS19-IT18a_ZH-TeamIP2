<template>
    <div class="header container-fluid shadow-sm">
        <b-img rounded="circle" src="images/projectLogo.jpg" class="p-2 logo"></b-img>
        <span class="h1 align-middle">StudentScore</span>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "TheHeader"
});
</script>

<style lang="scss">
    $header-color: #e6e6e6;

    .logo {
        width: 100px;
        height: 100px;
    }

    .header {
        background-color: $header-color;
    }
</style>


