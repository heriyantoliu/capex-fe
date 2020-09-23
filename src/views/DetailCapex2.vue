<template>
  <div class="m-content">
    <b-tabs>
      <b-tab title="Information">
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

                <b-button-group>
                  <b-button
                    v-if="capexInfo.status != 'R' && capexInfo.status != 'D'"
                    class="my-3 text-right"
                    variant="primary"
                    @click="print"
                  >Print</b-button>
                  <b-button
                    v-if="capexInfo.status == 'A'"
                    class="my-3"
                    variant="info"
                    @click="replicate"
                  >Replicate to SAP</b-button>
                  <b-button
                    v-if="
                      capexInfo.status == 'D' &&
                        capexInfo.createdBy == currentUser
                    "
                    class="my-3"
                    variant="info"
                    @click="editCreator = true"
                  >Edit</b-button>
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
                        <label>Cost Center*</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="costCenterData"
                          v-model="costCenter"
                          describedBy="cost-center-feedback"
                          :disabled="!editCreator"
                          :state="
                            !(!$v.costCenter.required && $v.costCenter.$error)
                              ? null
                              : false
                          "
                        >
                          <b-form-invalid-feedback
                            id="cost-center-feedback"
                          >Please select Cost Center.</b-form-invalid-feedback>
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
                    <h3 class="m-portlet__head-text">Capital Expenditure Information</h3>
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
                          :disabled="!editCreator"
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
                            <b-form-select-option value disabled>
                              -- Please select an option
                              --
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                        <b-form-invalid-feedback id="purpose-feedback">Please select purpose.</b-form-invalid-feedback>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Budget Type</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-checkbox v-model="unbudget" :disabled="!editCreator">Unbudgetted</b-form-checkbox>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Deskripsi*</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input
                          v-model="description"
                          :disabled="!editCreator"
                          aria-describedby="deskripsi-feedback"
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
                        >This field must not be empty.</b-form-invalid-feedback>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Serial Number</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input size v-model="serialNumber" :disabled="!editCreator"></b-form-input>
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
                          :disabled="!editCreator"
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
                        >This field must not be empty</b-form-invalid-feedback>
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
                          :disabled="!editCreator"
                          describedBy="uom-feedback"
                          :state="
                            !(!$v.uom.required && $v.uom.$error) ? null : false
                          "
                        >
                          <b-form-invalid-feedback
                            id="uom-feedback"
                            v-if="!$v.uom.required && $v.uom.$error"
                          >Please select UoM.</b-form-invalid-feedback>
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
                          :disabled="!editCreator"
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
                          :disabled="!editCreator && !editAcc"
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
                        >This field must not be empty.</b-form-invalid-feedback>
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
                            :disabled="!editCreator"
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
                          >This field must not be empty</b-form-invalid-feedback>
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
                          :disabled="!editCreator"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="6">
                        <b-form-input
                          inputmode="numeric"
                          class="text-right"
                          placeholder="Foreign Amount"
                          :value="foreignAmountText"
                          :disabled="!editCreator"
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
                          :disabled="!editCreator"
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
                          >Please select plant.</b-form-invalid-feedback>
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
                          :disabled="!editCreator"
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
                          >Please select storage location.</b-form-invalid-feedback>
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

                <b-button
                  v-if="!editAcc && capexInfo.status == 'ACC' && hasACCApprover"
                  class="m-3"
                  variant="info"
                  @click="editAcc = true"
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
                        <comp-select
                          :options="assetClassInfo"
                          v-model="assetClass"
                          :disabled="!editAcc"
                        />
                        <!-- <b-form-select
                            v-model="assetClass"
                            :options="assetClassInfo"
                            :disabled="!editAcc"
                            value-field="assetClassCode"
                            text-field="assetClassDesc"
                            style="font-size: 17.6px"
                            aria-describedby="asset-class-feedback"
                            
                          >
                            <template v-slot:first>
                              <b-form-select-option value disabled>-- Please select an option --</b-form-select-option>
                            </template>
                        </b-form-select>-->
                        <!-- <b-form-invalid-feedback
                            id="asset-class-feedback"
                            v-if="!$v.assetClass.required && $v.assetClass.$error"
                        >Please select asset class.</b-form-invalid-feedback>-->
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Asset Type Activity</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="actTypeInfo"
                          v-model="assetActivityType"
                          :disabled="!editAcc && !editCreator"
                        />
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <label>Asset Group</label>
                      </b-col>
                      <b-col sm="8">
                        <comp-select
                          :options="assetGroupInfo"
                          v-model="assetGroup"
                          :disabled="!editAcc"
                        />
                        <!-- <b-form-select
                            v-model="capexInfo.assetGroup"
                            :options="assetGroupInfo"
                            :disabled="!editAcc"
                            value-field="assetGrpCode"
                            text-field="assetGrpDesc"
                            style="font-size: 17.6px"
                          >
                            <template v-slot:first>
                              <b-form-select-option :value="null"></b-form-select-option>
                            </template>
                        </b-form-select>-->
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
                          :disabled="!editAcc"
                          value-field="key"
                          text-field="desc"
                          style="font-size: 17.6px"
                          aria-describedby="asset-gen-mode-class-feedback"
                        >
                          <template v-slot:first>
                            <b-form-select-option value disabled>
                              -- Please select an option
                              --
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                        <!-- <b-form-invalid-feedback
                            id="asset-gen-mode-class-feedback"
                            v-if="!$v.assetGenMode.required && $v.assetGenMode.$error"
                          >
                            Please select asset generation
                            mode.
                        </b-form-invalid-feedback>-->
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col sm="4">
                        <label>Asset Note</label>
                      </b-col>
                      <b-col sm="8">
                        <b-form-textarea v-model="assetNote" :disabled="!editAcc" />
                      </b-col>
                    </b-row>
                    <div
                      v-if="
                        capexInfo.status == 'D' || capexInfo.status == 'ACC'
                      "
                    >
                      <div v-if="editCreator || editAcc">
                        <b-row align-h="around" class="mt-3">
                          <b-col cols="4" class="text-right">
                            <b-button variant="danger">Clear</b-button>
                          </b-col>
                          <b-col cols="4" v-if="capexInfo.status == 'D'" class="text-center">
                            <b-button variant="warning" @click="validate('D')">Draft</b-button>
                          </b-col>
                          <b-col cols="4" class="text-left">
                            <b-button variant="success" @click="validate('ACC')">Submit</b-button>
                          </b-col>
                        </b-row>
                      </div>
                    </div>

                    <div
                      v-if="
                        capexInfo.status == 'I' &&
                          capexInfo.nextApproval == currentUser
                      "
                    >
                      <b-row align-h="around" class="mt-3">
                        <b-col cols="5" class="text-right">
                          <b-button variant="danger" v-b-modal.reject-note-modal>Reject</b-button>
                        </b-col>
                        <b-col cols="5" class="text-left">
                          <b-button variant="success" @click="approve">Approve</b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-container>
                </div>
              </div>
            </div>
          </form>

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

          <template v-slot:overlay>
            <div class="text-center p-4 h1 bg-primary text-light rounded">
              <div class="mb-3">Processing...</div>
            </div>
          </template>
        </b-overlay>

        <Print
          v-show="false"
          id="printMe"
          :capexInfo="capexInfo"
          :listBudget="listBudgetCode"
          :requestorInfo="requestorInfo"
          :capexApprover="capexApprover"
          :purpose="purposePrint.purposeDesc"
          :costCenter="costCenterPrint"
        />
      </b-tab>

      <b-tab title="Budget" v-if="!unbudget">
        <list-budget-code
          v-model="listBudgetCode"
          :budgetCodeData="budgetApprovalCodeData"
          :amount="totalAmount"
          :costCenterData="costCenterData"
          :disabled="!editCreator"
        />
      </b-tab>
      <b-tab title="Attachment">
        <list-attachment v-model="files" :disabled="!editCreator" />
      </b-tab>
    </b-tabs>
    <b-modal id="reject-note-modal" ref="modal" title="Reject Note" hide-header-close @ok="reject">
      <b-form-group invalid-feedback="Minimun 10 Character">
        <b-form-textarea
          v-model="rejectNote"
          max-rows="10"
          placeholder="Tulis sesuatu (minimal 10 character)"
          style="overflow:auto"
          :state="rejectNote.length >= 10"
        ></b-form-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
