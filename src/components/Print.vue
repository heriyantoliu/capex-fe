<template>
  <div>
    <table
      width="auto"
      border="1px solid black"
      cellpadding="0"
      cellspacing="0"
      style="border-style: solid;"
    >
      <tr>
        <td width="705" height="182">
          <table width="716" border="0">
            <tr>
              <td width="9" height="21">
                <span class="style18"></span>
              </td>
              <td width="82">
                <span class="style17">COMPANY</span>
              </td>
              <td width="8">
                <span class="style17">:</span>
              </td>
              <td width="437">
                <span class="style18">PT Industri Jamu dan Farmasi Sido Muncul</span>
              </td>
              <td width="29">
                <table
                  width="29"
                  height="27"
                  border="1px solid black"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      width="10"
                      height="10"
                      class="style17"
                    >{{ capexInfo.budgetType == 'B' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td width="96">
                <span class="style17">Budgeted</span>
              </td>
              <td width="25">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <span class="style17">1</span>
              </td>
              <td>
                <span class="style17">DEPARTEMEN</span>
              </td>
              <td>
                <span class="style17">:</span>
              </td>
              <td>
                <span class="style18">{{ capexInfo.requestorPosition }}</span>
              </td>
              <td>
                <table
                  width="29"
                  height="27"
                  border="1px solid black"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.budgetType != 'B' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td>
                <span class="style17">Unbudgeted</span>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <span class="style17">2</span>
              </td>
              <td>
                <span class="style17">COST CENTER</span>
              </td>
              <td>
                <span class="style17">:</span>
              </td>
              <td>
                <span class="style18">{{ capexInfo.costCenter }}</span>
              </td>
              <td>
                <span class="style18"></span>
              </td>
              <td>
                <span class="style18"></span>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan="7">
                <div align="center" class="style19">CAPITAL EXPENDITURE APPROVAL (CEA)</div>
              </td>
            </tr>
          </table>

          <table width="717" border="0">
            <tr>
              <td width="10">
                <span class="style17">3</span>
              </td>
              <td width="118">
                <span class="style17">Budget Approval Code</span>
              </td>
              <td width="10">
                <span class="style17">:</span>
              </td>
              <td width="223">{{ capexInfo.budgetApprovalCode }}</td>
              <td width="10">
                <span class="style17">4</span>
              </td>
              <td width="27">
                <span class="style17">Date</span>
              </td>
              <td width="10">
                <span class="style17">:</span>
              </td>
              <td width="275">{{ toDateString(capexInfo.CreatedAt) }}</td>
            </tr>
          </table>

          <hr />
          <table width="715" border="0">
            <tr>
              <td width="8">
                <span class="style17">5</span>
              </td>
              <td colspan="2">
                <span class="style17">
                  <p>
                    <u>Purpose :</u>
                    {{purpose}}
                  </p>
                </span>
              </td>
              <td width="10">&nbsp;</td>
              <td width="30">&nbsp;</td>
              <td width="217">&nbsp;</td>
              <td width="49">&nbsp;</td>
              <td width="49">&nbsp;</td>
              <td width="71">&nbsp;</td>
            </tr>
          </table>

          <hr />
          <p class="style17">
            6
            <u>Request Description :</u>
          </p>
          <table width="716" border="1px solid black" cellspacing="0" cellpadding="0">
            <tr>
              <td width="18" rowspan="3">
                <div align="center" class="style17">No</div>
              </td>
              <td width="220" rowspan="3">
                <div align="center" class="style17">Description Fixed Asset</div>
              </td>
              <td width="30" rowspan="3">
                <div align="center" class="style17">Qty</div>
                <div align="center" class="style17"></div>
              </td>
              <td width="70" rowspan="3">
                <div align="center" class="style17">Unit Price</div>
                <div align="center" class="style17"></div>
              </td>
              <td colspan="5">
                <div align="center" class="style17">Financing Summary</div>
                <div align="center" class="style17"></div>
                <div align="center" class="style17"></div>
                <div align="center" class="style17"></div>
                <div align="center" class="style17"></div>
                <div align="center" class="style17"></div>
              </td>
            </tr>
            <tr>
              <td width="58" rowspan="2">
                <div align="center" class="style17">Currency</div>
              </td>
              <td width="70" rowspan="2">
                <div align="center" class="style17">Total Amount</div>
              </td>
              <td width="112" rowspan="2">
                <div align="center" class="style17">Budgeted Amount</div>
              </td>
              <td colspan="2">
                <div align="center" class="style17">Variance</div>
                <div align="center" class="style17"></div>
                <div align="center" class="style17"></div>
              </td>
            </tr>
            <tr>
              <td width="57">
                <div align="center">
                  <span class="style17">Amount</span>
                </div>
              </td>
              <td width="23">
                <div align="center">
                  <span class="style17">%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span class="style25">1</span>
              </td>
              <td>
                <span class="style25">{{ capexInfo.description }}</span>
              </td>
              <td style="text-align: right;">
                <span class="style25">
                  {{
                  capexInfo.quantity | toCurrency
                  }}
                </span>
              </td>
              <td style="text-align: right;">
                <span class="style25">{{ unitPrice | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">IDR</span>
              </td>
              <td style="text-align: right;">
                <span class="style25">
                  {{
                  capexInfo.totalAmount | toCurrency
                  }}
                </span>
              </td>
              <td style="text-align: right;">
                <template v-if="budgetInfo">
                  <span class="style25">
                    {{
                    budgetInfo.budgetAmount | toCurrency
                    }}
                  </span>
                </template>
              </td>
              <td style="text-align: right;">
                <span class="style25">{{ variant | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">{{ variantPct.toFixed(2) }}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="style25">2</span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
              <td>
                <span class="style25"></span>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div align="center" class="style25">
                  <span class="style18">Total</span>
                </div>
              </td>
              <td style="text-align: right;">
                <span class="style25">
                  {{
                  capexInfo.quantity | toCurrency
                  }}
                </span>
              </td>
              <td style="text-align: right;">
                <span class="style25">{{ unitPrice | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">IDR</span>
              </td>
              <td style="text-align: right;">
                <span class="style25">
                  {{
                  capexInfo.totalAmount | toCurrency
                  }}
                </span>
              </td>
              <td style="text-align: right;">
                <template v-if="budgetInfo">
                  <span class="style25">
                    {{
                    budgetInfo.budgetAmount | toCurrency
                    }}
                  </span>
                </template>
              </td>
              <td style="text-align: right;">
                <span class="style25">{{ variant | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">{{ variantPct.toFixed(2) }}</span>
              </td>
            </tr>
          </table>

          <p class="style17">Total Capex (in word) : {{ capexInfo.totalAmount | inSpell }}</p>
          <p class="style17">Schedule of the FA needed : {{ toDateString(capexInfo.deliveryDate) }}</p>
          <p class="style17"></p>
          <hr />
          <p class="style17">
            7
            <u>Request Justification :</u>
            {{ capexInfo.justification }}
          </p>

          <br />
          <table width="719" border="1px solid black" cellspacing="0" cellpadding="0">
            <tr>
              <td width="307">
                <div align="center">
                  <span class="style19">Requistioner</span>
                </div>
              </td>
              <td width="394">
                <div align="center" class="style19">Final Approved</div>
              </td>
            </tr>
            <tr>
              <td height="23">
                <p>&nbsp</p>
                <p style="text-align:center">{{ requestorInfo.Name }}</p>
              </td>
              <td rowspan="3">
                <p>&nbsp</p>
                <p>&nbsp</p>
                <p>&nbsp</p>
                <p>&nbsp</p>
                <p>&nbsp</p>

                <table
                  style="table-layout: auto; width: 100%; text-align: center; font-size: 12px;"
                >
                  <tr>
                    <td
                      v-for="appr in director"
                      :key="appr.username"
                    >{{ appr.Status == 'A' ? 'Digital signed' : '&nbsp;' }}</td>
                  </tr>
                  <tr>
                    <td v-for="appr in director" :key="appr.username">
                      <u>{{ appr.Name }}</u>
                    </td>
                  </tr>
                  <tr>
                    <td
                      v-for="appr in director"
                      :key="appr.username"
                    >{{ appr.Status == 'A' ? appr.UpdatedAt : '&nbsp;' }}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <div class="style17">
                  <p style="text-align: center;">
                    <strong>Reviewed by,</strong>
                  </p>

                  <table
                    style="table-layout: auto; width: 100%; text-align: center; font-size: 12px;"
                  >
                    <tr>
                      <td
                        v-for="appr in reviewer"
                        :key="appr.username"
                      >{{ appr.Status == 'A' ? 'Digital signed' : '&nbsp;' }}</td>
                    </tr>
                    <tr>
                      <td v-for="appr in reviewer" :key="appr.username">
                        <u>{{ appr.Name }}</u>
                      </td>
                    </tr>
                    <tr>
                      <td
                        v-for="appr in reviewer"
                        :key="appr.username"
                      >{{ appr.Status == 'A' ? appr.UpdatedAt : '&nbsp;' }}</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="style17">
                  <p style="text-align: center;">
                    <strong>Approved by,</strong>
                  </p>

                  <table
                    style="table-layout: auto; width: 100%; text-align: center; font-size: 12px;"
                  >
                    <tr>
                      <td
                        v-for="appr in approver"
                        :key="appr.username"
                      >{{ appr.Status == 'A' ? 'Digital signed' : '&nbsp;' }}</td>
                    </tr>
                    <tr>
                      <td v-for="appr in approver" :key="appr.username">
                        <u>{{ appr.Name }}</u>
                      </td>
                    </tr>
                    <tr>
                      <td
                        v-for="appr in approver"
                        :key="appr.username"
                      >{{ appr.Status == 'A' ? appr.UpdatedAt : '&nbsp;' }}</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" class="style19">Mgr/GM/Unit Head</div>
              </td>
              <td>
                <div align="center">
                  <span class="style19">BOD</span>
                </div>
              </td>
            </tr>
          </table>

          <br />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { capexMixin } from '../mixins';
export default {
  mixins: [capexMixin],
  props: {
    capexInfo: {
      type: Object,
      required: true,
    },
    budgetInfo: {
      type: Object,
    },
    requestorInfo: {
      type: Object,
    },
    capexApprover: {
      type: Array,
    },
    purpose: {
      type: String,
    },
  },
  // data() {
  //   return {
  //     review: [],
  //     approve: [],
  //     bod: [],
  //   };
  // },
  computed: {
    unitPrice: function () {
      if (!this.capexInfo.quantity) {
        return 0;
      } else {
        return this.capexInfo.totalAmount / this.capexInfo.quantity;
      }
    },
    variant: function () {
      if (this.budgetInfo) {
        return this.budgetInfo.budgetAmount - this.capexInfo.totalAmount;
      }
      return 0;
    },
    variantPct: function () {
      if (this.variant == 0) {
        return 0;
      } else {
        if (this.budgetInfo) {
          return (this.variant / this.budgetInfo.budgetAmount) * 100;
        }
        return 0;
      }
    },
    reviewer: function () {
      return this.capexApprover
        .filter((appr) => {
          return (
            appr.approver == 'SMAP010' ||
            appr.approver == 'SMAP029' ||
            appr.approver == 'SMAP006'
          );
          // return appr.Approver == 'a';
        })
        .map((appr) => {
          return { ...appr, UpdatedAt: this.toDateString(appr.UpdatedAt) };
        });
    },
    director: function () {
      return this.capexApprover
        .filter((appr) => {
          return (
            appr.approver == 'SMAP001' ||
            appr.approver == 'SMAP004' ||
            appr.approver == 'SMAP002'
          );
          // return appr.Approver == 'd';
        })
        .map((appr) => {
          return { ...appr, UpdatedAt: this.toDateString(appr.UpdatedAt) };
        });
    },
    approver: function () {
      return this.capexApprover
        .filter((appr) => {
          return (
            appr.approver != 'SMAP010' &&
            appr.approver != 'SMAP029' &&
            appr.approver != 'SMAP006' &&
            appr.approver != 'SMAP001' &&
            appr.approver != 'SMAP004' &&
            appr.approver != 'SMAP002'
          );
          // return appr.Approver != 'a' && appr.Approver != 'd';
        })
        .map((appr) => {
          return { ...appr, UpdatedAt: this.toDateString(appr.UpdatedAt) };
        });
    },
  },
  methods: {
    toDateString(value) {
      const date = new Date(value);

      if (date.getFullYear() == 1) {
        return '';
      }
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    },
  },
};
</script>

<style scoped>
</style>
