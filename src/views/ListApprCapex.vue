<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
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
  </div>
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
