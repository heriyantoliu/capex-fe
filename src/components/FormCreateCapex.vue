<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Information" active>
        <b-overlay :show="overlay" rounded="sm">
          <form
            class="m-form"
            id="m_form_1"
            v-on:submit.prevent
            :aria-hidden="overlay ? 'true' : null"
          >
            <div class="m-portlet">
              <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">Requester Information</h3>
                  </div>
                </div>
              </div>
              <div class="m-portlet__body">
                <div class="m-form__section m-form__section--first">
                  <b-container fluid>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Budget Owner Name</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          size
                          disabled
                          v-model="budgetOwnerInfo.ownerName"
                        ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Budget Owner Position</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          size
                          disabled
                          v-model="budgetOwnerInfo.position"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Budget Owner Payroll ID</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          size
                          disabled
                          v-model="budgetOwnerInfo.payrollID"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Year</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          type="number"
                          disabled
                          v-model="year"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Cost Center*</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="costCenterData"
                          v-model="costCenter"
                          describedBy="cost-center-feedback"
                          :state="
                            !(!$v.costCenter.required && $v.costCenter.$error)
                              ? null
                              : false
                          "
                        >
                          <b-form-invalid-feedback id="cost-center-feedback"
                            >Please select Cost Center.</b-form-invalid-feedback
                          >
                        </comp-select>
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
              </div>
            </div>
            <div class="m-portlet">
              <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                      Capital Expenditure Information
                    </h3>
                  </div>
                </div>
              </div>
              <div class="m-portlet__body">
                <div class="m-form__section m-form__section--first">
                  <b-container fluid>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Purpose*</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-select
                          v-model="purpose"
                          :options="purposeData"
                          value-field="id"
                          text-field="name"
                          style="font-size: 17.6px"
                          aria-describedby="purpose-feedback"
                          :state="
                            !(!$v.purpose.required && $v.purpose.$error)
                              ? null
                              : false
                          "
                        >
                          <template v-slot:first>
                            <b-form-select-option value disabled
                              >-- Please select an option
                              --</b-form-select-option
                            >
                          </template>
                        </b-form-select>
                        <b-form-invalid-feedback id="purpose-feedback"
                          >Please select purpose.</b-form-invalid-feedback
                        >
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Budget Type</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-checkbox v-model="unbudget"
                          >Unbudgetted</b-form-checkbox
                        >
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Deskripsi*</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          v-model="description"
                          aria-describedby="deskripsi-feedback"
                          autocomplete="off"
                          :state="
                            ($v.description.required ||
                              !$v.description.$error) &&
                            ($v.description.minLength || !$v.description.$error)
                              ? null
                              : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback
                          id="deskripsi-feedback"
                          v-if="
                            !$v.description.minLength && $v.description.$error
                          "
                        >
                          Field must have at least
                          {{ $v.description.$params.minLength.min }}
                          letters.
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback
                          id="deskripsi-feedback"
                          v-if="
                            !$v.description.required && $v.description.$error
                          "
                        >
                          This field must not be empty.
                        </b-form-invalid-feedback>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Serial Number</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          size
                          v-model="serialNumber"
                        ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Quantity*</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          class="text-right"
                          inputmode="numeric"
                          :value="quantityText"
                          @input="
                            onInputNumber(
                              $event,
                              $v.quantityText,
                              'quantityText',
                              'quantity'
                            )
                          "
                          @keypress="onKeypressNumber"
                          aria-describedby="qty-feedback"
                          :state="
                            !(
                              !$v.quantityText.requiredNumber &&
                              $v.quantityText.$error
                            )
                              ? null
                              : false
                          "
                        ></b-form-input>
                        <b-form-invalid-feedback
                          id="qty-feedback"
                          v-if="
                            !$v.quantityText.requiredNumber &&
                              $v.quantityText.$error
                          "
                          >This field must not be empty</b-form-invalid-feedback
                        >
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Satuan(UoM)*</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="uomData"
                          v-model="uom"
                          describedBy="uom-feedback"
                          :state="
                            !(!$v.uom.required && $v.uom.$error) ? null : false
                          "
                        >
                          <b-form-invalid-feedback
                            id="uom-feedback"
                            v-if="!$v.uom.required && $v.uom.$error"
                            >Please select UoM.</b-form-invalid-feedback
                          >
                        </comp-select>
                        <!-- <b-form-select
                      size
                      v-model="uom"
                      :options="uomData"
                      value-field="uom"
                      text-field="desc"
                      style="font-size: 17.6px"
                      aria-describedby="uom-feedback"
                      :state="
                        !(!$v.uom.required && $v.uom.$error) ? null : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback
                      id="uom-feedback"
                      v-if="!$v.uom.required && $v.uom.$error"
                        >Please select UoM.</b-form-invalid-feedback>-->
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Delivery Date</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-datepicker
                          locale="id"
                          type="date"
                          v-model="deliveryDate"
                        ></b-form-datepicker>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Justification*</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-textarea
                          v-model="justification"
                          aria-describedby="justification-feedback"
                          :state="
                            ($v.justification.required ||
                              !$v.justification.$error) &&
                            ($v.justification.minLength ||
                              !$v.justification.$error)
                              ? null
                              : false
                          "
                        ></b-form-textarea>
                        <b-form-invalid-feedback
                          id="justification-feedback"
                          v-if="
                            !$v.justification.minLength &&
                              $v.justification.$error
                          "
                        >
                          Field A must have at least
                          {{ $v.justification.$params.minLength.min }}
                          letters.
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback
                          id="justification-feedback"
                          v-if="
                            !$v.justification.required &&
                              $v.justification.$error
                          "
                        >
                          This field must not be empty.
                        </b-form-invalid-feedback>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Unit Price</label>
                      </b-col>
                      <b-col sm="8">
                        <b-input-group size prepend="Rp">
                          <b-form-input
                            inputmode="numeric"
                            class="text-right"
                            :value="unitPriceText"
                            @input="
                              onInputNumber(
                                $event,
                                $v.unitPriceText,
                                'unitPriceText',
                                'unitPrice'
                              )
                            "
                            @keypress="onKeypressNumber"
                            aria-describedby="unit-price-feedback"
                            :state="
                              $v.unitPriceText.requiredNumber ||
                              !$v.unitPriceText.$error
                                ? null
                                : false
                            "
                          />
                          <b-form-invalid-feedback
                            id="unit-price-feedback"
                            v-if="
                              !$v.unitPriceText.requiredNumber &&
                                $v.unitPriceText.$error
                            "
                          >
                            This field must not be empty
                          </b-form-invalid-feedback>
                        </b-input-group>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Total Amount (Foreign Currency)</label>
                      </b-col>
                      <b-col sm="2">
                        <b-form-input
                          v-model="foreignCurrency"
                          placeholder="Currency"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="6">
                        <b-form-input
                          inputmode="numeric"
                          class="text-right"
                          placeholder="Foreign Amount"
                          :value="foreignAmountText"
                          @input="
                            onInputNumber(
                              $event,
                              null,
                              'foreignAmountText',
                              'foreignAmount'
                            )
                          "
                          @keypress="onKeypressNumber"
                        />
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Total Amount</label>
                      </b-col>
                      <b-col sm="8">
                        <b-input-group size prepend="Rp">
                          <b-form-input
                            class="text-right"
                            disabled
                            :value="totalAmount | separator"
                          />
                        </b-input-group>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Total Available Budget</label>
                      </b-col>
                      <b-col sm="8">
                        <b-input-group size prepend="Rp">
                          <b-form-input
                            size
                            class="text-right"
                            disabled
                            :value="totalBudget | separator"
                          />
                        </b-input-group>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Remaining Budget</label>
                      </b-col>
                      <b-col sm="8">
                        <b-input-group size prepend="Rp">
                          <b-form-input
                            size
                            class="text-right"
                            disabled
                            :value="remainingBudget | separator"
                          />
                        </b-input-group>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Plant*</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="plantData"
                          v-model="plant"
                          describedBy="plant-feedback"
                          :state="
                            !(!$v.plant.required && $v.plant.$error)
                              ? null
                              : false
                          "
                        >
                          <b-form-invalid-feedback
                            id="plant-feedback"
                            v-if="!$v.plant.required && $v.plant.$error"
                            >Please select plant.</b-form-invalid-feedback
                          >
                        </comp-select>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Storage Location*</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="storageLocData"
                          v-model="storageLoc"
                          describedBy="sloc-feedback"
                          :state="
                            !(!$v.storageLoc.required && $v.storageLoc.$error)
                              ? null
                              : false
                          "
                        >
                          <b-form-invalid-feedback
                            id="sloc-feedback"
                            v-if="
                              !$v.storageLoc.required && $v.storageLoc.$error
                            "
                          >
                            Please select storage location.
                          </b-form-invalid-feedback>
                        </comp-select>
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
              </div>
            </div>

            <div class="m-portlet">
              <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">SAP Asset Information</h3>
                  </div>
                </div>
              </div>
              <div class="m-portlet__body">
                <div class="m-form__section m-form__section--first">
                  <b-container fluid>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Asset Type Activity</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="actTypeInfo"
                          v-model="assetActivityType"
                        />
                      </b-col>
                    </b-row>

                    <b-row align-h="around" class="mt-3">
                      <b-col cols="4" class="text-right">
                        <b-button variant="danger">Clear</b-button>
                      </b-col>
                      <b-col cols="4" class="text-center">
                        <b-button variant="warning" @click="validate('D')"
                          >Draft</b-button
                        >
                      </b-col>
                      <b-col cols="4" class="text-left">
                        <b-button variant="success" @click="validate('ACC')"
                          >Submit</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
              </div>
            </div>
          </form>

          <template v-slot:overlay>
            <div class="text-center p-4 h1 bg-primary text-light rounded">
              <div class="mb-3">Processing...</div>
            </div>
          </template>
        </b-overlay>
      </b-tab>
      <b-tab title="Budget" v-if="!unbudget">
        <list-budget-code
          v-model="listBudgetCode"
          :budgetCodeData="budgetApprovalCodeData"
          :amount="totalAmount"
          :costCenterData="costCenterData"
        />
      </b-tab>
      <b-tab title="attachment">
        <list-attachment v-model="files" />
      </b-tab>
    </b-tabs>

    <b-modal
      ref="modal-year"
      id="modal-year"
      :hide-header-close="true"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      title="Pilih tahun"
      @ok="onSelectedYear"
      @cancel="onCancel"
    >
      <b-form-group :invalid-feedback="yearModalMessage" :state="yearState">
        <b-form-input
          type="number"
          label="Year"
          v-model="year"
          :state="yearState"
          required
        ></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
