<script setup>
defineProps({
  id: {
    type: [Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})
</script>

<template>
  <label type="button" :for="id" class="btn btn-light user-button mt-2">
    <div class="container chat-element">
        <div class="row align-items-start g-0">
            <div class="col-2 image-col">
                <img :src="image" :alt="name" class="image" height="50px" width="50px">
            </div>
            <div class="col-8 text-col">
                <p class="name">{{ name }}</p>
            </div>
            <div class="col text-col">
                <input class="form-check-input" type="checkbox" :value="id" :id="id">
            </div>
        </div>
    </div>
  </label>
</template>


<style scoped>
.user-button {
  width: 100%;
  padding: 6px 16px;
  border: none;
  text-align: left;
  border-radius: 8px;
  margin-bottom: 4px;
}
</style>