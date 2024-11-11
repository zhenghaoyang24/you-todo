<script setup>
import {useSettingStore} from "@/stores/setting.js";
const store = useSettingStore();

const changeThemeFn = () => {
  if (store.storeCurrentTheme === 'dark') {
    store.storeChangeTheme('light')
  }else{
    store.storeChangeTheme('dark')
  }
}
</script>

<template>
  <div class="theme-button" @click="changeThemeFn"></div>
</template>

<style scoped>
.theme-button {
  background-image: var(--theme-button-image);
  cursor: pointer;
  width: calc(var(--aside-bar-width) - 10px);
  height: calc(var(--aside-bar-width) - 10px);
  background-position: center center;
  background-size: 70% 70%;
  background-repeat: no-repeat;
  transition: all var(--transition-time);
}

</style>
