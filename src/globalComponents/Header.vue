<script setup>
import { useAuthStore } from '@/js/api';
import { computed } from 'vue';

const authStore = useAuthStore();

// Получаем имя пользователя (или логин, если имя отсутствует)
const login = computed(() => {
  return authStore.currentUser?.name || authStore.currentUser?.login || 'Гость';
});
</script>

<template>
    <nav id="header" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img id="logo" src='../assets/logo.svg' height="50px"/>
                Электронно-образовательная среда. Общение
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <div v-if="authStore.isAuthenticated" class="user-info">
                        <li class="nav-item">
                            <router-link to="/chat" class="auth-link">Чаты</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/profile" class="auth-link">Имя</router-link>
                        </li>
                        <li class="nav-item">
                            <button @click="authStore.logout()" class="logout-btn">Выйти</button>
                        </li>
                    </div>
                    <div v-else class="auth-links">
                        <li class="nav-item">
                            <router-link to="/login" class="auth-link">Войти </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/register" class="auth-link">Регистрация</router-link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
#header { 
    width: 100%;
    background-color: var(--color-main);
    text-align: center;
    font-family: Arial;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 20px;
    padding: 10px 0px 10px 0px;
	flex: 0 0 auto;
}

#header a {
    text-decoration: none;
    color: white;
}

#header a:hover {
    text-shadow: 1px 1px 8px var(--color-link);
}

#logo {
    vertical-align: middle;
    margin-right: 10px;
}

#logo:hover {
    filter: drop-shadow(0px 2px 16px var(--color-link));
}
</style>