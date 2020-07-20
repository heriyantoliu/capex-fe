<template>
  <div class="m-content">
    <b-overlay :show="overlay" rounded="sm">
      <form class="m-form" id="m_form_1" v-on:submit.prevent :aria-hidden="overlay ? 'true' : null">
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Requester Information</h3>
              </div>
            </div>

            <b-button-group>
              <b-button class="my-3 text-right" variant="primary" @click="print">Print</b-button>
              <b-button
                v-if="capexInfo.status == 'A'"
                class="my-3"
                variant="info"
                @click="replicate"
              >Replicate to SAP</b-button>
            </b-button-group>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Capex ID</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="capexInfo.ID"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Status</label>
                  </b-col>
                  <b-col sm="8">
                    <b-badge
                      :variant="statusColor(capexInfo.status)"
                      style="font-size: 17.6px"
                    >{{ capexInfo.status | statusDesc }}</b-badge>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Requestor Name</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="requestorInfo.Name"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Requestor Position</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="capexInfo.requestorPosition"></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Payroll ID</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input disabled :value="requestorInfo.PayrollID"></b-form-input>
                  </b-col>
                </b-row>

                <div v-if="capexInfo.budgetType == 'B'">
                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>Budget Owner Name</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input size disabled v-model="budgetInfo.ownerName"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>Budget Owner Position</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input size disabled v-model="budgetInfo.position"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>Budget Owner Payroll ID</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input size disabled v-model="budgetInfo.payrollID"></b-form-input>
                    </b-col>
                  </b-row>
                </div>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Cost Center</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="capexInfo.costCenter"
                      disabled
                      :options="costCenterData"
                      value-field="costCenterCode"
                      text-field="costCenterName"
                      style="font-size: 17.6px"
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                      </template>
                    </b-form-select>
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
                <h3 class="m-portlet__head-text">Capital Expenditure Information</h3>
              </div>
            </div>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Purpose</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="capexInfo.purpose"
                      disabled
                      :options="purposeData"
                      value-field="purposeID"
                      text-field="purposeDesc"
                      style="font-size: 17.6px"
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Budget Approval Code*</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      size
                      v-model="capexInfo.budgetApprovalCode"
                      disabled
                      :options="budgetApprovalCodeData"
                      value-field="budgetCode"
                      text-field="budgetCode"
                      style="font-size: 17.6px"
                    ></b-form-select>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="8" offset-sm="4">
                    <b-form-checkbox
                      v-model="capexInfo.budgetType"
                      value="U"
                      unchecked-value="B"
                      disabled
                    >Unbudgetted</b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Deskripsi</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input v-model="capexInfo.description" disabled></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Serial Number</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input size v-model="capexInfo.serialNumber" disabled></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Quantity</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      type="number"
                      class="text-right"
                      v-model="capexInfo.quantity"
                      disabled
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Satuan(UoM)</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="capexInfo.uom"
                      disabled
                      :options="uomData"
                      value-field="key"
                      text-field="desc"
                      style="font-size: 17.6px"
                    />
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Delivery Date</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-datepicker
                      type="date"
                      locale="id"
                      :value="
                        capexInfo.deliveryDate == '0001-01-01T00:00:00Z'
                          ? null
                          : capexInfo.deliveryDate
                      "
                      disabled
                    ></b-form-datepicker>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Justification</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-textarea v-model="capexInfo.justification" disabled max-rows="10"></b-form-textarea>
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
                        :value="capexInfo.totalAmount | toCurrency"
                      />
                    </b-input-group>
                  </b-col>
                </b-row>
                <div v-if="capexInfo.budgetType == 'B'">
                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>Total Budget</label>
                    </b-col>
                    <b-col sm="8">
                      <b-input-group size prepend="Rp">
                        <b-form-input
                          class="text-right"
                          disabled
                          :value="capexInfo.totalBudget | toCurrency"
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
                          class="text-right"
                          disabled
                          :value="budgetInfo.budgetRemaining | toCurrency"
                        />
                      </b-input-group>
                    </b-col>
                  </b-row>
                </div>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Plant</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="capexInfo.plant"
                      disabled
                      :options="plantData"
                      value-field="plantCode"
                      text-field="plantName"
                      style="font-size: 17.6px"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Storage Location</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="capexInfo.storageLocation"
                      disabled
                      :options="storageLocData"
                      value-field="slocCode"
                      text-field="slocName"
                      style="font-size: 17.6px"
                    ></b-form-select>
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
            <b-button
              v-if="!editable && capexInfo.ACCApproved == '' && hasACCApprover"
              class="m-3"
              variant="info"
              @click="editable = true"
            >Edit</b-button>
          </div>
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Asset Class</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="assetClass"
                      :options="assetClassInfo"
                      :disabled="!editable"
                      value-field="assetClassCode"
                      text-field="assetClassDesc"
                      style="font-size: 17.6px"
                      aria-describedby="asset-class-feedback"
                      :state="
                        !(!$v.assetClass.required && $v.assetClass.$error)
                          ? null
                          : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback
                      id="asset-class-feedback"
                      v-if="!$v.assetClass.required && $v.assetClass.$error"
                    >Please select asset class.</b-form-invalid-feedback>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Asset Type Activity</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="capexInfo.assetActivityType"
                      :options="actTypeInfo"
                      :disabled="!editable"
                      value-field="actTypeCode"
                      text-field="actTypeDesc"
                      style="font-size: 17.6px"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Asset Group</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="capexInfo.assetGroup"
                      :options="assetGroupInfo"
                      :disabled="!editable"
                      value-field="assetGrpCode"
                      text-field="assetGrpDesc"
                      style="font-size: 17.6px"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="4">
                    <label>Asset Generation Mode</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      v-model="assetGenMode"
                      :options="assetGenModeData"
                      :disabled="!editable"
                      value-field="key"
                      text-field="desc"
                      style="font-size: 17.6px"
                      aria-describedby="asset-gen-mode-class-feedback"
                      :state="
                        !(!$v.assetGenMode.required && $v.assetGenMode.$error)
                          ? null
                          : false
                      "
                    >
                      <template v-slot:first>
                        <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback
                      id="asset-gen-mode-class-feedback"
                      v-if="!$v.assetGenMode.required && $v.assetGenMode.$error"
                    >Please select asset generation mode.</b-form-invalid-feedback>
                  </b-col>
                </b-row>

                <div v-if="capexInfo.SAPCompanyCode">
                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>SAP Company Code</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input
                        :value="capexInfo.SAPCompanyCode"
                        disabled
                        style="font-size: 17.6px"
                      />
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>SAP Asset Number</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input
                        :value="capexInfo.SAPAssetNo"
                        disabled
                        style="font-size: 17.6px"
                      />
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col sm="4">
                      <label>SAP Asset Sub Number</label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input
                        :value="capexInfo.SAPAssetSubNo"
                        disabled
                        style="font-size: 17.6px"
                      />
                    </b-col>
                  </b-row>
                </div>

                <div
                  v-if="
                    capexInfo.nextApproval == userId &&
                      capexInfo.ACCApproved == 'X'
                  "
                >
                  <b-row align-h="around" class="mt-3">
                    <b-col cols="5" class="text-right">
                      <b-button variant="danger" v-b-modal.rejectNoteModal>Reject</b-button>
                      <b-modal
                        id="rejectNoteModal"
                        ref="modal"
                        title="Reject Note"
                        hide-header-close
                        @ok="rejectCapex"
                      >
                        <b-form-group :state="nameState" invalid-feedback="Minimun 10 Character">
                          <b-form-textarea
                            v-model="rejectNote"
                            max-rows="10"
                            placeholder="Tulis sesuatu (minimal 10 character)"
                            style="overflow:auto"
                            :state="rejectNote.length >= 10"
                          ></b-form-textarea>
                        </b-form-group>
                      </b-modal>
                    </b-col>
                    <b-col cols="5" class="text-left">
                      <b-button variant="success" @click="apprCapex">Approve</b-button>
                    </b-col>
                  </b-row>
                </div>
                <div v-if="hasACCApprover">
                  <b-row align-h="around" class="mt-3" v-if="editable">
                    <b-col cols="5" class="text-right">
                      <b-button variant="danger" @click="clearField">Cancel</b-button>
                    </b-col>
                    <b-col cols="5" class="text-left">
                      <b-button variant="success" @click="updateCapex">Submit</b-button>
                    </b-col>
                  </b-row>
                </div>
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

    <div class="m-portlet" v-if="capexApprover.length > 0">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">Approver</h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <div class="m-form__section m-form__section--first">
          <list-table-appr :listData="capexApprover" />
        </div>
      </div>
    </div>

    <div class="m-portlet" v-if="listAsset.length > 0">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">Asset</h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <div class="m-form__section m-form__section--first">
          <list-asset :listData="listAsset" />
        </div>
      </div>
    </div>
    <Print v-show="false" id="printMe" :capexInfo="capexInfo" :budgetInfo="budgetInfo" />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import { axiosCapex } from '../axios-instance';
