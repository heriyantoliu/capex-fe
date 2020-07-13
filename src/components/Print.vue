<template>
  <div>
    <table width="715" border="1">
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
                <table width="29" height="27" border="1">
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
                <table width="29" height="27" border="1">
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
              <td width="275">&nbsp;</td>
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
                  <u>Purpose :</u>
                </span>
              </td>
              <td width="10">&nbsp;</td>
              <td width="30">&nbsp;</td>
              <td width="217">&nbsp;</td>
              <td width="49">&nbsp;</td>
              <td width="49">&nbsp;</td>
              <td width="71">&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td width="29">
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A1' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td width="214">
                <span class="style17">Capacity Expansion</span>
              </td>
              <td></td>
              <td>
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A5' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td colspan="4">
                <span class="style17">Replacement / Major Maintenance</span>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A2' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td>
                <span class="style17">Efficiency (Cost Reduction)</span>
              </td>
              <td>&nbsp;</td>
              <td>
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A6' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td colspan="4">
                <span class="style17">Quality Improvement</span>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A3' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td>
                <span class="style17">Necessity</span>
              </td>
              <td>&nbsp;</td>
              <td>
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17"
                    >{{ capexInfo.purpose == 'A7' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td colspan="4">
                <span class="style17">Office &amp; Employee Facilities</span>
              </td>
            </tr>
          </table>

          <table width="715" border="0">
            <tr>
              <td width="6">&nbsp;</td>
              <td width="29">
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17 style18 style25"
                    >{{ capexInfo.purpose == 'A4' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td width="103">
                <span class="style17">New Investment :</span>
              </td>
              <td width="9">&nbsp;</td>
              <td width="29">
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17 style18 style25"
                    >{{ capexInfo.purpose == 'A8' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td width="256">
                <span class="style17">New Business,New Factory/Branch/Location</span>
              </td>
              <td width="33">
                <table width="29" height="27" border="1">
                  <tr>
                    <td
                      width="15"
                      height="15"
                      class="style17 style18 style25"
                    >{{ capexInfo.purpose == 'A9' ? 'X' : '' }}</td>
                  </tr>
                </table>
              </td>
              <td width="196">
                <span class="style17">New Product Category/Segment</span>
              </td>
              <td width="16">&nbsp;</td>
            </tr>
          </table>

          <hr />
          <p class="style17">
            6
            <u>Request Description :</u>
          </p>
          <table width="716" border="1">
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
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
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
          <p class="style17">Schedule of the FA needed :</p>
          <p class="style17"></p>
          <hr />
          <p class="style17">
            7
            <u>Request Justification</u>
          </p>
          <br />
          <br />
          <table width="719" border="1">
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
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </td>
              <td rowspan="3">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <div align="center" class="style17">
                  <p>
                    <strong>Reviewed by,</strong>
                  </p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center">
                  <p class="style19">Approved by,</p>
                  <p class="style19">&nbsp;</p>
                  <p class="style19">&nbsp;</p>
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
          <br />
        </td>
      </tr>
    </table>

    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>

<script>
import { capexMixin } from '../mixins';
export default {
  mixins: [capexMixin],
  props: {
    capexInfo: {
      type: Object,
      required: true
    },
    budgetInfo: {
      type: Object
    }
  },
  computed: {
    unitPrice: function() {
      if (!this.capexInfo.quantity) {
        return 0;
      } else {
        return this.capexInfo.totalAmount / this.capexInfo.quantity;
      }
    },
    variant: function() {
      if (this.budgetInfo) {
        return this.budgetInfo.budgetAmount - this.capexInfo.totalAmount;
      }
      return 0;
    },
    variantPct: function() {
      if (this.variant == 0) {
        return 0;
      } else {
        if (this.budgetInfo) {
          return (this.variant / this.budgetInfo.budgetAmount) * 100;
        }
        return 0;
      }
    }
  }
};
</script>

<style></style>
