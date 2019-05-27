<template>
  <div>
    <center>Form Customer</center>
    <div>
      <q-input outlined v-model="form.name" label="Name"/>
      <q-input outlined type="number" v-model="form.age" label="Age"/>
      <q-select :options="genderOpt" outlined v-model="form.gender" label="Gender"/>
      <q-input outlined v-model="form.dob" label="Date of Birth"/>
      <q-input
        outlined
        v-model="form.phone"
        label="Phone"
        mask="(###) ### - ####"
        hint="Mask: (###) ### - ####"
      />

      <q-btn color="primary" :label="labelSubmit" @click="btnAdd"/>
      <q-btn v-show="labelDelete!=null" color="red" :label="labelDelete" @click="btnDelete"/>
      <q-btn icon="forward" color="black" @click="$router.back()"/>
      {{$route.params._id}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelSubmit: "Add",
      labelDelete: null,
      genderOpt: ["Male", "Female"],
      form: {
        name: "",
        age: "",
        gender: "",
        dob: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.formType();
  },
  watch: {},
  methods: {
    // btnBack(){
    //   this.$router.back()
    // },
    formType() {
      if (this.$route.params._id != null) {
        this.labelSubmit = "Edit";
        this.labelDelete = "Delete";
        Meteor.call("findCustomerById", this.$route.params._id, (err, result) => {
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
        Meteor.call("insertCustomer", this.form, (err, result) => {
          if (!err) {
            alert("Added Customer!");
          }
        });
      } else {
        Meteor.call("updateCustomer", this.form, (err, result) => {
          if (!err) {
            alert("Updated Customer !");
          }
        });
      }
    },
    btnDelete() {
      Meteor.call("removeCustomer", this.$route.params._id, (err, result) => {
        if (result) {
          this.$route.params._id = null;
          this.formType();
          this.$router.push("/form-customer");
        }
      });
    }
  }
};
</script>
