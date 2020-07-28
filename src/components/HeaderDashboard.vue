<template>
  <header
    id="m_header"
    class="m-grid__item m-header"
    m-minimize-offset="200"
    m-minimize-mobile-offset="200"
  >
    <div class="m-container m-container--fluid m-container--full-height">
      <div class="m-stack m-stack--ver m-stack--desktop">
        <brand></brand>

        <div
          class="m-stack__item m-stack__item--fluid m-header-head"
          id="m_header_nav"
        >
          <!-- <horizontal-menu></horizontal-menu> -->
          <top-bar></top-bar>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Brand from './header/Brand.vue';
import TopBar from './header/TopBarDashboard.vue';
export default {
  name: 'HeaderDashboard',
  components: {
    Brand,
    TopBar
  },
  created() {
    // $(document).ready(function() {
    //   mQuickSidebar.init();
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
