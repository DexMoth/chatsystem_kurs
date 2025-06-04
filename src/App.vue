<script setup>
import Header from './globalComponents/Header.vue'
import { RouterView } from 'vue-router'
import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<template>
  <Header/>
  <RouterView />
</template>

<style>
#app {
  min-height: 100vh;
  background-color: var(--color-body);
  font-family: Arial;
  display: flex;
  flex-direction: column;
}

:root {
    --color-main: rgb(51, 19, 13);
    --color-body: #e5e5e5;
    --color-nav: rgb(217, 202, 183);
    --color-link: rgb(210, 46, 46);
    --color-link-hover: rgb(138, 36, 14);
    --color-text: #0f0e0e;
}
</style>