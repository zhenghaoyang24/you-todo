<script setup>
import {ref, onMounted} from "vue";

const props = defineProps({
  boxWidth: {
    type: String,
    default: 100,
  },
  boxHeight: {
    type: String,
    default: 100,
  },
  modelValue:{
    type: String,
    default:'#ea5455'
  },
})
const showGradeOptionalValue = ref(false)
const gradeOptional = ref([
  '#ea5455',
  '#f07b3f',
  '#ffd460',
  '#1fab89',
  '#62d2a2',
  '#0dceda',
  '#7098da',
  '#a393eb',
])
const emit = defineEmits(['update:modelValue'])
const selectGradeBoxStyle = ref({
  width: props.boxWidth + 'px',
  height: props.boxHeight + 'px',
  backgroundColor: '#FF6A6A',
})
const showGradeOptionalFn = ()=>{
  showGradeOptionalValue.value = !showGradeOptionalValue.value;
}
const changeGradeBoxStyleFn = (color)=>{
  selectGradeBoxStyle.value.backgroundColor = color
  emit('update:modelValue',color)
}
</script>

<template>
  <div tabindex="-1"
       :style="selectGradeBoxStyle"
       class="select-grade-button"
       @click="showGradeOptionalFn" @blur="showGradeOptionalFn"></div>
  <div class="select-grade-option-box" v-if="showGradeOptionalValue">
    <span v-for="item in gradeOptional" :style="{backgroundColor:item}" @mousedown="changeGradeBoxStyleFn(item)"></span>
  </div>

</template>

<style scoped>
.select-grade-button {
  cursor: pointer;
  border-radius: 5%;
  margin-left: 10px;
}
.select-grade-option-box{
  margin-top: 190px;
  transition: all 0.2s;
  z-index: 10;
  position: absolute;
  width: 100px;
  background-color: var(--select-grade-option-box-bgc);
  border: 1px solid var(--el-border-color-lighter);
}
.select-grade-option-box>span{
  border-radius: 5%;
  display: block;
  flex: 1;
  height: 10px;
  margin: 10px;
  transition: 0.2s;
  cursor: pointer;
}
.select-grade-option-box>span:hover{
  transform: scale(1.08);
  transition: 0.1s;
}
</style>
