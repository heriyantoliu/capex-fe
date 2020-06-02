<template>
  <div>
    <div class="m-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3 class="m-subheader__title m-subheader__title--separator">Detail Capex Request</h3>
          <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
            <li class="m-nav__item m-nav__item--home">
              <a href="#" class="m-nav__link m-nav__link--icon">
                <i class="m-nav__link-icon la la-home"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="m-content">
      <form class="m-form" id="m_form_1" @submit.prevent>
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Requester Information</h3>
              </div>
              <button
                class="btn btn-primary ml-auto"
                @click="editable=true"
                v-if="editable==false && hasACCApprover"
              >
                <i class="la la-edit">Change</i>
              </button>
            </div>
          </div>

          <div class="m-portlet__body">
            <div class="m-form__content">
              <div
                class="m-alert m-alert--icon alert alert-danger m--hide"
                role="alert"
                id="m_form_1_msg"
              >
                <div class="m-alert__icon">
                  <i class="la la-warning"></i>
                </div>
                <div class="m-alert__text">Form belum sesuai, mohon diperbaiki.</div>
                <div class="m-alert__close">
                  <button type="button" class="close" data-close="alert" aria-label="Close"></button>
                </div>
              </div>
            </div>

            <div class="m-form__section m-form__section--first">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Processed ID</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="capexInfo.ID"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Status</td>
                    <td>
                      <span>
                        <b-badge
                          :variant="statusColor(capexInfo.status)"
                        >{{ capexInfo.status| statusDesc }}</b-badge>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Requestor Name</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="requestorInfo.Name"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Requestor Position*</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="requestorInfo.Position"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Payroll ID</td>

                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="requestorInfo.PayrollID"
                        aria-describedby="basic-addon1"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr v-if="typeof budgetInfo !== 'undefined'">
                    <td style="width: 40%; vertical-align: middle;">Budget Owner Name*</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="budgetInfo.ownerName"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr v-if="typeof budgetInfo !== 'undefined'">
                    <td style="width: 40%; vertical-align: middle;">Budget Owner Position</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="budgetInfo.position"
                        disabled
                      />
                    </td>
                  </tr>
                  <tr v-if="typeof budgetInfo !== 'undefined'">
                    <td style="width: 40%; vertical-align: middle;">Budget Owner Payroll ID</td>
                    <td>
                      <input
                        type="text"
                        class="form-control m-input"
                        :value="budgetInfo.payrollID"
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style="width: 40%; vertical-align: middle;">Cost Center*</td>
                    <td>
                      <!-- <span style="width: 40%; vertical-align: middle;">{{capexInfo.costCenter}}</span> -->
                      <select class="form-control" :value="capexInfo.costCenter" disabled>
                        <option
                          v-for="option in costCenterData"
                          :key="option.costCenterCode"
                          :value="option.costCenterCode"
                        >{{option.costCenterName}}</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                        <select class="form-control" :value="capexInfo.purpose" disabled>
                          <!-- <option disabled value>Please select one</option> -->
                          <!-- <option value></option> -->
                          <option
                            v-for="option in purposeData"
                            :key="option.purposeID"
                            :value="option.purposeID"
                          >{{option.purposeDesc}}</option>
                        </select>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Budget Approval Code*</td>
                      <td v-if="capexInfo.budgetType == 'B'">
                        <select class="form-control" :value="capexInfo.budgetApprovalCode" disabled>
                          <option
                            v-for="option in budgetApprovalCodeData"
                            :key="option.budgetCode"
                            :value="option.budgetCode"
                          >{{option.budgetCode}}</option>
                        </select>
                      </td>
                      <td v-else>
                        <input
                          type="text"
                          class="form-control m-input"
                          value="Unbudgeted"
                          placeholder="Input Deskripsi"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Description</td>
                      <td>
                        <input
                          type="text"
                          class="form-control m-input"
                          :value="capexInfo.description"
                          placeholder="Input Deskripsi"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Serial Number</td>
                      <td>
                        <input
                          type="text"
                          class="form-control m-input"
                          :value="capexInfo.serialNumber"
                          placeholder="Input Serial Number Optional"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Quantity</td>
                      <td>
                        <input
                          class="form-control m-input text-right"
                          type="number"
                          :value="capexInfo.quantity"
                          disabled
                          id="example-number-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">UOM</td>
                      <td>
                        <!-- <select class="form-control" disabled>
                          <option disabled value>Please select one</option>
                          <option value></option>
                        </select>-->
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Delivery Date</td>
                      <td>
                        <!-- <span style="width: 40%; vertical-align: middle;">Data dari Record</span> -->
                        <!-- <input
                          type="datetime-local"
                          class="form-control m-input"
                          aria-describedby="basic-addon1"
                          :value="capexInfo.deliveryDate"
                          :readonly="!editable"
                        />-->
                        <datepicker
                          :value="capexInfo.deliveryDate"
                          bootstrap-styling
                          format="dd-MM-yyyy"
                          disabled
                        ></datepicker>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Justification*</td>
                      <td>
                        <textarea
                          class="form-control m-input"
                          name="justification"
                          :value="capexInfo.justification"
                          placeholder="Enter a menu"
                          disabled
                        ></textarea>
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
                            :value="formatCurrency(capexInfo.totalAmount)"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Total Budget*</td>
                      <td>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Rp</span>
                          </div>
                          <input
                            type="text"
                            :value="formatCurrency(capexInfo.totalBudget)"
                            class="form-control m-input text-right"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Remaining Budget*</td>
                      <td>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Rp</span>
                          </div>
                          <input
                            type="text"
                            class="form-control m-input text-right"
                            disabled
                            :value="formatCurrency(remainingBudget)"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Plant*</td>
                      <td>
                        <!-- <span style="width: 40%; vertical-align: middle;">{{capexInfo.plant}}</span> -->
                        <select class="form-control" :value="capexInfo.plant" disabled>
                          <option disabled value>Please select one</option>
                          <option
                            v-for="option in plantData"
                            :key="option.plantCode"
                            :value="option.plantCode"
                          >{{option.plantName}}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Store Location*</td>
                      <td>
                        <select class="form-control" :value="capexInfo.storageLocation" disabled>
                          <option disabled value>Please select one</option>
                          <option
                            v-for="option in storageLocData"
                            :key="option.slocCode"
                            :value="option.slocCode"
                          >{{option.slocName}}</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="m-form__seperator m-form__seperator--dashed m-form__seperator--space"></div>
            <div class="m-portlet" v-if="hasACCApprover">
              <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">SAP Asset Information</h3>
                  </div>
                </div>
              </div>

              <div class="m-form__section m-form__section--first">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Asset Class</td>
                      <td>
                        <select
                          class="form-control"
                          v-model.trim="assetClass"
                          :disabled="!editable"
                        >
                          <option disabled>Please select one</option>
                          <option
                            v-for="option in assetClassInfo"
                            :key="option.assetClassCode"
                            :value="option.assetClassCode"
                          >{{option.assetClassDesc}}</option>
                        </select>

                        <small
                          class="text-danger"
                          v-if="!$v.assetClass.required && $v.assetClass.$error"
                        >Please select Asset Class.</small>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Asset Activity Type</td>
                      <td>
                        <select
                          class="form-control"
                          v-model="capexInfo.assetActivityType"
                          :disabled="!editable"
                        >
                          <option disabled>Please select one</option>
                          <option
                            v-for="option in actTypeInfo"
                            :key="option.actTypeCode"
                            :value="option.actTypeCode"
                          >{{option.actTypeDesc}}</option>
                          <option value></option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 40%; vertical-align: middle;">Asset Group</td>
                      <td>
                        <select
                          class="form-control"
                          v-model="capexInfo.assetGroup"
                          :disabled="!editable"
                        >
                          <option disabled>Please select one</option>
                          <option
                            v-for="option in assetGroupInfo"
                            :key="option.assetGrpCode"
                            :value="option.assetGrpCode"
                          >{{option.assetGrpDesc}}</option>
                          <option value></option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="errorMessage" class="text-danger">{{errorMessage}}</div>
              </div>
            </div>
            <div class="m-portlet__foot m-portlet__foot--fit">
              <div class="m-form__actions m-form__actions">
                <div class="row">
                  <div class="col-lg-9 ml-lg-auto">
                    <div v-if="editable==true">
                      <button
                        type="submit"
                        class="btn btn-success"
                        @click="updateCapex"
                        :disabled="saveText != 'Save'"
                      >{{saveText}}</button>
                      <button
                        type="reset"
                        class="btn btn-secondary"
                        @click="cancelEdit"
                        :disabled="saveText != 'Save'"
                      >Cancel</button>
                    </div>
                    <div v-if=" capexInfo.nextApproval == userId && capexInfo.ACCApproved == 'X' ">
                      <button
                        class="btn btn-success"
                        @click="showApprDialog('A')"
                        :disabled="disableApprRejctButton"
                      >Approve</button>
                      <button
                        class="btn btn-danger"
                        @click="showApprDialog('R')"
                        :disabled="disableApprRejctButton"
                      >Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="m-portlet">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text">List Approver</h3>
            </div>
          </div>
        </div>
        <div class="m-portlet__body">
          <!--begin::Section-->
          <div class="m-section">
            <div class="m-section__content">
              <table class="table m-table m-table--head-bg-success">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Approver Date</th>
                    <th>Status</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="approver in capexApprover" :key="approver.Seq">
                    <th scope="row">{{approver.Seq}}</th>
                    <td>{{approver.Name}}</td>
                    <td>{{approver.UpdatedAt | toDateString}}</td>
                    <td>
                      <span
                        class="m-badge m-badge--success m-badge--wide"
                        v-if="approver.Status == 'A'"
                      >Approved</span>
                      <span
                        class="m-badge m-badge--danger m-badge--wide"
                        v-else-if="approver.Status == 'R'"
                      >Rejected</span>
                    </td>
                    <td>{{approver.Remark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="saveDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Save</v-card-title>

        <v-card-text>Yakin untuk menyimpan ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" flat="flat" @click="saveDialog = false">Tidak</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="saveCapex(capexInfo.ID)">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="apprDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Approve/Reject</v-card-title>

        <v-card-text>Yakin untuk {{apprText}} ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" flat="flat" @click="apprDialog = false">Tidak</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="apprCapex">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rejectDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Reject Note</v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Keterangan*" v-model="rejectNote" clearable></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="rejectDialog=false">Cancel</v-btn>
          <v-btn color="red darken-1" flat="flat" @click="rejectCapex">Reject</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar bottom color="green" v-model="showUpdateMsg" :timeout="timeout">{{rejectNote}}</v-snackbar>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Datepicker from "vuejs-datepicker";
import { axiosCapex } from "../axios-instance";
import { capexMixin } from "../mixins";
export default {
  mixins: [capexMixin],
  components: {
    Datepicker
  },
  data() {
    return {
      editable: false,
      errorMessage: "",
      saveDialog: false,
      saveText: "Save",
      apprDialog: false,
      apprText: "",
      disableApprRejctButton: false,
      capexApprover: [],
      capexInfo: {},
      storageLocData: [],
      plantData: [],
      costCenterData: [],
      purposeData: [],
      budgetApprovalCodeData: [],
      userId: this.$store.state.userId,
      remainingBudget: 0,
      budgetInfo: {},
      requestorInfo: {},
      assetClassInfo: [],
      actTypeInfo: [],
      assetGroupInfo: [],
      assetClass: "",
      rejectDialog: false,
      rejectNote: "",
      updateErrorMsg: "",
      showUpdateMsg: false,
      timeout: 5000
    };
  },
  computed: {
    hasACCApprover() {
      return this.$store.getters.findRule("ACCAPPROVER");
    }
  },
  validations: {
    assetClass: {
      required
    }
  },

  methods: {
    formatCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("id-ID", {
        // style: "currency",
        // currency: "IDR",
        // minimumFractionDigits: 0
      });

      return formatter.format(value);
    },
    updateCapex() {
      this.$v.$touch();
      console.log(this.$v.$invalid);
      if (!this.$v.$invalid) {
        this.saveDialog = true;
      }
    },
    showApprDialog(status) {
      switch (status) {
        case "A":
          this.apprText = "approve";
          this.apprDialog = true;
          break;
        case "R":
          this.apprText = "reject";
          this.rejectDialog = true;
          break;
      }
    },
    rejectCapex() {
      this.rejectDialog = false;
      this.disableApprRejctButton = true;
      let seq = 0;
      for (let approver of this.capexApprover) {
        if (approver.Status == "" && approver.Approver == this.userId) {
          seq = approver.Seq;
          break;
        }
      }
      // console.log("capexID :", this.capexInfo.ID);
      // console.log("seq :", seq);
      // console.log("rejectNote :", this.rejectNote);
      // this.showUpdateMsg = true;
      // setTimeout(() => {
      //   this.$router.push("/waitAppr");
      // }, 5000);

      axiosCapex
        .post("/reject", {
          capexID: this.capexInfo.ID,
          seq,
          remark: this.rejectNote
        })
        .then(() => {
          this.$router.push("/waitAppr");
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data.message;
          this.disableApprRejctButton = false;
        });
    },

    apprCapex() {
      this.apprDialog = false;
      this.disableApprRejctButton = true;
      let seq = 0;
      let path = "";
      for (let approver of this.capexApprover) {
        if (approver.Status == "" && approver.Approver == this.userId) {
          seq = approver.Seq;
          break;
        }
      }
      switch (this.apprText) {
        case "approve":
          path = "/approve";
          break;
        case "reject":
          path = "/reject";
          break;
      }

      axiosCapex
        .post(path, {
          capexID: this.capexInfo.ID,
          seq
        })
        .then(() => {
          this.$router.push("/waitAppr");
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data.message;
          this.disableApprRejctButton = false;
        });
    },
    saveCapex(ID) {
      this.saveDialog = false;
      this.saveText = "Updating";
      axiosCapex
        .put("/capexTrx/" + ID, {
          assetClass: this.assetClass,
          assetActivityType: this.capexInfo.assetActivityType,
          assetGroup: this.capexInfo.assetGroup
        })
        .then(() => {
          this.$router.push("/accAppr");
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data.message;
          this.saveText = "Save";
        });
    },

    fetchCapex(ID) {
      axiosCapex
        .get("/capexTrx/" + ID)
        .then(res => {
          this.capexApprover = res.data.approver;
          this.capexInfo = res.data.capexDetail;
          this.requestorInfo = res.data.requestorInfo;
          let budgetCode = this.capexInfo.budgetApprovalCode;
          this.budgetInfo = this.budgetApprovalCodeData.find(function(value) {
            return value.budgetCode == budgetCode;
          });

          this.capexInfo.totalBudget = this.budgetInfo.budgetAmount;
          this.assetClass = this.capexInfo.assetClass;

          this.remainingBudget =
            this.capexInfo.totalBudget - this.capexInfo.totalAmount;
          console.log(this.requestorInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelEdit() {
      this.editable = false;
      this.fetchCapex(this.$route.params.ID);
    }
  },
  filters: {
    toDateString(value) {
      const date = new Date(value);
      if (date.getFullYear() == 1) {
        return "";
      }
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
  },
  created() {
    axiosCapex
      .get("/createInfo")
      .then(result => {
        this.budgetApprovalCodeData = result.data.budgetInfo;
        this.purposeData = result.data.purposeInfo;
        this.costCenterData = result.data.costCenterInfo;
        this.plantData = result.data.plantInfo;
        this.storageLocData = result.data.slocInfo;
        this.assetClassInfo = result.data.assetClassInfo;
        this.actTypeInfo = result.data.actTypeInfo;
        this.assetGroupInfo = result.data.assetGrpInfo;
        this.fetchCapex(this.$route.params.ID);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
