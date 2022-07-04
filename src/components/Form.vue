<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <InputText
          data-test="name"
          placeholder="Name"
          v-model="name"
          :rules="rulesName"
        />
      </div>
      <div class="mb-3">
        <Autocomplete
          data-test="country"
          placeholder="Country"
          v-model="country"
          :options="countries"
          keyValue="name"
        />
      </div>
      <div class="mb-3">
        <InputText
          data-test="taxIdentifier"
          placeholder="Tax Identifier"
          v-model="taxIdentifier"
          :rules="rulesTax"
        />
      </div>
      <input type="submit" />
    </form>
    <div class="mb-3 error-message" v-if="error">
      {{ error }}
    </div>
    <div class="mb-3 success-message" v-if="message" data-test="success">
      <h2>{{ message }}</h2>
    </div>
  </div>
</template>
<script setup>
import InputText from "./InputText.vue";
import Autocomplete from "./Autocomplete.vue";
import countries from "../data/countries.json";
import { ApiService } from "../services/ApiService";
const apiService = new ApiService();

import { ref, computed } from "vue";
const name = ref("");
const country = ref("");
const taxIdentifier = ref("");
const error = ref("");
const message = ref("");

const emit = defineEmits("submit");
const mask = computed(() => {
  const res = countries.find((item) => item.name === country.value);
  return res || "";
});
const rulesName = [
  (val) => val?.length > 0 || "the field must not be empty",
  (val) => val?.length > 3 || "The value must be greater than 3",
];
const rulesTax = [
  (val) => val?.length > 0 || "the field must not be empty",
  (val) => {
    if (country.value === "" || taxIdentifier.value === "") {
      return true;
    }
    const regex = new RegExp(mask.value?.taxFormat);
    return regex.test(val) || mask.value?.textValidation;
  },
];
const submit = async () => {
  const fieldsAreEmpty = !name.value || !country.value || !taxIdentifier.value;
  if (fieldsAreEmpty) {
    error.value = "the fields need to be fill";
    return;
  }
  const parameters = {
    name: name.value,
    country: country.value,
    taxIdentifier: taxIdentifier.value,
  };

  if (await apiService.post(parameters)) {
    message.value = "values Inserted correctly";
  } else {
    error.value = "an error occurred when inserting the data";
  }
  clearForm();
};
const clearForm = () => {
  name.value = "";
  country.value = "";
  taxIdentifier.value = "";
};
</script>
<style scope>
.form-input {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.error-message {
  color: red;
}
.success-message {
  color: green;
}
</style>
