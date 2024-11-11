import {ref} from 'vue'
import {defineStore} from 'pinia'
import hashUtil from "@/utils/hashUtil.js";

export const useTodoStorage = defineStore(
    'todos',
    ()=>{
        const todoListStorage = ref([])
        const  addTodoStorage = (todayBoolean,todoTitle,gradeColor,startArr,endArr)=>{
            const todoItemStorage ={
                todoId: 'id',
                todoTitle:'title',
                gradeColor:'#ea5455',
                todoStartDate:{
                    year: 0,
                    month:0,
                    day:0,
                    hour:0,
                    minute:0,
                    second:0,
                },
                todoDeadline:{
                    year:0,
                    month:0,
                    day:0,
                    hour:23,
                    minute:59,
                    second:59,
                },
                state:false
            }
            todoItemStorage.todoId = hashUtil.getHashcode()
            todoItemStorage.todoTitle = todoTitle  //todo名字
            todoItemStorage.gradeColor = gradeColor  //颜色等级
            todoItemStorage.state = false  //状态 添加时默认为false：未完成
            todoItemStorage.todoStartDate.year = startArr[0]  //开始日期
            todoItemStorage.todoStartDate.month = startArr[1]
            todoItemStorage.todoStartDate.day = startArr[2]
            if (todayBoolean){  //添加当天代办，开始日期与结束日期一样
                todoItemStorage.todoDeadline.year = startArr[0]
                todoItemStorage.todoDeadline.month = startArr[1]
                todoItemStorage.todoDeadline.day = startArr[2]
            }else{  //添加以后得待办
                todoItemStorage.todoDeadline.year = endArr[0]
                todoItemStorage.todoDeadline.month = endArr[1]
                todoItemStorage.todoDeadline.day = endArr[2]
                todoItemStorage.todoDeadline.hour = endArr[3][0]
                todoItemStorage.todoDeadline.minute = endArr[3][1]
                todoItemStorage.todoDeadline.second = endArr[3][2]
            }
            return  todoListStorage.value.push(todoItemStorage)
        }
        return {
            todoListStorage,addTodoStorage
        }
    },
    {
        persist:{
            pick:['todoListStorage']
        }
    }
)
