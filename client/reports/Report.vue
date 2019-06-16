<template>
  <div>
    <center>
      <h1>Report(:)</h1>
    </center>
  <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Date</th>
          <th class="text-left">Customer</th>
          <th class="text-left">Item</th>
          <th class="text-left">Qty</th>
          <th class="text-left">Price</th>
          <th class="text-left">Amount</th>
        </tr>
      </thead>
                <tbody>
            <template v-for="(doc,i) in reports">
              <template v-for="(item,itemIndex) in doc.items">
                <tr class="tr" v-if="itemIndex==0">
                  <td class="td">{{i}}</td>
                  <td class="td">{{doc.date}}</td>
                  <td class="td">{{doc.customerName}}</td>
                  <td class="td">{{item.itemName}}</td>
                  <td class="td">{{item.qty}}</td>
                  <td class="td">{{item.price}} $</td>
                  <td class="td">{{item.amount}} $</td>
                </tr>
                <tr class="tr" v-else>
                  <td class="td" colspan="3"></td>
                  <td class="td">{{item.itemName}}</td>
                  <td class="td">{{item.qty}}</td>
                  <td class="td">{{item.price }} $</td>
                  <td class="td">{{item.amount }} $</td>
                </tr>
              </template>
              <tr class="tr" :key="i">
                <td class="td" colspan="6"></td>
                <td class="td">{{doc.total }} $</td>
              </tr>
            </template>
          </tbody>
  </q-markup-table>
  </div>
</template>

<script>

export default {
  data(){
    return{
      form:{
        name:'Bona',
        age:'20',
        address:'BTB',
      },
      reports:[],
    }
  },
  mounted() {
      this.btnSearch()
  },
  methods: {
    btnSearch() {
      Meteor.call("findInvoice", (error, result) => {
        if (result) {
          console.log(result);
          this.reports=result;
        }
      });

    }
  }
};
</script>

<style>
</style>
