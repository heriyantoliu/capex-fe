<template>
  <div class="m-portlet">
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <h3 class="m-portlet__head-text">List Budget Code</h3>
        </div>
      </div>
      <b-button
        v-if="!disabled"
        variant="primary"
        class="my-3 text-right"
        v-b-modal.budget-data
        >Add</b-button
      >
    </div>
    <div class="m-portlet__body">
      <div class="m-form__section m-form__section--first">
        <b-container fluid>
          <b-row>
            <b-col>
              <b-form inline>
                <label for="total-amount" class="mr-2">Total Amount</label>
                <b-form-input
                  size="sm"
                  class="mb-2 text-right"
                  disabled
                  :value="amount.toLocaleString('id')"
                ></b-form-input>
              </b-form>
            </b-col>
          </b-row>
          <hr />

          <b-row>
            <b-col sm="12">
              <b-table-lite bordered striped :fields="fields" :items="listItem">
                <template v-slot:cell(amount)="data">
                  <div class="text-right">
                    {{ data.item.amount.toLocaleString('id') }}
                  </div>
                </template>
                <template v-slot:cell(available)="data">
                  <div class="text-right">
                    {{ data.item.available.toLocaleString('id') }}
                  </div>
                </template>
                <template v-slot:cell(remaining)="data">
                  <div class="text-right">
                    {{ data.item.remaining.toLocaleString('id') }}
                  </div>
                </template>
                <template v-slot:cell(allocationText)="data">
                  <b-form-input
                    size="sm"
                    class="text-right"
                    inputmode="numeric"
                    :value="data.item.allocationText"
                    :formatter="formatter"
                    @keypress="onKeypressNumber"
                    @input="onInputAllocation($event, data.index)"
                    autocomplete="off"
                    :disabled="disabled"
                  ></b-form-input>
                </template>

                <template v-slot:cell(action)="data">
                  <b-button
                    v-if="!disabled"
                    size="sm"
                    variant="danger"
                    @click="onDelete(data.item.code)"
                    >Delete</b-button
                  >
                </template>
                <template v-slot:custom-foot>
                  <tr>
                    <td colspan="5" class="text-center">
                      <strong>TOTAL</strong>
                    </td>
                    <td class="text-right">
                      <strong>{{
                        totalAllocation.toLocaleString('id')
                      }}</strong>
                    </td>
                  </tr>
                </template>
              </b-table-lite>
            </b-col>
          </b-row>
        </b-container>

        <b-modal
          ref="modal"
          id="budget-data"
          :hide-header-close="true"
          title="Pilih budget code"
          @ok="onSelectedBudgetCode"
          @cancel="clearSelection"
        >
          <b-form-group
            label="Cost Center"
            invalid-feedback="cost center belum di pilih"
          >
            <!-- <comp-select
              :options="costCenterData"
              v-model="selectedCostCenter"
            ></comp-select> -->

            <v-select
              :options="costCenterData"
              label="name"
              v-model="selectedCostCenter"
            />
          </b-form-group>

          <b-form-group
            label="Budget Code"
            invalid-feedback="Budget code belum di pilih"
          >
            <!-- <comp-select
              idHTML="budget-code"
              :options="filterBudgetCode"
              :value="selectedBudgetCode"
              @selected="getSelected"
            ></comp-select> -->

            <v-select
              :options="filterBudgetCode"
              label="name"
              v-model="selectedBudgetCode"
            />
          </b-form-group>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
// import compSelect from './Select';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
export default {
  components: {
    // compSelect,
    vSelect,
  },
  props: {
    budgetCodeData: {
      type: Array,
      required: false,
    },
    costCenterData: {
      type: Array,
      required: false,
    },
    listBudgetCode: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  model: {
    prop: 'listBudgetCode',
    event: 'onChange',
  },
  data() {
    return {
      listItem: [],
      fields: [
        { key: 'code', label: 'Budget Code' },
        { key: 'costCenter', label: 'Cost Center' },
        { key: 'amount', label: 'Amount' },
        { key: 'available', label: 'Available' },
        { key: 'remaining', label: 'Remaining' },
        { key: 'allocationText', label: 'Allocation' },
        { key: 'action', label: 'Action' },
      ],
      selectedBudgetCode: { name: '' },
      selectedCostCenter: { name: '' },
      totalAllocation: 0,
      filterBudgetCode: [],
    };
  },

  watch: {
    listBudgetCode() {
      this.listItem = this.listBudgetCode;
      this.totalAllocation = this.listItem.reduce((a, b) => {
        return a + b.allocation;
      }, 0);
    },
    selectedCostCenter(newValue, oldValue) {
      if (newValue.id != oldValue.id) {
        this.selectedBudgetCode = { name: '' };
      }
      this.filterBudgetCode = this.budgetCodeData.filter((budget) => {
        return budget.costCenter === newValue.id;
      });
    },
  },

  methods: {
    clearSelection() {
      this.selectedBudgetCode = {};
      this.selectedCostCenter = {};
      this.filterBudgetCode = [];
    },
    onDelete(code) {
      this.listItem = this.listItem.filter((item) => {
        return item.code != code;
      });
      this.$emit('onChange', this.listItem);
    },
    getSelected(value) {
      this.selectedBudgetCode = value;
    },
    onSelectedBudgetCode() {
      if (!this.selectedBudgetCode.id) {
        return;
      }

      const existingBudgetCode = this.listItem.find((budget) => {
        return budget.code == this.selectedBudgetCode.id;
      });

      if (existingBudgetCode) {
        return;
      }

      // const budgetCode = this.budgetCodeData.find((budget) => {
      //   return budget.id == this.selectedBudgetCode.id;
      // });

      this.listItem.push({
        code: this.selectedBudgetCode.id,
        costCenter: this.selectedBudgetCode.costCenter,
        amount: this.selectedBudgetCode.budgetAmount,
        available: this.selectedBudgetCode.budgetRemaining,
        used:
          this.selectedBudgetCode.budgetAmount -
          this.selectedBudgetCode.budgetRemaining,
        remaining: this.selectedBudgetCode.budgetRemaining,
        allocationText: '0',
        allocation: 0,
      });

      this.selectedBudgetCode = { name: '' };
      this.selectedCostCenter = { name: '' };
      this.$emit('onChange', this.listItem);
    },
    onInputAllocation(e, idx) {
      this.listItem[idx].allocationText = e;
      if (!this.listItem[idx].allocationText) {
        this.listItem[idx].allocationText = '0';
      }

      this.listItem[idx].allocation = parseInt(
        this.listItem[idx].allocationText.toString().replace(/[ ,.]/g, '')
      );
      this.listItem[idx].remaining =
        this.listItem[idx].amount -
        this.listItem[idx].used -
        this.listItem[idx].allocation;
      this.listItem[idx].allocationText = this.listItem[
        idx
      ].allocation.toLocaleString('id');
      this.totalAllocation = this.listItem.reduce((a, b) => {
        return a + b.allocation;
      }, 0);
      this.$emit('onChange', this.listItem);
    },
    onKeypressNumber(evt) {
      var theEvent = evt || window.event;

      // Handle paste
      if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
      } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
      }
      var regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    formatter(value) {
      return value.toLocaleString('id');
    },
  },
  created() {
    this.listItem = this.listBudgetCode;
    this.totalAllocation = this.listItem.reduce((a, b) => {
      return a + b.allocation;
    }, 0);
  },
};
</script>

<style></style>
