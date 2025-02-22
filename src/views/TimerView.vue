<script setup>
import {ref, computed, onMounted,onUnmounted, onBeforeUnmount,watch} from "vue";
import YouButton from "@/components/YouButton.vue";
import DoubleStateButton from "@/components/DoubleStateButton.vue";
import {useSettingStore} from "@/stores/setting.js";
import dateUtil from "@/utils/dateUtil.js";
const store = useSettingStore();

onMounted(() => {
  timerHour.value = Math.floor(store.clockRemain / 3600)
  timerMinute.value = Math.floor((store.clockRemain % 3600) / 60)
  timerSecond.value = Math.floor(store.clockRemain % 3600 % 60)
})
onBeforeUnmount(() => {
  clearTimeout(timerClock.value)
})
const processRate = computed(() => {  //计算进度
  if ((store.totalTimer - store.clockRemain) !== store.totalTimer)
    return Math.floor((store.totalTimer - store.clockRemain) / store.totalTimer * 100)
  else {
    return 100
  }
})

const editTimerState = ref(true) //true 为编辑

/*获取当前时间。且每秒刷新*/
// 定义计时器变量
let timer;
const currentData  = ref([])
watch(editTimerState, (value) => {
  if(!value){
    // 获取当前时间，每秒刷新
    timer = setInterval(() => {
      // 获取当前时间并更新到响应式变量
      currentData.value = dateUtil.getCurrentDateUtil()
    }, 1000);
  }else {
    // 消除计时器
    clearInterval(timer);

  }
})

const audioMusicRef = ref(null) //audio
const timerClockStopState = ref(false)  //true为暂停状态

const timerClock = ref()
const timerHour = ref(0)
const timerMinute = ref(25)
const timerSecond = ref(0)



const startTimerFn = () => {
  clearTimeout(timerClock.value)
  store.initClockRemain(timerHour.value, timerMinute.value, timerSecond.value)
  timerClock.value = setInterval(() => {
    store.subClockRemain()
    timerHour.value = Math.floor(store.clockRemain / 3600)
    timerMinute.value = Math.floor((store.clockRemain % 3600) / 60)
    timerSecond.value = Math.floor(store.clockRemain % 3600 % 60)
    if (store.clockRemain === 0) {
      clearTimeout(timerClock.value)
      if (store.ringToneState)  //开起 则播放声音
        audioMusicRef.value.play()
    }
  }, 1000);
}

// 启动计时器
const startBtn = () => {
  if (editTimerState.value) {  //开始计时
    timerClockStopState.value = false  //按钮为开始状态（显示暂停）
    editTimerState.value = false
    startTimerFn()
    store.initTotalTimer(timerHour.value, timerMinute.value, timerSecond.value)
  } else {
    editTimerState.value = true
    clearTimeout(timerClock.value)
  }
}
// 开始与暂停
const timerStateBtn = () => {
  if (timerClockStopState.value) {  //点击开始按钮
    timerClockStopState.value = false
    startTimerFn()
  } else {
    clearTimeout(timerClock.value)
    timerClockStopState.value = true
  }
}

// 监听 暂停与开始
// const handleKeyDownSpace = (event) => {
//   if (event.key === 'space') {
//     console.log('space')
//     timerStateBtn()
//   }
// };
// onMounted(() => {
//   console.log('mounted space')
//   window.addEventListener('keydown', handleKeyDownSpace);
// });
// // 在组件卸载时移除
// onUnmounted(() => {
//   window.removeEventListener('keydown', handleKeyDownSpace);
// });

const format = (percentage) => (percentage === 100 ? 'success' : 'exception')
const optionsHour = Array.from({length: 24}).map((_, idx) => ({
  value: idx,
  label: idx,
}))
const optionsMS = Array.from({length: 60}).map((_, idx) => ({
  value: idx,
  label: idx,
}))

const previewTimer = (h, m, s) => {   //预设时间
  timerHour.value = h
  timerMinute.value = m
  timerSecond.value = s
}

const startBtnState = computed(() => {  //启动按钮是否可按
  return timerHour.value === 0 && timerMinute.value === 0 && timerSecond.value === 0
})

</script>

