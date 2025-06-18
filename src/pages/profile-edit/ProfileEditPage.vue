<script setup>
import ProfileWindow from './components/ProfileWindow.vue';
</script>

<template>
  <div class="registration-page">
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ProfileWindow></ProfileWindow>
    </div>
  </div>
</template>

<style scoped>
body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>