<template>
  <b-table-lite
    :fields="fields"
    :items="listData"
    bordered
    striped
    thead-class="header"
    tbody-class="content"
  >
    <template v-slot:cell(UpdatedAt)="data">
      <div>{{ data.item.UpdatedAt | toDateString }}</div>
    </template>
    <template v-slot:cell(Status)="data">
      <b-badge v-if="data.item.Status == 'A'" variant="success">Approve</b-badge>
      <b-badge v-else-if="data.item.Status == 'R'" variant="danger">Reject</b-badge>
    </template>
    <template v-slot:cell(Remark)="data">
      <b-form-textarea :value="data.item.Remark" plaintext no-resize max-rows="10" />
    </template>
  </b-table-lite>
</template>

<script>
import { capexMixin } from '../mixins';
export default {
  mixins: [capexMixin],
  props: {
    listData: {
      type: Array
    }
  },
  filters: {
    toDateString(value) {
      const date = new Date(value);

      if (date.getFullYear() == 1) {
        return '';
      }
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }
  },
  data() {
    return {
      fields: [
        { key: 'Seq', label: '#' },
        { key: 'Approver', label: 'Name' },
        { key: 'UpdatedAt', label: 'Approver Date' },
        { key: 'Status', label: 'Status' },
        { key: 'Remark', label: 'Remark' }
      ]
    };
  }
};
</script>

<style></style>
