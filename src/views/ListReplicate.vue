<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Capex Full Approve Capex</h1>
            <list-table-capex :listData="capexTrx" />
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
      .get('/capexTrx?replicate=true')
      .then(result => {
        this.capexTrx = result.data;
      })
      .catch();
  }
};
</script>

<style></style>
