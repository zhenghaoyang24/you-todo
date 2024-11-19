<script setup>
import dateUtil from "@/utils/dateUtil.js";
import TodoGradeColor from "@/components/TodoGradeColor.vue";
import YouButton from "@/components/YouButton.vue";
import {computed, ref} from "vue";
import {useTodoStorage} from "@/stores/todo.js";
const store = useTodoStorage();
import DateTodoItemBox from "@/components/DateTodoItemBox.vue";
import {useSettingStore} from "@/stores/setting.js";
const storeSetting = useSettingStore();
const addTodoAudioRef =ref(null)
const props = defineProps({
  selectedDate: Array
})
/*定义*/
//是否允许添加
const addTodoAllow = (selectDate) => {
  const dateSelect = new Date(selectDate[0], selectDate[1], selectDate[2])
  const dateNow = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  return dateSelect >= dateNow
}
const modelValue = ref('#ea5455')  //grade颜色
const errorMsg = ref('')// 错误消息
const todoTitle = ref('') //todo标题
const elDatePickerDeadline = ref(null)  //picker选择的日期

// 计算属性
// 获取本日期的所有todo
const dateTodoList = computed(() => {
  const selected = new Date(props.selectedDate[0], props.selectedDate[1], props.selectedDate[2]);
  return store.todoListStorage.filter((item) => {
    const start = new Date(item.todoStartDate.year, item.todoStartDate.month, item.todoStartDate.day);
    const end = new Date(item.todoDeadline.year, item.todoDeadline.month, item.todoDeadline.day);
    return selected >= start && selected <= end
  })
})
const addTodoBtnFn = () => {
  errorMsg.value = ''
  if (elDatePickerDeadline.value === null) {
    // 今日任务
    const res = store.addTodoStorage(true, todoTitle.value, modelValue.value, props.selectedDate, null)
    if (res) {  //添加成功，清除输入框数据
      errorMsg.value = ''
      elDatePickerDeadline.value = null
      todoTitle.value = ''
      console.log(storeSetting.todoPromptSound)
      if (storeSetting.addTodoPromptSound === true){ //播放声音
        addTodoAudioRef.value.play()
      }

    } else {
      errorMsg.value = '发生错误。'
    }
  } else {
    if (dateUtil.judgeDate(elDatePickerDeadline.value, props.selectedDate)) {
      const arr = dateUtil.dealDateUtil(elDatePickerDeadline.value)
      const res = store.addTodoStorage(false, todoTitle.value, modelValue.value, props.selectedDate, arr)
      if (res) {
        errorMsg.value = ''
        elDatePickerDeadline.value = null
        todoTitle.value = ''
        if (storeSetting.addTodoPromptSound === true){ //播放声音
          addTodoAudioRef.value.play()
        }
      } else {
        errorMsg.value = '发生错误。'
      }
      //   时间检测成功 添加todo
    } else {
      //   失败 返回错误消息
      errorMsg.value = `请选择${props.selectedDate[1]}月${props.selectedDate[2]}日及其之后的时间`
    }
  }


}

</script>

<template>
  <div class="todo-control-tight-date">
    {{ selectedDate[1] }}月{{ selectedDate[2] }}日
    <span>{{ selectedDate[4] }}</span>
  </div>
  <div class="add-todo-box" tabindex="-1" v-show="addTodoAllow(selectedDate)">
    <div class="add-todo-input">
      <TodoGradeColor box-height="20" box-width="20" v-model="modelValue"></TodoGradeColor>
      <input @keyup.enter="addTodoBtnFn" type="text" placeholder="添加待办" v-model.trim="todoTitle">
    </div>
    <div class="el-date-picker-box">
      <el-date-picker @focus="errorMsg = ''"
                      v-model="elDatePickerDeadline"
                      type="datetime"
                      placeholder="选择截止时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      date-format="MMM DD, YYYY"
                      time-format="HH:mm"
      />
    </div>
    <div class="add-todo-btn-box">
      <span>{{ errorMsg }}</span>
      <audio preload ref="addTodoAudioRef">
        <source src="../assets/music/add-todo-notification.mp3"/>
      </audio>
      <YouButton @click="addTodoBtnFn" :disabled="todoTitle.length===0">
        <template #buttonName>添加代办</template>
      </YouButton>
    </div>
  </div>
  <div class="date-todo-list-box">
    <h3>代办列表</h3>
    <div v-if="dateTodoList.length>0" class="date-todo-list-item-box-yes">
      <DateTodoItemBox v-for="item in dateTodoList" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
    </div>
    <div v-else class="date-todo-list-item-box-no">
      这个时间没有任何代办。
    </div>

  </div>

</template>

<style scoped>
.date-todo-list-box > h3 {
  color: var(--p-text-color);
}

.date-todo-list-item-box-no {
  color: var(--p-text-color);
  padding-top: 10px;
  border-top: 1px solid var(--el-border-color-light);
}

.date-todo-list-box {
  transition: all var(--transition-time);
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.date-todo-list-item-box-yes {
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  padding: 10px 5px 0 0;
  border-top: 1px solid var(--el-border-color-light);
}

.date-todo-list-item-box-yes::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: var(--you-background-color);
}

/*定义滚动条轨道
 内阴影+圆角*/
.date-todo-list-item-box-yes::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10%;
  background-color: var(--you-background-color);
}

/*定义滑块
 内阴影+圆角*/
.date-todo-list-item-box-yes::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: var(--webkit-scrollbar-track-bgc);
}

:deep(.el-input__wrapper) {
  transition: all var(--transition-time);
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-time-spinner__item:hover ) {
  background-color: #329fef !important;
}

.add-todo-btn-box {
  display: flex;
  margin: 5px;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 10px;
    color: var(--p-text-color);
  }
}


.todo-control-tight-date {
  font-weight: bold;
  padding-top: 10px;
  transition: all var(--transition-time);
  font-size: 30px;
  color: var(--p-text-color);
  line-height: 100%;
  height: 40px;

  > span {
    font-size: 13px;
  }
}

.add-todo-box {
  user-select: none;
  margin-top: 10px;
  border: 1px solid var(--el-calendar-border-color);
}

.add-todo-input {
  display: flex;
  align-items: center;
  width: 100%;

  > span {
    display: flex;
    width: 45px;
    height: 45px;
  }

  input {
    flex: 1;
    color: var(--p-text-color);
    padding: 17px 10px 17px 5px;
    background: none;
    outline: none;
    border: none;
  }
}


.add-todo-box input::placeholder {
  color: var(--add-todo-box-input-placeholder);
}


</style>
