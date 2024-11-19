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
          <div v-if="todoIng.length===0" class="todo-list-item-no">没有正在进行的待办。</div>
          <DateTodoItemBox v-else v-for="item in todoIng" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
      <div class="todo-list-category-box" style="flex: 1">
        <div>🟩已完成</div>
        <div class="todo-list-item-box">
          <div v-if="todoAlready.length===0" class="todo-list-item-no">没有已完成的待办。</div>
          <DateTodoItemBox v-else v-for="item in todoAlready" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
      <div class="todo-list-category-box" style="flex: 1">
        <div>🟥逾期待办</div>
        <div class="todo-list-item-box">
          <div v-if="todoOverdue.length===0" class="todo-list-item-no">没有逾期待办。</div>
          <DateTodoItemBox v-else v-for="item in todoOverdue" :key="item.todoId" :todo-item="item"></DateTodoItemBox>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-list-item-no{
  padding-top: 20px;
  color:var(--p-text-color);
  transition: all var(--transition-time);
}
.todo-list-item-box {
  transition: all var(--transition-time);
  padding: 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.todo-list-item-box::-webkit-scrollbar {
  width: 3px;
  transition: all var(--transition-time);
  background: none;
}

/*定义滚动条轨道
 内阴影+圆角*/
.todo-list-item-box::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  transition: all var(--transition-time);
}

/*定义滑块
 内阴影+圆角*/
.todo-list-item-box::-webkit-scrollbar-thumb {
  transition: all var(--transition-time);
  /*background-color: var(--webkit-scrollbar-track-bgc);*/
  background: none;
}
.todo-list-category-box {
  display: flex;
  flex-direction: column;
  padding: 10px;

  > div {
    transition: all var(--transition-time);
    color: var(--p-text-color);
  }
}

.todo-list-view-box {
  overflow: hidden;
  display: flex;
  flex: 1;
  border-top: 1px solid var(--el-border-color-light);
  padding: 10px 20px;
  transition: all var(--transition-time);
}

.todo-list-view-title {
  padding: 12px 20px;
  font-size: 25px;
  font-weight: bold;
  transition: all var(--transition-time);
  color: var(--p-text-color);
}

.todo-list-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

}
</style>
