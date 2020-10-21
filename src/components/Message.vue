<template>
  <div class="m-portlet">
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <h3 class="m-portlet__head-text">List Message</h3>
        </div>
      </div>
      <b-button class="my-3 text-right" variant="primary" v-b-modal.add-message
        >Add</b-button
      >
    </div>
    <div class="m-portlet__body">
      <div class="m-form__section m-form__section--first">
        <b-table-lite
          :fields="fields"
          :items="listMessage"
          bordered
          striped
          thead-class="header"
          tbody-class="content"
        >
          <template v-slot:cell(CreatedAt)="data">
            <div>{{ toDateString(data.item.CreatedAt) }}</div>
          </template>
          <template v-slot:cell(message)="data">
            <!-- <b-form-textarea :value="data.item.message" disabled /> -->
            <div style="white-space: pre-line">{{ data.item.message }}</div>
          </template>
        </b-table-lite>
      </div>
    </div>
    <b-modal
      ref="modal"
      id="add-message"
      :hide-header-close="true"
      title="Tambah Pesan"
      @ok="postMessage"
      @cancel="cancelMessage"
    >
      <b-form-group label="From">
        <b-form-input :value="$store.state.name" disabled></b-form-input>
      </b-form-group>

      <b-form-group label="To">
        <comp-select v-model="toUsername" :options="listToUser"></comp-select>
      </b-form-group>

      <b-form-group label="Message">
        <b-form-textarea v-model="message" />
      </b-form-group>

      <!-- <b-form-group
        label="Budget Code"
        invalid-feedback="Budget code belum di pilih"
      >
        <comp-select
          idHTML="budget-code"
          :options="filterBudgetCode"
          v-model="selectedBudgetCode"
        ></comp-select>
      </b-form-group> -->
    </b-modal>
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
import compSelect from './Select';
export default {
  components: {
    compSelect
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listMessage: [],
      listUser: [],
      listToUser: [],
      toUsername: '',
      message: '',
      fields: [
        { key: 'fromName', label: 'From' },
        { key: 'toName', label: 'To' },
        { key: 'message', label: 'Message' },
        { key: 'CreatedAt', label: 'Date' }
      ]
    };
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
    cancelMessage() {
      this.toUsername = '';
      this.message = '';
    },
    async postMessage() {
      try {
        let result = await this.$bvModal.msgBoxConfirm(
          'Yakin untuk post komentar ?',
          {
            title: 'Tambah Komentar',
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
          await axiosCapex.post('capexTrx/' + this.id + '/message', {
            fromUsername: this.$store.state.username,
            toUsername: this.toUsername,
            message: this.message
          });
          this.getMessage(this.id);
        }
        this.toUsername = '';
        this.message = '';
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
    getMessage(id) {
      axiosCapex.get('/capexTrx/' + id + '/message').then(result => {
        this.listMessage = result.data.map(message => {
          const userFrom = this.listUser.find(user => {
            return user.username == message.fromUsername;
          });

          const userTo = this.listUser.find(user => {
            return user.username == message.toUsername;
          });

          return { ...message, fromName: userFrom.name, toName: userTo.name };
        });
      });
    }
  },
  async created() {
    const userResult = await axiosCapex.get('user');
    this.listUser = userResult.data;

    this.getMessage(this.id);
    this.listToUser = this.listUser
      .map(user => {
        return {
          ...user,
          id: user.username,
          name: user.name
        };
      })
      .filter(user => {
        return user.username != this.$store.state.username;
      });
  }
};
</script>

<style></style>
