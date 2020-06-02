<template>
  <b-container fluid>
    <b-form-group
      label="Filter"
      label-size="sm"
      label-cols-sm="1"
      label-for="filterInput"
      class="mb-0"
    >
      <b-input-group size="sm">
        <b-form-input v-model="filter" type="search" placeholder="Type to search" size="sm" />
        <b-input-group-append>
          <b-button size="sm" :disabled="!filter" @click="filter = ''" variant="primary">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <br />
    <b-table
      show-empty
      striped
      hover
      bordered
      selectable
      select-mode="single"
      size="sm"
      stacked="md"
      @row-selected="showDetail"
      :items="listData"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :current-page="currentPage"
      :per-page="perPage"
      primary-key="ID"
      @filtered="onFiltered"
      thead-class="header"
      tbody-class="content"
    >
      <template v-slot:cell(totalAmount)="data">
        <div class="text-right">{{ data.item.totalAmount.toLocaleString() }}</div>
      </template>
      <template v-slot:cell(status)="data">
        <b-badge :variant="statusColor(data.item.status)">
          {{
          data.item.status | statusDesc
          }}
        </b-badge>
      </template>
    </b-table>
    <br />
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
    />
  </b-container>
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
  data() {
    return {
      filter: null,
      filterOn: ['ID', 'description'],
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      // pageOptions: [5, 10, 15],
      fields: [
        {
          key: 'ID',
          label: 'Capex ID',
          sortable: true
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true
        },
        {
          key: 'totalAmount',
          label: 'Amount',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status'
        }
      ]
    };
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showDetail(row) {
      this.$router.push('/capex/' + row[0].ID);
    }
  },

  watch: {
    listData: function() {
      this.totalRows = this.listData.length;
    }
  }
};
</script>

<style></style>
