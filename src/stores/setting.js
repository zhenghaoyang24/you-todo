import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useSettingStore = defineStore(
    'setting',
    () => {
        // 设置主题
        const storeCurrentTheme = ref('light')
        const storeChangeTheme =(theme)=> {
            if (theme === 'dark') {
                storeCurrentTheme.value = 'dark'
                window.document.documentElement.setAttribute('theme', 'dark')
            }else{
                window.document.documentElement.setAttribute('theme', 'light')
                storeCurrentTheme.value = 'light'
            }
        }
        const storeGetTheme = ()=>{
            if (storeCurrentTheme.value === 'dark') {
                window.document.documentElement.setAttribute('theme', 'dark')
            }else{
                window.document.documentElement.setAttribute('theme', 'light')
            }
        }
        return {storeCurrentTheme, storeChangeTheme,storeGetTheme}
    },
    {
        persist: true
    }
)
