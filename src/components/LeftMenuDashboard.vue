<template>
  <div>
    <button
      class="m-aside-left-close m-aside-left-close--skin-dark"
      id="m_aside_left_close_btn"
      @click="toggleLeftPanel((showLeftPanel = !showLeftPanel))"
    >
      <i class="la la-close"></i>
    </button>
    <div
      id="m_aside_left"
      class="m-grid__item m-aside-left m-aside-left--skin-dark"
    >
      <!-- BEGIN: Aside Menu -->
      <div
        id="m_ver_menu"
        class="m-aside-menu m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark"
        m-menu-vertical="1"
        m-menu-scrollable="1"
        m-menu-dropdown-timeout="500"
        style="position: relative;"
      >
        <ul class="m-menu__nav m-menu__nav--dropdown-submenu-arrow">
          <li class="m-menu__item aria-haspopup=true">
            <!-- <a href class="m-menu__link"> -->
            <div class="m-menu__link">
              <i class="m-menu__link-icon flaticon-line-graph"></i>
              <span class="m-menu__link-title">
                <span class="m-menu__link-wrap">
                  <span class="m-menu__link-text">My Capex</span>
                  <span class="m-menu__link-badge"></span>
                </span>
              </span>
            </div>
            <!-- </a> -->
          </li>

          <li class="m-menu__section">
            <h4 class="m-menu__section-text">Capex Request</h4>
            <i class="m-menu__section-icon flaticon-more-v2"></i>
          </li>

          <li
            class="m-menu__item m-menu__item--submenu m-menu__item--open m-menu__item--expanded"
            aria-haspopup="true"
            m-menu-submenu-toggle="hover"
          >
            <!-- <a href="javascript:;" class="m-menu__link m-menu__toggle"> -->
            <div class="m-menu__link m-menu__toggle">
              <i class="m-menu__link-icon flaticon-file-1"></i>
              <span class="m-menu__link-text">Capex</span>
              <i class="m-menu__ver-arrow la la-angle-right"></i>
            </div>
            <!-- </a> -->
            <div class="m-menu__submenu">
              <span class="m-menu__arrow"></span>
              <ul class="m-menu__subnav">
                <li
                  class="m-menu__item m-menu__item--active"
                  aria-haspopup="true"
                >
                  <router-link to="/myCapex" class="m-menu__link">
                    <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                      <span></span>
                    </i>
                    <span class="m-menu__link-text">Create by Me</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="m-menu__submenu">
              <span class="m-menu__arrow"></span>
              <ul class="m-menu__subnav">
                <li
                  class="m-menu__item m-menu__item--active"
                  aria-haspopup="true"
                >
                  <router-link to="/waitAppr" class="m-menu__link">
                    <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                      <span></span>
                    </i>
                    <span class="m-menu__link-text">Waiting My Approval</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="m-menu__submenu">
              <span class="m-menu__arrow"></span>
              <ul class="m-menu__subnav">
                <li
                  class="m-menu__item m-menu__item--active"
                  aria-haspopup="true"
                >
                  <router-link to="/create" class="m-menu__link">
                    <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                      <span></span>
                    </i>
                    <span class="m-menu__link-text">Create Capex Request</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- END: Aside Menu -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLeftPanel: false
    };
  },
  methods: {
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
