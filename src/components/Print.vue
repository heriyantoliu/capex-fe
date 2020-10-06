<template>
  <div>
    <table
      width="auto"
      border="1px solid black"
      cellpadding="0"
      cellspacing="0"
      style="border-style: solid"
    >
      <tr>
        <td width="705" height="182">
          <table width="716" border="0" style="font-size: 12px">
            <tr>
              <td width="9" height="21">
                <span class="style18"></span>
              </td>
              <td width="82">
                <span>COMPANY</span>
              </td>
              <td width="8">
                <span class="style17">:</span>
              </td>
              <td width="437">
                <span class="style18"
                  >PT Industri Jamu dan Farmasi Sido Muncul</span
                >
              </td>
              <td width="125">
                <p>
                  TYPE :
                  {{ capexInfo.budgetType == 'B' ? 'BUDGETED' : 'UNBUDGETED' }}
                </p>

                <!-- <table
                  width="29"
                  height="27"
                  border="1px solid black"
                  cellspacing="0"
                  cellpadding="0"
                  style="font-size: 12px;"
                >
                  <tr>
                    <td
                      width="10"
                      height="10"
                      class="style17"
                    >{{ capexInfo.budgetType == 'B' ? 'X' : '' }}</td>
                  </tr>
                </table>-->
              </td>
              <!-- <td width="96">
                <span class="style17">Budgeted</span>
              </td>-->
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
                <span class="style18">{{ costCenter.costCenterName }}</span>
              </td>
              <td>
                <p>No Capex : {{ capexInfo.ID }}</p>
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
                <span class="style18">{{ costCenter.name }}</span>
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
                <div align="center">
                  <strong>CAPITAL EXPENDITURE APPROVAL (CEA)</strong>
                </div>
                <br />
              </td>
            </tr>
          </table>

          <table width="717" border="0" style="font-size: 12px">
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
              <td width="223"></td>
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
            <tr>
              <td />
              <td>
                <div v-for="budget in listBudget" :key="budget.budgetCode">
                  {{ budget.desc }}
                </div>
              </td>
            </tr>
          </table>

          <hr />
          <table width="715" border="0" style="font-size: 12px">
            <tr>
              <td width="8">
                <span class="style17">5</span>
              </td>
              <td colspan="2">
                <span class="style17">
                  <p>
                    <u>Purpose :</u>
                    {{ purpose }}
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
          <p style="font-size: 12px">
            6
            <u>Request Description :</u>
          </p>
          <table
            width="716"
            border="1px solid black"
            cellspacing="0"
            cellpadding="0"
            style="font-size: 12px"
          >
            <tr>
              <td width="18" rowspan="3">
                <div align="center" class="style17">No</div>
              </td>
              <td width="220" rowspan="3">
                <div align="center" class="style17">
                  Description Fixed Asset
                </div>
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
              <td style="text-align: right">
                <span class="style25">
                  {{ capexInfo.quantity | toCurrency }}
                </span>
              </td>
              <td style="text-align: right">
                <span class="style25">{{ unitPrice | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">IDR</span>
              </td>
              <td style="text-align: right">
                <span class="style25">
                  {{ capexInfo.totalAmount | toCurrency }}
                </span>
              </td>
              <td style="text-align: right">
                <template v-if="totalBudget">
                  <span class="style25">{{ totalBudget | toCurrency }}</span>
                </template>
              </td>
              <td style="text-align: right">
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
              <td style="text-align: right">
                <span class="style25">
                  {{ capexInfo.quantity | toCurrency }}
                </span>
              </td>
              <td style="text-align: right">
                <span class="style25">{{ unitPrice | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">IDR</span>
              </td>
              <td style="text-align: right">
                <span class="style25">
                  {{ capexInfo.totalAmount | toCurrency }}
                </span>
              </td>
              <td style="text-align: right">
                <template v-if="totalBudget">
                  <span class="style25">{{ totalBudget | toCurrency }}</span>
                </template>
              </td>
              <td style="text-align: right">
                <span class="style25">{{ variant | toCurrency }}</span>
              </td>
              <td>
                <span class="style25">{{ variantPct.toFixed(2) }}</span>
              </td>
            </tr>
          </table>

          <div style="font-size: 12px">
            <p class="style17">
              Total Capex (in word) : {{ capexInfo.totalAmount | inSpell }}
            </p>
            <p class="style17">
              Schedule of the FA needed :
              {{ toDateString(capexInfo.deliveryDate) }}
            </p>
            <p class="style17"></p>
            <hr />
            <p class="style17">
              7
              <u>Request Justification :</u>
              {{ capexInfo.justification }}
            </p>
            <div v-if="listAsset.length == 1">
              Asset No : {{ listAsset[0].assetNo }}
            </div>
            <div v-else-if="listAsset.length > 1">
              Asset No : {{ listAsset[0].assetNo }} -
              {{ listAsset[listAsset.length - 1].assetNo }}
            </div>
          </div>
          <br />
          <table
            width="719"
            border="1px solid black"
            cellspacing="0"
            cellpadding="0"
            style="font-size: 12px"
          >
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Approval</th>
              <th>Tanggal</th>
            </tr>
            <tr>
              <td>Requestioner</td>
              <td>{{ requestorInfo.Name }}</td>
              <td>Approved</td>
              <td style="text-align: right">
                {{ toDateString(capexInfo.CreatedAt) }}
              </td>
            </tr>

            <tr v-for="(appr, index) in reviewer" :key="appr.username">
              <td>{{ index == 0 ? 'Reviewed by' : '' }}</td>
              <td>{{ appr.Name }}</td>
              <td>
                {{
                  appr.Status == 'A'
                    ? 'Approved'
                    : appr.Status == 'R'
                    ? 'Rejected'
                    : ''
                }}
              </td>
              <td style="text-align: right">
                {{ appr.Status != '' ? appr.UpdatedAt : '' }}
              </td>
            </tr>

            <tr v-for="(appr, index) in approver" :key="appr.username">
              <td>{{ index == 0 ? 'Approved by' : '' }}</td>
              <td>{{ appr.Name }}</td>
              <td>
                {{
                  appr.Status == 'A'
                    ? 'Approved'
                    : appr.Status == 'R'
                    ? 'Rejected'
                    : ''
                }}
              </td>
              <td style="text-align: right">
                {{ appr.Status != '' ? appr.UpdatedAt : '' }}
              </td>
            </tr>

            <tr v-for="(appr, index) in director" :key="appr.username">
              <td>{{ index == 0 ? 'Final Approved' : '' }}</td>
              <td>{{ appr.Name }}</td>
              <td>
                {{
                  appr.Status == 'A'
                    ? 'Approved'
                    : appr.Status == 'R'
                    ? 'Rejected'
                    : ''
                }}
              </td>
              <td style="text-align: right">
                {{ appr.Status != '' ? appr.UpdatedAt : '' }}
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
    listBudget: {
      type: Array,
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
    costCenter: {
      type: Object,
    },
    listAsset: {
      type: Array,
    },
  },

  computed: {
    totalBudget() {
      // if (this.listBudget) {
      //   return this.listBudget.reduce((a, b) => {
      //     return a + b.amount;
      //   }, 0);
      // }

      if (this.listBudget) {
        return this.listBudget.reduce((a, b) => {
          return a + b.available;
        }, 0);
      }

      return 0;
    },
    unitPrice: function () {
      if (!this.capexInfo.quantity) {
        return 0;
      } else {
        return this.capexInfo.totalAmount / this.capexInfo.quantity;
      }
    },
    variant: function () {
      if (this.totalBudget) {
        return this.totalBudget - this.capexInfo.totalAmount;
      }
      return 0;
    },
    variantPct: function () {
      if (this.variant == 0) {
        return 0;
      } else {
        if (this.totalBudget) {
          return (this.variant / this.totalBudget) * 100;
        }
        return 0;
      }
    },
    reviewer: function () {
      return this.capexApprover
        .filter((appr) => {
          return (
            appr.Approver == 'SMAP010' ||
            appr.Approver == 'SMAP029' ||
            appr.Approver == 'SMAP006'
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
            appr.Approver == 'SMAP001' ||
            appr.Approver == 'SMAP058' ||
            appr.Approver == 'SMAP002'
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
            appr.Approver != 'SMAP010' &&
            appr.Approver != 'SMAP029' &&
            appr.Approver != 'SMAP006' &&
            appr.Approver != 'SMAP001' &&
            appr.Approver != 'SMAP058' &&
            appr.Approver != 'SMAP002'
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
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      );
    },
  },
};
</script>

<style scoped></style>
