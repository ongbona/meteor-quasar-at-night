<template>
  <div>
    <center>
      <h1>Report(:)</h1>
    </center>
    <q-btn label="Find" @click="btnSearch"/>
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
      }
    }
  },
  mounted() {
      
  },
  methods: {
    btnSearch() {
      // Meteor.call("findInvoice", (error, result) => {
      //   if (result) {
      //     console.log(result);
      //   }
      // });

var obj = JSON.stringify(this.form);
console.log(obj)


    }
  }
};
</script>

<style>
</style>
