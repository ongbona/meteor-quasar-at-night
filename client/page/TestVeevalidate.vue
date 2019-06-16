<template>
  <div>
    <q-input
      name="name"
      outlined
      v-model="form.name"
      v-validate="'required'"
      label="Name"
      :error="errors.has('name')"
      :error-message="errors.first('name')"
      hint="Input name"
    />
    <q-input
      name="price"
      :error="errors.has('price')"
      :error-message="errors.first('price')"
      hint="Input name"
      outlined
      v-model="form.price"
      v-validate="'required|numeric'"
      label="Price"
    />
    <q-btn @click="btnSubmit" label="Submit"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        price: ""
      }
    };
  },
  methods: {
    btnSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }

        alert("Correct them errors!");
      });
    }
  }
};
</script>

<style>
</style>
