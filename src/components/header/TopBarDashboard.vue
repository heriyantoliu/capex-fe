<template>
  <div id="m_header_topbar" class="m-topbar m-stack m-stack--ver m-stack--general m-stack--fluid">
    <div class="m-stack__item m-topbar__nav-wrapper">
      <ul class="m-topbar__nav m-nav m-nav--inline">
        <!-- <search></search>
        <notification></notification>
        <quick-action></quick-action>-->
        <profile></profile>
        <!-- <grid-menu></grid-menu> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Profile from "./topbar/Profile.vue";

export default {
  components: {
    Profile
  }
};
</script>

<style>
</style>
