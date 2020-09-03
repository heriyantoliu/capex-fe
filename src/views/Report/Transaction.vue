<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Capex Transaction</h1>
            <br />
            <b-container>
              <b-row>
                <b-col sm="2">Cost Center:</b-col>
                <b-col sm="10">
                  <b-form-input size="sm" v-model="costCenter" placeholder="Cost Center" trim></b-form-input>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="2">Budget Code:</b-col>
                <b-col sm="10">
                  <b-form-input size="sm" v-model="budgetCode" placeholder="Budget Code" trim></b-form-input>
                </b-col>
              </b-row>
            </b-container>

            <hr />

            <b-table
              ref="listCapex"
              :fields="fields"
              :items="listCapex"
              bordered
              striped
              selectable
              stacked="md"
              @row-selected="onSelect"
              select-mode="single"
              :filter="criteria"
              :filter-function="filterFn"
              @filtered="onFiltered"
            >
              <template v-slot:cell(quantity)="data">
                <div
                  class="text-right"
                >{{ data.item.quantity.toLocaleString() }} {{ data.item.uom }}</div>
              </template>
              <template v-slot:cell(totalAmount)="data">
                <div class="text-right">{{ data.item.totalAmount.toLocaleString() }}</div>
              </template>

              <template v-slot:cell(status)="data">
                <b-badge
                  :variant="statusColor(data.item.status)"
                >{{ data.item.status | statusDesc }}</b-badge>
              </template>

              <template v-slot:custom-foot>
                <tr>
                  <td colspan="6" class="text-center">
                    <strong>TOTAL</strong>
                  </td>
                  <td class="text-right">
                    <strong>{{ totalAmount.toLocaleString() }}</strong>
                  </td>
                </tr>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosCapex } from '../../axios-instance';
import { capexMixin } from '../../mixins';
export default {
  mixins: [capexMixin],
  data() {
    return {
      fields: [
        { key: 'ID', label: 'Capex ID' },
        { key: 'costCenter', label: 'Cost Center' },
        { key: 'budgetApprovalCode', label: 'Budget Code' },
        { key: 'budget.description', label: 'Budget Description' },
        { key: 'description', label: 'Description Capex' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'totalAmount', label: 'Amount' },
        { key: 'status', label: 'Status' },
      ],
      listCapex: [],
      costCenter: '',
      budgetCode: '',
      totalAmount: 0,
    };
  },
  computed: {
    criteria() {
      return {
        costCenter: this.costCenter,
        budgetCode: this.budgetCode,
      };
    },
  },
  methods: {
    onSelect(items) {
      this.$router.push(`/capex/${items[0].ID}`);
    },
    filterFn(item, criteria) {
      if (criteria.costCenter) {
        if (!item.costCenter.includes(criteria.costCenter)) {
          return false;
        }
      }

      if (criteria.budgetCode) {
        if (!item.budgetApprovalCode.includes(criteria.budgetCode)) {
          return false;
        }
      }

      return true;
    },
    onFiltered(filteredItems) {
      this.totalAmount = filteredItems.reduce((a, b) => a + b.totalAmount, 0);
    },
  },

  async created() {
    let result = await axiosCapex.get('/budget');
    let listBudget = result.data;

    result = await axiosCapex.get('/capexTrx');
    this.listCapex = result.data.map((capex) => {
      return {
        ...capex,
        budgetApprovalCode:
          capex.budgetApprovalCode != ''
            ? capex.budgetApprovalCode
            : 'Unbudget',
        budget: listBudget.find((budget) => {
          return budget.code == capex.budgetApprovalCode;
        }),
      };
    });
    this.totalAmount = this.listCapex.reduce((a, b) => a + b.totalAmount, 0);
  },
};
</script>

<style></style>
