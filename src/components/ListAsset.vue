<template>
  <b-table-lite
    :fields="fields"
    :items="listData"
    bordered
    striped
    thead-class="header"
    tbody-class="content"
  >
    <template v-slot:cell(#)="data">{{ data.index + 1 }}</template>
    <template v-slot:cell(CreatedAt)="data">
      <div>{{ data.item.CreatedAt | toDateString }}</div>
    </template>
  </b-table-lite>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
    },
  },
  filters: {
    toDateString(value) {
      const date = new Date(value);

      if (date.getFullYear() == 1) {
        return '';
      }
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      );
    },
  },
  data() {
    return {
      fields: [
        '#',
        { key: 'companyCode', label: 'CompanyCode' },
        { key: 'assetNo', label: 'Asset No' },
        { key: 'assetSubNo', label: 'Asset Sub No' },
        { key: 'CreatedAt', label: 'Date' },
      ],
    };
  },
};
</script>

<style></style>
