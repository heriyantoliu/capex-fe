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
            <h3 class="m-login__title">CAPEX Online</h3>
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
        <!-- <ul style="font-size: 10px;">
          <li>Merupakan sarana pengajuan CAPEX secara online dan terintegrasi dengan SAP di PT Industri Jamu dan Farmasi Sido Muncul, Tbk</li>
          <li>CAPEX Online tunduk pada semua peraturan yang ada pada pengajuan CAPEX manual.</li>
          <li>Dalam hal jika ada Approver yang tidak memungkinkan untuk input persetujuan secara online di system maka Approver wajib menunjuk salah satu PIC di department masing-masing yang dapat mewakili Approver melakukan persetujuan secara online berdasar dokumen cetak yang sudah disetujui.</li>
          <li>Pihak yang mengajukan CAPEX bertanggung jawab untuk follow up request masing-masing.</li>
          <li>
            Pengisian 1 form CAPEX hanya untuk 1 realisasi.
            <br />Misal : Pengajuan Laptop wajib diikuti pembeilan capex software windows dan software office. Maka perlu dibuat 3 form CAPEX realisasi di dalam sistem.
          </li>
        </ul>-->
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
      signinText: 'Sign In',
    };
  },
  methods: {
    signin() {
      this.signinText = 'Loading';
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push(this.$route.query.redirect || '/');
        })
        .catch((err) => {
          this.signinText = 'Sign In';

          this.message = err.data.message;
        });
    },
  },
};
</script>

<style></style>
