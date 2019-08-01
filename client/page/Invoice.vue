<template>
  <div class="MG">
    <center>
      <h1>Invoice</h1>
    </center>

    <div class="row justify-around">
      <div class="col-5">
        <q-select
          v-model="customer"
          label="Customer"
          filled
          :option-value="opt => opt._id"
          :option-label="opt => opt.name"
          emit-value
          map-options
          :options="CustomerOpt"
        />
      </div>
      <div class="col-5">
        <q-input
          label="Date"
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy>
                <q-date v-model="date" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

    </div>
    <!-- Item -->
    <div>
      <div class="row justify-center q-gutter-lg">
        <!-- <q-select
               
                filled
                v-model="item_id"
                use-input
                input-debounce="0"
                label="Item"
                :options="itemOpts"
                @filter="filterFn"
                style="width: 250px">
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">No result</q-item-section>
                    </q-item>
                </template>
                <template
                    v-if="item_id"
                    v-slot:append>
                    <q-icon
                        name="cancel"
                        @click.stop="item_id = ''"
                        class="cursor-pointer" />
                </template>
            </q-select> -->
        <q-select
          style="width: 25%"
          label="Item"
          filled
          v-model="item_id"
          :options="items"
          :option-value="opt => opt"
          :option-label="opt => opt.name"
          emit-value
          map-options
        />

        <q-input
          label="Price"
          filled
          disable
          v-model="price"
        />
        <q-input
          mask="###"
          label="Quantity"
          filled
          v-model="qty"
        />
        <q-btn
          @click="btnAddItem"
          color="primary"
          label="Add"
        />
      </div>
      <br>
      <q-table
        title="Item"
        :data="data"
        :columns="columns"
      />
      <br>
      <center>
        <q-btn
          @click="btnBuy"
          label="Buy"
          color="info"
        />
      </center>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          align: "left",
          label: "Name",
          field: "name"
        },
        {
          align: "left",
          label: "Price($)",
          field: "price"
        },
        {
          align: "left",
          label: "Qty",
          field: "qty"
        },
        {
          align: "left",
          label: "Amout($)",
          field: "amount"
        }
      ],
      data: [],
      CustomerOpt: [],
      date: "2019/02/01",
      customer: "",
      item_id: {},
      price: null,
      qty: null,
      items: [],
      itemOpts: []
    };
  },
  mounted() {
    this.getCustomerData();
    this.getItemData();
  },
  watch: {
    item_id(val) {
      console.log(val);
      this.price = val.price;
    },
    customer: val => {
      console.log(val);
    }
  },
  methods: {
    btnBuy() {
      let itemDoc = [];
      this.data.forEach(doc => {
        itemDoc.push({
          itemId: doc._id,
          price: doc.price,
          qty: doc.qty,
          amount: doc.amount
        });
      });
      let doc = {
        customerId: this.customer,
        date: this.date,
        items: itemDoc
      };
      console.log(doc);
      // Meteor.call('insertInvoice',doc,(error,result)=>{
      //   if(result){
      //     alert(result)
      //   }
      // })
    },
    btnAddItem() {
      let x = 0;
      this.data.forEach(doc => {
        if (doc._id == this.item_id._id) {
          doc.qty = parseInt(doc.qty) + parseInt(this.qty);
          doc.amount = parseInt(doc.qty) * parseFloat(doc.price);
          x = 1;
        }
      });
      if (x == 0) {
        this.data.push({
          _id: this.item_id._id,
          name: this.item_id.name,
          price: this.item_id.price,
          qty: this.qty,
          amount: parseFloat(this.price * this.qty)
        });
      }
    },
    getCustomerData() {
      Meteor.call("findCustomer", (err, result) => {
        if (result) {
          this.CustomerOpt = result;
        }
      });
    },
    getItemData() {
      Meteor.call("findItem", (err, result) => {
        if (result) {
          this.items = result;
          console.log(result);
        }
      });
    },
    filterFn(val, update) {
      if (val === "") {
        // update(() => {
        // this.items
        // });
        // return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.itemOpts = this.items.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>

<style>
.MG {
  margin: 20%;
}
</style>
