<template>
  <div>
    <form class="m-form" id="m_form_1" v-on:submit.prevent>
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
            <table class="table table-bordered">
              <tbody>
                <!-- <tr>
                  <td style="width: 40%; vertical-align: middle;">Requestor Name</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <input type="text" class="form-control m-input" disabled />
                      </div>
                    </div>
                  </td>
                </tr>-->
                <!-- <tr>
                  <td style="width: 40%; vertical-align: middle;">Requestor Position*</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <select class="form-control" v-model.trim="requestorPosition">
                          <option disabled value>Please select one</option>
                          <option
                            v-for="option in requestorPositionData"
                            :key="option.key"
                            :value="option.key"
                          >{{option.desc}}</option>
                        </select>
                        <small
                          class="text-danger"
                          v-if="!$v.requestorPosition.required && $v.requestorPosition.$error"
                        >Please select Requestor Position.</small>
                      </div>
                    </div>
                  </td>
                </tr>-->

                <tr>
                  <td style="width: 40%; vertical-align: middle;">Budget Owner Name*</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <input
                          type="text"
                          class="form-control m-input"
                          :value="budgetOwnerInfo.ownerName"
                          disabled
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="width: 40%; vertical-align: middle;">Budget Owner Position</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <input
                          type="text"
                          class="form-control m-input"
                          :value="budgetOwnerInfo.position"
                          disabled
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="width: 40%; vertical-align: middle;">Budget Owner Payroll ID</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <input
                          type="text"
                          class="form-control m-input"
                          :value="budgetOwnerInfo.payrollID"
                          disabled
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="width: 40%; vertical-align: middle;">Cost Center*</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <select class="form-control" v-model="costCenter">
                          <option disabled value>Please select one</option>
                          <option
                            v-for="option in costCenterData"
                            :key="option.costCenterCode"
                            :value="option.costCenterCode"
                          >{{option.costCenterName}}</option>
                        </select>
                        <small
                          class="text-danger"
                          v-if="!$v.costCenter.required && $v.costCenter.$error"
                        >Please select Cost Center.</small>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="m-form__seperator m-form__seperator--dashed m-form__seperator--space"></div>
            <div class="m-portlet">
              <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">Capital Expenditure Information</h3>
                  </div>
                </div>
              </div>

              <div class="m-form__section m-form__section--first">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Purpose*</td>
                      <td>
                        <div class="col-lg-7 col-md-12 col-sm-12">
                          <div class="form-group m-form__group row">
                            <select class="form-control" v-model="purpose">
                              <option disabled>Please select one</option>
                              <option
                                v-for="option in purposeData"
                                :key="option.purposeID"
                                :value="option.purposeID"
                              >{{option.purposeDesc}}</option>
                            </select>
                            <small
                              class="text-danger"
                              v-if="!$v.purpose.required && $v.purpose.$error"
                            >Please select Purpose.</small>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- </tr> -->
                    <tr v-if="costCenter != ''">
                      <td style="width: 40%; vertical-align: middle;">Budget Approval Code*</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <select
                              class="form-control"
                              v-model="budgetApprovalCode"
                              :disabled="unbudget"
                            >
                              <option disabled value>Please select one</option>
                              <option value></option>
                              <option
                                v-for="option in budgetApprovalCodeData"
                                :key="option.budgetCode"
                                :value="option.budgetCode"
                              >{{option.budgetCode}}</option>
                            </select>
                            <small
                              class="text-danger"
                              v-if="!$v.budgetApprovalCode.required && $v.budgetApprovalCode.$error"
                            >Select Budget Approval Code Or Tick Unbudgetted.</small>
                            <div class="m-checkbox-list">
                              <label
                                class="m-checkbox"
                                :class="budgetApprovalCode != '' ? 'm-checkbox--disabled':''"
                              >
                                <input
                                  type="checkbox"
                                  v-model="unbudget"
                                  :disabled="budgetApprovalCode != ''"
                                />Unbudgetted
                                <span></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Description</td>
                      <td>
                        <div class="form-group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <input
                              type="text"
                              class="form-control m-input"
                              v-model="description"
                              placeholder="Input Deskripsi"
                              @blur="$v.description.$touch()"
                            />

                            <div
                              class="text-danger"
                              v-if="!$v.description.minLength && $v.description.$error"
                            >Field A must have at least {{$v.description.$params.minLength.min}} letters.</div>
                            <div
                              class="text-danger"
                              v-if="!$v.description.required && $v.description.$error"
                            >This field must not be empty.</div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Serial Number</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <input
                              type="text"
                              class="form-control m-input"
                              v-model="serialNumber"
                              placeholder="Input Serial Number Optional"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Quantity</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-3 col-md-7 col-sm-12">
                            <input
                              class="form-control m-input text-right"
                              type="number"
                              v-model="quantity"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">UoM</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <select class="form-control" v-model="uom">
                              <option disabled value>Please select one</option>
                              <option
                                v-for="option in uomData"
                                :key="option.key"
                                :value="option.key"
                              >{{option.desc}}</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Delivery Date</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <!-- {{String(deliveryDate)}} -->
                            <datepicker
                              v-model="deliveryDate"
                              bootstrap-styling
                              format="dd-MM-yyyy"
                            ></datepicker>
                            <!-- <input type="date" class="form-control m-input" v-model="deliveryDate"> -->
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Justification*</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12">
                            <textarea
                              class="form-control m-input"
                              name="justification"
                              v-model="justification"
                              placeholder="Enter a menu"
                              @blur="$v.justification.$touch()"
                            ></textarea>

                            <div
                              class="text-danger"
                              v-if="!$v.justification.minLength && $v.justification.$error"
                            >Field A must have at least {{$v.justification.$params.minLength.min}} letters.</div>
                            <div
                              class="text-danger"
                              v-if="!$v.justification.required && $v.justification.$error"
                            >This field must not be empty.</div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Total Amount*</td>
                      <td>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Rp</span>
                          </div>
                          <input
                            type="text"
                            class="form-control m-input text-right"
                            placeholder="1,000.00"
                            v-model="totalAmountText"
                          />
                        </div>
                        {{ totalAmount | separator }}
                        <div
                          class="text-danger"
                          v-if="!$v.totalAmount.remainingPositif && $v.totalAmount.$error"
                        >Insufficient budget</div>
                        <div
                          class="text-danger"
                          v-if="!$v.totalAmount.required && $v.justification.$error"
                        >This field must not be empty.</div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Total Budget*</td>
                      <td>
                        <div class="input-group m-input-group m-input-group--solid">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Rp:</span>
                          </div>
                          <input
                            type="text"
                            class="form-control m-input text-right"
                            :value="totalBudget | separator"
                            readonly
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Remaining Budget*</td>
                      <td>
                        <div class="input-group m-input-group m-input-group--solid">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Rp:</span>
                          </div>
                          <input
                            type="text"
                            class="form-control m-input text-right"
                            :value="remainingBudget | separator"
                            readonly
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Plant*</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <select class="form-control" v-model="plant">
                              <option disabled value>Please select one</option>
                              <option
                                v-for="option in plantData"
                                :key="option.plantCode"
                                :value="option.plantCode"
                              >{{option.plantName}}</option>
                            </select>
                            <small
                              class="text-danger"
                              v-if="!$v.plant.required && $v.plant.$error"
                            >Select plant.</small>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Storage Location*</td>
                      <td>
                        <div class="form-group m-form__group row">
                          <div class="col-lg-7 col-md-12 col-sm-12">
                            <select class="form-control" v-model="storageLoc">
                              <option disabled value>Please select one</option>
                              <option
                                v-for="option in storageLocData"
                                :key="option.slocCode"
                                :value="option.slocCode"
                              >{{option.slocName}}</option>
                            </select>

                            <small
                              class="text-danger"
                              v-if="!$v.storageLoc.required && $v.storageLoc.$error"
                            >Select storage location.</small>
                            <!-- <div v-if="!$v.storageLoc.required">
                              <p class="error text-danger">This field must not be empty.</p>
                            </div>-->
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="$v.$error" class="text-danger">There is some error</div>
                <div v-if="errorMessage" class="text-danger">{{errorMessage}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-portlet__foot m-portlet__foot--fit">
          <div class="m-form__actions m-form__actions">
            <div class="row">
              <div class="col-lg-9 ml-lg-auto">
                <button
                  class="btn btn-success"
                  @click.stop="validate"
                  :disabled="submitText != 'Submit'"
                >{{submitText}}</button>
                <button
                  class="btn btn-secondary"
                  :disabled="submitText != 'Submit'"
                  @click="reset"
                >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
import { axiosCapex } from "../axios-instance";
import {
  required,
  minLength,
  numeric,
  maxLength,
  requiredIf
} from "vuelidate/lib/validators";

const remainingPositif = (value, component) => {
  if (component.remainingBudget < 0) {
    return false;
  }
  return true;
};

export default {
  components: {
    Datepicker
  },
  filters: {
    separator(value) {
      return value.toLocaleString();
    }
  },
  data() {
    return {
      submitText: "Submit",
      errorMessage: "",
      dialog: false,
      description: "",
      deliveryDate: null,
      quantity: 0,
      serialNumber: "",
      justification: "",
      totalAmount: 0,
      totalAmountText: "",
      unbudget: false,
      budgetOwnerData: [],
      budgetRaw: [],
      costCenterData: [],
      costCenter: "",
      purposeData: [],
      purpose: "",
      budgetApprovalCode: "",
      uomData: [
        { key: "001", desc: "Buah" },
        { key: "002", desc: "Kg" },
        { key: "003", desc: "Liter" }
      ],
      uom: "",
      plantData: [],
      plant: "",
      storageLocData: [],
      storageLoc: "",
      submitOK: null
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
        return "";
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
    totalAmount: {
      required,
      numeric,
      remainingPositif
    },
    plant: {
      required
    },
    storageLoc: {
      required
    },
    budgetApprovalCode: {
      required: requiredIf(function(value) {
        if (this.unbudget && value.budgetApprovalCode == "") {
          return false;
        }
        return true;
      })
    }
  },
  methods: {
    reset() {
      this.costCenter = "";
      this.purpose = "";
      this.budgetApprovalCode = "";
      this.description = "";
      this.serialNumber = "";
      this.quantity = 0;
      this.uom = "";
      this.justification = "";
      this.totalAmount = 0;
      this.plant = "";
      this.storageLoc = "";
      this.deliveryDate = null;
    },
    validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$bvModal
          .msgBoxConfirm("Please confirm that you want to delete everything.", {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: true,
            centered: true
          })
          .then(value => {
            this.submitOK = value;
          });
        if (this.submitOK) {
          this.submit();
        }
      }
    },
    submit() {
      this.dialog = false;
      this.submitText = "Submitting";
      // console.log(this.purpose);
      axiosCapex
        .post("/capexTrx", {
          costCenter: this.costCenter,
          purpose: this.purpose,
          budgetType: this.budgetApprovalCode != "" ? "B" : "U",
          budgetApprovalCode: this.budgetApprovalCode,
          description: this.description,
          serialNumber: this.serialNumber,
          quantity: Number(this.quantity),
          uom: this.uom,
          justification: this.justification,
          totalAmount: Number(this.totalAmount),
          plant: this.plant,
          storageLocation: this.storageLoc,
          deliveryDate: this.deliveryDate
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          // console.log(err.);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          this.errorMessage = err.response.data.message;
          this.submitText = "Submit";
        });
    }
  },
  created() {
    axiosCapex
      .get("/createInfo")
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

<style>
</style>
