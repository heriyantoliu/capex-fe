import writtenNumber from 'written-number';

const capexMixin = {
  filters: {
    toCurrency(value) {
      // if (typeof value !== 'number') {
      // 	return value;
      // }
      // var formatter = new Intl.NumberFormat('id-ID', {
      // 	style: 'currency',
      // 	currency: 'IDR',
      // 	minimumFractionDigits: 0,
      // });
      // return formatter.format(value);
      if (value) {
        return value.toLocaleString('ID');
      }
      return value;
    },
    statusDesc(value) {
      switch (value) {
        case '':
          return 'Waiting accounting';
        case 'A':
          return 'Approve';
        case 'R':
          return 'Reject';
        case 'I':
          return 'Approval in progress';
        case 'RI':
          return 'Replicate in progress';
        case 'SAP':
          return 'Replicated';
      }
    },
    inSpell(amount) {
      writtenNumber.defaults.lang = 'id';
      return writtenNumber(amount);
    }
  },
  methods: {
    statusColor(value) {
      switch (value) {
        case 'A':
        case 'RI':
        case 'SAP':
          return 'success';
        case 'R':
          return 'danger';
        case 'I':
          return 'warning';
        default:
          return 'info';
      }
    }
  }
};

export { capexMixin };
