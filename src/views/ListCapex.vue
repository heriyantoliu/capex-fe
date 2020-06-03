<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Capex Created by me</h1>
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
  computed: {
    hasCreate() {
      return this.$store.getters.findRule('CREATOR');
    },
    hasViewer() {
      return this.$store.getters.findRule('VIEWER');
    },
    hasApprover() {
      return this.$store.getters.findRule('APPROVER');
    },
    hasACCApprover() {
      return this.$store.getters.findRule('ACCAPPROVER');
    }
  },
  created() {
    axiosCapex
      .get('/capexTrx?created=' + this.$store.state.userId)
      .then(result => {
        this.capexTrx = result.data;
        this.totalRows = this.capexTrx.length;
      })
      .catch();
  }
};
</script>

<style></style>
