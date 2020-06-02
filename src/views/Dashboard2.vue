<template>
  <div>
    <header
      id="m_header"
      class="m-grid__item m-header"
      m-minimize-offset="200"
      m-minimize-mobile-offset="200"
    >
      <div class="m-container m-container--fluid m-container--full-height">
        <div class="m-stack m-stack--ver m-stack--desktop">
          <div class="m-stack__item m-brand m-brand--skin-dark">
            <div class="m-stack m-stack--ver m-stack--general">
              <div class="m-stack__item m-stack__item--middle m-brand__logo">
                <a href="index.html" class="m-brand__logo-wrapper">
                  <img alt src="/assets/sido-sm.png" />
                </a>
              </div>
              <div class="m-stack__item m-stack__item--middle m-brand__tools">
                <!-- <a
                    href="javascript:;"
                    id="m_aside_left_minimize_toggle"
                    class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block"
                    @click="toggleLeftPanel(showLeftPanel = !showLeftPanel)"
                  >
                    <span></span>
                </a>-->

                <button
                  class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block"
                  @click="toggleLeftPanel(showLeftPanel = !showLeftPanel)"
                >
                  <span></span>
                </button>

                <!-- <a
                    href="javascript:;"
                    id="m_aside_left_offcanvas_toggle"
                    class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block"
                  >
                    <span></span>
                </a>-->

                <button
                  class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block"
                  :class="{'m-brand__toggler--active': showLeftPanelMobile}"
                  @click="toggleLeftPanelMobile(showLeftPanelMobile = !showLeftPanelMobile)"
                >
                  <span></span>
                </button>

                <!-- <a
                    id="m_aside_header_topbar_mobile_toggle"
                    href="javascript:;"
                    class="m-brand__icon m--visible-tablet-and-mobile-inline-block"
                  >
                    
                </a>-->
                <button
                  class="m-brand__icon m--visible-tablet-and-mobile-inline-block"
                  @click="toggleTopBarMenuDropdownOpen(topBarMenuDropdownOpen = !topBarMenuDropdownOpen)"
                >
                  <i class="flaticon-more"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
            <button
              class="m-aside-header-menu-mobile-close m-aside-header-menu-mobile-close--skin-dark"
              id="m_aside_header_menu_mobile_close_btn"
            >
              <i class="la la-close"></i>
            </button>
            <div
              id="m_header_menu"
              class="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas m-header-menu--skin-light m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark"
            >
              <ul class="m-menu__nav m-menu__nav--submenu-arrow"></ul>
            </div>

            <div
              id="m_header_topbar"
              class="m-topbar m-stack m-stack--ver m-stack--general m-stack--fluid"
            >
              <div class="m-stack__item m-topbar__nav-wrapper">
                <ul class="m-topbar__nav m-nav m-nav--inline">
                  <li
                    class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light"
                    :class="{'m-dropdown--open': profileDropdownOpen}"
                    m-dropdown-toggle="click"
                    @click="profileDropdownOpen = !profileDropdownOpen"
                  >
                    <a href="#" class="m-nav__link m-dropdown__toggle">
                      <span class="m-topbar__userpic">
                        <img
                          src="/assets/users/img-user.png"
                          class="m--img-rounded m--marginless"
                          alt
                        />
                      </span>
                      <span class="m-topbar__username m--hide">Nick</span>
                    </a>
                    <div class="m-dropdown__wrapper">
                      <span
                        class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"
                      ></span>
                      <div class="m-dropdown__inner">
                        <div
                          class="m-dropdown__header m--align-center"
                          style="background: url(../assets/misc/user_profile_bg.jpg); background-size: cover;"
                        >
                          <div class="m-card-user m-card-user--skin-dark">
                            <div class="m-card-user__pic">
                              <img
                                src="/assets/users/img-user.png"
                                class="m--img-rounded m--marginless"
                                alt
                              />
                            </div>
                            <div class="m-card-user__details">
                              <span class="m-card-user__name m--font-weight-500">{{name}}</span>
                              <a href class="m-card-user__email m--font-weight-300 m-link">{{email}}</a>
                            </div>
                          </div>
                        </div>
                        <div class="m-dropdown__body">
                          <div class="m-dropdown__content">
                            <ul class="m-nav m-nav--skin-light">
                              <li class="m-nav__section m--hide">
                                <span class="m-nav__section-text">Section</span>
                              </li>

                              <li class="m-nav__separator m-nav__separator--fit"></li>
                              <li class="m-nav__item">
                                <button
                                  class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder"
                                  @click="logout"
                                >Logout</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- END: Topbar -->
          </div>
        </div>
      </div>
    </header>

    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
      <button
        class="m-aside-left-close m-aside-left-close--skin-dark"
        id="m_aside_left_close_btn"
        @click="showLeftPanelMobile = false"
        v-if="showLeftPanelMobile == true"
      >
        <i class="la la-close"></i>
      </button>
      <div
        id="m_aside_left"
        class="m-grid__item m-aside-left m-aside-left--skin-dark"
        :class="{'m-aside-left--on': showLeftPanelMobile}"
        @mouseover="toggleLeftMenu(true)"
        @mouseout="toggleLeftMenu(false)"
      >
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
              <!-- <a href="/" class="m-menu__link"> -->
              <router-link to="/" class="m-menu__link">
                <i class="m-menu__link-icon flaticon-line-graph"></i>
                <span class="m-menu__link-title">
                  <span class="m-menu__link-wrap">
                    <span class="m-menu__link-text">My Capex</span>
                    <span class="m-menu__link-badge"></span>
                  </span>
                </span>
              </router-link>
              <!-- </a> -->
            </li>
            <li class="m-menu__section">
              <h4 class="m-menu__section-text">Capex Request</h4>
              <i class="m-menu__section-icon flaticon-more-v2"></i>
            </li>
            <li
              class="m-menu__item m-menu__item--submenu m-menu__item--open m-menu__item--expanded"
              :class="{'m-menu__item--open': capexMenuDropdownOpen}"
              aria-haspopup="true"
              m-menu-submenu-toggle="hover"
              @click="capexMenuDropdownOpen = !capexMenuDropdownOpen"
            >
              <a href="javascript:;" class="m-menu__link m-menu__toggle">
                <i class="m-menu__link-icon flaticon-file-1"></i>
                <span class="m-menu__link-text">Capex</span>
                <i class="m-menu__ver-arrow la la-angle-up" v-if="capexMenuDropdownOpen"></i>
                <i class="m-menu__ver-arrow la la-angle-right" v-else></i>
              </a>
              <div
                class="m-menu__submenu"
                :style="capexMenuDropdownOpen ? 'display: none; overflow: hidden;' : ''"
              >
                <span class="m-menu__arrow"></span>
                <ul class="m-menu__subnav">
                  <li class="m-menu__item m-menu__item--active" aria-haspopup="true">
                    <!-- <a href="/create" class="m-menu__link"> -->
                    <router-link to="/waitAppr" class="m-menu__link">
                      <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                        <span></span>
                      </i>
                      <span class="m-menu__link-text">Waiting My Approval/Verification</span>
                    </router-link>
                    <!-- </a> -->
                  </li>

                  <li class="m-menu__item m-menu__item--active" aria-haspopup="true">
                    <!-- <a href="/create" class="m-menu__link"> -->
                    <router-link to="/create" class="m-menu__link">
                      <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                        <span></span>
                      </i>
                      <span class="m-menu__link-text">Create Capex Request</span>
                    </router-link>
                    <!-- </a> -->
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-aside-left-overlay" v-if="showLeftPanelMobile == true" @click="contentClicked"></div>
      <div class="m-grid__item m-grid__item--fluid m-wrapper" @click="contentClicked">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      showLeftPanel: true,
      showmenu: false,
      capexMenuDropdownOpen: true,
      profileDropdownOpen: false,
      topBarMenuDropdownOpen: false,
      showLeftPanelMobile: false,
      styleCapexMenuDropdown: {
        display: "none",
        overflow: "hidden"
      }
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/signin");
    },
    toggleLeftPanel(show) {
      console.log("Left Panel Show:", show);
      if (show) {
        document.body.classList.remove(
          "m-brand--minimize",
          "m-aside-left--minimize"
        );
      } else {
        document.body.classList.add(
          "m-brand--minimize",
          "m-aside-left--minimize"
        );
      }
    },
    toggleLeftPanelMobile(show) {
      console.log("Left Panel Mobile Show:", show);
      if (show) {
        document.body.classList.add("m-aside-left--on");
      } else {
        document.body.classList.remove("m-aside-left--on");
      }
    },
    toggleLeftMenu(show) {
      if (this.showLeftPanel) {
        return;
      }
      if (show) {
        document.body.classList.remove("m-aside-left--minimize");
        document.body.classList.add("m-aside-left--minimize-hover");
      } else {
        document.body.classList.add("m-aside-left--minimize");
        document.body.classList.remove("m-aside-left--minimize-hover");
      }
    },
    toggleTopBarMenuDropdownOpen(show) {
      if (show) {
        document.body.classList.add("m-topbar--on");
      } else {
        document.body.classList.remove("m-topbar--on");
        this.profileDropdownOpen = false;
      }
    },
    contentClicked() {
      this.profileDropdownOpen = false;
      // this.showLeftPanelMobile = false;
      if (this.showLeftPanelMobile) {
        document.body.classList.remove("m-aside-left--on");
        this.showLeftPanelMobile = false;
      }

      if (this.profileDropdownOpen) {
      }
      // document.body.classList.remove(
      //   "m-aside-left--minimize-hover",
      //   "m-aside-left--on"
      // );
      // document.body.classList.add(
      //   "m-brand--minimize",
      //   "m-aside-left--minimize"
      // );
    }
  }
};
</script>

<style>
</style>
