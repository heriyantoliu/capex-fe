<template>
  <div class="m-portlet">
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <h3 class="m-portlet__head-text">List Attachment</h3>
        </div>
      </div>
      <input type="file" ref="file" @change="onFilesUpload" style="display: none" multiple />
      <b-button
        v-if="!disabled"
        class="my-3 text-right"
        variant="primary"
        @click="$refs.file.click()"
      >Add</b-button>
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
            >{{ attachment.name }}</a>
            <span v-else>{{ attachment.name }}</span>
            <div>
              <span v-if="attachment.downloading" class="mr-2">Downloading</span>

              <b-button
                v-if="!disabled"
                size="sm"
                variant="danger"
                @click="onAttachmentDelete(attachment.name)"
              >Delete</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosCapex } from '../axios-instance';
export default {
  props: {
    attachments: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'attachments',
    event: 'onInput',
  },
  data() {
    return {
      listAttachment: [],
    };
  },
  watch: {
    attachments() {
      this.listAttachment = this.attachments;
    },
  },
  methods: {
    onFilesUpload() {
      const uploadedFiles = this.$refs.file.files;

      for (let i = 0; i < uploadedFiles.length; i++) {
        const fileExists = this.listAttachment.find((file) => {
          return file.name == uploadedFiles[i].name;
        });
        if (!fileExists) {
          this.listAttachment.push({
            name: uploadedFiles[i].name,
            file: uploadedFiles[i],
            new: true,
            db: false,
          });
        }
      }
      this.$emit('onInput', this.listAttachment);
    },
    async downloadAttachment(file) {
      if (file.new) {
        return;
      }

      const index = this.listAttachment.findIndex((attachment) => {
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
      const fileSelected = this.listAttachment.find((file) => {
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
              centered: true,
            }
          );
          if (result) {
            await axiosCapex.delete(
              `/capexTrx/${fileSelected.capexId}/attachment/${fileSelected.name}`
            );
            this.$root.$bvToast.toast(
              `Lampiran ${fileSelected.name} berhasil terhapus`,
              {
                variant: 'primary',
                toastClass: 'sm_toast',
                bodyClass: 'sm_toast__body ',
                noCloseButton: true,
                toaster: 'b-toaster-bottom-center',
                autoHideDelay: 3000,
              }
            );
            this.listAttachment = this.listAttachment.filter((file) => {
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
            centered: true,
          });
          return;
        }
      } else {
        this.listAttachment = this.listAttachment.filter((file) => {
          return file.name != name;
        });
      }

      this.$emit('onInput', this.listAttachment);
    },
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
  },
};
</script>

<style></style>