import { required, minLength } from 'vuelidate/lib/validators';
import compSelect from './Select';
import ListBudgetCode from './ListBudgetCode';
import ListAttachment from './ListAttachment';

const requiredNumber = value => {
  if (value == '0') {
    return false;
  }
  return true;
};

export default {
  components: {
    compSelect,
    ListBudgetCode,
    ListAttachment
  },
  filters: {
    separator(value) {
      return value.toLocaleString('ID');
    }
  },
  data() {
    return {
      submitText: 'Submit',
      errorMessage: '',
      dialog: false,
      description: '',
      deliveryDate: null,
      quantity: 0,
      quantityText: '0',
      serialNumber: '',
      justification: '',
      unitPrice: 0,
      unitPriceText: '0',
      totalAmountText: '0',
      unbudget: false,
      budgetOwnerData: [],
      budgetRaw: [],
      costCenterData: [],
      purposeData: [],
      purpose: '',
      budgetApprovalCode: '',
      budgetApprovalCodeData: [],
      year: new Date().getFullYear(),
      uomData: [],
      uom: '',
      plantData: [],
      plant: '',
      storageLocData: [],
      storageLoc: '',
      submitOK: null,
      overlay: false,
      actTypeInfo: [],
      assetActivityType: '',
      costCenterText: '',
      costCenterTextTemp: '',
      budgetCodeText: '',
      costCenter: '',
      budgetOwnerInfo: {},
      totalBudget: 0,
      listBudgetCode: [],
      files: [],
      foreignAmountText: '',
      foreignAmount: 0,
      foreignCurrency: '',
      yearState: null,
      yearModalMessage: ''
    };
  },
  computed: {
    remainingBudget() {
      if (this.unbudget) {
        return 0;
      }
      return this.totalBudget - this.totalAmount;
    },

    totalAmount() {
      if (!this.unitPrice) {
        return 0;
      }

      if (!this.quantity) {
        return 0;
      }

      return this.unitPrice * this.quantity;
    }
  },
  watch: {
    // costCenter(newValue, oldValue) {
    //   if (newValue != oldValue) {
    //     this.budgetApprovalCode = '';
    //     this.totalBudget = 0;

    //     this.budgetOwnerInfo = {};
    //     this.listBudgetCode = [];
    //   }
    // },
    unbudget() {
      if (this.unbudget) {
        this.budgetApprovalCode = '';
        this.budgetOwnerInfo = {};
        this.budgetRemaining = 0;
        this.totalBudget = 0;
        this.listBudgetCode = [];
      }
    },

    listBudgetCode() {
      this.totalBudget = this.listBudgetCode.reduce((a, b) => {
        return a + b.remaining;
      }, 0);
    }
  },
  validations: {
    costCenter: {
      required
    },
    purpose: {
      required
    },
    description: {
      required,
      minLength: minLength(10)
    },
    justification: {
      required,
      minLength: minLength(10)
    },

    unitPriceText: {
      requiredNumber
    },
    quantityText: {
      requiredNumber
    },
    uom: {
      required
    },
    plant: {
      required
    },
    storageLoc: {
      required
    }
  },
  methods: {
    onSelectedYear(modalEvt) {
      modalEvt.preventDefault();
      this.yearState = null;
      this.yearModalMessage = '';
      const currentYear = new Date().getFullYear();
      if (this.year < currentYear) {
        this.yearModalMessage = `Budget hanya untuk tahun ${currentYear} keatas`;
        this.yearState = false;
        return;
      }
      this.budgetApprovalCodeData = [];
      axiosCapex.get(`/budget?year=${this.year}`).then(result => {
        if (result.data.length === 0) {
          this.yearModalMessage = `Tidak ada budget untuk tahun ${this.year}`;
          this.yearState = false;
          return;
        }
        this.initFetch(this.year);
        this.$nextTick(() => {
          this.$bvModal.hide('modal-year');
        });
      });

      // this.$bvModal.hide('modal-year');
    },
    onCancel() {
      this.$router.push('/');
    },

    reset() {
      this.costCenter = '';
      this.purpose = '';
      this.budgetApprovalCode = '';
      this.description = '';
      this.serialNumber = '';
      this.quantity = 0;
      this.uom = '';
      this.justification = '';
      this.unitPrice = 0;
      this.totalAmount = 0;
      this.plant = '';
      this.storageLoc = '';
      this.deliveryDate = null;
      this.assetActivityType = '';
      this.listBudgetCode = [];
    },

    onInputNumber(e, v, textVar, numVar) {
      // this.$v.unitPriceText.$touch();
      // this.unitPriceText = e;
      // if (!this.unitPriceText) {
      //   this.unitPriceText = '0';
      // }

      // this.unitPrice = parseInt(
      //   this.unitPriceText.toString().replace(/[ ,.]/g, '')
      // );
      // this.unitPriceText = this.unitPrice.toLocaleString('id');
      if (v) {
        v.$touch();
      }

      this[textVar] = e;
      if (!this[textVar]) {
        this[textVar] = '0';
      }
      this[numVar] = parseInt(this[textVar].toString().replace(/[ ,.]/g, ''));

      this[textVar] = this[numVar].toLocaleString('id');
    },
    onInputNumberQty(e) {
      this.$v.quantityText.$touch();
      this.quantityText = e;
      if (!this.quantityText) {
        this.quantityText = '0';
      }

      this.quantity = parseInt(
        this.quantityText.toString().replace(/[ ,.]/g, '')
      );

      this.quantityText = this.quantity.toLocaleString('id');
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
      var regex = /[0-9]|,/;

      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    async validate(status) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.costCenter && !this.unbudget) {
          let totalSplitAllocation = this.listBudgetCode.reduce((a, b) => {
            return a + b.allocation;
          }, 0);

          if (totalSplitAllocation != this.totalAmount) {
            this.$bvModal.msgBoxOk('Total budget berbeda dengan total amount', {
              title: 'Error',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            });
            return;
          }
        }
        try {
          let result = await this.$bvModal.msgBoxConfirm(
            status == 'ACC'
              ? 'Yakin untuk submit capex?'
              : 'Yakin untuk menyimpan capex?',
            {
              title: 'Submit Capex',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'YES',
              cancelTitle: 'NO',
              footerClass: 'p-2',
              hideHeaderClose: true,
              centered: true
            }
          );
          if (result) {
            this.overlay = true;
            this.submit(status);
          }
        } catch (err) {
          this.$bvModal.msgBoxOk(err.response.data.message, {
            title: 'Error',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          });
          this.overlay = false;
        }
      }
    },
    async submit(status) {
      this.dialog = false;
      this.submitText = 'Submitting';
      try {
        const budgetCode = this.listBudgetCode.map(budget => {
          return {
            budgetCode: budget.code,
            costCenter: budget.costCenter,
            amount: Number(budget.allocation),
            mainBudget: budget.mainBudget
          };
        });
        let result = await axiosCapex.post('/capexTrx', {
          capex: {
            costCenter: this.costCenter,
            year: Number(this.year),
            purpose: this.purpose,
            budgetType: this.unbudget == false ? 'B' : 'U',
            description: this.description,
            serialNumber: this.serialNumber,
            quantity: Number(this.quantity),
            uom: this.uom,
            justification: this.justification,
            unitPrice: Number(this.unitPrice),
            totalAmount: Number(this.totalAmount),
            plant: this.plant,
            storageLocation: this.storageLoc,
            deliveryDate: this.deliveryDate ? this.deliveryDate : '0000-00-00',
            assetActivityType: this.assetActivityType,
            foreignAmount: Number(this.foreignAmount),
            foreignCurrency: this.foreignCurrency,
            status
          },
          budgetCode
        });

        let formData = new FormData();

        this.files.forEach(file => {
          formData.append('files', file.file);
        });

        if (this.files.length > 0) {
          await axiosCapex.post(
            `capexTrx/${result.data.ID}/attachment`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }

        this.$root.$bvToast.toast(`Capex ${result.data.ID} created`, {
          variant: 'primary',
          toastClass: 'sm_toast',
          bodyClass: 'sm_toast__body ',
          noCloseButton: true,
          toaster: 'b-toaster-bottom-center',
          autoHideDelay: 3000
        });
        this.$router.push('/capex/' + result.data.ID);
      } catch (err) {
        this.$bvModal.msgBoxOk(err.response.data.message, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        });
        this.overlay = false;
        this.errorMessage = err.response.data.message;
        this.submitText = 'Submit';
      }
    },

    async initFetch(year) {
      const result = await axiosCapex.get(`/createInfo?year=${year}`);
      this.purposeData = result.data.purposeInfo.map(purpose => {
        return {
          id: purpose.purposeID,
          name: purpose.purposeDesc
        };
      });
      this.budgetRaw = result.data.budgetInfo;
      this.costCenterData = result.data.costCenterInfo.map(cc => ({
        id: cc.costCenterCode,
        name: `${cc.costCenterCode} | ${cc.costCenterName}`
      }));
      this.plantData = result.data.plantInfo.map(plant => {
        return { id: plant.plantCode, name: plant.plantName };
      });
      this.storageLocData = result.data.slocInfo.map(sloc => {
        return { id: sloc.slocCode, name: sloc.slocName };
      });
      this.uomData = result.data.uomInfo.map(uom => {
        return {
          id: uom.uom,
          name: uom.desc
        };
      });
      this.actTypeInfo = result.data.actTypeInfo.map(actType => {
        return {
          id: actType.actTypeCode,
          name: actType.actTypeDesc
        };
      });
      this.budgetApprovalCodeData = this.budgetRaw.map(budget => {
        return {
          ...budget,
          budgetDesc: `${budget.budgetCode} | ${budget.budgetDesc}`,
          name: `${budget.budgetCode} | ${budget.budgetDesc}`,
          id: budget.budgetCode
        };
      });
      this.actTypeInfo.unshift({ id: null, name: '' });
    }
  },

  mounted() {
    this.$refs['modal-year'].show();
  }
  // async created() {

  // }
};
</script>

<style></style>
