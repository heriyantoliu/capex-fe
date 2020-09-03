<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Budget</h1>
            <br />
            <b-container>
              <b-row>
                <b-col sm="2">Cost Center:</b-col>
                <b-col sm="10">
                  <b-form-input
                    size="sm"
                    v-model="costCenter"
                    placeholder="Cost Center"
                    trim
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="2">Budget Code:</b-col>
                <b-col sm="10">
                  <b-form-input
                    size="sm"
                    v-model="budgetCode"
                    placeholder="Budget Code"
                    trim
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-container>

            <hr />
            <b-table
              ref="listBudget"
              :fields="fields"
              :items="listBudget"
              bordered
              striped
              stacked="md"
              thead-class="header"
              tbody-class="content"
              :filter="criteria"
              :filter-function="filterFn"
              @filtered="onFiltered"
            >
              <template v-slot:cell(amount)="data">
                <div class="text-right">
                  {{ data.item.amount.toLocaleString() }}
                </div>
              </template>
              <template v-slot:cell(used)="data">
                <div class="text-right">
                  {{ data.item.used.toLocaleString() }}
                </div>
              </template>
              <template v-slot:cell(remaining)="data">
                <div class="text-right">
                  {{ data.item.remaining.toLocaleString() }}
                </div>
              </template>
              <template v-slot:custom-foot>
                <tr>
                  <td colspan="2" class="text-center">
                    <strong>TOTAL</strong>
                  </td>
                  <td class="text-right">
                    <strong>{{ totalAmount.toLocaleString() }}</strong>
                  </td>
                  <td class="text-right">
                    <strong>{{ totalUsed.toLocaleString() }}</strong>
                  </td>
                  <td class="text-right">
                    <strong>{{ totalRemaining.toLocaleString() }}</strong>
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

export default {
  data() {
    return {
      fields: [
        { key: 'code', label: 'Code' },
        { key: 'description', label: 'Description' },
        { key: 'amount', label: 'Amount' },
        { key: 'used', label: 'Used' },
        { key: 'remaining', label: 'Remaining' },
        { key: 'costCenter', label: 'Cost Center' },
        { key: 'costCenterDesc', label: 'Cost Center Description' }
      ],
      listBudget: [],
      budgetCode: '',
      costCenter: '',
      totalAmount: 0,
      totalRemaining: 0
    };
  },
  computed: {
    totalUsed() {
      return this.totalAmount - this.totalRemaining;
    },
    criteria() {
      return {
        costCenter: this.costCenter,
        budgetCode: this.budgetCode
      };
    }
  },

  methods: {
    filterFn(item, criteria) {
      if (criteria.costCenter) {
        if (!item.costCenter.includes(criteria.costCenter)) {
          return false;
        }
      }

      if (criteria.budgetCode) {
        if (!item.code.includes(criteria.budgetCode)) {
          return false;
        }
      }

      return true;
    },
    onFiltered(filteredItems) {
      this.totalAmount = filteredItems.reduce((a, b) => a + b.amount, 0);
      this.totalRemaining = filteredItems.reduce((a, b) => a + b.remaining, 0);
    }
  },

  async created() {
    const result = await axiosCapex.get('/budget');

    this.listBudget = result.data.map(budget => {
      return { ...budget, used: budget.amount - budget.remaining };
    });

    this.totalAmount = this.listBudget.reduce((a, b) => a + b.amount, 0);
    this.totalRemaining = this.listBudget.reduce((a, b) => a + b.remaining, 0);
  }
};
</script>

<style></style>
