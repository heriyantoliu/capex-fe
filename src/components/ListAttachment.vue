<template>
  <div class="m-portlet">
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <h3 class="m-portlet__head-text">List Attachment</h3>
        </div>
      </div>
      <!-- <input
        type="file"
        ref="file"
        @change="onFilesUpload"
        style="display: none"
      /> -->
      <!-- <b-button
        v-if="!disabled"
        class="my-3 text-right"
        variant="primary"
        @click="$refs.file.click()"
        >Add</b-button
      > -->
      <b-button
        v-if="!disabled"
        variant="primary"
        class="my-3 text-right"
        v-b-modal.attachment
        >Add</b-button
      >
    </div>
    <div class="m-portlet__body">
      <div class="m-form__section m-form__section--first">
        <b-list-group>
          <b-list-group-item
            v-for="attachment in listAttachment"
            :key="attachment.name"
            class="d-flex justify-content-between align-items-center"
          >
            <a
              v-if="!attachment.new"
              href="#"
              @click="downloadAttachment(attachment)"
              >{{ attachment.name }}
              <strong v-if="attachment.category"
                >({{ attachment.category }})</strong
              >
            </a>
            <span v-else
              >{{ attachment.name }}
              <strong v-if="attachment.category"
                >({{ attachment.category }})</strong
              ></span
            >

            <div>
              <span v-if="attachment.downloading" class="mr-2"
                >Downloading</span
              >

              <b-button
                v-if="!disabled"
                size="sm"
                variant="danger"
                @click="onAttachmentDelete(attachment.name)"
                >Delete</b-button
              >
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <b-modal
      ref="modal"
      id="attachment"
      :hide-header-close="true"
      title="Upload Attachment"
      @ok="onSelectedAttachment"
      @cancel="clearSelection"
    >
      <b-container fluid>
        <b-row>
          <b-col sm="2">
            <label>File</label>
          </b-col>
          <b-col>
            <b-input :value="attachment.name" size="sm" disabled></b-input>
          </b-col>
          <b-col sm="3">
            <input
              type="file"
              ref="file"
              style="display: none"
              @change="onFilesUpload"
            />
            <b-button variant="success" @click="$refs.file.click()" size="sm"
              >Choose</b-button
            >
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label>Category</label>
          </b-col>
          <b-col sm="10">
            <b-form-select
              v-model="selectedCategory"
              :options="listCategory"
              size="sm"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
export default {
  props: {
    attachments: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'attachments',
    event: 'onInput'
  },
  data() {
    return {
      listAttachment: [],
      attachment: { name: '', file: '' },
      listCategory: [
        { value: '', text: 'Normal' },
        { value: 'Business Case', text: 'Business Case' }
      ],
      selectedCategory: ''
    };
  },
  watch: {
    attachments() {
      this.listAttachment = this.attachments;
    }
  },
  methods: {
    clearSelection() {
      this.attachment = { name: '', file: '' };
      this.selectedCategory = '';
    },
    onSelectedAttachment() {
      if (this.attachment.name) {
        const fileExists = this.listAttachment.find(file => {
          return file.name == this.attachment.name;
        });
        if (!fileExists) {
          this.listAttachment.push({
            name: this.attachment.name,
            file: this.attachment.file,
            category: this.selectedCategory,
            new: true,
            db: false
          });
        }
        this.clearSelection();

        this.$emit('onInput', this.listAttachment);
      }
    },
    onFilesUpload() {
      const uploadedFiles = this.$refs.file.files;

      this.attachment.name = uploadedFiles[0].name;
      this.attachment.file = uploadedFiles[0];
      // for (let i = 0; i < uploadedFiles.length; i++) {
      //   const fileExists = this.listAttachment.find(file => {
      //     return file.name == uploadedFiles[i].name;
      //   });
      //   if (!fileExists) {
      //     console.log(uploadedFiles[i]);
      //     this.listAttachment.push({
      //       name: uploadedFiles[i].name,
      //       file: uploadedFiles[i],
      //       new: true,
      //       db: false
      //     });
      //   }
      // }
      // this.$emit('onInput', this.listAttachment);
    },
    async downloadAttachment(file) {
      if (file.new) {
        return;
      }

      const index = this.listAttachment.findIndex(attachment => {
        return attachment.name == file.name;
      });

      this.listAttachment[index].downloading = true;

      const result = await axiosCapex.get(
        `/capexTrx/${file.capexId}/attachment/${file.name}`,
        { responseType: 'blob' }
      );
      var fileURL = window.URL.createObjectURL(new Blob([result.data]));
      var fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', file.name);
      document.body.appendChild(fileLink);

      fileLink.click();
      this.listAttachment[index].downloading = false;
    },
    async onAttachmentDelete(name) {
      const fileSelected = this.listAttachment.find(file => {
        return file.name == name;
      });

      if (fileSelected.db) {
        try {
          let result = await this.$bvModal.msgBoxConfirm(
            'Yakin untuk hapus lampiran?',
            {
              title: 'Hapus Lampiran',
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
            await axiosCapex.delete(
              `/capexTrx/${fileSelected.capexId}/attachment/${
                fileSelected.name
              }`
            );
            this.$root.$bvToast.toast(
              `Lampiran ${fileSelected.name} berhasil terhapus`,
              {
                variant: 'primary',
                toastClass: 'sm_toast',
                bodyClass: 'sm_toast__body ',
                noCloseButton: true,
                toaster: 'b-toaster-bottom-center',
                autoHideDelay: 3000
              }
            );
            this.listAttachment = this.listAttachment.filter(file => {
              return file.name != name;
            });
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
          return;
        }
      } else {
        this.listAttachment = this.listAttachment.filter(file => {
          return file.name != name;
        });
      }

      this.$emit('onInput', this.listAttachment);
    }
    // formatFileSize(bytes, decimalPoint) {
    //   if (bytes == 0) return '0 Bytes';
    //   var k = 1000,
    //     dm = decimalPoint || 2,
    //     sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //     i = Math.floor(Math.log(bytes) / Math.log(k));
    //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // },
  },
  created() {
    this.listAttachment = this.attachments;
  }
};
</script>

<style></style>