import { required, minLength } from 'vuelidate/lib/validators';
import compSelect from '../components/Select';
import ListBudgetCode from '../components/ListBudgetCode';
import { capexMixin } from '../mixins';
import Print from '../components/Print';
import ListTableAppr from '../components/ListTableAppr';
import ListAsset from '../components/ListAsset';
import ListAttachment from '../components/ListAttachment';

const requiredNumber = (value) => {
  if (value == '0') {
    return false;
  }
  return true;
};

export default {
  components: {
    compSelect,
    ListBudgetCode,
    Print,
    ListTableAppr,
    ListAsset,
    ListAttachment,
  },
  mixins: [capexMixin],
  filters: {
    separator(value) {
      return value.toLocaleString('ID');
    },
  },
  data() {
    return {
      errorMessage: '',
      dialog: false,
      description: '',
      deliveryDate: null,
      quantity: 0,
      quantityText: '0',
      serialNumber: '',
      justification: '',
      unitPrice: null,
      unitPriceText: '0',
      totalAmountText: '0',
      unbudget: false,
      budgetRaw: [],
      costCenterData: [],
      purposeData: [],
      purpose: '',
      budgetApprovalCode: '',
      budgetApprovalCodeData: [],
      uomData: [],
      uom: '',
      plantData: [],
      plant: '',
      storageLocData: [],
      storageLoc: '',

      overlay: false,
      actTypeInfo: [],
      assetActivityType: '',

      costCenter: '',
      budgetOwnerInfo: {},
      totalBudget: 0,
      listBudgetCode: [],
      capexInfo: {},
      requestorInfo: {},
      assetGenMode: '',
      assetGenModeData: [
        { key: 'S', desc: 'Single' },
        { key: 'M', desc: 'Multiple' },
      ],
      assetGroupInfo: [],
      assetClassInfo: [],
      assetClass: '',
      assetGroup: '',
      editAcc: false,
      editCreator: false,
      costCenterPrint: {},
      purposePrint: {},
      budgetInfo: {},
      capexApprover: [],
      listAsset: [],
      rejectNote: '',
      files: [],
      foreignAmount: 0,
      foreignAmountText: '0',
      foreignCurrency: '',
      assetNote: '',
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
    },
    currentUser() {
      return this.$store.state.username;
    },
    hasACCApprover() {
      return this.$store.getters.findRole('ACCAPPROVER');
    },
  },
  watch: {
    costCenter(newValue, oldValue) {
      if (newValue == undefined || oldValue == undefined) {
        return;
      }

      if (newValue != oldValue) {
        this.budgetApprovalCode = '';
        this.totalBudget = 0;
        this.budgetOwnerInfo = {};
        this.listBudgetCode = [];
      }
    },
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
    },
  },
  validations: {
    costCenter: {
      required,
    },
    purpose: {
      required,
    },
    description: {
      required,
      minLength: minLength(10),
    },
    justification: {
      required,
      minLength: minLength(10),
    },

    unitPriceText: {
      requiredNumber,
    },
    quantityText: {
      requiredNumber,
    },
    uom: {
      required,
    },
    plant: {
      required,
    },
    storageLoc: {
      required,
    },
  },
  methods: {
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
            centered: true,
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
              autoHideDelay: 3000,
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
          centered: true,
        });
        this.overlay = false;
      }
    },
    async approve() {
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
            centered: true,
          }
        );
        if (result) {
          await axiosCapex.patch(`/capexTrx/${this.capexInfo.ID}/approve`);
          this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} approved`, {
            variant: 'primary',
            toastClass: 'sm_toast',
            bodyClass: 'sm_toast__body ',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-center',
            autoHideDelay: 3000,
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
          centered: true,
        });
      }
    },
    async reject(bvModalExt) {
      bvModalExt.preventDefault();

      if (this.rejectNote.length <= 10) {
        return;
      }

      this.$nextTick(() => {
        this.$bvModal.hide('reject-note-modal');
      });

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
            centered: true,
          }
        );
        if (result) {
          await axiosCapex.patch(`/capexTrx/${this.capexInfo.ID}/reject`, {
            remark: this.rejectNote,
          });
          this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} rejected`, {
            variant: 'primary',
            toastClass: 'sm_toast',
            bodyClass: 'sm_toast__body ',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-center',
            autoHideDelay: 3000,
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
          centered: true,
        });
      }
    },
    print() {
      this.$htmlToPaper('printMe');
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
      var regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    async validate(status) {
      if (this.capexInfo.status == 'D') {
        this.validateCreator(status);
      } else {
        this.verifiedAcc();
      }
    },
    async verifiedAcc() {
      if (!this.assetClass) {
        this.$bvModal.msgBoxOk('Asset Class masih kosong', {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        });
        return;
      }
      if (!this.assetGenMode) {
        this.$bvModal.msgBoxOk('Asset generation mode masih kosong', {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        });
        return;
      }
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
            centered: true,
          }
        );
        if (result) {
          this.overlay = true;
          this.submitAcc();
        }
      } catch (err) {
        this.$bvModal.msgBoxOk(err.response.data.message, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        });
        this.overlay = false;
        this.submitAcc();
      }
    },
    async validateCreator(status) {
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
              centered: true,
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
              centered: true,
            }
          );
          if (result) {
            this.overlay = true;
            this.submitCreator(status);
          }
        } catch (err) {
          this.$bvModal.msgBoxOk(err.response.data.message, {
            title: 'Error',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true,
          });
          this.overlay = false;
        }
      }
    },
    async submitCreator(status) {
      this.dialog = false;

      try {
        const budgetCode = this.listBudgetCode.map((budget) => {
          return {
            budgetCode: budget.code,
            costCenter: budget.costCenter,
            amount: Number(budget.allocation),
            // remaining: status == 'D' ? 0 : Number(budget.remaining),
          };
        });
        let result = await axiosCapex.put(`/capexTrx/${this.capexInfo.ID}`, {
          costCenter: this.costCenter,
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
          // totalBudget: status == 'D' ? 0 : Number(this.totalBudget),
          budgetCode,
          status,
          foreignAmount: Number(this.foreignAmount),
          foreignCurrency: this.foreignCurrency,
        });

        let formData = new FormData();

        const newAttachments = this.files.filter((file) => {
          return file.new;
        });

        newAttachments.forEach((file) => {
          formData.append('files', file.file);
        });

        await axiosCapex.post(
          `capexTrx/${this.capexInfo.ID}/attachment`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        this.$root.$bvToast.toast(`Capex ${result.data.ID} updated`, {
          variant: 'primary',
          toastClass: 'sm_toast',
          bodyClass: 'sm_toast__body ',
          noCloseButton: true,
          toaster: 'b-toaster-bottom-center',
          autoHideDelay: 3000,
        });
        this.$router.push('/myCapex');
      } catch (err) {
        this.$bvModal.msgBoxOk(err.response.data.message, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        });
        this.overlay = false;
        this.errorMessage = err.response.data.message;
      }
    },
    async submitAcc() {
      this.saveDialog = false;
      this.saveText = 'Updating';
      try {
        await axiosCapex.put('/capexTrx/' + this.capexInfo.ID, {
          assetClass: this.assetClass,
          assetActivityType: this.capexInfo.assetActivityType,
          assetGroup: this.capexInfo.assetGroup,
          assetGenMode: this.assetGenMode,
          justification: this.justification,
          assetNote: this.assetNote,
        });
        this.$root.$bvToast.toast(`Capex ${this.capexInfo.ID} updated`, {
          variant: 'primary',
          toastClass: 'sm_toast',
          bodyClass: 'sm_toast__body ',
          noCloseButton: true,
          toaster: 'b-toaster-bottom-center',
          autoHideDelay: 3000,
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
          centered: true,
        });
        this.overlay = false;
      }
    },
    async getCreateInfo() {
      const result = await axiosCapex.get('/createInfo');

      this.purposeData = result.data.purposeInfo.map((purpose) => {
        return {
          id: purpose.purposeID,
          name: purpose.purposeDesc,
        };
      });
      this.budgetRaw = result.data.budgetInfo;
      this.costCenterData = result.data.costCenterInfo.map((cc) => {
        return {
          ...cc,
          id: cc.costCenterCode,
          name: `${cc.costCenterCode} | ${cc.costCenterName}`,
        };
      });
      this.plantData = result.data.plantInfo.map((plant) => {
        return { id: plant.plantCode, name: plant.plantName };
      });
      this.storageLocData = result.data.slocInfo.map((sloc) => {
        return { id: sloc.slocCode, name: sloc.slocName };
      });
      this.uomData = result.data.uomInfo.map((uom) => {
        return {
          id: uom.uom,
          name: uom.desc,
        };
      });
      this.actTypeInfo = result.data.actTypeInfo.map((actType) => {
        return {
          id: actType.actTypeCode,
          name: actType.actTypeDesc,
        };
      });
      this.assetClassInfo = result.data.assetClassInfo.map((ac) => {
        return {
          ...ac,
          id: ac.assetClassCode,
          name: `${ac.assetClassCode} | ${ac.assetClassDesc}`,
        };
      });
      this.assetGroupInfo = result.data.assetGrpInfo.map((ag) => {
        return {
          ...ag,
          id: ag.assetGrpCode,
          name: ag.assetGrpDesc,
        };
      });
      this.budgetApprovalCodeData = this.budgetRaw.map((budget) => {
        return {
          ...budget,
          budgetDesc: `${budget.budgetCode} | ${budget.budgetDesc}`,
          name: `${budget.budgetCode} | ${budget.budgetDesc}`,
          id: budget.budgetCode,
        };
      });

      this.actTypeInfo.unshift({ id: null, name: '' });

      // .catch((err) => {
      //   console.log(err);
      // });
    },
    async fetchCapex(ID) {
      try {
        const result = await axiosCapex.get('/capexTrx/' + ID);
        this.capexInfo = result.data.capexDetail;
        this.requestorInfo = result.data.requestorInfo;
        this.capexApprover = result.data.approver;

        this.files = result.data.attachments.map((file) => {
          return {
            ...file,
            name: file.filename,
            new: false,
            db: true,
            downloading: false,
          };
        });

        this.listBudgetCode = result.data.budget.map((budget) => {
          const budgetInfo = this.budgetApprovalCodeData.find((bc) => {
            return bc.budgetCode == budget.budgetCode;
          });

          return {
            ...budget,
            code: budget.budgetCode,
            allocation: budget.amount,
            remaining:
              this.capexInfo.status == 'D'
                ? budgetInfo.budgetRemaining - budget.amount
                : budget.remaining,
            amount: budgetInfo.budgetAmount,
            allocationText: budget.amount.toLocaleString('id'),
            desc: budgetInfo.budgetDesc,
            used: budgetInfo.budgetAmount - budgetInfo.budgetRemaining,
          };
        });
      } catch (err) {
        await this.$bvModal.msgBoxOk(err.response.data.message, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        });
        this.$router.push('/');
      }
    },
  },
  async created() {
    await this.getCreateInfo();
    await this.fetchCapex(this.$route.params.ID);
    this.costCenter = this.capexInfo.costCenter;
    this.purpose = this.capexInfo.purpose;
    this.unbudget = this.capexInfo.budgetType == 'U' ? true : false;
    this.description = this.capexInfo.description;
    this.serialNumber = this.capexInfo.serialNumber;
    this.quantity = this.capexInfo.quantity;
    this.quantityText = this.quantity.toLocaleString('id');
    this.uom = this.capexInfo.uom;
    this.deliveryDate = this.capexInfo.deliveryDate;
    this.deliveryDate =
      this.capexInfo.deliveryDate == '0001-01-01T00:00:00Z'
        ? null
        : this.capexInfo.deliveryDate;
    this.justification = this.capexInfo.justification;
    this.unitPrice = this.capexInfo.unitPrice;
    this.unitPriceText = this.unitPrice.toLocaleString('id');

    this.foreignAmount = this.capexInfo.foreignAmount;
    this.foreignAmountText = this.foreignAmount.toLocaleString('id');
    this.foreignCurrency = this.capexInfo.foreignCurrency;

    this.plant = this.capexInfo.plant;
    this.storageLoc = this.capexInfo.storageLocation;
    this.assetActivityType = this.capexInfo.assetActivityType;

    this.assetClass = this.capexInfo.assetClass;
    this.assetGroup = this.capexInfo.assetGroup;
    this.assetGenMode = this.capexInfo.assetGenMode;
    this.assetNote = this.capexInfo.assetNote;

    const asset = await axiosCapex.get(
      `/capexTrx/${this.$route.params.ID}/asset`
    );
    this.listAsset = asset.data;

    this.costCenterPrint = this.costCenterData.find((cc) => {
      return cc.costCenterCode == this.capexInfo.costCenter;
    });

    // this.totalBudget = this.listBudgetCode.reduce((a, b) => {
    //     return a + b.remaining;
    //   }, 0);
    // console.log(this.totalBudget)
    if (this.capexInfo.status == 'D') {
      this.totalBudget = this.listBudgetCode.reduce((a, b) => {
        return a + b.remaining + b.allocation;
      }, 0);
    } else {
      this.totalBudget = this.capexInfo.totalBudget;
    }
  },
};
</script>

<style></style>
