<script setup>

const props = defineProps({
  btnDisabled: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
<button type="button" :disabled="props.btnDisabled" class="you-button">
  <slot name="buttonName">按钮</slot>
</button>
</template>

<style scoped>
.you-button{
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  color: var(--p-text-color);
  background-color: #329fef;
  border: 1px solid var(--el-border-color-light);
}
.you-button:disabled{
  cursor: not-allowed;
  background-color: var(--you-button-bgc-disabled);
  color: var(--you-button-color-disabled);
}

</style>
