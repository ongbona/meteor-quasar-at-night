<template>
  <div>
    <q-table
      title="List Item"
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
          name: "price",
          align: "left",
          label: "Price",
          field: "price",
          sortable: true
        },
        {
          name: "cost",
          align: "left",
          label: "Cost",
          field: "cost",
          sortable: true
        },
        {
          name: "memo",
          align: "left",
          label: "Memo",
          field: "memo",
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
        name: "itemForm",
        params: {
          _id: this.selected[0]._id
        }
      });
    },
    getData() {
      Meteor.call("findItem", (err, result) => {
        if (result) {
          this.data = result;
        }
      });
    }
  }
};
</script>
