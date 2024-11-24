<script setup>
import WebIcon from "@/components/WebIcon.vue";
import ThemeChange from "@/components/ThemeChange.vue";
import {useSettingStore} from "@/stores/setting.js";
const store = useSettingStore();
import {onBeforeMount,ref,provide,onMounted} from "vue";
import YouDialog from "@/components/YouDialog.vue";
import ShowDialogButton from "@/components/ShowDialogButton.vue";
const finishTodoAudio = ref(null) //audio
provide('finishTodoAudio',finishTodoAudio)
onBeforeMount(()=>{
  store.storeGetTheme()
})
const dialogShow = ref(false)
</script>

<template>
  <audio preload="auto" ref="finishTodoAudio">
    <source src="@/assets/music/ding.mp3"/>
  </audio>
  <YouDialog title="设置" v-model="dialogShow"></YouDialog>
  <aside class="aside-bar">
    <div class="aside-bar-link">
      <WebIcon></WebIcon>
      <RouterLink to="/calendar" class="aside-bar-link-btn-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 512 512">
          <rect width="416" height="384" x="48" y="80" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="48" />
          <circle cx="296" cy="232" r="24" fill="currentColor" />
          <circle cx="376" cy="232" r="24" fill="currentColor" />
          <circle cx="296" cy="312" r="24" fill="currentColor" />
          <circle cx="376" cy="312" r="24" fill="currentColor" />
          <circle cx="136" cy="312" r="24" fill="currentColor" />
          <circle cx="216" cy="312" r="24" fill="currentColor" />
          <circle cx="136" cy="392" r="24" fill="currentColor" />
          <circle cx="216" cy="392" r="24" fill="currentColor" />
          <circle cx="296" cy="392" r="24" fill="currentColor" />
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M128 48v32m256-32v32" />
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M464 160H48" />
        </svg>
      </RouterLink>
      <RouterLink to="/todo" class="aside-bar-link-btn-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 24 24">
          <path fill="currentColor" d="M6.78 4.78a.75.75 0 0 0-1.06-1.06L3.75 5.69l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm14.47 13.227H9.75l-.102.007a.75.75 0 0 0 .102 1.493h11.5l.102-.007a.75.75 0 0 0-.102-1.493m0-6.507H9.75l-.102.007A.75.75 0 0 0 9.75 13h11.5l.102-.007a.75.75 0 0 0-.102-1.493m0-6.5H9.75l-.102.007A.75.75 0 0 0 9.75 6.5h11.5l.102-.007A.75.75 0 0 0 21.25 5M6.78 17.78a.75.75 0 1 0-1.06-1.06l-1.97 1.97l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0-7.56a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.97-1.97a.75.75 0 0 1 1.06 0" />
        </svg>
      </RouterLink>
      <RouterLink to="/timer" class="aside-bar-link-btn-box">
        <svg xmlns="http://www.w3.org/2000/svg"  width="1.6rem" height="1.6rem"  viewBox="0 0 256 256">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16">
            <path d="M 80.039519,211.06969 64.056987,239.90745" />
            <path d="m 175.96058,211.06969 15.98254,28.83776" />
            <circle cx="128" cy="128.007" r="95.915" />
            <path d="M 35.294352,102.43866 A 47.957299,47.957299 0 0 1 17.212686,53.792007 47.957299,47.957299 0 0 1 53.990946,17.175027 47.957299,47.957299 0 0 1 102.55767,35.470309" />
            <path d="m 127.99967,32.092482 3.8e-4,-15.985761" />
            <path d="M 128.00005,80.049788 V 128.00708" />
            <path d="m 128.00005,128.00708 33.91093,33.91093" />
            <path d="M 220.70575,102.43866 A 47.957299,47.957299 0 0 0 238.78742,53.792007 47.957299,47.957299 0 0 0 202.00916,17.175027 47.957299,47.957299 0 0 0 153.44244,35.470309" />
          </g>
        </svg>
      </RouterLink>
    </div>
    <div class="aside-bar-bottom-button">
      <ShowDialogButton title="设置" @click="()=>dialogShow = true"></ShowDialogButton>
      <ThemeChange></ThemeChange>
    </div>
  </aside>

  <main class="main-area">
    <RouterView/>
  </main>

</template>

<style scoped>
.router-link-exact-active{
  border-bottom: 3px solid var(--you-background-color);
}
.aside-bar-link-btn-box{
  display: flex;
  justify-content: center;
}

.aside-bar-bottom-button>button{
  margin-bottom: 5px;
}
.aside-bar {
  position: fixed; /* 固定侧边栏（滚动时保持原位）*/
  z-index: 1; /* 保持领先 */
  top: 0; /* 保持在顶部 */
  left: 0;
  height: calc(100vh - 2*var(--aside-pading));
  border-right: 1px var(--aside-border-right-color) solid;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: var(--aside-bar-width);
  padding: var(--aside-pading);
  background-color: var(--you-background-color);
  transition: all var(--transition-time);
}

.aside-bar-link {
  display: block;
  > a {
    border-bottom-color: #329fef;
    color: var(--p-text-color);
    margin: 15px auto;
    display: flex;
    justify-content: center;
    width: calc(var(--aside-bar-width) - 10px);
    height: calc(var(--aside-bar-width) - 10px);
    transition: all var(--transition-time);
  }
}
.main-area {
  padding-left: calc(var(--aside-bar-width) + 20px);
  transition: background-color 0.2s;
  background-color: var(--you-background-color);
  flex: 1;
}

</style>
