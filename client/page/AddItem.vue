<template>
  <div>
    <center>Add Item</center>
    <h5>{{count1}}</h5>
    <button @click="increment">increment</button>
    <div>
      <q-input
        outlined
        v-model="form.name"
        label="Name"
      />
      <q-input
        outlined
        v-model="form.price"
        label="Price"
      />
      <q-input
        outlined
        v-model="form.cost"
        label="Cost"
      />
      <q-input
        outlined
        v-model="form.memo"
        label="Memo"
      />
      <q-btn
        color="primary"
        :label="labelSubmit"
        @click="btnAdd"
      />
      <q-btn
        v-show="labelDelete!=null"
        color="red"
        :label="labelDelete"
        @click="btnDelete"
      />
      <q-btn
        icon="forward"
        color="black"
        @click="$router.back()"
      />
      {{$route.params._id}}
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    count1() {
      return this.$store.state.count;
    }
  },
  data() {
    return {
      labelSubmit: "Add",
      labelDelete: null,
      form: {
        name: "",
        price: "",
        cost: "",
        memo: ""
      }
    };
  },
  mounted() {
    this.formType();
  },
  watch: {},
  methods: {
    increment() {
      this.$store.dispatch("incrementAction", 7);
    },
    // btnBack(){
    //   this.$router.back()
    // },
    formType() {
      if (this.$route.params._id != null) {
        this.labelSubmit = "Edit";
        this.labelDelete = "Delete";
        Meteor.call("findItemById", this.$route.params._id, (err, result) => {
          if (!err) {
            this.form = result;
          }
        });
      } else {
        this.labelSubmit = "Add";
        this.labelDelete = null;
      }
    },
    btnAdd() {
      if (this.labelSubmit == "Add") {
        this.$store.dispatch("insertItem", this.form);
      } else {
        Meteor.call("updateItem", this.form, (err, result) => {
          if (!err) {
            alert("Updated !");
          }
        });
      }
    },
    btnDelete() {
      Meteor.call("removeItem", this.$route.params._id, (err, result) => {
        if (result) {
          this.$route.params._id = null;
          this.formType();
          this.$router.push("/add-item");
        }
      });
    }
  }
};
</script>