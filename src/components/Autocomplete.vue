<template>
  <div>
    <InputText
      :placeholder="placeholder"
      :rules="rules"
      @input="searchValues($event.target.value)"
      v-model="modelValue"
    />

    <ul
      v-if="filteredValues.length"
      class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
    >
      <li
        v-for="value in filteredValues"
        :key="value"
        @click="selectCountry(value[props.keyValue])"
        class="filtered row justify-content-start"
      >
        {{ value[props.keyValue] }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import InputText from "./InputText.vue";
import { ref, watch } from "vue";

let searchTerm = ref("");
let filteredValues = ref([]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  keyValue: {
    type: String,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits("update");

const searchValues = (text) => {
  if (text === "") {
    filteredValues.value = [];
  } else {
    let matches = 0;
    filteredValues.value = props.options.filter((item) => {
      if (
        item[props.keyValue].toLowerCase().includes(text.toLowerCase()) &&
        matches < 15
      ) {
        matches++;
        return item;
      }
    });
  }
};
watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  emit("update:modelValue", newSearchTerm);
});
const selectCountry = (country) => {
  searchTerm.value = country;
  filteredValues.value = [];
};
</script>
<style scope>
.filtered {
  text-decoration: none;
  cursor: pointer;
}
.filtered:hover {
  background: #a0c6dd;
}
</style>
