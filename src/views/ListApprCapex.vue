<template>
  <div class="m-content">
    <!-- <div class="m-portlet">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">TERMS AND CONDITION</h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <div class="m-form__section m-form__section--first">
          <ul style="font-size: 15px;">
            <li>Merupakan sarana pengajuan CAPEX secara online dan terintegrasi dengan SAP di PT Industri Jamu dan Farmasi Sido Muncul, Tbk</li>
            <li>CAPEX Online tunduk pada semua peraturan yang ada pada pengajuan CAPEX manual.</li>
            <li>Dalam hal jika ada Approver yang tidak memungkinkan untuk input persetujuan secara online di system maka Approver wajib menunjuk salah satu PIC di department masing-masing yang dapat mewakili Approver melakukan persetujuan secara online berdasar dokumen cetak yang sudah disetujui.</li>
            <li>Pihak yang mengajukan CAPEX bertanggung jawab untuk follow up request masing-masing.</li>
            <li>
              Pengisian 1 form CAPEX hanya untuk 1 realisasi.
              <br />Misal : Pengajuan Laptop wajib diikuti pembeilan capex software windows dan software office. Maka perlu dibuat 3 form CAPEX realisasi di dalam sistem.
            </li>
          </ul>
        </div>
      </div>
    </div>-->
    <div class="m-portlet">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">List Capex Waiting My Approval</h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <div class="m-form__section m-form__section--first">
          <list-table-capex :listData="capexTrx" :massApprove="true" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="m-content">
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
                    <b-form-input size disabled></b-form-input>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-subheader">
      <div class="m-content">
        <div class="m-portlet">
          <div class="m-portlet__body">
            <h1>List Capex Waiting My Approval</h1>
            <list-table-capex :listData="capexTrx" massApprove="true" />
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import { axiosCapex } from '../axios-instance';
import ListTableCapex from '../components/ListTableCapex';
export default {
  components: {
    ListTableCapex,
  },
  data() {
    return {
      capexTrx: [],
    };
  },

  created() {
    axiosCapex
      .get('/capexTrx?wait_appr=' + this.$store.state.username)
      .then((result) => {
        this.capexTrx = result.data;
      })
      .catch();
  },
};
</script>

<style>
/* .clickable {
  cursor: pointer;
} */
</style>
