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
          <brand></brand>

          <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
            <div
              id="m_header_topbar"
              class="m-topbar m-stack m-stack--ver m-stack--general m-stack--fluid"
            >
              <div class="m-stack__item m-topbar__nav-wrapper">
                <ul class="m-topbar__nav m-nav m-nav--inline">
                  <li
                    class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light"
                    m-dropdown-toggle="click"
                  >
                    <a href="#" class="m-nav__link m-dropdown__toggle">
                      <span class="m-topbar__userpic">
                        <img
                          src="assets/users/img-user.png"
                          class="m--img-rounded m--marginless"
                          alt
                        >
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
                                src="assets/users/img-user.png"
                                class="m--img-rounded m--marginless"
                                alt
                              >
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
          </div>
        </div>
      </div>
    </header>
    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
      <div>
        <button
          class="m-aside-left-close m-aside-left-close--skin-dark"
          id="m_aside_left_close_btn"
        >
          <i class="la la-close"></i>
        </button>
        <div id="m_aside_left" class="m-grid__item m-aside-left m-aside-left--skin-dark">
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
                <a href class="m-menu__link">
                  <i class="m-menu__link-icon flaticon-line-graph"></i>
                  <span class="m-menu__link-title">
                    <span class="m-menu__link-wrap">
                      <router-link to="/list" class="m-menu__link-text">My Capex</router-link>
                      <!-- <span class="m-menu__link-text">My Capex</span> -->
                      <span class="m-menu__link-badge"></span>
                    </span>
                  </span>
                </a>
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
                <a href="javascript:;" class="m-menu__link m-menu__toggle">
                  <i class="m-menu__link-icon flaticon-file-1"></i>
                  <span class="m-menu__link-text">Capex</span>
                  <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                <div class="m-menu__submenu">
                  <span class="m-menu__arrow"></span>
                  <ul class="m-menu__subnav">
                    <li class="m-menu__item m-menu__item--active" aria-haspopup="true">
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
      <router-view></router-view>
      <!-- <create-capex></create-capex> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
