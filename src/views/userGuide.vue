<template>
  <div>
    <pdf
      v-for="i in numPages"
      :key="i"
      :page="i"
      :src="src"
      style="display: inline-block; width: 75%"
    >
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf';

var loadingTask = pdf.createLoadingTask('./assets/capex-user-guide.pdf');

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: loadingTask,
      numPages: undefined
    };
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  }
};
</script>
