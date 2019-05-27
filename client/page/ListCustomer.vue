<template>
  <div>
    <q-table
      title="List Customer"
      :data="data"
      :columns="columns"
      row-key="_id"
      selection="single"
      :selected.sync="selected"
    ></q-table>
    <q-btn v-show="selected.length!=0" color="primary" label="Option" @click="btnOpt"/>
    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      selected: [],
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          sortable: true
        },
        {
          name: "age",
          align: "left",
          label: "Age",
          field: "age",
          sortable: true
        },
        {
          name: "gender",
          align: "left",
          label: "Gender",
          field: "gender",
          sortable: true
        },
        {
          name: "dob",
          align: "left",
          label: "Date of birh",
          field: "dob",
          sortable: true
        },
         {
          name: "phone",
          align: "left",
          label: "Phone",
          field: "phone",
          sortable: true
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    btnOpt() {
      this.$router.push({
        name: "customerForm",
        params: {
          _id: this.selected[0]._id
        }
      });
    },
    getData() {
      Meteor.call("findCustomer", (err, result) => {
        if (result) {
          this.data = result;
        }
      });
    }
  }
};
</script>
