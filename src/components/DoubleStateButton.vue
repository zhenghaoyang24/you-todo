<script setup>
import {ref} from "vue";
const props = defineProps({
  btnDisabled: {
    type: Boolean,
    default: false
  },
  buttonState:{
    type: Boolean,
    default: true
  }
});

const buttonState = ref(true)

</script>

<template>
  <button @keydown.space.prevent type="button" :disabled="props.btnDisabled"
          :class="['you-button', {'you-button-true':props.buttonState===true,'you-button-false':props.buttonState===false}]">
    {{props.buttonState? "Space 开始":"Space 暂停"}}
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
}
.you-button:disabled{
  cursor: not-allowed;
  background-color: var(--you-button-bgc-disabled);
  color: var(--you-button-color-disabled);
}
.you-button-true{
  background-color: #2ab355;
}
.you-button-false{
  background-color: #ff0000;
}
</style>
