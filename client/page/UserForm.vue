<template>
  <div>
    <center>Form Customer</center>
    <div>
      <q-input outlined v-model="form.username" label="Name"/>
      <q-input outlined v-model="form.email" label="Email"/>
      <q-input outlined v-model="form.phone" label="Phone"/>
      <q-input outlined v-model="form.password" label="Passowrd"/>
      <q-input outlined v-model="confirm" label="Confirm Password"/>
      <q-btn color="primary" label="Add User" @click="addUser"/>

      <q-btn icon="forward" color="black" @click="$router.back()"/>
      {{$route.params._id}}
      <q-btn label="Find User" @click="btnFind"/>
      <q-btn label="Login" @click="btnLogin"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirm: "",
      form: {
        username: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    btnLogin(){
    Meteor.call('loginByPassword', this.form, function(err, result) {
      if (result) {
        console.log(result);
      }
    });
    },
    btnFind() {
      Meteor.call(
        "findUser",
        { username: this.form.username, password: this.form.password },
        (error, result) => {
            if(!error){
                console.log(result)
            }
        }
      );
    },
    addUser() {
      if (this.form.password === this.confirm) {
        alert("Log");
        Meteor.call("insertUser", this.form, (error, result) => {
          if (!error) {
            console.log(result);
          }
        });
      }
    }
  }
};
</script>
