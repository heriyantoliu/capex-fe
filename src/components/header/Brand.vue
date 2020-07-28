<template>
  <div class="m-stack__item m-brand m-brand--skin-dark">
    <div class="m-stack m-stack--ver m-stack--general">
      <div class="m-stack__item m-stack__item--middle m-brand__logo">
        <a href="index.html" class="m-brand__logo-wrapper">
          <img alt src="/assets/sido-sm.png" />
        </a>
      </div>
      <div class="m-stack__item m-stack__item--middle m-brand__tools">
        <!-- BEGIN: Left Aside Minimize Toggle -->
        <a
          href="javascript:;"
          id="m_aside_left_minimize_toggle"
          class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block"
        >
          <span></span>
        </a>

        <!-- END -->

        <!-- BEGIN: Responsive Aside Left Menu Toggler -->
        <a
          href="javascript:;"
          class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block"
          @click="toggleLeftPanel((showLeftPanel = !showLeftPanel))"
        >
          <span></span>
        </a>

        <!-- END -->

        <!-- BEGIN: Responsive Header Menu Toggler -->
        <a
          id="m_aside_header_menu_mobile_toggle"
          href="javascript:;"
          class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block"
        >
          <span></span>
        </a>

        <!-- END -->

        <!-- BEGIN: Topbar Toggler -->
        <!-- <a
          id="m_aside_header_topbar_mobile_toggle"
          href="javascript:;"
          class="m-brand__icon m--visible-tablet-and-mobile-inline-block"
        >
          <i class="flaticon-more"></i>
        </a>-->
        <button
          class="m-brand__icon m--visible-tablet-and-mobile-inline-block"
          @click="toggleMore((showMore = !showMore))"
        >
          <i class="flaticon-more"></i>
        </button>

        <!-- BEGIN: Topbar Toggler -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMore: false,
      showLeftPanel: false
    };
  },
  methods: {
    toggleMore(show) {
      if (show) {
        document.body.classList.add('m-topbar--on');
      } else {
        document.body.classList.remove('m-topbar--on');
      }
    },
    toggleLeftPanel(show) {
      var element = document.getElementById('m_aside_left');
      let elementDiv;
      if (show) {
        document.body.classList.add('m-aside-left--on');
        element.classList.add('m-aside-left--on');
        elementDiv = document.createElement('div');
        elementDiv.setAttribute('id', 'leftpanel');
        elementDiv.classList.add('m-aside-left-overlay');
        element.appendChild(elementDiv);
      } else {
        document.body.classList.remove('m-aside-left--on');
        element.classList.remove('m-aside-left--on');
        elementDiv = document.getElementById('leftpanel');
        element.removeChild(elementDiv);
      }
    }
  }
};
</script>

<style></style>
