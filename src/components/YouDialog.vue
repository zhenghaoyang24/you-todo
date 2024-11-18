<script setup>
import {ref,watch,nextTick} from "vue";
import {useSettingStore} from "@/stores/setting.js";
const store = useSettingStore();
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
  }
})
</script>

<template>
  <div class="you-dialog-box" ref="refDialog">
    <div class="you-dialog-box-content" :style="{width:props.dialogWidth+'px'}">
      <div class="you-dialog-title">
        <span>{{title}}</span>
        <span @click="()=>dialogShow=false">×</span>
      </div>
      <div class="you-dialog-item-slot">
        <slot name="dialogItem">
          <div class="timer-set-ring-tone-box-dialog">
            <div>倒计时结束播放声音</div>
            <el-switch
                v-model="store.ringToneState"
                inline-prompt
                active-text="开"
                inactive-text="关"
            />
          </div>
          <div class="timer-set-ring-tone-box-dialog">
            <div>待办完成提示音</div>
            <el-switch
                v-model="store.todoPromptSound"
                inline-prompt
                active-text="开"
                inactive-text="关"
            />
          </div>
          <div class="timer-set-ring-tone-box-dialog">
            <div>添加代办提示音</div>
            <el-switch
                v-model="store.addTodoPromptSound"
                inline-prompt
                active-text="开"
                inactive-text="关"
            />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-set-ring-tone-box-dialog {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  > div {
    padding-right: 20px;
    font-size: 15px;
    color: var(--p-text-color);
  }
}


.you-dialog-item-slot{
  flex: 1;
  padding: 10px;
}


.you-dialog-title{
  display: flex;
  width: 100%;
}
.you-dialog-title>span:nth-child(1){
  color: var(--p-text-color);
  text-align: center;
  flex: 1;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.you-dialog-title>span:nth-child(2){
  cursor: default;
  text-align: center;
  line-height: 100%;
  width: 25px;
  height: 25px;
  font-size: 24px;
  color: var(--p-text-color);
}
.you-dialog-title>span:nth-child(2):hover{
  background-color: var(--dialog-state-button-hover-color);
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
  min-height: 350px;
  padding: 5px;
  background-color: var(--el-bg-color);
  box-shadow: 0 0 5px 1px var(--you-dialog-box-shadow);
}
</style>
