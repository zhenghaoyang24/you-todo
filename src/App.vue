<script setup>
import WebIcon from "@/components/WebIcon.vue";
import ThemeChange from "@/components/ThemeChange.vue";
import {useSettingStore} from "@/stores/setting.js";
const store = useSettingStore();
import {onBeforeMount,ref} from "vue";
import YouDialog from "@/components/YouDialog.vue";
import ShowDialogButton from "@/components/ShowDialogButton.vue";
onBeforeMount(()=>{
  store.storeGetTheme()
})
const dialogShow = ref(false)
</script>

<template>
  <YouDialog title="设置" v-model="dialogShow"></YouDialog>
  <aside class="aside-bar">
    <div class="aside-bar-link">
      <WebIcon></WebIcon>
      <RouterLink to="/todo" class="aside-bar-link-todo"></RouterLink>
      <RouterLink to="/timer" class="aside-bar-link-timer"></RouterLink>
    </div>
    <div class="aside-bar-bottom-button">
      <ShowDialogButton title="设置" type="setting" @click="()=>dialogShow = true">
        <template #dialogItem>

        </template>
      </ShowDialogButton>
      <ThemeChange></ThemeChange>
    </div>
  </aside>

  <main class="main-area">
    <RouterView/>
  </main>

</template>

<style scoped>
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
    margin: 15px auto;
    display: block;
    background-position: center center;
    background-size: 80% 80%;
    background-repeat: no-repeat;
    width: calc(var(--aside-bar-width) - 10px);
    height: calc(var(--aside-bar-width) - 10px);
    transition: all var(--transition-time);
  }
}
.aside-bar-link-todo{
  background-image: var(--aside-todo-button-image);
}
.aside-bar-link-timer{
  background-image: var(--aside-timer-button-image);
}
.aside-bar-link-data{  /*data view 未用*/
  background-image: var(--aside-data-button-image);
}
.main-area {
  padding-left: calc(var(--aside-bar-width) + 20px);
  transition: background-color 0.2s;
  background-color: var(--you-background-color);
  flex: 1;
}
.router-link-exact-active{
  border-bottom: 4px solid var(--aside-active-border-botton-color);
}

</style>
