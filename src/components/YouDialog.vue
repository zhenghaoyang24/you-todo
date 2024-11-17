<script setup>
import {ref,watch,nextTick} from "vue";
const dialogShow =defineModel()  //dialog值
const refDialog = ref(null)  //绑定dom
watch(dialogShow, (value) => {
  nextTick(()=>{
    if (value){
      console.log(refDialog.value.style.display = 'flex')
    }else{
      console.log(refDialog.value.style.display = 'none')
    }
  })
},{immediate:true})
const props = defineProps({
  title:{
    type:String,
    default:'标题',
    required:true
  },
  dialogWidth:{
    type:Number,
    default:500
  },
  dialogHeight:{
    type:Number,
    default:300
  }
})
</script>

<template>
  <div class="you-dialog-box" ref="refDialog">
    <div class="you-dialog-box-content" :style="{width:props.dialogWidth+'px',height:props.dialogHeight+'px'}">
      <div class="you-dialog-title">
        <span>{{title}}</span>
        <span @click="()=>dialogShow=false">X</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.you-dialog-title{
  display: flex;
  width: 100%;
}
.you-dialog-title>span:nth-child(1){
  color: var(--p-text-color);
  text-align: center;
  flex: 1;
}
.you-dialog-title>span:nth-child(2){
  cursor: pointer;
  text-align: center;
  width: 20px;
  height: 20px;
}
.you-dialog-box{
  z-index: 99999;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(var(--you-background-color), 0.5);
  backdrop-filter: blur(10px);
  display: none;
  justify-content: center;
  align-items: center;
}
.you-dialog-box-content{
  background-color: var(--el-bg-color);
  box-shadow: 0 0 5px 1px var(--you-dialog-box-shadow);
}
</style>
