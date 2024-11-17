<script setup>
import {onMounted, ref} from "vue";
const props = defineProps({
  type:{
    type:String,
    required :true
  }
})
const button = ref(null)
onMounted(()=>{
  if (props.type==='setting'){
    button.value.classList.add('dialog-button-bg-img')
  }
})
</script>

<template>
  <button class="dialog-button-box" ref="button"></button>

</template>

<style scoped>
.dialog-button-box {
  background-color: var(--you-background-color);
  outline: none;
  border: none;
/*  background-image: var(--theme-button-image);*/
  cursor: pointer;
  width: calc(var(--aside-bar-width) - 10px);
  height: calc(var(--aside-bar-width) - 10px);
  background-position: center center;
  background-size: 70% 70%;
  background-repeat: no-repeat;
  transition: all var(--transition-time);
}
.dialog-button-bg-img{
  background-image: var(--dialog-button-setting-image);
}
</style>
