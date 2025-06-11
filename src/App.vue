<script setup>
import Header from './globalComponents/Header.vue'
import { RouterView } from 'vue-router'
import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<template>
  <Header/>
  <div id="main">
    <RouterView />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  background-color: var(--color-body);
  font-family: Arial;
  display: flex;
  flex-direction: column;
  flex-grow: 1
}

#main {
  padding: 0px 10%;
  padding-top: 20px;
  flex-grow: 1
}

:root {
    --color-main: rgb(23, 6, 95);
    --color-body: #e5e5e5;
    --color-nav: rgb(217, 202, 183);
    --color-link: rgb(46, 51, 210);
    --color-link-hover: rgb(58, 38, 191);
    --color-text: #0f0e0e;
}
</style>