<template>
  <div>
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
                    <label>Cost Center*</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="costCenter"
                      :options="costCenterData"
                      value-field="costCenterCode"
                      text-field="costCenterName"
                      style="font-size: 17.6px"
                      aria-describedby="cost-center-feedback"
                      :state="
                        !(!$v.costCenter.required && $v.costCenter.$error)
                          ? null
                          : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback id="cost-center-feedback"
                      >Please select Cost Center.</b-form-invalid-feedback
                    >
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
                      size
                      v-model="purpose"
                      :options="purposeData"
                      value-field="purposeID"
                      text-field="purposeDesc"
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
                          >-- Please select an option --</b-form-select-option
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
                    <label>Budget Approval Code*</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="budgetApprovalCode"
                      :options="budgetApprovalCodeData"
                      value-field="budgetCode"
                      text-field="budgetCode"
                      style="font-size: 17.6px"
                      :state="
                        !(
                          !$v.budgetApprovalCode.required &&
                          $v.budgetApprovalCode.$error
                        )
                          ? null
                          : false
                      "
                      :disabled="unbudget"
                      aria-describedby="budget-appr-feedback"
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>

                    <b-form-invalid-feedback id="budget-appr-feedback">
                      Select Budget Approval Code Or Tick Unbudgetted.
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="8" offset-sm="4">
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
                      :state="
                        ($v.description.required || !$v.description.$error) &&
                        ($v.description.minLength || !$v.description.$error)
                          ? null
                          : false
                      "
                    ></b-form-input>

                    <b-form-invalid-feedback
                      id="deskripsi-feedback"
                      v-if="!$v.description.minLength && $v.description.$error"
                    >
                      Field must have at least
                      {{ $v.description.$params.minLength.min }}
                      letters.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback
                      id="deskripsi-feedback"
                      v-if="!$v.description.required && $v.description.$error"
                      >This field must not be empty.</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Serial Number</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input size v-model="serialNumber"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Quantity</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      size
                      type="number"
                      class="text-right"
                      v-model="quantity"
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Satuan(UoM)</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="uom"
                      :options="uomData"
                      value-field="key"
                      text-field="desc"
                      style="font-size: 17.6px"
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Delivery Date</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-datepicker
                      size
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
                        ($v.justification.minLength || !$v.justification.$error)
                          ? null
                          : false
                      "
                    ></b-form-textarea>
                    <b-form-invalid-feedback
                      id="justification-feedback"
                      v-if="
                        !$v.justification.minLength && $v.justification.$error
                      "
                    >
                      Field A must have at least
                      {{ $v.justification.$params.minLength.min }}
                      letters.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback
                      id="justification-feedback"
                      v-if="
                        !$v.justification.required && $v.justification.$error
                      "
                      >This field must not be empty.</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Total Amount</label>
                  </b-col>
                  <b-col sm="8">
                    <b-input-group size prepend="Rp">
                      <b-form-input
                        size
                        class="text-right"
                        :value="totalAmountText"
                        @input="onInputNumber"
                        @keypress="onKeypressNumber"
                        aria-describedby="amount-feedback"
                        :state="
                          ($v.totalAmountText.requiredNumber ||
                            !$v.totalAmountText.$error) &&
                          ($v.totalAmountText.remainingPositif &&
                            !$v.totalAmountText.$error)
                            ? null
                            : false
                        "
                      />
                      <b-form-invalid-feedback
                        id="amount-feedback"
                        v-if="
                          !$v.totalAmountText.requiredNumber &&
                            $v.totalAmountText.$error
                        "
                        >This field must not be empty</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        id="amount-feedback"
                        v-if="
                          !$v.totalAmountText.remainingPositif &&
                            $v.totalAmountText.$error
                        "
                        >Insufficient budget</b-form-invalid-feedback
                      >
                    </b-input-group>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Total Budget</label>
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
                    <label>Plant</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="plant"
                      :options="plantData"
                      value-field="plantCode"
                      text-field="plantName"
                      style="font-size: 17.6px"
                      aria-describedby="plant-feedback"
                      :state="
                        !(!$v.plant.required && $v.plant.$error) ? null : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback
                      id="plant-feedback"
                      v-if="
                        !$v.justification.required && $v.justification.$error
                      "
                      >Please select plant.</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Satuan(UoM)</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="storageLoc"
                      :options="storageLocData"
                      value-field="slocCode"
                      text-field="slocName"
                      style="font-size: 17.6px"
                      aria-describedby="sloc-feedback"
                      :state="
                        !(!$v.storageLoc.required && $v.storageLoc.$error)
                          ? null
                          : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback
                      id="sloc-feedback"
                      v-if="
                        !$v.justification.required && $v.justification.$error
                      "
                      >Please select storage location.</b-form-invalid-feedback
                    >
                  </b-col>
                </b-row>

                <b-row align-h="around" class="mt-3">
                  <b-col cols="5" class="text-right">
                    <b-button variant="danger">Clear</b-button>
                  </b-col>
                  <b-col cols="5" class="text-left">
                    <b-button variant="success" @click="validate"
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
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
import {
  required,
  minLength,
  maxLength,
  requiredIf
} from 'vuelidate/lib/validators';