import { capexMixin } from '../mixins';
import ListTableAppr from '../components/ListTableAppr';
import Print from '../components/Print';
import ListAsset from '../components/ListAsset';
export default {
  mixins: [capexMixin],
  components: {
    ListTableAppr,
    Print,
    ListAsset
  },
  data() {
    return {
      editable: false,
      errorMessage: '',
      saveDialog: false,
      saveText: 'Save',
      apprDialog: false,
      apprText: '',
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
      assetClass: '',
      rejectDialog: false,
      rejectNote: '',
      updateErrorMsg: '',
      showUpdateMsg: false,
      timeout: 5000,
      overlay: false,
      uomData: [
        { key: 'PC', desc: 'Buah' },
        { key: 'KG', desc: 'Kg' },
        { key: 'L', desc: 'Liter' }
      ],
      assetGenMode: '',
      assetGenModeData: [
        { key: 'S', desc: 'Single' },
        { key: 'M', desc: 'Multiple' }
      ],
      listAsset: []
    };
  },
  computed: {
    hasACCApprover() {
      return this.$store.getters.findRule('ACCAPPROVER');
    }
  },
  validations: {
    assetClass: {
      required
    },
    assetGenMode: {
      required
    }
  },

  methods: {
    clearField() {
      this.editable = false;
      this.assetClass = '';
      this.capexInfo.assetActivityType = '';
      this.capexInfo.assetGroup = '';
    },

    print() {
      this.$htmlToPaper('printMe');
    },
    async replicate() {
      try {
        let result = await this.$bvModal.msgBoxConfirm(
          'Yakin untuk replikasi capex ke SAP?',
          {
            title: 'Replikasi Capex',
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
          await axiosCapex.post(`/capexTrx/${this.capexInfo.ID}/replicate`);
          this.$root.$bvToast.toast(
            `Capex ${this.capexInfo.ID} submitted to SAP`,
            {
              variant: 'primary',
              toastClass: 'sm_toast',
              bodyClass: 'sm_toast__body ',
              noCloseButton: true,
              toaster: 'b-toaster-bottom-center',
              autoHideDelay: 3000
            }
          );
          this.$router.push('/replicate');
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
    },
    async updateCapex() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          let result = await this.$bvModal.msgBoxConfirm(
            'Yakin untuk update capex?',
            {
              title: 'Update Capex',
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
            this.saveCapex(this.capexInfo.ID);
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
        }
      }
    },
    showApprDialog(status) {
      switch (status) {
        case 'A':
          this.apprText = 'approve';
          this.apprDialog = true;
          break;
        case 'R':
          this.apprText = 'reject';
          this.rejectDialog = true;
          break;
      }
    },
    async rejectCapex(bvModalExt) {
      bvModalExt.preventDefault();

      if (this.rejectNote.length <= 10) {
        return;
      }

      this.$nextTick(() => {
        this.$bvModal.hide('rejectNoteModal');
      });

      let seq = 0;
      for (let approver of this.capexApprover) {
        if (approver.Status == '' && approver.Approver == this.userId) {
          seq = approver.Seq;
          break;
        }
      }
      try {
        let result = await this.$bvModal.msgBoxConfirm(
          'Yakin untuk reject capex?',
          {
            title: 'Reject Capex',
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
          await axiosCapex.post('/reject', {
            capexID: this.capexInfo.ID,
            seq,
            remark: this.rejectNote
          });
          this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} rejected`, {
            variant: 'primary',
            toastClass: 'sm_toast',
            bodyClass: 'sm_toast__body ',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-center',
            autoHideDelay: 3000
          });
          this.$router.push('/waitAppr');
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
      }
    },

    async apprCapex() {
      // this.apprDialog = false;
      // this.disableApprRejctButton = true;
      let seq = 0;
      // let path = "";
      for (let approver of this.capexApprover) {
        if (approver.Status == '' && approver.Approver == this.userId) {
          seq = approver.Seq;
          break;
        }
      }
      try {
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
            centered: true
          }
        );
        if (result) {
          await axiosCapex.post('/approve', {
            capexID: this.capexInfo.ID,
            seq
          });
          this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} approved`, {
            variant: 'primary',
            toastClass: 'sm_toast',
            bodyClass: 'sm_toast__body ',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-center',
            autoHideDelay: 3000
          });
          this.$router.push('/waitAppr');
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
      }
    },
    async saveCapex(ID) {
      this.saveDialog = false;
      this.saveText = 'Updating';
      try {
        await axiosCapex.put('/capexTrx/' + ID, {
          assetClass: this.assetClass,
          assetActivityType: this.capexInfo.assetActivityType,
          assetGroup: this.capexInfo.assetGroup,
          assetGenMode: this.capexInfo.assetGenMode
        });
        this.$root.$bvToast.toast(`Capex ${ID} updated`, {
          variant: 'primary',
          toastClass: 'sm_toast',
          bodyClass: 'sm_toast__body ',
          noCloseButton: true,
          toaster: 'b-toaster-bottom-center',
          autoHideDelay: 3000
        });
        this.$router.push('/waitAppr');
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
    },

    async fetchCapex(ID) {
      new Promise(async (resolve, reject) => {
        try {
          const result = await axiosCapex.get('/capexTrx/' + ID);

          this.capexApprover = result.data.approver;
          this.capexInfo = result.data.capexDetail;
          this.requestorInfo = result.data.requestorInfo;
          let budgetCode = this.capexInfo.budgetApprovalCode;
          this.budgetInfo = this.budgetApprovalCodeData.find(function(value) {
            return value.budgetCode == budgetCode;
          });

          if (this.capexInfo.budgetType != 'U') {
            this.capexInfo.totalBudget = this.budgetInfo.budgetAmount;
          }

          this.assetClass = this.capexInfo.assetClass;

          this.remainingBudget =
            this.capexInfo.totalBudget - this.capexInfo.totalAmount;
          resolve();
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
          reject();
        }
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
        return '';
      }
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }
  },
  async created() {
    try {
      const result = await axiosCapex.get('/createInfo');
      this.budgetApprovalCodeData = result.data.budgetInfo;
      this.purposeData = result.data.purposeInfo;
      this.plantData = result.data.plantInfo;
      this.storageLocData = result.data.slocInfo;
      this.assetClassInfo = result.data.assetClassInfo;
      this.actTypeInfo = result.data.actTypeInfo;
      this.assetGroupInfo = result.data.assetGrpInfo;

      this.costCenterData = result.data.costCenterInfo.map(cc => ({
        costCenterCode: cc.costCenterCode,
        costCenterName: `${cc.costCenterCode} | ${cc.costCenterName}`
      }));

      await this.fetchCapex(this.$route.params.ID);
      const asset = await axiosCapex.get(
        `/capexAsset/${this.$route.params.ID}`
      );
      this.listAsset = asset.data;
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
      this.$router.push('/');
    }
  }
};
</script>

<style></style>
