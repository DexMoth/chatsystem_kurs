<script setup>
import RegistrationForm from './components/RegistrationForm.vue'
</script>

<template>
  <div class="registration-page">
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <RegistrationForm />
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