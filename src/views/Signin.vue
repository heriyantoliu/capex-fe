<template>
  <div
    class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2"
  >
    <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
      <div class="m-login__container">
        <div class="m-login__logo">
          <a href="#">
            <img src="assets/logo.png" />
          </a>
        </div>
        <div class="m-login__signin">
          <div class="m-login__head">
            <h3 class="m-login__title">Please Sign In Here</h3>
          </div>

          <form class="m-login__form m-form" v-on:submit.prevent>
            <div class="form-group m-form__group">
              <input
                class="form-control m-input"
                type="text"
                placeholder="Username"
                autocomplete="off"
                v-model="username"
              />
            </div>
            <div class="form-group m-form__group">
              <input
                class="form-control m-input m-login__form-input--last"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="text-danger" v-if="message">{{ message }}</div>
            <div class="row m-login__form-sub"></div>
            <div class="m-login__form-action">
              <button
                class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary"
                @click="signin"
                :disabled="signinText != 'Sign In'"
              >
                {{ signinText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      signinText: 'Sign In'
    };
  },
  methods: {
    signin() {
      this.signinText = 'Loading';
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          this.signinText = 'Sign In';
          this.message = err;
        });
    }
  }
};
</script>

<style></style>
