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
        <b-form-input
          v-model="filter"
          type="search"
          placeholder="Type to search"
          size="sm"
        />
        <b-input-group-append>
          <b-button
            size="sm"
            :disabled="!filter"
            @click="filter = ''"
            variant="primary"
            >Clear</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <br />
    <b-table
      ref="capexTable"
      show-empty
      striped
      hover
      bordered
      selectable
      :select-mode="massApprove ? 'multi' : 'single'"
      size="sm"
      stacked="md"
      @row-selected="onSelect"
      :items="tableContent"
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
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&#10003;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template v-slot:cell(type)="data">
        {{ data.item.budgetType == 'B' ? 'Budget' : 'Unbudgeted' }}
      </template>
      <template v-slot:cell(totalAmount)="data">
        <div class="text-right">
          {{ data.item.totalAmount.toLocaleString() }}
        </div>
      </template>
      <template v-slot:cell(status)="data">
        <b-badge :variant="statusColor(data.item.status)">{{
          data.item.status | statusDesc
        }}</b-badge>
      </template>

      <template v-slot:cell(showDetail)="data">
        <b-button size="sm" variant="dark" @click="showDetail(data.item.ID)"
          >Detail</b-button
        >
      </template>
    </b-table>
    <br />
    <b-row v-if="massApprove && listData.length != 0">
      <b-col cols="6" class="text-left">
        <b-button-group>
          <b-button variant="info" size="sm" @click="onSelecteAll"
            >Select All</b-button
          >
          <b-button variant="info" size="sm" @click="onClearSelected"
            >Clear Selected</b-button
          >
        </b-button-group>
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button
          v-if="selected.length != 0"
          variant="primary"
          size="sm"
          @click="onApprove"
          >Approve</b-button
        >
      </b-col>
    </b-row>
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
import { axiosCapex } from '../axios-instance';
export default {
  mixins: [capexMixin],
  props: {
    listData: {
      type: Array,
    },
    massApprove: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMessage: false,
      filter: null,
      filterOn: ['ID', 'description'],
      selected: [],
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      tableContent: [],
      // pageOptions: [5, 10, 15],
      fields: [
        {
          key: 'Selected',
          label: 'Selected',
          sortable: false,
        },
        {
          key: 'ID',
          label: 'Capex ID',
          sortable: true,
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Budget Type',
          sortable: true,
        },
        {
          key: 'totalAmount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'showDetail',
          label: 'Show Detail',
        },
        {
          key: 'message',
          label: 'Message',
          tdClass: 'table-text-red',
        },
      ],
    };
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showDetail(id) {
      this.$router.push('/capex/' + id);
    },
    onSelect(items) {
      this.selected = items.filter((item) => {
        if (item.status == 'I') {
          return true;
        } else {
          let idxTable = this.$refs.capexTable.computedItems.findIndex(
            (itemRef) => itemRef.ID == item.ID
          );

          this.$refs.capexTable.unselectRow(idxTable);
          return false;
        }
      });
      if (!this.massApprove) {
        this.showDetail(items[0].ID);
      }
    },
    onSelecteAll() {
      this.$refs.capexTable.computedItems.forEach((item, idx) => {
        if (item.status == 'I') {
          this.$refs.capexTable.selectRow(idx);
        }
      });

      // for (const [item, idx] of this.$refs.capexTable.computedItems.Entries()) {
      //   if (item.status == 'I') {
      //     this.$refs.capexTable.selectRow(idx);
      //   }
      // }
    },
    onClearSelected() {
      this.$refs.capexTable.clearSelected();
    },
    async onApprove() {
      let result = await this.$bvModal.msgBoxConfirm(
        'Yakin untuk approve capex?',
        {
          title: 'Approve Capex',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: true,
          centered: true,
        }
      );
      if (result) {
        for (let capex of this.selected) {
          try {
            await axiosCapex.patch(`/capexTrx/${capex.ID}/approve`);
            this.tableContent = this.tableContent.filter(
              (data) => data.ID != capex.ID
            );
          } catch (err) {
            this.tableContent = this.tableContent.map((content) =>
              content.ID != capex.ID
                ? content
                : {
                    ...content,
                    message: err.response.data.message,
                  }
            );
          }
        }

        // await axiosCapex.patch(`/capexTrx/${this.capexInfo.ID}/approve`);
        // this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} approved`, {
        //   variant: 'primary',
        //   toastClass: 'sm_toast',
        //   bodyClass: 'sm_toast__body ',
        //   noCloseButton: true,
        //   toaster: 'b-toaster-bottom-center',
        //   autoHideDelay: 3000
        // });
        // this.$router.push('/waitAppr');
      }
    },
  },

  watch: {
    listData: function () {
      this.totalRows = this.listData.length;
      this.tableContent = this.listData.map((data) => ({
        ...data,
        message: '',
      }));
    },
  },

  created() {
    if (!this.massApprove) {
      this.fields = this.fields.filter(
        (field) =>
          field.key != 'Selected' &&
          field.key != 'showDetail' &&
          field.key != 'message'
      );
    }
  },
};
</script>

<style>
.table-text-red {
  color: red;
}
</style>
