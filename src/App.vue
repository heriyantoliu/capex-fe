<template>
  <div class="m-grid m-grid--hor m-grid--root m-page">
    <!-- <v-app> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view></router-view>
    <!-- </v-app> -->
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
.sm_toast {
  max-width: 350px;
  overflow: hidden;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  border: 1px solid;
}

.sm_toast__body {
  padding: 0.75rem;
  text-align: center;
}
</style>
