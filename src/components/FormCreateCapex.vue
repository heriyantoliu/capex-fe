<template>
  <v-app>
    aaa
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
                <tr>
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
                </tr>

                <tr>
                  <td style="width: 40%; vertical-align: middle;">Budget Owner Name*</td>
                  <td>
                    <div class="form-group m-form__group row">
                      <div class="col-lg-7 col-md-12 col-sm-12">
                        <select class="form-control" v-model="budgetOwner">
                          <option disabled value>Please select one</option>
                          <option
                            v-for="option in budgetOwnerData"
                            :key="option.ownerID"
                            :value="option.ownerID"
                          >{{option.ownerName}}</option>
                        </select>
                        <small
                          class="text-danger"
                          v-if="!$v.budgetOwner.required && $v.budgetOwner.$error"
                        >Please select Budget Owner Name.</small>
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
          </div>
        </div>

        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text">Capital Expenditure Information</h3>
            </div>
          </div>
        </div>

        <div class="m-portlet__body">
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
                            :value="option.purposedID"
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

                <tr>
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
                    <div class="form-group m-form__group">
                      <div class="col-10">
                        <input
                          class="form-control m-input"
                          type="number"
                          value="42"
                          id="example-number-input"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- </tr> -->
              </tbody>
            </table>
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
                <v-dialog v-model="dialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Submit</v-card-title>

                    <v-card-text>Yakin untuk submit ?</v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="red darken-1" flat="flat" @click="dialog = false">Tidak</v-btn>

                      <v-btn color="green darken-1" flat="flat" @click="submit">Ya</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </v-app>
</template>


<script>
// import Datepicker from "vuejs-datepicker";
import { axiosCapex } from "../axios-instance";
import {
  required,
  minLength,
  numeric,
  maxLength,
  requiredIf
} from "vuelidate/lib/validators";

export default {
  // components: {
  //   Datepicker
  // },
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
      totalBudget: 0,
      unbudget: false,
      requestorPositionData: [
        { key: "001", desc: "Admin" },
        { key: "002", desc: "Staff" },
        { key: "003", desc: "Departement Head" }
      ],
      requestorPosition: "",
      budgetOwnerData: [],
      budgetOwner: "",
      costCenterData: [],
      costCenter: "",
      purposeData: [],
      purpose: "",
      budgetApprovalCodeData: [],
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
      storageLoc: ""
    };
  },
  computed: {
    remainingBudget() {
      return this.totalBudget - this.totalAmount;
    }
  },
  validations: {
    requestorPosition: {
      required
    },
    budgetOwner: {
      required
    },
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
      numeric
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
      this.requestorPosition = "";
      this.budgetOwner = "";
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
        this.dialog = true;
      }
    },
    submit() {
      console.log("Submit");
      this.dialog = false;
      this.submitText = "Submitting";
      axiosCapex
        .post("/capexTrx", {
          requestorPosition: this.requestorPosition,
          budgetOwner: this.budgetOwner,
          costCenter: this.costCenter,
          purpose: this.purpose,
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
        // this.budgetOwnerData = result.data.budgetOwnerInfo;
        this.purposeData = result.data.purposeInfo;
        this.budgetApprovalCodeData = result.data.budgetInfo;
        this.costCenterData = result.data.costCenterInfo;
        this.plantData = result.data.plantInfo;
        this.storageLocData = result.data.slocInfo;
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.budgetOwnerData);
  }
};
</script>

<style>
</style>
