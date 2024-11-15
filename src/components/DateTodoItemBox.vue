<script setup>
import {useTodoStorage} from "@/stores/todo.js";
import dateUtil from "@/utils/dateUtil.js";
import {computed, ref} from "vue";

const centerDialogVisible = ref(false) //dialog
const store = useTodoStorage();
const props = defineProps({
  todoItem: {
    required: true
  }
})
const todoStateEnable = computed(()=>{
  return  dateUtil.judgeTodoStateChangeEnableUtil(props.todoItem)
})
const overDueState = computed(() => {   //是否逾期
  return dateUtil.judgeOverdueUtil([props.todoItem.todoDeadline.year, props.todoItem.todoDeadline.month, props.todoItem.todoDeadline.day], props.todoItem.state)
})
const deleteTodoItemFn = () => {
  let index = store.todoListStorage.findIndex(item => item.todoId === props.todoItem.todoId)
  store.todoListStorage.splice(index, 1)
  centerDialogVisible.value = false

}
const changeTodoState = (item) => {
  if (todoStateEnable.value)
    item.state = !item.state
}
</script>

<template>
  <el-dialog
      v-model="centerDialogVisible"
      title=""
      width="400"
      align-center
  >
    <span>你确定要删除这条待办及其相关数据吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteTodoItemFn">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="date-todo-item-box">
    <div class="date-todo-item-ctrl-left">
      <span @click="changeTodoState(todoItem)"
            :style="{borderColor:!todoStateEnable? 'var(--you-button-bgc-disabled)':todoItem.gradeColor,
            color:todoItem.state? todoItem.gradeColor:'var(--you-background-color)',
            cursor:!todoStateEnable? 'not-allowed':'pointer'}">
        ✔
      </span>
      <div class="date-todo-item-info">
        <input type="text" v-model="todoItem.todoTitle" :disabled="todoItem.state || overDueState"
               :style="{color: todoItem.state||overDueState? 'var(--date-todo-item-del-color)':'var(--p-text-color)',
               cursor:todoItem.state||overDueState? 'not-allowed':'text'}">
        <div>
          {{ todoItem.todoStartDate.year }}/{{ todoItem.todoStartDate.month }}/{{ todoItem.todoStartDate.day }} -
          {{ todoItem.todoDeadline.year }}/{{ todoItem.todoDeadline.month }}/{{ todoItem.todoDeadline.day }}
          {{ todoItem.todoDeadline.hour }}:{{ todoItem.todoDeadline.minute }}
          <span style="color: #ff2f2f;margin-left: 5px" v-if="overDueState">
            逾期
          </span>
          <span style="color: #47d161;margin-left: 5px" v-if="!overDueState&&todoItem.state">
            完成
          </span>
        </div>
      </div>
    </div>
    <div class="date-todo-item-del" @click="centerDialogVisible = true">
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
