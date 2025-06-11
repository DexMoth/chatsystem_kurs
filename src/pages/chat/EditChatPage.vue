<script setup>
import { ref } from 'vue'
import UserElement from './components/UserElement.vue'

const chats = ref([
  { id: 1, name: 'Константин Кинчев', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 2, name: 'Антон Круглов', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 3, name: 'Наталия Макуни', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 4, name: 'Елена Ханпира', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 5, name: 'Анатолий Кузнецов', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 6, name: 'Евгений Егоров', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 7, name: 'Валерий Меладзе', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 8, name: 'Валерия', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 9, name: 'Валерия Григорьева', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' },
  { id: 10, name: 'Валерия Афанасьева', image: 'https://avatars.mds.yandex.net/i?id=4de13197a9c96964b0c21d2aa84f70b8_l-5887660-images-thumbs&n=13' }
])

const submitForm = async () => {
}

</script>

<template>
    <form class="form" @submit.prevent="submitForm">
      <h2 class="mb-3">Окно редактирования чата</h2>
      <div class="mb-3">
        <label class="form-label" for="name">Введите название чата:</label>
        <input class="form-control" id="name">
      </div>
      <label class="form-label" for="name">Выберите участников:</label>
        <div id="listUsers">
          <UserElement 
            v-for="chat in chats" 
            :key="chat.id"
            :id="chat.id"
            :name="chat.name"
            :image="chat.image"
          />
        </div>
        <button type="submit" class="btn btn-secondary">Создать</button>
    </form>
  </template>

<style>
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* прокрутка */
  display: flex;
  flex-direction: column;
  height: 90vh;
}

#listUsers {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

</style>