<template>
  <div class="timer-view-box">
    <div class="timer-view-set-main" v-if="editTimerState">
      <div class="timer-set-select-box">
        <el-select-v2
            v-model="timerHour"
            :options="optionsHour"
            placeholder="Please select"
            size="large"
            style="width: 240px"
        />
        <span>时</span>
        <el-select-v2
            v-model="timerMinute"
            :options="optionsMS"
            placeholder="Please select"
            size="large"
            style="width: 240px"
        />
        <span>分</span>
        <el-select-v2
            v-model="timerSecond"
            :options="optionsMS"
            placeholder="Please select"
            size="large"
            style="width: 240px"
        />
        <span>秒</span>
      </div>
      <div class="timer-set-preview-box">
        <span @click="previewTimer(0,25,0)">25:00</span>
        <span @click="previewTimer(1,0,0)">60:00</span>
        <span @click="previewTimer(1,30,0)">1:30:00</span>
        <span @click="previewTimer(2,0,0)">2:00:00</span>
      </div>
      <div class="timer-set-ring-tone-box">
        <span>完成时播放声音：</span>
        <el-switch
            v-model="store.ringToneState"
            inline-prompt
            active-text="是"
            inactive-text="否"
        />
      </div>
      <div class="timer-set-start-box">
        <YouButton @click="startBtn" :disabled="startBtnState">
          <template #buttonName>开始专注</template>
        </YouButton>
      </div>
    </div>
    <div v-else class="timer-view-clock-main">
      <div class="timer-view-clock-current-time" >
        {{currentData[0]}}年{{currentData[1]}}月{{currentData[2]}}日 {{currentData[3][0]}}:{{currentData[3][1]}}:{{currentData[3][2]}} {{currentData[4]}}
      </div>
      <div class="timer-view-clock-box">
        <span v-if="timerHour!==0">{{ timerHour }}:</span>
        <span v-if="!(timerHour===0&&timerMinute===0)">{{ timerMinute }}:</span>
        <span>{{ timerSecond }}</span>
      </div>
      <div class="demo-progress">
        <el-progress :percentage="processRate" :status="format(processRate)"/>
      </div>
      <div class="timer-view-clock-control-box">
        <audio preload ref="audioMusicRef">
          <source src="../assets/music/music.mp3"/>
        </audio>
        <YouButton @click="startBtn" :disabled="false">
          <template #buttonName>编辑时间</template>
        </YouButton>
        <DoubleStateButton @click="timerStateBtn" :disabled="startBtnState" :buttonState="timerClockStopState">
        </DoubleStateButton>
      </div>
    </div>

  </div>
</template>

<style scoped>
.demo-progress{
  flex: 1;
  display: flex;
  justify-content: center;
}
.demo-progress .el-progress--line {
  margin-bottom: 50px;
  width: 300px;
}
:deep(.el-progress__text) {
  min-width: 15px;
}
.timer-view-clock-current-time{
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--p-text-color);
  transition: all var(--transition-time);
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.timer-view-clock-box {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--p-text-color);
  transition: all var(--transition-time);
  > span {
    text-shadow: var(--current-time-text-shadow);
    width: fit-content;
    font-size: 9rem;
  }
}

.timer-view-clock-control-box {
  display: flex;
  justify-content: space-around;
}

.timer-set-ring-tone-box {
  margin: 10px 0;
  display: flex;
  align-items: center;

  > span {
    color: var(--p-text-color);
  }
}

.timer-set-start-box {
  margin-top: 40px;
  display: flex;
  justify-content: center;

  > button {
    background-color: var(--you-background-color);
    outline: none;
    border: none;
  }
}

.timer-set-preview-box {
  flex-wrap: wrap;
  word-wrap: break-word;
  display: flex;
  margin-top: 20px;

  > span {
    margin-right: 20px;
    color: #329fef;
    cursor: pointer;
    text-decoration: underline;
  }

  > span:active {
    color: #0072c3;
  }
}

.timer-set-select-box {
  display: flex;
  align-items: center;

  > span {
    font-size: 20px;
    padding: 0 10px;
    color: var(--p-text-color);
  }
}

:deep(.el-select,.el-select--large) {
  width: 100px !important;
}

.timer-view-box {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.timer-view-set-main {
  align-content: center;
}

.timer-view-clock-main {
  align-content: center;
}

</style>
