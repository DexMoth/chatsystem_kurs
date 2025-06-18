<script setup>
import { ref, onMounted } from 'vue'
import { API_URL, axiosDB } from '@/js/api'


const user = ref(null)

const load = async () => {
    try {
        const userResponse = await axiosDB.get(API_URL + '/user/me')
        user.value = userResponse.data
    } catch (error) {
        user.value = null
    }
    console.log("dssd" + user)
}

const logout = async () => {
    try {
        await axiosDB.post(API_URL + '/auth/logout')
        user.value = null
        window.location.href = '/login' 
    } catch (error) {
        console.error('Ошибка при выходе:', error)
    }
}

onMounted(() => {
  load()
})
</script>

<template>
    <nav id="header" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div v-if="user">
                <router-link to="/chat" type="submit">
                    <img id="logo" src='../assets/logo.svg' height="20px"/>
                    Электронно-образовательная среда. Общение
                </router-link>
            </div>
            <div  v-else>
                <router-link to="/" type="submit">
                    <img id="logo" src='../assets/logo.svg' height="30px"/>
                    Электронно-образовательная среда. Общение
                </router-link>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" v-if="user">
                    <li class="nav-link ">
                        <router-link to="/chat">Чаты</router-link>
                    </li>
                    <li class="nav-link ">
                        <router-link to="/profile">{{user.login}}</router-link>
                    </li>
                    <li class="nav-link ">
                        <button @click="logout()">Выйти</button>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto" v-else>
                    <li class="nav-link ">
                        <router-link to="/login">Войти </router-link>
                    </li>
                    <li class="nav-link ">
                        <router-link to="/register">Регистрация</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
#header { 
    width: 100%;
    background-color: var(--color-main);
    text-align: center;
    font-family: Arial;
    font-size: 20px;
    color: white;
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
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