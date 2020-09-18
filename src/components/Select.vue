<template>
  <div class="dropdown" v-if="options">
    <!-- Dropdown Input -->
    <b-input
      :id="idHTML"
      class="dropdown-input"
      :name="name"
      @focus="showOptions()"
      @blur="exit()"
      @keyup="keyMonitor"
      v-model="searchFilter"
      :disabled="disabled"
      :placeholder="placeholder"
      :state="state"
      :aria-describedby="describedBy"
      autocomplete="off"
    />
    <slot></slot>
    <!-- Dropdown Menu -->
    <div class="dropdown-content" v-show="optionsShown">
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredOptions"
        :key="index"
      >
        {{ option.name || option.id || '-' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  template: 'Dropdown',
  model: {
    prop: 'value',
    event: 'selected'
  },
  props: {
    name: {
      type: String,
      required: false,
      default: 'dropdown',
      note: 'Input name'
    },
    options: {
      type: Array,
      required: true,

      note: 'Options of dropdown. An array of options with id and name'
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Please select an option',
      note: 'Placeholder of dropdown'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Disable the dropdown'
    },
    maxItem: {
      type: Number,
      required: false,
      default: 99,
      note: 'Max items showing'
    },
    state: {
      type: Boolean,
      required: false,
      default: null
    },
    describedBy: {
      type: String,
      required: false
    },
    idHTML: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: ''
    };
  },
  created() {
    this.$emit('selected', this.selected.id);
  },

  computed: {
    filteredOptions() {
      const filtered = [];
      const regOption = new RegExp(this.searchFilter, 'ig');
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regOption)) {
          if (filtered.length < this.maxItem) filtered.push(option);
        }
      }
      return filtered;
    }
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.name;

      this.$emit('selected', this.selected.id);
    },
    showOptions() {
      if (!this.disabled) {
        this.searchFilter = '';
        this.optionsShown = true;
      }
    },
    exit() {
      if (!this.selected.id) {
        this.selected = {};
        this.searchFilter = '';
      } else {
        this.searchFilter = this.selected.name;
      }
      this.$emit('selected', this.selected.id);
      this.optionsShown = false;
    },
    // Selecting when pressing Enter
    keyMonitor: function(event) {
      if (event.key === 'Enter' && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    }
  },
  watch: {
    searchFilter() {
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      } else {
        this.selected = this.filteredOptions[0];
      }
      this.$emit('filter', this.searchFilter);
    },
    value() {
      if (this.value) {
        this.searchFilter = this.options.find(opt => {
          return opt.id == this.value;
        }).name;
      } else {
        this.searchFilter = '';
        this.selected = {};
      }
    }
  }
};
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  background: #fff;
  width: 100%;
  /* min-width: 248px;
  max-width: 248px;
  max-height: 248px;
  max-height: 248px; */
  border: 1px solid #e7ecf5;
  box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
  overflow: auto;
  z-index: 1;
}

.dropdown-item {
  color: #495057;
  font-size: 17.6px;
  line-height: 1em;
  padding: 8px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e7ecf5;
}
/* .dropdown {
  position: relative;
  display: block;
  margin: auto;
  .dropdown-input {
    background: #fff;
    cursor: pointer;
    border: 1px solid #e7ecf5;
    border-radius: 3px;
    color: #333;
    display: block;
    font-size: 0.8em;
    padding: 6px;
    min-width: 250px;
    max-width: 250px;
    &:hover {
      background: #f8f8fa;
    }
  }
  .dropdown-content {
    position: absolute;
    background-color: #fff;
    min-width: 248px;
    max-width: 248px;
    max-height: 248px;
    border: 1px solid #e7ecf5;
    box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
    overflow: auto;
    z-index: 1;
    .dropdown-item {
      color: black;
      font-size: 0.7em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: #e7ecf5;
      }
    }
  }
  .dropdown:hover .dropdowncontent {
    display: block;
  }
} */
</style>
