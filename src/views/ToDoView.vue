<script setup>
import {computed, ref} from "vue";
import {useTodoStorage} from "@/stores/todo.js";
import DateTodoItemBox from "@/components/DateTodoItemBox.vue";
import dateUtil from "@/utils/dateUtil.js";

const store = useTodoStorage();
const todoAll = ref(
    store.todoListStorage
)
const todoIng = computed(() => {
  return todoAll.value.filter(item => {
    return dateUtil.judgeTodoStateChangeEnableUtil(item) && (item.state === false)
  }).reverse()
})
const todoAlready = computed(() => {
  return todoAll.value.filter(item => {
    return item.state === true
  }).reverse()
})
const todoOverdue = computed(() => {
  return todoAll.value.filter(item => {
    return !dateUtil.judgeTodoStateChangeEnableUtil(item) && (item.state === false)
  }).reverse()
})

</script>

<template>
  <div class="todo-list-view">
    <div class="todo-list-view-title">待办列表</div>
    <div class="todo-list-view-box">
      <div class="todo-list-category-box" style="flex: 1">
        <div>🟦正在进行</div>
        <div class="todo-list-item-box">
          <DateTodoItemBox v-for="item in todoIng" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
      <div class="todo-list-category-box" style="flex: 1">
        <div>🟩已完成</div>
        <div class="todo-list-item-box">
          <DateTodoItemBox v-for="item in todoAlready" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
      <div class="todo-list-category-box" style="flex: 1">
        <div>🟥逾期待办</div>
        <div class="todo-list-item-box">
          <DateTodoItemBox v-for="item in todoOverdue" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-list-item-box {
  padding: 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.todo-list-item-box::-webkit-scrollbar {
  width: 3px;
  /*  background-color: var(--you-background-color);*/
  background: none;
}

/*定义滚动条轨道
 内阴影+圆角*/
.todo-list-item-box::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
}

/*定义滑块
 内阴影+圆角*/
.todo-list-item-box::-webkit-scrollbar-thumb {
  background-color: var(--webkit-scrollbar-track-bgc);
}


.todo-list-category-box {
  display: flex;
  flex-direction: column;
  padding: 10px;

  > div {
    color: var(--p-text-color);
  }
}

.todo-list-view-box {
  overflow: hidden;
  display: flex;
  flex: 1;
  border-top: 1px solid var(--el-border-color-light);
  padding: 10px 20px;
}

.todo-list-view-title {
  padding: 12px 20px;
  font-size: 25px;
  font-weight: bold;
  color: var(--p-text-color);
}

.todo-list-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
