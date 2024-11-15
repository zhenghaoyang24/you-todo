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
  user-select: none;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--el-border-color-light);
}
.you-button:enabled{
  cursor: pointer;
  color: white;
  background-color: #329fef;
}
.you-button:disabled{
  cursor: not-allowed;
  background-color: var(--you-button-bgc-disabled);
  color: var(--you-button-color-disabled);
}

</style>