const remainingPositif = (value, component) => {
  if (component.remainingBudget < 0) {
    return false;
  }

  return true;
};

const requiredNumber = value => {
  if (value == '0') {
    return false;
  }
  return true;
};

export default {
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
      serialNumber: '',
      justification: '',
      totalAmount: null,
      totalAmountText: '0',
      unbudget: false,
      budgetOwnerData: [],
      budgetRaw: [],
      costCenterData: [],
      costCenter: '',
      purposeData: [],
      purpose: '',
      budgetApprovalCode: '',
      uomData: [
        { key: '001', desc: 'Buah' },
        { key: '002', desc: 'Kg' },
        { key: '003', desc: 'Liter' }
      ],
      uom: '',
      plantData: [],
      plant: '',
      storageLocData: [],
      storageLoc: '',
      submitOK: null,
      overlay: false
    };
  },
  computed: {
    remainingBudget() {
      if (this.unbudget) {
        return 0;
      }
      return this.totalBudget - this.totalAmount;
    },
    budgetOwnerInfo() {
      if (!this.budgetApprovalCode) {
        return '';
      }

      const code = this.budgetApprovalCode;

      return this.budgetApprovalCodeData.find(function(value) {
        return value.budgetCode == code;
      });
    },
    totalBudget() {
      if (!this.budgetApprovalCode) {
        return 0;
      }
      const ID = this.budgetApprovalCode;
      return this.budgetApprovalCodeData.find(value => {
        return value.budgetCode == ID;
      }).budgetRemaining;
    },
    budgetApprovalCodeData() {
      if (!this.costCenter) {
        return;
      }
      const costCenter = this.costCenter;
      // this.budgetApprovalCode = "";

      return this.budgetRaw.filter(value => {
        return value.costCenter == costCenter;
      });
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
      minLength: minLength(10),
      maxLength: maxLength(100)
    },
    totalAmountText: {
      remainingPositif,
      requiredNumber
    },
    plant: {
      required
    },
    storageLoc: {
      required
    },
    budgetApprovalCode: {
      required: requiredIf(function(value) {
        if (this.unbudget && value.budgetApprovalCode == '') {
          return false;
        }
        return true;
      })
    }
  },
  methods: {
    reset() {
      this.costCenter = '';
      this.purpose = '';
      this.budgetApprovalCode = '';
      this.description = '';
      this.serialNumber = '';
      this.quantity = 0;
      this.uom = '';
      this.justification = '';
      this.totalAmount = 0;
      this.plant = '';
      this.storageLoc = '';
      this.deliveryDate = null;
    },
    onInputNumber(e) {
      this.$v.totalAmountText.$touch();
      this.totalAmountText = e;
      if (!this.totalAmountText) {
        this.totalAmountText = '0';
      }

      this.totalAmount = parseInt(
        this.totalAmountText.toString().replace(/[ ,.]/g, '')
      );
      this.totalAmountText = this.totalAmount.toLocaleString('id');
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
    async validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          let result = await this.$bvModal.msgBoxConfirm(
            'Yakin untuk submit capex?',
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
            this.submit();
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
    async submit() {
      this.dialog = false;
      this.submitText = 'Submitting';
      try {
        let result = await axiosCapex.post('/capexTrx', {
          costCenter: this.costCenter,
          purpose: this.purpose,
          budgetType: this.budgetApprovalCode != '' ? 'B' : 'U',
          budgetApprovalCode: this.budgetApprovalCode,
          description: this.description,
          serialNumber: this.serialNumber,
          quantity: Number(this.quantity),
          uom: this.uom,
          justification: this.justification,
          totalAmount: Number(this.totalAmount),
          plant: this.plant,
          storageLocation: this.storageLoc,
          deliveryDate: this.deliveryDate ? this.deliveryDate : '0000-00-00'
        });
        console.log('RESULT', result.data);
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
    }
  },
  created() {
    axiosCapex
      .get('/createInfo')
      .then(result => {
        this.purposeData = result.data.purposeInfo;
        this.budgetRaw = result.data.budgetInfo.filter(value => {
          return value.budgetRemaining > 0;
        });
        this.costCenterData = result.data.costCenterInfo;
        this.plantData = result.data.plantInfo;
        this.storageLocData = result.data.slocInfo;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
