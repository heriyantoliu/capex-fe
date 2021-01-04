<template>
  <div class="m-content">
    <div class="m-portlet">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">List Capex Waiting My Approval</h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <div class="m-form__section m-form__section--first">
          <list-table-capex :listData="capexTrx" :massApprove="true" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Requester Information</h3>
              </div>
            </div>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Budget Owner Name</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input size disabled></b-form-input>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Capex Waiting My Approval</h1>
            <list-table-capex :listData="capexTrx" massApprove="true" />
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import { axiosCapex } from '../axios-instance';
import ListTableCapex from '../components/ListTableCapex';
export default {
  components: {
    ListTableCapex
  },
  data() {
    return {
      capexTrx: []
    };
  },

  created() {
    axiosCapex
      .get('/capexTrx?wait_appr=' + this.$store.state.username)
      .then(result => {
        this.capexTrx = result.data;
      })
      .catch();
  }
};
</script>

<style>
/* .clickable {
  cursor: pointer;
} */
</style>
