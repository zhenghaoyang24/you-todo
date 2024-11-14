import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useSettingStore = defineStore(
    'setting',
    () => {
        // 设置主题
        const storeCurrentTheme = ref('light')
        const clockRemain = ref(0)  //剩余时间
        const ringToneState = ref(true)  //true为播放
        const todoGradeColor = ('#ea5455')
        const storeChangeTheme =(theme)=> {
            if (theme === 'dark') {
                storeCurrentTheme.value = 'dark'
                window.document.documentElement.setAttribute('theme', 'dark')
            }else{
                window.document.documentElement.setAttribute('theme', 'light')
                storeCurrentTheme.value = 'light'
            }
        }
        const subClockRemain = ()=>{
            clockRemain.value --
        }
        const changeRingToneState = ()=>{
            ringToneState.value = !ringToneState.value
        }
        const initClockRemain = (h,m,s)=>{
            clockRemain.value = h * 3600 + m * 60 + s
        }
        const storeGetTheme = ()=>{
            if (storeCurrentTheme.value === 'dark') {
                window.document.documentElement.setAttribute('theme', 'dark')
            }else{
                window.document.documentElement.setAttribute('theme', 'light')
            }
        }
        return {todoGradeColor,ringToneState,storeCurrentTheme, clockRemain,storeChangeTheme,storeGetTheme,subClockRemain,initClockRemain
        ,changeRingToneState}
    },
    {
        persist: true
    }
)
