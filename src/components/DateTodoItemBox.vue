<script setup>
import {useTodoStorage} from "@/stores/todo.js";

const store = useTodoStorage();
const props = defineProps({
  todoItem: {
    required: true
  }
})
const deleteTodoItem = (id)=>{
  let index = store.todoListStorage.findIndex(item => item.todoId===id)
  store.todoListStorage.splice(index,1)
}
</script>

<template>
  <div class="date-todo-item-box">
    <div class="date-todo-item-ctrl-left">
      <span @click="()=> todoItem.state = !todoItem.state"
            :style="{borderColor:todoItem.gradeColor,color:todoItem.state? todoItem.gradeColor:'var(--you-background-color)'}">
        ✔
      </span>
      <div class="date-todo-item-info">
        <input type="text" v-model="todoItem.todoTitle" :disabled="todoItem.state"
               :style="{color: todoItem.state? 'var(--date-todo-item-del-color)':'var(--p-text-color)',
               cursor:todoItem.state? 'not-allowed':'text'}">
        <div>
          {{ todoItem.todoStartDate.year }}/{{ todoItem.todoStartDate.month }}/{{ todoItem.todoStartDate.day }} -
          {{ todoItem.todoDeadline.year }}/{{ todoItem.todoDeadline.month }}/{{ todoItem.todoDeadline.day }}
          {{ todoItem.todoDeadline.hour }}:{{ todoItem.todoDeadline.minute }}
        </div>
      </div>
    </div>
    <div class="date-todo-item-del" @click="deleteTodoItem(todoItem.todoId)">
      ×
    </div>
  </div>

</template>

<style scoped>
.date-todo-item-info {
  padding-left: 5px;
  > input {
    color: var(--p-text-color);
    transition: all var(--transition-time);
    padding: 0 0 5px 0;
    margin: 0;
    border: none;
    outline: none;
    background-color: var(--you-background-color);
    font-size: 18px;
  }

  > div {
    color: var(--p-text-color);
    font-size: 10px;
    font-weight: 500;
  }
}

.date-todo-item-box {
  padding: 10px 0;
  border-radius: 5px;
  border: 1px solid var(--el-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  transition: all var(--transition-time);
}

.date-todo-item-ctrl-left {
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 1;
  padding-left: 7px;

  > span {
    user-select: none;
    transition: all var(--transition-time);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    padding: 1px;
    border-width: 3px;
    border-style: solid;
  }
}

.date-todo-item-del {
  user-select: none;
  cursor: pointer;
  font-weight: bolder;
  color: var(--date-todo-item-del-color);
  align-content: center;
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 20px;
}

.date-todo-item-del:hover {
  color: var(--p-text-color);
}
</style>
