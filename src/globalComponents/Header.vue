import { Link } from 'react-router-dom';

<template>
    <div id="header">
        <a href="/">
            <img id="logo" src='../assets/logo.svg' height="50px"/>
            Электронно-образовательная среда. Общение
        </a>
        <br/>
        <a href="/chat">chat</a><br/>
        <a href="/profile">profile</a>
    </div>
</template>

<style>
#header { 
    width: 100%;
    background-color: var(--color-main);
    text-align: center;
    font-family: Arial;
    font-size: 20px;
    color: white;
    padding: 10px 0px 10px 0px;
    /* для закрепления подвала внизу страницы*/
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