<template>
  <div class="m-subheader">
    <h1>List Capex Waiting Accounting Approval</h1>
    <v-app>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="capexTrx" :search="search">
          <!-- <template v-slot:items="props"> -->
          <template slot="items" slot-scope="props">
            <!-- <td>{{ props.item.name }}</td> -->
            <tr @click="showDetail(props.item.ID)" style="cursor: pointer">
              <td>{{ props.item.ID }}</td>
              <td>{{ props.item.description }}</td>
              <td class="text-xs-right">{{ props.item.totalAmount | toCurrency}}</td>
              <td>
                <span
                  class="m-badge m-badge--wide"
                  :class="statusColor(props.item.status)"
                >{{ props.item.status | statusDesc}}</span>
              </td>
            </tr>
          </template>
          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import { axiosCapex } from "../axios-instance";
import { capexMixin } from "../mixins";

export default {
  mixins: [capexMixin],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Capex ID",
          align: "left",
          value: "ID"
        },
        { text: "Description", value: "description" },
        { text: "Amount", value: "totalAmount" },
        { text: "Status", value: "status" }
      ],
      capexTrx: []
    };
  },
  methods: {
    showDetail(ID) {
      this.$router.push("/capex/" + ID);
    }
  },
  created() {
    axiosCapex
      .get("/capexTrx?acc_appr=" + this.$store.state.userId)
      .then(result => {
        this.capexTrx = result.data;
        // console.log(this.data.rows[1]);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // mounted() {
  //   $(document).ready(function() {
  //     mQuickSidebar.init();
  //   });
  // }
};
</script>

<style>
/* .clickable {
  cursor: pointer;
} */
</style>
