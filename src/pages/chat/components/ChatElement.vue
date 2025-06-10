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
  <button type="button" class="btn btn-light chat-button">
    <div class="container chat-element">
        <div class="row align-items-start g-0">
            <div class="col-auto image-col">
                <img :src="image" :alt="name" class="chat-image" height="50px" width="50px">
            </div>
            <div class="col text-col">
                <p class="chat-name">{{ name }}</p>
            </div>
        </div>
    </div>
  </button>
</template>

<style scoped>
.chat-button {
  width: 100%;
  padding: 6px 16px;
  border: none;
  text-align: left;
  border-radius: 8px;
  margin-bottom: 4px;
}

.chat-element {
  width: 100%;
  padding: 0;
  margin: 0;
}

.row {
  width: 100%;
  margin: 0;
}

.image-col {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.text-col {
  width: 90%;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.chat-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-name {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>