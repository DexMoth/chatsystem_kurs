<script setup>
defineProps({
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
    <div class="container chat-element">
        <div class="row align-items-start g-0">
            <div class="col-auto image-col">
                <img :src="image" :alt="name" class="image" height="50px" width="50px">
            </div>
            <div class="col text-col">
                <p class="name">{{ name }}</p>
            </div>
            <div class="col text-col">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            </div>
        </div>
    </div>
</template>