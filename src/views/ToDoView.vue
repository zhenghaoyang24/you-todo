<script setup>
import {ref, watch, onBeforeMount,computed} from 'vue'
import dateUtil from "@/utils/dateUtil.js";
import TodayTodoControl from "@/components/TodayTodoControl.vue";
import {useTodoStorage} from "@/stores/todo.js";
const store = useTodoStorage();

const value = ref(new Date())
const dateToday = ref([])
const dateTodos = date=>{
  const dateArr = date.day.split("-")
  const theDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
  return store.todoListStorage.filter((item) => {
    const start = new Date(item.todoStartDate.year, item.todoStartDate.month, item.todoStartDate.day);
    const end = new Date(item.todoDeadline.year, item.todoDeadline.month, item.todoDeadline.day);
    return theDate >= start && theDate <= end
  })
}
onBeforeMount(() => {
  // 页面打开获取时间
  dateToday.value = dateUtil.getCurrentDateUtil()
})
// 切换月份
watch(value, (newValue, oldValue) => {
  dateToday.value = dateUtil.dealDateUtil(newValue);
})
// 点击日历
const calendarDayFn = (data) => {
  dateToday.value = dateUtil.dealDateUtil(data.date);
}
</script>

<template>
  <div class="todo-view-box">
    <ElCalendar v-model="value">
      <template #date-cell="{ data }">
        <div class="el-calendar-day-slot" @click="calendarDayFn(data)">
          <span class="slot-day">{{ parseInt(data.day.split("-").slice(2).join("-"), 10) }}</span>
        </div>
        <div class="todo-date-list-box">
          <div v-for="item in dateTodos(data)" :style="{backgroundColor:item.gradeColor}">
            <span>{{item.todoTitle}}</span>
            <span v-if="item.state">✔</span>
            </div>
        </div>
      </template>
    </ElCalendar>
    <div class="today-todo-control-box">
      <TodayTodoControl :selectedDate="dateToday"></TodayTodoControl>
    </div>
  </div>
</template>

<style scoped>
.todo-date-list-box{
  transition: all var(--transition-time);
  margin-top: 2px;
  padding-top: 2px;
  z-index: 1;
  height: max-content;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  >div{
    display: flex;
    justify-content: space-between;
    text-overflow: ellipsis;
    color: var(--p-text-color);
    transition: all var(--transition-time);
    padding: 2px 4px;
    font-size: 10px;
    margin-bottom: 5px;
    background-color: #329fef;
  }
}
.todo-date-list-box::-webkit-scrollbar
{
  width:3px;
  height:3px;
  background-color:var(--you-background-color);
}
/*定义滚动条轨道*/
.todo-date-list-box::-webkit-scrollbar-track
{
  -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
  border-radius:10%;
  background-color:var(--you-background-color);
}
/*定义滑块*/
.todo-date-list-box::-webkit-scrollbar-thumb
{
  -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
  background-color:var(--webkit-scrollbar-track-bgc);
}


.todo-view-box {
  display: flex;
  width: 100%;
  height: 100%;
}

/*插槽*/
:deep(.el-calendar-day) {
  display: flex;
  flex-direction: column;
  color: var(--p-text-color);
  transition: all var(--transition-time);
  padding: 2px;
  background-color: var(--you-background-color);
}

:deep(.el-calendar-day:hover) {
  background: none !important;
  .slot-day {
    transition: all var(--transition-time);
    border: 3px solid var(--el-calendar-day-span-border-color) !important;
  }
}

:deep(.is-selected) {
  transition: all var(--transition-time);
  background: none !important;

  .slot-day {
    border-color: var(--el-calendar-day-span-border-color) !important;
  }
}

:deep(.is-today) {
  transition: all var(--transition-time);
  background: none !important;

  .slot-day {
    border-color: var(--el-calendar-day-span-border-color) !important;
  }
}

.el-calendar-day-slot {
  transition: all var(--transition-time);
  background-color: var(--you-background-color);
  z-index: 2;
  width: 100%;
}

.slot-day {
  transition: all var(--transition-time);
  display: inline-block;
  font-size: 15px;
  height: var(--el-calendar-day-span-size);
  width: var(--el-calendar-day-span-size);
  line-height: var(--el-calendar-day-span-size);
  text-align: center;
  border-radius: 100%;
  border: 3px solid var(--you-background-color);
}


.today-todo-control-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-left: 1px solid var(--el-calendar-border-color);
  width: 350px;
  background-color: var(--you-background-color);
  transition: background-color 0.2s;
}

:deep(.el-calendar) {
  --el-calendar-cell-width: 15vh;
  transition: all var(--transition-time);
  flex: 1;
  height: 100%;
  background-color: var(--you-background-color);
}

:deep(.el-calendar__header) {
  transition: all var(--transition-time);
  background-color: var(--you-background-color);
  border-bottom-color: var(--el-calendar-border-color);

}

:deep(.el-calendar__body) {
  user-select: none;
  padding: 5px 30px;
  transition: all var(--transition-time);
  background-color: var(--you-background-color);
}

/*日期title*/
:deep(.el-calendar__title) {
  transition: all var(--transition-time);
  color: var(--p-text-color);
  font-size: 25px;
  font-weight: bold;
}

:deep(.el-calendar-table) {
  border: none !important;
}

/*星期文字*/
:deep(.el-calendar-table>thead>th) {
  transition: all 0.2s;
  color: var(--p-text-color);
  font-weight: bold;
}

:deep(.current) {
  height: min(90px);
}


:deep(.prev span) {
  color: #737373;
}


/*按钮*/
:deep(.el-button--small) {
  transition: all var(--transition-time);
  color: var(--p-text-color);
  border: 1px solid var(--el-calendar-border-color);
  background-color: var(--you-background-color);
}

:deep(.el-button--small:hover) {
  background-color: var(--el-button-small-hover);
}

:deep(.el-calendar__button-group) {
  line-height: 30px;
}
</style>
