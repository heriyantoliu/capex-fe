<template>
  <div class="m-content">
    <b-overlay :show="overlay" rounded="sm">
      <form
        class="m-form"
        id="m_form_1"
        v-on:submit.prevent
        :aria-hidden="overlay ? 'true' : null"
      >
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Profile</h3>
              </div>
            </div>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Name</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="user.name"></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Email</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="user.email"></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Username</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      disabled
                      :value="user.username"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Position</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      disabled
                      :value="user.position"
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Payroll ID</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      disabled
                      :value="user.payrollID"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>

        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Password</h3>
              </div>
            </div>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Current Password</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      type="password"
                      aria-describedby="current-pass-feedback"
                      v-model="currentPassword"
                      :state="
                        $v.currentPassword.required ||
                        !$v.currentPassword.$error
                          ? null
                          : false
                      "
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="current-pass-feedback"
                      v-if="
                        !$v.currentPassword.required &&
                          $v.currentPassword.$error
                      "
                      >Please input current Password</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>New Password</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      type="password"
                      v-model="newPassword"
                      aria-describedby="new-pass-feedback"
                      :state="
                        ($v.newPassword.required || !$v.newPassword.$error) &&
                        ($v.newPassword.minLength || !$v.newPassword.$error)
                          ? null
                          : false
                      "
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="new-pass-feedback"
                      v-if="!$v.newPassword.required && $v.newPassword.$error"
                      >Please input current Password</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      id="new-pass-feedback"
                      v-if="!$v.newPassword.minLength && $v.newPassword.$error"
                    >
                      Field must have at least
                      {{ $v.newPassword.$params.minLength.min }}
                      letters.
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Re-type New Password</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      type="password"
                      v-model="newPassword2"
                      aria-describedby="new-pass2-feedback"
                      :state="
                        $v.newPassword2.required || !$v.newPassword2.$error
                          ? null
                          : false
                      "
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="new-pass2-feedback"
                      v-if="
                        !$v.newPassword2.sameAsPassword &&
                          $v.newPassword2.$error
                      "
                      >New Password must be identical</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>
                <b-row align-h="around" class="mt-3">
                  <b-col cols="5" class="text-right">
                    <b-button variant="danger" @click="clearField"
                      >Clear</b-button
                    >
                  </b-col>
                  <b-col cols="5" class="text-left">
                    <b-button variant="success" @click="updatePassword"
                      >Update Password</b-button
                    >
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>
      </form>
    </b-overlay>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { axiosCapex } from '../axios-instance';
export default {
  data() {
    return {
      user: null,
      currentPassword: null,
      newPassword: null,
      newPassword2: null,
      overlay: false
    };
  },
  validations: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    newPassword2: {
      sameAsPassword: sameAs('newPassword')
    }
  },
  methods: {
    clearField() {
      this.currentPassword = null;
      this.newPassword = null;
      this.newPassword2 = null;
    },
    async updatePassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          let result = await this.$bvModal.msgBoxConfirm(
            'Yakin untuk update password?',
            {
              title: 'Submit Capex',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'YES',
              cancelTitle: 'NO',
              footerClass: 'p-2',
              hideHeaderClose: true,
              centered: true
            }
          );
          if (result) {
            this.overlay = true;
            await axiosCapex.put('/user/' + this.user.ID, {
              currentPassword: this.currentPassword,
              newPassword: this.newPassword
            });
            this.$root.$bvToast.toast('Update complete', {
              variant: 'primary',
              toastClass: 'sm_toast',
              bodyClass: 'sm_toast__body ',
              noCloseButton: true,
              toaster: 'b-toaster-bottom-center',
              autoHideDelay: 3000
            });
            this.$router.push('/');
          }
        } catch (err) {
          this.$bvModal.msgBoxOk(err.response.data.message, {
            title: 'Error',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          });
          this.overlay = false;
        }
      }
    }
  },
  async created() {
    let result = await axiosCapex.get('/user/' + this.$route.params.ID);
    this.user = result.data;
  }
};
</script>

<style></style>
