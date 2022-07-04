<template>
  <div>
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="validInputText($event.target.value)"
      :value="modelValue"
      required
    />
    <div v-if="error" class="error">* {{ error }}</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
  },
});
let error = ref();
const valueInput = ref(props.modelValue);
const validInputText = (textValue) => {
  error.value = null;
  if (props.rules.length) {
    for (let rule of props.rules) {
      const result = rule(textValue);
      if (result !== true) {
        error.value = result;
        break;
      }
    }
  }
};
</script>
<style scope>
.error {
  color: red;
}
</style>
