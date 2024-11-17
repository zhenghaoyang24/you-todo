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
  <button class="theme-button" @click="changeThemeFn"></button>
</template>

<style scoped>
.theme-button {
  background-color: var(--you-background-color);
  outline: none;
  border: none;
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
